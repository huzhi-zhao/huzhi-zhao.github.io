# TODO

## 简历 / LinkedIn 待修正（2026-08-19 记录）

站点内容已经按核对过离职证明的版本更新了，但 **CV PDF 和 LinkedIn 上还有几处表述误差没改**。
下次开工时提醒 James 处理这几条：

- [ ] **年限**：CV 的 Professional Summary 写的是 `10+ years of experience`，实际连续工作经历是
      2016-01 到 2025-02，约 **9 年**。站点已改为 9。两份材料对外同时可见，需要统一。
- [ ] **CV 缺 MES 那段**：`Jul 2024 – Feb 2025` 的 Shanghai Zhongyou Tipo 自由职业 MES 项目
      在 CV 的 Experience 里完全没有。导致 PDF 上从 Tanhua 结束（2024-06）到入学（2026-01）
      是一段**近两年的空白**。站点时间线已补齐，CV 没有——而 CV 才是真正投出去的那份。
- [ ] **CV 缺 career break 说明**：`Mar 2025 – Dec 2025` 的 relocation + IBM AI 证书 + 图标
      AI 项目，站点有，CV 没有。

  > 上面两条**怎么补**：按课件 1C 的 Chronological B 模板，补进 `ADDITIONAL EXPERIENCE`
  > 一节即可——每段只有职位 / 雇主 / 时间 / 地点一行，不写成就条目。这一层在模板里的用途
  > 明写为 "Accounts for all work history (no gaps)"，目的就是填时间线，不是给证据。
  > 和站点的分层一一对应，判据见 [ADR-0012](docs/adr/0012-experience-two-tiers.md)：
  > 拿得出带 Impact 的成就才进 Relevant，拿不出就走 Additional，别硬凑。
- [ ] **任职时间 LinkedIn 与离职证明不符**（以离职证明 / CV 为准，LinkedIn 要改）：
  | 公司 | 离职证明 / CV（正确） | LinkedIn（待改） |
  | --- | --- | --- |
  | Weimob | May 2021 – Nov 2023 | Mar 2021 – Nov 2023 |
  | Souche | Mar 2019 – May 2021 | Mar 2019 – Mar 2021 |
- [ ] **CV 的 Education 毕业时间**：CV 写 `Jan 2026 - Dec 2026`。实际是两个 diploma，
      AI 今年底结束、Business Analysis & Transformation 2027-12 结束。站点统一写成
      `Jan 2026 — graduating Dec 2027`，不拆分单个项目的毕业时间。CV 需同步。
- [ ] **图标 AI 项目的技术栈说法不一致**：LinkedIn 的 career break 描述里是
      CLIP / BLIP / VGG16；站点 Projects 卡片里写的是 Gemini API 编排。可能是两个 repo 的
      不同阶段，但对外读起来像是同一个项目的两套说法。需要确认后统一口径。

## 站点待办

- [ ] **Resume 下载入口已建好但未启用**：`components/site-navbar.tsx` 里的 `CV_HREF` 目前是
      空字符串，导航栏 / 移动菜单 / Hero 三处 Resume 按钮都不渲染。拿到外部托管的 PDF
      链接后填进去即可自动出现（简历不放在 GitHub Pages 里）。
- [ ] **Work authorization 表述**：暂不写。等 2027-12 毕业、正式开始找工作前再 finalize。
- [ ] **Experience 卡片配图**：`components/experience.tsx` 的 `Role` 类型支持
      `images: [{ src, alt }]`，文件放 `public/` 下填路径即可。MES 那条留了注释掉的示例。

## 结构改造之后遗留（2026-08-21）

本期只做架构与排版，措辞一律没动。留下的口子：

- [ ] **Experience 的 `points` 要迁成 CSI 三段**：`lib/content/experience.ts` 里每条 Role
      现在走 `points`（旧文案逐字搬运）。目标形态是 `achievements`，三段齐全才通过构建期校验。
      P2 逐条迁移，迁完 `points` 字段应该消失。
- [ ] **折叠态 headline 未定稿**：现在是现有事实的机械拼接，不是 Challenge→Impact 缩写。
- [ ] **项目卡的 `question` 未定稿**：单行不折行，移动端约 40 字符就会截断，定稿时要按这个长度写。
- [ ] **项目卡配图是占位**：三张外链图写在 `lib/content/projects.ts`，
      `next.config.mjs` 里为此加了 `remotePatterns`。P5 换成真图挪进 `/public` 之后，那两条要删掉。
- [ ] **Contact 板块文案与 ADR-0008 冲突**：现在写的是
      "Open to backend, data engineering, and AI platform roles in Manitoba."
      ——具体岗位 + 地域，正是 ADR-0008 说 2027 之前不写的东西。属于文案，本期没动。
- [ ] **Icon Pipeline 的 primary destination** 暂定 App repo（设计文档 0001 §5 未决问题 1）。
