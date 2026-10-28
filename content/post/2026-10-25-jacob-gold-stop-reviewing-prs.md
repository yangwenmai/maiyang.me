---
title: '做了四年半代码审查工具的 Jacob Gold，现在劝大家别审 PR'
keywords: Jacob Gold, Graphite, Origin, Cursor, SpaceXAI, Code Review, stacked PR, 验证, Lauren Tan, pstack, Grok Bot, agent
date: 2026-10-25T06:24:00+08:00
lastmod: 2026-10-25T06:24:00+08:00
draft: false
description: '7 月底，Jacob Gold 说自己过去四年半的主业，就是给人做一个审代码的界面。10 月 9 日，他又发了一句「convincing people not to review prs is the bottleneck」：现在的瓶颈，是说服大家别去审 PR。'
categories: [人物]
tags: ["AI", "Jacob Gold", "Code Review", "Origin", "Agent"]
comments: true
author: MaiYang
x:
  url: https://x.com/MaiYangAI/status/2114120833807343618
  views: 13000
  replies: 4
  reposts: 9
  likes: 46
  bookmarks: 70
  updated: "2026-10-28"
---

![做了四年半代码审查工具的 Jacob Gold，现在劝大家别审 PR](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/jacob-gold-stop-reviewing-prs-1.jpg)

