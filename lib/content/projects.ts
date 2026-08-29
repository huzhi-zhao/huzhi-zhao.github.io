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
  /**
   * 角标只给「特别有代表性」的项目 —— 不是进度指示器，省略即不渲染。
   * production = 有真实甲方的盈利性全栈项目；conference = 已被会议接收、要上台宣讲的研究型项目。
   */
  status?: "conference" | "production" | "archived";
  /** 唯一主点击目标（FR-3.3）。wiki 未就绪时退化为 repo / demo。 */
  destination: { href: string; kind: "wiki" | "demo" | "repo" };
  /**
   * hover 时卡片右上角出现的 GitHub 图标，一个仓库一个。
   * 省略时按 destination 推导（kind === "repo" 才有）。
   */
  repos?: { href: string; label: string }[];
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
    status: "conference",
    destination: { href: LINKS.uoipRepo.href, kind: "repo" },
    image: {
      src: "/projects/urban-ops.svg",
      alt: "UOIP 示意图：311 报告、排班表与气象数据合流，按降雪事件切分，输出各分区的运行负载排名",
    },
    teaser:
      "A self-hosted lakehouse ingesting City of Winnipeg open data through Bronze, Silver and Gold layers into a per-zone winter operational load score.",
    tech: ["Airflow", "Spark", "MinIO", "Trino", "Lakehouse"],
  },
  {
    slug: "toucan-shelf",
    title: "ToucanShelf — Self-Hosted Knowledge Base",
    question: "What turns a stream of notes into a knowledge base a team can live in?",
    year: "2026",
    domain: "ai",
    destination: { href: LINKS.toucanShelfRepo.href, kind: "repo" },
    image: {
      src: "/projects/toucan-shelf.svg",
      alt: "ToucanShelf 示意图：左侧层级目录树与 gallery 视图，右侧一篇文档内的日历、表格、draw.io 与加密块",
    },
    teaser:
      "A fork that adds folder trees, gallery views, encrypted and interactive blocks, git round-trip sync and public publishing — one Go binary, one SQLite file.",
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
      src: "/projects/factory-mes.svg",
      alt: "Factory MES 产线示意图：24 道工序串成一条主线，Web 看板与安卓工位端分支接入",
    },
    teaser:
      "A production-grade manufacturing execution system built solo — Go services, RBAC, operational dashboards and Android shop-floor apps.",
    tech: ["Golang", "Vue.js", "MySQL", "Android", "RBAC"],
  },
  {
    slug: "icon-pipeline",
    title: "Vision-Model Icon Annotation Pipeline",
    question: "How do you make 1,783 icons searchable without writing a single keyword?",
    year: "2025",
    domain: "ai",
    // 未决问题 1（设计文档 0001 §5）：primary destination 选 App repo 还是 pipeline repo。
    destination: { href: LINKS.iconPipeline.href, kind: "repo" },
    repos: [
      { href: LINKS.iconPipeline.href, label: "Annotation pipeline repo" },
      { href: LINKS.iconApp.href, label: "macOS app repo" },
    ],
    image: {
      src: "/projects/icon-pipeline.svg",
      alt: "图标标注管线示意图：爬取的图片经 CNN 过滤，由 CLIP 与 BLIP 描述，再以自身标签重命名",
    },
    teaser:
      "A fine-tuned CNN filters scraped images, CLIP and BLIP describe them, and each icon is renamed after its own tags, making filename search semantic.",
    tech: ["CLIP", "BLIP", "Gemini API", "ResNet50V2", "Computer Vision"],
  },
];

validateProjects(PROJECTS);
