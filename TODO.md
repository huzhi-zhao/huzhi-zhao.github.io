# TODO — 待办总表

- 更新日期：2026-08-29
- 定位：**汇总当前所有未完成的事**，一页看完。每条只写"是什么、依据哪条、卡在哪"，
  展开细节回到对应的 ADR / 设计文档 / 上线记录。

与其它文档的分工：

| 文档 | 回答 |
| --- | --- |
| `docs/adr/` | 为什么这样定 |
| `docs/design/` | 打算怎么做（需求与方案） |
| `docs/launch/` | 实际做成了什么 |
| **本文** | **还剩什么没做，按什么顺序做** |

## 0. 阻塞项：已解除

- [x] 评审 [ADR-0013 公开仓库的隐私边界](docs/adr/0013-public-repo-privacy-boundary.md)
      —— **已接受（有修改）**，2026-08-29。边界改为两问制：与简历无关的不进仓库；
      简历相关但属敏感字段（街道住址、手机号）的不进仓库。城市、邮箱、真实起止时间可公开。
      **渐进泄漏不再作为约束依据**——huzhi.dev 不做公开分发，性质接近个人邮箱。
- [x] 评审 [ADR-0014 docs 承担简历工作的范围](docs/adr/0014-resume-scope-in-docs.md)
      —— **已接受**，2026-08-29。不开独立仓库：本仓库持有可公开的简历事实，
      ToucanShelf MCP 补齐其余，本仓库即简历优化的 CC 协作入口。
      同时明确 portfolio 是名片（面向所有人、更新少），简历才按 JD 调整。
- [x] 裁决简历下载入口 —— **彻底删除**，FR-10 已实施
- [x] 裁决 [设计文档 0002 §5](docs/design/0002-privacy-and-resume-workbench.md) 剩下两个未决问题
      —— 2026-08-29：产物**完全不在仓库内产出**（链路见 ADR-0013"简历的生成链路"）；
      入口指引写在新建的仓库根 `CLAUDE.md`。

## 1. 隐私边界（ADR-0013 → FR-9 / FR-10）

ADR-0013 定稿后这一组大幅收缩，只剩产物排除与扫描脚本。

- [x] ~~FR-9.5 迁移下面第 2 节的事实不一致项到 ToucanShelf~~ —— **作废**（2026-08-29）。
      该需求建立在渐进泄漏这一威胁模型上，ADR-0013 定稿已否掉它；
      且第 2 节本质是"久远经历难以精确到月"的取证问题，不是暴露面。相关项留在仓库。
- [ ] FR-9.1 `.gitignore` 补简历产物排除规则（降级为误放兜底：产物完全不在仓库内产出，
      不再约定 `resume-out/`）
- [x] FR-10.1 删除 `CV_HREF` 及三处按钮分支（连带删除无引用的 `DownloadIcon`）
- [ ] FR-9.2 ~ FR-9.4 敏感信息扫描脚本（按 ADR-0013 约束 1，只扫街道住址、
      手机号、第三方个人联系方式三类）
- [ ] FR-12.3 复核 ToucanShelf 凭证类文档的分享状态（不在本仓库，但同属"绝不可外流"层）

## 2. 简历 / LinkedIn 待修正（2026-08-19 记录）

> 这一节**留在仓库**（ADR-0013 定稿）。它记的是待核实的事实误差，不是敏感信息——
> 久远的工作经历难以精确到月，差一两个月是取证问题，需要查阅离职证明 / 社保记录估算。

站点内容已经按核对过离职证明的版本更新了，但 **CV PDF 和 LinkedIn 上还有几处表述误差没改**。
下次开工时提醒 James 处理这几条：

- [ ] **年限**：CV 的 Professional Summary 写的是 `10+ years of experience`，实际连续工作经历是
      2016-01 到 2025-02，约 **9 年**。站点已改为 9。两份材料对外同时可见，需要统一。
- [ ] **CV 缺 MES 那段**：`Jul 2024 – Feb 2025` 的 Shanghai Zhongyou Tipo 自由职业 MES 项目
      在 CV 的 Experience 里完全没有。导致 PDF 上从 Tanhua 结束（2024-06）到入学（2026-01）
      是一段**近两年的空白**。站点时间线已补齐，CV 没有——而 CV 才是真正投出去的那份。
- [x] **CV 缺 career break 说明**（2026-08-28 已补）：`Mar 2025 – Dec 2025` 补进了 CV 的
      `ADDITIONAL EXPERIENCE` 一行。站点这一段同时从 Experience 卡降入 Additional
      （[ADR-0015](docs/adr/0015-education-section.md)），两边形态现在一致。

  > 上面两条**怎么补**：按课件 1C 的 Chronological B 模板，补进 `ADDITIONAL EXPERIENCE`
  > 一节即可——每段只有职位 / 雇主 / 时间 / 地点一行，不写成就条目。这一层在模板里的用途
  > 明写为 "Accounts for all work history (no gaps)"，目的就是填时间线，不是给证据。
  > 和站点的分层一一对应，判据见 [ADR-0012](docs/adr/0012-experience-two-tiers.md)：
  > 拿得出带 Impact 的成就才进 Relevant，拿不出就走 Additional，别硬凑。
