import { validateExperience } from "./validate";

/**
 * 成就条目的目标形态（ADR-0007：Challenge → Solution → Impact，Impact 不可省）。
 * 三个独立字段是为了让"缺 Impact"在类型层面无法表达。
 */
export type Achievement = { challenge: string; solution: string; impact: string };

export type Role = {
  company: string;
  role: string;
  /** 一行公司背景 —— 这些名字对北美读者没有信息量。 */
  blurb?: string;
  period: string;
  location?: string;
  kind?: "work" | "study" | "break";
  /**
   * 折叠态那一行（FR-4.1）。
   * 当前内容是现有事实的机械拼接，**未定稿** —— P2 按 CSI 缩写重写。
   */
  headline: string;
  /**
   * 展开态的目标形态。P2 起逐条从 `points` 迁移过来。
   * 一旦某条 Role 有了 achievements，渲染时忽略它的 points。
   */
  achievements?: Achievement[];
  /**
   * 展开态的过渡形态：现有站点文案**逐字**搬运，不做任何措辞加工。
   * P2 定稿后此字段应全部消失。
   */
  points?: string[];
  tech?: string[];
  /**
   * 标题行的公司 logo（<img>，不走 next/image：静态导出下没必要为一个小图配 remotePatterns）。
   * href 给了就把 logo 变成跳官网的外链。
   */
  logo?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    href?: string;
    /** 深色卡片上转成纯白单色显示（给深色/彩色原标用）。 */
    mono?: boolean;
  };
  /** 折叠区默认展开（当前只给 Weimob，见 2026-08-22）。 */
  defaultOpen?: boolean;
  /** 放 /public 或公开 URL 均可。 */
  images?: { src: string; alt: string }[];
  link?: { label: string; href: string };
};

export type RoleGroup = { title: string; roles: Role[] };

/**
 * 行内标记（由 components/rich-text.tsx 渲染）：
 *   {{60M+}}   量化指标，accent 色等宽
 *   **文字**    强调
 *   `code`     等宽代码
 */
export const EXPERIENCE: RoleGroup[] = [
  {
    title: "2024 — 25",
    roles: [
      {
        company: "Shanghai Zhongyou Tipo Steel Pipe Co., Ltd.",
        role: "Full-Stack Developer (Freelance) — Manufacturing Execution System",
        blurb: "Steel pipe manufacturer. Sole developer on a greenfield MES, end to end.",
        period: "Jul 2024 — Feb 2025",
        location: "Remote, from Hangzhou, China",
        kind: "work",
        headline: "Sole developer on a production MES covering {{20+}} manufacturing stages.",
        points: [
          "Designed, built, and deployed a production-grade MES from scratch as the **sole developer** — architecture, backend, frontend, database, mobile, deployment, and production support.",
          "Modelled complex manufacturing workflows across {{20+}} production stages, translating shop-floor processes into scalable software.",
          "Architected backend services in Go with relational data models covering production tracking, quality control, inventory, and manufacturing traceability.",
          "Designed RBAC authorization and workshop-based data partitioning to enforce operational security and process ownership.",
          "Delivered web admin portals, operational dashboards, reporting, and Android shop-floor apps, with real-time KPI monitoring, defect analysis, and equipment status reporting.",
        ],
        tech: ["Golang", "Vue.js", "MySQL", "Android", "RBAC"],
        logo: {
          src: "/logos/tipo.svg",
          alt: "Shanghai Zhongyou Tipo Steel Pipe",
          width: 102,
          height: 41,
          href: "http://www.shtipo.com/en/",
        },
        link: { label: "See it in Projects", href: "#projects" },
      },
    ],
  },
  {
    title: "2021 — 23",
    roles: [
      {
        company: "Weimob",
        role: "Senior Java Software Engineer",
        blurb:
          "Enterprise SaaS commerce platform. Owned search and promotion infrastructure for 20,000+ merchants.",
        period: "May 2021 — Nov 2023",
        location: "Hangzhou, China",
        kind: "work",
        headline:
          "Search platform for {{20K+}} merchants — {{60M+}} SKUs, {{500K+ QPS}}, lag cut to under {{30 minutes}}.",
        points: [
          "**Search & promotion platform.** Co-architected a distributed Elasticsearch platform indexing {{60M+}} SKUs across multiple indices on a {{32-node}} cluster serving {{20K+}} merchants.",
          "Scaled write throughput to {{~10K writes/sec}} from Kafka consumers via asynchronous batch commits, shard-level parallelism, and optimized indexing pipelines — cutting data lag from {{1–2 hours}} to under {{30 minutes}} during Double 11 and 618 peak campaigns.",
          "Sustained {{500K+ QPS}} on the read path through hot/cold data separation, `index_sort`, filter-only queries, and dynamic replica scaling up to {{128 replicas}}.",
          "Resolved critical write failures caused by the {{2.1B}} doc-per-node limit via routing redesign, and enforced cluster guardrails plus nightly `force_merge`.",
          "**Search reconciliation platform.** Built a distributed reconciliation system from scratch keeping MySQL and Elasticsearch near real-time consistent — a {{3-level}} diff engine (field, scope, and document count), a pluggable rule engine, non-blocking multi-source loaders over Dubbo, self-healing repair with exponential-backoff retries, and full audit logging with message replay.",
        ],
        tech: ["Java", "Elasticsearch", "Kafka", "Redis", "MySQL", "Dubbo"],
        logo: {
          src: "/logos/weimob.svg",
          alt: "Weimob",
          width: 96,
          height: 24,
          href: "https://group.weimob.com/en/",
        },
        defaultOpen: true,
      },
    ],
  },
  {
    title: "2019 — 21",
    roles: [
      {
        company: "DaSouChe (NASDAQ: DSC)",
        role: "Senior Java Software Engineer",
        blurb:
          "Used-car trading SaaS platform for automotive dealers across China; listed on NASDAQ in 2026.",
        period: "Mar 2019 — May 2021",
        location: "Hangzhou, China",
        kind: "work",
        headline:
          "Led the Vehicle Product Center platform serving {{40,000+}} automotive businesses.",
        points: [
          "Led development of the Vehicle Product Center platform serving {{40,000+}} automotive businesses.",
          "Designed configurable workflow and business-rule automation inspired by Salesforce Flow, letting non-technical users define event-driven processes without code changes.",
          "Developed a metadata-driven rule engine on Elasticsearch, Redis, MySQL, and Painless scripting.",
          "Built scalable backend services and APIs supporting product lifecycle management and tenant-specific customization.",
        ],
        tech: ["Java", "Rule Engine", "Elasticsearch", "Multi-tenant SaaS"],
        logo: {
          src: "/logos/dasouche.svg",
          alt: "DaSouChe",
          width: 90,
          height: 24,
          href: "https://www.dasouche.com/en",
        },
      },
    ],
  },
];

