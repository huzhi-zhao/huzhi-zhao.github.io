"use client";

import { motion } from "framer-motion";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6 }}
    className="container-x mx-auto mb-14 max-w-[640px] text-center"
  >
    <span className="eyebrow mb-[18px]">{eyebrow}</span>
    <h2 className="mb-4 font-heading text-[clamp(28px,4vw,38px)] font-light leading-tight tracking-[-0.4px]">
      <TextGenerateEffect words={title} />
    </h2>
    <p className="text-[15.5px] text-muted">{subtitle}</p>
  </motion.div>
);
