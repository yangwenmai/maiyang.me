---
layout: post
title: '【转】苹果文档导读'
date: 2013-08-24 03:05:00
comments: true
categories: [tools]
tags: [文档 苹果]
---
前面我们讲Xcode的文档结构是在介绍如何能够快速定位到你要找的内容。但是很多人的问题可能是一开始就根本不知道要读什么。

这里我们就介绍自学iOS开发应该遵循或者说我们推荐的必读文档的阅读顺序。

阅读顺序：

《马上着手开发 iOS 应用程序 (Start Developing iOS Apps Today)》
1.《Your First iOS App》
2.《Your Second iOS App: Storyboards》
3.《Your Third iOS App: iCloud》
4.《iOS Technology Overview》
5.《iOS Human Interface Guidelines》
6.《Learning Objective-C: A Primer》和《Programming with Objective-C》
7.《iOS App Programming Guide》
8.《View Programming Guide for iOS》和《View Controller Programming Guide for iOS》
9.《Table View Programming Guide for iOS》
首先应该看的是Getting Started里面的《马上着手开发 iOS 应用程序 (Start Developing iOS Apps Today)》（中英文版本皆有，苹果官方的翻译）。这个文档讲的很浅，但是是建立概念的文档，你以后在开发里面经常遇到的概念，在这里都有包含，特别注意是，这个文档看起来简单，但是每页下面的相关文章，不是选读，都是必读。

即使是很多做了iOS开发很久的同学，其实也有很多概念上的误解，现代程序开发越来越简单，工具越来越强大，往往有些误解也可以继续前行，但是实际上不建立扎实的基础是很吃亏的，往往后面理解和解决一个不难解决小问题都要付出很多辛苦。

**阅读这个文档的目的和检测标准是，以后你看到iOS开发中的基本概念，都大致所有了解。**

读完《马上着手开发 iOS 应用程序 (Start Developing iOS Apps Today)》后，应该去看Your XXX iOS App系列这个系列不是什么很难的文章，你也不必着急先去学习Objective-C，学什么C语言就更不要着急。我推荐的学习方法是有成就的逐步学习法。在学习系统体系架构、Objective-C之前，你可以先按照文档写一个全天下最简单的App，完成学习过程中第一个里程碑。在这个过程中不用担心有什么疑问，有什么不懂，先照着做就是。

**阅读这三个文档的目的和检测标准是，把这三个Demo App做出来在模拟器上跑起来。**

在这个过程中，你对开发工具的基本认识就建立起来了，也有了成就感，去了魅（就是消除了对iOS开发的神秘感）。

再往下，建议你去看《iOS Technology Overview》（iOS技术概览），iOS不是一个技术，而是一堆技术，前一篇讲到文档导航区域的分类，框架分类的时候，我说不细讲的原因就在于此，你要做一个动画应该用Core Animation还是OpenGL？你要做一些文本相关操作应该用Core Text还是什么，就是看这里。

学习现代的程序开发，语言和框架并重。我们Tiny4Cocoa叫做这个名字的原因就是，iOS/Mac开发者的代表往往就是这个Cocoa框架，就是这个SDK。大多数你所需要的功能都躺在框架里面，你知道框架的结构，你才知道怎么去寻找相关的技术资料。

<!--more-->

**阅读这个文档的目的和检测标准是，遇到具体问题，知道应该去看哪方面的文档。**

再下来，建议阅读的是《iOS Human Interface Guidelines》，Mac/iOS平台虽然也是百花齐放各类程序、App都有，但是总体看来，大多数优秀App的UI看起来都和整个系统很协调。这和Windows以及很多其他平台完全不同。这是为什么呢？

很大程度就归功于《Human Interface Guidelines》文化，所谓Human Interface Guidelines就是用户界面的规范，在苹果它还专门有一个缩写叫做HIG，是天条一样的东西。所有的App都推荐遵循HIG，遵循了HIG，你做的东西用户看起来就会觉得和整个系统很协调。即使是你要做一些创新的设计，你势必会打破HIG的限制，但是你这个时候仍旧应该遵循HIG的精神。

