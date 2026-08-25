# ADR-0012 Experience 分两层：给证据的和只补时间线的

- 状态：已接受
- 日期：2026-08-21
- 依赖：[ADR-0001](0001-site-positioning.md)、[ADR-0002](0002-information-architecture.md)、[ADR-0007](0007-copy-conventions.md)

## 背景

ADR-0002 把 Experience 压成折叠列表，但没有回答一个问题：**是不是每段经历都值得占一张卡。**

改造前的 Experience 有 8 段，其中三段的全部内容是这类句子：

> Developed and maintained high-traffic e-commerce applications and backend services.

按 [ADR-0007](0007-copy-conventions.md) 约束 1（"不允许出现只有 Solution 没有 Impact 的条目，
拿不出结果的事项，不写"），这三条本该删掉。但真删了会在时间线上留下 2016–2019
和 2023-12–2024-06 两段空白。

矛盾的根源是把两种诉求塞进了同一个组件：**"不能有 gap"是简历的诉求**
（HR 与 ATS 会核对连续性），**"给出证据"是品牌站的诉求**（ADR-0001）。
用同一种卡片形态承载两者，结果是弱内容拉低了强内容的信噪比。

课件 `1C Introduction to Resumes` 给的 **Chronological B** 模板正好把这两件事拆开了：
`RELEVANT EXPERIENCE` 每段带成就条目，`ADDITIONAL EXPERIENCE` 每段只有
职位 / 雇主 / 时间 / 地点一行，用途明写为 "Downplays additional experience /
Accounts for all work history (no gaps)"。

## 决策

**Experience 分两层，形态不同、职责不同。**

| 层 | 形态 | 职责 |
| --- | --- | --- |
| Relevant | 折叠卡：headline 一行，展开是 CSI 成就条目、标签、可选配图 | 给证据 |
| Additional | 不可展开的单行：职位 · 雇主 · 时间 · 地点 | 只补时间线连续性 |

**归属判据：这段经历能不能拿出一条带 Impact 的成就。** 拿得出，进 Relevant；
拿不出，进 Additional——不是删掉，也不是勉强凑一条。

数据层用两个独立结构（`EXPERIENCE: RoleGroup[]` 与 `ADDITIONAL: AdditionalRole[]`），
后者的类型里**根本没有成就字段**，想给它写成就在类型层面就不成立。

首批归入 Additional 的三段（2026-08-21 决定）：

| 经历 | 时间 |
| --- | --- |
| Java Developer · Hangzhou Tanhua E-commerce | Dec 2023 — Jun 2024 |
| Junior Developer · Zhejiang Sendinfo Technology | Mar 2017 — Mar 2019 |
| Junior Developer · Zhejiang Yonyou Software | Jan 2016 — Mar 2017 |

Tanhua 与另外两段相隔七年，因此**不合并为一条"早期经历"**，
三条各占一行按时间倒序排列——降级的是形态，不是事实。

## 理由

- 弱条目与强条目并列时，代价不是"多占了一点空间"，而是**稀释**：
  访客用同一种预期去读每张卡，读到第三张空洞的卡之后，会顺带怀疑前两张的分量。
- 分层比删除诚实。ADR-0001 约束 3 要求站点 / CV / LinkedIn 事实一致；
  站点上少掉三段工作经历，恰恰会制造交叉比对时的不一致。
- 分层也比"硬凑 Impact"诚实。给一段真的没有成果的经历编一句结果，
  是 ADR-0010 最想避免的那类内容。
- Additional 这一层的存在，反过来让 Relevant 层的准入变严格：
  往下降有了去处，就不必为了保留一段经历而降低标准。

## 约束

1. **Additional 层不允许出现成就条目、标签、配图、外链。** 想给某段加这些，
   意味着它应该升回 Relevant——那就得先拿出带 Impact 的成就。
2. **升降级只依据"有没有带 Impact 的成就"，不依据职级、公司知名度或时间远近。**
   早期经历不是天然属于 Additional；将来若从旧经历里挖出可核验的成果，应当升回去。
3. Additional 层的条目**必须与 CV / LinkedIn 的时间和雇主完全一致**——
   这一层唯一的作用就是连续性，写错了它就没有存在价值（ADR-0001 约束 3）。
4. 本 ADR 不改变 [ADR-0002](0002-information-architecture.md) 约束 1：
   Relevant 层折叠态每条仍然只能有一行。

## 后果

- 正面：Experience 板块的信噪比由 Relevant 层决定，与总段数脱钩；
  以后新增经历有了明确的归属判据，不再逐条讨论。
- 负面：多一层结构就多一处要维护，且"该在哪一层"会变成一个需要定期复看的判断。
  另外 Additional 层在视觉上明显更轻，对当事人而言像是在贬低自己的一段职业经历——
  这是有意为之，但要接受它带来的心理成本。

## 复审条件

如果将来 Relevant 层不足三段（例如重写文案时删掉了拿不出 Impact 的条目），
分层就失去意义，应退回单层列表。
