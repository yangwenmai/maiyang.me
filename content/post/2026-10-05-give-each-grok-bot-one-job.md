---
title: 'How to give each Grok Bot one job'
keywords: Grok Bot, single-job bot, primary bot, Scroll Stitch, Sweeper, multi-agent, context, Chief of Staff
date: 2026-10-05T09:54:00+08:00
lastmod: 2026-10-05T09:54:00+08:00
draft: false
description: 'My first Grok Bot did everything. It was not terrible at any of them. That was exactly the problem: it was mediocre at all of them, and I could never tell which part to fix. So I split it.'
categories: [AI]
tags: ["AI", "Grok Bot", "Agent", "Multi-Agent"]
comments: true
author: MaiYang
x:
  url: https://x.com/MaiYangAI/status/2106925904551424319
  views: 7992
  replies: 0
  reposts: 3
  likes: 9
  bookmarks: 12
  updated: "2026-10-09"
---

![How to give each Grok Bot one job](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/give-each-grok-bot-one-job-1.jpg)

My first Grok Bot did everything.

**Research, writing, screenshots, fact-checks.**

It was not terrible at any of them. That was exactly the problem: it was mediocre at all of them, and I could never tell which part to fix.

So I split it. Every bot now owns exactly one job. **Three rules** came out of that:

1. **One bot, one job.** When many jobs share one bot, their contexts leak into each other.
2. **A single-job bot does not sit alone.** The primary bot calls it when that job shows up.
3. **Split the work the way an engineering(other) team does.** One owner per job, so each skill keeps getting sharper. When something fails, the failure has one address.

## What goes wrong in one bot

The isolation is not real. One job's context steers the next. A preference from the research job shows up while the bot is stitching a screenshot. A correction you made for writing quietly changes how it checks a fact.

And tuning turns into guessing. You cannot see which job failed, so you cannot see which instruction to change. Every fix lands in the same shared context and quietly moves something else.

## What one job buys you

A bot that owns one job can actually improve at it. You know what finished looks like. When it misses, you know which instruction caused the miss. The next run gets better at the same thing, instead of getting crowded by unrelated work.

Fold the roles into one bot and you lose both things: the speed, and any idea of what to train.

## How the primary bot uses that

I do not open Scroll Stitch myself when I need a long image. I send the screenshots to the primary bot. It assigns the job to Scroll Stitch. Scroll Stitch does that one thing: overlapping screenshots, or a vertical recording of the same page, become one long image. The result comes back to me.

Scroll Stitch does not write the post. Sweeper does not stitch images either. It only looks at usage and cuts the wake-up schedules I do not need.

The two bots, if you want to look:

- **Scroll Stitch:** https://x.ai/bot/9tjPEGID_RAUWcU1Sh9HT
- **Sweeper:** https://x.ai/bot/SD6hgpiXqbV_LkMetf2fC

## How to find the split

A job is one kind of input, one kind of output, one way to fail. If you cannot say what finished looks like in one sentence, it is still two jobs.

One job does not mean the bots sit apart. It means they can be combined when the work asks for it, and kept apart when it does not.

If your first bot is still doing everything, take the job it actually finishes, put that job in its own bot, and let the primary bot call it. You will finally be able to see what to improve.

