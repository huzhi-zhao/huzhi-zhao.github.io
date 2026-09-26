# TODO — 待办总表

- 更新日期：2026-09-21
- 定位：**汇总当前所有未完成的事**，一页看完。每条只写"是什么、依据哪条、卡在哪"，
  展开细节回到对应的 ADR / 设计文档 / 上线记录。

与其它文档的分工：

| 文档 | 回答 |
| --- | --- |
| `docs/adr/` | 为什么这样定 |
| `docs/design/` | 打算怎么做（需求与方案） |
| `docs/launch/` | 实际做成了什么 |
| **本文** | **还剩什么没做，按什么顺序做** |

## P0 · 截止 2026-09-18（下周五）

**作业要交一份简历优化版本。** 交付物是简历稿本身，不是方法论文档。
卡在同一个地方：**大搜车这段的素材颗粒度远低于微盟**，现在写不出合格的 CSI 条目。

微盟那段的形态是标杆——`项目全景`（正文 + 数据量/踩坑两份原文附录）+ `代码考古-两个仓库`，
优化的时间顺序、瓶颈、事故、提交占比都落到了纸面。大搜车目前只有 `项目全景`
+ `证据提取-2020年汇报PPT与压测报告`，缺的都是 Impact 段要用的东西。

必须补齐的（本人回忆，助手不得推测补全——ADR-0010）：

1. **车辆中台出过什么事故** —— PPT 那 6 个隐患里疑似有 3 个属于这条线，
   事故是 Challenge 段最硬的料。见第 3 节同名条目
2. **car-api 之外的上下游、团队规模与交接状态** —— 决定这段能不能写出规模感
3. **产品级 Impact 的口径** —— 「需求交付从半年至一两年变成配完即上线」是最强的一条，
   但「半年至一两年」纯靠回忆、无度量支撑，**写进简历前先想好被追问怎么答**
4. **若干技术确认** —— 凤凰平台的规则匹配与脚本技术、Seata 是否落地、
   被删掉的「本地词库 / 索引优化」是不是 ES（若是，可与微盟 ES 线接上）、
   用户升级「7 个人天」的口径、PPT 那组 3.75s/0.8s 的统计口径。详见第 3 节
5. **在职起始月份**（2019 年 3 月还是 5 月）—— 未核实前站点 / CV / LinkedIn 都不动

补完之后才是简历侧的活：按 CSI 改写 → 写进 ToucanShelf `Career/Vault/` →
本人排版导出 → 文案交回核对（链路见 `CLAUDE.md` 第三节）。

**素材实在补不齐时的备选**：UWinnipeg 的课程项目可以当成就素材，
判据见 [ADR-0017](docs/adr/0017-qualifications-scope.md)（**提议中，用之前先评审**）——
CSI 照常适用、Impact 按 ADR-0007 第 5 节降级为交付事实、且必须与职业经历分节标清楚。
这是备选不是首选：大搜车那段补齐了就不用它。

**改写时的两条新规**（均在 [ADR-0016](docs/adr/0016-course-conventions-scope.md)，提议中）：
简历侧用**本次 JD 的原词**而不是站点那套关键词；bullet **硬上限 1-2 行**，
压缩顺序见 [`csi-rewrite.md`](docs/resume/csi-rewrite.md) 的"超长怎么压"。

**不进这一轮**：站点文案（第 4 节）、扫描脚本（第 1 节）、`ats-tradeoffs.md` 等
方法论文档（第 3 节）。作业只要简历稿，别顺手扩摊子。

## 0. 阻塞项

### 待评审（2026-09-11 新增）

两篇 ADR 由 `Highlighting Your Qualifications` / `Highlighting Your Experience` /
`Developing a Professional Profile` 三节课与既有 ADR 的比对得出，均为**提议中**，
评审通过前不要据此改站点：

- [ ] 评审 [ADR-0016 课程规范的作用域](docs/adr/0016-course-conventions-scope.md)
      —— 解三处冲突：Relevant/Additional 的判据两侧不同（站点看 Impact，简历看相关性）、
      关键词两侧不同源且简历换词不触发全站同步、简历 bullet 硬上限 1-2 行及压缩顺序。
      另记一条从未写下的结论：**Profile 段在站点没有对应物，Hero 不改**。
