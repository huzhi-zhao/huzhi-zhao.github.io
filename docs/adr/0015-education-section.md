# ADR-0015 Education 自成一层，Career break 降入 Additional

- 状态：已接受
- 日期：2026-08-28
- 依赖：[ADR-0001](0001-site-positioning.md)、[ADR-0012](0012-experience-two-tiers.md)

## 背景

[ADR-0012](0012-experience-two-tiers.md) 把 Experience 分成 Relevant / Additional 两层，
归属判据是"这段经历能不能拿出一条带 Impact 的成就"。但当时 Experience 里还有两段
**根本不是工作经历**的条目，判据没覆盖到，就沿用了 Relevant 卡的形态：

| 条目 | 时间 | 形态 |
| --- | --- | --- |
| University of Winnipeg（在读 diploma） | 2026-01 — | 折叠卡：headline + points + tech + logo |
| Career break — relocation to Canada | 2025-03 — 2025-12 | 折叠卡：headline + points + tech |

两段都拿不出带 Impact 的成就，按 0012 的判据本就不该占 Relevant 卡。但直接套用 0012
的处理办法（降入 Additional）对这两段并不同样合适：

- **在读学历不该被"降级"。** Additional 那一层的语义明写为"只补时间线连续性"，
  且约束 1 不许带 logo、标签、外链。而本地学历恰恰是北美读者会主动去找的信息，
  把它压成一行灰字、连校徽都摘掉，传达的意思正好相反。
- **Career break 则完全吻合 Additional 的定位。** 它的 IBM 证书是投入不是结果；
  图标 AI 项目在 Projects 里已有独立卡片（`icon-pipeline`），
  在 Experience 里再讲一遍是自己稀释自己。它剩下的唯一职责就是补
  2025-03 — 2025-12 的连续性——那正是 Additional 存在的理由。

## 决策

**1. Education 自成一层**，数据结构 `EDUCATION: EducationEntry[]`，形态介于两层之间：
可以有 logo 和 focus 一行，但没有折叠区、没有成就字段。渲染在 Experience 板块内、
时间线**之前**。

排在前面不是因为它更重要，而是因为 Relevant 层最新一条止于 2025-02
（MES 结束）——在读学历若排在时间线之后，页面读起来像最近一年半是空的。

**2. 两个 diploma 合并成一条，不平铺并列。**

```
University of Winnipeg (PACE)                          Jan 2026 — Dec 2027
Post-Graduate Diploma, Applied Artificial Intelligence ·
Post-Degree Diploma, Business Analysis & Transformation
```

并列两条会让读者自己去猜两者的关系，猜出来的多半是"他在混学历"。
合并成一条 + 一句 focus，把它讲成一个人的能力补全。
（这条判断的完整论证属于素材，按 [ADR-0013](0013-public-repo-privacy-boundary.md)
留在 ToucanShelf `Research/BAT 第二个 diploma 的定位与解释话术`。）

**3. Career break 降入 `ADDITIONAL`**，保留一行：
`Career break — relocation to Canada · Self-directed study (IBM AI Engineering certificate)`。
降的是形态，不是事实。

## 理由

- 0012 的判据只回答了"这段经历值不值得占一张卡"，没回答"它是不是一段经历"。
  学历和工作放同一个组件里，是把 0012 之前那个"两种诉求塞进同一个组件"的错误
  换了个地方重犯。
- 课件 `1C Introduction to Resumes` 的 Chronological B 模板本身就把 EDUCATION
  独立成节，不塞进 Experience。
- Bachelor（Henan University of Engineering, 2010—2014）过去在站点上完全没有，
  只在 CV 里有——这与 [ADR-0001](0001-site-positioning.md) 约束 3（站点 / CV /
  LinkedIn 事实一致）冲突。借这次拆分补上。

## 约束

1. **Education 层不允许出现成就条目、折叠区、外链**（logo 的官网跳转除外）。
   想给某段学历写成果，那属于 Projects 或 Relevant 层。
2. **对外统一写 `Jan 2026 — Dec 2027`**，不拆分两个 diploma 各自的毕业时间。
   CV 与 LinkedIn 必须同步（ADR-0001 约束 3）。
3. **Career break 一旦在 Additional 层，就不许再加技术标签或链接**——
   ADR-0012 约束 1 同样适用。想升回 Relevant，先拿出带 Impact 的成就。

## 后果

- 正面：Relevant 层只剩真正的工作经历（Tipo / Weimob / DaSouChe），
  板块的信噪比进一步提高；学历这类"必须有但给不了证据"的信息有了明确去处。
- 负面：Relevant 层降到 3 段，正好卡在 ADR-0012 复审条件的下限
  （"不足三段则退回单层列表"）。再降一段就要重新审视分层是否还成立。
- 多了第三种卡片形态，Experience 板块现在有三套视觉规格要维护。

## 复审条件

如果 Education 层长期只有 UWinnipeg 一条且 diploma 已毕业（2027-12 之后），
它退化成一行静态信息，届时可考虑并回 Additional 或移入 About 页。
