"use client";

import Image from "next/image";
import { Timeline, type TimelineEntry } from "@/components/ui/timeline";
import { SectionHeading } from "@/components/section-heading";
import { Rich } from "@/components/rich-text";
import { ArrowUpRight } from "@/components/icons";
import { EXPERIENCE, ADDITIONAL, EDUCATION, type Role } from "@/lib/content/experience";

const KIND_BADGE: Record<NonNullable<Role["kind"]>, string> = {
  work: "border-white/[0.16] text-muted",
  study: "border-[rgba(43,108,255,0.4)] bg-[rgba(43,108,255,0.12)] text-[#7ba6ff]",
  break: "border-[rgba(245,158,11,0.4)] bg-[rgba(245,158,11,0.12)] text-[#f5b942]",
};

/**
 * 标题行的公司 logo。给了 href 就包一层外链 —— 点它跳官网，
 * 而不是触发外层 <summary> 的折叠（stopPropagation + preventDefault）。
 */
function CompanyLogo({ logo }: { logo: NonNullable<Role["logo"]> }) {
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      /* 统一按 20px 高、宽度等比 —— 所有 logo 视觉高度一致。 */
      className={`h-5 w-auto shrink-0 object-contain${logo.invert ? " invert" : ""}`}
    />
  );

  if (!logo.href) return img;

  return (
    <a
      href={logo.href}
      target="_blank"
      rel="noopener noreferrer"
      title={`${logo.alt} — company website`}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        window.open(logo.href, "_blank", "noopener,noreferrer");
      }}
      className="shrink-0 opacity-80 transition-opacity hover:opacity-100"
    >
      {img}
    </a>
  );
}

/**
 * 折叠用原生 <details>/<summary>：键盘操作与 aria-expanded 语义免费获得（FR-4.5），
 * 且 JS 未加载时内容依然可展开。默认折叠（Weimob 例外：defaultOpen），可同时展开多条（FR-4.3）。
 */
function TechTags({ tech, className = "" }: { tech: string[]; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {tech.map((t) => (
        <span key={t} className="tag text-[11.5px]">
          {t}
        </span>
      ))}
    </div>
  );
}

function RoleCard({ role }: { role: Role }) {
  return (
    <details open={role.defaultOpen} className="group mb-3 rounded-2xl border border-white/[0.08] bg-elevated transition-colors duration-300 hover:border-white/[0.16] open:border-white/[0.16]">
      <summary className="flex cursor-pointer list-none items-start gap-4 p-5 md:p-6 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            {role.logo && <CompanyLogo logo={role.logo} />}
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

          {/* 折叠态：技术栈跟在 headline 后面，一眼可扫。展开后交给卡片底部那份。 */}
          {/* 展开态：技术栈回到卡片最底部。 */}
        {role.tech && role.tech.length > 0 && (
            <TechTags tech={role.tech} className="mt-3 group-open:hidden" />
          )}
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

        {/* 展开态：技术栈回到卡片最底部。 */}
        {role.tech && role.tech.length > 0 && <TechTags tech={role.tech} className="mt-6" />}
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

/**
 * Education 自成一层，排在时间线之前：Experience 最新一条止于 2025-02，
 * 在读学历必须先出现，否则页面读起来像最近一年半是空的。
 */
function Education() {
  return (
    <div className="container-x mb-14 max-w-[900px]">
      <h3 className="mb-5 border-b border-white/[0.08] pb-3 font-mono text-[11px] uppercase tracking-[1.5px] text-faint">
        Education
      </h3>
      <ul className="flex flex-col">
        {EDUCATION.map((e) => (
          <li
            key={e.school + e.period}
            className="border-b border-white/[0.04] py-4 last:border-0"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className="flex items-center gap-2.5">
                {e.logo && <CompanyLogo logo={e.logo} />}
                <span className="text-[15px] font-medium text-white/[0.9]">{e.school}</span>
              </span>
              <span className="font-mono text-[12.5px] text-faint">
                {e.period}
                {e.location && (
                  <>
                    <span aria-hidden className="mx-2 text-white/[0.16]">
                      ·
                    </span>
                    {e.location}
                  </>
                )}
              </span>
            </div>
            <p className="mt-1.5 text-[14px] leading-relaxed text-white/[0.72]">{e.credential}</p>
            {e.focus && <p className="mt-1 text-[13.5px] text-muted">{e.focus}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

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
      <Education />
      <div className="container-x">
        <Timeline data={ENTRIES} />
      </div>
      <AdditionalExperience />
    </section>
  );
}
