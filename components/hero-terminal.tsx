"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

type Line = { text: string; accent?: boolean };
/**
 * 极克制的高亮：只给「可验证的事实」上色 —— 指标数字与机构名，
 * 其余保持终端灰。命令名走近白，模拟 Ubuntu 里输入行比输出行亮一档。
 */
const NUMERIC = "text-[#7fc8e6]";
const NAMED = "text-[#e7ebe9]";
/** 输出行内按子串上色；未命中的部分保持默认灰。 */
function paint(text: string, marks: { s: string; cls: string }[]) {
  const parts: { t: string; cls?: string }[] = [{ t: text }];
  for (const m of marks) {
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      if (p.cls) continue;
      const at = p.t.indexOf(m.s);
      if (at === -1) continue;
      const next = [
        { t: p.t.slice(0, at) },
        { t: m.s, cls: m.cls },
        { t: p.t.slice(at + m.s.length) },
      ].filter((x) => x.t.length > 0);
      parts.splice(i, 1, ...next);
      i += next.length - 1;
    }
  }
  return parts;
}
/** `tight` suppresses the blank line that otherwise follows a block, so the
 *  four commands read as three groups: identity / substance / current state. */
type Block = { cmd: string; out: Line[]; tight?: boolean };

const SCRIPT: Block[] = [
  { cmd: "whoami", out: [{ text: "huzhi.zhao — senior backend engineer" }] },
  {
    cmd: "focus",
    out: [{ text: "large-scale data search · distributed systems" }],
  },
  {
    cmd: "scale",
    out: [{ text: "20K brands · 65M+ SKUs · 32-node ES · 500K+ peak QPS" }],
  },
  {
    cmd: "currently",
    out: [{ text: "Post-Grad AI @ University of Winnipeg" }],
    tight: true,
  },
  { cmd: "status", out: [{ text: "Open to new opportunities", accent: true }] },
];

/** 高亮词表：一处声明，Blocks 里按子串套用。 */
const MARKS = [
  { s: "huzhi.zhao", cls: NAMED },
  { s: "20K", cls: NUMERIC },
  { s: "65M+", cls: NUMERIC },
  { s: "32-node", cls: NUMERIC },
  { s: "500K+", cls: NUMERIC },
  { s: "University of Winnipeg", cls: NAMED },
];

const TYPING_SPEED = 28;
const TYPING_JITTER = 18;
const OUTPUT_DELAY = 90;
const BLOCK_PAUSE = 220;
const INITIAL_DELAY = 300;

/**
 * Keystroke clicks synthesised with WebAudio — a short noise burst through a
 * bandpass filter. Costs zero bytes of assets, unlike a sampled sprite.
 *
 * No prompt and no toggle: autoplay policy keeps the context suspended until
 * the page has seen a user gesture, so on a cold visit this simply stays
 * silent. Visitors who already interacted (or who Chrome trusts via its media
 * engagement score) hear it. Nothing is ever asked of anyone.
 */
function useKeyClicks() {
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const Ctx = window.AudioContext ?? (window as any).webkitAudioContext;
    if (!Ctx) return;
    const ctx: AudioContext = new Ctx();
    ctxRef.current = ctx;
    // Resolves only where the browser already allows audio; rejection is fine.
    void ctx.resume().catch(() => {});
    return () => void ctx.close();
  }, []);

  const click = useCallback(
    (kind: "key" | "enter" = "key") => {
      const ctx = ctxRef.current;
      if (!ctx || ctx.state !== "running") return;

      const duration = kind === "enter" ? 0.055 : 0.03;
      const frames = Math.floor(ctx.sampleRate * duration);
      const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < frames; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / frames, 6);
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      const band = ctx.createBiquadFilter();
      band.type = "bandpass";
      band.frequency.value =
        kind === "enter" ? 700 + Math.random() * 200 : 1500 + Math.random() * 800;
      band.Q.value = 1.1;

      const gain = ctx.createGain();
      gain.gain.value = kind === "enter" ? 0.11 : 0.07;

      source.connect(band).connect(gain).connect(ctx.destination);
      source.start();
    },
    [],
  );

  return { click };
}

