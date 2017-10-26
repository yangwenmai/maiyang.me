---
layout: post
title: '[译]RoboVM后台更新'
date: 2013-09-19 02:51
comments: true
categories: Libgdx
---
> A couple of quick updates. First of all, you can track the progress and todos on the RoboVM backend in [this file](https://github.com/libgdx/libgdx/blob/master/backends/gdx-backend-robovm/todos.txt).

一对快速更新。首先，你可以在这个文件中跟踪RoboVM后台进度和待办事项。

> A couple of bugs have been fixed, including Preferences and various FileHandle/Files issues. Thanks for Niklas and Nex for that. Pixels per inch/centimeter calculations had a bug as well, that’s been fixed. The graphics context didn’t have a depth buffer, that’s been fixed as well.

一对bug已经修复，包括偏好和各种FileHandle和Files问题。谢谢Niklas和Nex所做的。每像素/每英寸计算也有bug，已经修复。图形上下文没有一个深度缓存，也已经修复了。

> I extended the [IOSApplicationConfiguration](https://github.com/libgdx/libgdx/blob/master/backends/gdx-backend-robovm/src/com/badlogic/gdx/backends/iosrobovm/IOSApplicationConfiguration.java#L17) so that you can specify the color depth, depth buffer precision, stencil precision and multisampling. You can also set a preferred frames per second value.

我扩展了IOSApplicationConfiguration，这样你能指定色彩深度，深度缓存精度，模具精度和多重采样。你也可以设置每秒喜好的帧。

> There are still a few issues that need ironing out. Multi-touch support has the highest priority, followed by orientation and accelerator fixes. After those it’s time to test all other features.

仍然有几个问题需要消除。支持多点触控具有最高优先权，其次是方向和加速修复。在哪之后就是测试所有其他特性了。

> If you ran into issues with the JSON class, here’s a tip on how to get things going. You need to tell RoboVM to force linking in the classes you read in via JSON through reflection. You can to that in the robovm.xml file like so:

如果你用JSON类有问题，这儿有一些提示怎么样去继续。你需要去告诉RoboVM，在类里面通过反射去读每个JSON要强制链接。你可以在robovm.xml配置：
`<forceLinkClasses>
    <pattern>com.badlogic.gdx.scenes.scene2d.ui.*</pattern>
  </forceLinkClasses>`
  
> Which links in all classes from that package. You can also use other Ant like patterns, e.g. `**` to include everything in a package recursively.

包中的所有类哪个链接。你也可以使用其他ant正则，例如 `**` 递归包括一个包中的所有内容。

> And finally, check the forums, a couple of folks already ported their games over, reporting very nice improvements in performance. Here’s Delver which i ported in about 30 minutes :)

最后，检查论坛，一对开发者已经移植他们的游戏过来了，在性能方面报告非常好。这个Delver我移植用了30分钟。
![Delver](http://libgdx.badlogicgames.com/uploads/Screen%20Shot%202013-09-17%20at%2020.15.27-PmZoKo0BYI.png)

> Stuff is in constant flux, so make sure you update both the libgdx nightlies and the RoboVM Eclipse plugin. To update the RoboVM libgdx stuff, make sure you replace gdx.jar, gdx-backend-robovm.jar, and the ios/libgdx.a file in your RoboVM project!

材料是在不断变化的，因此确保你更新libgdx最新版和RoboVM Eclipse插件。更新RoboVM libgdx材料，确保你在你的RoboVM工程里替换gdx.jar,gdx-backend-robovm.jar和ios/libgdx.a文件。