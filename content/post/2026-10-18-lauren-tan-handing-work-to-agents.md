---
title: '非 CS 出身的 Lauren Tan，是怎么一步步放手给 agent 的'
keywords: Lauren Tan, poteto, React, React Compiler, Cursor, Grok Bot, SpaceXAI, pstack, Benny, verification, agent, 信任
date: 2026-10-18T07:41:00+08:00
lastmod: 2026-10-18T07:41:00+08:00
draft: false
description: '2024 年那会儿，Lauren Tan 也不太相信 agent 能写出进生产环境的代码；2026 年 9 月，她一个月往生产环境合了 2500 个 PR。她没读过 CS，大学学的是金融。她的路，对没有 CS 背景的人尤其有参考价值。'
categories: [人物]
genre: notes
tags: ["AI", "Lauren Tan", "Agent", "Grok Bot", "pstack"]
comments: true
author: MaiYang
x:
  url: https://x.com/MaiYangAI/status/2111603532210299234
  views: 112900
  replies: 22
  reposts: 69
  likes: 605
  bookmarks: 1000
  updated: "2026-10-19"
---

![非 CS 出身的 Lauren Tan，是怎么一步步放手给 agent 的](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/lauren-tan-handing-work-to-agents-1.jpg)

Lauren Tan（[@poteto](https://x.com/poteto)）[说](https://x.com/poteto/status/2109110547824378140)，2024 年那会儿，她和很多写了多年代码的人一样，**不太相信 agent 能写出进生产环境的代码，担心垃圾代码会混进漂亮的代码库**。2026 年 9 月 21 日，她在 X 上[发了一条](https://x.com/poteto/status/2102050467505430555)：「here's how i shipped 2,500 PRs last month to production」。

她现在在 SpaceX AI 做 Grok Bot，也是 React 核心团队成员。但她没读过 CS，大学学的是金融，第一次觉得编程好玩，是在金融建模课上写 Excel 的 VBA 宏。学 AI 这件事，我越来越觉得最值得花时间的，是去看顶级的实践者和构建者具体怎么做。她的路，对没有 CS 背景的人尤其有参考价值。

## 一、成长路径：没学过 CS，一步步走到 React 团队

**十三岁，从一套盗版 Fireworks 开始。** 她在新加坡长大，在 [The Changelog #386](https://changelog.com/podcast/386) 里回忆，十三岁左右，继父给了她一套盗版的 Macromedia Fireworks，她一开始「I have no idea what this software is」，就上网搜教程，后来泡在一个网页设计论坛和 IRC 上，靠「查看源代码」看别人的 HTML、CSS 和 JavaScript。她说，要不是那个论坛，她可能根本不会走进编程这一行。十五六岁，她拿到第一份有报酬的活，给学校重做网站。

**大学读金融，在 VBA 宏里重新爱上编程。** 她当时没想到做网页也能谋生，在父母的鼓励下选了更「实际」的专业。按她的 [LinkedIn](https://www.linkedin.com/in/laurenelizabethtan/)，她 2009 到 2011 年在 Monash University 读商科学士（会计与金融），上过 Dean's List，以前 5% 的成绩毕业，2011 年还去 LSE 读了一期商业分析与估值的暑期课程。她在 [React Conf 2025 的团队访谈](https://www.youtube.com/watch?v=NJUXAWTuaTo&t=522)里说，金融建模课的教授教他们写 Excel 的 VBA 宏，「And then I was like, wow, this is so much fun.」尽管成绩不错，她在 [2014 年的年终博客](https://no.lol/2014-12-28-my-2014-in-review-or-how-i-beat-impostor-syndrome/)里写，自己当时还是觉得不行，于是「what I lacked in intelligence, I decided I would make up for with sheer determination and grit.」

**毕业后创业，失败了。** 2012 到 2013 年，她和朋友做 ThePriceGeek，一个跨 eBay、Amazon、Craigslist 的比价搜索，她负责设计和前端。项目进了 2013 年的 Melbourne Accelerator Program，上过 Hacker News 首页。她在 Changelog 里说，最好的时候一个月大概赚 1000 美元，养不活两个全职的人，钱花完就停了。

**在墨尔本边工作边学 JS，把学习写成博客。** 2014 年，她给一家叫 Everperform 的创业公司当第一位工程师，和不懂技术的创始人一起，先在 Photoshop、Sketch 里画界面，再用 Ember.js 写出来；之后去了 Homely，把前端从 jQuery/Backbone 迁到 React。她在 X 上[回忆](https://x.com/poteto/status/2091768756687258052)，那时她是「a nobody in melbourne who was still learning how to code in js」。她学 Ember 时写博客、发推，EmberConf 的组织者顺着推文找到她，邀请她投稿演讲。她连会都没参加过，在班上做报告都会发抖，第一反应是「No way」，组织者一直鼓励，她才投了稿。被选上后，她给自己倒排了三个月的准备计划，上台头五分钟一直在发抖，但练过的内容都记住了。几年后她在[博客](https://no.lol/2017-05-30-i-am-still-learning/)里写：「If you're not afraid, you're too comfortable.」

**DockYard：第一份「real job」，搬到美国。** 她说那场演讲之后「my life changed」。2015 年 4 月，她进了波士顿的 DockYard 当 Senior Developer，用 Ember 和 Elixir 给客户做项目。她一边上班，一边继续发推、继续演讲。

**Netflix：从工程师到经理，再回到工程师。** 进 Netflix 也是靠一场演讲。她说自己没主修过 CS，是自学的程序员，FAANG 面试对她来说不可想象，一度想临阵退出。2016 年 7 月她以 Senior Software Engineer 入职，做内部的 studio 工具；2017 年 11 月经理离职，总监请她接手团队，她考虑了一周才答应，后来带过十多人的团队。她在 Netflix 待了近四年，用[她的话](https://no.lol/2020-01-17-does-it-spark-joy/)说，当经理的日子「difficult, lonely, rewarding, and everything in between」，最想念的是当 maker。

**Meta：React 团队六年。** 她在伦敦一场会上认识了 Dan Abramov，后来他问她要不要来 React 团队，她的反应是「uh, hell yes?! but wait, me?」，还说「massive imposter syndrome」一路跟着她。2020 年 3 月她以 Staff Software Engineer 加入 Facebook，先在 React Data Core 做 Server Components 等工作；2021 年 11 月到 2022 年 8 月，她当了 React Core 的工程经理，期间发布了 React 18；之后又回到工程师岗位，主攻 React Compiler 的重写和开源发布。她[离开时写道](https://x.com/poteto/status/2036536104468488654)，在 React Conf 上发布 React Compiler 会是她职业生涯的高光之一。

**低谷，然后 Cursor。** 她[说过](https://x.com/poteto/status/2077644468615106995)，早在前一年就想离开 Meta，只是不知道下一步去哪，「every hour spent there felt like agony」。她也[坦白](https://x.com/poteto/status/2105336247548006760)自己那时 burnt out 得厉害，甚至以为自己不再适合当工程师。她休息了一个月，第一次尝试做 agent 编排器，[从头重写了 6 次](https://x.com/poteto/status/2093056048055906509)。发现自己在公司一小时都坐不住，做自己的项目却能一天干 16 个小时还很开心，她就知道该换了。2026 年 3 月她[加入 Cursor](https://x.com/poteto/status/2036536104468488654)，LinkedIn 上写这段经历「Shipped Cursor 3 and Grok Bot」；8 月 Cursor 被收购后，她成了 SpaceXAI 的 Principal Engineer。

她在 X 粉丝过 5 万时[总结过这一路](https://x.com/poteto/status/2091768756687258052)：**每一份工作都来自在这里结识的人，「i owe my entire career to it.」**

## 二、信任是一点点攒出来的

还有个细节挺让人放松的。她在[《How I Use Cursor》](https://x.com/poteto/status/2058975157503570132)里坦白，去 Cursor 面试之前，她其实没用过 Cursor，为了做面试项目，才用它写了两天。

她在那场 2500 个 PR 的[分享](https://www.youtube.com/watch?v=ZroPT--sy5E)里讲得很清楚，数字从来不是目标，她要的是信任：自己不在场的时候，agent 也能交出高质量的活。

刚加入 Cursor 时，她每天对着 Chrome DevTools 抓性能 trace、拍内存快照，手工到她自己都烦了，开始想：「wait, we have agents. What am I doing?」她后来写道：「The bottleneck with agents is verification.」agent 写代码很快，难的是确认它写对了。于是她开始写验证类的 skill，让 agent 自己把应用跑起来，自己抓 trace、找热点、一点点把性能往上推。

她对 agent 的看法很冷静：「Agents are like new hires in a constant state of amnesia and idiocy.」它们记不住你说过什么，也不会真的学会新东西，只能靠 rules、skill、工具和长期记忆去近似。

她把用 agent 的过程讲成一条往上爬的曲线。她说自己一开始也在「一到五个」这个区间：每个对话都得盯着，不停纠偏，人一走开 agent 就会做错。她认为这一段反而最难走出去，因为不知道该从哪儿下手。之所以没法从五个跳到一百个，是因为你还不信任它们的产出。不信任就硬开一百个子 agent，结果只会是一堆低质量 PR、回归和 bug。

怎么建立信任？她 10 月中旬[发过一条帖子](https://x.com/poteto/status/2111133080526495985)，把办法排成一个倒金字塔，越往上越该多花力气：

1. 改代码库本身：更好的架构、更强的类型和不变量、清晰的边界。agent 爱照抄现有代码、爱走最短的路，那就让最省事的那条路正好是对的。
2. 静态分析：lint、测试、CI，在问题出现前就拦住。
3. 文字：注释、rules、AGENTS.md、skill，这些靠 agent 自己判断、没法强制的东西，少用，但要用。
4. 人工审查：最难扩展的一层。agent 合代码的速度太快，不可能每个 PR 都细看，所以人的精力要花在设计一个让 agent 默认就做对的环境上。

她 8 月[发过一句](https://x.com/poteto/status/2089067865098113024)更直接的：「every time you intervene and correct your agent, you should think about how to eliminate it entirely.」10 月又[补了一句](https://x.com/poteto/status/2109699980248408574)「your codebase is memory」：agent 反复犯的错不变成约束，就会像病毒一样一直复制下去。

## 三、懒，是很实在的动力

在做 Grok Bot 之前，她先给自己做了一个 bot，叫 Benny，头像是一只小狗。她在[一段访谈](https://www.youtube.com/watch?v=UxxXL91CC_w)里说：

> I'm a fairly lazy person. … we're getting so many bug reports for Cursor, right? And I wanted to just fix them all.

她想的是，怎么让 agent 在她睡觉时自动把 bug 修掉。很多人来问她 Benny 怎么做的、自己能不能也有一个，她说这启发了 Grok Bot 的一部分想法：每个人都能定义自己的 bot，给它身份、自己的电脑、日常任务和自动化。现在别人给 Grok Bot 提反馈，她的 bot 会自动去修，她负责 review 代码。问她现在的工作是什么，她说自己「almost like a manager for my digital colleagues」。

Grok Bot 是一个团队一起做出来的。她在[发布当天](https://x.com/poteto/status/2087227636590465030)写的是「we just launched Grok Bot」，自己说最骄傲的一块是客户端架构：最早是一个很糙的原型，后来她用自己在做的一个 agent 友好框架（暂定代号 Dune）把它整个重构了。这个框架的目标，是让上下文很少的 agent 也能默认写出高质量代码。

她开源的 [pstack](https://github.com/cursor/plugins/tree/main/pstack) 里也带了一个叫 benny 的自动化包，默认不启用，做的也是这件事：分拣 Slack 上的问题报告，复现并修掉确认的 bug。

## 四、普通人能照着做的几件事

她的机遇不是每个人都有，但下面这些，今天就能开始：

1. **边学边公开。** 她进 EmberConf，靠的是学 Ember 时写的博客和推文。不用等学成了再发，学到哪写到哪，别人才有机会找到你。
2. **列一张害怕清单。** 她把「不害怕就是太舒服」当信号用。写下你最近因为怕而没做的一两件事，比如投稿、发第一条长帖、去面试，挑一件去试。
3. **从最烦的那件重复活下手，先自己走一遍。** Benny 的起点就是 bug 太多、她不想一个个手修；验证 skill 也是在她手工抓了很久 trace 之后才写的。先把流程亲手走通，你才知道该让 agent 怎么做、怎么算做对。
4. **动手前先定义怎么验证。** 给 agent 一个检查自己的办法：做网页就让它打开页面截图，写脚本就让它跑一遍贴结果。pstack 里的 **/create-verification-skill** 可以帮你生成这样的 skill。
5. **少开几个，盯清楚。** 先跑一到五个，看它们具体在哪里犯错，别急着堆数量。
6. **同一个错，往上提一层修。** 第二次纠正同一个问题时，能写成检查就写成检查，能改结构就改结构，文字说明放最后。pstack 的 /correct 就是干这个的。想要自己的 mode，可以试 /automate-me，它会照你的工作记录起草一个。
7. **每年问自己一次，还兴奋吗。** 她当经理前就跟自己约好，每年重新评估这还是不是梦想中的工作，不是就回头。用 AI 也可以这样，给自己定个回看的时间。

## 五、我自己做到哪了

我也在用 pstack 和 poteto-mode，日常的活大多交给一组 bot：找选题、做字幕和剪辑、写初稿、做封面。看起来挺「自动化」了，但对照她那条曲线，我大概还停在第一段。

说实话，我每个关键节点都还在盯：成片要我看过，文案要我看过，发不发要我点头。有些是该留的把关，有些其实是我还没给 bot 足够的验证手段，只好自己当那个验证器。她那个倒金字塔我也是反着来的：同样的问题出现第二次，我多半还是在对话里再提醒一遍，很少把它变成一个自动的检查。

接下来想做的，就是把这些「盯着看」一条条变成 bot 能自己跑的验证。信任攒够了，再放手。

## 结尾

10 月 8 日，她发了[一条只有两行的帖子](https://x.com/poteto/status/2108299315764777171)：

> you should be more ambitious
>
> way more ambitious

不是每个人都有这样的机会，但是不做就一定没机会。先付出，先努力去做。

## 参考资料

- [Lauren Tan 的 LinkedIn](https://www.linkedin.com/in/laurenelizabethtan/)，学历和每段工作的时间、职位。
- [My 2014 in review, or how I beat impostor syndrome](https://no.lol/2014-12-28-my-2014-in-review-or-how-i-beat-impostor-syndrome/)，她 2014 年的年终博客，讲冒名顶替感和 grit。
- [I am still learning](https://no.lol/2017-05-30-i-am-still-learning/)，2017 年博客，讲恐惧和舒适区。
- [Does it spark joy?](https://no.lol/2020-01-17-does-it-spark-joy/)，2020 年博客，从工程经理回到工程师的决定。
- [The Changelog #386: Engineer to manager and back again](https://changelog.com/podcast/386)，2020 年播客访谈，讲童年自学、读金融和 The Price Geek。
- [React Conf 2025 团队访谈](https://www.youtube.com/watch?v=NJUXAWTuaTo&t=522)，她讲自己从 Excel VBA 宏学会编程。
- [粉丝过 5 万时的感谢帖](https://x.com/poteto/status/2091768756687258052)，从 EmberConf 到 DockYard、Netflix、React 团队的经历。
- [This week I joined Cursor](https://x.com/poteto/status/2036536104468488654)，2026 年 3 月加入 Cursor，感谢在 React 的 6 年。
- [想离开 Meta 的那段](https://x.com/poteto/status/2077644468615106995)，休息一个月做 side project 后决定换工作。
- [burnt out 之后](https://x.com/poteto/status/2105336247548006760)，她说曾以为自己不再适合当工程师。
- [加入 Cursor 前的 side project](https://x.com/poteto/status/2093056048055906509)，编排器重写了 6 次。
- [How I Use Cursor](https://x.com/poteto/status/2058975157503570132)，X 长文，面试前没用过 Cursor、agent 像失忆的新员工、验证是瓶颈。
- [here's how i shipped 2,500 PRs last month](https://x.com/poteto/status/2102050467505430555)，她在 X 发布的分享视频，讲信任曲线。
- [怎样更信任 agent 的产出](https://x.com/poteto/status/2111133080526495985)，四层倒金字塔。
- [让 agent 验证自己的工作](https://x.com/poteto/status/2109436202554372476)，最基础的一步。
- [your codebase is memory](https://x.com/poteto/status/2109699980248408574)，把反复出现的错变成约束。
- [每次纠正都想办法让问题彻底消失](https://x.com/poteto/status/2089067865098113024)，纠错的优先顺序。
- [Grok Bot 发布帖](https://x.com/poteto/status/2087227636590465030)，客户端架构和 Dune 框架。
- [Grok Bot 发布访谈片段](https://www.youtube.com/watch?v=UxxXL91CC_w)，讲 Benny 的由来（第三方转载）。
- [pstack README](https://github.com/cursor/plugins/tree/main/pstack)，她每天在用的开源 skill 合集。
