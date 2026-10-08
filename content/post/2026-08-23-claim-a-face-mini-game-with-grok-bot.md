---
title: 'I built a login-ready mini-game with Grok Bot: Claim a face'
keywords: Grok Bot, Claim a face, Cloudflare Workers, Supabase, match-3, mini-game, plugins
date: 2026-08-23T20:04:00+08:00
lastmod: 2026-08-23T20:04:00+08:00
draft: false
description: "I've been kind of obsessed with Grok Bot the last few days. So this weekend, with nothing on, I stayed in and built a tiny game with it. Grok Bot the whole way."
categories: [AI]
tags: ["AI", "Grok Bot", "Cloudflare", "Supabase", "独立开发"]
comments: true
author: MaiYang
---

![Claim a face](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/claim-a-face-mini-game-with-grok-bot-1.jpg)

I've been kind of obsessed with **Grok Bot** the last few days. So this weekend, with nothing on, I stayed in and built a tiny game with it. Grok Bot the whole way.

**Anyway, go play it first.**

https://grokbot.cursor-insider.com/

Grok Bot named it **Claim a face**. Just for fun. A little community game.

![Claim a face home page](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/claim-a-face-mini-game-with-grok-bot-2.jpg)

> I didn't make this site for traffic. I wanted to see how far Grok Bot could go, and how well the plugins actually connect.

It turns out **Cloudflare** and **Supabase** are easy. I didn't have to create a Cloudflare project first, or a Supabase database, or even a GitHub repo.

While we were building, I learned what I actually needed. Connect Cloudflare and Supabase, and that was it for auth.

It put the site on **Cloudflare Workers**, on a workers.dev domain. Login goes through Supabase. **Email and GitHub both work.**

![Login with Email or GitHub](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/claim-a-face-mini-game-with-grok-bot-3.jpg)

Today's game is a **match-3**. Three identical faces in a row or column clear. Easy mode has 6 faces, Hard has 16. You have to claim the one face it gives you, four times, before you get a share card.

**Hard mode** is actually hard.

![Hard mode](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/claim-a-face-mini-game-with-grok-bot-4.jpg)

I can't play complete.

I didn't make it, as you can probably guess.

Then I tried **Easy**.

![Easy mode](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/claim-a-face-mini-game-with-grok-bot-5.jpg)

The game itself is still pretty rough. But I got the whole loop working in a short time, and I'm happy with that.

If you have an idea, just try it. If this helps you, even better.

---

> 本文首发于 X：https://x.com/MaiYangAI/status/2091496824326562221 ，欢迎在那边留言讨论。
