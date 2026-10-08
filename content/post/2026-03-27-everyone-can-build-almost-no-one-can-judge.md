---
title: 'Everyone can build now. Almost no one can judge.'
keywords: Linear, Karri Saarinen, 20VC, Quality Growth, zero-bugs policy, Quality Wednesdays, Craft, Taste, Founder mode, 林俊旸, Agentic Thinking
date: 2026-03-27T20:55:00+08:00
lastmod: 2026-03-27T20:55:00+08:00
draft: false
description: 'AI 把代码门槛拉低了，但把「判断力门槛」抬高了。这是我看完 Linear 创始人 Karri Saarinen 在 20VC 访谈后的最大感受。'
categories: [Thinking]
tags: ["AI", "Linear", "产品", "Quality Growth", "Craft"]
comments: true
author: MaiYang
---

![Everyone can build now. Almost no one can judge.](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/everyone-can-build-almost-no-one-can-judge-1.jpg)

AI 把代码门槛拉低了，但把"判断力门槛"抬高了。

这是我看完 Linear 创始人 Karri Saarinen 在 20VC 访谈后的最大感受。我也把它收进了 **castmind.ai/interviews**，因为我越来越觉得，这不只是一场关于创业和融资的访谈，更像是一套在 AI 时代重新理解产品、增长与组织的方法。