- [ ] 评审 [ADR-0017 资历类信息的归属](docs/adr/0017-qualifications-scope.md)
      —— 裁三件事：课程项目可进简历不进站点 Experience、站点不加证书板块、
      **未做 WES/IQAS 认证前任何材料都不写等效结论且 AI 不得补全**。
      第一条直接影响上面 P0 的素材来源。

### 已解除

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

- [x] **年限**（2026-09-21 消解）：旧 CV 写 `10+ years of experience`，实际连续工作经历是
      2016-01 到 2025-02，约 **9 年**。**新版 CV 的 Summary 已是 `9 years`**，与站点一致。
      LinkedIn About 也已改为 `9 years`（2026-09-26）。
- [x] **CV 缺 MES 那段**（2026-09-21 消解）：新版 CV 已有
      `Full-Stack Developer (Contract) | Jul 2024 - Feb 2025`，而且写得比站点那条厚
      （24 道工序、约 70 名一线工人、日产 1000 支）。**反过来轮到站点偏薄了**，见下面新增那条。
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
- [x] **任职时间 LinkedIn 与离职证明不符**（2026-09-26 LinkedIn 已按下表改正）：
  | 公司 | 离职证明 / CV（正确） | LinkedIn（待改） |
  | --- | --- | --- |
  | Weimob | May 2021 – Nov 2023 | Mar 2021 – Nov 2023 |
  | Souche | Mar 2019 – May 2021 | Mar 2019 – Mar 2021 |
- [x] **CV 的 Education 毕业时间**（2026-08-28 已改）：CV 与站点现在都写
      `Jan 2026 — Dec 2027`，两个 diploma 合并成一行、不拆分各自毕业时间
      （[ADR-0015](docs/adr/0015-education-section.md) 约束 2）。
      LinkedIn 学历段 2026-09-26 已同步：`Jan 2026 – Dec 2027`，描述里列两个项目名。
- [x] **两个 diploma 的官方全名已核**（2026-09-11，对着 PACE 官网两个项目页）：
      官方项目名是 `Artificial Intelligence Post-Degree Diploma` 与
      `Business Analysis & Transformation Post-Degree Program`；
      完成后拿到的凭据分别是 `Artificial Intelligence Diploma` 与 `Business Analysis Diploma`。
      **对外用项目名**（凭据名丢掉 Transformation）。站点已改
      （[`experience.ts`](lib/content/experience.ts)）。
      官网链接存在 ToucanShelf `Career/Vault/Baseline`。
- [x] **CV 与 LinkedIn 的专业名称要跟着改**（ADR-0007 约束 4）：两处目前是
      `Post-Graduate Diploma in Applied AI` 一类写法，**两个错**——
      Post-Graduate 应为 Post-Degree（在加拿大是不同的东西），官方名里没有 Applied。
      **CV 侧已改**（2026-09-26，Gov MB / PSD 那版）；站点 hero 的 `post-graduate` 同日改为
      `post-degree`。LinkedIn 同日改完（Degree `Post-Degree Diploma` / Field `Artificial Intelligence`，About 同改）。
- [x] **CV 与 LinkedIn 的学院名要写全称**
      `Professional, Applied and Continuing Education, The University of Winnipeg`，
      目前是缩写形态。站点维持短名 `University of Winnipeg (PACE)` 不变
      （2026-09-11 决定，站点不是简历）。**CV 侧已改**（2026-09-26）；LinkedIn 学校字段是 The University of Winnipeg，全称写进描述首行，同日改完。
- [ ] **BAT 附带两张证书要不要写进简历**（2026-09-11 发现）：官网写明 Business Intelligence
      Certificate 与 Leading Change Management Certificate 随项目完成取得、不额外收费
      （Lean Yellow / Green Belt 要另交钱考试，不是白得）。
      按 [ADR-0017](docs/adr/0017-qualifications-scope.md) 它们属于 Credentials 一档，
      **但要到 2027-12 才真正到手，在此之前不写**。BI 那张与 Career 库 C01 的 Plan B 方向对得上。
