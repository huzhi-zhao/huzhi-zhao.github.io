"use client";

import Image from "next/image";
import { Timeline, type TimelineEntry } from "@/components/ui/timeline";
import { SectionHeading } from "@/components/section-heading";
import { ArrowUpRight } from "@/components/icons";

/** Highlights a metric so it survives a 5-second scan of the page. */
const M = ({ children }: { children: React.ReactNode }) => (
  <span className="font-mono text-[13.5px] font-medium text-accent">{children}</span>
);

type RoleImage = { src: string; alt: string };

type Role = {
  role: string;
  company: string;
  /** One line of context — the company names mean nothing to a North American reader. */
  blurb?: string;
  period: string;
  location?: string;
  kind?: "work" | "study" | "break";
  points: React.ReactNode[];
  tags?: string[];
  /** Drop files in /public and list them here to add screenshots to an entry. */
  images?: RoleImage[];
  /** Optional pointer to a matching card in the Projects section. */
  link?: { label: string; href: string };
};

const KIND_BADGE: Record<NonNullable<Role["kind"]>, string> = {
  work: "border-white/[0.16] text-muted",
  study: "border-[rgba(43,108,255,0.4)] bg-[rgba(43,108,255,0.12)] text-[#7ba6ff]",
  break: "border-[rgba(245,158,11,0.4)] bg-[rgba(245,158,11,0.12)] text-[#f5b942]",
};