Karri Saarinen 是 Linear 联合创始人兼 CEO，此前曾在 Airbnb 做 Principal Designer，也是在 Coinbase 很早期的设计负责人之一。20VC 那期访谈的标题就很直接：[How to Grow Capital Efficiently in a World of BS Growth](https://www.youtube.com/watch?v=4vqDYkuzbSM)。这里的 "BS Growth"，我更愿意把它理解为一种**被包装出来的、靠外力催出来的"虚胖增长"**，而不是由产品本身驱动的真实增长。

我很认同 Linear 所强调的 **Quality Growth（质量型增长）**。更重要的是，他们不是只在理念层面谈"质量"，而是真的把它落到了产品和工程实践里。比如他们公开写过自己的 [zero-bugs policy](https://linear.app/now/zero-bugs-policy)：高优先级 bug 48 小时内处理，其他 bug 7 天内处理，并且明确取消"先丢进 backlog 以后再说"这种常见做法。对我来说，这其实就是质量增长最具体、也最有说服力的体现。

过去一年多，我们已经看过太多 AI 产品快速冒头，也看过不少产品很快失速。作为一名 **Cursor Ambassador**，我也不断的在 build 像 **ctxly.ai**、**castmind.ai、tweetquote.app** 这样的产品，我反复看这期访谈时最大的感受是：**模型的价值在于智能，但产品的生死，最终还是取决于它是否足够被用户渴望。（是否有品味）**

---

## 一、从"快增长"回到"好增长"

Karri 对增长有一个很鲜明的区分：

一种增长，靠营销、靠融资、靠数据包装、靠高投入把曲线拉起来；

另一种增长，则更像健身，是靠产品本身一点一点长出来的。他们在访谈中多次谈到 **quality growth**，强调它必须是可持续的、基于真实客户价值的增长，而不是被大量花钱"加速"出来的表面繁荣。Linear 早期也几乎没有销售团队，更多依赖产品本身被市场认可。

这个判断放到今天的 AI 语境里尤其重要。因为 API、模型和套壳工具大幅降低了做产品的门槛，也让很多团队更容易做出"看起来在增长"的东西。但如果用户留下来，不是因为你做对了产品，而只是因为你暂时买到了流量、赶上了热度，那增长很可能只是**短期幻觉**。

---

## 二、质量不是口号，而是一整套做事方式

我觉得 Linear 最值得学的，不只是审美，不只是设计，而是他们把"质量"变成了一套组织习惯。

最典型的就是 [zero-bugs policy](https://linear.app/now/zero-bugs-policy)。Linear 官方写得非常清楚：他们之所以坚持零 bug 政策，不是为了听起来漂亮，而是因为他们认为"没有别的做法更合理"。他们会要求团队把 bug 立即处理掉，而不是无限堆积；甚至在推行这套策略时，先专门清空了一批历史 backlog。这个做法背后其实有一个很强的价值判断：**bug 不是自然存在的一部分，而是对产品质量的真实侵蚀。**

另一个我很喜欢的点是他们的 **Quality Wednesdays**。Linear 公开分享过，这套机制的核心不是"修复大问题"，而是让团队持续去发现那些会悄悄拉低体验的小缺陷，**让质量成为一种习惯**，而不是一个季度冲刺项目。

所以如果要用一句话概括，我会说：

**Quality Growth 不是"慢一点增长"，而是"用对质量的极致要求，换来更扎实、更可持续的增长"。**

---

## 三、AI 抬高的，不是写代码的门槛，而是判断力的门槛

林俊旸昨天发表了他离职以来的第一篇长文：[From "Reasoning" Thinking to "Agentic" Thinking](https://x.com/JustinLin610/status/2037116325210829168)

如果说在推理时代，竞争优势更多来自模型、算法、反馈信号和训练体系；那在 agentic 时代，优势会越来越来自环境、工作流、train-serve integration，以及能否把模型决策和真实世界后果闭环起来。

站在 Builder 视角，这意味着一件事：

**AI 降低了代码产出的门槛，但*显著抬高了产品判断、体验审美和取舍决策的门槛*。**

当越来越多的人都能在短时间内做出一个 70 分、80 分的产品时，真正稀缺的，反而变成那最后 20 分：

- 你有没有能力判断什么不该做；
- 你有没有能力看出哪里"看起来能用，但其实不对"；
- 你有没有耐心把一个细节磨到让人愿意留下来。

这部分，才是真正意义上的**手艺（craft）**。

---

## 四、不要用功能堆砌，掩盖产品判断的贫乏

Karri 很反感那种用功能 checklist 来证明自己"更强"的方式。这个我特别有共鸣。很多产品的确可以靠更多功能、更大的表格、更满的对比页，制造一种"我们什么都有"的印象；但很多时候，功能越多，并不代表产品越好，反而意味着它更容易走向平庸。

Linear 自己在公开表达里也反复体现出这种倾向：他们不是想做一个"什么都能做"的空平台，而是围绕真实工作流，把关键动作设计得更顺、更自然。Karri 在接受 Runtime 采访时也明确讲过，他们更关注人们真正需要完成的主要任务，再围绕这些任务去设计功能，而不是做一个"什么都可以，但什么都不够贴合"的系统。

这一点，对今天做 AI 产品的人尤其重要。因为现在**最容易做错的事情**，就是：

模型能力一来，**先堆功能**；功能一多，再**讲平台**；

最后留下一个勾很多、但没人真正想每天打开的产品。

---

## 五、Founder mode 的重点，不是强势，而是深入

还有一个我很在意的点，是 Karri 对 founder involvement 的理解。

20VC 里有个很有代表性的快问快答：在 Brian Armstrong 和 Brian Chesky 之间，他更偏向 Brian Chesky。他其实也有提到 founder mode 可能有风险，但 founder 不能过度抽离，还是要真正深入关键环节。这个取向，其实和 Chesky 后来反复强调的那种 "leadership is presence, not absence" 很接近。

所以 founder mode 最值得学的，不是"凡事亲自上"，而是：**在关键问题上，你不能只做一个远远看报表的人。你必须真的理解产品，理解用户，理解质量，理解哪里出了问题。**

---

## 结语：AI 时代，"手艺"重新变成竞争力

我看完这期访谈最大的感受，不是又学到了一套融资话术，也不是又看到一个硅谷公司的成功模板。

而是我更确信了一点：

**在 AI 抹平很多技术门槛之后，真正重新变稀缺的，是手艺（Craft），是品味（Taste）。**

不是谁能最快把东西做出来，而是谁能做出那个让人愿意留下来、愿意相信、愿意反复使用的产品。

别太迷信热度，也别太迷信那些包装得很漂亮的增长曲线。去看真实用户是否愿意回来，去看 bug 是否真的被重视，去看团队是否真的把质量当价值，而不是当口号。

对今天的 AI Builder 来说，

**做一个纯粹的手艺人，反而可能是最现实、也最长期的商业竞争力。**

---

> 本文首发于 X：https://x.com/MaiYangAI/status/2037513875206320195 ，欢迎在那边留言讨论。
