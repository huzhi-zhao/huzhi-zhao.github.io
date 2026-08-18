"use client";

import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { LinkedInIcon, ArrowUpRight } from "@/components/icons";

const stack = [
  "Senior Java",
  "Data Developer",
  "AWS",
  "Databricks",
  "Lakehouse",
  "Model Development",
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-24 pt-40 md:pt-44">
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_75%)]" />
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#1dbf73" />

      <div className="container-x relative grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-elevated px-4 py-2 text-[13px] text-muted">
            <span className="h-2 w-2 animate-pulseRing rounded-full bg-accent" />
            Open to new opportunities
          </span>

          <h1 className="mb-5 font-heading text-[clamp(36px,5vw,52px)] font-light leading-[1.1] tracking-[-0.5px]">
            Senior Backend &amp; Data Engineer.
          </h1>

          <p className="mb-8 max-w-[540px] text-[17px] tracking-[0.1px] text-muted">
            Hi, I&apos;m James — a backend engineer with 10+ years building large-scale
            distributed systems and data-intensive platforms. Now expanding into Data
            Engineering and AI through post-graduate study in Winnipeg, Canada.
          </p>

          <div className="mb-9 flex flex-wrap gap-3.5">
            <a href="#experience" className="btn-outline">
              See my experience
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

          <div className="flex flex-wrap gap-2.5" aria-label="Core stack">
            {stack.map((s) => (
              <span key={s} className="chip-sm">
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        <CardContainer containerClassName="order-first w-full lg:order-none" className="w-full">
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
              <pre className="overflow-x-auto whitespace-pre-wrap px-6 py-7 font-mono text-[13.5px] leading-[1.9] text-[#d6d6d6]">
                <code>
                  <span className="text-faint">$</span> whoami{"\n"}
                  huzhi.zhao — backend &amp; data engineer{"\n\n"}
                  <span className="text-faint">$</span> years_experience{"\n"}
                  10+{"\n\n"}
                  <span className="text-faint">$</span> currently{"\n"}
                  Post-Grad AI Diploma @ University{"\n"}of Winnipeg{"\n\n"}
                  <span className="text-faint">$</span> status{"\n"}
                  <span className="text-accent">Open to new opportunities</span>
                  <span className="animate-blink text-accent">▌</span>
                </code>
              </pre>
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
    </section>
  );
}
