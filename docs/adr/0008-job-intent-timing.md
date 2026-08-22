# ADR-0008 求职意向表述的时间边界

- 状态：已接受
- 日期：2026-08-20

## 背景

有一类常见建议：在 Hero 和 Contact 明确写出目标岗位和地域，例如
"Open to Senior Backend Engineer, Data Engineer, and AI Platform Engineer roles in
Canada (Winnipeg & Remote)"，理由是能让 recruiter 立刻判断匹配度、降低沟通成本。

但当前实际情况是：两个 diploma 到 **2027-12** 才结束；
work authorization 的表述在毕业前无法 finalize（见 `TODO.md`）。

现状是 Hero 徽章和 Contact 都写着 "Open to new opportunities"。

## 决策

**在 2027 年上半年之前，不在站点上写具体的目标岗位、地域偏好或工作许可状态。**

- 保留当前的 "Open to new opportunities" 这类泛化表述；
- 不添加 "Open to X / Y / Z roles in Winnipeg & Remote" 式的具体声明；
- 不添加工作许可、签证状态、可入职时间相关的表述；
- Hero 终端脚本中的 `status` 一行同样遵守本条。

## 理由

- 挂出具体岗位偏好，与"还有一年多才能全职"之间是矛盾的。
  recruiter 按这条联系过来，双方都要为时间差付出沟通成本，且给人"信息不准确"的印象。
- 工作许可的表述一旦写错，属于事实性错误，代价远高于不写（见 ADR-0007 一致性条款）。
- 这条不影响品牌建设本身：**定位**（我解决什么问题）现在就该说清楚，
  **求职意向**（我要什么岗位）可以晚说。两者是不同的东西，不要混为一谈。

## 约束

1. 任何"更精确地表达求职意向"的改进建议，在复审时间点之前一律记入待办，不实施。
2. 引用外部建议（含 LLM 生成的建议）时注意：这类建议默认假设作者可以立即入职，
   与本站情况不符。

## 复审条件

2027 年上半年，或求职计划提前时，重新评估并一次性 finalize：
目标岗位措辞、地域、工作许可表述。届时应与 CV、LinkedIn 同步改。