/**
 * Renders blocks as terminal lines. Newlines only ever go *between* lines, so
 * the caret stays on the last line instead of dropping to an empty one — and
 * the invisible sizing copy reserves exactly the height the finished copy needs.
 */
function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        const lastBlock = i === blocks.length - 1;
        return (
          <span key={i}>
            <span className="text-faint">$</span> <span className="text-[#e7ebe9]">{b.cmd}</span>
            {(b.out.length > 0 || !lastBlock) && "\n"}
            {b.out.map((o, j) => (
              <span key={j} className={o.accent ? "text-accent" : undefined}>
                {o.accent
                  ? o.text
                  : paint(o.text, MARKS).map((p, k) => (
                      <span key={k} className={p.cls}>
                        {p.t}
                      </span>
                    ))}
                {(j < b.out.length - 1 || !lastBlock) && "\n"}
              </span>
            ))}
            {!lastBlock && !b.tight && "\n"}
          </span>
        );
      })}
    </>
  );
}

export function HeroTerminal() {
  const { click } = useKeyClicks();

  // How much of the script has been revealed: completed blocks, plus the
  // characters typed into the current command, plus revealed output lines.
  const [block, setBlock] = useState(0);
  const [chars, setChars] = useState(0);
  const [outs, setOuts] = useState(0);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  const clickRef = useRef(click);
  clickRef.current = click;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => setStarted(true), INITIAL_DELAY);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started || done) return;
    const current = SCRIPT[block];

    if (chars < current.cmd.length) {
      const t = setTimeout(
        () => {
          clickRef.current("key");
          setChars((c) => c + 1);
        },
        TYPING_SPEED + Math.random() * TYPING_JITTER,
      );
      return () => clearTimeout(t);
    }

    if (outs < current.out.length) {
      const t = setTimeout(
        () => {
          if (outs === 0) clickRef.current("enter");
          setOuts((o) => o + 1);
        },
        outs === 0 ? 70 : OUTPUT_DELAY,
      );
      return () => clearTimeout(t);
    }

    if (block < SCRIPT.length - 1) {
      const t = setTimeout(() => {
        setBlock((b) => b + 1);
        setChars(0);
        setOuts(0);
      }, BLOCK_PAUSE);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setDone(true), 120);
    return () => clearTimeout(t);
  }, [started, done, block, chars, outs]);

  const rendered = SCRIPT.flatMap((b, i) => {
    if (done) return [b];
    if (i > block) return [];
    if (i < block) return [b];
    return [{ ...b, cmd: b.cmd.slice(0, chars), out: b.out.slice(0, outs) }];
  });

  return (
    <CardContainer
      containerClassName="order-first w-full lg:order-none"
      className="w-full"
      disabled={!done}
    >
      <CardBody className="w-full">
        <CardItem
          translateZ={40}
          className="w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-elevated shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
        >
          <div className="flex items-center gap-2 border-b border-white/[0.08] px-[18px] py-3.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            <span className="ml-2 font-mono text-xs text-faint">James@winnipeg:~</span>
          </div>

          {/* Both copies share one grid cell: the invisible full script reserves
              the final height so the hero never reflows while typing. */}
          <div className="grid px-6 py-6 font-mono text-[13.5px] leading-[1.6] text-[#d6d6d6]">
            <pre
              aria-hidden
              className="invisible col-start-1 row-start-1 overflow-x-auto whitespace-pre-wrap"
            >
              <code>
                <Blocks blocks={SCRIPT} />▌
              </code>
            </pre>

            <pre className="col-start-1 row-start-1 overflow-x-auto whitespace-pre-wrap">
              <code>
                <Blocks blocks={rendered} />
                <span className="animate-blink text-accent">▌</span>
              </code>
            </pre>
          </div>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
