# docs/resume — 简历方法论

- 状态：起步（2026-08-29 建目录）
- 依据：[ADR-0014](../adr/0014-resume-scope-in-docs.md)、[ADR-0013](../adr/0013-public-repo-privacy-boundary.md)、[ADR-0007](../adr/0007-copy-conventions.md)
- 对应需求：[设计文档 0002](../design/0002-privacy-and-resume-workbench.md) FR-11

## 这个目录放什么

**只放方法论：怎么选版式、怎么改写、投递前查什么。**
不放简历本身，不放真实的 bullet，不放任何一条个人事实。

使用场景是**投递前临时翻看**，所以每篇都以"结论 + 判据"开头，
不做背景铺陈（FR-11.3）。

## 素材和事实在哪（只写位置，不搬内容）

| 要找什么 | 去哪 |
| --- | --- |
| 可公开的简历事实（公司、职位、时间线、技术栈） | 本仓库 `lib/content/` — **唯一副本** |
| master resume | **就是 www.huzhi.dev 站点本身**（ADR-0014 约束 6），没有第二份 |
| 工作经历的原始素材（项目细节、职责、取舍） | ToucanShelf `Career/Experience/` |
| 个人背景基线 | ToucanShelf `Career/Vault/Baseline` |
| 针对具体投递的裁剪稿 | ToucanShelf `Career/Vault/` |
| 课程原文与讲义 | ToucanShelf `Career/Inputs/PaceResumeCourse/` |

跨系统的分工细则见 [`docs/collaboration/toucanshelf.md`](../collaboration/toucanshelf.md)。

## 和 docs/adr/ 的分工

`docs/adr/` 放**约束后续工作的决策**（CSI 是不是必须的、站点跟不跟 JD 走）；
这里放**执行这些决策的方法**（CSI 具体怎么写、写坏了长什么样）。

判断标准：一句话如果被推翻会导致既有内容返工，它是 ADR；
如果只是"这样做更好"，它属于这里。

## 索引

| 文档 | 回答什么 | 状态 |
| --- | --- | --- |
| [`format-selection.md`](format-selection.md) | 四种版式怎么选，我当前该用哪种 | ✅ 初稿 |
| [`csi-rewrite.md`](csi-rewrite.md) | 一条 bullet 怎么改成 CSI，怎么算改坏了 | ✅ 初稿 |
| [`ats-tradeoffs.md`](ats-tradeoffs.md) | 单栏还是双栏、几页、什么排在前面 | ◐ 只写已定的两条 |
| [`references-page.md`](references-page.md) | 推荐人页怎么写，为什么它永远不进本仓库 | ✅ 初稿 |
| [`cover-letter.md`](cover-letter.md) | 三种求职信、四段结构、写法硬规矩 | ✅ 初稿 |
| `review-checklist.md` | 投递前自查，含三处事实交叉核对 | ⬜ 未写 |
| `master-vs-targeted.md` | 从站点裁剪出针对稿，允许改什么 | ⬜ 未写 |

`ats-tradeoffs.md` 只写了课件给出结论的两条（单栏 / 页数），其余留白；
最后两篇按设计文档 0002 §3.3 的理由押后：**要在实际改写、实际投递过几轮之后
才知道该写什么。** 现在写只会是凭空想象的清单。

## 三条硬规矩

1. **举例一律用虚构或脱敏示例**（FR-11.5）。本人真实 bullet 不出现在这个目录里——
   要看真实的，去 `lib/content/`。
   **推荐人的真实姓名与联系方式一条都不进本仓库**，见
   [`references-page.md`](references-page.md)（ADR-0013 约束 1）。
2. **不复制事实**（ADR-0014 约束 2）。需要引用时写位置，不粘内容。
3. **不搬课程原文**（ADR-0014 约束 4）。这里只放由课程与调研**推导出的结论**，
   讲义留在 ToucanShelf。
