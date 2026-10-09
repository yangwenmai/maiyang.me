---
title: '从 Lauren 不信规划说起，我用 Grok Bot 搭 Growth Researcher 踩过的坑'
keywords: Grok Bot, Lauren Tan, poteto, pstack, Plan Mode, Cursor, Growth Researcher, skill, routine, Chief of Staff, 金尘马
date: 2026-09-11T06:22:00+08:00
lastmod: 2026-09-11T06:22:00+08:00
draft: false
description: 'Lauren Tan 在 pstack 里说过一句很反常识话：「I don''t believe in planning. The best spec is code.」最好的岗位说明，不是一上来写得很满、很完整，而是你交出去、改过两轮的那份活。'
categories: [AI]
tags: ["AI", "Grok Bot", "Agent", "踩坑"]
comments: true
author: MaiYang
x:
  url: https://x.com/MaiYangAI/status/2098175391089430539
  views: 4748
  replies: 0
  reposts: 0
  likes: 8
  bookmarks: 14
  updated: "2026-10-09"
---

![从 Lauren 不信规划说起](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/grok-bot-growth-researcher-pitfalls-1.jpg)

朋友们好呀，我是 SpaceXAI Ambassador MaiYangAI。

Grok Bot (ex-Cursor) 的 Lauren Tan（[@poteto](https://x.com/poteto)）在 pstack 里说过一句很反常识话。

> **「I don't believe in planning. The best spec is code.」**

![pstack: why are there no planning skills](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/grok-bot-growth-researcher-pitfalls-2.jpg)

https://github.com/cursor/plugins/tree/main/pstack#why-are-there-no-planning-skills

她也写了 Cursor 的 Plan Mode 很好用。她只是拒绝把「先写一长段计划」设成默认动作。

Cursor 的 Plan Mode 是产品里的规划能力。到了 Grok Bot，很多人也会先把方案、框架、岗位写得很漂亮，再谈交得出手的东西。

最好的岗位说明，不是一上来写得很满、很完整，而是你交出去、改过两轮的那份活。

## 我怎么踩坑？

Grok Bot 刚发布那会儿，我写过入门长文。给它一个岗位，它能把活做完。深圳 Meetup 办完之后，评论区和私信里最常见的一种用法，是一上来就搭营销总监、运营总监、产品总监一整排。

title 倒是很响亮，但实际交出来的东西很一般。

[金尘马在他的 Grok Bot 万字手册](https://x.com/jinchenma_ai/status/2094984812251746424)也写到，岗位名字覆盖太大，长期负责的结果却说不清。规划组织架构的动作，最后养出一群不知道每天该干什么的数字高管。

> 我刚开始研究 Grok Bot 的时候，也想直接创建营销总监、运营总监、产品总监和财务总监，把传统公司的组织架构照搬进去。
>
> 一到派活，问题就出来了。岗位名字很大，长期负责的结果很模糊，最后得到一批不知道每天该干什么的数字高管。
>
> xAI 官方给出的建议，是从一套最小但真正有用的人员配置开始。**先让一个 Bot 完整负责一项结果。工作里出现稳定的专业分工后，再创建新的 Bot。**

我自己在刚开始的时候也有过一次，bot 名 Growth Researcher。

想象很丰满，现实很骨感。我把它的职责岗位写得很清楚，给与了很大的厚望。每天在全世界找增长最好的团队活案例，给我拆策略和理念，写成增长报告。刚开始，我还直接让它给我定工作日早八点的定时任务。它倒是真的会跑。英文研究备忘录动辄一两百行，但是看得我一愣一愣的，一开始以为是英文看不懂，后面改成中文，依旧一脸懵逼。

> 交到我手上的东西，我根本就用不上。

![Growth Researcher 交回来的研究备忘录](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/grok-bot-growth-researcher-pitfalls-3.png)

它先拿「结构」来问我能不能用。我说这个结构依然不行，完全看不懂。后来我直接说，你的增长策略看起来几乎没有，请你不要给我打幌子，我要的是有深度的增长策略判断。9 月 5 日我把它暂停了。原话是「我先暂停了，看起来这里的内容不是我想要的。」我把定时任务也关了。

![暂停 Growth Researcher](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/grok-bot-growth-researcher-pitfalls-4.png)

它忙的是把研究计划、筛选框架、交付模板一次次修到「看起来专业」。我要的是能套到某个方案/产品上。虽然它很积极，很配合，也给我直接产出。但是，可用的却很少。这就是「先计划」心态落到 Bot 上的样子。计划本身变成了工作。

有过这些经历，再加上最近一两周高频用 Grok Bot，我先记个坑。

## 坑 1. 把「计划」当成工作本身

这也是 Lauren 那句话所透露出来的坑。

你让 Bot 先出一份完整方案，它会很乐意写。写完之后你还是要派人去干。中间一层计划，常常变成第二份需要维护的文档。

Growth Researcher 把这层又加厚了一层。它先写跨区研究备忘录，再写淘汰表，再问我结构能不能用，最后才挤出简报。简报过了检查器，也天天换公司名。我读完还是不知道他们的业务是怎么长起来的，这种交付，对我没有什么价值。

我后面慢慢知道，应该可以看以下这三步：

1. 先说清最终要看到什么。
2. 限定材料从哪来、哪些必须先问你。
3. 先交一版能打分的产出物。

**Lauren 说最好的 spec 是 code**。落到 Grok Bot，最好的 spec 是已经验收过的交付物。落到增长岗，最好的 spec 是我会照着他说的那一条策略。

## 坑 2. Skill 和定时开太早

这是 坑 1 的延续，还没有真正交付我认可的产出物，就把它整个流程写入日程。

**Skill 管怎么做。定时管什么时候做。**

我把增长日报创建为工作日早八点，原本以为我自己每天讲学习一个增长案例，策略。没想到，实际上变成我每天定时将其抛弃。原因很简单，内容非常难读，那对我也没有啥用了。

如果重开这类日报，我至少会要求写明实际来源和数据时间。没有当期数据就报错。只完成一部分就要写清未完成原因。这些规则，都要先交几份活之后才写得出来的。

## 坑 3. 一只 Bot 想干整个部门的活

这是我们很多人都常犯的错，一个不知不觉就会犯的错。就好比，「什么时候应该新创建一个 chat」？上下文怎么传递，怎么压缩，何时应该换一个 chat 。这些问题一直都困扰着我们每一个人，而还有一波人，基本上就是一个 chat 走遍天，那他们肯定也想一只 bot 就帮他做所有的事。而这很明显跟 Grok Bot 的定位：AI 队友，完全不符。如果你说：「帮我研究一下 Grok Bot」这种派活，几乎一定换来一份泛泛汇总。

更好的一种开始是你在创建 bot 时，就要尝试回答五个小问题：最终结果、材料来源、限制条件、交付格式、做到哪一步回来确认。

Growth Researcher 的岗位一度写得像整个增长部。全球扫描、策略提炼、理念印证、日报、夜读原文、还顺手帮 ContextEcho 想过图。越宽，越容易交回一份「什么都沾一点、你什么都用不了」的研究产品。

我给 AICon 那只 Bot 定的就很明确。帮我听懂会上的参数和指标，顺手整理会议。它交回来的是我能对着听、对着改的纪要，不是又一份大会观摩框架。窄，才交得出东西。宽，它就在云端散步。

一只跑顺了，再第二只、第三只，再开 Channel。一只 Chief of Staff，加几只专员，通常强过一个什么都会的 mega-chat。

## 顺手再一提，高风险动作别一上来全放开

这条属于权限问题，跟「不信规划」分开看。Grok Bot 能登录真账号、动真文件、打开真网页。发信、公开发布、花钱、删除或覆盖数据，我现在默认先锁住。审批只管接下来要做的那一下。已经做完的，点 Deny 也撤不回去。

我没有把 Always Allow 当第一天必选项。先跑通一次，再决定放开哪一类。[入门文](https://maiyang.me/post/2026-08-22-grok-bot-getting-started-guide/)里也提过。

## 我怎么？

我开始在 Cursor 里尝试使用了几次 poteto mode，体感还不太习惯，可能对于中文的调教还不到位，输出内容有点看不懂。

之前一直在用 Grok Bot iOS App，今天写文章是发现， Grok Bot 也能用 Lauren 的 poteto mode。

我现在对 Grok Bot 的：

1. 简单的任务就直接派出去，改完就存。
2. Growth Researcher 这种，需要先停定时，再重写岗位。
3. 复杂的任务可以先把边界写清，先收到可验收的交付。

## 如果重开 Growth Researcher，我先改这三处

岗位只写一个结果。比如「每周交出 3 条我能直接用在自己产品上的增长动作」，不再为了跑流程去扫全球所有增长数据。

刚开始先看它交出来的结果，我们先看交付物，没问题再说要不要开 routine（定时任务），后续不断的调教 bot，它也会把 Skill 慢慢写深的。

产出的时候禁止只交研究框架、淘汰表、结构征求意见。没有实物交付，不算完成。

你在用 Grok Bot 时是否也踩过这些坑？欢迎评论分享。

