---
title: '一天几百个 PR 有什么意义？我照着 SpaceXAI 工程师 Lauren（@poteto）的九类清单，把自己的活拆了一遍'
keywords: Lauren Tan, poteto, Emil Kowalski, Jacob Gold, PR, code review, agentic code review, Bugbot, pstack, 米其林厨房, ContextEcho, Grok Bot
date: 2026-10-09T19:24:00+08:00
lastmod: 2026-10-09T19:24:00+08:00
draft: false
description: 'Lauren 上个月往生产环境发了 2,500 个 PR，背后是很多条并行的工作线、按风险分级的审核，还有她一直在讲的信任。我照着她的九类清单把自己的活拆了一遍，也聊聊普通人可以从哪里开始。'
categories: [AI]
tags: ["AI", "Lauren Tan", "Agent", "Code Review", "pstack"]
comments: true
author: MaiYang
x:
  url: https://x.com/MaiYangAI/status/2108519046446727633
  views: 19100
  replies: 3
  reposts: 1
  likes: 28
  bookmarks: 63
  updated: "2026-10-19"
---

![一天几百个 PR 有什么意义](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/hundreds-of-prs-a-day-nine-work-lines-1.jpg)

朋友们好呀，我是 SpaceXAI Ambassador MaiYangAI。

这篇想聊三件事。

- Lauren 上个月往生产环境发了 2,500 个 PR，背后是很多条并行的工作线、按风险分级的审核，还有她一直在讲的**信任**。
- 我们大多数人没有她那样的条件，可她说的大公司的问题，已经落到每个带着 agent 干活的人身上。普通人可以从哪里开始，我放在最后。
- 我照着她的**九类清单**把自己的活拆了一遍。拿我自己的业余项目 ContextEcho 来说，从 4 月到 10 月初，大概有 1,020 个 commit，走 PR 合并的只有 18 次。

## 起因是 Emil 的一个问题

