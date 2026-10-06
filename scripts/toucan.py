#!/usr/bin/env python3
"""Bind this repo to its ToucanShelf knowledge bases through memogit.

    toucan.py sync     clone missing knowledge bases, pull the rest (SessionStart hook)
    toucan.py push     push local edits back to the server        (Stop hook)
    toucan.py status   show pending changes for every knowledge base

kb/ (gitignored) is one memogit checkout root: a single kb/.memogit/ holds the
credentials and sync state, each knowledge base lands in kb/<workspace title>/.
The server stays the only source of truth; kb/ can be deleted and re-synced.

Credentials come from the environment, the same keys locally and in the cloud
sandbox:

    TOUCANSHELF_SERVER   e.g. https://toucan.huzhi.dev (falls back to toucan.json)
    TOUCANSHELF_PAT      memos_pat_...

The first clone writes both into kb/.memogit/config.yaml, so later runs work
even where the variables are not exported (e.g. hooks launched by the desktop
app). The token is never written anywhere inside the git working tree but kb/.
"""

import json
import os
import platform
import re
import shutil
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
CONF = REPO / "scripts" / "toucan.json"
KB_DIR = REPO / "kb"
MEMOGIT_CFG = KB_DIR / ".memogit" / "config.yaml"
BUILD_DIR = KB_DIR / ".bin"
TIMEOUT = 300  # seconds per memogit call


def log(msg):
    print(msg, file=sys.stderr)


def load_conf():
    with open(CONF, encoding="utf-8") as f:
        return json.load(f)


def memogit_cfg():
    """(token stored?, {lowercased title: (title, dir)}) from kb/.memogit/config.yaml.

    Parsed by hand to avoid a PyYAML dependency; memogit writes a flat,
    predictable layout (top-level `token:`, then `- workspace:` items).
    """
    if not MEMOGIT_CFG.is_file():
        return False, {}
    text = MEMOGIT_CFG.read_text(encoding="utf-8")
    has_token = bool(re.search(r"^token:\s*\S+", text, re.M))
    cloned = {}
    for block in re.split(r"^\s*-\s+workspace:", text, flags=re.M)[1:]:
        title = re.search(r"workspace_title:\s*(.+)", block)
        d = re.search(r"\bdir:\s*(.+)", block)
        if title:
            t = title.group(1).strip().strip("'\"")
            cloned[t.lower()] = (t, d.group(1).strip().strip("'\"") if d else t)
    return has_token, cloned


def build_memogit(conf):
    """Build memogit from the public ToucanShelf source (cloud sandbox has no binary)."""
    out = BUILD_DIR / "memogit"
    if out.exists():
        return str(out)
    if not shutil.which("go") or not shutil.which("git"):
        return None
    src = BUILD_DIR / "src"
    log("toucan: memogit not on PATH, building it from source (first run takes a few minutes)")
    try:
        if not src.exists():
            subprocess.run(
                ["git", "clone", "--depth", "1", conf["memogit_source"], str(src)],
                check=True, capture_output=True, timeout=300,
            )
        env = {**os.environ, "CGO_ENABLED": "0", "GOTOOLCHAIN": "auto"}
        subprocess.run(
            ["go", "build", "-trimpath", "-o", str(out), "./cmd/memogit"],
            cwd=src, env=env, check=True, capture_output=True, timeout=600,
        )
    except (subprocess.CalledProcessError, subprocess.TimeoutExpired) as e:
        detail = getattr(e, "stderr", b"") or b""
        log(f"toucan: building memogit failed: {detail.decode(errors='replace')[-500:]}")
        return None
    return str(out)


def find_memogit(conf):
    if os.environ.get("MEMOGIT_BIN"):
        return os.environ["MEMOGIT_BIN"]
    if shutil.which("memogit"):
        return shutil.which("memogit")
    if platform.system() == "Linux":
        return build_memogit(conf)
    return None


def run(memogit, args):
    try:
        p = subprocess.run([memogit, *args], cwd=KB_DIR, capture_output=True, text=True, timeout=TIMEOUT)
        return p.returncode, (p.stdout + p.stderr).strip()
    except subprocess.TimeoutExpired:
        return 1, f"timed out after {TIMEOUT}s"


def setup(conf):
    """Return the memogit path, or (None, reason) when the checkout cannot work."""
    server = os.environ.get("TOUCANSHELF_SERVER") or conf.get("server")
    if server:
        os.environ.setdefault("MEMOGIT_SERVER", server)
    if os.environ.get("TOUCANSHELF_PAT"):
        os.environ.setdefault("MEMOGIT_TOKEN", os.environ["TOUCANSHELF_PAT"])
    memogit = find_memogit(conf)
    if not memogit:
        return None, "找不到 memogit（本机应在 PATH 上；云端需要 go + git 现场构建）"
    has_token, _ = memogit_cfg()
    if not os.environ.get("MEMOGIT_TOKEN") and not has_token:
        return None, "没有 TOUCANSHELF_PAT，且 kb/.memogit/config.yaml 里也没有已保存的 token"
    return memogit, None