- [x] **简历 Education 块的起止怎么写**（2026-09-12 已定）：**合并成一段 `Jan 2026 — Dec 2027`**，
      两个项目缩进挂在机构下面、各自不带日期，与站点 / CV 口径一致（ADR-0015 约束 2）。
      排法见 [`format-selection.md`](docs/resume/format-selection.md)"Education 区块怎么排"。
- [ ] **要不要做 WES / IQAS 学历认证**（2026-09-11 记）：课程建议国际背景申请人在简历里
      附加拿大等效结论。这是时间与费用的取舍，由本人定。
      **在拿到认证报告之前，站点 / CV / LinkedIn 一律不出现等效说法**，
      助手也不得依据公开对照表补全（[ADR-0017](docs/adr/0017-qualifications-scope.md) 约束 4）。
- [x] **钢管厂公司名不用改**（2026-09-21 查官网定）：官网英文名就是
      `Shanghai ZHONGYOU TIPO Steel Pipe Co., Ltd`，**站点是对的**；新 CV 里的
      `Tianbao Basheng` 是中译英机翻出来的（中文全称含「天宝巴圣」）。CV 那份是课程作业，本轮不动。
      **2026-09-26 补**：Gov MB / PSD 那版 CV 已改成官网名；站点原先写成
      `Zhongyou Tipo`，已改回官网大小写 `ZHONGYOU TIPO`，logo alt 同步。
- [ ] **新 CV 的两处缺漏属 CV 侧，本轮不处理**（2026-09-21）：career break 那一行又没了
      （PDF 上 2025-02 → 2026-01 约 11 个月空白）、`(Contract)` vs 站点 `(Freelance)`。
      新 CV 是课程作业稿、版面有限，取舍是本人做的；真正投递前再回到这一节核。
      **2026-09-26**：职位名那半条已消解——站点改为 `Full-Stack Developer (Contract)`，与 CV 一致。
      career break 那半条未动。
- [x] **站点对准 Gov MB / PSD 版 CV 校准数字与用语**（2026-09-26）：不改篇幅与核心叙事，只校准：
      - Weimob 规模起点统一为 **65M**（依据 ToucanShelf Weimob 项目全景「分配到门店后 6500 万」）。
        站点原本就是 65M，CV 由 60M 改 65M；
        `Career/Vault/Baseline` 那句同步为 6500 万。
      - hero 终端的对象名从 brands / SKUs 改为 **merchants / records**，与 CV 一致。
      - Weimob 迁移事故那句改用 **restored writes**（与 CV 同口径）。
      - MES 项目卡问题句 `20+` 改为 **24** production stages。
- [ ] **`500K+ peak QPS` 仍未核实**（2026-09-26 记）：站点 hero 终端保留，CV 里没有这个数。
      本轮投递方不关心，先不动；下次核 Weimob 素材时确认出处，查不到就从站点拿掉。
      LinkedIn Weimob 的 `Read Performance` 条也保留了它，同条还有 `up to 128 replicas`，
      CV / 站点都没有，出处一起核。
- [x] **LinkedIn 整体对准当前 CV**（2026-09-26 本人改完）：只校准数字与用语，不加内容。
      - About：`10+` → `9 years`，`post-graduate` → `post-degree`。
      - TIPO：职位 `Full-Stack Developer (Contract)`、雇佣类型 Contract；描述 `20+` → `24` stages，
        `serving` → `built for`（系统验收后弃用，不能说在用）。
      - Weimob：职位 `Senior Java Software Engineer`、`May 2021` 起；`60M+ SKUs` →
        `65M+ store-level product records`；首句按 CV 用 `Owned`；常规发布（30 → <10 分钟）与
        高峰积压（Double 11 / 618，1–2 小时 → <30 分钟）拆成两条，删掉把上游配额误当写入吞吐的
        `High-Concurrent Scaling`；`Cluster Stability` 改成先止血（大账号挪专用集群）再重排 routing；
        删掉 `100% traceability / zero-loss` 的绝对化说法。
      - Souche：职位 `Senior Java Software Engineer`、止于 `May 2021`；描述不动。
      - Education：UWinnipeg 如上；河南改 `Bachelor of Engineering`。
