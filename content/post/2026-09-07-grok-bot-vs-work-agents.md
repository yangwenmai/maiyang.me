---
title: 'Grok Bot 强在哪，我这几周用下来的判断'
keywords: Grok Bot, SpaceXAI, Codex, WorkBuddy, Work Agent, Channel, Group Chat, Auto-review, skill, routine, Teach a task, Template, marketplace, dr eggbot
date: 2026-09-07T06:32:00+08:00
lastmod: 2026-09-07T06:32:00+08:00
draft: false
description: '在 Grok Bot 深圳 Meetup 之后，很多人都有问：Grok Bot 和 Codex、WorkBuddy 等这类按工作区推进的 Agent，有什么差别？Grok Bot 强在哪？我结合个人经验，简单总结。'
categories: [AI]
tags: ["AI", "Grok Bot", "Agent", "Codex"]
comments: true
author: MaiYang
x:
  url: https://x.com/MaiYangAI/status/2096728181151850917
  views: 58100
  replies: 14
  reposts: 15
  likes: 116
  bookmarks: 255
  updated: "2026-10-09"
---

![Grok Bot 强在哪](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/grok-bot-vs-work-agents-1.jpg)

朋友们好呀，我是 SpaceXAI Ambassador [@MaiYang](https://x.com/maiyangai)。

在 Grok Bot 深圳 Meetup 之后，很多人都有问： Grok Bot 和 Codex、WorkBuddy 等这类按工作区推进的 Agent，有什么差别？ Grok Bot 强在哪？

我结合个人经验，简单总结如下：

![当前阶段，两者可以结合使用](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/grok-bot-vs-work-agents-2.jpg)

## 先看看本质

Work 类 Agent 的中心，是一个项目。你打开工作区或仓库，agent 在这个范围内把活往前推。它很适合「这一个项目的代码怎么改完」。

Grok Bot 的中心，是岗位和角色。你给它一个名字，就相当于给它一份工作。选题、调研、写稿、审模板，每个 Bot 只管一块。需要一起干时，把它们拉进同一个 Channel 或 Group Chat，活在群里交接。

官方产品页有一句：**「Message Bots like teammates。」**桌面和 iOS 是同一条对话。你合上手机，任务还在继续。

![Message Bots like teammates](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/grok-bot-vs-work-agents-3.jpg)

> 补一个经验：发出对话时，要留意是否有被 bot 接收，避免消息遗漏。我自己发生过好几次，明明发了消息，但是过会儿过来看就没有了。原因通常是消息发送未成功。

**我的判断：**Work 和 Grok Bot 在解决的问题是不一样。一个帮你推进项目。一个帮你带（养）一支小队。

## 合上电脑/手机之后，它还在不在干活？

合上电脑/手机，Grok Bot 还能继续。做完了，有需要会等你确认/推进，完成了就留在对话这里，等你回去找他即可。产品页 FAQ 写过，它们可以并行，可以 24/7，即便你的电脑已经合上。

这背后的原因：已经有很多人提到过，Grok Bot 给每个人提供了一台云电脑：8 核16G，120GB SSD 硬盘，网速带宽 900Mbps。

并行、异步的工作，这一点对我很关键。我有本职工作，也有 Meetup、内容、产品。我的时间是很碎片的，我真的不太可能一直盯着窗口看进度。

Work 类也能异步，你电脑打开时，它也能继续工作，它也很强，但交互重心通常还在「这个工作区此刻开着」。离开之后谁接着干、谁来问你，是另一套设计。

## 敢放手，靠的是边界

机器越能干，越要先说清楚哪些事必须停下来问你。

发信、公开发布、花钱、删除或覆盖、改权限，这类动作默认要停下来问。Auto-review 就是干这个的。Settings 里还能加自己的规则。

![Auto-review 设置](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/grok-bot-vs-work-agents-4.png)

本机命令是另一回事。没有明确理由要动你电脑上的文件，就保持每次询问，或设成 Never allowed。这不影响它用自己的云电脑。

## 小队怎么交活

一只 Bot 跑顺了，可以收成 skill。定时要跑，交给 routine。难流程，可以用 **Teach a task** 自己做一遍给它看。

有了这些专职员工，项目复杂就可以让他们拉个群来解决。专职 bot 之间传活，你不当人肉总线。一只 Chief of Staff，加几只 bot，比一个什么都会的大聊天窗口好用。

以我自己举例，最近的社区工作，X 分享内容，我一直在试。之前有分享到「AICon 大会」，Grok Bot 周边设计、活动封面、小游戏等，很多是 Bot 交付给我的，我看了不满意让他们重新做或者我给建议。

## Template ，让各种岗位 bot 更方便搬家和复用

![Grok Bot 精选 marketplace](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/grok-bot-vs-work-agents-5.jpg)

Grok Bot 精选 marketplace: https://x.ai/bot/marketplace

这是 Grok Bot 和多数 Work 类配置相比，最具有差异化和竞争力的地方。至少，我的个人观点是这样的。

别人验过的岗位，可以用分享链接预览，再装到自己账号。装的是身份、说明、skills、routines 这一类打包结果。你的电脑、登录态、聊天记录不会跟着过去。装之前要自己审权限。第三方模板可能代你操作，SpaceXAI 不背书。

> 已知坑：模板预览里能看见的 skills，导入后可能没带上。装完自己核一眼。

## 来自 Lauren 分享的 dr eggbot template

这是 Grok Bot 团队成员 [@poteto](https://x.com/poteto) 最近更开放的一个 template: dr eggbot。

你跟它说几句自己的偏好，它会给你做一个有岗位的 Bot。岗位写清楚，干什么、不干什么，当场就能看。完播友好，也适合用来体会「岗位可复制」到底是什么意思。

![dr eggbot template](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/grok-bot-vs-work-agents-6.jpg)

https://x.ai/bot/93gOz3op1UQdBdbekQFLK

## 怎么选

这一阶段，两边可以一起用。不必硬拆成二选一。

你要推进一个明确的项目或仓库，或者手里已经有一套好用的 Work 类 Agent / harness，那套继续很强。日常分工和路由，社区已经有人分享过用 Grok Bot 来管。复杂活交给上下文治理更好的 harness，两边可以强强联合。

岗位能说清楚、要异步交活、要手机接着聊、还要用 Template 搬家，Grok Bot 这套更贴我的日常。

产品页：https://x.ai/bot

精选 marketplace： https://x.ai/bot/marketplace

欢迎关注、收藏、点赞。你在高频用哪个 Bot，是否有开放 template ，欢迎评论区留言。

