---
title: '第一只 Grok Bot：先建一只，只让它干一件事'
description: '从下载、取名、交活，到先设边界再放权，最后拆成多只 Bot。我从「一只什么都干」改成「一只只干一件事」的过程。'
keywords: Grok Bot, SpaceXAI, Agent, Auto-review, skill, routine, 入门
date: 2026-10-26T16:00:00+08:00
lastmod: 2026-10-26T16:00:00+08:00
weight: 20
track: Grok Bot · Agent
level: 入门
duration: 12 分钟
for: 听说过 Grok Bot、还没真正用起来，或者用了一阵觉得「什么都会一点、什么都不太行」的人。
outcomes:
  - 建好第一只 Bot，交代清楚它的第一份活
  - 在它动手之前，先把会出事的动作锁住
  - 知道什么时候该存成 skill、什么时候该拆出第二只
sources:
  - { title: 'Grok Bot 门槛又又又降了！Grok Bot 到底可以做什么，从入门到进阶', url: /post/2026-08-22-grok-bot-getting-started-guide/ }
  - { title: 'How to give each Grok Bot one job', url: /post/2026-10-05-give-each-grok-bot-one-job/ }
  - { title: 'Grok Bot 怎么省额度？三步搞定', url: /post/2026-09-13-grok-bot-save-usage-sweeper/ }
comments: true
---

## 先说我踩的坑

我的第一只 Grok Bot 什么都干：调研、写作、截图、核对事实。

它哪一样都不算差。问题恰恰在这：哪一样都一般，而我永远不知道该改哪一部分。

后来我把它拆了。现在每只 Bot 只负责一件事。这篇教程就是按这个顺序写的：先建一只，跑顺，再拆。

## 第一步：下载，取个名字

去 [x.ai/bot](https://x.ai/bot) 下载。桌面端有 macOS 和 Windows，手机端有 iOS（我写原文时 Android 还没发布）。现在基本 free 都能用，macOS 和 iOS 共用同一个额度。

建 Bot 的时候给它一个名字。**名字就是岗位**。

我建过一只叫「AICon」的，它马上就成了我参加那场大会的参会小秘。名字取「参会小秘」「活动执行」「Inbox」「调研」这种，别取「我的助手」。

## 第二步：交活时说清四句话

第一份活，把这四句话说清楚就行：

1. 做完你要看到什么；
2. 它该去哪找材料；
3. 哪些事不许做，必须先问你；
4. 交付物长什么样。

比如：

```text
你是我的参会小秘。
这周六我去 XX 大会，议程在 <链接>。
帮我挑出和 AI Coding 相关的 5 场，每场给我一句话说明为什么值得听。
不要替我报名，不要发任何消息。
交付一张表：时间、场次、讲者、一句话理由。
```

需要登录某个网站时，打开 Agent Computer，你自己接管，输密码或 2FA，再把控制权还给它。

## 第三步：边界先设，Always Allow 后开

它能在真账号、真文件、真网页上动手。所以最值钱的不是它跑了多远，是你让它在哪停。

这些动作默认会停下来问你：发信、发邀请；公开发布；花钱、转账；删除或覆盖数据；改权限、改生产；点同意法律条款。

在 Settings → General → Auto-review 里可以加规则。Require Approval 和 Always Allow 同时命中时，前者赢。

本机命令另算。Settings → General → Agent → Execution on Local Computer，没有明确理由，保持 Never allowed。这不影响它用自己的云电脑。

> **先把会出事的动作锁住，跑通一次，再考虑放开。别第一天就「全部允许」。**

还有一点：审批只管「接下来要做的那一下」。已经做完的，点 Deny 也撤不回去。

## 第四步：跑顺了，再拆第二只

第一只你改过两轮、输出格式也稳定了，再往下走：

- 让它把做法存成 **skill**。skill 是「怎么做」；
- 需要定时跑，再做成 **routine**。routine 是「谁来做、什么时候做」。先拿真实任务跑通，再定时。

当你发现一只 Bot 开始同时干好几件事，就该拆了。我拆完以后定下三条：

1. **一只 Bot，一件事。** 多件事挤在一只里，上下文会互相串；
2. **单一职责的 Bot 不单独待着。** 由主 Bot 在需要时把活派给它；
3. **按工程团队的方式分工。** 一件事一个 owner，出了问题只有一个地址。

我现在要拼长图，不会自己去开 Scroll Stitch，而是把截图丢给主 Bot，它派给 Scroll Stitch，结果再回到我这。

## 常见卡点

**什么都让一只干，越用越乱。** 回到第四步，拆。

**额度掉得比预期快。** 先看哪只 Bot 的定时唤醒没必要，具体做法在[这篇省额度的文章](/post/2026-09-13-grok-bot-save-usage-sweeper/)里。

**不知道还能拿它干什么。** 去 [usegrokbot.com](https://usegrokbot.com/) 翻别人的用法，场景、排行、长文都有。