- [ ] **LinkedIn 这轮留下的尾巴**（2026-09-26 记）：
      - 高峰积压「降到 30 分钟以内」是按 LinkedIn 原文保留的，CV / 站点没有对应数字，本人确认过再说。
      - Tanhua / Souche 的雇佣类型写的是 `Contract Full-time`，北美读起来是合同工；
        当时若是正式员工应改 Full-time。
      - Souche 描述全是职责、没有成果。站点 DaSouChe 卡已有定稿事实（40,000+ 汽车商户、
        Vehicle Product Center、规则引擎），以后可以照搬，不用重新回忆。
      - Tanhua / Sendinfo / Yonyou 的职位、公司名、起止月份仍按上面那条等离职证明核实。
- [ ] **图标 AI 项目的技术栈说法不一致**：LinkedIn 的 career break 描述里是
      CLIP / BLIP / VGG16；站点 Projects 卡片里写的是 Gemini API 编排。可能是两个 repo 的
      不同阶段，但对外读起来像是同一个项目的两套说法。需要确认后统一口径。
      同一段里 LinkedIn 写 `10,000+ icons`、站点写 `1,783`，可能是爬取量与筛后量，一并确认。

## 3. 简历工作台（ADR-0014 → FR-11）

- [x] FR-11.1 `docs/resume/README.md`（2026-08-29）
- [x] FR-11.2 `format-selection.md` — 版式选型判据 + 本人当前该选哪种（2026-08-29 初稿，
      结论是 Combination；末尾留了一条待核对：Chronological A/B 的确切差异是从模板推断的）
- [x] FR-11.2 `csi-rewrite.md` — CSI 改写规范（2026-08-29 初稿，示例全为虚构；
      2026-09-11 补"超长怎么压"一节，依据 ADR-0016 §3）
- [x] FR-11.2 `ats-tradeoffs.md` — 2026-09-11 写了**已定的两条**（单栏 vs 双栏的 ATS 取舍、
      1-2 页的预算与信息权重），其余明写留白，等真实投递后拿结果补
- [x] FR-11.2 `references-page.md` — 推荐人页规范（2026-09-11）。
      核心是一条隐私结论：**推荐人的姓名与联系方式永远不进本仓库**
      （ADR-0013 约束 1），名单留 ToucanShelf `Career/Contacts/People/`，成稿只在本地
- [x] FR-11.2 `cover-letter.md` — 三种求职信 + 四段结构（2026-09-11）
- [ ] FR-11.2 `review-checklist.md` — 投递前自查，含三处事实交叉核对
- [ ] FR-11.2 `master-vs-targeted.md`（按 ADR-0014 §1.1：站点是名片不随 JD 变，
      针对性只发生在简历侧。**站点即 master resume**，见 ADR-0014 约束 6——
      这篇要写的是"怎么从站点裁剪出针对稿"，不是"怎么维护主简历"。
      地基已由 [ADR-0016](docs/adr/0016-course-conventions-scope.md) 的作用域表给出，
      这篇只需写"怎么做"）

顺序理由见设计文档 0002 §3.3：前两篇产出后即可开始实际改写。

### ToucanShelf Career 侧（2026-08-29 结构调整的尾巴）

结构调整已完成并 push：六个旧目录合并为
`decisions/ Vault/ Experience/ Campaigns/ Contacts/ Inputs/`，
`ResumeInfo` 瘦身改名为 `Vault/Baseline`，指针全部改成新链接语法。
剩下的是内容抽取，属于知识库侧的活：

- [x] `decisions/` 抽取（2026-08-29）：建 `C01-目标岗位范围`（Plan A 后端 / Plan B BSA·BI，
      从 `Inputs/Research/BAT 第二个 diploma` 抽出，原处留链接）。排查后确认另外三处不抽——
      Open Badge 选型「选择依据」全是待定、Campaign「我的意图」是战役级战术立场、
      MPNP `D-007` 是 `Status: Pending` 的空壳占位符（判据写在 `C00-decision-log`）
