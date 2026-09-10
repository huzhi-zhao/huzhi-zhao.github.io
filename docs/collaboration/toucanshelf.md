# ToucanShelf 协作约定

- 状态：已生效
- 日期：2026-08-23（初稿）／ 2026-08-29（Career 结构调整后重写）
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

### memogit：大改走本地检出

MCP 适合读和小修。**结构性改动（大批移动、多篇同时改写）走 memogit**——
ToucanShelf 数据库的本地投影在 `~/Workspace/MemoBase/`，用普通文件操作改完再 `push`：

```
memogit status → 改文件 → memogit push --dry-run → memogit push
```

关键规矩（完整版见 `MemoBase/.memogit/toucanshelf-guide.md`，动手前必读）：

- 文件末尾的 `<!-- memogit-id: memos/xxx -->` **绝不能碰**；新文件不要手写 ID。
- `AGENTS.md` / `CLAUDE.md` 末尾的 `<!-- END memogit -->` 同样不能删——
  那是 memogit 的本地脚手架，push 时系统会自行拆除。
- 移动/改名用 `mv`，**不要复制+删除**——后者会丢历史、评论和 ID。
- 删除等于归档（可恢复），但**归档后的 `(路径, 标题)` 仍被占用**，同名新建会失败。
- 标题里不能有标点（slug 锚点）。
- 少用 ToucanShelf 方言（callout、`==` 高亮、```kanban / ```calendar / ```grid、
  `.view.json`）——除非确有需要，写标准 Markdown。

### 文档引用语法

```
库内，库根相对：  [接口说明](/fa/da.md)
库内，文档相对：  [接口说明](./da.md)   [接口说明](../fb/dc.md)
跨库，库限定：    [规格](@产品手册/fb/dc.md)
跨库，图片/附件：  ![架构图](@产品手册/fb/diagram.png)
```

裸文本指针（`见 Vault/Xxx`）不算引用，改结构时 grep 不干净也点不动，一律写成链接。

## 目录地图

**不在这里维护第二份目录地图。** 之前这一节列了文档名，结果和知识库实际、
和 `Career/README` 三方打架，坏指针一堆。现在的规矩：

- **Career 的结构由 `Career/README` 说了算**，读它，不要读这里的快照。
- 本仓库只记录**两边的分工**（下一节），不记录对面有哪些文档。

Career 的一级轴（只为理解分工，细节以对面为准）：
`decisions/`（职业规划决策）· `Vault/`（个人基线 + 投递用简历稿）·
`Experience/`（工作经历素材）· `Campaigns/`（有时间线的行动）·
`Contacts/`（人与公司）· `Inputs/`（课程、调研、方法）。

`SideProjects/` 是站点 L2/L3 外链的内容源（ADR-0005），其中 `UOIP/report/`
是主要外链目标。

## 边界表：一段内容写哪边

| 内容 | 位置 | 依据 |
| --- | --- | --- |
| 站点/简历的方向性决策（怎么写、写不写） | 仓库 `docs/adr/` | ADR-0014 约束 1 |
| 站点实现细节、上线记录 | 仓库 `docs/design/`、`docs/launch/` | — |
| 简历方法论（版式、ATS、评审清单） | 仓库 `docs/resume/` | ADR-0014 约束 2 |
| 可公开的简历事实（公司、职位、时间线、技术栈） | 仓库 `lib/content/`（**唯一副本**） | ADR-0013 |
| **职业规划**决策（方向怎么选、路线怎么排） | ToucanShelf `Career/decisions/` | 与 `docs/adr/` 分工：前者管职业，后者管简历怎么写 |
| 个人基线（身份无关的背景、优劣势） | `Career/Vault/Baseline` | — |
| 敏感字段（住址、电话、第三方联系方式） | `Career/`，**永不进仓库** | ADR-0013 约束 1 |
| 工作经历的原始素材（项目细节、职责、取舍） | `Career/Experience/` | 仓库只放压缩后的结论 |
| 针对具体投递裁剪的简历文本稿 | `Career/Vault/` | ADR-0013「简历的生成链路」第 2 步 |
| 课程原文、调研原始材料、过程笔记 | `Career/Inputs/` | 仓库只放推导出的结论 |
| 项目自身文档、跨项目方法论（L2/L3） | `SideProjects/{project}/` | ADR-0005 约束 1 |
| 身份、移民、语言、家庭 | **MPNP 库**，两边都不放 | 与求职无关 |

**master resume 就是 huzhi.dev 站点本身**，两边都不再维护一份"主简历"。
`Career/Vault/` 里只有投递用的裁剪稿。

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

1. **单一真源。** 每条事实只有一个权威位置：可公开的简历事实在 `lib/content/`，
   项目细节在 `SideProjects/{project}/`，简历决策在 `docs/adr/`，
   职业规划决策在 `Career/decisions/`。另一边只引用，不复制。
2. **引用只写位置，不搬内容。** 仓库里写 `见 Career/Vault/Baseline`，
   不把 bullet 原文粘进来——这既是防重复，也是 ADR-0013 第 4 条的隐私要求。
3. **决策回写。** 在知识库里讨论出的方向性结论，要回到 `docs/adr/` 落一篇（或改一篇），
   否则半年后会被无意识地改回去（见 ADR README 的写作标准）。
4. **外链前确认可匿名访问。** 站点引用的 L2/L3 文档必须是 public 分享状态（ADR-0005 约束 2）；
   反过来，`Career/` 下的一切默认不可外链。
5. **改前先读。** 因为 `memo_update_memo` 整篇替换且无并发检查，任何更新都必须先 get 全文。
6. **大改先商量。** 新建文档，或对已有文档做重构级别的大幅改写（换结构、换定位、大段增删），
   都要先跟我对齐**写作范围和大体内容**——写哪个 workspace/路径、标题、分几节、每节大概讲什么——
   得到确认后再动笔。原因有两个：`memo_update_memo` 整篇替换且不可回滚，写错了要人工救；
   而且知识库是长期资产，位置和结构定错了，后面引用它的地方全跟着错。
   错字、补一条事实、更新链接这类局部修补不受此限，直接改即可。

## 会话开场清单

助手在需要跨两边工作时（尤其是简历相关任务）：

1. `workspace_list_workspaces` 拿到 Career / SideProjects 的 uid（uid 会变，不要硬编码）；
2. 需要定位文档时用 `workspace_get_workspace_tree`，只知道主题时用 `rag_search`；
   要了解 Career 的结构，读它自己的 `README`，不要依赖本文档的描述；
3. 读 `docs/adr/` 里相关的约束条款再动手；
4. 产出内容前，用上面的路由规则先决定写哪边。

## 维护

本文档只维护**分工**，不维护对面的目录清单——那是 `Career/README` 的事。
分工变了改这里；对面的结构变了，不需要改这里。
