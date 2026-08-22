# Architecture Decision Records

这里记录 huzhi.dev 的**方向性决策**——那些一旦定下来、后面所有页面和文案都要跟着走的边界。

不是所有技术选择都要写 ADR。写进来的标准是：

- 它约束了后续的取舍（以后有人想改，得先推翻这条）；
- 或者它是一个**反直觉的取舍**，不写下来半年后会被无意识地改回去。

纯实现细节（用哪个动画库、某个间距取多少）不写 ADR，写在 `docs/design/` 的设计文档里；
每轮上线实际做成什么样，写在 `docs/launch/` 的上线记录里。

## 格式

每篇包含：状态 / 背景 / 决策 / 理由 / 约束（对后续工作的硬性限制）/ 后果 / 复审条件。

状态取值：`提议中` `已接受` `已废弃` `被 ADR-xxxx 取代`。

## 索引

| 编号 | 标题 | 状态 |
| --- | --- | --- |
| [0001](0001-site-positioning.md) | 站点定位是个人品牌，不是在线简历 | 已接受 |
| [0002](0002-information-architecture.md) | 信息架构按"问题"而非"时间"组织 | 已接受 |
| [0003](0003-problem-domain-abstraction.md) | 作品集的分类轴：架构能力，而非业务域 | 已接受 |
| [0004](0004-project-card-interaction.md) | 项目卡片：单一入口与信息分层 | 已接受 |
| [0005](0005-content-tiers-and-hosting.md) | 内容三层结构与承载方式 | 已接受 |
| [0006](0006-writing-section.md) | Writing 板块的形态与上线时机 | 已接受 |
| [0007](0007-copy-conventions.md) | 文案规范：CSI 三段式与词汇一致性 | 已接受 |
| [0008](0008-job-intent-timing.md) | 求职意向表述的时间边界 | 已接受 |
| [0009](0009-motion-budget.md) | 全站动效预算 | 已接受 |
| [0010](0010-ai-assisted-writing.md) | AI 辅助写作的边界与定稿标准 | 已接受 |
| [0011](0011-about-page-scope.md) | About 页的职责边界：只做人味，不做求职诉求 | 已接受 |
| [0012](0012-experience-two-tiers.md) | Experience 分两层：给证据的和只补时间线的 | 已接受 |

## 背景来源

这批 ADR 来自两个输入：

1. **DPS 51019 Resume Building and Job Search Techniques** 课程的内容——Developing a Personal Brand（Elevator Pitch 五段式、Dependable Strengths）、Labour Market Research、The Challenge Mindset，以及 Introduction to Resumes（master / targeted 之分，Chronological A/B、Functional、Combination 四种版式）。
   注意：课件原文是英文；此前流传的中文解读是 LLM 的二手推论，**以英文原文为准**。
2. 2026-08 对 Manitoba 本地岗位市场和开发者作品集实践的一轮调研，结论记录在 ADR-0003 和
   [设计文档 0001](../design/0001-brand-revamp.md) 的调研附录里。
