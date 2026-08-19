"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";

/** Groups mirror the Technical Skills section of the CV, so both read the same way. */
const GROUPS: { label: string; color: string; items: [string, string][] }[] = [
  {
    label: "Languages",
    color: "#2b6cff",
    items: [
      ["Ja", "Java"],
      ["Py", "Python"],
      ["Go", "Golang"],
      ["SQ", "SQL"],
      ["JS", "JavaScript"],
      ["Vu", "Vue"],
    ],
  },
  {
    label: "Backend & Distributed Systems",
    color: "#1dbf73",
    items: [
      ["SB", "Spring Boot"],
      ["Ka", "Kafka"],
      ["ES", "Elasticsearch"],
      ["Re", "Redis"],
      ["Mi", "Microservices"],
    ],
  },
  {
    label: "Data Engineering",
    color: "#8b5cf6",
    items: [
      ["Sp", "Spark"],
      ["Af", "Airflow"],
      ["Db", "Databricks"],
      ["Sf", "Snowflake"],
      ["ET", "ETL"],
    ],
  },
  {
    label: "Cloud & DevOps",
    color: "#f59e0b",
    items: [
      ["AW", "AWS"],
      ["GC", "GCP"],
      ["Do", "Docker"],
      ["Tf", "Terraform"],
      ["Gr", "Grafana"],
    ],
  },
  {
    label: "AI & Machine Learning",
    color: "#ec4899",
    items: [
      ["LL", "LLMs"],
      ["Pe", "Prompt Eng."],
      ["ML", "MLOps"],
      ["Md", "Model Deploy"],
    ],
  },
];

const Chip = ({ abbr, name, color }: { abbr: string; name: string; color: string }) => (
  <span className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-elevated py-2.5 pl-2 pr-[18px] text-sm text-[#e5e5e5] transition hover:border-white/[0.16]">
    <span
      className="flex h-[26px] w-[26px] items-center justify-center rounded-lg font-mono text-[10px] font-bold text-white"
      style={{ background: color }}
    >
      {abbr}
    </span>
    {name}
  </span>
);

export function Skills() {
  return (
    <section id="skills" className="border-t border-white/[0.08] py-24">
      <SectionHeading
        eyebrow="TECH STACK"
        title="Tools I Rely On."
        subtitle="Languages, frameworks, and platforms I've used to build distributed systems and data platforms."
      />
      <div className="container-x flex flex-col gap-8">
        {GROUPS.map((group, i) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="grid gap-4 md:grid-cols-[200px_1fr] md:items-start md:gap-8"
          >
            <h3 className="pt-2 font-mono text-[11px] uppercase tracking-[1.5px] text-faint">
              {group.label}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {group.items.map(([abbr, name]) => (
                <Chip key={name} abbr={abbr} name={name} color={group.color} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
