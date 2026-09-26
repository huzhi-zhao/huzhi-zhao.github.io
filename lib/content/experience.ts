import { validateExperience } from "./validate";

/**
 * 成就条目的目标形态（ADR-0007：Challenge → Solution → Impact，Impact 不可省）。
 * 三个独立字段是为了让"缺 Impact"在类型层面无法表达。
 */
export type Achievement = { challenge: string; solution: string; impact: string };

/**
 * 展开态的另一种形态（2026-09-21 本人定）：小标题 + 一段叙述。
 * CSI 仍然是内容检查表（ADR-0007 约束 1）—— 三段都在段落里，只是不再拆成三行标签。
 * 理由：三行标签的版本一条要占七八行，整张卡没人读得完。
 */
export type Highlight = { title: string; body: string };

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
  /** 展开态主体：小标题 + 叙述段。优先级高于 achievements / points。 */
  highlights?: Highlight[];
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
        company: "Shanghai ZHONGYOU TIPO Steel Pipe Co., Ltd.",
        role: "Full-Stack Developer (Contract) — Manufacturing Execution System",
        blurb: "Steel pipe manufacturer. Sole developer on a greenfield MES, end to end.",
        period: "Jul 2024 — Feb 2025",
        location: "Remote, from Hangzhou, China",
        kind: "work",
        headline: "Sole developer on a production MES covering {{24}} manufacturing stages.",
        points: [
          "Designed, built, and deployed a production-grade MES from scratch as the **sole developer** — architecture, backend, frontend, database, mobile, deployment, and production support.",
          "Modelled complex manufacturing workflows across {{24}} production stages, translating shop-floor processes into scalable software.",
          "Architected backend services in Go with relational data models covering production tracking, quality control, inventory, and manufacturing traceability.",
          "Designed RBAC authorization and workshop-based data partitioning to enforce operational security and process ownership.",
          "Delivered web admin portals, operational dashboards, reporting, and Android shop-floor apps, with real-time KPI monitoring, defect analysis, and equipment status reporting.",
        ],
        tech: ["Golang", "Vue.js", "MySQL", "Android", "RBAC"],
        logo: {
          src: "/logos/tipo.svg",
          alt: "Shanghai ZHONGYOU TIPO Steel Pipe",
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
          "Owned the Elasticsearch write path, migration tooling, and data-reliability controls for a search and promotion platform serving {{20,000+}} merchants — upstream quota {{3,000 → 10,000 QPS}}, publish latency {{30+ → <10 min}}.",
        /**
         * 2026-09-21：本人给的结构（小标题 + 一段叙述），替换掉助手那版三行标签式 CSI ——
         * 那版一条占七八行，整张卡读不完。数字按 ToucanShelf 附录 A 核过：
         * 6500 万/9000 万是**商品分配到门店后的 doc 数**，不是 SKU。
         */
        highlights: [
          {
            title: "Scaled million-message promotion updates",
            body: "A large campaign could fan out into millions of activity-by-store updates, while an upstream product service initially limited the pipeline to {{3,000 QPS}}. I split update events by change type, isolated oversized workloads into dedicated processing paths, and negotiated a quota increase to {{10,000 QPS}} after reducing unnecessary upstream reads. End-to-end publish latency fell from more than {{30 minutes}} to under {{10}}.",
          },
          {
            title: "Rebuilt the index topology during a live migration",
            body: "During a seven-month backfill, a data-heavy account representing more than a third of indexed data pushed one node past Lucene's {{2.1-billion}}-document ceiling and stopped writes. I restored writes by separating large accounts into a dedicated cluster, then redesigned routing and query paths while the legacy system continued serving customers. The platform grew from roughly {{65M}} to {{90M}} indexed product records across {{32}} data nodes; hot/cold separation, filter-only queries, and index sorting kept query latency stable without adding nodes.",
          },
          {
            title: "Turned migration jobs into an operations platform",
            body: "Backfill, reindex, and repair jobs ran for months against the same clusters and upstream quota as live traffic. I built a distributed task platform with {{five}} priority queues, backpressure, lock-based idempotency, emergency stops, alert controls, and dead-letter replay. It remained in use after the migration as the team's shared platform for backfill, repair, and index operations.",
          },
          {
            title: "Made silent data divergence detectable",
            body: "MySQL and Elasticsearch could drift apart without warning, so the first signal sometimes came from a customer. I built a configuration-driven, multi-tenant reconciliation service that compared data by field, scope, and document count, then supported alerts, retries, repair, and an audit trail. The work turned silent divergence into a detectable and recoverable condition, and was later incorporated into a company-wide reconciliation platform used by multiple internal teams.",
          },
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
      "Artificial Intelligence Post-Degree Diploma · Business Analysis & Transformation Post-Degree Program",
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
    credential:
      "Bachelor of Engineering, Mechanical Design, Manufacturing and Automation",
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