此外，你阅读HIG的很重要一点是了解整个UI结构和UE行为的逻辑机理，这样才能在你设计界面的时候有所依据。

**阅读这个文档的目的和检测标准是，看到任何一个App，你可以知道它的任何一个UI是系统控件，还是自定义控件，它的层次关系等等。**

《Learning Objective-C: A Primer》是非常初级和简单的入门，适合先阅读。《Programming with Objective-C》超微复杂一点点，适合后阅读。

一般人建议先学习语言，我反之建议先做了一个App，然后再学习语言。原因有几个，首先现代开发工具，往往不是用来开发控制台程序的，上来就会有框架，光懂语言不会使用IDE，甚至可能会更麻烦。再其次就是，其实现代语言发展到了面向对象以后，库往往比语言更复杂，更重要，或者说更多的时候，我们是在学习库，而不是语言，语言只是库的一个载体。

比如，Delegate和Block等等都和Cocoa的UI异步机制关系紧密，光看代码，这些语言元素非常难以学习，也完全不知道其意义在哪里。

**阅读这个文档的目的和检测标准是，看得懂基本的Objective-C代码，方便后面的学习和阅读各种示例代码。**

《iOS App Programming Guide》基本上介绍的就是开发一个App的完整流程，包括App的生命周期、休眠、激活等等，里面介绍的细节颇多。正式开发第一个上线的App之前必看。或者开发了一个App，临到提交前必看才文档。

**阅读这个文档的目的和检测标准是，了解全部流程和很多细节问题。**

《View Programming Guide for iOS》和《View Controller Programming Guide for iOS》非常重要。View是整个图形界面里面最重要的概念。所有的图形、界面绘制都基于View。你看到的一切复杂的用户界面，就是各种不同的View的组合堆叠。

View Controller是View和某种逻辑在一起的组合，本质上这种组合不是必须的，但是是大大降低编程复杂度的一种设计。很多人不懂什么是View什么是View Controller，这样写起代码来就很痛苦。

**阅读这个文档的目的和检测标准是，深刻理解什么是View，什么是View Controller，理解什么情况用View，什么情况用View Controller。**

UITableView是最重要的一个控件，是最常用的UI界面元素。在UICollectionView出现之前，大量的内容列表展示的自定义控件都是基于UITableView，比如很多书架、图片Grid其实都是UITableView做的。

所以《Table View Programming Guide for iOS》非常重要，一定要好好阅读。

**阅读这个文档的目的和检测标准是，深刻理解UITableView／UITableViewController的理论和使用方法。**

我推荐的必读文档就这么多，仔细看的话，最多也就是今天就看完了。学习一个东西，如果有一点点耐心，有正确的方法其实不难，不是说脑子非要很聪明，大多数人都可以做到一个星期就学会iOS开发，其实就是读完这些文档，大多数人就会了。

就像我强调了无数次，阅读英文文档不难，我自己从当年看英文文档非常吃力，必须查词典开始，认真的看英文文档，不会就查词典，一个多月过去，读英文文档就完全不需要查词典了。

我们公司主程 @sycx 老师，也说他原来英语也很不好，甚至现在英语仍旧很烂，但是看英文文档完全没有问题，也就是几个星期的认真学习以后就突破了。

其实学习iOS也如此。当然我不是说你看懂这10组文档就再也不用看别的了。而是说，如果你看懂了这10组文档，你就从初学者，或者是虽然会写一些程序，但是对iOS其实还不懂的状态，变成了一个入门者。

我不希望这个文章可以一句一句的帮你学会iOS是什么，这个文章的目的是帮你快速入门。一旦你入门了，你再遇到问题该看什么，你就不需要我讲了，你自己就知道了。一旦入门了，你就会发现，Xcode里面别的文档讲的内容虽然不同，但是结构你已经很清楚了，你学习起来很方便。

**阅读本文的目的和检测标准是，遇到问题，知道看什么文档，想提升自己技术的时候，知道按照什么脉络自己组织阅读。**
转自tiny4cocoa.com