---
title: '别指望它记住你：Lauren Tan 从 Ember 社区到 Grok Bot，普通人能拿走的四条'
keywords: Lauren Tan, poteto, pstack, Grok Bot, React Compiler, Agent, 开源, Netflix, Meta, Cursor
date: 2026-08-31T21:30:00+08:00
lastmod: 2026-08-31T21:30:00+08:00
draft: false
description: '她的博客 2020 年停更，答应要写的领导力原则一直没发。六年后这些原则装进了 pstack。这篇把她那三篇组织文、Grok Bot 的公开表述，和十年时间线放在一起，说清楚 builder 该学什么、为什么学、学不到会怎样。'
categories: [Thinking]
tags: ["Lauren Tan", "poteto", "pstack", "Grok Bot", "React Compiler", "Agent", "开源"]
comments: true
author: MaiYang
---

## 起因

她的个人博客 [no.lol](https://www.no.lol/) ，最后一篇写在 2020 年 5 月。

那篇叫 [This Time Is Different](https://www.no.lol/2020-05-11-this-time-is-different/)。她亲手拆掉自己早年的「idiomatic」腔，说「这次一定做对」是谎言。然后就停更了。她答应要写的 engineering leadership principles，一直没发。

六年后，这些原则装进了一个叫 [pstack](https://cursor.com/marketplace/cursor/pstack) 的 Cursor skill。内部叫 `/lauren-mode`，公开叫 `/poteto-mode`。README 第一句就把对象钉死了：

> Agents are like new hires in a constant state of amnesia and idiocy. They don't remember what you tell them, and they never really learn anything new.

我最近一直在用 Grok Bot，也装了 pstack。用着用着就想搞清楚一件事：这个 skill 背后的人，这十年到底在想什么。

Lauren Tan，X 上是 [@poteto](https://x.com/poteto)，以前叫 sugarpirate_。新加坡做设计，Monash 读金融，不是 CS 科班。公开能核对的大约 40 场分享，去重大约 32 场（这个数是我对着活动页和录像逐条对的，漏掉几场完全可能）。博客写到 2020 年 5 月就停了。之后她几乎不写个人长文，输出变成产品本身：React Compiler，再变成 pstack，再变成 Grok Bot。

一条贯穿线没怎么变：怎么让没见过面的人——后来是没记性的 agent——也能按她的标准把活做对。

这篇不是研究报告。我不打算把她每一场演讲列成附录。我想写清楚的是：作为 builder、产研、科技从业人员，该从她身上学什么，为什么现在学，学不到会怎样。

你要是只关心组织怎么运转、agent 怎么带，先看下面两节。时间线放后面，用来看她怎么转的。

## 先读这三篇：她怎么理解组织和权力

2018 到 2020，她在 Netflix 当经理。博客从 How-to Ember，换成 How orgs work。

必看就三篇。短，加起来大约 20 分钟。三篇连着读，能看见她后来怎么管 agent。

我对着原文对过。下面的句子，是她写的，不是我概括的。

### 沟通天生丢信息

[An Engineer’s Guide to Communication](https://www.no.lol/2018-02-26-an-engineers-guide-to-communication/)，2018-02-26。刚当 EM 几个月写的。开篇一句把整篇钉死：

「Communication is inherently lossy.」

你没说出口的，和你怎么说的，往往比内容本身更重要。写成文字，损耗更大。

她拿 Netflix 的微服务开刀。外面以为 Netflix 成功是因为微服务，抄架构就能抄成功。她写，微服务帮不了还没长到那个规模的团队，只会加复杂度。微服务是组织优化，先要人能沟通，架构才跟得上。

可直接用的一条：「Listen first, understand second, speak last.」会上别抢第一句。Netflix 高信任里，某个人当 informed captain，不追求共识，disagree and commit。船长听完、想清，下注，大家跟上。

后半讲非暴力沟通。观察和评判跳得太快。同事 PR 没测试，事实是没测试；立刻认定「不尊重团队」就是暴力。她给的替换：「When you submit a pull request without tests, it makes me feel worried that we’re introducing regressions.」对方才有空间说，其实是不会写测试、文档没有、又不敢问。

为什么现在还该看。Grok Bot 和 pstack 里的「never-block-on-the-human」，就是这篇的 informed captain。人和人沟通已经会丢信息，人和失忆的 agent 沟通丢得更狠。她后来不再写第二篇沟通长文，把规则写进 skill。

### 10x 是让周围人变 10x

[Should I Become a Tech Lead?](https://www.no.lol/2019-03-09-should-i-become-a-tech-lead/)，2019-03-09。

来自她给少数族裔工程师做的 1:1。对方觉得技术还不够，不敢当 lead。她说自己当年也这么想，后来才明白，经理把最强程序员从写代码里抽走，去管人，常常是亏的。

Tech lead 是杂交角色，管一小摊，正式权力很少。真正拉开差距的，是让周围人更好用。她引用 Kate Heddleston：「A 10x engineer isn't someone who is 10x better than those around them, but someone who makes those around them 10x better.」

决策她拆成两类。Type 1 难撤销，离职、卖公司。Type 2 可逆，学一门新语言、接一场演讲、接一个晋升。当 tech lead 多半是 Type 2，别熬夜纠结。搞砸了还能回去写代码，前提是手别生。

普通人能拿走的。要不要带人，先问什么事让你满意，再问公司这是 Type 1 还是 Type 2。就算走技术线走到 principal，活也会越来越像理解人，越来越不像比谁写得快。

和现在的关系。她 2020 年辞了经理，2026 年又在带一队人。这队人是 bot。pstack 的 21 条原则，就是「让周围人 10x」写成软件。

### 这工作还 spark joy 吗

[Does It Spark Joy?](https://www.no.lol/2020-01-17-does-it-spark-joy/)，写于 2020 年 1 月，页上日期 2 月 17 日。她公开写过的文章里，这篇传播最广。开头就说，这周从 Netflix 辞职，回去当软件工程师。

故事很具体。skip 临时拉「Org Updates」，她发现自己的经理不在邀请名单里，在工位上哭了。VP 当场问她要不要接这个经理坑。她当时大约入行 5 年，加 2 年失败创业，觉得自己没准备好。几天后还是接了。理由是 Type 2，以及那条贯穿她职业生涯的原则：「do things that scare you. Fears tend to disguise opportunities for personal growth.」

她跟自己约法，每年问一次这还是不是梦中的角色。新经理反问：「what brings you ultimate joy?」她想到 13 岁继父塞来的盗版 Fireworks 光盘，phpBB 论坛，IRC 上喊 roflcopter，用 spacer.gif 切图。那种把空白文档变成一个东西的感觉，当经理以后淡了。带人有成就感，团队也成了，spark joy 的是当 maker。

收尾两句后来反复出现。你可以同时是 IC 和 leader，不必靠经理头衔。Keep doing things that scare you.

她答应下一篇写「personal engineering leadership principles」。no.lol 上没出现。6 年后，那些原则装进了 pstack。

建议阅读顺序。先 Communication，看她怎么理解组织和权力；再 Tech Lead，看她怎么劝人试；最后 Spark Joy，看她对自己动刀。[Changelog #386](https://changelog.com/podcast/386) 是这篇的口述版，通勤听也行。

## Grok Bot 是这三篇的下一章

2026 年 3 月她离开 Meta 去 Cursor，8 月随收购到 SpaceXAI。LinkedIn 写 Principal Engineer，公开身份是做 Grok Bot 和 Cursor，GitHub 写 @xai-org，还在 React Compiler 上。

产品赌注很硬。每个 bot 有自己的名字、记忆、一台带浏览器的云电脑，点真实界面，不靠每家软件都给 API。你合上笔记本，它还在干活，卡在不可逆的步骤才回来问你。

她自己怎么用，写在 8 月 19 日那条 [LinkedIn](https://www.linkedin.com/posts/laurenelizabethtan_cloud-agents-and-cursor-harness-improvements-activity-7495972438262853632-bLQ5) 上，比任何转述都清楚。上月 1000 个 PR，这个月按这个速度能翻倍，靠 cloud agents。Grok Bot 也能拉起 cloud agent。她的四件套：

- pstack，内部叫 `/lauren-mode`，公开叫 `/poteto-mode`，用来保证验证和工程纪律；
- Grok Bot 的 routine 帮她收外围情报，Slack 上的 bug、X 上的用户抱怨、新功能想法，喂给她的 outer loop，她只想下一步该把工厂对准哪；
- pstack 里的 `/goal` `/loop` `/swarm` 跑 Full Autopilot，bot 从接手到验证到提交自己扛；
- 一切跑在 cloud agents 上，她睡觉或电脑关机，bot 也在干活。

1000 个 PR 是她自己报的数，我没有去 GitHub 逐条核对。当「她怎么描述自己的工作方式」看，比当KPI看更有用。

对普通人，洞察不在「月入一千 PR」。

聊天机器人问完就忘。Grok Bot 是常驻同事。你要做的第一件事不是把提示词写得更长，是给它岗位。它管哪一块、什么样算做好、什么事没你点头不能做，写清楚。她在 [MTS 那场](https://www.youtube.com/watch?v=A63sedG-p5Q) 用的比喻是米其林厨房。人是主厨，agent 是后厨。主厨不消失，活变成点菜、尝味、在不可逆的地方把关。2018 年那篇里的 informed captain，现在船长下面是一队失忆但可教的新员工。

第二条，bot 要有自己的电脑。只会在对话框里吐字的助手，进不了你真正用的日历、后台、发帖页。她把这当成产品内核，所以 Grok Bot 不是「更会聊天的 Grok」，是「能登录、能点、能过夜的同事」。普通人最该抄的是这条边界。能撤销的事让它做完再给你看；钱、对外邮件、公开发布，事先锁死。

第三条，人的工作挪到 outer loop。她不再从收件箱里一张张抠 bug。routine 把信号收进来，她决定工厂对准哪里。早报、草稿、待批，是她傍晚要面对的。2018 年那篇 [Commit to Commit](https://www.no.lol/2018-02-28-commit-to-commit/) 在这里变成了 routine。先答应一个回访窗口，再给结论，而不是当场拍脑袋。

对 agent 的未来，她说得比「会不会取代工程师」狠。

[Maven 那场](https://www.youtube.com/watch?v=Cmoh-yR-usA) 开场就是信任。写了很久代码的人，看 agent 自信地第 100 次宣布找到了 smoking gun，其实没打到根上，信任会崩。[pstack README](https://github.com/cursor/plugins/blob/main/pstack/README.md) 里她写：能做的是装备规则、skills、工具、长期记忆，去逼近学习。「The goal isn't more code. It's maximum impact with the least amount of code.」「i don't want to ship like a team of twenty slop artists.」她公开说自己不信 planning，最好的 spec 是代码。

这和 2015 年 DockYard 的 Experience First、2018 年的类型系统、2020 年没写成的领导力原则，是同一条线。经验不要再靠人口口相传。写成 lint、写成 skill、写成运行时证据。pstack 里 prove-it-works 要求对着真实产物验证，编译通过不算数。never-block-on-the-human 要求先做出来再让人纠偏，不可逆的才停。experience-first 还在，用户爽感优先于实现方便。

工程上她仍保留 PR。不是 bot 不会合，是审查和文档是写给人看的。agent 把吞吐量拉到过夜能合栈，人的稀缺变成判断和口味。MTS 标题问 agent 会不会取代软件工程，她的答案不是取代，是主厨还在，后厨换人了。

有一篇课程博客转述过她接近一小时的内部 workshop，说她跑 10 到 20 个 bot、一个 Chief of Staff 分活、自动化约 90% 日常。那是公司发布周的演示口径，我没有对着录像逐句核对。她自己署名、能当第一手的，仍是上面那条 LinkedIn、pstack，以及 MTS、Maven 两场。

> **别指望它记住你。给岗位、给电脑、给 skill、给不可逆时的刹车。你自己站到 outer loop，决定工厂对准哪。**

## 按时间线看她怎么转

技术栈在变，问题几乎没变。怎么让没见过面的人，也能按她的标准把活做对。

### 2012–2017：把客户活开源出去

新加坡设计出身，Monash 读金融，毕业时进了 dean's list。她自己写过，成绩一直很差，高中后差点没学上，靠少年时攒的设计作品集特招进了艺术理工。不是 CS，进 Netflix 面试时她怕的就是这个：「I can't balance a binary tree to save my life.」

2012 到 2013，和人合伙做 ThePriceGeek，价格搜索引擎。LinkedIn 写 10 万以上用户，上过 CNN、Lifehacker、TheNextWeb。省下来的钱雇了开发，开发没成，钱也没了。她后来写，失败的那两年教会她的，是够找下一份前端工作的编程。

Melbourne 做过 Everperform、Homely。Homely 是把 jQuery / Backbone 迁到 React，她写过那套搜索 UI 很多年都没大改。2015 去波士顿 DockYard 做 Ember / Elixir 顾问。这一年她靠博客走进社区：Leah Silber 劝她投 EmberConf，第一场大会她说前两分钟在抖。

对外代表作：

- [Ambitious UX for Ambitious Apps](https://www.youtube.com/watch?v=TlU0m18Pr-Y)（EmberConf 2015，处女讲）；
- [Idiomatic Ember](https://www.youtube.com/watch?v=lP9ap-AKBAM)（EmberConf 2016）；
- [No Handlebars](https://www.youtube.com/watch?v=ZpM4cV7rfj0)（EmberCamp London）；
- [From Front-End to Full Stack](https://www.youtube.com/watch?v=r4ulu8wo_GI)（ElixirConf 2016）；
- 访谈：[Hanselminutes #516](https://hanselminutes.com/516/ambitious-ux-and-ambitious-apps-with-ember-and-lauren-tan)。

文字上，[Experience First](https://www.no.lol/2015-04-10-the-importance-of-being-experience-first/) 先发在 DockYard 公司博客。她把 design 定义成「东西怎么工作」，不只是好不好看。Airbnb 那套 Experience First，后来直接进了 pstack 的 21 条原则。LinkedIn 上她写过，那段时间开源的 Ember addon，到 2020 年 7 月大约 1750 万次下载。这个数我没去 npm 复算，按她自己的记录记在这里。

[I Am Still Learning](https://www.no.lol/2017-05-30-i-am-still-learning/)（2017-05）把职业生涯写成「恐惧课表」：怕什么就去做。那句后来反复出现的原则在这里成型。同年开源 [hiring-without-whiteboards](https://github.com/poteto/hiring-without-whiteboards)，我写这篇时 GitHub 显示 51,869 星：别用 CS trivia 面试，按真实工作招人。

对内能看到的：DockYard 走廊分享 [Black Swans](https://speakerdeck.com/poteto/black-swans-what-they-can-teach-us-about-the-future)（幻灯片后公开）；Netflix 的 Ember 用法在 [EmberFest 2017](https://speakerdeck.com/poteto/emberfest-2017-ember-at-netflix) 讲给外面听。Netflix Tech Blog 上没有她的署名文。

这一段她在教社区「正确写法」。人已经从框架技巧，转向「怎么招、怎么怕、怎么学」。

### 2018–2020：写组织和人，然后走回去写代码

2017 年底升 Netflix EM。先带 Talent Innovation（11 人，她招了 9 个），再到 Studio UI Foundations（12 个资深 UI）。就是你前面读过的那三篇，加上 [Commit to Commit](https://www.no.lol/2018-02-28-commit-to-commit/)、[Strongly Typed Graph](https://www.no.lol/2018-10-28-exploring-the-strongly-typed-graph/)。后一篇像一份公开 RFC，写 Netflix Studio 微服务把类型割裂的问题。

大会上 [Building the World's Largest Studio at Netflix](https://www.youtube.com/watch?v=5_Xj7okmauc)（RubyConf AU 2018）有一句：「Tech alone is not a replacement for a broken culture.」类型系列从 React Rally 讲到 QCon，再到 TSConf [Just Use Any](https://www.youtube.com/watch?v=p5Hwb1YbNMY)。类型是跨团队沟通，落地是影响力，不是宗教。台上她说过「I ship bugs into production.」内部 Pitch to Play 只有摘要，录像没流出。

2020 年 2 月 Spark Joy，回 IC，去 Facebook React。5 月 This Time Is Different，亲手拆掉自己早年的腔。之后 no.lol 停更。Changelog 386 和 [Software Sessions：Senior engineers and baby managers](https://www.softwaresessions.com/episodes/senior-engineers-and-baby-managers/) 是这段的口述。后一场里有一句流传很广的：「Code is merely a side effect of your job.」我没有对着逐字稿再核一遍，按播客页上的记录放在这里。

### 2020–2025：人消失了，产品在说话

进 Facebook React org，先把 RSC 送进生产，facebook.com 补 Safari。2021 短暂管 React Core（React 18、Compiler 第一次 demo），2022 又回 IC，把 Compiler 从 statement-based 重写成 CFG / HIR，开源并带 Working Group。2022–2023 年公开访谈 / 演讲我没找到，这是发现，不是漏链。

对外几乎只剩 React Conf：

- 2020 和 Dan Abramov 做 [RSC 数据获取演示](https://www.youtube.com/watch?v=TQQPAU21ZUw)；
- 2021 参与 [React 18 Keynote](https://www.youtube.com/watch?v=FZ0cG47msEk)；
- 2024 [Forget About Memo](https://www.youtube.com/watch?v=lvhPq5chokM)：自动 memo，Ins 已经在跑；
- 她独立署名的 [Compiler Beta](https://react.dev/blog/2024/10/21/react-compiler-beta-release)（2024-10-21）：Meta 里只有约 8% 的 PR 手写 memo，这些 PR 要多花 31–46% 时间（控制了作者年资、diff 长度和其他混淆因素）；
- 2025-10 和 Joe Savona、Mofei Zhang 发 [Compiler 1.0](https://react.dev/blog/2025/10/07/react-compiler-1)，同日 [React Conf keynote](https://www.youtube.com/watch?v=zyVRg2QR6LA)。官方写：Quest Store 等应用首屏和跨页导航最多快 12%，某些交互快 2.5 倍以上，内存持平。她 LinkedIn 上写，这套东西跑在 Instagram Web、Threads、Quest Store、Facebook.com 上。

对内没流出：她创办的内部播客 Inflection Points（LinkedIn 说有数千听众），以及 Compiler / RSC / useEffectEvent 的 RFC。engineering.fb.com 没有她的署名文。

Compiler 做的事，和后来的 pstack 是同构的。把容易忘、容易写错的纪律，从人的脑子里搬进默认路径。你不用每次想起 `useMemo`，编译器替你记。你不用每次想起「对着真实产物验证」，pstack 替你拦。

### 2026：原则做成了 skill，对象换成 agent

3 月去 Cursor，公开说过 Cursor 3 性能、Agents Window、Grok Bot。8 月随收购到 SpaceXAI。缺了 6 年的领导力原则，以 skill 的形式出荷。对象从 Ember 社区、Netflix 团队、React 用户，换成失忆的 agent 舰队。

她开源 pstack 时写：自己的 Cursor skills 上周被工程团队用了 10,000 次，所以开源。核心是 `/poteto-mode`：读你的请求，匹配 22 本 playbook 里的一本，按步骤去调其他 skill。21 条原则在任务开始时先读一遍索引。prove-it-works 要求对着真实产物验证。never-block-on-the-human 要求先做出来再让人纠偏。experience-first 还在。encode-lessons-in-structure 要求把教训写成 lint、flag、运行时检查，而不是再加一段字。

Grok Bot 是给所有人的那一层。pstack 是给愿意较真的工程师的那一层。

## 社区和开源，她到底留下了什么

我把她对社区的贡献压成三层，一层比一层更接近「经验不要靠人口口相传」。

第一层是讲。2015 到 2019，她几乎把 Ember、Elixir、TypeScript 的正确写法讲了个遍。处女讲前两分钟在抖，后来 EmberConf 连讲三年。Hanselminutes、Changelog、Software Sessions，是她把「怕什么就去做」和「IC 也能是 leader」讲给更多人听。这一层的贡献是：一个非 CS 的人，把自学路径公开了。后来的人少走几年弯路。

第二层是清单和仓库。[hiring-without-whiteboards](https://github.com/poteto/hiring-without-whiteboards) 到今天还在更新，5.1 万星。它不是一个框架，是一份「别用白板考算法 trivia」的公司名单。她自己进 Netflix 时怕的就是这个。社区贡献有时候就是把一件自己踩过的坑，变成别人可以抄的清单。DockYard 时期的 Ember addon，是把客户活开源出去——顾问做完就走，addon 留下。

第三层是默认路径。React Compiler 不是又一篇「请记住手动 memo」的博客。它把这条纪律搬进编译器。pstack 不是又一篇「请记住工程原则」的博客。它把原则搬进 agent 每次开工都要读的索引。Grok Bot 不是又一篇「请记住给 AI 写清楚提示词」的博客。它把岗位、电脑、过夜、不可逆刹车做成产品。

> **经验不要靠人口口相传。写成 lint、写成 skill、写成运行时证据。**

开源在她这儿，不是 star 数游戏。是把标准从她脑子里搬出去，让没见过她的人也能按这个标准干活。agent 来了之后，这件事只是更急了。agent 比新员工更失忆，口口相传对它完全无效。

对内几乎拿不到的，我也列在这里，免得你以为我收齐了：Netflix guild 笔记、Studio 设计文档、Meta RFC、Inflection Points 整季。她自己列过但没有录像的：OpenCamps NYC、SV Ember、2019 内部 Pitch to Play。Ember Weekend、Elixir Fountain、single-threaded 只有活动页，音频没找回。Strange Loop、LeadDev、SED、JS Party 客座都没找到。LinkedIn Pulse 那篇 *What they don't tell you about growth as an Individual Contributor* 标题在，链接没抠出来。

## 学什么，为什么学，学不到会怎样

好了，我认为普通人能拿走的，其实就这四条。

**第一条。每年问一次，这工作还让你想把空白变成东西吗。**

Spark Joy 不是鸡汤，是她给自己写的离职手续。带人有成就感，团队也成了，spark joy 的是当 maker。她 2020 年辞经理，2021 年在 Meta 又管了九个月 React Core，2022 年又走回去写 Compiler。IC 和 manager 可以来回摆，前提是手别生，每年真的问一次。

学不到会怎样。你会在一个已经不 spark joy 的位置上，用「我还没准备好」和「再干一年看看」把自己熬住。Type 2 的决策被你当成 Type 1 熬夜。怕，往往标着成长；舒服，往往标着停滞。她 2017 年写过：现在最怕的，是自己变得太舒服。

**第二条。软件问题多半是人的问题。新工具解决不了沟通已经烂掉的团队。**

微服务当时是这样，agent 舰队现在也是这样。先有岗位、边界、谁来当船长，再堆 bot。2018 年她写「There are no silver bullets。」2026 年她写「i don't want to ship like a team of twenty slop artists。」两句话中间隔了八年，对象从架构换成了 agent，判断没变。

学不到会怎样。你会抄她的 1000 个 PR，抄她的 20 个 bot，抄她的 Full Autopilot，然后发现仓库里全是编译通过、产物不对、没人敢合的 diff。信任崩一次，团队会退回「还是我自己写吧」。Maven 那场她讲的就是这个：agent 第 100 次自信地宣布找到 smoking gun，其实没打到根上。

**第三条。带人的本质是让周围人更好，不是自己当 10x。现在「周围人」可以是 bot。**

你要编码的是口味和验证，不是又一段提示词。pstack 的 21 条里，我最想让你记住的不是全部，是这四条：experience-first（用户爽感优先于实现方便），prove-it-works（对着真实产物验证，编译通过不算数），never-block-on-the-human（能撤销的先做，不可逆的才停），encode-lessons-in-structure（教训写成结构，不要再写成一段字）。

学不到会怎样。你会把 agent 当更好的搜索框。提示词越写越长，它还是下一回合就忘。你会自己变成瓶颈：每一步都等你点头，过夜的工厂开不起来。你会用 LOC 衡量产出，然后奇怪为什么 slop 越来越多。她写得很白：目标不是更多代码，是用最少的代码换最大的影响。

**第四条。对 agent，别指望它记住你。**

给电脑、给记忆、给 skill、给不可逆时的刹车。你自己站到 outer loop，决定工厂对准哪。审查仍然留给人。Grok Bot 是给所有人的那一层：名字、岗位、云电脑、过夜。pstack 是给愿意较真的工程师的那一层：playbook、原则、验证。

学不到会怎样。你会一直停在「更会聊天的助手」这一层，进不了「能登录、能点、能过夜的同事」这一层。日历、后台、发帖页，它都进不去。你合上笔记本，它就停了。你的工作永远是 inner loop：一张张抠 inbox，而不是决定下一周工厂对准哪。

> **主厨还在，后厨换人了。人的稀缺变成判断和口味，不是敲键盘的速度。**

为什么现在学，而不是等工具再成熟一点。

会过期的是工具的用法。Grok Bot 的入口、套餐、额度，过三个月可能就不一样了。不会过期的是她十年没变的那条线：经验写成默认路径，沟通当损耗处理，带人是让周围人 10x，怕什么就去做。

你现在不学，不是会错过一个产品。是会用旧工厂的皮带，去接一台新电机。电来了，厂房还是围着那根传动轴排的。Howie Xu 课上讲过这个故事，Paul David 1990 年那篇《The Dynamo and the Computer》写的就是这件事：技术到了，生产率要等人们想明白流程不用再围着旧动力源转，才真正兑现。agent 这件事，我觉得我们还在「换电机、不拆轴」的阶段。

她已经把轴拆了。不是因为她更先知，是因为她从 Ember 社区、Netflix 组织、React Compiler，一路都在做同一件事：别让标准停在某个人的脑子里。

## 你明天能怎么用

我把这篇能落地的部分收成四件事，都是今晚或者这周能动的：

1. **先读那三篇，按 Communication → Tech Lead → Spark Joy 的顺序。** 加起来 20 分钟。读完问自己一句：你现在的位置，还 spark joy 吗？这是 Type 1 还是 Type 2？
2. **给你正在用的 agent 写一份岗位，而不是再写一段更长的提示词。** 它管哪一块、什么样算做好、哪三件事没你点头不能做。能撤销的让它做完再给你看。钱、对外邮件、公开发布，先锁死；
3. **挑一件你重复做过五次以上的手工活，写成 skill。** 复现一个 bug、发一次版、review 一类 PR。判断标准很简单：如果你能对一个新同事口述这套流程，你就能写成 skill。agent 记不住你，skill 可以；
4. **装 [pstack](https://cursor.com/marketplace/cursor/pstack)，跑一次 `/poteto-mode`，盯它怎么验证。** 别一上来抄她的 1000 个 PR。先看它声明 done 的时候，有没有对着真实产物跑过。编译通过不算数。

若只听 / 读五份：

1. [I Am Still Learning](https://www.no.lol/2017-05-30-i-am-still-learning/)
2. [Does It Spark Joy?](https://www.no.lol/2020-01-17-does-it-spark-joy/) + [Changelog 386](https://changelog.com/podcast/386)
3. [World's Largest Studio](https://www.youtube.com/watch?v=5_Xj7okmauc)
4. [Forget About Memo](https://www.youtube.com/watch?v=lvhPq5chokM) 或 [Compiler 1.0](https://react.dev/blog/2025/10/07/react-compiler-1)（Compiler 1.0 的 React Conf 录像在 [这里](https://www.youtube.com/watch?v=zyVRg2QR6LA)）
5. [pstack 那篇 X](https://x.com/poteto/status/2058975157503570132) 或 [LinkedIn](https://www.linkedin.com/posts/laurenelizabethtan_cursor-pstack-the-skills-behind-10000-activity-7465439429042737152-ADbv)

## 写在最后

如果把这十年压成三句话，我会留下：

1. **怕什么就去做。能撤销的别熬夜。每年问一次，这工作还让你想把空白变成东西吗。**
2. **经验不要靠人口口相传。写成 lint、写成 skill、写成运行时证据。**
3. **别指望 agent 记住你。给岗位、给电脑、给刹车。你站到 outer loop，审查留给人。**

一个人真正相信的东西，你问她任何问题，她都会绕回去。2015 年她绕回 Experience First，2018 年绕回沟通损耗，2020 年绕回 spark joy，2024 年绕回别再手写 memo，2026 年绕回失忆的新员工。绕回来的是同一件事。

以上是我的读后感。公开材料我对过原文的，是那三篇组织文、Experience First、This Time Is Different、Compiler Beta / 1.0、pstack README，以及她 8 月那条 LinkedIn。MTS / Maven 两场我没有对着逐字稿再核一遍。1000 个 PR、10,000 次 skill 调用，都是她自己报的数。

这四条里，你最不认同哪一条🤔 也欢迎你来吐槽我。尤其是「学不到会怎样」那里——如果你已经用 agent 舰队跑起来了，沟通却没有烂，我很想听听你是怎么做到的。
