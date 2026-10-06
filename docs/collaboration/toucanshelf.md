# ToucanShelf 协作约定

- 状态：已生效
- 日期：2026-08-23（初稿）／ 2026-08-29（Career 结构调整后重写）／ 2026-09-09（改为 memogit 优先）／ 2026-10-05（只走 memogit，检出挂进仓库 `kb/`，弃用 MCP）／ 2026-10-06（求职工作线入表，路由加第三问）
- 依赖：[ADR-0005](../adr/0005-content-tiers-and-hosting.md)、[ADR-0013](../adr/0013-public-repo-privacy-boundary.md)、[ADR-0014](../adr/0014-resume-scope-in-docs.md)、[ADR-0019](../adr/0019-repo-as-job-search-hub.md)

这份文档回答一个问题：**一段内容该写进 `docs/`，还是写进 ToucanShelf？**
以及在两边都能写的会话里，如何避免重复和漂移。

## 什么是 ToucanShelf

ToucanShelf 是本人的开源知识库项目（见 SideProjects/toucan-shelf），
同时是 huzhi.dev 的 L2/L3 内容承载方（ADR-0005）——站点不自建内容系统，只持有指向它的 URL。

结构是 **workspace → 文件夹树 → 文档**。文档在 API 里叫 `memo`，是完整文档不是便签。
文件夹是路径前缀，写入一个不存在的路径即自动出现，没有建文件夹这一步。

### 只走 memogit，检出挂在仓库里

2026-10-05 起，本仓库**自带**获取知识库的办法，不再依赖机器上另外维护的
`~/Workspace/MemoBase/`，也不再用 MCP。做法参照 toucan-base 仓库：

| 部件 | 作用 |
| --- | --- |
| `kb/`（gitignored） | memogit 检出根，`kb/.memogit/` 一份凭据 + 同步状态，每个库落在 `kb/<库标题>/` |
| `scripts/toucan.json` | 拉哪些库：Career、SideProjects（个人身份类的库按边界表两边都不放，不拉） |
| `scripts/toucan.py` | `sync`（缺的 clone、有的 pull）/ `push` / `status` |
| `.claude/settings.json` | SessionStart 跑 `sync`，Stop 跑 `push` |

**凭据**只来自环境变量，本机和云端沙箱同名：

- `TOUCANSHELF_PAT` — memos PAT；
- `TOUCANSHELF_SERVER` — 服务地址，缺省时用 `toucan.json` 里的 `https://toucan.huzhi.dev`。

首次 clone 后 memogit 会把两者存进 `kb/.memogit/config.yaml`，之后即使 hook 进程
拿不到环境变量（桌面 App 启动的会话不读 `.zshrc`）也能 pull / push。
所以**本机第一次**要在已导出变量的终端里跑一次 `python3 scripts/toucan.py sync`。

**memogit 二进制**：本机用 PATH 上的；云端沙箱没有，`toucan.py` 从公开的
toucan-shelf 源码现场 `go build`（需要沙箱能访问 github.com 和 Go 模块代理，
另外网络白名单要放行 `toucan.huzhi.dev`）。不往本仓库提交二进制——仓库是 public 的站点仓库。

**就绪是硬前提。** sync 失败时 hook 往上下文注入"⛔ 知识库未就绪"，
此时助手必须停下告诉用户，不读写、不引用对面内容，不凭记忆补，也不退回 MCP。

为什么只走 memogit：检出可以 grep、diff、冲突留 `.remote` 副本，
而 MCP 的 `memo_update_memo` 是整篇替换、无并发检查、不可回滚，错一次就是静默覆盖。
挂进仓库是为了让云端会话和本机会话走同一条路，不再出现"本机有检出、云端只能 MCP"的分叉。

关键规矩（完整版见 `kb/CLAUDE.md` 和 `kb/.memogit/skill/SKILL.md`，动手前必读）：

- 文件末尾的 `<!-- memogit-id: memos/xxx -->` **绝不能碰**；新文件不要手写 ID。
- `AGENTS.md` / `CLAUDE.md` 末尾的 `<!-- END memogit -->` 同样不能删——
  那是 memogit 的本地脚手架，push 时系统会自行拆除。