function RoleCard({ role }: { role: Role }) {
  return (
    <article className="mb-6 rounded-2xl border border-white/[0.08] bg-elevated p-6 transition-colors duration-300 hover:border-white/[0.16] md:p-7">
      <div className="mb-1.5 flex flex-wrap items-center gap-x-3 gap-y-2">
        <h4 className="font-heading text-[19px] font-medium leading-snug text-white">
          {role.company}
        </h4>
        {role.kind && role.kind !== "work" && (
          <span
            className={`rounded-full border px-2.5 py-[3px] font-mono text-[10.5px] uppercase tracking-[1px] ${KIND_BADGE[role.kind]}`}
          >
            {role.kind === "study" ? "Studying" : "Career break"}
          </span>
        )}
      </div>

      <p className="mb-3 text-[15px] text-white/[0.82]">{role.role}</p>

      <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12.5px] text-faint">
        <span>{role.period}</span>
        {role.location && (
          <>
            <span aria-hidden className="text-white/[0.16]">
              ·
            </span>
            <span>{role.location}</span>
          </>
        )}
      </div>

      {role.blurb && (
        <p className="mb-5 border-l-2 border-white/[0.08] pl-4 text-[14px] leading-[1.6] text-faint">
          {role.blurb}
        </p>
      )}

      <ul className="flex flex-col gap-3">
        {role.points.map((point, i) => (
          <li key={i} className="relative pl-5 text-[14.5px] leading-[1.65] text-muted">
            <span className="absolute left-0 top-[9px] h-1.5 w-1.5 rounded-full bg-accent" />
            {point}
          </li>
        ))}
      </ul>

      {role.images && role.images.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-3">
          {role.images.map((img) => (
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt}
              width={640}
              height={400}
              className="h-24 w-full rounded-lg border border-white/[0.08] object-cover md:h-40"
            />
          ))}
        </div>
      )}

      {role.link && (
        <a
          href={role.link.href}
          className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-accent transition hover:gap-2.5"
        >
          {role.link.label}
          <ArrowUpRight />
        </a>
      )}

      {role.tags && role.tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {role.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

const TIMELINE: { title: string; roles: Role[] }[] = [
  {
    title: "2026 —",
    roles: [
      {
        company: "University of Winnipeg",
        role: "Post-Graduate Diplomas — Applied Artificial Intelligence · Business Analysis & Transformation",
        period: "Jan 2026 — graduating Dec 2027",
        location: "Winnipeg, MB, Canada",
        kind: "study",
        points: [
          <>
            Formalising the shift from backend engineering into data engineering and applied
            AI, alongside continued hands-on platform work.
          </>,
        ],
        tags: ["Machine Learning", "Data Engineering", "Business Analysis"],
      },
    ],
  },
  {
    title: "2025",
    roles: [
      {
        company: "Career break — relocation to Canada",
        role: "Self-directed study, Hangzhou → Winnipeg",
        period: "Mar 2025 — Dec 2025",
        location: "Hangzhou, China",
        kind: "break",
        points: [
          <>
            Used the relocation period to pivot toward AI: completed the{" "}
            <b className="font-medium text-white/[0.82]">
              IBM AI Engineering Professional Certificate
            </b>{" "}
            and built a macOS icon-management app on a{" "}
            <M>10,000+</M> image dataset using CLIP, BLIP, and a fine-tuned VGG16 model.
          </>,
        ],
        tags: ["PyTorch", "CLIP / BLIP", "Computer Vision", "TypeScript"],
      },
    ],
  },
  {
    title: "2024 — 25",
    roles: [
      {
        company: "Shanghai Zhongyou Tipo Steel Pipe Co., Ltd.",
        role: "Full-Stack Developer (Freelance) — Manufacturing Execution System",
        blurb: "Steel pipe manufacturer. Sole developer on a greenfield MES, end to end.",
        period: "Jul 2024 — Feb 2025",
        location: "Remote, from Hangzhou, China",
        kind: "work",
        points: [
          <>
            Designed, built, and deployed a production-grade MES from scratch as the{" "}
            <b className="font-medium text-white/[0.82]">sole developer</b> — architecture,
            backend, frontend, database, mobile, deployment, and production support.
          </>,
          <>
            Modelled complex manufacturing workflows across <M>20+</M> production stages,
            translating shop-floor processes into scalable software.
          </>,
          <>
            Architected backend services in Go with relational data models covering production
            tracking, quality control, inventory, and manufacturing traceability.
          </>,
          <>
            Designed RBAC authorization and workshop-based data partitioning to enforce
            operational security and process ownership.
          </>,
          <>
            Delivered web admin portals, operational dashboards, reporting, and Android
            shop-floor apps, with real-time KPI monitoring, defect analysis, and equipment
            status reporting.
          </>,
        ],
        tags: ["Golang", "Vue.js", "MySQL", "Android", "RBAC"],
        link: { label: "See it in Projects", href: "#projects" },
        // images: [{ src: "/tipo-mes.png", alt: "Zhongyou Tipo MES dashboard" }],
      },
      {
        company: "Hangzhou Tanhua E-commerce",
        role: "Java Developer",
        blurb: "Consumer e-commerce platform.",
        period: "Dec 2023 — Jun 2024",
        location: "Hangzhou, China",
        kind: "work",
        points: [
          <>
            Developed and maintained high-traffic e-commerce applications and backend
            services.
          </>,
        ],
        tags: ["Java", "Spring Boot", "MySQL"],
      },
    ],
  },
  {
    title: "2021 — 23",
    roles: [
      {
        company: "Weimob",
        role: "Senior Java Software Engineer",
        blurb:
          "Enterprise SaaS commerce platform. Owned search and promotion infrastructure for 20,000+ merchants.",
        period: "May 2021 — Nov 2023",
        location: "Hangzhou, China",
        kind: "work",
        points: [
          <>
            <b className="font-medium text-white/[0.82]">Search &amp; promotion platform.</b>{" "}
            Co-architected a distributed Elasticsearch platform indexing <M>60M+</M> SKUs across
            multiple indices on a <M>32-node</M> cluster serving <M>20K+</M> merchants.
          </>,
          <>
            Scaled write throughput to <M>~10K writes/sec</M> from Kafka consumers via
            asynchronous batch commits, shard-level parallelism, and optimized indexing
            pipelines — cutting data lag from <M>1–2 hours</M> to under <M>30 minutes</M> during
            Double 11 and 618 peak campaigns.
          </>,
          <>
            Sustained <M>500K+ QPS</M> on the read path through hot/cold data separation,{" "}
            <code className="font-mono text-[13px] text-white/[0.7]">index_sort</code>,
            filter-only queries, and dynamic replica scaling up to <M>128 replicas</M>.
          </>,
          <>
            Resolved critical write failures caused by the <M>2.1B</M> doc-per-node limit via
            routing redesign, and enforced cluster guardrails plus nightly{" "}
            <code className="font-mono text-[13px] text-white/[0.7]">force_merge</code>.
          </>,
          <>
            <b className="font-medium text-white/[0.82]">Search reconciliation platform.</b>{" "}
            Built a distributed reconciliation system from scratch keeping MySQL and
            Elasticsearch near real-time consistent — a <M>3-level</M> diff engine (field, scope,
            and document count), a pluggable rule engine, non-blocking multi-source loaders over
            Dubbo, self-healing repair with exponential-backoff retries, and full audit logging
            with message replay.
          </>,
        ],
        tags: ["Java", "Elasticsearch", "Kafka", "Redis", "MySQL", "Dubbo"],
      },
    ],
  },
  {
    title: "2019 — 21",
    roles: [
      {
        company: "Souche (Dasouche)",
        role: "Senior Java Software Engineer",
        blurb: "Used-car trading SaaS platform for automotive dealers across China.",
        period: "Mar 2019 — May 2021",
        location: "Hangzhou, China",
        kind: "work",
        points: [
          <>
            Led development of the Vehicle Product Center platform serving{" "}
            <M>40,000+</M> automotive businesses.
          </>,
          <>
            Designed configurable workflow and business-rule automation inspired by Salesforce
            Flow, letting non-technical users define event-driven processes without code
            changes.
          </>,
          <>
            Developed a metadata-driven rule engine on Elasticsearch, Redis, MySQL, and
            Painless scripting.
          </>,
          <>
            Built scalable backend services and APIs supporting product lifecycle management
            and tenant-specific customization.
          </>,
        ],
        tags: ["Java", "Rule Engine", "Elasticsearch", "Multi-tenant SaaS"],
      },
    ],
  },
  {
    title: "2016 — 19",
    roles: [
      {
        company: "Zhejiang Sendinfo Technology",
        role: "Junior Developer",
        period: "Mar 2017 — Mar 2019",
        location: "Hangzhou, China",
        kind: "work",
        points: [
          <>
            Delivered ERP systems and analytics solutions for tourism industry digital
            transformation initiatives.
          </>,
        ],
        tags: ["Java", "ERP", "Analytics"],
      },
      {
        company: "Zhejiang Yonyou Software",
        role: "Junior Developer",
        blurb: "Regional arm of one of China's largest enterprise software vendors.",
        period: "Jan 2016 — Mar 2017",
        location: "Hangzhou, China",
        kind: "work",
        points: [
          <>
            Developed enterprise mobility and customer loyalty platform solutions for large
            corporate clients.
          </>,
        ],
        tags: ["Java", "Enterprise Mobility"],
      },
    ],
  },
];

const ENTRIES: TimelineEntry[] = TIMELINE.map((group) => ({
  title: group.title,
  content: (
    <>
      {group.roles.map((role) => (
        <RoleCard key={role.company + role.period} role={role} />
      ))}
    </>
  ),
}));

export function Experience() {
  return (
    <section id="experience" className="border-t border-white/[0.08] py-24">
      <SectionHeading
        eyebrow="EXPERIENCE"
        title="Where I've Worked."
        subtitle="Nine years of backend engineering across e-commerce, SaaS, and manufacturing — now moving into data and AI."
      />
      <div className="container-x">
        <Timeline data={ENTRIES} />
      </div>
    </section>
  );
}
