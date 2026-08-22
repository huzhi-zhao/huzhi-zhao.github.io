# 上线记录 2026-08-21 — 结构改造

- 范围：架构与页面排版
- 对应需求：[设计文档 0001](../design/0001-brand-revamp.md) 的 S1–S4
- 相关决策：[ADR-0002](../adr/0002-information-architecture.md)、[ADR-0012](../adr/0012-experience-two-tiers.md)

本轮范围**只有架构与排版**，明确不做：措辞定稿、Writing 板块、About 页、真实图片资产。

| 需求 | 状态 | 落点 / 偏差 |
| --- | --- | --- |
| FR-1.1 Hero pitch | 未做 | 属文案，留 P2 |
| FR-1.2 删 stack chip 行 | 已做 | `hero.tsx`；顺带把 CTA 从 "See my experience → #experience" 改成 "See my work → #projects"，跟顺序调整配套 |
| FR-1.3 终端脚本 | 未做 | 属文案，留 P2。**后果：技术栈信息目前只剩标签，ADR-0002 说的"三根支柱写进 Hero"这一半没落地** |
| FR-2.1 页面顺序 | 已做 | `app/page.tsx`，Writing 位置留注释 |
| FR-2.2 删 Skills | 已做 | 组件与文件一并删除 |
| FR-2.3 导航同步 | 已做 | 锚点 id 未变 |
| FR-2.4 板块标题改问句 | 未做 | 属文案，留 P2 |
| FR-3.1–3.8 项目卡 | 已做 | 新增 `project-card.tsx`；图为占位 |
| FR-4.1–4.5 Experience 折叠 | 已做 | 原生 `<details>`；headline 未定稿 |
| FR-5 CSI 改写 | 未做 | 留 P2，过渡方案见[设计文档 §3.1](../design/0001-brand-revamp.md) |
| FR-6 Writing | 未做 | `writing.ts` 已建，空数组；组件未建 |
| FR-7.1 外链集中 | 已做 | `lib/content/links.ts`，含 `visibility` 标注 |
| FR-7.3 链接检查脚本 | 未做 | — |
| FR-8 About | 未做 | — |

**实测值（1440×900，Chrome）**

| 判据 | 结果 |
| --- | --- |
| 折叠态时间线本体 | 732px（0.81 屏）— 达标 |
| Experience 板块总高 | 1403px（1.56 屏）— 观测值，判据已修订，见[设计文档 §1](../design/0001-brand-revamp.md) |
| 单张折叠卡 | 102–103px |
| 每张项目卡的链接元素数 | 1 — 达标 |
| 移动端 hover 层 | `display: none` — 达标（FR-3.7） |
| 移动端横向溢出 | 无 |
| 首屏技术栈罗列 | 已无 — 达标 |

**两条验证不了的**：浏览器面板的合成 hover 与 click 不触发 CSS `:hover`、也不触发
`<details>` 的原生 toggle。hover 遮罩是注入 `opacity:1` 后截图确认视觉的，
展开态是用 `summary.click()` 确认的。真机上的 hover 手感需要人眼再过一遍。

**未做但已经看见的问题**（同步进仓库根目录 `TODO.md`）：Contact 板块现有文案
"Open to backend, data engineering, and AI platform roles in Manitoba."
写了具体岗位与地域，与 ADR-0008 直接冲突。属文案，本期未动。

## 下轮开工前先看这几条

1. `lib/content/experience.ts` 里的 `points` 是过渡字段，P2 迁完 CSI 之后应整个删掉，
   同时把 `achievements` 改回必填——类型层面的保证到那时才真正闭合。
2. 项目卡的三张图是外链占位，`next.config.mjs` 为此加的 `remotePatterns` 要跟着删。
3. 本轮的实测值可以直接拿来做回归基线：折叠卡 102–103px、时间线本体 732px、
   项目卡链接元素数 1。
