# 版式选型

- 依据：DPS 51019 Module 1（Resume Template：Chronological A / B、Functional、Combination）、[ADR-0007](../adr/0007-copy-conventions.md)
- 相关事实：`lib/content/experience.ts`（时间线的唯一副本）

## 结论

**当前情况用 Combination。**（2026-08-29 判断，见下方判据与复审条件）

理由是三条约束同时成立：

1. 有 9 年真实的深度经验，**不能藏**——Functional 会把它压成能力标签，
   等于自己放弃最强的资产；
2. 2025-02 起没有技术全职，**纯 Chronological 会把这段空窗放在最显眼的位置**；
3. 转向 AI / 数据方向，目标岗位和过去的岗位名不完全对齐，
   **需要一个能力区来完成"我为什么能做这个"的翻译**。

Combination 是唯一同时满足这三条的：顶部能力区做翻译，下方时间线保留深度，
空窗被推到读者已经建立信任之后才看到。

## 四种版式的选用判据

| 版式 | 结构 | 什么时候用 | 什么时候不能用 |
| --- | --- | --- | --- |
| **Chronological A** | 时间倒序，一段经历一块，能力藏在 bullet 里 | 目标岗位与最近一份工作**同类**，且时间线连续 | 有空窗、转方向、最近一份工作与目标不相干 |
| **Chronological B** | 同上，但加一个简短的 Summary / Highlights 开头 | 同上，且需要一句话定位自己 | 同上 |
| **Functional** | 按能力分组，时间线压缩成一行列表 | 经历零碎、跨度大、或刻意要淡化时间 | **深度是卖点时**——它会把 9 年和 2 年写成一样 |
| **Combination** | 顶部能力/成就区 + 下方完整时间线 | 有深度但方向在转、或时间线有需要解释的地方 | 篇幅极紧时（它比 Chronological 多占约 1/4 页） |

## 选型的三问

按顺序问，第一个命中即定：

1. **时间线有没有需要解释的地方？**（空窗、短期、方向切换）
   没有 → Chronological；有 → 往下。
2. **深度是不是卖点？**
   不是（经历零碎、都是短期）→ Functional；是 → 往下。
3. **目标岗位和过去的岗位名对不对得上？**
   对得上 → Chronological B（用 Summary 补一句翻译就够）；
   对不上 → **Combination**。

## 课上三个案例，和我为什么都不完全对应

`Finalizing Resume Content` 的活动给了三个典型困境和标准答案：

| 案例 | 困境 | 标准答案 |
| --- | --- | --- |
| Ali | 3 年空窗（读 MBA + 旅行） | Functional；用教育填空窗；求职信里解释；面试前备好诚实的回答 |
| Crystal | 7 年零售经验，转会计 | Functional；突出相关课程与学术成果；强调可迁移技能；**少走在线海投** |
| Frank | 22 年 IT，6 家雇主 9 个岗位 | Chronological；用 Relevant / Additional 两节；砍掉或删掉久远岗位；**避开初级岗** |

**我同时是 Crystal 和 Frank。** 既在转方向，又有九年连续经历和 2025-02 起的空窗。
标准答案各自只针对一个困境——Crystal 的答案（Functional）会把我九年的深度压平，
Frank 的答案（Chronological）盖不住方向切换。两条叠加正好落在
上面三问的第 3 问"对不上 → Combination"。**这三个案例不推翻本文的结论，它们支持它。**

有两条可以直接搬的：

- **Frank 的 Relevant / Additional 分节**，就是站点侧
  [ADR-0012](../adr/0012-experience-two-tiers.md) 的同一套东西（简历侧判据见
  [ADR-0016](../adr/0016-course-conventions-scope.md) §1）。课件在这里又背书了一次。
- **Crystal 的"少走在线海投"**：转方向的人靠投递系统命中率低，
  要换成人脉、informational interview、直接接触雇主。
  这一条与校友分享里的"质量胜过数量"是同一个意思。

## Functional 的陷阱

北美招聘方普遍知道 Functional 用来盖住什么，
所以选它等于**主动提示"这里有事"**，而且提示了却不解释。
只有当时间线确实无法讲成故事时才用它——如果能讲成故事，Combination 永远更优。

DPS 51019 的 Functional 模板里有 Academic Projects 一栏，用 CAR
（Challenge / Action / Result）组织——这一栏正是 ADR-0007 里 CSI 的出处。
**用不用 Functional 版式，不影响 CSI 的适用**：CSI 是内容检查表，
在四种版式里都成立。

## Combination 的写法要点

- **顶部能力区不是关键词堆。** 每条能力后面必须挂一个具体实例的指针，
  否则它和"精通 Java"没有区别。
