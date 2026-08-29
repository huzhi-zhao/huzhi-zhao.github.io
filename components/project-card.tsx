import Image from "next/image";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { DOMAINS } from "@/lib/content/taxonomy";
import type { Project } from "@/lib/content/projects";

/**
 * 角标放在卡面右上角 —— 卡内插图的信息重心都在左上角，压那里会和字标打架。
 * 主色跟着卡面插图走：城市运营那张是琥珀，MES 那张是绿。
 */
const STATUS: Record<NonNullable<Project["status"]>, { text: string; accent: string; dot?: boolean }> = {
  // 琥珀与 urban-ops.svg 的主色（#f5b942）同一支，角标不再像贴上去的另一套配色。
  conference: { text: "Conference Talk", accent: "#f5b942" },
  production: { text: "Production", accent: "#1dbf73", dot: true },
  archived: { text: "Archived", accent: "#9aa5ad" },
};

/** hex → rgba，只给角标这几处调透明度用。 */
function alpha(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

/**
 * 角标做成一枚独立的铭牌：暗玻璃底 + 一圈同色细描边 + 同色字，离开卡片边缘内缩摆放。
 * 之前那条铺到边的实心绶带太像电商促销条；铭牌形态更接近"资质/状态标识"，
 * 也不会盖住插图。左侧的小标记（投产是呼吸点、其余是方点）给它一个固定的读法起点。
 */
function StatusBadge({ text, accent, dot }: { text: string; accent: string; dot?: boolean }) {
  return (
    <div className="pointer-events-none absolute right-4 top-4 z-10">
      <span
        className="inline-flex h-7 items-center gap-2 rounded-[7px] border px-2.5 font-mono text-[10.5px] font-semibold uppercase leading-none tracking-[1.3px] backdrop-blur-[8px]"
        style={{
          borderColor: alpha(accent, 0.45),
          background: `linear-gradient(180deg, ${alpha(accent, 0.18)}, ${alpha(accent, 0.07)}), rgba(9, 11, 13, 0.78)`,
          color: accent,
          boxShadow: `0 2px 12px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.08)`,
        }}
      >
        {dot ? (
          <span
            className="h-[5px] w-[5px] shrink-0 rounded-full"
            style={{ backgroundColor: accent, boxShadow: `0 0 0 3px ${alpha(accent, 0.18)}` }}
          />
        ) : (
          <span
            className="h-[4px] w-[4px] shrink-0 rotate-45"
            style={{ backgroundColor: accent }}
          />
        )}
        {text}
      </span>
    </div>
  );
}

/** GitHub mark（官方 24×24 路径），仅作装饰，语义由外层 a 的 aria-label 承担。 */
function GithubMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-[18px] w-[18px] fill-current">
      <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"/>
    </svg>
  );
}

/** 闭源项目（甲方私有仓库）在同一位置显示一个不可点击的锁，说明"没有仓库链接"而不是漏了。 */
function ClosedSourceMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-[17px] w-[17px] fill-none stroke-current stroke-[1.8]">
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

/**
 * 卡面主链接用铺满整卡的透明 <a>（FR-3.3 的唯一主点击目标）——
 * 这样右上角的仓库图标才能作为独立链接叠在它上面，而不产生嵌套 <a>。
 * hover 遮罩用 group-hover 纯 CSS 实现，且只在真正支持 hover 的指针设备上渲染样式（FR-3.7）。
 * 工业 / 准工业项目（UOIP、MES）的问题域标签用 Moving Border 动效强调
 * （as="span"，同上），其余沿用低调的 eyebrow。
 */
/** 用动效标签强调的问题域 —— 其余走静态 eyebrow。 */
const EMPHASISED: ReadonlySet<Project["domain"]> = new Set(["operational", "industrial"]);

/** 动效光点跟随该问题域角标的颜色 —— operational 走琥珀（conference），industrial 走绿（production）。 */
const EMPHASIS_GLOW: Partial<Record<Project["domain"], string>> = {
  operational: "bg-[radial-gradient(#f5b942_40%,transparent_60%)]",
  industrial: "bg-[radial-gradient(var(--accent-green)_40%,transparent_60%)]",
};

export function ProjectCard({ project }: { project: Project }) {
  // status 可省略 —— 省略时不渲染角标（个人开源项目没有合适的状态词）。
  const status = project.status ? STATUS[project.status] : null;
  // 未显式声明 repos 时按 destination 推导 —— demo 型项目（MES）没有公开仓库。
  const repos =
    project.repos ??
    (project.destination.kind === "repo"
      ? [{ href: project.destination.href, label: "GitHub repo" }]
      : []);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-elevated transition duration-300 hover:-translate-y-0.5 hover:border-white/[0.16]">
      <a
        href={project.destination.href}
        target="_blank"
        rel="noopener"
        aria-label={`${project.title} (opens in a new tab)`}
        className="absolute inset-0 z-10 rounded-2xl"
      />
      <figure className="relative m-0 aspect-video w-full overflow-hidden bg-[#0f0f0f]">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />

        {status && <StatusBadge text={status.text} accent={status.accent} dot={status.dot} />}

        <div className="card-repos absolute bottom-3.5 right-3.5 z-20 items-center gap-2">
          {repos.length === 0 && (
            <span
              title="Closed source — client-owned repository"
              className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/[0.16] bg-black/60 px-3 font-mono text-[10.5px] tracking-[0.4px] text-white/[0.6] backdrop-blur-[6px]"
            >
              <ClosedSourceMark />
              Closed Source
            </span>
          )}
          {repos.map((repo) => (
            <a
              key={repo.href}
              href={repo.href}
              target="_blank"
              rel="noopener"
              aria-label={`${project.title} — ${repo.label} (opens in a new tab)`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.16] bg-black/60 text-white/[0.75] backdrop-blur-[6px] transition hover:border-white/[0.32] hover:text-white"
            >
              <GithubMark />
            </a>
          ))}
        </div>

        {/* 触屏设备上这一层永不出现 —— 比宽度断点准确，覆盖触屏笔记本。 */}
        <figcaption className="card-caption pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-[linear-gradient(to_top,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.75)_55%,transparent_100%)] p-5 text-[13.5px] leading-[1.55] text-white/[0.88]">
          {project.teaser}
        </figcaption>
      </figure>

      <div className="flex flex-1 flex-col p-6">
        <div className={`flex items-center justify-between gap-3 ${EMPHASISED.has(project.domain) ? "mb-5" : "mb-3"}`}>
          {EMPHASISED.has(project.domain) ? (
            <MovingBorderButton
              as="span"
              borderRadius="1.75rem"
              duration={3000}
              containerClassName="shrink-0 text-xs"
              borderClassName={`h-20 w-20 opacity-[0.8] ${EMPHASIS_GLOW[project.domain] ?? ""}`}
              className="border-white/[0.12] bg-elevated px-4 py-1.5 font-mono text-[11px] uppercase tracking-[1.5px] text-white/[0.9]"
            >
              {DOMAINS[project.domain]}
            </MovingBorderButton>
          ) : (
            <span className="eyebrow">{DOMAINS[project.domain]}</span>
          )}
          <span className="font-mono text-[12px] text-faint">{project.year}</span>
        </div>

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
    </article>
  );
}