def unavailable(reason):
    # SessionStart stdout goes into Claude's context: make the failure impossible to miss.
    print(
        "# ⛔ ToucanShelf 知识库未就绪\n\n"
        f"原因：{reason}\n\n"
        "本仓库规定工作时必须有 memogit 检出的知识库（kb/）。在它就绪之前：\n"
        "- 不读、不写、不引用 Career / SideProjects 的任何内容，也不要改用 MCP 兜底；\n"
        "- 先把上面的原因告诉用户。本机：在已导出 TOUCANSHELF_PAT 的终端里跑 "
        "`python3 scripts/toucan.py sync`；云端：检查环境变量与网络白名单。"
    )
    log(f"toucan: knowledge base unavailable: {reason}")


def cmd_sync():
    conf = load_conf()
    KB_DIR.mkdir(exist_ok=True)
    memogit, reason = setup(conf)
    if not memogit:
        unavailable(reason)
        return
    lines = ["# ToucanShelf 知识库（memogit 检出，已同步到 kb/）", ""]
    failed = []
    for kb in conf["knowledge_bases"]:
        _, cloned = memogit_cfg()
        if kb["name"].lower() in cloned:
            action, args = "pull", ["pull", cloned[kb["name"].lower()][0]]
        else:
            action, args = "clone", ["clone"]
            if not kb.get("attachments", True):
                args.append("--no-attachments")
            args.append(kb["name"])
        code, out = run(memogit, args)
        _, cloned = memogit_cfg()
        d = cloned.get(kb["name"].lower(), (kb["name"], kb["name"]))[1]
        status = "ok" if code == 0 else f"{action} 失败"
        lines.append(f"- `kb/{d}/` — **{kb['name']}**：{kb.get('desc', '')}（{status}）")
        if code != 0:
            failed.append(kb["name"])
            lines.append(f"  - 错误：{out.splitlines()[-1] if out else 'unknown'}")
        log(f"toucan: {action} {kb['name']} -> {status}")
    lines += [
        "",
        "改文档前先读 kb/CLAUDE.md 和 kb/.memogit/skill/SKILL.md。",
        "每轮结束 Stop hook 自动 `memogit push`；冲突以 `<文件>.remote` 留下，需手动合并。",
    ]
    if failed:
        lines.append(f"\n⛔ {', '.join(failed)} 同步失败：先告诉用户，不要凭记忆或 MCP 补内容。")
    print("\n".join(lines))


def cmd_push():
    hook_input = {}
    if not sys.stdin.isatty():
        try:
            hook_input = json.load(sys.stdin)
        except ValueError:
            pass
    conf = load_conf()
    memogit, _ = setup(conf)
    if not memogit:
        return  # sync already reported it; nothing to push
    _, cloned = memogit_cfg()
    problems = []
    for kb in conf["knowledge_bases"]:
        if kb["name"].lower() not in cloned:
            continue
        title, d = cloned[kb["name"].lower()]
        code, out = run(memogit, ["push", title])
        log(f"toucan: push {kb['name']} -> {'ok' if code == 0 else 'failed'}")
        # ⚠ = conflict; "! " = a file push skipped (e.g. its memo looks archived on
        # the server). Both leave local edits unsent, so neither may pass silently.
        skipped = any(line.lstrip().startswith("! ") for line in out.splitlines())
        if code != 0 or "⚠" in out or skipped:
            problems.append(f"kb/{d}:\n{out}")
    # Surface failures and conflicts to Claude once; never loop on them.
    if problems and not hook_input.get("stop_hook_active"):
        log("memogit push 没有完全成功，请处理后再结束：\n\n" + "\n\n".join(problems))
        sys.exit(2)


def cmd_status():
    conf = load_conf()
    memogit, reason = setup(conf)
    if not memogit:
        print(f"unavailable: {reason}")
        sys.exit(1)
    _, cloned = memogit_cfg()
    for kb in conf["knowledge_bases"]:
        if kb["name"].lower() not in cloned:
            print(f"== {kb['name']}: not cloned")
            continue
        _, out = run(memogit, ["status", cloned[kb["name"].lower()][0]])
        print(f"== {kb['name']}\n{out}")


if __name__ == "__main__":
    commands = {"sync": cmd_sync, "push": cmd_push, "status": cmd_status}
    if len(sys.argv) != 2 or sys.argv[1] not in commands:
        log(__doc__)
        sys.exit(1)
    commands[sys.argv[1]]()
