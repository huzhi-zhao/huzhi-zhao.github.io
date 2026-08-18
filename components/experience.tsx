"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { SectionHeading } from "@/components/section-heading";
import { ChevronDown } from "@/components/icons";

const ROLES = [
  {
    title: "Java Developer — Hangzhou Tanhua E-commerce",
    meta: "Dec 2023 — Jun 2024",
    points: ["Developed and maintained high-traffic e-commerce applications and backend services."],
  },
  {
    title: "Senior Java Software Engineer — Weimob Information Technology",
    meta: "May 2021 — Nov 2023",
    points: [
      "Co-architected core optimizations for a distributed Elasticsearch platform indexing 60M+ products on a 32-node cluster, resolving write failures via routing and shard-rebalancing redesign.",
      "Scaled a Kafka-based ingestion pipeline to ~10K writes/sec, reducing data latency from 1–2 hours to under 30 minutes.",
      "Improved query performance to support 500K+ QPS through caching (Redis), hot/cold data separation, and query optimization.",
      "Built a reconciliation system ensuring near real-time consistency between MySQL and Elasticsearch, with automated detection, retry, and audit logging.",
      "Implemented monitoring and capacity guardrails, preventing large-scale indexing failures in production.",
    ],
  },
  {
    title: "Senior Java Software Engineer — Souche Information Technology",
    meta: "Mar 2019 — May 2021",
    points: [
      "Led development of a Vehicle Product Center platform serving a used-car trading SaaS ecosystem with 40,000+ automotive businesses.",
      "Designed configurable workflow and business-rule automation inspired by Salesforce Flow, enabling non-technical users to define event-driven processes without code changes.",
      "Developed a metadata-driven rule engine using Elasticsearch, Redis, MySQL, and Painless scripting.",
      "Built scalable backend services and APIs supporting product lifecycle management and tenant-specific customization.",
    ],
  },
  {
    title: "Junior Developer — Zhejiang Sendinfo Technology",
    meta: "Mar 2017 — Mar 2019",
    points: [
      "Delivered ERP systems and analytics solutions for tourism industry digital transformation initiatives.",
    ],
  },
  {
    title: "Junior Developer — Zhejiang Yonyou Software",
    meta: "Jan 2016 — Mar 2017",
    points: [
      "Developed enterprise mobility and customer loyalty platform solutions for large corporation clients.",
    ],
  },
];

export function Experience() {
  const [open, setOpen] = useState<number | null>(1);

  return (
    <section id="experience" className="border-t border-white/[0.08] py-24">
      <SectionHeading
        eyebrow="EXPERIENCE"
        title="Where I've Worked."
        subtitle="A summary of my professional journey across backend and data engineering roles."
      />
      <div className="container-x">
        <TracingBeam className="md:pl-8">
          <div className="border-t border-white/[0.08]">
            {ROLES.map((role, idx) => {
              const isOpen = open === idx;
              return (
                <div key={role.title} className="border-b border-white/[0.08]">
                  <button
                    onClick={() => setOpen(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full flex-wrap items-center gap-x-5 gap-y-2 py-6 text-left font-heading"
                  >
                    <span className="flex-1 text-[17px] font-medium">{role.title}</span>
                    <span className="order-last shrink-0 basis-full font-mono text-[12.5px] text-faint sm:order-none sm:basis-auto">
                      {role.meta}
                    </span>
                    <ChevronDown
                      className={`shrink-0 text-muted transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <ul className="flex flex-col gap-3 pb-7">
                          {role.points.map((point) => (
                            <li
                              key={point}
                              className="relative pl-5 text-[14.5px] leading-[1.65] text-muted"
                            >
                              <span className="absolute left-0 top-[9px] h-1.5 w-1.5 rounded-full bg-accent" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </TracingBeam>
      </div>
    </section>
  );
}
