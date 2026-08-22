/**
 * 问题域标签的单点定义（ADR-0003 约束 5）。
 * 措辞未定稿 —— 改这里即可全站生效，不要在组件里写死。
 */
export const DOMAINS = {
  operational: "Operational Data Platforms",
  industrial: "Industrial Systems",
  ai: "Applied AI",
} as const;

export type DomainKey = keyof typeof DOMAINS;
