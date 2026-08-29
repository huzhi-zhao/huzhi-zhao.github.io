"use client";

import { motion } from "framer-motion";
import { SpotlightNew } from "@/components/ui/spotlight-new";
import { HeroTerminal } from "@/components/hero-terminal";
import { LinkedInIcon, ArrowUpRight } from "@/components/icons";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-24 pt-40 md:pt-44">
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_75%)]" />
      <SpotlightNew side="left" />

      <div className="container-x relative z-10 grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-elevated px-4 py-2 text-[13px] text-muted">
            <span className="h-2 w-2 animate-pulseRing rounded-full bg-accent" />
            Open to new opportunities
          </span>

          <h1 className="mb-3 font-heading text-[clamp(30px,3.6vw,42px)] font-light leading-[1.15] tracking-[-0.5px]">
            Senior Backend Engineer
          </h1>

          <p className="mb-6 font-heading text-[clamp(18px,2vw,22px)] font-light leading-[1.3] tracking-[-0.2px] text-white/90">
            expanding into Data &amp; AI
          </p>

          <p className="mb-4 max-w-[540px] text-[17px] tracking-[0.1px] text-muted">
            Hi, I&apos;m James — a backend engineer with{" "}
            <strong className="font-medium text-white/90">9 years</strong> of experience
            building distributed systems where{" "}
            <strong className="font-medium text-white/90">
              scale, performance, and data reliability
            </strong>{" "}
            matter.
          </p>

          <p className="mb-8 max-w-[540px] text-[17px] tracking-[0.1px] text-muted">
            Now based in Winnipeg, I&apos;m extending that experience into{" "}
            <strong className="font-medium text-white/90">
              Data Engineering and Applied AI
            </strong>{" "}
            through post-graduate study and hands-on platform projects.
          </p>

          <div className="mb-9 flex flex-wrap gap-3.5">
            <a href="#projects" className="btn-outline">
              See my work
            </a>
            <a
              href="https://linkedin.com/in/huzhi"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full bg-[rgb(45,101,188)] px-5 py-3 text-sm font-bold tracking-[-0.28px] text-white transition hover:-translate-y-0.5 hover:bg-[rgb(52,113,208)]"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-white">
                <LinkedInIcon width={14} height={14} className="text-[rgb(45,101,188)]" />
              </span>
              Let&apos;s Connect
              <ArrowUpRight />
            </a>
          </div>

        </motion.div>

        <HeroTerminal />

      </div>
    </section>
  );
}
