import { LINKS } from "./links";
import type { DomainKey } from "./taxonomy";
import { validateProjects } from "./validate";

export type Project = {
  slug: string;
  title: string;
  /** 疑问句，卡面单行不折行（ADR-0004 约束 1 / FR-3.2）。**未定稿**。 */
  question: string;
  domain: DomainKey;
  /** 问题域标签同一行、右对齐显示。 */
  year: string;
  /** 省略即不渲染角标 —— 个人开源项目没有合适的状态词。 */
  status?: "in-progress" | "production" | "archived";
  /** 唯一主点击目标（FR-3.3）。wiki 未就绪时退化为 repo / demo。 */
  destination: { href: string; kind: "wiki" | "demo" | "repo" };
  /** 16:9。当前为占位图，P5 换成设计产出，只改这里。 */
  image: { src: string; alt: string };
  /** hover 遮罩里的简介，≤25 词（FR-3.4，构建期校验）。 */
  teaser: string;
  tech: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "urban-ops",
    title: "Urban Operations Intelligence Platform",
    question: "How does a city know where to send its plows after a snowfall?",
    year: "2026",
    domain: "operational",
    status: "in-progress",
    destination: { href: LINKS.uoipRepo.href, kind: "repo" },
    image: {
      // 占位图（2026-08-21），待 P5 替换为 Bronze→Silver→Gold 三段示意图。
      src: "https://mowsnowpros.com/wp-content/uploads/2022/01/Hero-Images-1920x1200-1610-3.jpg",
      alt: "Urban Operations Intelligence Platform",
    },
    teaser:
      "A self-hosted lakehouse ingesting City of Winnipeg open data through Bronze, Silver and Gold layers into a per-zone winter operational load score.",
    tech: ["Airflow", "Spark", "MinIO", "Trino", "Lakehouse"],
  },
  {
    slug: "toucan-shelf",
    title: "ToucanShelf — AI-Native Knowledge Base",
    question: "Where should an AI agent read and write your team's knowledge?",
    year: "2026",
    domain: "ai",
    status: "in-progress",
    destination: { href: LINKS.toucanShelfRepo.href, kind: "repo" },
    image: {
      // 占位图（2026-08-21），仓库自带的架构示意图，待 P5 统一替换。
      src: "https://raw.githubusercontent.com/huzhi-zhao/toucan-shelf/main/docs/images/overview.svg",
      alt: "ToucanShelf — AI-Native Knowledge Base",
    },
    teaser:
      "A self-hosted hierarchical knowledge base: folder trees, live gallery views, RAG search, and an MCP server that AI agents read and write directly.",
    tech: ["RAG", "MCP", "Golang", "React", "SQLite"],
  },
  {
    slug: "factory-mes",
    title: "Factory MES & Analytics Platform",
    question: "How do you get 20+ production stages onto one system?",
    year: "2025",
    domain: "industrial",
    status: "production",
    destination: { href: LINKS.mesDemo.href, kind: "demo" },
    image: {
      // 占位图（2026-08-21），待 P5 替换为单个代表性模块的放大截图。
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAJMJMOYpoWEXC4DZ3U4XpXOBpE_mzMJ7ISbaJfPuKN3yTtQuS_buYy49X&s=10",
      alt: "Factory MES & Analytics Platform",
    },
    teaser:
      "A production-grade manufacturing execution system built solo — Go services, RBAC, operational dashboards and Android shop-floor apps.",
    tech: ["Golang", "Vue.js", "MySQL", "Android", "RBAC"],
  },
  {
    slug: "icon-pipeline",
    title: "AI Agent Icon Curation Pipeline",
    question: "How do you describe and tag thousands of folder icons without doing it by hand?",
    year: "2025",
    domain: "ai",
    // 未决问题 1（设计文档 0001 §5）：primary destination 选 App repo 还是 pipeline repo。
    destination: { href: LINKS.iconApp.href, kind: "repo" },
    image: {
      // 占位图（2026-08-21）。
      // 原 figma hub 封面链接 403（防盗链/过期），2026-08-21 换成仓库自带图。
      src: "https://raw.githubusercontent.com/tigerai-tech/folder-icon-management/main/docs/post.png",
      alt: "AI Agent Icon Curation Pipeline",
    },
    teaser:
      "An AI agent orchestrating Gemini calls to auto-generate descriptions and classification tags for thousands of folder icons, feeding a free macOS app.",
    tech: ["Gemini API", "BLIP", "CLIP", "AI Agent", "Vue 3"],
  },
];

validateProjects(PROJECTS);
