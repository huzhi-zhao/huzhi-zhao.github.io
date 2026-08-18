"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { SectionHeading } from "@/components/section-heading";

const SKILLS: [string, string][] = [
  ["Ja", "Java"],
  ["Py", "Python"],
  ["Go", "Golang"],
  ["SQ", "SQL"],
  ["JS", "JavaScript"],
  ["Vu", "Vue"],
  ["SB", "Spring Boot"],
  ["Ka", "Kafka"],
  ["ES", "Elasticsearch"],
  ["Mi", "Microservices"],
  ["Sp", "Spark"],
  ["Af", "Airflow"],
  ["Db", "Databricks"],
  ["Sf", "Snowflake"],
  ["ET", "ETL"],
  ["GC", "GCP"],
  ["AW", "AWS"],
  ["Do", "Docker"],
  ["Tf", "Terraform"],
  ["Gr", "Grafana"],
  ["LL", "LLMs"],
  ["Pe", "Prompt Eng."],
  ["ML", "MLOps"],
  ["Md", "Model Deploy"],
];

const ICON_COLORS = ["#2b6cff", "#1dbf73", "#8b5cf6", "#f59e0b", "#ec4899", "#06b6d4"];

const Chip = ({ abbr, name, index }: { abbr: string; name: string; index: number }) => (
  <span className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-elevated py-2.5 pl-2 pr-[18px] text-sm text-[#e5e5e5] transition hover:border-white/[0.16]">
    <span
      className="flex h-[26px] w-[26px] items-center justify-center rounded-lg font-mono text-[10px] font-bold text-white"
      style={{ background: ICON_COLORS[index % ICON_COLORS.length] }}
    >
      {abbr}
    </span>
    {name}
  </span>
);

export function Skills() {
  const half = Math.ceil(SKILLS.length / 2);
  const rows = [SKILLS.slice(0, half), SKILLS.slice(half)];

  return (
    <section id="skills" className="border-t border-white/[0.08] py-24">
      <SectionHeading
        eyebrow="TECH STACK"
        title="Tools I Rely On."
        subtitle="Languages, frameworks, and platforms I've used to build distributed systems and data platforms."
      />
      <div className="flex flex-col gap-3">
        {rows.map((row, rowIdx) => (
          <InfiniteMovingCards
            key={rowIdx}
            direction={rowIdx % 2 === 0 ? "left" : "right"}
            speed="slow"
            items={row.map(([abbr, name], i) => (
              <Chip key={name} abbr={abbr} name={name} index={rowIdx * half + i} />
            ))}
          />
        ))}
      </div>
    </section>
  );
}
