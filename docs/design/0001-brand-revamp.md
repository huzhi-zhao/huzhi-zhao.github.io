# 设计文档 0001 — 从在线简历到个人品牌站

- 状态：结构部分已实施（2026-08-21），文案部分未开始
- 日期：2026-08-20（2026-08-21 更新实施记录）
- 相关决策：[ADR-0001 ~ 0012](../adr/README.md)
- 代码范围：`app/page.tsx`、`app/globals.css`、`components/*.tsx`、`lib/content/*`、`next.config.mjs`

---

## 1. 背景与目标

站点当前是一份排版精良的在线简历。ADR-0001 把定位改成了"简历中那些结论的证据库"。
本文把这个定位、以及 ADR-0002 ~ 0009 的约束，落成可执行的需求与技术方案。

**目标（按优先级）**

1. 访客在首屏 5 秒内能说出"这个人解决什么问题"，而不是"这个人会哪些技术"。
2. 每个项目在 3 秒扫视层给出足够判断依据，并有唯一明确的深入路径。
3. 9 年后端履历保持可见但不再淹没后面的内容。
4. 站点具备承载持续产出（项目文档、文章）的结构，且新增内容不需要发版。

**非目标**

- 不为 ATS / 关键词匹配优化（那是 CV PDF 的职责）。
- 不做站内文章系统（ADR-0005）。
- 不做具体求职意向表述（ADR-0008）。
- 不承载 cover letter（ADR-0011）——cover letter 针对重点岗位单独书写，不复用站点内容。
- 不做视觉风格重做——配色、字体、栅格沿用现状。

**成功判据**

- 首屏不含任何"技术栈罗列"作为主视觉；
- Experience **折叠态时间线本体** ≤ 0.85 屏（1440×900）；
  （原判据写的是"折叠态总高度 ≤ 0.7 屏"。2026-08-21 实施时发现这个数算不出来：
  5 张折叠卡本身 515px，加 SectionHeading 162px 已经超过 630px，还没算
  Additional Experience 与板块 padding。判据订立时 Additional Experience 这一层还不存在，
  故改为只约束时间线本体；板块总高作为观测值记录，不设硬指标。）
- 每张项目卡的 DOM 中只有一个链接元素；
- 关键词集合在全站出现 ≥6 次且措辞完全一致；
- Lighthouse 可访问性 ≥95，`prefers-reduced-motion` 下无位移动画。

---

## 2. 需求

### FR-1 Hero 改为 Elevator Pitch 结构

- **FR-1.1** 主标题下的介绍段改成"我帮谁、解决什么问题"的句式，替换当前的履历陈述。
  候选基线（待定稿）：
  > I help organizations design resilient backend architectures and build actionable
  > data pipelines that turn complex, high-volume data into reliable operations.
- **FR-1.2** 删除 Hero 底部的 `stack` 技术栈 chip 行（`Senior Java / AWS / Databricks / …`）。
- **FR-1.3** 终端脚本从简历字段改为定位展开：输出问题域与三根技术支柱
  （Distributed Backend & Infrastructure / Data Engineering & Lakehouse / Applied AI）。
- **FR-1.4** `status` 一行保持泛化表述，不写具体岗位或地域（ADR-0008）。
- **FR-1.5** Resume 按钮维持现有 `CV_HREF` 空值即隐藏的机制，本次不动。

### FR-2 信息架构调整

- **FR-2.1** 页面顺序改为 `Hero → Projects → Experience →（Writing，暂缓）→ Contact`。
- **FR-2.2** 删除 Skills 独立板块；技术栈信息下沉到项目卡与经历卡的标签。
- **FR-2.3** 导航项同步调整；已有锚点 id（`#projects` `#experience` `#contact`）保持不变。
- **FR-2.4** 板块标题改为问句 / 动词短语（ADR-0007 第 3 条）。

### FR-3 项目卡片重做

