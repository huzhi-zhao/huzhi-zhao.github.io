"use client";

import { HoverEffect } from "@/components/ui/card-hover-effect";
import { SectionHeading } from "@/components/section-heading";

const HIGHLIGHTS = [
  {
    label: "ES",
    visual: "linear-gradient(135deg,#1c3a7a,#142a52)",
    title: "Elasticsearch at Scale",
    body: "Co-architected core optimizations for a distributed Elasticsearch platform indexing 60M+ products across a 32-node cluster, resolving critical write failures via routing and shard-rebalancing redesign.",
    tags: ["Elasticsearch", "Distributed Systems"],
  },
  {
    label: "Kafka",
    visual: "linear-gradient(135deg,#1f5c4a,#123a2e)",
    title: "High-Throughput Kafka Pipeline",
    body: "Scaled a Kafka-based ingestion pipeline to ~10K writes/sec, cutting data latency from 1–2 hours to under 30 minutes while driving throughput to its physical QPS limit.",
    tags: ["Kafka", "Streaming"],
  },
  {
    label: "Redis",
    visual: "linear-gradient(135deg,#5a1f3d,#341226)",
    title: "Search at 500K+ QPS",
    body: "Improved query performance to support 500K+ QPS through Redis caching, hot/cold data separation, and query optimization across a large product index.",
    tags: ["Redis", "Performance"],
  },
  {
    label: "Rules",
    visual: "linear-gradient(135deg,#5c4a1f,#342a12)",
    title: "Configurable Workflow Engine",
    body: "Designed a metadata-driven rule engine inspired by Salesforce Flow, letting non-technical users define event-driven business processes for a SaaS platform serving 40,000+ automotive businesses.",
    tags: ["Rule Engine", "SaaS"],
  },
];

export function Highlights() {
  return (
    <section id="highlights" className="border-t border-white/[0.08] py-24">
      <SectionHeading
        eyebrow="HIGHLIGHTS"
        title="Engineering Highlights."
        subtitle="A few of the systems I've designed, scaled, and shipped to production."
      />
      <div className="container-x">
        <HoverEffect
          className="gap-2"
          items={HIGHLIGHTS.map((h) => ({
            key: h.title,
            content: (
              <article className="h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-elevated transition-colors duration-300 group-hover:border-white/[0.16]">
                <div
                  className="flex h-[150px] items-center justify-center font-mono text-[22px] font-bold tracking-[1px] text-white/[0.85]"
                  style={{ background: h.visual }}
                >
                  {h.label}
                </div>
                <div className="p-7">
                  <h3 className="mb-3 font-heading text-[19px] font-medium text-white">
                    {h.title}
                  </h3>
                  <p className="text-[14.5px] leading-[1.65] text-muted">{h.body}</p>
                  <div className="mt-[18px] flex flex-wrap gap-2">
                    {h.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ),
          }))}
        />
      </div>
    </section>
  );
}
