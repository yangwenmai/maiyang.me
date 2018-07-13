---
layout: post
title: '【转】苹果如何查询文档'
date: 2013-08-24 03:27:00 +0800
comments: true
categories: [iOS]
tags: [doc, apple]
author: maiyang
mathjax: true
---

# Quick Help

最快捷的查询帮助文档的方法是不需要键入任何关键词的。你只需要在Xcode代码编辑器里，按住Option键，然后点击你想查询的关键词，就会获得关键词的帮助信息。如下图：
![](http://book.qiniudn.com/quickhelponkeyword.png)


帮助信息会包括，一些简单的描述、哪个iOS操作系统开始提供，头文件，参考文档。头文件和参考文档是可以直接点击的。

即使你点击的关键字不是Cocoa库的内容，是自己代码里面的类或者方法，也可以获得相关的定义信息。如下图：

![](http://book.qiniudn.com/quickhelponowncode.png)

与之相关的热键是Command键加鼠标点击，即可跳到任何一个类名或者方法名的所定义的头文件。

快速查询帮助的另外一个方法是直接打开Quick Help栏，如下图，首先找到“右侧栏开关”，然后找到“Quick Help”开关即可打开。

![](http://book.qiniudn.com/quickhelppanel.png)

Quick Help栏的作用机制是，只要它在打开状态，只要输入光标在什么关键字上，Quick Help栏就会显示跟关键字相关的简要帮助信息，跟Option键加点击的信息基本一致，但可能略微丰富一点。

写代码的时候，在大多数情况下，查询下快速帮助，看看头文件，就足以了。

搜索帮助
文档阅读界面最左面的上端的放大镜按钮就是搜索界面。下图是我们搜索uiimage，得到的搜索结果。

![](http://book.qiniudn.com/helpsearch.png)

首先值得注意的是，结果也是分类的，分为Reference、System Guides、Tools Guides、Sample Code这四类。类别很利于我们快速找到我们需要的信息。前面已经介绍过类别，跟那个基本一致，参照即可。

另外需要注意的是，搜索框下面的选项，首先是Hits Must(什么样的结果才会命中)，包含了三项：

contain search term 这是最常见的就是结果包含搜索词
start with search term 由搜索词开始
match search term 必须完全匹配搜索词
然后是Languages（语言选项），包含Javascript、C++、Java、Objective-C、C语言。

然后是，Find in（在哪些文档库搜索），包含了你Xcode里面安装的全部文档库。

阅读文档
最后，我们简单介绍下怎么阅读文档。文档的阅读界面如下图：

![](http://book.qiniudn.com/helpread.png)

<!--more-->
值得注意的是，标题下面这几样：

Inherits from 继承关系，继承自
Conforms to 遵循什么协议
Framework 属于什么框架
Availability 从什么iOS版本开始支持
Declared in 头文件
Related sample code 相关例子代码
Companion guide 相关的指南（UIImage没有，很多其他的类有）
在其次一个很重要的东西，其实是标题上面那一条窄窄的导航栏，那是一个多层树状导航栏，看文档的时候，可以点击那个栏的不同位置浏览。

其实这个栏包含了整个文档库的组织结构树状图，可惜只有在这个界面才能浏览。有兴趣的可以慢慢浏览，里面信息量其实非常大。
转自tiny4cocoa.com