7 月底，有人在 X 上抱怨团队的 PR 越来越多、越来越大。Jacob Gold（[@jacobgold](https://x.com/jacobgold)）回他，说自己过去四年半的主业，就是[给人做一个审代码的界面](https://x.com/jacobgold/status/2081946929660121217)。10 月 9 日，他又发了[一句](https://x.com/jacobgold/status/2108466310875426918)「convincing people not to review prs is the bottleneck」：现在的瓶颈，是说服大家别去审 PR。

看着像转向，其实他盯的一直是同一段时间，就是 PR 提出来以后、合进主干之前。2025 年 8 月他[算过一笔账](https://x.com/jacobgold/status/1953290464385171637)：从动手到提 PR 的时间砍一半，团队大概快 10%；从提 PR 到合并的时间砍一半，团队能快一倍。

以前他的答案是让人审得更快，现在是让机器去验证，人只管拍板。这篇想看清楚的就是他怎么走到这一步，以及哪些做法普通人能照着用。

> it’s hard work to stay ahead of @poteto but a little internal competition is a good thing… this michelin kitchen is now at almost 250 PRs merged per day over the past 2 weeks!
>
> —— Jacob Gold（[原帖](https://x.com/jacobgold/status/2106843104758419459)）

## 一、成长路径，一直在「工程师怎么协作」旁边打转

和 Lauren Tan 不一样，Jacob 是**正经科班出身**。下面的经历，除了另外标出处的，都来自他自己写的 [LinkedIn](https://www.linkedin.com/in/jacobgold/)。他在那里的个人简介里还写着两个成绩，马拉松 3 小时 38 分 47 秒，魔方 10.96 秒。看到马拉松我觉得挺亲切。我 2024 年在深圳南山半马跑进了 1 小时 35 分，全马一直没中签，倒是跑了几场 50 到 60 公里的越野赛，在山野中感受自然，感受自我，寻找生活。

**Jacob 在洛杉矶读完中学，毕业那年夏天开始教小孩编程。** 他 2009 到 2015 年在洛杉矶的 Harvard-Westlake School 读中学，打橄榄球，在交响乐团，参加 Science Bowl。2015、2016 两个夏天（高中毕业和大一结束后），他在一个科技夏令营当辅导员，教小学和初中生做可穿戴设备、写程序、给游戏做 mod。他是第一个教可穿戴课的老师，还把那门 Java 课改成了真正适合初中生的编程入门。

**Columbia 读数学和计算机，当了两年多助教。** 2015 到 2019 年，他在 Columbia University 读数学与计算机科学双学位。从大二开始，他给荣誉版计算机导论和离散数学当助教，带习题课、答疑，也出题、改卷。课程项目大多很硬。他在 Linux 内核里写文件系统、键值存储、调度器，用 OCaml 和 LLVM 给一门图像处理语言写编译器并加上垃圾回收，在 Bjarne Stroustrup 的 C++ 课上把 Go 的 channel 移植到 C++。2018 年他去巴黎交换，用法语上了一门高年级网络编程课，和两个法国同学一起写联网游戏的客户端和服务器。他给那几个操作系统作业起的名字是 Pantry、Fridge、Freezer、Cabinet，凑成了一间厨房。

他 2017 年传到 GitHub 上的一个数独求解器，描述写得很老实，说是照着这学期 AI 课学的回溯搜索做的，「but trying to throw the MRV optimization at it just made it slower. Might refactor in the future!」（[仓库](https://github.com/goldjacobe/SudokuSolver)）加了优化反而更慢，先这样，以后再改。

**两段实习，一个硕士。** 2017 年暑假他在 Oath（当时的 Yahoo Video）实习，用 React 给生产环境里的机器学习模型做调试和配置工具。2018 年暑假在 Meta 实习，写了一个把 JavaScript 转成能在各个移动平台原生渲染的服务端代码的转译器，又把这套框架从 Facebook 的大仓库里拆出来，准备开源。本科最后一学期他在 Meta 兼职，2019 年在 Columbia 读完计算机科学硕士，方向是机器学习。

**在 Meta 守了两年 Tier 0 服务。** 2020 年 1 月他正式加入 Meta，在 Messaging Infrastructure 的存储组。这个组管 Messenger 和 Instagram Direct 的后端数据，他在 LinkedIn 上把它归为 Tier 0 级关键服务，分布在约 30 万个用户数据分片上，支撑数十亿用户。他做过的一件大事，是把 Instagram Direct 的数据从旧的 Cassandra 迁到消息基础设施的数据库，Instagram 因此得以下线整套旧 Cassandra 集群。资深同事休育儿假的几个月里，他代理过组里的 tech lead，管值班、事故响应和路线图。

**2022 年初，只面了一份工作。** 他[说过](https://x.com/jacobgold/status/2089409145556578508)，实习时认识 Graphite 联合创始人 Tomas Reimers，是他职业生涯里最重要的一件事。Graphite 的起点他也[讲过](https://x.com/jacobgold/status/2024203748768436229)。Tomas 很怀念 Meta 内部用的 hg（Mercurial），另一位创始人 Greg Foster 起初不信，直到他们招来 Tomas 的前同事、在内部写出 CLI、用 stacked PR 跑得飞快，「i (also ex-fb) was immediately sold on joining shortly after」。2026 年 10 月他回头[写道](https://x.com/jacobgold/status/2107947934151290990)「i interviewed for one job at the beginning of 2022」，之后能和这么多厉害的人做这么多酷的事，他说这是一种荣幸，不敢视为理所当然。

> Graphite 是一家做代码审查工具的公司，主打 stacked PR，就是把一个大改动拆成一串叠在一起的小 PR，分开审、按顺序合。2025 年 12 月 19 日，Cursor [宣布](https://cursor.com/blog/graphite)和 Graphite 签了收购协议（[Graphite 的公告](https://graphite.com/blog/graphite-joins-cursor)）。

**在 Graphite 四年，从 CLI 做到 AI 团队。** 2022 年 2 月，他成了 Graphite 的第二个工程师。LinkedIn 上他写自己是 Graphite CLI 和 VS Code 扩展的作者，这两个工具都建在 Git 之上，帮开发者用 stacked changes 的方式管理 GitHub PR。VS Code 扩展上线那篇[博客](https://graphite.dev/blog/announcing-graphite-for-visual-studio-code)就是他署名的。后来他离开工程团队六个月，当了公司第一个 Deployed Engineer，回来后成了 AI 团队的负责工程师，顺手还帮销售、产品、社区、支持、招聘和内容。

2024 年 4 月 Graphite 的一场官方直播里，他和 Greg Foster 一起讲产品。他说 stacking 是为了让写代码和审代码并行。他还讲了一个设计上的让步。团队里很多人来自 Facebook，那边的工具本来就支持一串 commit 叠着审，可是同事不熟悉 stacking 时，还是想一个 commit 一个 commit 地审，所以工具两种都支持（[直播录像](https://www.youtube.com/watch?v=-MKIXHt8At4)）。2026 年 3 月他发 [gt 1.8.1 测试版](https://x.com/jacobgold/status/2031141492883140800)时，说终于把自己以前做的一些有问题的决定改掉了。

![2024 年 4 月 Graphite 官方直播，左上是 Jacob Gold，左下是 Greg Foster。](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/jacob-gold-stop-reviewing-prs-2.jpg)

2024 年 4 月 Graphite 官方直播，左上是 Jacob，左下是 Greg Foster，幻灯片上写着小改动比大改动好审。截自 [Graphite 的 YouTube 直播录像](https://www.youtube.com/watch?v=-MKIXHt8At4&t=309)第 5 分 9 秒。

他也一直在学新东西。2022 年底他用 **Advent of Code 练 Rust**，仓库描述里自嘲说这些代码不代表他的为人，「i am just trying to learn rust」（[仓库](https://github.com/goldjacobe/aoc2022)）。

**Cursor、SpaceXAI 和 Origin。** 2025 年 12 月 Graphite 宣布并入 Cursor，他在 [LinkedIn](https://www.linkedin.com/posts/jacobgold_so-excited-to-be-joining-forces-with-the-activity-7407815696052654080-I12M) 写下「Even before the LLM wave, our goal at Graphite was always to become the standard in software development collaboration」。2026 年 1 月他转进 Cursor，做 Origin。7 月他[说](https://x.com/jacobgold/status/2080834661471703345)，Origin 西海岸这边两个月里从 1 个人（他自己）变成 3 个人。8 月 17 日 Origin 开放测试，他在 [LinkedIn](https://www.linkedin.com/posts/jacobgold_this-is-the-next-phase-of-an-arc-that-began-activity-7495167930968498176-i3JO) 写道，独立的代码托管，做软件团队协作的最好地方，「was always the north star」。同月 Cursor 被收购，他成为 SpaceXAI 的软件工程师。

## 二、同一个瓶颈，答案换了

Graphite 那几年，他的态度很鲜明。2025 年 12 月他回别人一句「[review is the bottleneck](https://x.com/jacobgold/status/2002144049386639613)」。2026 年 1 月，他在 X 和 LinkedIn 上用全大写发了一句「[CODE REVIEW STILL ISN'T JUST ABOUT FINDING BUGS](https://x.com/jacobgold/status/2015096252254580801)」，代码审查从来就不只是为了找 bug。

半年后，写代码这一头被 agent 拉得太快了。开头那个人说，他们团队的 PR 产量是 2024 年的 5 倍，单个还大了两三倍。Jacob [回答](https://x.com/jacobgold/status/2081952916114690509)说，代码多到审不过来，大家就会觉得干脆别审了，「we're trying to create the correct agentic layer of abstraction for reviewing code to keep up with what we have for writing it!」写代码已经有 agent 了，审代码也得有一层对应的 agent。

到 10 月，这层东西在他手里已经跑起来了。别人问他们的 PR 怎么保证质量，他[列了一串](https://x.com/jacobgold/status/2106879810719089079)，有 codeowners、自动审查和自我认证，CI 当然也有，所有改动还要过大量 CUA（让 agent 像用户一样操作界面）验证。人还审一部分，但「[you need a way to scale validation with tokens](https://x.com/jacobgold/status/2107153694303330320)」。他甚至说，[到了极限](https://x.com/jacobgold/status/2107287043613282687)，几乎所有 token 都会花在验证上，超过 99%；他现在默认跑的验证，花的 token 是[写代码的 10 到 100 倍](https://x.com/jacobgold/status/2107383856412459032)。

所以「别审 PR」的意思，是别再让人一行行去审。验证一步都没少，只是交给了机器，量还大了好几倍。有人说不逐行读代码的项目都不重要，他[回了一句](https://x.com/jacobgold/status/2101856651972116671)「believe it or not there is room in between "read every line of code" and "ship whatever the ai produces"」。

## 三、他的工作台长什么样

### 1. 一个月，从本地搬到云上

8 月他[说](https://x.com/jacobgold/status/2087807424958955945)，自己整套 agent 系统都建在 Lauren 的 pstack 上，几个月里经历了几个阶段。先是大多在本地开对话，然后用一个 multitask 协调者，再把所有东西搬到云端 agent，最近改由 Grok Bot 来调度。他晒过一张[并发云 agent 图](https://x.com/jacobgold/status/2091391112065998958)，峰值是 8 月 21 日的 49 个，又[补了一句](https://x.com/jacobgold/status/2091391246493454644)「i was all local agents in july」。

> pulled some numbers
>
> as you can see we are cloud agenting hard now
>
> —— Jacob Gold（[原帖](https://x.com/jacobgold/status/2091391112065998958)）

他的 bot 也做过减法。内部测试时他原来有一队约 40 个 bot，后来全删了重来，[现在只有 10 个](https://x.com/jacobgold/status/2087806837295083714)，他说精简的团队用着更舒服。到 10 月，他手上同时[开着 20 个 Cursor Project](https://x.com/jacobgold/status/2107285183770816534)，大部分各自已经合进去几百个 PR。

### 2. 每个 PR 先问一句「这是我要的吗」

10 月初他加了一道[检查](https://x.com/jacobgold/status/2106898268001292290)，每个 PR 都拿去对照他发过的所有 prompt，确认这件事确实是他要的；只要有一点可能不是，就推到他的「little decisions app」里等他拍板。他说这让他快了很多，用他的话说，是把我们对 agent 那种该有的疑心，[装进 agent 自己](https://x.com/jacobgold/status/2107287043613282687)。

Project 一多，要他拍板的事就没完没了。他[抱怨过](https://x.com/jacobgold/status/2105863875975618699)，开着 11 个 Project，永远有决定在等他，觉都不够睡。他的解法是让 Grok Bot 管着所有 Project，自己[只在 Notion 里干活](https://x.com/jacobgold/status/2105723403093373052)。每个 Project 只留一页决策文档。每件事有固定编号、背景、几个选项和各自代价、一条推荐，再留一行空白等他填答案；他不在时 Project 自己做的决定，单独标成「default call，不是 Jacob 的决定」。他后来把这套整理成一个 [Cursor 插件](https://github.com/goldjacobe/project-decisions-doc)开源了，写明也能换成 Google Docs、Confluence 或者仓库里的一个 Markdown 文件。

为什么非做这个？他[说](https://x.com/jacobgold/status/2109027760907915340)，之前上下文和待决定的清单长到十几屏，不想让 Project 卡在等他这一步，「[must remove self as bottleneck](https://x.com/jacobgold/status/2109027862095495187)」。他的底层判断是，大多数软件决定都是[可以回头的门](https://x.com/jacobgold/status/2094792569750188350)。他走开的时候，就让 agent 先做决定，回来再让 agent 用 /grill-me 拷问他，有要改的再改，[不为容易撤回的决定停下来等](https://x.com/jacobgold/status/2094792055276949698)。他还说过「[the faster you make decisions the faster you can correct your mistakes](https://x.com/jacobgold/status/2105418421739655304)」。

### 3. 不读每一行，也要懂系统

有人问他，不读代码怎么知道系统在干什么。他[说](https://x.com/jacobgold/status/2107138783212966008)，和人会交的东西一样，要 Notion 文档，用 /visualize 画图，要 TLA+ 规格再转成几行摘要；另外，他在 GitHub 之上做了好几年 Graphite，Origin 应该怎么表现，他脑子里很清楚。

形式化验证是他 9 月才开始试的，起点就是[对 Opus 说了一句](https://x.com/jacobgold/status/2103946483242307732)，我们用形式化验证找 bug 吧，试试 Lean 和 TLA+。几周后他[说](https://x.com/jacobgold/status/2109713122693193913)，这件事一直在帮他找出 bug，也在帮他找出漏掉的产品决定。

### 4. 让 agent 修它们自己觉得难的地方

Lauren 说现在该重新想想好代码是什么意思，他接话说[可维护性还是重要，只是样子完全变了](https://x.com/jacobgold/status/2109357651499106608)。Lauren 问「maintainable by who」，他[接着说](https://x.com/jacobgold/status/2109358387259744375)「i have lots of loops where my agents fix what's hard for THEM. that's the highest leverage place to be」。

这类循环他讲过好几个。让一个定时任务去[翻 agent 的对话记录](https://x.com/jacobgold/status/2084787788680163428)，找可以优化的地方；一个[定期改进 skill 的循环](https://x.com/jacobgold/status/2092339225970741689)，专看他自己的 prompt 和记录；让一群 agent [把 CI 跑的时间往下压](https://x.com/jacobgold/status/2093704024767746345)，好让别的 agent 跑得更快。他对自己的要求是当一个[挑剔的经理](https://x.com/jacobgold/status/2106901510651314537)，追问为什么慢、为什么坏，同时也肯钻到细节里，弄懂慢在哪里。

### 5. 管 agent，就是管一个组织

Lauren 说过每次纠正 agent，都该想办法让这个问题彻底消失。Jacob 引用她，[补了一句](https://x.com/jacobgold/status/2089168315478630683)，其实什么都没变，只是我们现在管的是 agent，不是人。agent 犯了错，他的态度是[别急着怪 AI](https://x.com/jacobgold/status/2084397613357691145)，除非这个错人从没犯过，「i'm a manager now. best i can do is give them feedback」。

他看到的下一步，也是组织层面的事。10 月 16 日他[写道](https://x.com/jacobgold/status/2111089889114472892)，现在很多公司里已经有一些人摸到了门道，效率极高，拖慢他们的只剩为人设计的那套护栏；合适的护栏，才能让一个大组织从每人并行 5 到 10 个 agent，跨到 50 到 100 个，「we are productionizing this」。

### 6. 把这套做成产品，就是 Origin

Origin 是 Cursor 的 git 托管平台（按 [Cursor 官方文档](https://cursor.com/docs/origin)的说法，目前是早期测试版）。Jacob 讲过不少设计取舍。

他们内部试过让一个仓库同时挂在 GitHub 和 Origin 上开 PR，结果产品体验[复杂得不行](https://x.com/jacobgold/status/2089750672027910621)，最后定成 GitHub 仓库开 GitHub PR、Origin 仓库开 Origin PR，再另做迁移。GitHub 没有「PR 开始冲突」的 webhook，Origin 就做了[冲突一出现就通知 agent](https://x.com/jacobgold/status/2104406184879161637)。agent 一次能交几百个 PR，算 diff 的速度就成了硬功夫，他说[很多工作花在了这里](https://x.com/jacobgold/status/2106852631750783246)。

Origin 里还留着 [Graphite 2021、2022 年写的代码](https://x.com/jacobgold/status/2088119977262100523)。有一次他的 agent 找出一个从 2021 年起就在 Graphite 里、后来跟进了 Origin 的性能问题，他[直接认了](https://x.com/jacobgold/status/2091748602700014053)「embarrassing, we will be better going forward」。

他对 GitHub 也挺厚道。GitHub 出大事故那天，他说这一年 GitHub 扛的负载太疯狂，[在这种情况下做得已经相当好](https://x.com/jacobgold/status/2089800689652478389)；GitHub 支持 stacked PR 以后，他说[挺为 Graphite 团队能出一点力高兴的](https://x.com/jacobgold/status/2082897727361585347)。

他把 Origin 的定位压成了两行，「[the codebase is the context / the forge is the harness](https://x.com/jacobgold/status/2111107379773280664)」。

## 四、那 250 个 PR

他和 Lauren 之间的 PR 比拼，在 X 上挺热闹，基本是他追着她跑。7 月底他[说](https://x.com/jacobgold/status/2082609592417288488)「follow the way of the lauren」，自己这个月还不到 1000，因为 7 月第一周在休假；8 月初又[说](https://x.com/jacobgold/status/2084812607647813858)，他就是照着 Lauren 的做法抄，然后事情就变好了。8 月 25 日他发帖说，别告诉 Lauren，这周[也许是我第一次](https://x.com/jacobgold/status/2092160077767888939)在 monorepo 的 PR 数上超过她。

10 月 4 日那条传得最广，他[写](https://x.com/jacobgold/status/2106843104758419459)「it's hard work to stay ahead of [@poteto](https://x.com/poteto) but a little internal competition is a good thing… this michelin kitchen is now at almost 250 PRs merged per day over the past 2 weeks!」配图是按人统计的每日合并 PR 曲线，一条标 Jacob，一条标 Lauren。也就是说，这个「将近 250 个」算在他个人名下，是他那套 agent 体系（他叫它 kitchen）产出的，不是整个团队的数。同一天他还说 [Lauren 两周落地了将近 2500 个](https://x.com/jacobgold/status/2106889983114256569)。有人问这些 PR 是不是都很琐碎，他晒了 [PR 大小分布](https://x.com/jacobgold/status/2106863634148446659)。不算注释、测试和生成的代码，他的 PR 中位数是 101 行。

> excludes comments tests generated
>
> —— Jacob Gold（[原帖](https://x.com/jacobgold/status/2106863634148446659)）

两个人谁多谁少，我不替他下结论。他自己第二天发了一条，后来置顶在主页。

> well aware that # of prs merged != business value btw but i'm trying to build the software kitchen of the future so i need to be dogfooding it

（[原帖](https://x.com/jacobgold/status/2106975237581766972)）他很清楚合并的 PR 数不等于业务价值；他在造未来写软件的厨房，自己得先天天用。

这和他在 Graphite 学到的东西是一条线。他[说过](https://x.com/jacobgold/status/2087228313379184855)，想了解用户只有一个办法，自己当用户，同时每天和用户聊，只做一样不够。8 月他[发过一句](https://x.com/jacobgold/status/2084798369000825151)，以后再也不想去一家不做自己每天主力工具的公司。

## 五、普通人能照着做的几件事

他的条件我们大多没有，顶级公司、充足的 token、一个在高速发展的产品。下面这些，不靠这些条件也能开始。

1. **先量一下，时间到底花在哪。** 他 2025 年那笔账的意思是，最慢的一段才值得优化。拿最近一件交付过的事，记下从开始做、到做完、到别人确认、到实际用上，各花了多久，先治最长的那段。
2. **做任何事之前，先问一句「agent 能不能做」。** 这是他的[原话建议](https://x.com/jacobgold/status/2084554477571653912)。他自己连家里 Wi-Fi 卡都[交给 Cursor 排查](https://x.com/jacobgold/status/2083311825110868126)，说换作以前，根本不会花时间去弄。
3. **给交付加一道「这是我要的吗」。** 不用像他那样自动对照全部 prompt。让 AI 交活时，顺手列出每一处改动对应你哪一句要求，对不上的单独标出来，你只看标出来的那些。
4. **把要你拍板的事收进一页纸。** 每件事写清选项、代价和推荐，留一行空白给你填。能撤回的小事，让 AI 先按推荐做，标明是默认决定，你回头再看。他的 [project-decisions-doc](https://github.com/goldjacobe/project-decisions-doc) 是开源的，可以直接拿来改。
5. **不逐行读代码，也要让 AI 把系统讲给你听。** 要一页文档、一张图、几行摘要，讲清它做了什么、没做什么。他用的就是这三样。
6. **每周回看一次记录，修最常卡住的地方。** 翻一遍这周和 AI 的对话，找出你重复纠正过的问题，写成一条规则或一个检查，让下周的它少犯一次。
7. **找一个人照着学，也公开请教。** 他说自己就是照着 Lauren 的做法抄。2025 年去旧金山开会前，他在 LinkedIn [发帖找人](https://www.linkedin.com/posts/jacobgold_will-be-in-sf-the-first-week-of-june-for-activity-7329319243181633536-qvTN)，想和做过复杂 agent 评测系统的人交流，说请对方喝咖啡、吃饭都行。

## 六、我自己做到哪了

对照他这一路，我先说实话，我离他很远。

我 10 月 9 日那篇 [Article](https://maiyang.me/post/2026-10-09-hundreds-of-prs-a-day-nine-work-lines/) 里写过，CastMind（原名 ContextEcho）从 4 月到那时有 1,020 个 commit，走 PR 合并的只有 18 次；代码我基本不看了，交给 AI 做 code review。我的工程还在从 Cursor 往 Projects 迁，Projects 刚开始用，还没摸出适合自己的方式。他 7 月还全用本地 agent，8 月就把并发开到了 49 个，这个速度我没有。

我日常的活大多交给一组 bot，一个 bot 只干一件事，分别管找选题、做字幕和剪辑、写初稿、做封面。写稿的那个，起草完会先过检查器，再去一遍 AI 味，才交到我手上。这算是一道验证，可也只有这一道。

上一篇写 Lauren 时我就承认过，成片要我看，文案要我看，发不发要我点头。读完 Jacob，我看得更清楚了，我的流水线里最慢的一环是我自己。用他说的可以回头的门去分，公开发出去的东西撤不回，这道关我会一直留着；可选哪个题、封面挑哪版、初稿先改哪段，大多是能回头的，现在也都在等我。这些决定散在聊天里，没有一页纸收拢，也没有一道自动的「这是我要的吗」，我只能自己当那个检查器。

学着用 Grok Bot 以后再读 Jacob 这些分享，我深有体感，特别是思维要转变。前面那几条里，我最有共鸣的是头两条，先量一下，时间花在哪儿；做任何事之前，先问自己「agent 能不能做」。

接下来我想先做两件事。一是把等我拍板的事收进一页，能撤回的让 bot 先按推荐做；二是给每个 bot 的交付加一道「这是我要的吗」。

## 结尾

8 月 25 日，他发过一条只有三行的帖子（[原帖](https://x.com/jacobgold/status/2092148912035668342)）。

> just do things
>
> drop the "you can"
>
> just do

不是每个人都有他这样的机会，但是不做就一定没机会。先做起来。

上一篇我写的是 Lauren Tan，Jacob 说自己就是照着她的做法抄的，两篇可以对照着读。

> 非 CS 出身的 Lauren Tan，是怎么一步步放手给 agent 的
>
> Lauren Tan（@poteto）说，2024 年那会儿，她和很多写了多年代码的人一样，不太相信 agent 能写出进生产环境的代码，担心垃圾代码会混进漂亮的代码库。
>
> —— [阅读全文](https://maiyang.me/post/2026-10-18-lauren-tan-handing-work-to-agents/)

## 参考资料

- [Graphite is joining Cursor](https://cursor.com/blog/graphite)，Cursor 官方博客，2025 年 12 月 19 日。
- [Building the future of software development with Cursor](https://graphite.com/blog/graphite-joins-cursor)，Graphite 官方博客，同日。
- [Jacob Gold 的 LinkedIn](https://www.linkedin.com/in/jacobgold/)，学历、每段工作和课程项目。
- [Jacob Gold 的 GitHub](https://github.com/goldjacobe)，学生时代的仓库、aoc2022、project-decisions-doc。
- [给人做审代码的界面，做了四年半](https://x.com/jacobgold/status/2081946929660121217)，2026 年 7 月的回复。
- [代码多到审不过来，要有对应的 agent 层](https://x.com/jacobgold/status/2081952916114690509)，同一串回复。
- [convincing people not to review prs is the bottleneck](https://x.com/jacobgold/status/2108466310875426918)，2026 年 10 月。
- [10% 和 100% 的那笔账](https://x.com/jacobgold/status/1953290464385171637)，2025 年 8 月。
- [CODE REVIEW STILL ISN'T JUST ABOUT FINDING BUGS](https://x.com/jacobgold/status/2015096252254580801)，2026 年 1 月。
- [实习时认识 Tomas Reimers](https://x.com/jacobgold/status/2089409145556578508)，他说的职业生涯最重要的事。
- [Graphite 的起点和他为什么加入](https://x.com/jacobgold/status/2024203748768436229)。
- [2022 年初只面了一份工作](https://x.com/jacobgold/status/2107947934151290990)。
- [Announcing Graphite for Visual Studio Code](https://graphite.dev/blog/announcing-graphite-for-visual-studio-code)，他署名的 Graphite 博客。
- [Learn Graphite with our CTO](https://www.youtube.com/watch?v=-MKIXHt8At4)，2024 年 4 月 Graphite 官方直播，他和 Greg Foster 一起讲 stacking。
- [Graphite 并入 Cursor 时的 LinkedIn 帖](https://www.linkedin.com/posts/jacobgold_so-excited-to-be-joining-forces-with-the-activity-7407815696052654080-I12M)。
- [Origin 上线时的 LinkedIn 帖](https://www.linkedin.com/posts/jacobgold_this-is-the-next-phase-of-an-arc-that-began-activity-7495167930968498176-i3JO)。
- [他的验证组合](https://x.com/jacobgold/status/2106879810719089079)，包括 codeowners、自动审查、自我认证、CI 和 CUA。
- [验证要靠 token 扩展](https://x.com/jacobgold/status/2107153694303330320)。
- [超过 99% 的 token 会花在验证上](https://x.com/jacobgold/status/2107287043613282687)。
- [基于 pstack 的几个阶段](https://x.com/jacobgold/status/2087807424958955945)。
- [PR 对照全部 prompt 的检查](https://x.com/jacobgold/status/2106898268001292290)。
- [在 Notion 里管所有 Project 的决定](https://x.com/jacobgold/status/2105723403093373052)。
- [project-decisions-doc](https://github.com/goldjacobe/project-decisions-doc)，他开源的决策页插件。
- [大多数软件决定都能回头](https://x.com/jacobgold/status/2094792569750188350)。
- [不读代码怎么懂系统](https://x.com/jacobgold/status/2107138783212966008)。
- [让 agent 修它们自己觉得难的地方](https://x.com/jacobgold/status/2109358387259744375)。
- [合适的护栏，从每人 5 到 10 个 agent 到 50 到 100 个](https://x.com/jacobgold/status/2111089889114472892)。
- [跨 forge 的取舍](https://x.com/jacobgold/status/2089750672027910621)。
- [Origin 官方文档](https://cursor.com/docs/origin)，Origin 是什么。
- [将近 250 个 PR 一天](https://x.com/jacobgold/status/2106843104758419459)，附按人统计的曲线图。
- [# of prs merged != business value](https://x.com/jacobgold/status/2106975237581766972)，他的置顶帖。
- [自己当用户，也每天和用户聊](https://x.com/jacobgold/status/2087228313379184855)。
- [just do things](https://x.com/jacobgold/status/2092148912035668342)。
- [我 10 月 9 日的 Article](https://maiyang.me/post/2026-10-09-hundreds-of-prs-a-day-nine-work-lines/)，我自己的 commit 和 PR 数。
- [非 CS 出身的 Lauren Tan，是怎么一步步放手给 agent 的](https://maiyang.me/post/2026-10-18-lauren-tan-handing-work-to-agents/)，我写 Lauren Tan 的上一篇。
