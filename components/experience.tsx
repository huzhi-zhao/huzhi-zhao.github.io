"use client";

import Image from "next/image";
import { Timeline, type TimelineEntry } from "@/components/ui/timeline";
import { SectionHeading } from "@/components/section-heading";
import { Rich } from "@/components/rich-text";
import { ArrowUpRight } from "@/components/icons";
import { EXPERIENCE, ADDITIONAL, type Role } from "@/lib/content/experience";

const KIND_BADGE: Record<NonNullable<Role["kind"]>, string> = {
  work: "border-white/[0.16] text-muted",
  study: "border-[rgba(43,108,255,0.4)] bg-[rgba(43,108,255,0.12)] text-[#7ba6ff]",
  break: "border-[rgba(245,158,11,0.4)] bg-[rgba(245,158,11,0.12)] text-[#f5b942]",
};

/**
 * 折叠用原生 <details>/<summary>：键盘操作与 aria-expanded 语义免费获得（FR-4.5），
 * 且 JS 未加载时内容依然可展开。默认全部折叠，可同时展开多条（FR-4.3）。
 */
function RoleCard({ role }: { role: Role }) {
  return (
    <details className="group mb-3 rounded-2xl border border-white/[0.08] bg-elevated transition-colors duration-300 hover:border-white/[0.16] open:border-white/[0.16]">
      <summary className="flex cursor-pointer list-none items-start gap-4 p-5 md:p-6 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <h4 className="font-heading text-[17px] font-medium leading-snug text-white">
              {role.company}
            </h4>
            {role.kind && role.kind !== "work" && (
              <span
                className={`rounded-full border px-2.5 py-[3px] font-mono text-[10.5px] uppercase tracking-[1px] ${KIND_BADGE[role.kind]}`}
              >
                {role.kind === "study" ? "Studying" : "Career break"}
              </span>
            )}
            <span className="font-mono text-[12px] text-faint">{role.period}</span>
          </div>
          <p className="text-[14px] leading-[1.6] text-muted">
            <Rich text={role.headline} />
          </p>
        </div>

        <span
          aria-hidden
          className="mt-1 shrink-0 text-faint transition-transform duration-300 group-open:rotate-180"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </summary>

      <div className="px-5 pb-6 md:px-6">
        <p className="mb-4 text-[14px] text-white/[0.82]">{role.role}</p>

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

        {/* CSI 三段式是目标形态；points 是尚未迁移的过渡形态（见 lib/content/experience.ts）。 */}
        {role.achievements?.length ? (
          <div className="flex flex-col gap-5">
            {role.achievements.map((a, i) => (
              <div key={i} className="flex flex-col gap-1.5 text-[14.5px] leading-[1.65]">
                {(
                  [
                    ["Challenge", a.challenge],
                    ["Solution", a.solution],
                    ["Impact", a.impact],
                  ] as const
                ).map(([label, text]) => (
                  <p key={label} className="grid gap-x-3 md:grid-cols-[86px_1fr]">
                    <span className="font-mono text-[11px] uppercase tracking-[1px] text-faint md:pt-[5px]">
                      {label}
                    </span>
                    <span className="text-muted">
                      <Rich text={text} />
                    </span>
                  </p>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {role.points?.map((point, i) => (
              <li key={i} className="relative pl-5 text-[14.5px] leading-[1.65] text-muted">
                <span className="absolute left-0 top-[9px] h-1.5 w-1.5 rounded-full bg-accent" />
                <Rich text={point} />
              </li>
            ))}
          </ul>
        )}

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

        {role.tech && role.tech.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {role.tech.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </details>
  );
}

const ENTRIES: TimelineEntry[] = EXPERIENCE.map((group) => ({
  title: group.title,
  content: (
    <>
      {group.roles.map((role) => (
        <RoleCard key={role.company + role.period} role={role} />
      ))}
    </>
  ),
}));

/** Chronological B 的 "Additional Experience"：一行一条，不给成就、不可展开。 */
function AdditionalExperience() {
  return (
    <div className="container-x mt-16 max-w-[900px]">
      <h3 className="mb-5 border-b border-white/[0.08] pb-3 font-mono text-[11px] uppercase tracking-[1.5px] text-faint">
        Additional experience
      </h3>
      <ul className="flex flex-col">
        {ADDITIONAL.map((r) => (
          <li
            key={r.company + r.period}
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-white/[0.04] py-3 last:border-0"
          >
            <span className="text-[14.5px] text-white/[0.82]">
              {r.role}
              <span aria-hidden className="mx-2 text-white/[0.16]">
                ·
              </span>
              <span className="text-muted">{r.company}</span>
            </span>
            <span className="font-mono text-[12.5px] text-faint">
              {r.period}
              {r.location && (
                <>
                  <span aria-hidden className="mx-2 text-white/[0.16]">
                    ·
                  </span>
                  {r.location}
                </>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

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
      <AdditionalExperience />
    </section>
  );
}
