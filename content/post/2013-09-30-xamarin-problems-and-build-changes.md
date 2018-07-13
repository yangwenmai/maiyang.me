---
layout: post
title: '[译]Xamarin的问题和构建变更'
date: 2013-09-30 02:56:00
comments: true
categories: [Libgdx]
---
> I’ve been checking on the progress on the Xamarin front. As you may remember, we are phasing out the Xamarin backend.

我一直在坚持Xamarin前面的进展。您可能还记得，我们正在逐步淘汰掉Xamarin后台。

> It seems the problems with the Xamarin backend are not resolvable. Michael Bayne from ThreeRings has fixed up many things, but it seems many of our users are still having issues despite those fixes. I’m in favor of not releasing the Xamarin backend in the upcoming 0.9.9 release. I would tag or branch the Git repository to keep the Xamarin backend available, then remove all remnants of the Xamarin backend from the repo. The nightlies and release would not contain any Xamarin related things anymore (drastically cutting down the download size of libgdx as well). What are your thoughts on this matter?

看来Xamarin后台问题不能解决。来自ThreeRings的Michael Bayne修复了许多问题，但是似乎我们的许多用户仍然又问题尽管有这些修复。我赞成在接下来的0.9.9Release版本中不释放Xamarin后台。我将标记或者分支git资源库去保持Xamarin后台可用，然后从资源库移除所有残余的Xamarin后台。每日构建和发布版本将不包括任何Xamarin相关的东西了（大大降低了下载libgdx包的大小）。你对这件事情有什么想法呢？

> Also, i want to kill the unholy Ant build script of death in favor of our Maven build. Reason being that the setup-ui will be transitioned to use Gradle in the near future, and Gradle requires our stuff to be in a Maven repository. By forcing myself to fix up the Maven build (it is up to date and fully functional, including gdx-freetype and gdx-bullet), i can guarantee that the Maven releases are pristine. I’d also like to get input on this.

还有， 我想要杀死邪恶的ant构建脚本倾向于我们的Maven构建。原因是在不久的将来，setup-ui将转换到使用Gradle，而我们的东西Gradle需要在一个Maven资源库。通过自己强迫修复Maven构建（这是最新的功能齐全的，包括gdx-freetype和gdx-bullet),我能保证maven版本是原始的，我也喜欢在这里输入。

RFC！