10 月 9 日凌晨（今天），Linear Designer Engineer **Emil Kowalski**（[@emilkowalski](https://x.com/emilkowalski)）在 X 上问了一句：***“Can someone help me understand how shipping 100s PRs a day makes sense?”*** 他想知道一天发几百个 PR 到底有什么意义，为什么非得发这么多。他还补了一句，说自己可能只是还不够 AI-pilled，是真心想弄明白。

https://x.com/emilkowalski/status/2108270779200852148

Emil 在 Linear 做 Design Engineer (设计工程)。这条帖子发出六个小时左右，就有了 15 万浏览、1300 多个赞、180 条回复，想问同一个问题的人显然不少。他在楼下又说得更直接一点，推这种说法的人大多在 token 公司，自然希望大家多用 token，他想不出一天 100 个 PR 能放些什么，可看起来真有人这么干。（原帖 https://x.com/emilkowalski/status/2108273062517071997 ）

在推文的回复里面，很快就分成两派。***支持的人***说，小而原子的 PR 好审、好回滚，用 git worktree 可以让好几个 agent 同时干活。***怀疑的人***说 PR 数量是虚荣指标，有人直接问，那么多 PR 合进去，到底有多少用户问题消失了。

这几条回复的原帖依次在：

https://x.com/abysmal_pepto/status/2108304504684777888 、 https://x.com/dusangran/status/2108294033340768601 、 https://x.com/pmjohnson/status/2108283256084766978 、 https://x.com/hexablob/status/2108318903709368829

我把回复也都看了，然后又看了 Lauren（[@poteto](https://x.com/poteto)）后面接着发的几条 X。

## Lauren 怎么答

### 九类清单

赞最多的回复来自 Lauren。她说自己同时在推很多个项目，加起来数量很容易就上去了，她列了**九类清单：**

1. 持续的性能优化
2. 用户报上来的 bug
3. 持续重构 Grok Bot 的代码库，让它对 agent 更友好，也帮团队跑得更快
4. 持续改进自己的 skill
5. 新功能
6. UI 打磨
7. 改进 harness
8. Grok Bot 性能相关的开发工具、发布管理和可观测性
9. 其他个人项目

https://x.com/poteto/status/2108279582088671583

她说这些全用 **pstack** 在跑，靠 agent 能覆盖非常大的宽度，成为 10x 工程师很难，但确实可能。pstack 既有 Cursor plugin 也有 Grok Bot。

- https://github.com/cursor/plugins/tree/main/pstack
- https://x.ai/bot/plugin/9717366

对我更有用的是她给我们列出的这**九类清单**。一天上百个 PR，拆开看是九条工作线各自往前走，每条线交几个，叠起来就很多了。

### 谁来审

Emil 接着问了最要紧的一个问题，这些 PR 是不是都不用人审，还是只审大的？Lauren 回答，他们有 agentic code review，每个 PR 先评估风险，低到中风险的不需要人审，直接合并，另外还有 Bugbot。

https://x.com/poteto/status/2108283057581195413

### 回复里面的追问

也有人在下面反讽。他把 Lauren 的清单抄了一遍，在性能优化、bug 修复、代码重构后面各加一句，意思是这些活都是代码发太多发出来的。Lauren 回他，大公司在有 agent 之前就一直有这类工作，这就是大团队维护软件的成本，要不然大公司为什么雇那么多工程师。（反讽原帖 https://x.com/msdGYT/status/2108280539383742855 ，Lauren 的回复 https://x.com/poteto/status/2108281063852413046 ）

另一个人追问她到底怎么同时推这么多项目，她说工程师的新工作就是把这件事想清楚，她也没说自己的流程已经完美，只是把学到的东西分享出来，边用边学。（追问原帖 https://x.com/20minCode/status/2108281588513447974 ，Lauren 的回复 https://x.com/poteto/status/2108282476938633325 ）

### volume does matter

过了一会儿，Lauren 又引用 Emil 的帖子写了一篇长帖，开头就是 **volume does matter，量是重要的**。她的意思我大概转述一下。

https://x.com/poteto/status/2108290818746528017

以前大家看影响力，不看数量。一行配置改对了，可能帮公司省下几百万美元。量只在两头会被拿出来说，一头是表现吃力的人，另一头是那种关起门来、出门时抱着一摞 PR 解决一大堆问题的 coding machine。agent 来了以后，每个人都有机会成为 coding machine。如果你的产出还和以前一样多，她觉得值得停下来想想为什么。

她反复提**信任**。没下功夫让自己能信任 agent 的产出，产能就很难放大。她也承认这样要花更多 token，她按每单位智能的成本来算，这比雇一大群高薪工程师便宜，而且会越来越便宜。最后她说，工程师的工作已经变了，要造的是那台写软件的机器。有人叫它软件工厂，她更喜欢叫**米其林厨房**。

## 2,500 个 PR，和 Jacob 的 250 个

我读下来，Lauren 的上百个 PR 背后有三样东西。很多条并行的工作线，一套按风险分级的审核，还有她一直在讲的信任。她 9 月 21 日发过一条，讲自己上个月往[生产环境发了 2,500 个 PR，配了一段演讲视频](https://x.com/poteto/status/2102050467505430555)，现在有 350 万浏览、3 万多收藏。我也分别做了中英双语字幕版：

- 一个月怎么合进约 2000 个 PR （中英双语）： https://x.com/MaiYangAI/status/2102344659276099794
- Matt Pocock 访谈 Lauren 如何做到的？ https://x.com/MaiYangAI/status/2106256004346441909

最近，在 SpaceXAI 团队里面有一个 Jacob Gold（[@jacobgold](https://x.com/jacobgold)）晒出他超过 poteto 的 PR 数量，他当前正在做 Origin，Lauren 回 Emil 时也 cc 了他。10 月 5 日他发帖说，要跑在 Lauren 前面可不容易，不过**内部有点竞争是好事**，他这间米其林厨房过去两周已经做到每天合并将近 250 个 PR。

https://x.com/jacobgold/status/2106843104758419459

同一天他又补了一句，他很清楚合并的 PR 数不等于商业价值，只是他在造未来的软件厨房，自己得先天天用上。（原帖 https://x.com/jacobgold/status/2106975237581766972 ）

Jacob 也讲了他怎么放心。他给自己所有的 PR 加了一道检查，拿 PR 的改动去对照他发过的全部提示词，确认这件事确实是他要的，只要有一点可能不是他想要的，就推到他的决策小工具里让他拍板。他说这让他快了很多。人也会审一部分，但校验要能靠 token 扩展上去。（这一句的原帖 https://x.com/jacobgold/status/2107153694303330320 ）

补充： https://x.com/jacobgold/status/2106898268001292290

## 但我们不是 Lauren

我们大多数人都是在有限的资源下，Lauren 则相对是无限的资源。她所在的公司在高速发展，也支持她这样干，她背后有团队，也有公司的投入。我们大多数人是一个人，或者一个很小的团队，还要挤时间做自己的东西。拿她的数字给自己定目标，很容易一上来就泄气。

## 大公司的问题，变成了所有人的问题

Lauren 10 月 5 日还发过一条，讲大公司和小团队的区别，我在下面回了一句“I completely agree.”

https://x.com/poteto/status/2106916667599278365

（我的回复 https://x.com/MaiYangAI/status/2106943685149835611 ）

她说自己管理 agent 的一切，都是从前辈程序员和计算机科学家那里学来的。代码库里的约束，对人和 agent 都是一种解放。小团队以前可以信任同伴把代码写好、审好，不太需要深想这件事。大公司在有 agent 之前就得解决它，先有 human slop，才有 agent slop。办法就是约束，lint 规则、更聪明的编译器和诊断、高质量的测试、在可观测性上的投入。

那条里我最认同的一句是，agent 的到来，让大公司的问题变成了所有人的问题。好消息是这些都不新鲜，就是好的工程。

对普通人来说，这句比一天几百个 PR 更重要。你一个人带着几个 agent 干活，就已经碰上一个大团队的问题了。产出一多，谁来审，哪些能放心合进去，哪些要自己看，这些问题不会因为你团队小就绕开你。

## 我自己的真实情况

### 我现在怎么干活

我的工程以前主要在 Cursor 里做，现在在逐渐往 Projects 迁，用 Grok Bot 加 Cursor cloud agent。Projects 我刚开始用，还没摸索出适合自己的方式。

一天 100 个 PR，对我来说确实很难。在 Cursor 的 agent window 模式里，高频工作的时候，我一天能交掉 20 到 30 个改动。这个数很依赖输入。你给的输入越多，越能有针对性地加约束、加校验、定判断方法。

### 1,020 个 commit，18 次 PR

这些改动不全是 PR。ContextEcho 没有每个改动都走 PR，它不涉及协作，项目本身也比较小。我翻了一下仓库，从 4 月到现在一共 1,020 个 commit，最多的一天有 54 个，一天 20 个及以上的有 17 天。通过 PR 合并的只有 18 次。

我觉得 PR review 的价值在于影响面和质量保障。改动牵涉的范围越大，越值得多一道审核。Lauren 那边按风险分级，低到中风险直接合，其余的再让人看，也是把审核的力气花在影响面大的地方。ContextEcho 就我一个人在改，影响面小，我就没让每个改动都走一遍 PR。

另一部分任务，我交给 Grok Bot 承接。我直接交代任务，它自己去完成，做完交回来。这样算下来，每天并行的事情就很多了，你看看我非工作日在 X 上的输出就知道。

### 我的九类

我照着 Lauren 的九类清单，把自己手上的工作也分了分。

1. ContextEcho 的 iOS 迭代，新功能、bug、界面打磨都在里面，Cursor agent window 为主，慢慢在往 Projects 和 Cursor cloud agent 迁
2. ctxly.ai 和 castmind.ai 两个网站，Cursor 开发的，做得比较早，近期没多少要维护的
3. 每天的 AI 资讯和 X 信息流简报，Grok Bot 承接
4. X 上的推文分析和长文起草，Grok Bot 承接，我定角度、改稿，发布键我自己按
5. 小红书笔记，Grok Bot 承接，同样由我自己发
6. 视频精品大片和中英字幕，Grok Bot 承接
7. 播客推荐和深读，Grok Bot 承接
8. 每天一张的日推小卡，Grok Bot 承接
9. 线下 Meetup，Grok Bot 承接，连分享要用的 PPT 也是它准备的
10. bot template 和 skill 的维护，主要在 Grok Bot，项目里的 skill 跟着项目走，不分 Cursor 还是 Grok Bot
11. 跑步训练，Grok Bot 读手表数据给建议

Meetup 的 PPT 是 10 月 8 日晚上的事，我当时发了一条：“我刚刚用 Grok Bot 做 slides，效果完全超出我预期！！！”主办方对分享 PPT 有严格的格式要求，按原来的方式，我不但要准备分享内容，还要按要求调格式、字体、大小、动画特效。这次分享主题、大纲和详细材料是我原本就准备好的，我把它们和模板、要求一起交给 Grok Bot，剩下的全由它搞定，它还在 Slides 里写好了逐字稿。

https://x.com/MaiYangAI/status/2108197683307634709

### 两张清单的差别

两张清单放在一起，差别很明显。Lauren 的九类大多围着同一个产品转，宽度长在一个代码库里。我的宽度散在产品、内容和社区几头，承接的工具也不一样。有一类我们是重合的，就是改进自己的 skill。我给 Bot 写的那些 skill 和检查规则，跟她改 harness 是同一类活，都在让产出更值得信任。

还有一个差别。ctxly.ai 和 castmind.ai 用户少，近期也没多少要维护的。产品没发展起来的时候，你做不到随时都有那么多开发需求、新特性和 bugfix。硬找活来空耗，没人愿意做，浪费资源，也没有价值。Lauren 的九类能跑满，Jacob 一天能合进去几百个，很关键的一点是他们做的**产品正在高速发展**，有大量用户在用。用户报的 **bug**、要的**新功能**、碰到的**性能问题**，一直在往他们那几条线上送活，公司也在全力往前推。

***需求是真的，量才有意义。***

## 量是怎么长出来的

### 两条路

我觉得普通人的量，大概有两条路。

第一条是时间和问题喂出来的。我迭代 ContextEcho 的时候就是这样。这跟我多厉害没什么关系，迭代时间长了，见多识广，各种问题都碰过，你要给它们做的 harness 自然就多了，能放心交出去的活也跟着多了。

第二条是主动磨刀，磨刀不误砍柴工。专门针对自己的工作场景拆一遍，把两头搭起来。一头是输入加上下文，你要交给 agent 什么材料、什么背景、什么限制。另一头是输出加验证，它交回来的东西，用什么标准判断能不能用。两头搭好，更多的事可以自动处理，你能处理的量自然就多起来了。我写稿的 Bot 就有这样一道验证，起草完先过检查器，再去一遍 AI 味，才交到我手上。

两条路可以一起走。第一条靠时间，急不来。第二条今天就能开始。

### 同时展开一多，人跟不上

回复区里有个人问 Lauren，你到底怎么在脑子里跟住这么多条线？他说每次给 bot 派下一个任务之前，都得先花时间搞清楚它刚才在干什么。（原帖 https://x.com/ExcanatorGames/status/2108288891476181244 ）

这个问题我也没有好答案。同时展开一多，很考验一个人的**并行处理能力和习惯**。我自己的专注力确实下降得很厉害，碎片化很严重，这是实打实的代价。这也正是我当初开发 Contextly App（ ctxly.ai ） 的初衷。

## 最后想说的话

ContextEcho 开发出来的代码，我现在基本不看了，交给 AI 做 code review。

人的品味和判断还是非常稀缺，不能无脑信任所有产物。我的判断花在别的地方，**定方向，定标准，看结果，自己用一遍看体验**。逐行读代码这件事，我交给了 AI。Lauren 那边靠风险分级和 Bugbot 决定哪些要人看，我这边把代码审核交给 AI，把自己的判断留给方向和体验。

一天 100 个 PR 对大多数人还很远。先把手上的工具用顺，比追这个数字有用。

如果今天只做一件事，我建议照着 Lauren 那张九类清单，把你自己的工作也分一次类，再挑其中一类，给它加一条校验。
