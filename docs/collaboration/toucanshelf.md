# ToucanShelf 协作约定

- 状态：初稿
- 日期：2026-08-23
- 依赖：[ADR-0005](../adr/0005-content-tiers-and-hosting.md)、[ADR-0013](../adr/0013-public-repo-privacy-boundary.md)、[ADR-0014](../adr/0014-resume-scope-in-docs.md)

这份文档回答一个问题：**一段内容该写进 `docs/`，还是写进 ToucanShelf？**
以及在两边都能写的会话里，如何避免重复和漂移。

## 什么是 ToucanShelf

ToucanShelf 是本人的开源知识库项目（见 SideProjects/toucan-shelf），
同时是 huzhi.dev 的 L2/L3 内容承载方（ADR-0005）——站点不自建内容系统，只持有指向它的 URL。

结构是 **workspace → 文件夹树 → 文档**。文档在 API 里叫 `memo`，是完整文档不是便签。
文件夹是路径前缀，写入一个不存在的路径即自动出现，没有建文件夹这一步。

### MCP 接入

助手通过 ToucanShelf MCP server 直接读写，可用工具：

| 工具 | 用途 |
| --- | --- |
| `workspace_list_workspaces` | 列出所有 workspace，拿 `workspaces/{uid}` |
| `workspace_get_workspace_tree` | 取某个 workspace 的完整目录树 |
| `rag_search` | 只知道主题、不知道位置时的语义检索 |
| `memo_get_memo` / `memo_list_memos` | 读文档 |
| `memo_create_memo` | 新建（传 workspace / folder_path / title / content） |
| `memo_update_memo` | 更新 |

注意事项：

- workspace 必须用 uid 寻址，显示名（"Career"）只是标题，先 list 再用。
- `title` 不带扩展名——传 `plan`，不是 `plan.md`。
- `memo_update_memo` 是**整篇替换**，不是增量补丁。永远先 get、在完整文本上改、再写回。
- **没有并发检查**：读和写之间若有人在 Web UI 编辑，会被静默覆盖。长文档改动前先确认没人在编。
- 没有删除工具，`state` 归档是最接近的操作，且可逆。

## 目录地图（2026-08 实况）

只列与本项目相关的两个 workspace，其余（Life / English / MPNP / IT / Trends 等）与本项目无关。

### Career — 简历与求职侧

```
Career/
  Vault/               简历素材与事实的唯一真源
    Resume               ← 简历主文档（master resume）
    个人主页/            ← 站点相关需求
  PaceResumeCourse/    DPS 51019 课程原文与笔记（ADR 的输入来源）
  Kit/                 求职工具（口语准备、技巧、Schedule）
  Companies/           目标公司调研
  Campaigns/           具体投递/渗透行动
  Network/             本地人脉
  Research/            市场调研
```

### SideProjects — 项目侧（站点 L2/L3 内容源）

```
SideProjects/
  UOIP/                主力数据项目
    report/              8 篇结构化报告 ← 站点 L2/L3 的主要外链目标
    playbook/            方法论 ← L3 候选（换个项目照样成立）
    keyfindins/ journal/ weekly/ milestone/ events/ config/
  toucan-shelf/        知识库自身的迭代记录
  ghostfolio-ai/  winmanitoba/  tianbao/
```

## 路由规则：写哪边

判据按顺序问，第一个命中即定。

1. **是敏感素材吗？**（真实 bullet、时间线细节、离职原因、联系方式、身份状态、凭证）
   → ToucanShelf，且确认非 public 分享。**绝不进仓库**（ADR-0013）。
2. **是约束后续工作的方向性决策吗？**（一旦定下，后面的页面/文案/简历都要跟着走）
   → `docs/adr/`。
3. **是站点的实现细节或上线记录吗？**
   → `docs/design/` 或 `docs/launch/`。
4. **是简历的方法论与规范吗？**（版式选型、改写规范、评审清单）
   → `docs/resume/`。
5. **是项目自身文档或跨项目方法论吗？**（L2 / L3）
   → ToucanShelf，站点只外链（ADR-0005 约束 1）。
6. **是课程原文、调研原始材料、过程笔记吗？**
   → ToucanShelf。`docs/` 只放由它推导出的结论。

一句话版本：**`docs/` 放"结论与约束"，ToucanShelf 放"素材与过程"。**

## 双向写作的规矩

两边都能写，最大的风险是同一件事被写两遍然后各自漂移。

1. **单一真源。** 每条事实只有一个权威位置：简历事实在 `Career/Vault/Resume`，
   项目细节在 `SideProjects/{project}/`，决策在 `docs/adr/`。另一边只引用，不复制。
2. **引用只写位置，不搬内容。** 仓库里写 `见 Career/Vault/Resume`，
   不把 bullet 原文粘进来——这既是防重复，也是 ADR-0013 第 4 条的隐私要求。
3. **决策回写。** 在知识库里讨论出的方向性结论，要回到 `docs/adr/` 落一篇（或改一篇），
   否则半年后会被无意识地改回去（见 ADR README 的写作标准）。
4. **外链前确认可匿名访问。** 站点引用的 L2/L3 文档必须是 public 分享状态（ADR-0005 约束 2）；
   反过来，`Career/` 下的一切默认不可外链。
5. **改前先读。** 因为 `memo_update_memo` 整篇替换且无并发检查，任何更新都必须先 get 全文。

## 会话开场清单

助手在需要跨两边工作时（尤其是简历相关任务）：

1. `workspace_list_workspaces` 拿到 Career / SideProjects 的 uid（uid 会变，不要硬编码）；
2. 需要定位文档时用 `workspace_get_workspace_tree`，只知道主题时用 `rag_search`；
3. 读 `docs/adr/` 里相关的约束条款再动手；
4. 产出内容前，用上面的路由规则先决定写哪边。

## 维护

目录地图是快照，会过期。发现与实际不符时更新本节，不要在别处另记一份。
