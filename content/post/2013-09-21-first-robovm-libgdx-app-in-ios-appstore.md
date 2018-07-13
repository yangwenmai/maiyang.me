---
layout: post
title: '[译]第一个基于RoboVM/Libgdx应用上架AppStore'
date: 2013-09-21 09:32:00
comments: true
categories: [Libgdx]
---
> For about 2-3 weeks now i’ve been actively switching our [libgdx](http://libgdx.badlogicgames.com/) game dev framwork’s iOS efforts over from Xamarin/IKVM to [RoboVM](http://www.robovm.org/). For those of you who missed the last few weeks of libgdx updates, here’s a breakdown what RoboVM is and why we use it.

大约2-3周，现在我一直积极地切换我们的libgdx游戏开发引擎的iOS从Xamarin/IKVM到RoboVM.对于哪些近几周未更新最新版libgdx，这儿有一个详细说明为何我们要用RoboVM.

> ##What’s RoboVM?

##RoboVM是什么？

> The promise of RoboVM is a fully workable ahead-of-time compiler for JVM bytecode for iOS (and 32-bit Linux/Mac if you fancy that). RoboVM uses [Soot](http://www.sable.mcgill.ca/soot/) and [LLVM](http://llvm.org/) to transform the bytecode to native x86 or thumbv7 ARM code. RoboVM employs Android’s latest runtime class library iteration, making it compatible with pretty much any JVM library/language out there. RoboVM also comes with a set of bindings to the ObjC APIs of iOS. These bindings are realized via a custom Java-to-native bridge called Bro, and generated automatically from header files, with minor manual intervention. JNI is of course also supported, pending some more esoteric features.

RoboVM许诺它是一个完全可运行的ahead-of-time编译为JVM字节码iOS(和32位的Linux/Mac，如你看中的那个)。RoboVM使用Soot和LLVM转换字节码为本地X86货thumbv7 ARM代码。RoboVM采用Android的最新运行类库迭代，使其兼容几乎任何JVM库/语言。RoboVM还带有一组绑定iOS的ObjC API.这些绑定实现通过一个自定义JAVA到本地的桥叫弟兄，并自动生成头文件，有轻微的人工干预。当然也支持JNI，处理一些更深奥的功能。

> ##Libgdx, Xamarin & RoboVM
Previously we leveraged [Xamarin iOS] plus a port of IKVM by Michael Bayne of PlayN fame to get our Java based game dev framework to work on iOS. This combination worked, but had its flaws. For one, not all of the Java runtime classes were supported, most prominently the java.net package. Also, some parts we heavily rely on in libgdx, like JNI, were extremely slow with the Xamarin/IKVM hack. Note that this is not an issue with Xamarin iOS itself, but due to the nature of the IKVM port. Xamarin have been extremely helpful and gave us a few licenses at a very low discount for development. All this limitations also meant that running anything complex was always a gamble, and using other JVM languages was pretty much out of the question.

之前我们利用Xamarin iOS附加PlayN的Michael Bayne开发的IKVM的部分整合我们的基于Java游戏开发框架工作在iOS上。这种组合工作，但是有它的缺陷。例如，不能支持所有的Java运行时类，特别显著的是java.net包。此外，一些地方我们严重依赖于libgdx，像JNI,Xamarin/IKVM极其缓慢。注意这个不是Xamarin iOS自身的问题，而是归咎于IKVM端口的性质。Xamarin一直有非常有帮助，给了我们几个很低折扣的开发许可证。所有这个限制也意味着运行任何复杂的都是一场赌博，并使用其他JVM语言几乎都出问题。

> RoboVM fixes many of these issues. The JNI bridge is considerably faster, there are less layers of abstractions, all of the Android runtime classes are available, it will allow us to write games in Scala and JVM languages other than Java, and best of all, it’s entirely open-source under Apache 2. Libgdx development on iOS thus becomes essentially free, apart from the Apple tax (developer license, need for a Mac). Note that Trillian AB will eventually have to start looking into options to further fund RoboVM. If we get a chance as a community to help fund RoboVM, we should definitely do so. RoboVM is shaping up to be an excellent tool, and i think it’s worthwhile to support, just like Xamarin.

<!--more-->
RoboVM修复许多这些问题。JNI桥接迅速被考虑，有少许抽象层，所有Android运行时类都可用，它将允许我们用Scala和其他类似JAVA的JVM语言写游戏，最好的它使基于Apache 2完全开源的。libgx开发在ios上终于是免费的，分离来自于苹果的重负(开发授权，需要一台Mac)。注意Trillian AB 终于将不得不开始寻找更进一步的RoboVM基金会选项。如果我们有机会作为一个社区去帮助RoboVM基金会,我们应该那样去做。RoboVM正在被塑造成一个极好的工具，并且我认为它是值得支持的，就像Xamarin。

> Niklas Therning from Trillian AB, creator of RoboVM, has laid the foundation for our RoboVM backend by porting our Xamarin/IKVM based libgdx backend over to RoboVM. We’ve since been fixing up many issues and missing features, and are reaching feature parity with the Android backend. You can follow the [todo list on Github](https://github.com/libgdx/libgdx/blob/master/backends/gdx-backend-robovm/todos.txt).

来自Trillian AB 的 Niklas Therning，RoboVM创始人，已经为我们从基于Xamarin/IKVM的libgdx移植到RoboVM奠定了RoboVM后台部分的基础。因为我们已经修复了很多问题和缺失功能，达到同样Android后台的功能。你能在github上关注待办事项。

> ##First RoboVM/libgdx App on iOS App Store, many to follow

第一个基于RoboVM/Libgdx应用上架AppStore，许多关注

> To prove that RoboVM is a viable option, Niklas submitted the first RoboVM-based app to Apple last week. I supplied Niklas with the rights and sources for our libgdx Super Jumper demo. While it’s definitely not the fanciest game ever, it does exercise a large percentage of the few hundred thousand lines of libgdx’s managed and native code. Today, the app got approved by Apple, and is now available for your “enjoyment” on the App Store. I believe that this is an indication that our decision to go with RoboVM was the right one.

为了证明RoboVM是可行的选择，Niklas上周提交了第一个基于RoboVM的应用到苹果。我提供给Niklas我们的libgdx Super Jumper demo的权利和来源。虽然它永远不可能是最高档的游戏，但它运用了libgdx托管和本地代码成百上千大比例。今天，这个app被苹果批准，并且现在可以在你的享受在appstore。我相信这个迹象表明，我们决定同RoboVM一起是正确的。

> Meanwhile, others have started porting the libgdx-based games over from Xamarin iOS to RoboVM. Here’s the RoboVM version of Delver, by Chad Cuddigan, aka Interrupt. You should totally buy it either on Google Play or Steam! I did the “port”, which boiled down to converting oggs to mp3s and implementing a missing feature in our libgdx RoboVM backend.

同时，其他基于libgdx游戏开始移植从Xamarin iOS到RoboVM.如Delver的RoboVM版本，由Chad Cuddigan 又称 Interrupt.你应该完全购买它在Google Play或Steam！我坐了部分，归结为将转换oggs到MP3，在我们的libgdx RoboVM后台实现缺失功能。

> Christoph of [Noblemaster Games](http://www.noblemaster.com/) ported both hist latest game Demise of Nations as well as an older title called Desert Stormfront to RoboVM (you can buy Desert Stormfront and other games on the App Store, Google Play or directly from his site!). Both ran out of the box (Christoph, correct me if i’m wrong :) ). Christoph also observed a considerable performance improvement going from Xamarin/IKVM to RoboVM:

Christoph of Noblemaster游戏移植双方历史最新的游戏国消亡，以及一个旧的标题叫沙漠暴锋RoboVM的（在App Store，谷歌Play或直接从他的网站上，你可以买到沙漠暴锋和其他游戏！）。跑出盒（克里斯托夫，纠正我，如果我错了:)）。克里斯托夫还观察到去从Xamarin/ IKVM RoboVM的一个相当大的性能改进：

> Jonnus ported their libgdx game game [Wings of Fury](https://play.google.com/store/apps/details?id=com.wingsoffuryfree&hl=en) from Xamarin/IKVM to RoboVM as well, seeing pretty significant increases in performance. I’d attribute those mainly to the better JNI implementation in RoboVM.
You can find other stories on the forums.

Jonnus也移植他们的libgdx游戏Wings of Fury 从Xamarin/IKVM到RoboVM,看到相当重大的性能提升。我会归功于那些主要实现在RoboVM上的JNI实现。
你能在论坛里找到其他故事。

> ##Next Up

##接下来

> I plan on finishing the last bits of our RoboVM backend in the next few days to achieve feature parity with the other platform backends. Once that is complete, i’ll revamp our beloved setup-ui and replace it with something new. My goal is to make libgdx a truely polyglot game development framework, so we’ll need better integration with existing build and dependency management tools. I’m currently looking at Gradle, which seems promising, albeit a bit less ideal when it comes to IDE integration when compared with Maven.

我计划在接下来的几天中完成我们RoboVM后台的部分同其他平台后台。一旦完成，我将改造我们的心爱的setup-ui，取而代之的时一些新的。我的目标是使libgdx是一个真正通晓多国的游戏开发框架，因此我们需要更好的整合现在的构建和依赖管理工具。我当前正在看Gradle,似乎是有前途的，虽然有点不太理想跟Maven相比IDE集成。

> Niklas is going to attend JavaOne in San Francisco next week. I hope he gets the time to demo some of the libgdx games we are currently preparing for this event.

Niklas正要去出席下周在San Francisco 的JavaOne大会。我希望他能获取时间去演示一些libgdx开发的游戏，我们当前也正在准备这些事情。

> Pretty cool to see how much can be done in just a few weeks. Thanks to our community for the support, and especially Pascal, Chad and Christoph for providing Niklas with real-world games he can demo at JavaOne! You guys rock!

很酷，看看有多少可以在短短几周内完成。谢谢我们的社区支持，特别是Pascal，Chad和Christoph提供了现实世界游戏，他可以在JavaOne上演示！你们真是太酷了！