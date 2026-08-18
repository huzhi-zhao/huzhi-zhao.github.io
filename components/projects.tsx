"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { SectionHeading } from "@/components/section-heading";
import { ArrowUpRight } from "@/components/icons";

type Project = {
  title: string;
  visual: string;
  caption: string;
  badge: { text: string; className: string; dot?: boolean };
  body: React.ReactNode;
  tags: string[];
  links: { label: string; href: string }[];
  note?: string;
};

const PROJECTS: Project[] = [
  {
    title: "NYC Urban Operations Intelligence Platform",
    visual: "linear-gradient(135deg,#0e3a52,#0a2438)",
    caption: "NYC · 311",
    badge: {
      text: "Experimental",
      className: "bg-[rgba(245,158,11,0.12)] border-[rgba(245,158,11,0.4)] text-[#f5b942]",
    },
    body: (
      <>
        A hands-on, production-style data engineering project I built solo: a lakehouse
        pipeline that ingests NYC 311 requests, collisions, and weather data through
        Bronze/Silver/Gold layers to generate daily Operational Load Scores and
        resource-allocation recommendations per borough.
      </>
    ),
    tags: ["Airflow", "Spark", "BigQuery", "Lakehouse"],
    links: [
      {
        label: "Source Code",
        href: "https://github.com/huzhi-zhao/NYC-Urban-Operations-Intelligence-Platform",
      },
    ],
  },
  {
    title: "Factory MES Platform & Analytics Platform",
    visual: "linear-gradient(135deg,#4a3414,#2a1d0c)",
    caption: "Manufacturing Execution System",
    badge: {
      text: "Production",
      className: "bg-[rgba(29,191,115,0.12)] border-[rgba(29,191,115,0.4)] text-[#4fe0a0]",
      dot: true,
    },
    body: (
      <>
        Designed and delivered a production-grade MES as the <b>sole developer</b>, enabling
        end-to-end manufacturing operations including production tracking, quality control,
        inventory management, workshop data collection, and real-time operational analytics.
      </>
    ),
    tags: ["Golang", "Vue.js", "MySQL", "Android"],
    links: [
      { label: "Live Demo", href: "https://mes.huzhi.dev/en/" },
      { label: "Client Website", href: "http://www.shtipo.com/en/" },
    ],
    note: "🔒 Source code is private — this is a confidential client deployment.",
  },
  {
    title: "AI Agent Icon Curation Pipeline + macOS App",
    visual: "linear-gradient(135deg,#3a2160,#1f1238)",
    caption: "AI · Mac Folder Icons",
    badge: {
      text: "✨ AI Agent",
      className: "bg-[rgba(139,92,246,0.14)] border-[rgba(139,92,246,0.45)] text-[#b69bfa]",
    },
    body: (
      <>
        A two-repo personal project built around an{" "}
        <strong>AI agent that orchestrates multiple Gemini API calls</strong> to auto-generate
        descriptive documentation and classification tags for thousands of folder icons —
        feeding a macOS app (Electron + Vue 3) that lets anyone customize folder icons for
        free.
      </>
    ),
    tags: ["Gemini API", "AI Agent", "Python", "Electron", "Vue 3"],
    links: [
      { label: "App Repo", href: "https://github.com/tigerai-tech/folder-icon-management" },
      { label: "AI Pipeline Repo", href: "https://github.com/tigerai-tech/folder-icon-annotation" },
    ],
  },
];

export function Projects() {
  return (
    <section id="projects" className="border-t border-white/[0.08] py-24">
      <SectionHeading
        eyebrow="PROJECTS"
        title="Projects I've Shipped."
        subtitle="A couple of projects showing how I take systems from raw data to production."
      />
      <div className="container-x grid gap-6 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <CardContainer
            key={p.title}
            containerClassName="h-full w-full items-stretch"
            className="h-full w-full items-stretch"
          >
            <CardBody className="h-full w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-elevated transition-colors duration-300 hover:border-white/[0.16]">
              <CardItem
                translateZ={30}
                className="relative flex h-[150px] w-full items-center justify-center font-mono text-[22px] font-bold tracking-[1px] text-white/[0.85]"
                style={{ background: p.visual }}
              >
                <span
                  className={`absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full border px-3 py-[5px] font-mono text-[11px] font-medium tracking-[0.4px] backdrop-blur-[6px] ${p.badge.className}`}
                >
                  {p.badge.dot && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                  {p.badge.text}
                </span>
                <span className="px-6 text-center">{p.caption}</span>
              </CardItem>

              <div className="p-7">
                <CardItem
                  as="h3"
                  translateZ={40}
                  className="mb-3 font-heading text-[19px] font-medium text-white"
                >
                  {p.title}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ={20}
                  className="w-full text-[14.5px] leading-[1.65] text-muted"
                >
                  {p.body}
                </CardItem>
                <CardItem translateZ={30} className="mt-[18px] flex w-full flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </CardItem>
                <CardItem translateZ={50} className="mt-5 flex w-full flex-wrap gap-2.5">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener"
                      className="btn-outline btn-sm"
                    >
                      {l.label}
                      <ArrowUpRight />
                    </a>
                  ))}
                </CardItem>
                {p.note && (
                  <CardItem as="p" translateZ={20} className="mt-[18px] text-[13px] text-faint">
                    {p.note}
                  </CardItem>
                )}
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </section>
  );
}