- **FR-3.1** 卡面元素固定为五个：图（16:9）、问题域标签 + 状态徽章、标题、问题句、技术栈行。
- **FR-3.2** 问题句为疑问句，单行不折行（`text-overflow` 兜底）。
- **FR-3.3** 整张卡是唯一链接，指向该项目的 primary destination。
- **FR-3.4** hover 时从底部升起渐变遮罩显示简介，≤25 词、≤2 行，遮罩高度约 40%。
- **FR-3.5** 移除 3D 倾斜；hover 效果限为上浮 2px + 边框提亮 + 图片 scale 1.03。
- **FR-3.6** 卡面不再出现次级外链与 `note` 说明文字，全部移至目的地页面。
- **FR-3.7** 移动端（`<768px` 或 `hover: none`）不渲染 hover 层，点击直接跳转。
- **FR-3.8** 项目数据结构需支持将来新增项目（如 `ghostfolio-ai`）而不改组件。

### FR-4 Experience 压缩为折叠列表

- **FR-4.1** 默认折叠态每条一行：公司 · 角色 · 时间 · 一句 Challenge→Impact 缩写。
- **FR-4.2** 点击展开显示完整 CSI 三段式内容、标签、可选配图。
- **FR-4.3** 展开状态支持多条同时展开；默认全部折叠。
- **FR-4.4** 保留 `study` / `break` 徽章——时间线连续性是可信度的一部分。
- **FR-4.5** 键盘可操作（Enter / Space 切换），`aria-expanded` 正确。

### FR-5 文案改写为 CSI 三段式

- **FR-5.1** Experience 所有成就条目按 Challenge → Solution → Impact 重写。
- **FR-5.2** 无法给出 Impact 的条目删除，不保留（ADR-0007 约束 1）。
- **FR-5.3** 关键词集合全站统一，措辞逐字一致。
- **FR-5.4** 所有对外可见文案走 [ADR-0010](../adr/0010-ai-assisted-writing.md) 的定稿流程：
  AI 草稿 → 本人逐句改写 → 定稿冻结 → 此后 AI 只提语法/逻辑/事实类更正建议。
  本文中标注为"候选基线"的文案（如 FR-1.1 的 pitch）**均未定稿**。

### FR-6 Writing 板块（暂缓实现）

- **FR-6.1** 布局为「1 篇 featured 大卡 + N 行列表」。
- **FR-6.2** 数据源为空时整个板块不渲染（含导航项）。
- **FR-6.3** 条目字段：标题、一句话、日期、阅读时长、知识库 URL。
- **FR-6.4** 首篇 paper 就绪前不上线（预计 2026-12）。

### FR-8 About 子页

- **FR-8.1** 新增静态路由 `/about`，内容为履历之外的个人面向（兴趣、爱好、工作之外在做的事）。
- **FR-8.2** 不含求职诉求、目标岗位、工作许可、成就复述（[ADR-0011](../adr/0011-about-page-scope.md)）。
- **FR-8.3** 入口：导航栏一项 + Contact 板块附近一个次级入口。首页不内联该内容。
- **FR-8.4** 篇幅 ≤400 字；结构为 2–4 个短段落，不用标题分节，不做列表。
- **FR-8.5** 照片位可选，由数据决定是否渲染（未决，见 ADR-0011）。
- **FR-8.6** 该页文本**直接手写**，不走 AI 起草流程（ADR-0011 约束 1）。

### FR-7 内容外链治理

- **FR-7.1** 所有指向知识库 / 外部的 URL 集中在一处常量模块。
- **FR-7.2** 每个链接标注所需可见性（public / 需登录），上线前实测匿名可访问。
- **FR-7.3** 提供一个可手动运行的链接检查脚本（HEAD 请求，非 CI 强制）。

---

## 3. 技术方案

### 3.1 数据模型

集中到 `lib/content/` 之下，组件只负责渲染，内容与结构解耦。

```
lib/content/
  taxonomy.ts     问题域标签（ADR-0003 约束 5：单点定义）
  links.ts        全部外链（FR-7.1）
  projects.ts     项目数据
  experience.ts   履历数据
  writing.ts      文章数据（初始为空数组）
  validate.ts     构建期校验（见 3.6）
```

