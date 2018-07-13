---
layout: post
title: '[译]特殊的Xamarin Libgdx 0.9.9预发布版本'
date: 2013-10-04 02:24:00
comments: true
categories: [Libgdx]
---
> So, i’m about to purge all Xamarin related things from our repository. For those users that are still using Xamarin, i prepared a special release, which you can find here. I also created a [Git tag](https://github.com/libgdx/libgdx/tree/0.9.9-xamarin) so you can still browse the source online easily.

因此，我要从我们的仓库中清除所有xamarin相关的东西。对于仍然使用xamarin这些用户，我准备了一个特殊的发布版本，你可以在这儿找到它。我也创建了一个Git Tag，你仍然可以轻松的在线浏览源码。

> This release contains the current master version of libgdx, and the latest IKVM-Monotouch version. I tested it with on all iOS versions >= 5.0 via the simulator, as well as on iOS 6 and iOS 7 on devices. If you run into any IKVM-Monotouch issues, i’m afraid we won’t be able to help you.

这个发布版本包含了当前libgdx主版本和IKVM-Monotouch最近版本。我在所有的大于等于iOS 5.0 的模拟器，iOS 6,iOS7设备上测试了它。如果你运行IKVM-Monotouch有问题，我恐怕我们不能帮你。

> I also removed any mention of Xamarin from our Wiki over at Github. You can find the Xamarin/iOS notes are still available, but not linked from the TOC.

我也把我们在github WIKI里任何提及Xamarin的都移除掉。你可以找到Xamarin/iOS笔记仍然可用，但是没有TOC的链接。

> I will now remove the backend from the build, Git repo and setup-ui.

我现在将移除构建，git仓库和setup-ui的后台。

> The real 0.9.9 release will happen soonish, i want to finish the new setup-ui based on Gradle first. We (read: i just force this on everybody) also have some plans to let you share your own extensions much more easily with others through Gradle. More on that soon.

真正的0.9.9发布版本不久将发布，我想首先完成基于Gradle的新setup-ui。我们（阅读：我只是迫使这样对大家）也有一些计划去让你分享你们自己的扩展与他人更容易通过Gradle。更注重短期效应。

