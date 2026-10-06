# CLAUDE.md — 本仓库的协作前提

huzhi.dev 个人站点。这份文件是**每次会话自动加载**的最小前提集，
目的是让约束在新会话里也生效，而不是每次都要人重新交代。

## 一、先读哪份文档

`docs/` 是本项目的决策系统，动手前按需要读，不要凭直觉改：

| 目录 | 回答 | 什么时候必须读 |
| --- | --- | --- |
| [`docs/adr/`](docs/adr/README.md) | 为什么这样定 | 任何结构性 / 方向性改动之前 |
| `docs/design/` | 打算怎么做（需求与方案） | 实现某个 FR 编号之前 |
| `docs/launch/` | 实际做成了什么 | 排查"这块当初为什么是这样"时 |
| `docs/resume/` | 简历方法论 | 简历相关工作 |
| [`docs/collaboration/toucanshelf.md`](docs/collaboration/toucanshelf.md) | 内容写仓库还是写知识库 | **涉及简历或跨系统的会话，动手前必读** |
| [`TODO.md`](TODO.md) | 还剩什么没做 | 问"现在有什么待办"时，这里是唯一总表 |

**改了实现就要回写文档。** 方向性结论落 `docs/adr/`，上线内容落 `docs/launch/`，
勾掉 `TODO.md` 里做完的条目。只改代码不回写，等于把决策扔了。

## 二、硬约束（违反即返工）

1. **不加简历板块、不加 PDF 下载入口**（[ADR-0001](docs/adr/0001-site-positioning.md)、
   [ADR-0013](docs/adr/0013-public-repo-privacy-boundary.md) 约束 3）。
   站点给证据，CV 给结论，这条已经裁决过两次，不要再"顺手补一个下载按钮"。
2. **仓库内不出现**：街道级住址、手机号、第三方个人的姓名与联系方式
   （ADR-0013 约束 1）。城市（Winnipeg）、邮箱、公司名 / 职位名 / 真实起止时间**可以**出现。
3. **成就类文案必须 CSI 三段齐全**（[ADR-0007](docs/adr/0007-copy-conventions.md)）：
   Challenge → Solution → Impact。Solution 段写不出取舍的不合格；
   只有做法没有结果的条目，不写。
4. **事实改动要三处同步**：站点 / CV / LinkedIn（ADR-0007 约束 4）。
   已知不一致项在 `TODO.md` 第 2 节。**未核实的时间不要擅自改站点**——
   改错比不改更糟（TODO 里 Yonyou / Sendinfo 那条）。
5. **站点不跟招聘方走**（[ADR-0014](docs/adr/0014-resume-scope-in-docs.md) §1.1）。
   portfolio 是名片，面向所有人、措辞只有一套；针对 JD 的调整只发生在简历侧。
6. **对外文本一律不得由 AI 直接定稿**（[ADR-0010](docs/adr/0010-ai-assisted-writing.md)）：
   - 每次 AI 参与都以本人改写后定稿结束，**没有例外通道**；
   - 已定稿的文本**不许直接改写**，只能以建议形式提出，由本人决定采纳；
   - 数字与专有名词只能来自本人提供的事实，**不得补全、推测或"合理化"**；
   - CSI 是内容检查表不是句式模板，不得三条并排写成同构排比句。

   内部文档（`docs/`、`TODO.md`、本文件）不受此限，AI 可直接写。

## 三、简历工作怎么走

本仓库是简历优化的 **Claude Code 协作入口**，持有全部可公开的简历事实。
链路（ADR-0013"简历的生成链路"）：

```
本仓库 CC 写文本内容
  → 写入 ToucanShelf Career/Vault/（文本稿唯一真源）
  → 本人对照 Vault 在 Pages 里改排版
  → 导出 PDF
  → 文案交回 CC 核对
```

**仓库不产出任何简历文件**，也不约定输出目录。排版和导出是本人的活。

**master resume 就是 huzhi.dev 站点本身**，没有第二份主简历。
ToucanShelf `Career/Vault/` 里只有针对具体投递裁剪出来的稿子。

## 四、和 ToucanShelf 怎么配合

细则在 [`docs/collaboration/toucanshelf.md`](docs/collaboration/toucanshelf.md)，
动手写对面之前先读。最少要知道这几条：

- **分工一句话**：仓库放**结论与可公开事实**，ToucanShelf 放**素材、过程与敏感信息**。
  职业规划的决策在 `Career/decisions/`；简历怎么写的决策在本仓库 `docs/adr/`。
- **Career 的目录结构以它自己的 `README` 为准**，本仓库不再维护第二份目录地图
  （维护过，三方打架，坏指针一堆）。
- **只走 memogit，不用 MCP。** 知识库检出在仓库内的 `kb/`（gitignored），
  库清单在根目录 `memogit.conf.yaml`（Career、SideProjects）。memogit 由服务器发布，
  SessionStart hook 每次从服务器装好配套版本再同步，不在仓库里放二进制或同步脚本。
  凭据只来自环境变量 `TOUCANSHELF_PAT` / `TOUCANSHELF_SERVER`，本机与云端沙箱同名。
- **会话开场先确认 `kb/` 就绪**，规则见文末「ToucanShelf 知识库」一段。
  看到 ⛔ / ⚠ 或某库同步失败：**停下告诉用户**，不读写、不引用对面内容，
  不凭记忆补，也不退回 MCP。
- 读、改、新建都在 `kb/` 里用普通文件工具。动手前读 `kb/CLAUDE.md` 和
  `kb/.memogit/skill/SKILL.md`。文件末尾的 `memogit-id` 和 `<!-- END memogit -->`
  都不能碰；移动改名用 `mv`，不要复制加删除。每轮结束 Stop hook 自动 push，
  手动在 `kb/` 里跑 `memogit status` / `memogit push`；冲突以 `.remote` 副本留下，合并后再 push。
- **`kb/` 永不提交**，token 不写进任何被跟踪的文件（本仓库是 public）。
- **新建文档或重构级改写要先对齐范围再动笔**，不要直接开写。

## 五、工程注意事项

- **不要在 dev server 运行时跑 `next build`。** 它会把 CSS 打 404，预览变成白屏。
  要构建先停 dev server。
- 站点内容集中在 `lib/content/`（`experience.ts` / `projects.ts` 等），
  改文案改这里，不要改进组件里写死。
- `components/ui/` 是 Aceternity UI 组件，其中有无引用的存量文件
  （TODO FR-14.1 待清理）；新增 UI 前先确认现有的能不能用。
- 部署：push `main` 触发 workflow 构建静态导出并推 `gh-pages`。
  **`gh-pages` 分支永不手改。**

<!-- BEGIN toucanshelf -->
## ToucanShelf 知识库

本仓库通过 memogit 使用 ToucanShelf 知识库，检出在 `kb/`（不进 git）。会话开始时，SessionStart hook 会同步知识库，并输出一段以 `memogit:` 开头的状态。

- 没看到这段状态，说明 hook 没运行或服务器连不上：停下来告诉用户，不要读写 `kb/`，也不要改用 MCP 等其他途径。
- 状态以 ⛔ 或 ⚠ 开头时，照状态里的说明处理。
- 接入和排查说明：https://toucan.huzhi.dev/memogit/bootstrap.md
<!-- END toucanshelf -->