```ts
// taxonomy.ts —— 标签措辞未定稿，改这里即可全站生效
export const DOMAINS = {
  operational: "Operational Data Platforms",
  industrial:  "Industrial Systems",
  ai:          "Applied AI",
} as const;
export type DomainKey = keyof typeof DOMAINS;
```

```ts
// projects.ts
export type Project = {
  slug: string;
  title: string;
  /** 疑问句，单行。ADR-0004 约束 1。 */
  question: string;
  domain: DomainKey;
  status: "in-progress" | "production" | "archived";
  /** 唯一主点击目标。wiki 未就绪时可退化为 README。 */
  destination: { href: string; kind: "wiki" | "demo" | "repo" };
  image: { src: string; alt: string };
  /** hover 简介，≤25 词。构建期校验。 */
  teaser: string;
  tech: string[];
};
```

```ts
// experience.ts
export type Role = {
  company: string;
  role: string;
  period: string;
  location?: string;
  kind?: "work" | "study" | "break";
  /** 折叠态那一行。Challenge→Impact 的缩写。 */
  headline: string;
  /** 展开态。每条必须三段齐全（Impact 不可省，ADR-0007）。 */
  achievements: { challenge: string; solution: string; impact: string }[];
  tech?: string[];
  images?: { src: string; alt: string }[];
};
```

`achievements` 用三个独立字段而不是一段自由文本，是为了让"缺 Impact"变成
**类型层面无法表达**的状态，而不是靠人自觉。

**实施时的两处偏差（2026-08-21）：**

1. **`achievements` 暂为可选，另加一个过渡字段 `points: string[]`。**
   本期只做结构不改措辞，而现有文案通篇是 Solution + Impact，Challenge 几乎处处缺失——
   机械拆成三段等于现场编 Challenge，那是 P2 的活，且会踩 ADR-0010。
   于是 `points` 逐字承接旧文案，`achievements` 保持目标形态，组件两条渲染路径择一。
   校验规则相应改为"achievements 一旦出现，三段必须齐全"，
   外加"两者都空则报错"。**P2 迁完之后 `points` 应当整个删掉**，届时
   `achievements` 改回必填，类型层面的保证才真正闭合。

2. **新增 `ADDITIONAL: AdditionalRole[]`**，承载降级后的经历（见 ADR-0012）。

**行内标记。** 内容层是纯字符串，但旧文案里有数字高亮、加粗、`code` 三种行内样式。
为此约定三个标记，由 `components/rich-text.tsx` 还原：

```
{{60M+}}   量化指标（accent 色等宽）
**文字**    强调
`code`     等宽代码
```

只支持这三种，且不引 Markdown 库——目的是让 P2 改文案时无法顺手引入新语法。

### 3.2 组件改动

| 组件 | 动作 |
| --- | --- |
| `app/page.tsx` | 调整顺序，移除 `<Skills />`，预留 `<Writing />` |
| `components/hero.tsx` | 换文案，删 `stack` chip 行（本期只做后者） |
| `components/hero-terminal.tsx` | 改 `SCRIPT` 常量；逻辑不动 |
| `components/projects.tsx` | 重写；不再使用 `3d-card` |
| `components/project-card.tsx` | **新增**，承载 FR-3 |
| `components/experience.tsx` | 重写为折叠列表；`Timeline` 是否保留见 3.5 |
| `components/skills.tsx` | 删除 |
| `components/site-navbar.tsx` | 同步 `navItems` |
| `components/section-heading.tsx` | 不动（`TextGenerateEffect` 属于既有进场动效） |
| `components/writing.tsx` | **新增**，空数据时返回 `null` |
| `components/rich-text.tsx` | **新增**（实施时补），还原三种行内标记，见 3.1 |
| `components/ui/{globe,meteors,background-gradient}.tsx` | 若确认未使用则删除（ADR-0009 约束 2）。实测：`globe` 与 `background-gradient` 被 Contact 引用，保留；`meteors` 无引用，已删；`3d-card` 被 `hero-terminal` 引用，保留 |

### 3.3 项目卡片实现要点

**结构（避免嵌套链接）**

