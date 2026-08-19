"use client";

import { motion } from "framer-motion";
import { Globe } from "@/components/ui/globe";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { MailIcon, LinkedInOutlineIcon, PinIcon, GitHubIcon } from "@/components/icons";

const CARDS = [
  {
    icon: <MailIcon className="shrink-0 text-faint" />,
    label: "Email",
    value: "James.Huzhi.Zhao@gmail.com",
    href: "mailto:James.Huzhi.Zhao@gmail.com",
  },
  {
    icon: <LinkedInOutlineIcon className="shrink-0 text-faint" />,
    label: "LinkedIn",
    value: "linkedin.com/in/huzhi",
    href: "https://linkedin.com/in/huzhi",
  },
  {
    icon: <GitHubIcon className="shrink-0 text-faint" />,
    label: "GitHub",
    value: "github.com/huzhi-zhao",
    href: "https://github.com/huzhi-zhao",
  },
  {
    icon: <PinIcon className="shrink-0 text-faint" />,
    label: "Location",
    value: "Winnipeg, MB, Canada",
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/[0.08] py-24 text-center"
    >
      <div className="container-x relative flex flex-col items-center">
        <span className="eyebrow mb-[18px]">CONTACT</span>
        <h2 className="mb-3.5 font-heading text-[clamp(28px,4vw,38px)] font-light tracking-[-0.4px]">
          <TextGenerateEffect words="Let's Connect." />
        </h2>
        <p className="mb-8 text-muted">
          Open to backend, data engineering, and AI platform roles in Manitoba.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto w-full max-w-[380px]"
        >
          <Globe className="[mask-image:radial-gradient(circle_at_center,black_60%,transparent_72%)]" />
          <span className="pointer-events-none absolute bottom-2 left-1/2 w-max -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[1.2px] text-faint sm:text-[11px] sm:tracking-[1.5px]">
            Based in Winnipeg · Open across Manitoba
          </span>
        </motion.div>

        <div className="mt-6 flex w-full flex-wrap justify-center gap-4">
          {CARDS.map((c) => {
            const inner = (
              <span className="flex h-full flex-col gap-1.5 rounded-[14px] bg-elevated px-6 py-[18px] text-left">
                <span className="flex items-center gap-1.5">
                  {c.icon}
                  <span className="font-mono text-[11px] uppercase tracking-[1px] text-faint">
                    {c.label}
                  </span>
                </span>
                <span className="text-[14.5px] text-white">{c.value}</span>
              </span>
            );

            return (
              <BackgroundGradient
                key={c.label}
                containerClassName="rounded-[15px] min-w-[220px] transition-transform duration-300 hover:-translate-y-1"
                className="rounded-[14px]"
              >
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener"
                    className="block h-full"
                  >
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </BackgroundGradient>
            );
          })}
        </div>
      </div>
    </section>
  );
}