- [ ] `C02-求职时间线` 的**结论段待本人写**：「为什么是 2028 不是 2027」这个约束
      在四处被引用却从未论证过。骨架和待答问题已列好
- [ ] `D-007` 到 2027-06 真做决策时直接在 Career 建 `C0x`，MPNP 侧标 superseded 并留指针
- [ ] `Experience/` 还差**探花电商**的素材篇。天宝 MES 已有 `项目全景`（2026-08-30），
      Weimob 已整合为 `项目全景`（正文 + 数据量/踩坑两份原文附录，2026-08-30），
      大搜车已有 `项目全景` + `证据提取-2020年汇报PPT与压测报告`（2026-08-30）
- [x] **大搜车车辆中台的主体已补齐**（2026-08-30，`项目全景` §4.5）：
      车辆即商品、重资产低 QPS（活跃车不到 100 万，**估数**）、
      建它是为了让低代码承载定制能力、数据是在新生态重建而非迁移、
      car-api 是大数据部门的 bronze 层上游而非同层系统、「上千参数项」不是难点
- [ ] 大搜车车辆中台**仍缺**：出过什么事故（PPT 那 6 个隐患里疑似有 3 个属于这条线）、
      car-api 之外的上下游、团队规模与交接状态、「不到 100 万活跃车」的确认
- [ ] **大搜车最强的 Impact 是产品级的，不是技术级的**：需求交付从
      「提 issue → 评估通用性 → 否掉或排期 → 半年至一两年」变成
      「车商和运营自己配工作流 → 系统审核 → 发布即上线」。
      **但"半年至一两年"是回忆、无度量支撑**，写进简历前要想好被追问怎么答
- [ ] 叙事机会：**两段经历都做过"商品中台"**——搜车是建（重资产低频），
      微盟是消费上游的它（快消高频、单节点 21 亿 doc）。同名不同挑战，是很好的对比素材
- [ ] 大搜车**在职起始月份未定**（2019 年 3 月还是 5 月）。ADR-0007 约束 4：
      未核实的时间不要擅自改站点 / CV / LinkedIn
- [ ] 大搜车若干待确认项（详见 `Experience/DaSouChe/项目全景.md` §六）：
      凤凰平台的规则匹配与脚本技术（是否 painless）、Seata 是否落地、
      初稿里被删掉的「本地词库 / 索引优化」是不是 ES（**若是，可与微盟 ES 线接上**）、
      用户升级「7 个人天」是团队还是个人口径、PPT 那组 3.75s/0.8s 的统计口径
- [ ] 大搜车的**公开资料使用边界**：查到的上市 / 90% 市占 / 22.8 万活跃账号等
      **几乎都是 2021 年离职之后的事，且来自未核实的 AI 搜索结果**。
      不得写进简历，最多面试时作为行业背景并声明非亲历
- [x] **Weimob「发布完成延迟 30 分钟 → 10 分钟内」的 Solution 已补齐**（2026-08-30，`项目全景` §5.4）：
      Challenge / 技术侧五条 / 业务侧活跃门店策略 / 两个瓶颈与 21 亿事故 / 消费侧形状，全部到位
- [ ] Weimob §5.4：优化的**时间顺序**已由代码考古还原（`代码考古-两个仓库` 第四节），
      仍缺**每条各降了多少**——commit 给不出延迟数字，面试口径要事先想好
- [ ] **新发现（2026-08-30 代码考古）**：`mp-search-tasks` 是**自研分布式分片任务平台**，
      本人约 72% 提交。自研 Scheduley 框架、五条优先级队列 + 背压 + 抢锁幂等 + 软删急停、
      18 页运维控制台（含告警抑制与 DLQ 重投）、迁移后转为索引运维平台。
      **比对账系统有价值得多**，此前完全没进素材，值得一条独立 bullet（往「平台」写，不要往「脚本」写）