```tsx
<a href={p.destination.href} className="group ...">
  <figure>  {/* 图 + 徽章 + hover 遮罩 */} </figure>
  <div>     {/* 标签 / 标题 / 问题句 / 技术栈 */} </div>
</a>
```

整卡用单个 `<a>` 包裹，卡内不放任何 `<a>` / `<button>`。
hover 层用 CSS `group-hover` 实现，不引入 JS 状态。

**hover 遮罩**

```
opacity 0 → 1，translateY 8px → 0，duration 200ms，ease-out
背景：linear-gradient(to top, rgba(0,0,0,.92) 0%, rgba(0,0,0,.75) 55%, transparent 100%)
高度：40%，绝对定位贴底
```

**移动端 / 触屏**：用 `@media (hover: hover) and (pointer: fine)` 包裹整个 hover 层的样式，
触屏设备上该层永不显示——比按宽度断点更准确（覆盖触屏笔记本）。

**外链属性**：`target="_blank" rel="noopener"`，并给 `aria-label`
补上"（在新标签页打开）"的语义。

**图片**：`next/image`，`sizes="(max-width:768px) 100vw, 50vw"`。
源图按 1200×675 出，实际显示宽约 400–600px。
注意 `next.config.mjs` 是静态导出配置，需确认 `images.unoptimized` 设置。

实测：`images.unoptimized` 已开；占位图走外链，因此临时加了
`images.remotePatterns`（`encrypted-tbn0.gstatic.com`、`s3-alpha.figma.com`）。
**P5 图片挪进 `/public` 之后这两条必须删掉。**

### 3.4 图片资产要求（给设计环节的输入）

| 项目 | 图内容 | 约束 |
| --- | --- | --- |
| Urban Ops | Bronze→Silver→Gold 三段 + 箭头 | 不画完整架构图 |
| MES | 单个有代表性的模块截图并放大 | 不用整屏大盘缩图 |
| Icon Pipeline | App 界面 | 一个意思 |

通用约束（ADR-0004 约束 4）：一张图只表达一个意思；文字在 400px 宽下仍可读
（源图字号 ≥28px）；深色背景为主，与站点配色一致；统一 16:9。

### 3.5 Experience 折叠实现

优先用 `<details>/<summary>` 原生元素：键盘操作、`aria-expanded`、
无 JS 可用性全部免费获得，只需处理样式（`::-webkit-details-marker` 隐藏、
`[open]` 态样式）。若动画需求无法满足，再退回 `useState` + `framer-motion` 的
`AnimatePresence`——但那意味着要自己补齐无障碍属性。

现有 `components/ui/timeline.tsx` 提供的是滚动驱动的时间线视觉。
折叠后条目变矮，时间线的视觉价值下降但仍成立，**先保留**，视实际效果决定去留。

**已定（2026-08-21）：保留，但收紧纵向节奏。** 折叠之后每个年份分组只装一张 103px 的卡，
而 `timeline.tsx` 原来每行 `pt-10 md:pt-20` 要吃掉 90px —— 留白比内容还高。
改成 `pt-6 md:pt-8` 后时间线本体从 972px 降到 732px。滚动驱动的进度条视觉保留。

### 3.6 构建期校验

在 `lib/content/validate.ts` 中实现，由各数据模块在模块加载时调用，
构建阶段即失败——把 ADR 的约束变成会报错的东西，而不是文档里的君子协定：

- `teaser` 词数 ≤25；
- `question` 以 `?` 结尾；
- `achievements` 三字段均非空；
- `DOMAINS` 键数量 ≤3（ADR-0003 约束 1）；
- 项目 `domain` 必须是已定义的键。

### 3.7 分阶段实施

