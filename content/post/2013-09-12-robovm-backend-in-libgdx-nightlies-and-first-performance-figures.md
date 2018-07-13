---
layout: post
title: '[译]RoboVM后台在libgdx nighties里的第一次演示'
date: 2013-09-12 09:23:00
comments: true
categories: [Libgdx]
---
原文链接[RoboVM backend in libgdx nightlies and first performance figures!](http://www.badlogicgames.com/wordpress/?p=3161)

翻译原文链接：http://www.maiyang.me/posts/2013/09/12/robovm-backend-in-libgdx-nightlies-and-first-performance-figures

简单翻译一下，如果有任何错误或不对的地方，请指正。

> I’ve spent the weekend integrating the libgdx [RoboVM](http://www.robovm.org/) backend into our build as well as the setup-ui. I’m happy to report that both tasks have been completed! If you want to give it a spin, here’s what you need to do:

我耗费了整个周末将libgdx RoboVM后台不仅集成到我们的构建里而且还有setup-ui。我很高兴向大家报告，这两个任务都已经完成了！如果你想用它，下面是你需要做的：

> - Get a Mac, you can only develop for iOS with a Mac. This also includes getting a [developer certificate](https://developer.apple.com/) from Apple if you want to test on a device. Sorry, blame Apple

- 获取一个Mac,你仅仅能在Mac上开发iOS.如果你想在设备上测试，你还要从苹果获取一个开发者认证。 对此我很抱歉，归咎于苹果。

- Install the necessary [prerequisits](https://code.google.com/p/libgdx/wiki/Prerequisits). For RoboVM that means installing an Eclipse plugin, from this plugin URL: http://download.robovm.org/eclipse/ and installing XCode on your Mac. That’s it!

- 安装必要的prerequisits。为了RoboVM意味着要安装一个Eclipse插件， 插件URL：http://download.robovm.org/eclipse/ 并且在你的Mac上安装XCode. 就这样!

<!--more-->
- Download the setup-ui JAR, run it (double click), and create a new libgdx project, using the nightlies (click the button with the “N” on it to download the nightlies in the setup-ui)

- 下载setup-ui JAR包，运行它(双击)， 并且创建一个新的libgdx项目， 用这个nightlies版本(在setup-ui里点击“N”按钮下载)

- Fire up Eclipse, and import all the projects. This will include the xxx-robovm project

- 使用Eclipse， 并且导入所有项目。 这将包括xxx-robovm项目

- To run things on the simulator, right click the RoboVM project, and select Run As -> iOS Simulator App. To run on a connected device, select Run As -> iOS Device App instead. Note that you have to provision your device first

- 在模拟器上运行， 右键RoboVM项目， 并且选择 `Run As -> iOS Simulator App `. 在连接设备上运行， 选择 `Run As -> iOS Device App`. 注意你必须首先准备你的设备。


> The setup-ui will also generate a Xamarin based project, which you can delete or ignore. As stated earlier, we’ll include the Xamarin backend in 0.9.9, so generating both a RoboVM and Xamarin project via the setup-ui was the most sensible option at this point.

setup-ui将生成一个Xamarin基础项目， 你可以删除或忽略。 如前所述， 我们将在0.9.9中包括Xamarin后台，因此用setup-ui生成RoboVM和Xamarin两个项目是最明智的选择。

> A couple of folks have already started porting their games from the Xamarin backend to the RoboVM backend. Among them is Christoph Aschwanden, head of [Noble Master Games](http://www.noblemaster.com/). Here’s the result:

A couple of folks 已经开始将他们的游戏从Xamarin后台移植到RoboVM后台。 其中 Christoph Aschwanden 和 head of Noble Master Games。 这儿是结果：

> His game “Demise of Nations: Rome” runs flawlessly. More importantly, **it runs faster with RoboVM than with the Xamarin backend!.** This is due to Niklas adding quite a few optimization to the latest RoboVM release, including more intelligent virtual method dispatch and enabling LLVM optimizations. I will setup a microbenchmark suite to get a feel for where the most time is spent. But having Christoph’s game as a comparative benchmark is already pretty amazing!

他的游戏“Demise of Nations: Rome” 完美运行。 更重要的， **它运行在RoboVM后台上比Xamarin后台上更快。** 这主要归功于Niklas在最新RoboVM release版本添加一些优化，包括更多智能虚拟方法调度使得LLVM优化。 我会设置一个微基准套件去花大量时间试探。不过，有Christoph的游戏作为比较基准已经相当惊人。

> Also, Niklas added audio to the libgdx RoboVM backend. We still lack finegrained controll over individual sounds, but i’ll try to get that in as soon as possible so we have feature parity with the other backends.

此外， Niklas添加audio到libgdx RoboVM后台。 我们仍然缺乏细粒度controll over 特别的声音，不过我会尽可能快的尝试去处理奇偶校验功能与其它后端。

> I update the Wiki with information on the RoboVM backend. I’ll redo the setup video this weekend as well, and add a wiki article explaining RoboVM configuration files (similar to Android’s AndroidManifest.xml). Niklas is working on getting IPA creation to work, so folks can submit to the App Store.

我更新RoboVM后台的维基信息。此外这个周末我会重新录制视频，并添加一个wiki的文章，解释RoboVM配置文件（类似Android的AndroidManifest.xml）。Niklas正在处理去得到一个可运行的IPA文件，让大家能提交到App Store。

> We are in the process of doing some bugfixing and feature completion on the RoboVM backend at the moment, so it’s ready for the 0.9.9 release. Stay tuned for more info!

此时此刻我们正在为RoboVM后台修复bug和完成特性之中，它已经准备发布0.9.9 release版本。 
更多信息敬请关注！
