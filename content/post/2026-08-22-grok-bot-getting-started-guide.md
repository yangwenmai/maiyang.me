---
title: 'Grok Bot 门槛又又又降了！Grok Bot 到底可以做什么，从入门到进阶'
keywords: Grok Bot, SpaceXAI, xAI, Agent, Channel, Group Chat, Auto-review, Always Allow, skill, routine, Teach a task, Template, GrokHub, Meetup
date: 2026-08-22T05:51:00+08:00
lastmod: 2026-08-22T05:51:00+08:00
draft: false
description: 'Grok Bot 从 2026.08.11 推出以来就得到大家的广泛关注。它究竟是什么？它可以怎么用？我写下这样一篇简短但是实用的文章，希望可以帮助到大家。'
categories: [AI]
tags: ["AI", "Grok Bot", "Agent", "SpaceXAI"]
comments: true
author: MaiYang
---

![Grok Bot 从入门到进阶](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/grok-bot-getting-started-guide-1.jpg)

朋友们好呀！我是 SpaceXAI Ambassador **Mai Yang**。

[Grok Bot 从 2026.08.11 推出](https://x.ai/news/introducing-grok-bot)以来就得到大家的广泛关注，不过对于还没有接触过的人来说可能会问一个问题：它究竟是什么？它可以怎么用？

带着这些问题，我写下这样一篇简短但是实用的文章，希望可以帮助到大家。

Grok Bot 已经从早期限制 Plan ，到现在基本上 free 都能用，所以已经没有什么门槛会限制住大家了。不管你是 mac，还是 iOS，Android，你只需要去下载即可开始使用。

产品页：https://x.ai/bot ，更多 Grok Bot 介绍： https://x.ai/news/introducing-grok-bot

![Grok Bot 产品页](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/grok-bot-getting-started-guide-2.jpg)

---

## Grok Bot 到底是个什么东西

你给它一个名字，他就当做接了一份工作。它有自己的云电脑，带着浏览器、文件系统和终端。能登录你已经在用的工具和网站。你合上手机、合上笔记本，它还在跑。做完了，才回来问你。

多个 Bot 可以一起干活，也能在 Channel / Group Chat 里交接。Mac 上叫 Channel，iOS 上叫 Group Chat，都是一回事。

你账号下的所有 Bot，共用一台云电脑。文件、登录态、凭证，彼此看得见。密码、验证码、CAPTCHA、支付确认，你要自己接管电脑做。API key 走 secure secret card。

![Security key 设置 grokbot://app/v1/settings?id=security-keys](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/grok-bot-getting-started-guide-3.jpg)

面端是 macOS 和 Windows，手机端目前只有 iOS。Android 即将发布。

---

## 名字一取，它就上岗了

我用 iOS 创建时指定好名字，他就可以干货了，昨天我建了一个「AICon」。

它马上就成为我参加这场大会的参会小秘。

![AICon 参会小秘](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/grok-bot-getting-started-guide-4.jpg)

大语言模型训练参数、性能优化指标怎么拆——它当场帮我看懂、听懂，还可以伴帮助我做。会议整理。

没有它，我直接梦游。

比如，优化之前先过这五条： https://x.com/MaiYangAI/status/2090628369570500721

还有，咱们 Grok Bot 深圳这场 Meetup 的创建、封面、活动详情，也是 Grok Bot 帮我完成的。

![Grok Bot 深圳 Meetup 活动页](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/grok-bot-getting-started-guide-5.jpg)

所以我现在能负责任说的是：你给它一个岗位或一个任务，它能把这个岗位上的活做完。

## 谁能用，钱怎么算

![Grok Bot 套餐与额度](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/grok-bot-getting-started-guide-6.jpg)

macOS 和 iOS 共用同一个额度。我自己的体感：额度还算够。用了 2 天，usage 才到 20%。

![Usage 用量](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/grok-bot-getting-started-guide-7.png)

## 你可以交代它做哪些事

别因为下面要说「先建一只」，就以为它只能干一件小事。

它一天能做很多。参会、写活动页、清 inbox、去网上找材料、盯表格，这些它都。但我建议起步别一上来就要养一整个部门。

先建一只，用起来：**一个 Bot 干一件事。**

把它当人、当岗位拆：参会小秘、活动执行、Inbox、调研。不是再开一个什么都会的聊天窗口。

交活时把这几句说清就行：做完你要看到什么、它该去哪找材料、哪些事不许做必须先问你、交付物长什么样。

需要登录某个网站，打开 Agent Computer，你自己接管，输密码或 2FA，再把控制权还回去。有正式 plugin 的，走 Settings → Plugins，授权完确认它出现在 Installed。

![Settings → Plugins](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/grok-bot-getting-started-guide-8.jpg)

## 边界先设，Always Allow 后开

它能在真账号、真文件、真网页上动手。所以最值钱的不是它跑了多远，是你让它在哪停。

官方点名这些动作，默认要停下来问你：发信、发邀请；公开发布；花钱、转账；删除或覆盖数据；改权限、改生产；点同意法律条款。

Settings → General → Auto-review 里可以加规则。Require Approval 和 Always Allow 同时命中时，前者赢。

![grokbot://app/v1/settings?id=auto-review](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/grok-bot-getting-started-guide-9.jpg)

Ben 从 [@bot](https://x.com/bot) 团队收过一条：可以开 Always Allow、关 Auto Review，让 Bot 更自主。

我的判断是：先把会出事的动作锁住，跑通一次，再考虑放开。别第一天就「全部允许」。

本机命令是另一回事。Settings → General → Agent → Execution on Local Computer，默认每次都问。没有明确理由要动你电脑上的文件，就保持 Never allowed。这不影响它用自己的云电脑。

审批只管「接下来要做的那一下」。已经做完的，点 Deny 也撤不回去。

## 进阶：一只 bot 跑顺了，再第二只、第三只，然后开个 group/channel

第一只你能改两轮、格式也稳定了，再让它存成 skill，或者做成 routine。

skill 是「怎么做」。routine 是「谁来做、什么时候做」。先拿真实任务跑通，再定时。

难的流程，可以用 Teach a task 自己做一遍给它看。官方写了单次录制上限 10 分钟，而且是逐步放开的，不是每台机器现在都有。

然后才是多 Bot、Channel / Group Chat、sidebar 分 section。Ben 那条仍然成立：一只 Chief of Staff，加几只专员，比一个 mega-chat 强。

我推荐过 https://x.com/MaiYangAI/status/2090702980614181230 场景分类、浏览量排行、X 长文，一个站能把好奇心喂饱。我写这篇时，上面已经收了 279 条用法、72 篇长文。你要找灵感，去那里翻。

现在还有 GrokHub.io ，刚好我开放了一个 Grok Template - [Grok Deck](https://x.ai/bot/Ja9NzNTRz2ozzQLNfrJwI)，很快就给我收录到 [GrokHub - Grok Deck Bot](https://www.grokhub.io/use-cases/grok-deck-bot) 了。

> 用 HTML 制作演示文稿，像 Grok Bot 一样：纸张画布、斑点脸孔、变形翻页。直接在浏览器中替换你的演讲内容并展示，无需构建。

![Makes HTML slide decks in the Grok Bot look: paper canvas, blob faces, morphing page turns. Swap in your talk copy and present in a browser, no build.](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/grok-bot-getting-started-guide-10.jpg)

## Grok Bot 深圳站已经爆满圆满结束了，其他城市正陆陆续续筹备中！

中国首场 [#GrokBotMeetup](https://x.com/hashtag/GrokBotMeetup) 在深圳，8 月 30 日（周日）下午 2 点到 ~~5 点~~ 6 点。

**官方致辞**（特别感谢 [@benln](https://x.com/benln)）；

![官方致辞](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/grok-bot-getting-started-guide-11.jpg)

破冰介绍（多此一举了）

![破冰介绍](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/grok-bot-getting-started-guide-12.jpg)

深圳站活动当天，我的快速回顾： https://x.com/MaiYangAI/status/2094074395413381349

除了深圳，你们还想在哪座城市办。北京、上海、杭州、成都，或者你所在的那哪座城市，评论里留下城市名就行。

如果你有其他任何 Grok Bot 使用场景和经验分享欢迎你联系我。

## 附录

- 官网 https://x.ai/bot
- 用法合集，场景、排行、长文都在 https://usegrokbot.com/
- Ben 收的官方团队 12 条 https://x.com/benln/status/2089699901567340808
- Eric 的 100 个用法 https://x.com/ericzakariasson/status/2087259022172840124
- Nav 的 60 分钟装机（价格页已经过时） https://x.com/heynavtoor/status/2090421070230966656
- Miles 的 Ultimate Guide（价格同样过时） https://x.com/milesdeutscher/status/2089724781449052255
- 0xCodez 的 10 步 https://x.com/0xCodez/status/2089676836619878567
- Ray 把 Bot 当 CTO https://x.com/RayFernando1337/status/2090195841822998888
- Julien 写人还是 runtime https://x.com/julientalbot974/status/2090172142562492882

---

> 本文首发于 X：https://x.com/MaiYangAI/status/2090919833366040919 ，欢迎在那边留言讨论。
