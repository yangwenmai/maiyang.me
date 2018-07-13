---
layout: post
title: '[译]我如何通过GitHub的API在短短的几分钟内发送30万邮件'
date: 2013-09-15 04:01:00
comments: true
categories: [Libgdx]
---
> **To all watchers of the libgdx repository: i’m terribly sorry and hope i didn’t interfer with your work in any way**

致libgdx资源库的所有关注者：我非常抱歉且希望我没有以任何方式干涉到你的工作。

> This is meant as a cautionary tale about using Github’s API on a repository with quite a few watchers (460 in this case).

这是一个警示的故事通过在资源库上使用Github的API针对不少的关注者。（这个案例中是460）。

> Earlier this year we migrated our code from Google Code to Github. We didn’t have a good migration plan for the 1200 or so issues back then, so we kept them on Google Code. We now have about 1700 issues on the tracker

今年早些时候我们从Google Code迁移我们的代码到Github。我们没有一个好的迁移计划去迁移1200个左右问题，因此我们保持他们在Google Code上。我们现在有大约1700个问题跟踪。

> Today i finally wanted to tackle the issue tracker migration, using a [Python script](https://github.com/tgoyne/google-code-issues-migrator) i found on Github. The script requires one to specify a Github user account that owns the repository the issues will get migrated to. I did a dry run on a fork of the main repo using my Github account, fixed up some issues in the script, and validated things to the best of my abilities. Things looked good.

今天我最终想去处理问题跟踪迁移，用一个我在Github上找到的Python 脚本。这个脚本必须指定一个我们将迁移到的自己资源库的Github 用户账号。我用我的Github账号在主资源库的一个fork上做了一个枯燥无味的运行，在这个脚本里解决了一些问题，且尽我最大的能力进行了验证。事情看起来挺好。

> Then i ran it on the main repository. Luckily i was watching our IRC channel. After about 4 minutes, people started to scream. They each received 789 e-mails from Github. Every single issue i migrated, and every single comment of each issue triggered an e-mail notification to all watchers of the main repository.

然后我运行它在主资源库上。幸运地我一直在看我们的IRC渠道。大约4分钟后，人们开始尖叫。他们每个人都收到来自Github的789封邮件。每一个我迁移的单一issue，并且每一个issue的每一个单一注释触发一封邮件提醒给主资源库的所有关注者。

> This wasn’t apparent to me during the dry runs, as i used my own Github account. The script posts all issues/comments with the user account i supplied, so naturally, i did not get any notification mails.

这个枯燥无味的运行对我来说不是显而易见的，作为我用我自己的Github账号。这个脚本用我提供的用户账号发布所有的问题或评论，所以自然地我没有接收到任何提醒邮件。

> I stopped the script after 130 issues (4 minutes), and immediately started sending out apologies and a mail to Github support, to which i haven’t received an answer yet. I send roughly 300k mails through their server in a matter of minutes. If i hadn’t watched IRC, i’d have send out about 4 million mails to 460 people within an hour.

我在130个问题(4分钟)后停止了这个脚本，并且立即开始发送道歉还给Github支持一封邮件，我还没有得到答案。我通过他们的服务器在短短几分钟内就发送了大约30万封邮件。如果我没有看IRC，我肯定会在一小时内发送大约400万封邮件给460个人。

<!--more-->
> Let me assure you that i’m extremely sorry about this incident. I know that things like this can interrupt daily workflows quite a bit, even if getting rid of those mails is not a Herculean task. I’d be rather upset if a repo maintainer pulled something like this on me. Please accept my deepest apologies.

让我向你保证，这次事件我感到非常抱歉。我知道这次事件或多或少中断日常工作流程，即使如果摆脱这些邮件也不是一个困难的任务。如果一个资源库主要维护者做类似的事给我，我会相当心烦。请接受我深深的道歉。

> The lesson for Github API users: think hard about the implications of automating tasks through the Github API if you have more than a few watchers.

Github API用户的教训： 如果你有许多关注者，通过Github API做的自动化任务要冥思苦想。

> The lesson for Github/API designers: consider safe-guarding against such issues in your API, in case other idiots like me pull off something similar in the future.

Github/API设计者教训： 在你的API里考虑安全防范问题，在将来其他像我这样的傻瓜实现类似的事情。