/**
 * Chronological B 的 "Additional Experience"：只给 职位 · 雇主 · 时间 · 地点 一行，
 * 不给成就条目、不可展开（本期决定，2026-08-21）。
 * 作用是补全时间线、不留 gap，而不是提供证据。
 */
export type AdditionalRole = {
  role: string;
  /** 可省：career break 没有雇主，硬填一个反而是编事实。 */
  company?: string;
  period: string;
  location?: string;
  /**
   * 一行范围描述：说清"做的是什么系统"，**不给结果**，且必须真的只占一行（ADR-0015 修订了
   * ADR-0012 约束 1，见 0015 的"修订"一节）。带指标或成果的句子写在这里
   * 就意味着它该升回 Relevant 层。
   */
  scope?: string;
};

export const ADDITIONAL: AdditionalRole[] = [
  {
    role: "Career break — relocation to Canada",
    period: "Mar 2025 — Dec 2025",
    location: "Hangzhou, China",
    scope: "Self-directed study — IBM AI Engineering Professional Certificate.",
  },
  {
    role: "Java Developer",
    company: "Hangzhou Tanhua E-commerce",
    period: "Dec 2023 — Jun 2024",
    location: "Hangzhou, China",
    scope: "Supply-chain and ERP maintenance, standalone-site integration, marketing automation.",
  },
  {
    role: "Junior Developer",
    company: "Zhejiang Sendinfo Technology",
    period: "Mar 2017 — Mar 2019",
    location: "Hangzhou, China",
    scope: "B2C ticketing SaaS — ordering, refunds, validation, payments — and a group-tour ERP.",
  },
  {
    role: "Junior Developer",
    company: "Zhejiang Yonyou Software",
    period: "Jan 2016 — Mar 2017",
    location: "Hangzhou, China",
    scope: "Points-based loyalty malls, and mobile field-data apps for infrastructure contractors.",
  },
];

/**
 * Education 单独成层（2026-08-28）。在读学历不是 experience：
 * 它拿不出带 Impact 的成就，按 ADR-0012 判据本就不该占 Relevant 卡；
 * 但它也不属于 Additional 那层（那层的语义是"降级、只补时间线"，
 * 且约束 1 不许带 logo / 标签，而本地学历恰恰是北美读者会主动去找的信息）。
 *
 * 两个 diploma **合并成一条**，不平铺并列 —— 并列会让读者自己去猜两者的关系
 * （素材见 ToucanShelf `Research/BAT 第二个 diploma 的定位与解释话术` §4）。
 */
export type EducationEntry = {
  school: string;
  /** 学位/文凭行；两个 diploma 用 " · " 连成一行。 */
  credential: string;
  period: string;
  location?: string;
  /** 一行说明这段学历补的是哪块能力，可省。 */
  focus?: string;
  logo?: Role["logo"];
};

export const EDUCATION: EducationEntry[] = [
  {
    school: "University of Winnipeg (PACE)",
    credential:
      "Post-Graduate Diploma, Applied Artificial Intelligence · Post-Degree Diploma, Business Analysis & Transformation",
    period: "Jan 2026 — Dec 2027",
    location: "Winnipeg, MB, Canada",
    focus:
      "End-to-end delivery: business problem framing, data pipelines, and ML engineering.",
    logo: {
      src: "/logos/uwinnipeg.svg",
      alt: "University of Winnipeg",
      width: 1200,
      height: 300,
      href: "https://www.uwinnipeg.ca/",
    },
  },
  {
    school: "Henan University of Engineering",
    credential: "BEng, Mechanical Design, Manufacturing and Automation",
    period: "Sep 2010 — Jun 2014",
    location: "Henan, China",
    logo: {
      src: "/logos/henan-uoe.svg",
      alt: "Henan University of Engineering",
      width: 289,
      height: 75,
    },
  },
];

validateExperience(EXPERIENCE);
