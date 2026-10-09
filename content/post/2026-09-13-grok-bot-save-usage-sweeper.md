---
title: 'Grok Bot 怎么省额度？三步搞定：看清、止损、底座减脂（附可装 Sweeper / 清道夫）'
keywords: Grok Bot, Sweeper, 清道夫, Usage & Billing, routine, 额度, token, 底座减脂, Context Engineering, bot template, poteto
date: 2026-09-13T10:24:00+08:00
lastmod: 2026-09-13T10:24:00+08:00
draft: false
description: '如果你现在额度焦虑，手上又有一堆每天自动醒的 Bot，这篇最长的价值不在读懂。价值在你装上文末那个清道夫，对着自己的一队 Bot 走一遍。看懂不是懂，动手过一遍才算懂。'
categories: [AI]
tags: ["AI", "Grok Bot", "Token", "Context Engineering"]
comments: true
author: MaiYang
x:
  url: https://x.com/MaiYangAI/status/2098961066663580030
  views: 33600
  replies: 8
  reposts: 6
  likes: 70
  bookmarks: 171
  updated: "2026-10-09"
---

![Grok Bot 怎么省额度](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/grok-bot-save-usage-sweeper-1.jpg)

朋友们好呀，我是 SpaceXAI Ambassador MaiYang。

先说一句可能得罪人的话。

如果你现在额度焦虑，手上又有一堆每天自动醒的 Bot，这篇最长的价值不在读懂。价值在你装上文末那个清道夫，对着自己的一队 Bot 走一遍。看懂不是懂。动手过一遍才算懂。

急的人可以直接去装。

https://x.ai/bot/SD6hgpiXqbV_LkMetf2fC

装完打开 [Sweeper / 清道夫](https://x.ai/bot/SD6hgpiXqbV_LkMetf2fC)，跟它说**「开始」**即可。

下面写的是我自己走过的路，方便你对照。不想读正文，那就跳过，效果说话。

几天前我发过一篇[踩坑复盘 Growth Researcher 岗位](https://maiyang.me/post/2026-09-11-grok-bot-growth-researcher-pitfalls/)写得很满，早八任务也开了，交回来却是一堆我用不了的备忘录。我还认真总结了三个坑。发完再翻，越看越像自我感动。

更打脸的是后面。我直接拿 [@poteto](https://x.com/poteto) 的 bot template 把那个岗位重构了一遍，交回来的东西我终于能看懂。能立刻装上就用的 **bot template**，比再好的复盘都值钱。

> 那次我把自己也骂了一遍。大家根本不需要读那篇踩坑文。

所以这篇我换了写法。前面给你一个可装的清道夫。后面才是我 Usage 到 43% 这天，我在做的三件事。你可以边读边做，也可以先装后读。

## 起因 - 3 天用量 43% 本身不可怕，可怕的是说不清 token 花在哪

我打开 Settings 里的 Usage & Billing。这一周已经用到大约 43%，重置还有 4 天。

![Usage & Billing](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/grok-bot-save-usage-sweeper-2.jpg)

数字本身还好，按这个趋势应该也够用。但真让我停住的是另一件事，我不知道 token 用量花在哪。

Setting Usage & Billing 页面急需要可视化功能，至少要让我们知道都花销到哪里了。

但是，迟迟等不来官方的 Bot token 账本，愁着也是瞎愁。我决定先停住焦虑，自动动手。

**看清、止损、节流、底座减脂**，按我这一套组合拳下来，你的 bot 会瘦身多少，欢迎大家评论区晒一晒。我把他们收成了 bot template: **Sweeper / 清道夫，**安装直接说："开始"。

## 第一步 - 先看清，再动手

我没有先删 Bot，我先把 Usage 页当成基线。

我先做了一层很粗的对照。看哪些 Bot 近几天真的在动工具、哪些 routine 还开着。它帮我回答一个问题：谁在活跃，谁又可能在空转。

这一步的产出很朴素，但是也够直观了。想删，想改，随你便。

![哪些 Bot 在活跃、哪些 routine 还开着](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/grok-bot-save-usage-sweeper-3.png)

你装上清道夫之后，第一步它也会逼你去看 Usage。别跳过。

![清道夫的第一步：看 Usage](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/grok-bot-save-usage-sweeper-4.jpg)

## 第二步 - 止损，额度往往从这里漏

看清以后，我才动手止损。

第一回，EveryX ，一个浏览类摘要上。它以前工作日白天几乎每个小时运行一次。我根本没空每小时看，它还是在跑。我就把它改成每天早上 7 点交一次，早报还在，白天空转没了，用量节省下来了。

第二回，我自己的更丢人（不一定你会有它）。我也不知道啥时候在 Chief of Staff 创建了一个工作日早八点的定时任务，它会交一份公开日志草稿给我。但是我几乎没有看过，但是我没意识到它在消耗用量。有了 Sweeper / 清道夫 bot，直接帮我搞定，这感觉太爽了。我确认它没用就直接删了这条 routine。

第三回，砍的是中转。简单说，就是不知道啥时候你在 bot a 对话，产生了新的 bot，它把任务派出去了，但是 routine 却还在 bot a。优化也很简单，去掉中转。少一次中转，就少一次调用。

这三回都不性感，甚至有不少都是自己日积月累遗留下来的，但是人总会容易遗忘。你的用量额度也默默的被这样消耗浪费了。

**止损的判断标准**也很简单。你最近一次认真看过它交回来的东西，是什么时候？答不上来，就先停，或降频，或删。

## 第三步 - 节流，再给底座减脂

停掉那些明显空转，我再开始看怎么用得更省。

节流不是让 Bot 变笨。是让它少在错误时间、错误范围上醒。能一天一次的，不要一小时一次。能自己跑的，不要层层叫醒。能缩小窗口的，不要每次扫全世界。

简单的做完，接下来的是进阶甚至高阶，我们要碰 Grok Bot 的底座。我给它取名：**底座减脂**。

过期的约束、重复的约束、只服务某一篇旧稿的长段策略，能并就并，能删就删。私密原文我不往外贴。你只需要知道一件事。Bot 每轮都要背着走的东西越厚，叫醒一次就越贵，也越容易跑偏。（Context Engineering 派上了用场，有兴趣的同学可以借鉴过来复用）

场景：

这条记忆，七天内还指导过一次真实决策吗？

这条 skill，是在教它做事，还是在替你留作业腔？

这条 routine，成功标准写清楚了吗？交回来你用不了，就不要让它继续准时上班。

瘦完以后，bot 团队不会马上就变轻，不过，我相信会随着你的使用，你会感受到你的用量又比较经用了。

## 做完这三步，我把他们收成一只可装的 Bot - Sweeper / 清道夫

他干的事：

1. 可视化。
2. 止损。砍掉或降频你没空看的空转。
3. 节流。改节奏，缩范围，去掉多余中转。
4. 底座减脂。瘦记忆、瘦 skill、瘦过期约束。

安装地址在这里：

https://x.ai/bot/SD6hgpiXqbV_LkMetf2fC

装完打开它，说「开始」。

**看懂不是懂。自己清一遍才算。**