| 阶段 | 内容 | 依赖 | 状态 |
| --- | --- | --- | --- |
| P0 | 事实一致性修正（`TODO.md` 那批） | 无 | 未做（CV / LinkedIn，非代码） |
| P1 | JD 调研 ≥8 份，定稿关键词与标签措辞 | 无 | 未做 |
| **S1** | 内容层抽出到 `lib/content/` + 构建期校验 | 无 | **已上线 2026-08-21** |
| **S2** | FR-2 顺序调整 + 删 Skills + FR-1.2 | 无 | **已上线 2026-08-21** |
| **S3** | FR-4 Experience 折叠 + Additional 分层 | S1 | **已上线 2026-08-21** |
| **S4** | FR-3 项目卡片重做（配占位图） | S1 | **已上线 2026-08-21** |
| P2 | FR-1.1/1.3 Hero + FR-5 文案 CSI 改写（含 ADR-0010 定稿流程） | P1 + S1 | 未做 |
| P5 | 图片资产设计产出 | P1 | 未做（现为外链占位图） |
| P7 | FR-6 Writing 板块 | 首篇 paper | 未做（数据源已建，为空数组） |
| P8 | FR-8 About 子页 | 无（但优先级最低） | 未做 |

**排期在实施时被反转了（2026-08-21）。** 原表是文案先行（P2 → P3 → P4 → P6），
理由是文案投入产出比最高；实际执行改成结构先行（S1 → S2 → S3 → S4），理由有三条：

- 文案定稿依赖 P1 的 JD 调研，而调研迟迟没做，按原顺序整盘会一直卡住；
- 结构改造本身不依赖文案——只要不改词，旧文案可以原样搬进新结构；
- **S1 做完之后，P2 的成本大幅下降**：改文案从"改组件"变成"改数据文件"，
  且构建期校验会在措辞违反 ADR-0007 时直接报错。

代价是：在 P2 完成之前，站点的结构是品牌站的、语法仍是简历的。
"首屏 5 秒能说出这个人解决什么问题"这条目标在本期**未达成**，
Hero 与终端脚本仍是履历陈述。这是接受排期反转必须付的中间态成本。

原表里的 P6（项目卡片重做）依赖"P5 图片资产就绪"，本期用外部公开占位图 URL 绕开了——
写进 `lib/content/projects.ts`，P5 就绪后只替换该文件与 `next.config.mjs` 的 `remotePatterns`。

P2 是投入产出比最高的一段：零组件改动、纯文案，但它决定了站点是"另一份简历"
还是"一个品牌"。**注意 P2 的工作量主要落在本人身上**——按 ADR-0010，
AI 只能出草稿，逐句改写不可外包，排期时不要按"改几行文案"估。

---

## 3.8 实施记录

每轮上线的实测数据与偏差记录在 `docs/launch/` 下，不写在本文里——
本文是需求与方案，改动频率低；实施记录一轮一份，只增不改。

- [2026-08-21 结构改造](../launch/2026-08-21-structure-revamp.md)

---

## 4. 风险

| 风险 | 影响 | 缓解 |
| --- | --- | --- |
| 知识库 public 分享页移动端体验差 | 直接拖垮 L2/L3（ADR-0005 单点依赖） | P6 前实测；不行则考虑站内做 L2 简版 |
| 外链失效（改路径 / 取消分享） | 断链伤害大于不放链接 | FR-7.3 检查脚本 + 上线前人工过一遍 |
| 图片资产产出慢 | 阻塞 P6 | P6 之前的阶段均不依赖图片，可先上线 |
| 首篇 paper 延期 | Writing 板块延期 | 已接受（ADR-0006 后果） |
| 删除 Skills 损失关键词密度 | 搜索/扫读命中下降 | 标签保留；ATS 由 CV 承担（ADR-0002） |
| 关键词定稿依赖 JD 调研，可能一直不做 | P2 阻塞，全盘停滞 | 允许先用候选基线开工，定稿后一次性替换（因为集中在常量里） |
| 文案被判定为 AI 生成 | 全局可信度崩塌，不可修补 | ADR-0010 定稿流程；面试自检法（每句能否用自己的话讲出来） |

---

## 5. 未决问题

1. **Icon Pipeline 的 primary destination** 选 App repo 还是 wiki？取决于想让人看代码还是看产品。
   代码里暂定 App repo（`lib/content/links.ts` 的 `iconApp`），未定稿。
2. **`Operational Data Platforms` 这个措辞**能否同时容纳 UOIP（市政）与 ghostfolio-ai（金融）？
   ghostfolio-ai 落地时复审（ADR-0003 复审条件）。
