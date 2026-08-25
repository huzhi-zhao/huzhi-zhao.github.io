# ADR-0007 文案规范：CSI 三段式与词汇一致性

- 状态：已接受
- 日期：2026-08-20
- 依赖：[ADR-0001](0001-site-positioning.md)
- 相关：[ADR-0010](0010-ai-assisted-writing.md)（本规范产出的文案同样受 AI 定稿标准约束）

## 背景

站点上几乎所有描述都是"做了什么"式的：
`Improved query performance to support 500K+ QPS through Redis caching`。
这类句子把作者定位成**技术执行者**——做了一件技术动作。

课程里有三处独立地要求"结果必须出现"：

- **Elevator Pitch 五段式**（1A，Introductory → Supporting 1/2/3 → Closing）：每条支撑都是
  "技能 + 与目标岗位/行业的匹配 + 具体实例"。注意 Closing 是**两件事**——
  这份工作带来的好处（This helped customers… / It also helped the organization…）
  **加上**这份工作让你什么感觉（Overall, I find this work ___ because ___）。
  后半段属于口头 pitch 的收尾，**不进站点文案**：站点上写自己的感受，
  正是 [ADR-0011](0011-about-page-scope.md) 约束 3 要删掉的那类零信息量句子。
- **简历陈述句的结构**（1C）：`Verb + Details + Result`，Result 明写为"结果、产出或影响"。
- **Dependable Strengths**（1A）：从**具体成就**反推稳定能力。

## 决策

### 1. 所有成就类描述采用 Challenge → Solution → Impact（CSI）三段式

- **Challenge**：当时的业务困境（不是技术任务）
- **Solution**：架构/方法上的选择，且要点出取舍
- **Impact**：结果，尽量带可核验的量

**出处**：CSI 不是自创的，它对应课件 1C 里 Functional 模板 Academic Projects 一栏的
`Challenge / Action / Result`（CAR），也对应简历陈述句的 `Verb + Details + Result`。
唯一的改动是把中间那段从 **Action**（我做了什么）收紧成 **Solution**（我在架构/方法上
选了什么、放弃了什么）。这是有意加严：只写"做了什么"仍然是技术执行者的语法，
点出取舍才说明是设计者。因此**凡是 Solution 段落写不出取舍的，视为不合格**，
按 Action 的标准写出来不算过关。

示例改写：

> 改前：Improved query performance to support 500K+ QPS through Redis caching.
>
> 改后：**Challenge** 大促峰值下商品搜索出现严重数据库瓶颈。
> **Solution** 设计冷热分离的多层 Redis 缓存策略。
> **Impact** 支撑 500K+ 峰值 QPS，延迟 <10ms，大促期间零停机。

适用范围：Experience 每条、项目卡片的问题句与 hover 简介、L2/L3 文档的开头。

### 2. 全站共用一套关键词

Hero 的 Elevator Pitch 里选定的关键词，必须原样出现在板块标题、卡片问题句、
文章标题、Experience 的 Impact 句中。目标是访客滚完一屏、细节全忘光之后，
脑子里仍残留同一个印象词（如 `operations` / `reliable`）。

关键词的选取以本地 JD 的高频词为准（Labour Market Research），不靠拍脑袋。
统计范围是**名词和动词两类**——课件 1C 对 keyword 的定义原文是
"nouns and verbs used to describe the position"，并要求 "use vocabulary (keywords)
from the posting and the industry"。只统计动词会漏掉能力域这一侧的词，
而 [ADR-0003](0003-problem-domain-abstraction.md) 的标签集本身就是名词短语
（`Operational Data Platforms` 等），按只统计动词的口径根本无法定稿。

### 3. 板块标题用问句或动词短语，不用分类名词

`Projects` → 类似 "Problems I'm working on"；`Experience` → 类似 "Where I learned to do this"。
名词是简历语法，问句/动词是品牌语法。

### 4. 事实一致性是文案的前置条件

站点 / CV PDF / LinkedIn 三处的**事实**必须先对齐，再谈措辞。
当前已知的不一致项记录在仓库根目录 `TODO.md`，包括：年限 9 vs 10+、
CV 缺 MES 段落与 career break、LinkedIn 任职时间与离职证明不符、
Icon 项目技术栈两套说法（CLIP/BLIP vs Gemini API）。

## 理由

- 北美 hiring manager 和技术面试官关心的是"为什么这样架构"和"给业务带来什么"，
  这正是 CSI 中间和末段承载的信息。
- 品牌定义里的 "largely-uniform perception" 首先是**事实层面的统一**。
  交叉比对时发现时间对不上，第一反应是"这人是否在美化经历"，
  之后所有内容的可信度都要打折——这不是待办小事，是品牌可信度的漏洞。

## 约束

1. **不允许出现只有 Solution 没有 Impact 的条目。** 拿不出结果的事项，不写。
2. 量化数字必须真实可核验，宁可不写。
3. 关键词集合改动时，必须全站同步；不允许 Hero 改了而卡片文案留在旧词上。
4. 涉及事实的改动（年限、时间段、技术栈说法）必须三处同步，
   任何一处单独改动都视为引入了不一致。

## 后果

- CSI 三段式是**内容检查表，不是句式模板**。三条并排写成同构排比句，
  正是 [ADR-0010](0010-ai-assisted-writing.md) 要防的那种文本形态；
  最终文案应当自然行文。
- CSI 比原来的单行 bullet 更占空间，这与 ADR-0002 的"Experience 压缩"存在张力。
  解决方式：折叠态只放 Challenge→Impact 的**一句缩写**，完整 CSI 放在展开态。
