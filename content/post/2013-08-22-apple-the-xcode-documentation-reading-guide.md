---
layout: post
title: '【转】苹果 Xcode 文档阅读指南'
date: 2013-08-22 01:10:00 +0800
comments: true
categories: [tools]
tags: [xcode 指南]
author: maiyang
mathjax: true
---

一直想写这么一个东西，长期以来我发现很多初学者的问题在于不掌握学习的方法，所以，Xcode那么好的文档摆在那里，对他们也起不到什么太大的作用。从论坛、微博等等地方看到的初学者提出的问题，也暴露出他们不知道很多他们的疑惑其实在文档里面写的非常清楚。而有时候[当他们想从文档去找解决方案的时候](http://tiny4cocoa.com/thread/show/76/)，也往往找不到。或者有些人意识到了，[阅读文档是学习的好办法，但是不得要领](http://tiny4cocoa.com/thread/show/102/)。

中国的技术社区有一个很没意思的毛病，就是技术深了，看不懂骂不知所云，技术浅了，看得懂骂没有技术含量。不过管那么孙子做啥，对于现在可能还不知道怎么阅读文档的人，希望这篇文章有所教益吧。

#Xcode文档的结构#
![orginzer](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/xcodedocument.png)

如上图，整个文档界面有左面的侧栏和右面的内容区域构成。左面的侧栏可以选择不同的文档库。你的Xcode里面一般来说有一组不同版本的iOS文档库、一组不同版本的OS X文档库，以及一个Xcode文档库。

如果你这里没有你要查看的文档库，你可以选择Xcode的Preferences菜单，然后选择Downloads -> Documentation。在这里可以看到已经下载安装了的文档库，还没有下载的文档库，可以酌情选择。如下图：

![download](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/xcodedownload.png)

然后我们看，文档内容区域的左侧导航区域，这里揭示了文档库的结构。如下图：

![iOS developer library](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/xcodedocnav.png)

首先是，Resource Types，也就是资源类型。文档库里面全部的文档都是这几个类型中的一个：

<!--more-->

Getting Started —— 新手入门，一般来说，是给完全的新手看的。建议初学者看看，这里面有一些建立观念的东西，有了这些建立观念的东西，后面的学习就比较容易了。
Guides —— 指南，指南是Xcode里面最酷最好的部分，学会看指南则大多数情况完全不用买书。Xcode文档里面的指南，就是一个一个问题的，从一个问题，或者系统的一个方面出发，一步一步详细介绍怎么使用Cocoa库的文档。一般程序员比较熟悉的是Reference，就是你查某个类、方法、函数的文档时候，冒出来的东西。那些其实是一点一点的细碎知识，光看那些东西就完全没有脉络。而Guides就是帮你整理好的学习的脉络。
Reference —— 参考资料。一个一个框架一个一个类组织起来的文档，包含了每个方法的使用方法。
Release Notes —— 发布说明。一个iOS新版本带来了哪些新特性，这样的信息，熟悉新iOS，比较不同iOS版本API不同，都需要参考这些文档。
Sample Code —— 示例代码。苹果官方提供的一些示例代码，帮助你学习某些技术某些API。非常强烈建议学习的时候参考，一方面光看文档有时候还是很难弄明白具体实现是怎么回事儿。另外一方面这些示例代码都是苹果的工程师写的，你从示例代码的变迁可以看到苹果官方推荐的代码风格流变。
Technical Notes —— 技术说明。一些技术主题文章，有空的时候可以浏览一下。往往会有一些收获。
Technical Q&A —— 常见技术问答。这是技术社区里面一些常见问题以及回答的整理。
Video —— 视频。目前主要是WWDC的视频，实际上是登录到开发者网站上去浏览的，这里就是快捷方式。想深入学习的话，一定不能错过，大量的看，不仅可以学好技术，还可以练好英文。
总结一下，这里面的Reference、Release Notes、Sample Code、Technical Notes、Technical Q&A，一般来说只是备查的。主要要看的是Getting Started和Guides。

然后下面是Topics，也就是话题，被分为：

1. Audio & Video —— 音视频
2. Languages & Utilities —— 语言和工具，Objective-C的一些知识，App Store的管理工具等。
3. Mathematical Computation —— 数学计算。
4. Xcode
5. Data Management —— 数据管理。
6. General —— 一般性的问题。
7. Graphics & Animation —— 图形和动画。
8. Networking & Internet —— 网络问题。
9. Performance —— 性能。
10. Security —— 安全。
11. User Experience —— 用户体验。  
这里不多说，大多数都是顾名思义的问题。但是值得一提的就是有很多初学者说，我想好好了解下图形和动画的技术，但是文档里面找不到，这就只能说，你睁着大大的眼睛，为毛左看右看看不到呢？

最下面是Frameworks（框架），分为：

	1. Cocoa Touch Layer
	2. Media Layer
	3. Core Services Layer
	4. Core OS Layer
这里我们先不讨论这个东西，后面会仔细讲。

总体来说左边的导航区域就是用三种不同的维度，来帮你精准定位你需要的内容。

现在我们看内容区域的右边。注意上面的文档过滤器。如下图：

![document](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/xcodedocumentfilter.png)

假设，你现在想看关于性能方面的Guides，那么你应该做的就是在左面的导航，点击Topics -> Performance，然后在右边的文档过滤器上面输入Guides。或者你也可以在左边的导航，点击 Resource Types -> Guides，然后在文档过滤器里面输入 Performance。

熟练使用导航和文档过滤器的话，学习就会非常方便快捷。
转自[tiny4cocoa.com](http://tiny4cocoa.com/thread/show/117/)