- [x] 代码考古的遗留疑问已查清（2026-08-30）：对账服务就是 `chihiro-data-analysis`；
      Scheduley 没搬进千寻，承接的是经验和人。routing = actId_goodsVid 已确认
- [ ] **重估「对账系统」的分量**：原判断「没有稀缺性、最多一个 bullet」基于「独立系统」，
      但代码显示它被抽象成多租户配置驱动引擎、并入公司级千寻平台，比对引擎 122/125 提交是本人。
      **需本人重新拍板**（ADR-0010：结论由本人定，助手只摆证据）
- [ ] **千寻 chihiro 是整段微盟经历的收尾故事**：从做业务系统 → 把团队经验沉淀成公司平台能力。
      另有一条独立料：`chihiro-client-sdk` 7 次提交全是本人，独自设计交付面向内部多团队的 SDK，
      把 ES 使用规范（唯一别名、禁 Nested/Span 查询）固化进 API 契约
- [x] 千寻两点已澄清（2026-08-30）：TL 拉了两三个团队真实接入、本人对接过，**但无任何留存资料**；
      仓库建了之后一直没启动，**真正启动是 2023 年**（与性能优化是接续而非并行）
- [ ] 千寻接入方名单与使用量**永久缺失**，简历只能写「支撑公司内部多个团队接入」，
      不得编造数字；面试被追问如实说没留存
- [x] Weimob `对账系统` 已补备查稿（2026-08-30）。**低优**——本人判断这套当时没有稀缺性
      （独立系统，一个人在家就能做），最多一个 bullet，不作为主打故事
- [ ] Weimob `项目全景` 附录 B 的 18 条 ES 踩坑**只有标题没有内容**，需本人回忆补写
      （ADR-0010：数字与专有名词不得由助手推测补全）

### 简历侧还没做的事（2026-09-11 从 Module 3 课件抽出）

- [ ] **列 3-5 名推荐人并逐个征得同意**。九年经历全在中国，推荐人也在中国——
      课上确认国际推荐人成立，但要预判时差与语言，写清偏好联系方式与时段。
      名单进 ToucanShelf `Career/Contacts/People/`，规范见
      [`references-page.md`](docs/resume/references-page.md)
- [ ] **定一套四份文件共用的版式**（简历 / 求职信 / 推荐人页 / 感谢信）。
      课件原话是 "Extend formatting across all self-marketing materials"。
      排版是本人的活（CLAUDE.md 第三节），这里只记它是个待办
- [ ] **找人校对**：课上建议家人、同学、行业人士、HR 或就业顾问各找一个。
      PACE Career Services 的 resume review 是免费的，现在就能约

## 4. 站点文案（设计文档 0001 的 P2，最大的一块）

> **2026-09-21 新增**：PACE 课程那版新 CV 与站点的事实口径对不上（Weimob 那块尤其严重），
> 对比与改法写在 [设计文档 0003](docs/design/0003-site-copy-vs-cv-alignment.md)（FR-15.1 ~ FR-15.6，提议中）。
> 那篇的结论是：**Hero 本轮不动，Weimob 卡片必须改**，其中三处属事实错误、一条建议删除。

- [ ] **改 [`csi-rewrite.md`](docs/resume/csi-rewrite.md) 的「反例 4：数字不可核验」**——
      ADR-0007 约束 2 已于 2026-09-21 修订（判据改为"不编造、不夸大"，不是"拿得出文件"，
      见该 ADR 第 6 节），那条反例按旧判据写的，现在是错的
- [ ] FR-15.7 MES 卡片补规模数字：站点现在写 `20+ manufacturing stages`，
      素材（ToucanShelf `Career/Experience/tianbao/项目全景` §一、§八）给得出准数——
      **24 道工序 / 约 70 名一线用户 / 日均 1000 根**。注意口径：1000 根是**设计目标**，
      不是实测产量（素材原文是"设计目标日均 1000 根钢管"），写的时候别写成已达成的产能。

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

- [x] UOIP 项目卡的主点击目标改为 https://uoip.huzhi.dev（2026-09-21，`kind: "wiki"`，
      GitHub 角标改为显式声明的 `repos`，否则会随 `kind` 一起消失）
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