- **能力区的词从 JD 来**，不是自己想的（ADR-0007 §2：名词和动词两类都统计）。
- **时间线不能因为有了能力区就偷懒。** 下方每段仍然要有 Impact，
  ADR-0007 约束 1 在这里同样生效：只有做法没有结果的条目，不写。
- **空窗不留空。** 期间做了什么就写什么（读书、证书、项目），
  留白比写"gap"更糟——读者会自己填最坏的解释。

## Education 区块怎么排（2026-09-11 定）

课上（`Highlighting Your Qualifications` / `Developing a Professional Profile`）示范的写法是
**凭据名第一行、学院与机构第二行**，学院不许用缩写：

```
Artificial Intelligence Diploma
Professional, Applied and Continuing Education, The University of Winnipeg
```

**名称以官网为准**（2026-09-11 核过，两个页面的链接留在 ToucanShelf
`Career/Vault/Baseline` 的"PACE 两个项目的官方事实"一节）：

| | 官方项目名 | 完成后拿到的凭据 |
| --- | --- | --- |
| AI | Artificial Intelligence Post-Degree Diploma | Artificial Intelligence Diploma |
| BAT | Business Analysis & Transformation Post-Degree Program | Business Analysis Diploma |

**用项目名，不用凭据名**（2026-09-11 定）。凭据名 `Business Analysis Diploma` 丢掉了
Transformation，而那正是这个项目与纯 BA 的区别所在。两个 Post-Degree 重复是可接受的代价。
官网 BAT 页写的是小写 `Post-degree`，两处统一成 `Post-Degree`——
这是排印归一化，不是改名。

那个格式是给**只有一个学历**的人用的。本人有三个（两个 diploma + 本科），
照排会把学院全称重复两遍，而且两个 diploma 起止时间完全相同，
并列读起来就是[ADR-0015](../adr/0015-education-section.md) 担心的"在混学历"。

**采用的排法：机构提一次，凭据挂在下面。**

```
EDUCATION

Professional, Applied and Continuing Education,
The University of Winnipeg                       Winnipeg, MB, Canada
 Artificial Intelligence Post-Degree Diploma         Jan 2026 – Dec 2026 (in progress) *
 Business Analysis & Transformation
 Post-Degree Program                                 Jan 2027 – Dec 2027 *

Henan University of Engineering                  Henan, China
 Bachelor of Engineering,
 Mechanical Design, Manufacturing and Automation     Sep 2010 – Jun 2014
```

`*` 两行的起止**待定**：两个项目各 12 个月、连着读，简历上拆开写还是合并写没定。
站点侧按 [ADR-0015](../adr/0015-education-section.md) 约束 2 统一写 `Jan 2026 — Dec 2027`，
不拆分——简历侧拆不拆是独立问题。另注意 ToucanShelf `Career/Vault/Baseline` 记着一条口径：
**对外统一说毕业时间 2027-12**，实际结课在 2028-01（BAT 含实习）。这条不要"改正"。

保留的是课程真正在意的两件事：**学院全称不缩写**、**在读项目要写明 in progress**。
放弃的是凭据名抢第一行——换来少四行和一个"一所学校的一套安排"的读法。

**站点不跟这个排法。** 站点的 Education 层是卡片不是简历条目，
维持 [ADR-0015](../adr/0015-education-section.md) 的现有形态（机构短名 + 两个 diploma 合成一行）。
这正是 [ADR-0016](../adr/0016-course-conventions-scope.md) 作用域表里"编排两侧各自定"的一个实例：
两边的**事实**一致，排法不必一致。

**不写 `Seeking AIE` 那一行。** 课上示范里有，但初步调查显示 ARTiBA 的认可度
只有它自己网站在说（结论与复看条件记在 ToucanShelf
`Career/Campaigns/20260829-Open Badge 徽章获取`）。
按 [ADR-0017](../adr/0017-qualifications-scope.md)，未取得的认证占的是最贵的版面，不写。

## 复审条件

以下任一情况出现，重新走一遍上面的三问：

- 2028 年正式求职时，方向已经稳定在 AI / 数据，且有了本地技术经历——
  那时空窗被推远、方向不再"在转"，Chronological B 可能就够了；
- 某个 JD 明确要求特定格式（少见，但政府和大企业的申请系统偶尔会）；
- 篇幅被压到一页且内容装不下。

篇幅与 ATS 的具体取舍见 [`ats-tradeoffs.md`](ats-tradeoffs.md)。

## 待补

- [ ] 核对 DPS 51019 Module 1 讲义里 Chronological A 与 B 的确切差异——
      上表按"有无 Summary 开头"记，这是从模板结构推断的，**未与讲义逐字核对**。
      讲义原文在 ToucanShelf `Career/Inputs/PaceResumeCourse/M1-PersonBrand_MarketSearch`。
