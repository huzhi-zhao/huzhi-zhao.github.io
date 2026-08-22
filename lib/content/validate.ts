/**
 * 把 ADR 的约束变成会在构建阶段报错的东西，而不是文档里的君子协定
 * （设计文档 0001 §3.6）。数据模块在加载时调用，`next build` 阶段即失败。
 */
import { DOMAINS } from "./taxonomy";
import type { Project } from "./projects";
import type { RoleGroup } from "./experience";

const fail = (msg: string): never => {
  throw new Error(`[content] ${msg}`);
};

const TEASER_MAX_WORDS = 25;

export function validateProjects(projects: Project[]) {
  if (Object.keys(DOMAINS).length > 3) {
    fail(`DOMAINS 最多 3 个（ADR-0003 约束 1），当前 ${Object.keys(DOMAINS).length} 个`);
  }

  const seen = new Set<string>();
  for (const p of projects) {
    if (seen.has(p.slug)) fail(`项目 slug 重复：${p.slug}`);
    seen.add(p.slug);

    if (!p.question.trim().endsWith("?")) {
      fail(`项目 ${p.slug} 的 question 必须是疑问句（ADR-0004 约束 1）`);
    }
    const words = p.teaser.trim().split(/\s+/).length;
    if (words > TEASER_MAX_WORDS) {
      fail(`项目 ${p.slug} 的 teaser ${words} 词，超过 ${TEASER_MAX_WORDS} 词上限（FR-3.4）`);
    }
    if (!(p.domain in DOMAINS)) fail(`项目 ${p.slug} 的 domain 未定义：${p.domain}`);
    if (!p.image.src || !p.image.alt) fail(`项目 ${p.slug} 缺图片或 alt`);
    if (!p.destination.href) fail(`项目 ${p.slug} 缺 destination`);
  }
}

export function validateExperience(groups: RoleGroup[]) {
  for (const group of groups) {
    for (const r of group.roles) {
      if (!r.headline.trim()) fail(`${r.company} 缺 headline（FR-4.1）`);

      // achievements 一旦出现，三段必须齐全 —— "缺 Impact" 在这里被拦住（ADR-0007 约束 1）。
      for (const a of r.achievements ?? []) {
        if (!a.challenge.trim() || !a.solution.trim() || !a.impact.trim()) {
          fail(`${r.company} 有成就条目三段不齐（ADR-0007 约束 1）`);
        }
      }
      if (!r.achievements?.length && !r.points?.length) {
        fail(`${r.company} 展开态没有任何内容；不该出现在 EXPERIENCE，应移入 ADDITIONAL`);
      }
    }
  }
}
