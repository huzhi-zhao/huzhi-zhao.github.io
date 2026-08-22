/**
 * L3 思考层的文章索引（ADR-0006）。
 * 首篇 paper 就绪前保持为空数组 —— Writing 板块与导航项在空数据时整体不渲染（FR-6.2）。
 */
export type Article = {
  title: string;
  summary: string;
  date: string;
  readingMinutes: number;
  href: string;
  featured?: boolean;
};

export const ARTICLES: Article[] = [];
