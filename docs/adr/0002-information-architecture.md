# ADR-0002 信息架构按"问题"而非"时间"组织

- 状态：已接受
- 日期：2026-08-20
- 依赖：[ADR-0001](0001-site-positioning.md)
- 被细化：[ADR-0012](0012-experience-two-tiers.md)（Experience 折叠之后再分 Relevant / Additional 两层）

## 背景

当前 `app/page.tsx` 的顺序是：

```
Hero → Experience → Projects → Skills → Contact
```

这是简历的信息架构，隐含的叙事是"我干了这些年 → 所以我会这些"。

两个具体症状：

1. `components/experience.tsx` 有 357 行，是全站最重的组件。访客滚到一半就失去兴趣，
   后面的 Projects 实际上没人看到。
2. Skills 是一份技术栈清单——按工具分类的人是"会用工具的人"，
   这和课程里 Challenge Mindset 想传达的"我要解决什么问题"是相反的语法。

课程 Challenge Mindset 一节的核心：不要问 "what do you want to be when you grow up"
（职位），要问你想解决什么问题。

## 决策

**页面顺序改为按"问题 → 凭据 → 思考"组织：**

```
Hero        我帮谁解决什么问题（Elevator Pitch）
Projects    我正在解决的问题（案例 = 证据）
Experience  我在哪里练出这身本事（履历，压缩折叠）
Writing     我怎么思考这类问题（见 ADR-0006，暂缓上线）
Contact
```

同时：

- **Experience 默认折叠**：每段只显示一行 headline（公司 · 角色 · 时间 · 一句 Challenge→Impact），
  详情点击展开。目标是从约 3 屏压到 0.5 屏。
- **Skills 不再作为独立顶级板块**。技术栈的归宿是：三根支柱写进 Hero 终端（见下），
  单项技术作为标签挂在具体项目/经历上。
- **Hero 终端（`hero-terminal.tsx`）的脚本从"简历字段"改为"定位展开"**：
  当前 `whoami / years_experience / currently / status` 四条全是简历字段，
  没有一条说明差异化。改为输出问题域 + 三根技术支柱
  （Distributed Backend / Data & Lakehouse / Applied AI），让 Hero 左边说定位、右边说凭据。

## 理由

- 顺序决定语法。项目天然是"问题-解法-结果"形状，履历是"时间-公司-职责"形状；
  谁排在前面，决定了访客用哪种语法读你这个人。
- Projects 前置**必须和 Experience 压缩同时做**。单独换顺序解决不了问题：
  Experience 还是那么长，只是变成"没人滚到那儿"。
- 9 年大型电商后端经历是最硬的资产，**压缩不等于藏起来**——折叠后位置不变、
  仍在第三块，想看的人一点即开。

## 约束

1. Experience 折叠态每条**只能有一行**正文。要写三行的冲动，说明那条内容属于项目卡片或 wiki。
2. 不恢复独立 Skills 板块。想展示某项技术，就找一个用到它的项目挂上去。
3. 板块顺序的调整必须整体评估——顺序本身承载叙事，不能因为"某块内容做好了"就把它往前挪。

## 后果

- Skills 板块删除会丢掉一部分关键词密度。缓解：技术栈标签仍在项目卡与经历卡上出现，
  ATS 场景由 CV PDF 承担，站点不为 ATS 优化（ADR-0001：受众是 hiring manager）。
- 导航栏 `navItems` 需要同步调整顺序，锚点 id 保持不变以免外部链接失效。