3. **Contact 板块**是否需要加"我对什么类型的对话感兴趣"以提高转化？
   与 ADR-0008 有边界重叠——需要区分"定位表达"和"求职意向"，暂缓。
4. ~~**`timeline.tsx` 去留**~~ —— 已定（2026-08-21）：保留并收紧纵向节奏，见 3.5。
5. **About 页是否放照片**（[ADR-0011](../adr/0011-about-page-scope.md) 未决项）。
   ~~About 页是否承载 cover letter~~ —— 已否决：cover letter 针对具体岗位单独书写，
   与站点无复用关系。
6. **ghostfolio-ai 进入作品集的时机**——是等它成熟再上卡片，还是以 `in-progress`
   状态早期上线？后者与"诚实标注"一致，但三个进行中项目并列会稀释可信度。

---

## 附录：调研记录（2026-08）

### 方法与局限

通过公开搜索与页面抓取获取，**未登录**招聘平台，因此拿到的是岗位标题与零散关键词，
**没有完整 JD 正文**（Indeed / LinkedIn 有反爬）。下列结论是方向性信号，不是定量结论。
P1 阶段需要人工登录扒 ≥8 份完整 JD 做关键词统计。

### 发现 1：本地需求集中在企业数据平台，不在城市运营

Manitoba 在招的相关岗位与雇主：Wawanesa（Senior Architect - Data & AI）、
Payworks（Database Administrator）、University of Manitoba（System and Data Engineer）、
Siemens Healthineers（R&D Ops AI/ML Data Scientist）、BeyondTrust（Software Development Engineer），
另有 Canada Life / Great-West、Bold Commerce、SkipTheDishes 等本地主要雇主。
行业集中在保险、金融、薪酬、公用事业、大学、农业与医疗设备。

→ 结论进入 [ADR-0003](../adr/0003-problem-domain-abstraction.md)。

### 发现 2：技术写作是明文要求

JD 中反复出现 "strong technical writing skills"、
"maintaining documentation of data definitions, report logic, and dashboard structures
to support long-term data governance"、"automated data pipelines and monitoring solutions"。

→ 结论进入 [ADR-0006](../adr/0006-writing-section.md)：文章是能力样本，
且数据治理类选题的对口度不低于性能调优类。

### 发现 3：作品集的决定因素是"是不是真问题"

多个独立来源指向同一结论：项目数量与代码质量都不是决定因素，
"这个项目解决的是不是真实问题"才是；hiring manager 侧的表述是不想再看教程项目。
另有一条：recruiter 层普遍不点个人网站，**点进来的是 hiring manager 和技术面试官**。

→ 结论：扫视层要快，但点进去之后的深度要给足——受众是懂技术的人，
不要为"30 秒扫一眼的 HR"过度简化。进入 [ADR-0001](../adr/0001-site-positioning.md)
与 [ADR-0005](../adr/0005-content-tiers-and-hosting.md)。

### 发现 4：外部作品集范例参考价值有限

查到的几个被推荐的开发者作品集（yagyaraj.online、hey-adi.me、preetsuthar.me）
均为前端/全栈的极简模板，靠鼠标动效与视觉出彩，与本站要走的"证据密度"路线不是一类。
唯一可用的一条是 project-oriented 布局"只在项目质量够硬时才成立"的判断。

→ 支持 [ADR-0009](../adr/0009-motion-budget.md) 的动效克制立场。

### 来源

- https://ca.indeed.com/q-data-engineer-l-manitoba-jobs.html
- https://dataengineeracademy.com/blog/data-engineer-portfolio-review-checklist-2026-what-hiring-managers-actually-score/
- https://dev.to/devraj_singh7/the-portfolio-projects-that-actually-get-you-hired-in-2026-1l0e
- https://dev.to/jtrevdev/best-developer-portfolio-websites-and-why-they-work-3bdk
- https://www.teamblind.com/post/do-faang-recruiters-look-at-your-github-personal-website-eqtvthlb
- https://womenhack.com/women-in-tech/winnipeg/