- 移动/改名用 `mv`，**不要复制+删除**——后者会丢历史、评论和 ID。
- 删除等于归档（可恢复），但**归档后的 `(路径, 标题)` 仍被占用**，同名新建会失败。
- 标题里不能有标点（slug 锚点）。
- 少用 ToucanShelf 方言（callout、`==` 高亮、```kanban / ```calendar / ```grid、
  `.view.json`）——除非确有需要，写标准 Markdown。

### 不再使用 MCP

ToucanShelf 的 MCP 工具（`memo_*`、`rag_search`、`workspace_*`）在本仓库的会话里**不用**，
包括"检出里找不到"的情况——那说明 `kb/` 没同步好或库清单缺了，先 `sync` 或改
`scripts/toucan.json`，而不是绕过去。跨库语义检索改为在 `kb/` 里 grep。

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
`decisions/`（职业规划决策）· `Vault/`（个人基线 + 投递用简历稿 + 求职方法笔记）·
`Experience/`（工作经历素材）· `Campaigns/`（战略层面、有时间线的大事）·
`Interview/`（面试与演讲的零件和每次准备）· `Contacts/`（人与活动）· `Employers/`（目标与在职雇主）·
`Research/`（专题调研，长期更新）· `PaceResumeCourse/`（课程笔记与作业）。

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
| 课程原文、过程笔记 | `Career/PaceResumeCourse/` 等 | 仓库只放推导出的结论 |
| 专题调研（市场核查、定位论证） | `Career/Research/` | 同上 |
| 项目自身文档、跨项目方法论（L2/L3） | `SideProjects/{project}/` | ADR-0005 约束 1 |
| 模拟面试的题库、答案、复盘与反馈 | `Career/Interview/` | ADR-0019 §3 |
| 活动巡检、投递、与雇主的往来 | `Career/Campaigns/`、`Career/Contacts/` | ADR-0019 §3 |
| 专业认证的选型与进度 | `Career/Campaigns/` | ADR-0019 §3；拿到后的写法看 ADR-0017 |
| 简历条目的证据缺口、"被追问怎么答" | `Career/Experience/` 各公司篇 | ADR-0019 §3 |
| 求职项目的动机与取舍（为什么做、对准什么岗位） | `Career/` | 项目文档本身仍进 `SideProjects/` |
| 身份、家庭等个人事务 | 单独的库，两边都不放 | 与本仓库的工作无关 |

**master resume 就是 huzhi.dev 站点本身**，两边都不再维护一份"主简历"。
`Career/Vault/` 里只有投递用的裁剪稿。

## 路由规则：写哪边

判据按顺序问，第一个命中即定。

1. **是敏感素材吗？**（真实 bullet、时间线细节、离职原因、联系方式、身份状态、凭证）
   → ToucanShelf，且确认非 public 分享。**绝不进仓库**（ADR-0013）。
2. **被面试官读到会削弱我吗？**（投递与面试、复盘、弱点与差距、证据缺口、认证进度、
   岗位排序与备选、时间线约束）→ ToucanShelf `Career/`。**绝不进仓库，指针也要泛指**（ADR-0019）。
3. **是约束后续工作的方向性决策吗？**（一旦定下，后面的页面/文案/简历都要跟着走）
   → `docs/adr/`。
4. **是站点的实现细节或上线记录吗？**
   → `docs/design/` 或 `docs/launch/`。
5. **是简历的方法论与规范吗？**（版式选型、改写规范、评审清单）
   → `docs/resume/`。
6. **是项目自身文档或跨项目方法论吗？**（L2 / L3）
   → ToucanShelf，站点只外链（ADR-0005 约束 1）。
7. **是课程原文、调研原始材料、过程笔记吗？**
   → ToucanShelf。`docs/` 只放由它推导出的结论。

一句话版本：**`docs/` 放"结论与约束"，ToucanShelf 放"素材与过程"。**
读者视角版本：**这个仓库面试官点一下就能读到，写进来之前先替他读一遍。**

## 双向写作的规矩

两边都能写，最大的风险是同一件事被写两遍然后各自漂移。

1. **单一真源。** 每条事实只有一个权威位置：可公开的简历事实在 `lib/content/`，
   项目细节在 `SideProjects/{project}/`，简历决策在 `docs/adr/`，
   职业规划决策在 `Career/decisions/`。另一边只引用，不复制。
2. **引用只写位置，不搬内容。** 仓库里写 `见 Career/Vault/Baseline`，
   不把 bullet 原文粘进来——这既是防重复，也是 ADR-0013 第 4 条的隐私要求。
   位置本身也不能泄漏内容：标题带雇主名、岗位名、战役名的，写成泛指（ADR-0019 约束 2）。
3. **决策回写。** 在知识库里讨论出的方向性结论，要回到 `docs/adr/` 落一篇（或改一篇），
   否则半年后会被无意识地改回去（见 ADR README 的写作标准）。
4. **外链前确认可匿名访问。** 站点引用的 L2/L3 文档必须是 public 分享状态（ADR-0005 约束 2）；
   反过来，`Career/` 下的一切默认不可外链。
5. **改前先 pull。** 动手前确认本轮 sync 成功（或手动 `toucan.py sync`），在最新文本上改。
6. **大改先商量。** 新建文档，或对已有文档做重构级别的大幅改写（换结构、换定位、大段增删），
   都要先跟我对齐**写作范围和大体内容**——写哪个 workspace/路径、标题、分几节、每节大概讲什么——
   得到确认后再动笔。原因有两个：Stop hook 每轮自动 push，写错了会直接上服务器；
   而且知识库是长期资产，位置和结构定错了，后面引用它的地方全跟着错。
   错字、补一条事实、更新链接这类局部修补不受此限，直接改即可。

## 会话开场清单

助手在需要跨两边工作时（尤其是简历相关任务）：

1. 看 SessionStart hook 注入的知识库清单，确认 `kb/Career/`、`kb/SideProjects/` 都是 ok；
   未就绪就停下告诉用户（见上文"就绪是硬前提"）；
2. 定位文档在 `kb/` 里 grep / 读文件；要了解 Career 的结构，读 `kb/Career/README`，
   不要依赖本文档的描述；
3. 读 `docs/adr/` 里相关的约束条款再动手；
4. 产出内容前，用上面的路由规则先决定写哪边。

## 维护

本文档只维护**分工**，不维护对面的目录清单——那是 `Career/README` 的事。
分工变了改这里；对面的结构变了，不需要改这里。
