# ADR-0018 首屏定位：后端 + 数据管线，不再是"搜索"

- 状态：已接受
- 日期：2026-10-02
- 依赖：[ADR-0002](0002-information-architecture.md)、[ADR-0007](0007-copy-conventions.md)、[ADR-0008](0008-job-intent-timing.md)
- 证据：ToucanShelf `Career/decisions/C01-目标岗位范围`（2026-09-24 版）、
  `Career/Research/毕业后岗位方向的温尼伯市场核查`

## 背景

Hero 终端的 `focus` 一行写的是 `large-scale data search · distributed systems`，
副标题是 `expanding into Data & AI`。两处都和 C01 的岗位排名对不上：

- C01 的技术线是 **rank 1 Backend + rank 2 Data Engineer / Data Developer**，
  "技能基本重合，一起投"，品牌主张是"Java 后端 + 数据平台"。
- "搜索"不在排名里，温尼伯市场核查里也几乎没有搜索工程师这个岗位。
  它是 Weimob 那段经历的**内容**，不是定位。
- ML / AI 在 C01 排第 6，**不作目标**；副标题却把 AI 和 Data 并列成扩展方向。

另外 `scale` 一行的 `500K+ peak QPS` 在素材里找不到出处（课程作业稿 B13 已删），
却被染成了"只给可验证事实"的高亮色。

## 决策

1. `focus` 改为 `backend systems · data pipelines · data reliability`。
   前两项对应 rank 1 与 rank 2；第三项是两条线共有的差异点
   （MySQL↔ES 对账、UOIP 的跨层质量审计），与左侧正文 "data reliability" 同词。
2. 副标题改为 `expanding into Data Engineering`。
3. `scale` 去掉 `500K+ peak QPS`，记录数按 Experience 改为 `65M→90M`。

## 理由

- 后端是机会量最大的方向，DE 是理想方向；两者同属一条线，首屏应同时说出两层，
  只说后端会埋掉转向，只说 DE 会显得在声明一个还没坐实的身份。
- 这是**定位**，不是**求职意向**：没有写岗位名、地域或可入职时间，ADR-0008 不受影响。
- 依据是 C01 对整个本地市场的判断，不是某一份 JD，不违反 ADR-0014 §1.1"站点不跟招聘方走"。

## 约束

1. 首屏不再用"search"作定位词。Weimob 段落里描述事实的 "search and promotion platform" 不受此限。
2. 终端里染 `NUMERIC` 色的数字必须能在 `lib/content/` 找到同一事实；找不到的不上首屏。
3. AI 不在首屏作扩展方向出现。正文第二段的 "Data Engineering and Applied AI" 与
   `currently` 一行的 "Post-Degree AI" 是**在读项目的事实**，暂留；
   若要改，按本 ADR 的理由一并评估。

## 后果

- 正面：首屏与 C01、简历的 Profile 首句、LinkedIn Headline 指向同一个方向。
- 负面：首屏少了一个大数字。现在的 scale 只剩体量，没有吞吐或延迟类的证据。

## 同批改动：UOIP 卡片角标（2026-10-02）

`Conference Talk` 改为活动名 `Day of Data 2026`，`status` 取值 `conference` 更名为 `talk`。
Day of Data Winnipeg 是本地数据社区的一日活动，"conference talk" 会让读者往行业大会、
学术会议的规格上脑补；而简历与 LinkedIn 写的都是 "presented at Day of Data Winnipeg"。
**角标写可查证的事实，不写类别评价。** 以后若有第二个 `talk` 项目，
把角标文字挪进 `Project` 数据，不要在 `project-card.tsx` 里再写死一个活动名。

## 复审条件

- C01 在 2027-01-10 复核时若改变 rank 1 / rank 2，本条随之复审。
- 若 Projects 板块新增了能支撑数据管线定位的一手项目（不止 UOIP），
  可以考虑把 `scale` 换成管线类指标。
