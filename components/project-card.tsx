import Image from "next/image";
import { DOMAINS } from "@/lib/content/taxonomy";
import type { Project } from "@/lib/content/projects";

const STATUS: Record<NonNullable<Project["status"]>, { text: string; className: string; dot?: boolean }> = {
  "in-progress": {
    text: "In Progress",
    className: "border-[rgba(245,158,11,0.4)] bg-[rgba(245,158,11,0.12)] text-[#f5b942]",
  },
  production: {
    text: "Production",
    className: "border-[rgba(29,191,115,0.4)] bg-[rgba(29,191,115,0.12)] text-[#4fe0a0]",
    dot: true,
  },
  archived: {
    text: "Archived",
    className: "border-white/[0.16] text-muted",
  },
};

/**
 * 整卡是唯一的链接元素（FR-3.3）—— 卡内不允许再出现 <a> / <button>。
 * hover 遮罩用 group-hover 纯 CSS 实现，且只在真正支持 hover 的指针设备上渲染样式（FR-3.7）。
 */
export function ProjectCard({ project }: { project: Project }) {
  // status 可省略 —— 省略时不渲染角标（个人开源项目没有合适的状态词）。
  const status = project.status ? STATUS[project.status] : null;

  return (
    <a
      href={project.destination.href}
      target="_blank"
      rel="noopener"
      aria-label={`${project.title} (opens in a new tab)`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-elevated transition duration-300 hover:-translate-y-0.5 hover:border-white/[0.16]"
    >
      <figure className="relative m-0 aspect-video w-full overflow-hidden bg-[#0f0f0f]">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />

        {status && (
          <span
            className={`absolute left-3.5 top-3.5 z-10 inline-flex items-center gap-1.5 rounded-full border px-3 py-[5px] font-mono text-[11px] font-medium tracking-[0.4px] backdrop-blur-[6px] ${status.className}`}
          >
            {status.dot && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
            {status.text}
          </span>
        )}

        {/* 触屏设备上这一层永不出现 —— 比宽度断点准确，覆盖触屏笔记本。 */}
        <figcaption className="card-caption pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-[linear-gradient(to_top,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.75)_55%,transparent_100%)] p-5 text-[13.5px] leading-[1.55] text-white/[0.88]">
          {project.teaser}
        </figcaption>
      </figure>

      <div className="flex flex-1 flex-col p-6">
        <span className="eyebrow mb-3 self-start">{DOMAINS[project.domain]}</span>

        <h3 className="mb-2 font-heading text-[19px] font-medium leading-snug text-white">
          {project.title}
        </h3>

        <p className="mb-5 truncate text-[14.5px] text-muted">{project.question}</p>

        <div className="mt-auto flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
