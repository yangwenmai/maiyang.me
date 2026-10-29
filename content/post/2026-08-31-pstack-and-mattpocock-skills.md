---
title: '先搞清他们各自在解决什么：普通人怎么开始用 pstack 和 Matt 的 skills'
keywords: pstack, Lauren Tan, poteto, Matt Pocock, grill-me, Agent Skills, Cursor, poteto-mode
date: 2026-08-31T22:40:00+08:00
lastmod: 2026-09-01T11:20:00+08:00
draft: false
description: '我从网上读到 Lauren 的 pstack 和 Matt 的 skills。这篇只谈一件事：他们各自要解决什么问题，像我这样的普通人该怎么开始。选一套，或者两套一起用，都可以。'
categories: [Thinking]
genre: notes
tags: ["pstack", "Matt Pocock", "Agent Skills", "Cursor", "grill-me", "poteto-mode"]
comments: true
author: MaiYang
---

## 起因

我是普通用户。网上刷到两套东西，都叫 skills，作者都是我这类人会去搜的那种大神。

一套是 [pstack](https://github.com/cursor/plugins/tree/main/pstack)，Lauren Tan 写的，X 上叫 [@poteto](https://x.com/poteto)。另一套是 [mattpocock/skills](https://github.com/mattpocock/skills/)，Matt Pocock 写的。

我本机两套都装过一点。pstack 的 `/poteto-mode`，Matt 的 grilling。读 README 的时候，会看到两句很硬的话。Lauren 写：`i don't believe in planning. the best spec is code.` Matt 写：`Do not act on it until the user confirms you have reached a shared understanding.`

第一眼会觉得拧。一个说先做，一个说先问。

我想清楚的不是谁赢。是他们各自要解决什么问题，像我这样的普通人，学的话第一步踩哪。选一套可以，两套一起用也可以。这篇就写这个。

Lauren 这个人我另外写过一篇，[从 Ember 社区到 Grok Bot](/post/2026-08-31-lauren-tan-poteto-dont-expect-it-to-remember/)。这里不再铺履历。

## 这两个人，先认个脸

Lauren Tan。新加坡做设计，Monash 读金融，不是 CS。Netflix、Meta、React Compiler，2026 年 3 月去 Cursor，公开身份是做 Grok Bot 和 Cursor。pstack 是她自己每天用的那套工程 skill。她自己报过一个数：开源前一周，Cursor 工程团队用了她的 skills 10,000 次。这个数我没有二次核对，当「她怎么描述内部用量」看。

Matt Pocock。以前是声乐老师，后来写 TypeScript，XState core team，在 Vercel 待过一小段，再做成 [Total TypeScript](https://www.totaltypescript.com/)。2024 年转向 [AI Hero](https://www.aihero.dev/)，教人怎么用 coding agent 做出能上线的软件。skills 仓库 2026 年 2 月 3 日建的，我写这篇时 GitHub 显示 242,480 星、20,615 fork。README 里写 newsletter 大约 6 万人。他反复强调：这不是 vibe coding，是 real engineering。

两个人都讨厌 slop。我从网上读到的材料里，他们并没有在互相点名。是我把两个仓库并排放，才看见默认动作不一样。

## Lauren 要解决什么

pstack README 开篇就写：ai 写太多 slop 了，她同意。`i don't want to ship like a team of twenty slop artists.` 目标不是更多代码，是更少、但过得去验证的代码。

她把 agent 写成失忆的新员工。不记得你说过什么，也不会真的学会新东西。能做的是给规则、skills、工具、长期记忆，去逼近学习。

所以 pstack 是一个 Cursor plugin。安装就一句 `/add-plugin pstack`，再跑一次 `/setup-pstack` 选模型。日常入口几乎只有一个：`/poteto-mode`。

你扔一句任务进去，它读 21 条原则的索引，从 22 本 playbook 里匹配一本，把步骤原样抄进 todolist，再按步骤去调其他 skill。你不用记住 `/architect`、`/interrogate`、`/tdd` 什么时候该用。mode 替你路由。

playbook 覆盖的是真活。bug fix 要求先 repro，再对着运行时证据修。overnight 是「我去睡觉了，早上之前把栈合掉」。visual parity 是两张图对到像素。

原则里我最想让普通人先记住四条：

- **experience-first**：用户爽感优先于实现方便，少做几个做利索的，好过一堆毛坯；
- **prove-it-works**：对着真实产物验证，编译通过不算数；
- **never-block-on-the-human**：能撤销的先做出来，人事后纠偏，不可逆的才停；
- **encode-lessons-in-structure**：同一条教训写第二次，就该变成 lint、flag、运行时检查，而不是再加一段字。

`prove-it-works` 写得很白。agent 自己报「我测过了」、缓存截图、子 agent 的总结，都不算。要看 git diff、文件内容、运行时行为。agent 汇报的是它打算做的，不总是它做了的。

她 guide 里那句我很喜欢：你不需要点名 playbook。只要「repro first」和一个能核对的结果，路由信号就够了。例子是现成的：`/poteto-mode the export writes duplicate rows when a retry lands mid-run. repro first, then fix and verify.`

她说不信 planning，靠的就是这层验证。能撤销的先做，人在不可逆的地方把关。

> **Lauren 要解决的是：做了，但没对着真实产物验过。或者验的是「编译过」「我测过了」。**

## Matt 要解决什么

Matt 那套不是 Cursor 专用。Claude Code 可以整包装，别的 agent 用 `npx skills@latest add mattpocock/skills`，文件落到你仓库里，你改得动。他自己说，两种装法别同时用，否则每份 skill 会出现两次。

他反对 GSD、BMAD、Spec-Kit 这类把过程整包接走的框架。原话是：它们帮你的同时拿走控制权，过程里出了 bug 你很难修。他要的是小、好改、能组合，任何模型都能用。

日常入口几乎只有一个：`/grill-me`。对着代码库用 `/grill-with-docs`。一次会话装不下的大活，用 `/wayfinder`。拿不准该走哪条，用 `/ask-matt`。

grilling 把你的计划画成一棵设计树。每一轮问的是整条 frontier：前置已经落地、现在就能问的决策。每个问题带推荐答案。事实它自己去查，决策留给你。frontier 空了，才算达成共识。他在 [自己那篇介绍](https://www.aihero.dev/my-grill-me-skill-has-gone-viral) 里写，这种会话常常要 45 分钟。确认之前，agent 不许动手。

烤完之后，他给了一条流水线：`/to-spec` 把对话收成 spec，不复问；`/to-tickets` 拆成带阻塞边的小票；`/implement` 按约定的 seam 走 `/tdd`，收尾跑 `/code-review` 再 commit。

他要解决的四件事，全写在 README 里，每条都引了书：

1. **agent 没做你要的**。药是 grilling。引《The Pragmatic Programmer》：没人一开始就精确知道自己要什么；
2. **agent 太啰嗦**。药是共享语言，写成 `CONTEXT.md`。他举自己仓库的例子：改之前要说「课程某一节里的一课被做成『真的』（也就是在文件系统里有了位置）」，改之后是「materialization cascade 出了问题」；
3. **代码根本不能跑**。药是类型、浏览器、自动化测试，加上 `/tdd` 和 `/diagnosing-bugs`；
4. **建成一坨泥**。药是每天投资设计。`/to-spec` 先问你动哪些模块，`/improve-codebase-architecture` 隔几天扫一次。

我对着 README 的 Reference 数过：一共 25 个 skill。工程 9 个用户调用 + 9 个模型调用，生产力 5 个用户调用 + 2 个模型调用。

> **Matt 要解决的是：你以为说清楚了，做出来的是另一个东西。以及做快了之后，仓库慢慢变成一坨泥。**

## 再多看几个维度

两套并排放，我看到的不只是「先做 / 先问」。至少还有这几层。

**写给谁用。** Lauren 那套是从 Cursor 内部工程团队长出来的。overnight、Graphite 合栈、cloud agent、多模型分工，README 里随处都是。Matt 那套从第一天就写成可搬的：Claude Code、Codex、别的 agent 都能装，文件你改得动。

**卡在活的哪一段。** Matt 多半卡在动手之前：想法还糊、模块会动好几块、成功标准还没一句话。Lauren 多半卡在宣称 done 之前：要什么已经清楚，怕的是编译绿了、产物不对。

**你要准备什么。** 用 Matt，你得肯坐下来被问。他写过，一轮常常 45 分钟。打开 `/grill-me` 然后让它自问自答，等于没烤。用 Lauren，你得能说出一个能核对的结果。`repro first` 加「怎么知道修好了」。没有 Graphite、没有 cloud agent，overnight 那大半 playbook 会空转，但不妨碍你用 `/poteto-mode` 修一个小 bug。

**整包有多重。** 我数过 pstack README：22 本 playbook，二十多个可以直接敲的 skill，21 条原则。网上有文章写成 23 个 workflow skill，零头对不上，是计数口径。Matt 是 25 个。普通人第一周用不上这么多。两边作者自己也这么说。Matt 写 hack around，make them your own。Lauren 写 fork it，还留了 `/automate-me`：从你最近怎么干活，起草一份你自己的 `-mode`。

**默认动作为什么不一样。** 这是我读完之后的判断，不是他们在网上互相回应。Lauren 面对的是已经在跑的工程活，验证能托住，就敢先做。Matt 面对的是「还没说清要什么」这一步，先问能少拆两天 diff。同一份工作的前后两段，不是两套互相取消的信仰。

我自己用 agent 翻过的车，也能对上这两段。

今年上半年做 ContextEcho，从第一行代码到上架用了 76 天、468 个 commit、大约 4.8 万行 Swift，几乎都在和 Cursor 结对。中间有一批功能做得特别费劲，上架之后我自己却根本不会打开。当时我觉得方向清楚，agent 也写得很快，编译过，页面也能点。那是前一段没问清楚。

后一段我更熟。agent 修了，说测过了，CI 也绿了，你去点，bug 还在。pstack README 里那两个例子就是这种：滚动每 750ms 漂一下，虚拟列表仍然要卡一秒。

> **前一段糊，先问清楚。后一段清楚了，盯它怎么验。两段都可以学，不必先站队。**

## 普通人怎么开始

好了，我认为像我这样的人，开始可以更简单。三条路，选一条走就行。

**只想先试一套。**

这周有一件自己都说不清「做成什么样算对」的事，走 Matt。装 grilling，对着那件事跑一轮 `/grill-me`。真的回答。45 分钟走不完也没关系。看还挂着哪些你原来以为想清楚了的枝。这一步不写代码。

这周有一个已经能 repro 的小 bug，走 Lauren。Cursor 里 `/add-plugin pstack`，跑一次 `/setup-pstack`，然后 `/poteto-mode` 后面写上 repro first，以及你怎么知道修好了。盯它宣称 done 的时候，有没有对着真实产物跑过。编译通过、测试文件自己编的、子 agent 说「已验证」，都不算。

**想两套一起用。**

也可以。顺序很直：先烤，你自己点一下「可以做了」，再交给 `/poteto-mode` 去执行和验证。

中间那一下要你点。别指望两个入口自己发现对方。同一个聊天窗口里，不要把两套都设成一直开着的默认 mode，agent 会一会儿先问、一会儿先做，你看起来像随机。分会话，或者分阶段，就没这件事。

**这周两套都不想装。**

也行。先拿走四件就够：Matt 那边是 grilling 这件事本身，加上一份最小的 `CONTEXT.md`；Lauren 那边是 prove-it-works，加上 never-block-on-the-human。原则可以先当自己的检查清单用，不一定非要装成 plugin。

`CONTEXT.md` 不必等 Matt 的整套 setup。他自己仓库里的那份就是这个形状：Issue tracker 是什么、Issue 是什么，每个词底下加一行 Avoid。先写 10 个你们内部会说、agent 会用 20 个词解释的词就够。下一回它开始啰嗦，补词，不要补一段更长的提示词。

还有几件不该一上来就套的，我也写直白一点。

改个 typo、rename、补一行注释，两套都别开。那是 10 秒的活。

只是想搞懂一段代码怎么工作，pstack 的 `/how` `/why` 就够了，不必进 mode，也不必 grilling。

你没有 Graphite、没有 cloud agent，别一上来抄 Lauren 的过夜工厂。先用 `/poteto-mode` 修一个能核对的小活。

今晚没那 45 分钟坐下来被问，就别打开 `/grill-me` 走个过场。

## 你明天能怎么用

我把这篇能落地的部分收成三件事，今晚就能做：

1. **对着你手头那件还没动工的需求，问自己一句：我能用一句话说清做成什么样算对吗？** 说不清，跑 `/grill-me`。说得清，并且能 repro，跑 `/poteto-mode`。想两个都用，先问再做，中间自己点一下；
2. **只装你今晚要用的那一个入口。** 别第一周把 22 本 playbook 和 25 个 skill 当作业做完；
3. **给当前仓库写 10 个词的 `CONTEXT.md`。** 每个词一行解释，一行 Avoid。这是 Matt 那套里最便宜、也最容易留下来的东西。

若只读四份原文：

1. [pstack README](https://github.com/cursor/plugins/blob/main/pstack/README.md) 的「why are there no planning skills」和 21 条原则表；
2. [poteto-mode 的 SKILL.md](https://github.com/cursor/plugins/blob/main/pstack/skills/poteto-mode/SKILL.md) 开头 Non-negotiables，加上 [prove-it-works](https://github.com/cursor/plugins/blob/main/pstack/skills/principle-prove-it-works/SKILL.md)；
3. [mattpocock/skills README](https://github.com/mattpocock/skills) 的 Why These Skills Exist；
4. [grilling 的 SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md)，加上 Matt 自己写的 [grill-me 介绍](https://www.aihero.dev/my-grill-me-skill-has-gone-viral)。

## 写在最后

如果把这篇压成三句话，我会留下：

1. **Lauren 盯的是做完有没有验。Matt 盯的是动手前有没有说清。这是同一份活的前后两段。**
2. **普通人开始，先试一个入口就够。糊了先问，清楚了再做。想两个都用，中间自己点一下「可以做了」。**
3. **整包先别当信仰。grilling、`CONTEXT.md`、prove-it-works、能撤销的先做，这四件就能开工。**

以上是我从网上读完两个仓库之后的笔记。完整流程我还没在自己的项目里跑完一周，10,000 次调用和 242,480 星都是写这篇时看到的数，前者是她自己报的。

你要是也是从网上刚刷到这两套，走了上面哪条路，或者觉得我把他们想简单了，欢迎来吐槽我🤔
