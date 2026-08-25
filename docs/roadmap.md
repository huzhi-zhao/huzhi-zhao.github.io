# Roadmap — 待办总表

- 更新日期：2026-08-23
- 定位：**汇总当前所有未完成的事**，一页看完。每条只写"是什么、依据哪条、卡在哪"，
  展开细节回到对应的 ADR / 设计文档 / 上线记录。

与其它文档的分工：

| 文档 | 回答 |
| --- | --- |
| `docs/adr/` | 为什么这样定 |
| `docs/design/` | 打算怎么做（需求与方案） |
| `docs/launch/` | 实际做成了什么 |
| **本文** | **还剩什么没做，按什么顺序做** |

根目录 `TODO.md` 是**站点实现层面**的临时口子清单，颗粒更细；
本文只收"需要排期的事"。两者重叠的条目以本文为准。

## 0. 阻塞项：两篇 ADR 待评审

设计文档 0002 的全部需求都压在这上面。

- [ ] 评审 [ADR-0013 公开仓库的隐私边界](adr/0013-public-repo-privacy-boundary.md)，
      提议中 → 已接受 / 修改
- [ ] 评审 [ADR-0014 docs 承担简历工作的范围](adr/0014-resume-scope-in-docs.md)，
      提议中 → 已接受 / 修改
- [x] 裁决简历下载入口 —— **彻底删除**，FR-10 已实施
- [ ] 裁决 [设计文档 0002 §5](design/0002-privacy-and-resume-workbench.md) 剩下两个未决问题
      （简历产物目录约定、FR-12.2 入口指引写在哪）

## 1. 隐私边界（ADR-0013 → FR-9 / FR-10）

按"先堵漏、再建设"的顺序，这一组优先于简历方法论。

- [ ] **FR-9.5 迁移 `TODO.md` 的事实不一致项**到 ToucanShelf `Career/Vault/`，仓库只留指针。
      这是当前仓库里唯一实际存在的暴露面，优先做。
- [ ] FR-9.1 `.gitignore` 补简历产物排除规则
- [x] FR-10.1 删除 `CV_HREF` 及三处按钮分支（连带删除无引用的 `DownloadIcon`）
- [ ] FR-9.2 ~ FR-9.4 敏感信息扫描脚本
- [ ] FR-12.3 复核 ToucanShelf 凭证类文档的分享状态（不在本仓库，但同属"绝不可外流"层）

## 2. 简历工作台（ADR-0014 → FR-11）

- [ ] FR-11.1 `docs/resume/README.md`
- [ ] FR-11.2 `format-selection.md` — 版式选型判据 + 本人当前该选哪种
- [ ] FR-11.2 `csi-rewrite.md` — CSI 改写规范（与站点文案共用关键词）
- [ ] FR-11.2 `review-checklist.md` — 投递前自查，含三处事实交叉核对
- [ ] FR-11.2 `ats-tradeoffs.md`
- [ ] FR-11.2 `master-vs-targeted.md`

顺序理由见设计文档 0002 §3.3：前两篇产出后即可开始实际改写。

## 3. 站点文案（设计文档 0001 的 P2，最大的一块）

上线记录 2026-08-21 里所有标"属文案，留 P2"的需求都在这里。
按 ADR-0010，这块工作量主要落在本人身上，不是助手能代劳的。

- [ ] FR-5.1 Experience 成就条目改写为 CSI 三段；迁完后 `lib/content/experience.ts`
      的 `points` 字段应消失、`achievements` 改回必填
- [ ] FR-4.1 折叠态 headline 定稿（现在是事实的机械拼接，不是 Challenge→Impact 缩写）
- [ ] FR-3.2 项目卡 `question` 定稿（单行不折行，移动端约 40 字符截断）
- [ ] FR-1.1 Hero pitch 改为"我帮谁解决什么问题"
- [ ] FR-1.3 终端脚本改为定位展开（三根支柱）——
      **未做的后果已经发生**：技术栈信息目前只剩标签
- [ ] FR-2.4 板块标题改问句
- [ ] Contact 板块文案与 [ADR-0008](adr/0008-job-intent-timing.md) 冲突：
      现文案写了具体岗位 + 地域，2027 之前不该写

## 4. 资产与工程债

- [ ] 项目卡三张占位外链图换成真图并挪进 `/public`；
      同步删掉 `next.config.mjs` 里为此加的 `remotePatterns`
- [ ] Experience 卡片配图（`Role.images` 已支持，MES 那条留了注释示例）
- [ ] FR-14.1 全量核对 `components/ui/*`，无引用者删除（ADR-0009 约束 2）
- [ ] FR-14.2 / FR-7.3 链接检查脚本，与隐私扫描合并为 `npm run check`

## 5. 暂缓（有明确触发条件，不排期）

| 事项 | 触发条件 | 依据 |
| --- | --- | --- |
| Writing 板块上线 | 首篇 paper 就绪（预计 2026-12） | [ADR-0006](adr/0006-writing-section.md) |
| About 子页（FR-8） | 无硬依赖，排在文案之后 | [ADR-0011](adr/0011-about-page-scope.md) |
| Work authorization 表述 | 2027-12 毕业前 finalize | [ADR-0008](adr/0008-job-intent-timing.md) |
| Icon Pipeline 的 primary destination | 设计文档 0001 §5 未决问题 1 | — |
| ADR 索引分组 | ADR 超过约 25 篇且简历类占比过半 | [ADR-0014](adr/0014-resume-scope-in-docs.md) 后果 |

## 维护

每轮上线后更新本文：勾掉做完的、把上线记录里新发现的口子补进来。
本文只增删条目，不记录过程——过程写在 `docs/launch/`。
