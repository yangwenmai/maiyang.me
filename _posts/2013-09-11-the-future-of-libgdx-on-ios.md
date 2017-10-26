---
layout: post
title: '[译]Libgdx在iOS平台的新特性'
date: 2013-09-11 02:35
comments: true
categories: Libgdx
---
原文链接[THE FUTURE OF LIBGDX ON IOS](http://www.badlogicgames.com/wordpress/?p=3156)

翻译原文链接：http://www.maiyang.me/posts/2013/09/11/the-future-of-libgdx-on-ios

简单翻译一下，如果有任何错误或不对的地方，请指正。

> The latest Xamarin update, which brought us Mono 3.0, breaks our libgdx iOS backend. More precisely, it breaks the IVKM Monotouch port by Michael Bayne, on which we rely to run our JVM bytecode on iOS. Michaels already working fixed up most things, but there are still some bumps on the way to a fully working version, which requires the assistance of Xamarin.

最新版的Xamarin带来了Mono 3.0,破坏了我们的libgdx的iOS后台，更确切的说，它打破了Michael Bayne的IVKM Monotouch的端口。
我们依靠在iOS上运行的JVM字节码。Michael已经修复很多事情，但仍然有一个完整的工作版本需要Xamarin去协助，在过程中有些颠簸。

> Seeing how every update of Xamarin breaks our iOS backend, i can no longer promote this solution with good conscience. My skills and time budget are insufficient to support Michael, and not being able to fix things myself makes me really uncomfortable. The code i contributed to IKVM Monotouch was trivial compared to what Michael pulled off.

看到Xamarin每次更新如何打破我们的iOS后台，我再也不能具有良好的良知来推动这个解决方案了。我的技能和时间预算不足于支持Michael，不能够自己解决的事情，我真的很不舒服。相较于Michael的努力,我对IKVM Monotouch编程的付出简直是不值一提。

> For this reason i’m announcing the deprecation of the Xamarin based iOS backend. Here’s how that will go down:
We’ll push out the 0.9.9 release in the coming weeks, containing the stable IKVM monotouch port that is compatible with the previous release of Xamarin iOS (6.2.7.1).
We’ll tag the release as always, the remove any signs of the Xamarin backend from the repository as well as our build system. This will simplify our build considerably
We’ll create a replacement for the setup-ui, which is long overdue, and update the documentation were necessary.
If you are currently working on a game, you should avoid updating to the latest Xamarin iOS version. Stick to libgdx 0.9.8, or the upcoming 0.9.9, or any nightly release in between those two versions.. If you already updated Xamarin iOS, you can downgrade to a working version (6.2.7.1 pkg) as discussed in this issue.
We will start packaging the RoboVM backend starting with 0.9.9, which should now have feature parity with the Xamarin backend, thanks to a metric ton of hard work by Niklas Therning, creator of RoboVM. You should be able to “port” your game to that backend without huge problems (ymmv).

出于这个原因，我宣布弃用Xamarin基于iOS的后台。
这里，将如何往下走：
> 在未来几周内，我们将推出0.9.9版本，含有稳定的IKVM MonoTouch的端口，兼容以前的版本（6.2.7.1）Xamarin的iOS。
> 我们会标记release，一如既往地删除任何迹象Xamarin后端的储存库，以及构建系统。这将相当简化我们的构建。
> 我们将为setup-ui创建一个更换，这是期待已久的更换和更新的文件是必要的。
> 如果您目前正工作在一个游戏上，你应该避免更新Xamarin到最新的iOS版本。坚持libgdx0.9.8或0.9.9的到来，或任何在这两个版本之间的nightly release..如果您已经更新Xamarin的iOS，你可以降级到一个工作版本（6.2.7.1 PKG）在这个问题上讨论。
> 我们将从0.9.9开始包装RoboVM后端，现在应该有奇偶校验功能与Xamarin后端，谢谢由RoboVM的创作者Niklas Therning付出的巨大努力。你应该没有很大的问题就能够“移植”你的游戏（因人而异）。

<!--more-->

> Here are the pros and cons of this change:

下面是这一改变的利弊：

### CONS
> Performance of RoboVM is not yet on par with Xamarin. It should be sufficient for many games. I’m in the process of setting up a benchmark suite to quantify this Debugging is currently not supported in RoboVM. You will have to resort to printf.
No RoboVM apps on the app store yet, at least to my knowledge. However, RoboVM compiles to native code, like Xamarin (and by proxy Unity), or Flash, and it’s unlikely that Apple will reject apps compiled through RoboVM.

RoboVM的性能尚未与Xamarin看齐。它对于许多游戏应该是足够的。我在这个过程中设立一个量化的基准测试套件，目前不支持在RoboVM上调试。你将不得不求助于printf。
在App Store上的应用程序还没有RoboVM应用，至少据我所知。然而，RoboVM编译为本地代码，像Xamarin（和proxy Unity）或Flash，苹果将拒绝通过RoboVM编译的应用程序，这是不可能的。

### PROS
> Less layers of abstractions, RoboVM is a dedicated VM running (native, ahead-of-time compiled) bytecode.
> Full class library support, it supports the same Java classes Android supports (minus the Android specific APIs of course).
> IDE & Maven integration, the former being currently limited to Eclipse. You work just like with desktop, Android or GWT projects.
> Incremental builds, no more multi-minute waits to deploy to a real device
> Entirely Free and open-source, you still need a Mac and an Apple developer’s license though. Direct complaints towards Apple HQ.

较少的抽象层，RoboVM是一个专用的虚拟机运行字节码（本地，预编译）。
全类库支持，它支持相同的Java class Android支持（当然没有Android的特定API）。
IDE与Maven的集成，前者是目前限制到Eclipse。你的工作就像桌面，Android或GWT项目。
增量构建，没有多分钟的等待部署到真实设备
完全免费和开源，但是你还需要一台Mac和苹果公司开发的许可证。直接向苹果总部投诉。

> This is not a choice made lightly. I believe our deprecation measures are adequate, please speak out if you disagree. Overall i believe this change to be positive and i hope you share this thought with me.

这不是一个轻易做出的选择。我相信，我们的折旧措施是足够的，如果你不同意，请说出来。总的来说，我相信这种变化是积极的，我希望你跟我分享这个想法。

> I’d also like to state that this is in no way the fault of Xamarin. IKVM Monotouch is a (brilliant) hack, that just happened to work really well. It does not make financial sense for Xamarin to support this “use case”. We’ve received support from Xamarin in form of free licenses for 3 developers, for which we are greatful. They’ve also actively participated with comments and suggestions in the early phases of our iOS backend effort.

我也想说明，这是没有办法Xamarin故障。 IKVM MonoTouch是一个(辉煌)黑客，刚刚发生的工作真的很好。它不会使Xamarin金融意识支持这个“用例”。我们已经收到了从3个开发商的Xamarin的支持，我们感激免费授权形式。他们还积极参与的早期阶段，我们的iOS后台努力中的意见和建议。
