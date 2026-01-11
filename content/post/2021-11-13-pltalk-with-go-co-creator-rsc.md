---
title: 'How did go from zero to beloved by pragmatic systems programmers around the world?'
keywords: Go, russ, pltalk, history
date: 2021-11-13T07:30:00+08:00
lastmod: 2021-11-13T07:30:00+08:00
draft: false
description: 'How did go from zero to beloved by pragmatic systems programmers around the world?'
categories: [golang]
tags: [Go, PLTalk, Russ]
comments: true
author: mai
---

# How did go from zero to beloved by pragmatic systems programmers around the world?

#PLTALK with co-creator @\_rsc

from twitch.tv/jeanqasaur

Russ Cox Handling chat questions:

- Prime Gamingprogrium: i saw rob pikes talk in 2007 about newsqueak, ... was it referenced by the rest of the team?

I don't think anyone explicitly looked at Newsqueak again, but experience with it definitely influenced Go.

https://swtch.com/~rsc/thread/

- dcreager1847: Was Google as strict about the approved prod languages list when Go was first started? It seems like a chicken-and-egg problem... needing a lot of library support etc to get to the point where it's an approvable language.

Yes. It’s a lot of work, but necessary.

If you’re going to start using the language, you need to be sure you can support it well and that you will be happy doing so for a long time. Software has a way of being difficult to retire.

- peqeleq: stack traces is one Java feature I miss in Go

Not sure what this means. We have lots of stack traces. At run time, see runtime.Caller etc, or debug.Stack.

- knightofdolamroth: in handmade seattle, there was this question that has been discussed, why Go has its own ABI, instead of C? what are the benefits?

We need:
1. Stack management - we want resizable, bounds checked stacks for goroutines
2. Knowing where pointers are for GC.

- Turbomeldar: Question: why did Golang avoid something like what Nim did where it compiles to C ?

Previous question’s answers apply: very hard to do that with GC. But also that is often subpar for debuggability etc.

- tuna_fudge_face: personal question: is it intimidating to work with someone like ken thompson? 

I was scared to talk to Ken basically the whole time I was (very part time) at Bell Labs. But it was fantastic to be his officemate for two years at Google. He’s incredibly nice!

- not_colin: as simon says, it's bracketed: avoid (success at all costs)

I had no idea, thanks! I think either bracketing is good advice though.

- hunteriam: Is the Go team trying to displace languages like Java?

Not at all. There are plenty of new programmers every day. I’d rather focus on helping them succeed than trying to “convert” others. Fine if others want to join, but it’s not a competition.

- diamutholego: would love to know what the direction is for go plugins

Kind of rudderless right now. Higher priority things are taking all our cycles, so mostly benign neglect for plugins. Sorry.

- typedreflections: Is there any intention to standardise compile-time metaprogramming to replace go-generate?

No. We like that authors can run whatever tools they want and just check in the result. That’s far easier for users, and usually # users > # authors.

- Zshbunnii: does Russ Cox uses Emacs?

A long time ago, I had to use FreeBSD in grad school to collaborate with the rest of my group. I tried Emacs for a month or so. Then I decided it would be easier to port all the Plan 9 commands to FreeBSD instead.

https://swtch.com/plan9port

- Zshbunnii: does Russ Cox uses Emacs?

So no, not anymore, and never really did. 

https://research.swtch.com/acme


----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

