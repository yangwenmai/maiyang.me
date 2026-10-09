---
title: '刷不完的 AI 资讯，缺的不是更多精选【附 grok bot template】'
keywords: AI 资讯, 信息过载, information overload, Eppler, Mengis, Digital News Report, Bawden, Robinson, satisficing, Grok Bot, template, Punk Cover Skill
date: 2026-09-30T20:40:00+08:00
lastmod: 2026-09-30T20:40:00+08:00
draft: false
description: '不追，怕自己掉队；追，碎片化时间全耗在各式各样的资讯上了。再漂亮的精选也只是别人的尺子，看得多不如做一个：我给自己搭了一个 AI 资讯精选 bot，并收成了公开 Template。'
categories: [AI]
tags: ["AI", "Grok Bot", "信息过载", "资讯"]
comments: true
author: MaiYang
x:
  url: https://x.com/MaiYangAI/status/2105276569262682264
  views: 1074
  replies: 0
  reposts: 0
  likes: 1
  bookmarks: 0
  updated: "2026-10-09"
---

![刷不完的 AI 资讯，缺的不是更多精选](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/ai-news-overload-build-your-own-digest-bot-1.jpg)

大家好呀，我是 SpaceXAI 中国区首位 Ambassador MaiYang。

早上打开朋友圈，X 时间线，各种大模型、新产品发布、定价调整、长文解读、融资传闻，一条接一条。不追，怕自己掉队，漏掉让自己变强的机会。追，碎片化时间全耗在各式各样的资讯上了。刷完一圈，能真正用到自己身上的，少之又少。

最近高频使用 X ，我的体感更深。我让 AI 帮我研究了一下，原来组织科学和新闻研究里早就有过相关分析报告。

Eppler 和 Mengis 在 2004 年整理过一批研究。信息量增加时，决策表现先上升；过了某个阈值，识别相关信息变难，决策质量反而下降，大致是一条倒 U 形曲线。材料多到超过处理能力，人并不会自动变得更懂，只会更慢、更散。原文在 [The Information Society，DOI 10.1080/01972240490507974](https://www.researchgate.net/publication/220175453_The_Concept_of_Information_Overload_A_Review_of_Literature_from_Organization_Science_Accounting_Marketing_MIS_and_Related_Disciplines)。

新闻侧也有同类信号。路透社新闻研究所《Digital News Report 2024》跨市场调查里，约四成受访者说自己有时或经常主动避开新闻。另有约四成说，被如今新闻的体量累垮，这个比例比 2019 年高出 11 个百分点。报告还写到，读者并不只想被不断更新，更想要能帮忙理解局面、对个人有用的内容。报告入口见 https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/dnr-executive-summary 。

最近这几年短视频流行，更是将此情况不断恶化了。

Bawden 和 Robinson 更是直白的说到，过载会让人感到焦虑、失控，注意力被完全切碎。慢慢变成了连续的浅层切换。对策里反复出现的，是过滤、适度满足（satisficing）、主动收缩范围。原文见 [Journal of Information Science，2009](https://journals.sagepub.com/loi/jis)。

---

当前也有不少人在制作精良的精选、日报、周报。不过，我相信每一个人都会有自己的偏好，内容肯定不缺，但是他们是越来越难答契合你自己，一方面担心信息茧房，一方面又要找更适合自己的。不管你关注的是编码工具，还是融资故事，还是模型评测？一天能认真消化几条？材料不够时能不能接受沉默？这些问题答不清楚，再漂亮的精选也只是别人的尺子。

选哪份日报、哪条机器人、哪几个源，只是入口。筛出来的更新，有没有改到自己的 Cursor、Claude、工作流等 agent 里？有没有留下可复用的偏好？如果只是换了一批更好看的标题继续刷，你还是停在爆炸里，只是可能体感会爽一些。

现在有了 Grok Bot，我发现获取信息已经可以足够简单方便，并且还可以跟我自己的偏好融合起来。我就在想，**看得多不如做一个**。继续收藏别人的日报精选，不如再进一步，加上自己的偏好和状态，让内容变得 for you 更智能。一个人要做减法其实是很难，因为你首先要获得足够多之后才知道你最需要的是什么，而且这个都可能是阶段性的，你需要不断跳出来重新选择。这就更难了，但是这不就是我们要变得更好所需要努力的吗，那为什么不自己做一个呢？

AI 圈发布节奏非常快，你不需要追那么紧，克制的筛选会更有必要。

我现在就按这套逻辑给自己搭了一个 **AI 资讯精选 bot**。早上 7 点、下午 4 点、晚上 8 点；先指定一些不错的源，然后把自己的偏好写在 bot skill 里，到点可以按需给我输出适合我以及有需要转发给朋友的资讯。附图是我平时收到的精选。它适合我，不保证适合你。(没有合适的就不发）

![AI 资讯精选 bot 的推送示例](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/ai-news-overload-build-your-own-digest-bot-2.jpg)

我把它收成了公开 Template，方便大家先用起来，然后参照着改自己的关注源、时间任务等，做出自己那一个。

它只是参照物，不是标准答案。面对 AI 资讯爆炸，硬能力在弄清适合自己的尺子，并把它做出来。只靠看得更快、收藏更多，帮不上太多。

想对照着改一份的话，可以参照这个（可选）

https://x.ai/bot/D6WMfjHcTnMwm0XS0MFLs

**最后是一段感谢：**

封面用 [@AdrianPunk115](https://x.com/AdrianPunk115) 开源的 [Punk Cover Skill](https://github.com/adrianpunk/Punk-Skill) 画出来的。