- [ ] **Yonyou / Sendinfo 起止月份待核实**（2026-08-28 记）：Yonyou 站点写 `Jan 2016`、
      LinkedIn 写 `Feb 2016`；Sendinfo 站点写 `Mar 2017`、LinkedIn 写 `May 2017`。
      James 记不清，会找离职证明 / 社保记录核实。**在核实前站点保持现值不动**——
      ADR-0012 约束 3 要求这一层与 CV / LinkedIn 完全一致，改错比不改更糟。
      同批待确认的还有职位名：Tanhua（Java Developer / Senior Java Developer）、
      Sendinfo（Junior Developer / Java Software Engineer，差一档职级）、
      Yonyou 公司全名（Zhejiang Yonyou Software / yonyou Network Technology）。
- [ ] **任职时间 LinkedIn 与离职证明不符**（以离职证明 / CV 为准，LinkedIn 要改）：
  | 公司 | 离职证明 / CV（正确） | LinkedIn（待改） |
  | --- | --- | --- |
  | Weimob | May 2021 – Nov 2023 | Mar 2021 – Nov 2023 |
  | Souche | Mar 2019 – May 2021 | Mar 2019 – Mar 2021 |
- [x] **CV 的 Education 毕业时间**（2026-08-28 已改）：CV 与站点现在都写
      `Jan 2026 — Dec 2027`，两个 diploma 合并成一行、不拆分各自毕业时间
      （[ADR-0015](docs/adr/0015-education-section.md) 约束 2）。
      **LinkedIn 的学历段还没改，仍需同步。**
- [ ] **图标 AI 项目的技术栈说法不一致**：LinkedIn 的 career break 描述里是
      CLIP / BLIP / VGG16；站点 Projects 卡片里写的是 Gemini API 编排。可能是两个 repo 的
      不同阶段，但对外读起来像是同一个项目的两套说法。需要确认后统一口径。

## 3. 简历工作台（ADR-0014 → FR-11）

- [ ] FR-11.1 `docs/resume/README.md`
- [ ] FR-11.2 `format-selection.md` — 版式选型判据 + 本人当前该选哪种
- [ ] FR-11.2 `csi-rewrite.md` — CSI 改写规范（与站点文案共用关键词）
- [ ] FR-11.2 `review-checklist.md` — 投递前自查，含三处事实交叉核对
- [ ] FR-11.2 `ats-tradeoffs.md`
- [ ] FR-11.2 `master-vs-targeted.md`（按 ADR-0014 §1.1：站点是名片不随 JD 变，
      针对性只发生在简历侧）

顺序理由见设计文档 0002 §3.3：前两篇产出后即可开始实际改写。

## 4. 站点文案（设计文档 0001 的 P2，最大的一块）

上线记录 2026-08-21 里所有标"属文案，留 P2"的需求都在这里。
按 ADR-0010，这块工作量主要落在本人身上，不是助手能代劳的。
结构改造那期（2026-08-21）只动了架构与排版，措辞一律没动。

- [ ] FR-5.1 Experience 成就条目改写为 CSI 三段：`lib/content/experience.ts` 里每条 Role
      现在走 `points`（旧文案逐字搬运），目标形态是 `achievements`，三段齐全才通过构建期校验。
      逐条迁完后 `points` 字段应消失、`achievements` 改回必填
- [ ] FR-4.1 折叠态 headline 定稿（现在是事实的机械拼接，不是 Challenge→Impact 缩写）
- [ ] FR-3.2 项目卡 `question` 定稿（单行不折行，移动端约 40 字符截断，定稿时按这个长度写）
- [ ] FR-1.1 Hero pitch 改为"我帮谁解决什么问题"
- [ ] FR-1.3 终端脚本改为定位展开（三根支柱）——
      **未做的后果已经发生**：技术栈信息目前只剩标签
- [ ] FR-2.4 板块标题改问句
- [ ] Contact 板块文案与 [ADR-0008](docs/adr/0008-job-intent-timing.md) 冲突：现文案是
      "Open to backend, data engineering, and AI platform roles in Manitoba."
      ——具体岗位 + 地域，正是 ADR-0008 说 2027 之前不该写的东西

## 5. 资产与工程债

- [ ] 项目卡三张占位外链图（写在 `lib/content/projects.ts`）换成真图并挪进 `/public`；
      同步删掉 `next.config.mjs` 里为此加的 `remotePatterns`
- [ ] Experience 卡片配图：`components/experience.tsx` 的 `Role` 类型已支持
      `images: [{ src, alt }]`，文件放 `public/` 下填路径即可，MES 那条留了注释掉的示例
- [ ] FR-14.1 全量核对 `components/ui/*`，无引用者删除（ADR-0009 约束 2）
- [ ] FR-14.2 / FR-7.3 链接检查脚本，与隐私扫描合并为 `npm run check`

## 6. 暂缓（有明确触发条件，不排期）

| 事项 | 触发条件 | 依据 |
| --- | --- | --- |
| Writing 板块上线 | 首篇 paper 就绪（预计 2026-12） | [ADR-0006](docs/adr/0006-writing-section.md) |
| About 子页（FR-8） | 无硬依赖，排在文案之后 | [ADR-0011](docs/adr/0011-about-page-scope.md) |
| Work authorization 表述 | 2027-12 毕业前 finalize | [ADR-0008](docs/adr/0008-job-intent-timing.md) |
| Icon Pipeline 的 primary destination | 设计文档 0001 §5 未决问题 1（暂定 App repo） | — |
| ADR 索引分组 | ADR 超过约 25 篇且简历类占比过半 | [ADR-0014](docs/adr/0014-resume-scope-in-docs.md) 后果 |

## 维护

每轮上线后更新本文：勾掉做完的、把上线记录里新发现的口子补进来。
本文只增删条目，不记录过程——过程写在 `docs/launch/`。
