---
title: 'From Excel macros to a team of agents: how Lauren Tan learned to let go'
keywords: Lauren Tan, poteto, React, React Compiler, Netflix, Cursor, Grok Bot, SpaceXAI, pstack, Benny, verification, agents, trust
date: 2026-10-27T12:26:00+08:00
lastmod: 2026-10-27T12:26:00+08:00
draft: false
description: "Lauren Tan didn't study computer science. In 2024 she was skeptical that agents could write production code; on September 21, 2026 she posted: \"here's how i shipped 2,500 PRs last month to production\"."
categories: [人物]
tags: ["AI", "Lauren Tan", "Agent", "Grok Bot", "pstack"]
comments: true
author: MaiYang
x:
  url: https://x.com/MaiYangAI/status/2114936758727303341
  views: 493
  replies: 2
  reposts: 0
  likes: 2
  bookmarks: 2
  updated: "2026-10-28"
---

![From Excel macros to a team of agents: how Lauren Tan learned to let go](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/lauren-tan-from-excel-macros-to-agents-1.jpg)

I use [pstack](https://github.com/cursor/plugins/tree/main/pstack) every day. When I code in Cursor, I turn on poteto-mode, and a lot of my daily work now runs through Grok Bot. For a while I thought of all that as tooling. Then I spent a few weeks going back through everything Lauren Tan ([@poteto](https://x.com/poteto)) has shared: her old blog, her posts and articles on X, and the interviews and podcasts she has done. After that, the skills read differently. They are a record of how one engineer learned to trust agents, one check at a time.

The part that stayed with me is where she started. Lauren didn't study computer science. She studied finance, and programming first felt fun to her in a financial modeling class, writing VBA macros in Excel. In 2024, she [says](https://x.com/poteto/status/2109110547824378140), she was skeptical that agents could write production code. On September 21, 2026 she [posted](https://x.com/poteto/status/2102050467505430555): "here's how i shipped 2,500 PRs last month to production".

I'm a builder in China. I was the first Cursor Ambassador in China, and I founded Go 夜读 (github.com/talkgo/night), an open-source Go study community. Most of what I know I learned by watching how strong practitioners actually work. Lauren's path is one of the most useful I've studied, especially for anyone who came to software from somewhere else.

## The long way in

**A pirated copy of Fireworks.** Lauren grew up in Singapore. On [The Changelog #386](https://changelog.com/podcast/386) she recalls her stepdad handing her a pirated copy of Macromedia Fireworks when she was about 13. "I have no idea what this software is," she thought, so she googled tutorials. That led her to a web design forum and IRC, where she learned HTML, CSS and some JavaScript by clicking View Source on other people's sites. Without that forum, she says, she might never have gotten into programming. At 15 or 16 she got her first paid job: rebuilding her school's website.

**Finance, then VBA.** It never occurred to her that she could make a living building websites, so with her parents' encouragement she chose something "practical." Her [LinkedIn](https://www.linkedin.com/in/laurenelizabethtan/) lists a Bachelor of Commerce in Accounting & Finance at Monash University (2009–2011), Dean's List, graduating in the top 5%, plus an LSE summer school in business analysis and valuation. In a [React Conf 2025 team interview](https://www.youtube.com/watch?v=NJUXAWTuaTo&t=522) she describes the professor who taught them VBA macros for Excel: "And then I was like, wow, this is so much fun." She still doubted herself. In her [2014 year in review](https://no.lol/2014-12-28-my-2014-in-review-or-how-i-beat-impostor-syndrome/) she wrote: "what I lacked in intelligence, I decided I would make up for with sheer determination and grit."

**A startup that didn't make it.** From 2012 to 2013 she and a friend built ThePriceGeek, a price search across eBay, Amazon and Craigslist. She did the design and front end. It was a Melbourne Accelerator Program fellow in 2013 and made the front page of Hacker News. At its best it earned about $1,000 a month, which couldn't support two people full time, and it ended when the money ran out.

**Learning in public in Melbourne.** In 2014 she became the founding engineer at Everperform, designing screens in Photoshop and Sketch with non-technical founders and then building them in Ember.js. Next was Homely, where she led the front end migration from jQuery/Backbone to React. She has [described herself](https://x.com/poteto/status/2091768756687258052) back then as "a nobody in melbourne who was still learning how to code in js." She blogged about learning Ember and tweeted the posts, and the EmberConf organizers found her that way and invited her to apply to speak. Her first reaction, on The Changelog: "No way. There's no way I can do this. I can't even go out to my class and give a presentation." She had never even attended a conference. She applied anyway, got in, gave herself three months, and worked backwards from the date. On stage she was shaking for the first few minutes, then the practice kicked in. A few years later she [wrote](https://no.lol/2017-05-30-i-am-still-learning/): "If you're not afraid, you're too comfortable."

**DockYard, then Netflix.** After that talk, she says, "my life changed." In April 2015 she joined DockYard in Boston as a Senior Developer, her first real job and her move to the US. Another talk led to Netflix. As a self-taught programmer without a CS degree, she says a FAANG interview felt unimaginable, and she nearly backed out. She joined in July 2016 as a Senior Software Engineer on studio tools. In November 2017 her manager left and she was asked to take over the team. She took a week to decide, treated it as a reversible decision, and went on to lead teams of 11 and 12 engineers. She later [called](https://no.lol/2020-01-17-does-it-spark-joy/) management "difficult, lonely, rewarding, and everything in between," and realized what she missed most was being a maker.

**The React team.** She met Dan Abramov at a conference in London, and later he asked if she wanted to join the React team. Her reaction: "uh, hell yes?! but wait, me?" She adds that "massive imposter syndrome" came along for the ride. She joined Facebook in March 2020 as a Staff Software Engineer, working on React Server Components in React Data Core. From November 2021 to August 2022 she was engineering manager for React Core and shipped React 18. Then she went back to IC work, focused on the ground-up rewrite and open source release of React Compiler. When she [left](https://x.com/poteto/status/2036536104468488654), she wrote that launching React Compiler at React Conf would be one of the highlights of her career.

**Burnout, then Cursor.** She [has said](https://x.com/poteto/status/2077644468615106995) she knew she wanted to leave Meta a year earlier but didn't know what was next, and "every hour spent there felt like agony." She has also [said](https://x.com/poteto/status/2105336247548006760) she was so burnt out she thought she might not be cut out for engineering anymore. She took a month off and built her first agent orchestrator, [rewriting it from scratch six times](https://x.com/poteto/status/2093056048055906509). She couldn't sit through an hour at work, but she could happily spend 16 hours a day on her own project. That told her it was time. She [joined Cursor](https://x.com/poteto/status/2036536104468488654) in March 2026. Her LinkedIn sums up that stint as "Shipped Cursor 3 and Grok Bot." Since August 2026 she has been a Principal Engineer at SpaceXAI, after the Cursor acquisition.

When she passed 50,000 followers on X, she [wrote](https://x.com/poteto/status/2091768756687258052) that every job she'd had came from people she met there: "i owe my entire career to it."

## Trust is earned one check at a time

A detail I found reassuring: in [How I Use Cursor](https://x.com/poteto/status/2058975157503570132) she admits she had never used Cursor before her interview there. She used it for two days to build her interview project.

In the [2,500 PRs talk](https://www.youtube.com/watch?v=ZroPT--sy5E) she is clear that the number was never the goal. The goal is trust: agents that deliver high quality work even when she isn't watching.

When she first joined Cursor, she was capturing performance traces and heap snapshots in Chrome DevTools by hand, every day, until she thought: "wait, we have agents. What am I doing?" As she later put it, "The bottleneck with agents is verification." Agents write code fast. Knowing it's right is the hard part. So she started writing verification skills that let agents run the app, take their own traces, find hot spots and climb toward better performance.

She is clear-eyed about what agents are: "Agents are like new hires in a constant state of amnesia and idiocy." They don't remember what you told them and don't really learn. Rules, skills, tools and long-term memory are approximations.

She describes using agents as a curve. She started where most people start, with one to five agents, watching every conversation and correcting constantly, because the agents went wrong as soon as she looked away. In her view this stage is the hardest to get out of. You can't jump from five agents to a hundred because you don't trust the output yet, and spawning a hundred anyway just gets you a pile of low quality PRs, regressions and bugs.

So how do you build trust? In a [post in October](https://x.com/poteto/status/2111133080526495985) she laid it out as an inverted pyramid, where the higher layers deserve more of your effort:

1. **The codebase itself.** Better architecture, stronger types and invariants, clear boundaries. Agents copy existing patterns and take the shortest path, so make the shortest path the correct one.
2. **Static analysis.** Lints, tests and CI that catch problems before they land.
3. **Prose.** Comments, rules, AGENTS.md, skills. Things the agent has to choose to follow. Use them, sparingly.
4. **Human review.** The layer that scales worst. Agents merge too fast to read every PR closely, so human effort should go into designing an environment where agents do the right thing by default.

Two shorter posts say the same thing more bluntly. "every time you intervene and correct your agent, you should think about how to eliminate it entirely," she [wrote](https://x.com/poteto/status/2089067865098113024) in August. And in October: "[your codebase is memory](https://x.com/poteto/status/2109699980248408574)." A mistake an agent keeps making will keep copying itself until it becomes a constraint.

## Laziness as a design principle

Before Grok Bot, she built herself a bot called Benny, with a puppy for an avatar. In [an interview clip](https://www.youtube.com/watch?v=UxxXL91CC_w) she explains:

> I'm a fairly lazy person. … we're getting so many bug reports for Cursor, right? And I wanted to just fix them all.

The idea was to have agents fix bugs automatically while she slept. So many people asked how Benny worked, and whether they could have one, that it fed into part of the idea behind Grok Bot: everyone gets a bot of their own, with an identity, its own computer, routines and automations. Today, when people send feedback about Grok Bot, her bot fixes it and she reviews the code. She describes her job now as "almost like a manager for my digital colleagues."

Grok Bot was a team effort, and her [launch post](https://x.com/poteto/status/2087227636590465030) says "we just launched Grok Bot." The part she is proudest of is the client architecture. It started as a rough prototype, and she rebuilt it on an agent-friendly framework she was working on, codenamed Dune, designed so that agents with very little context still write high quality code by default.

pstack ships a version of the same idea: an automation pack called benny, off by default, that triages bug reports from Slack and reproduces and fixes the confirmed ones.

## What anyone can borrow

Not everyone gets her opportunities. These you can start today:

1. **Learn in public.** EmberConf found her through the blog posts and tweets she wrote while learning Ember. You don't have to wait until you're an expert. Write as you go, so people can find you.
2. **Do the thing that scares you.** She treats fear as a signal that she's growing. Pick one thing you've avoided because it scared you, like a talk proposal, your first long post, or an interview, and do it.
3. **Automate the chore you hate, after doing it by hand.** Benny started because there were too many bugs to fix one by one. Her verification skills came after a long stretch of capturing traces manually. Doing it yourself first is how you learn what "done right" looks like.
4. **Define verification before you delegate.** Give the agent a way to check its own work: screenshot the page, run the script and paste the output. pstack's /create-verification-skill helps you write one.
5. **Run fewer agents and watch closely.** Start with one to five and learn exactly where they go wrong before you add more.
6. **Fix the same mistake one layer up.** The second time you correct something, turn it into a check or a structural fix, and keep prose as the last resort. That is what pstack's /correct is for. If you want your own mode, /automate-me drafts one from your work history.
7. **Check in with yourself once a year.** Before she took the manager role, she agreed with herself to reassess every year whether it was still her dream job. You can do the same with how you work with AI.

## Where I am on the curve

I use pstack and poteto-mode, and a group of bots handles much of my content work. On her curve, though, I'm still mostly in the first stage. I review every important step myself. Some of that is deliberate quality control. Some of it is because I haven't yet given the bots good enough ways to verify their own work, so I act as the verifier. I've also been running her pyramid upside down: when the same problem comes up twice, I usually remind the bot again in chat instead of turning it into an automatic check.

My next step is to turn each of those manual reviews into a check the bots can run themselves. Once the trust is there, I'll let go a little more.

## Way more ambitious

On October 8 she posted [two lines](https://x.com/poteto/status/2108299315764777171):

> you should be more ambitious
>
> way more ambitious

Not everyone gets these chances. But if you don't try, you get none. Put in the work first.

## References

- [Lauren Tan on LinkedIn](https://www.linkedin.com/in/laurenelizabethtan/): education, roles and dates.
- [My 2014 in review, or how I beat impostor syndrome](https://no.lol/2014-12-28-my-2014-in-review-or-how-i-beat-impostor-syndrome/): impostor syndrome and grit.
- [I am still learning](https://no.lol/2017-05-30-i-am-still-learning/) (2017): fear and comfort zones.
- [Does it spark joy?](https://no.lol/2020-01-17-does-it-spark-joy/) (2020): going from engineering manager back to engineer.
- [The Changelog #386: Engineer to manager and back again](https://changelog.com/podcast/386) (2020): learning as a teenager, studying finance, The Price Geek, EmberConf, Netflix.
- [React Conf 2025 team interview](https://www.youtube.com/watch?v=NJUXAWTuaTo&t=522): learning to code through Excel VBA.
- [50K followers thank-you post](https://x.com/poteto/status/2091768756687258052): EmberConf, DockYard, Netflix, the React team.
- [Joining Cursor](https://x.com/poteto/status/2036536104468488654) (March 2026): six years on React.
- [Wanting to leave Meta](https://x.com/poteto/status/2077644468615106995) and [burnout](https://x.com/poteto/status/2105336247548006760).
- [The orchestrator rewritten six times](https://x.com/poteto/status/2093056048055906509).
- [How I Use Cursor](https://x.com/poteto/status/2058975157503570132): the interview, agents as amnesiac new hires, verification as the bottleneck.
- [here's how i shipped 2,500 PRs last month](https://x.com/poteto/status/2102050467505430555) ([YouTube copy](https://www.youtube.com/watch?v=ZroPT--sy5E)): the trust curve.
- [How to trust agent output more](https://x.com/poteto/status/2111133080526495985): the inverted pyramid.
- [Let agents verify their own work](https://x.com/poteto/status/2109436202554372476).
- [your codebase is memory](https://x.com/poteto/status/2109699980248408574).
- [Eliminate every correction](https://x.com/poteto/status/2089067865098113024).
- [Grok Bot launch post](https://x.com/poteto/status/2087227636590465030): client architecture and Dune.
- [Grok Bot launch interview clip](https://www.youtube.com/watch?v=UxxXL91CC_w): where Benny came from (third-party upload).
- [pstack README](https://github.com/cursor/plugins/tree/main/pstack).
