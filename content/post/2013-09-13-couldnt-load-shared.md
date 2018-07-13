---
layout: post
title: 'Couldnt load shared library'
date: 2013-09-13 02:10:00
comments: true
categories: [Libgdx]
---

在用libgdx游戏引擎进行案例开发时，遇到以上问题，*google，stackoverflow.com,github.com/...issue,libgdx community*
各种方法都试过了，都没有一个能解决的。

我沉下心来静静的思考，从错误异常来看，此种异常应该是非常简单的，只是无法加载这个文件而已，那我去找到这个文件，让它能加载不就解决了吗？

有了这样的思考，我就尝试着按照以下步骤去解决：
1. 根据提示，使用的gdx-freetype64.dll，所以我们需要去extensions\gdx-freetype里找
2. 每个目录结构都找过了，没有显式出现，有两个jar包，一个gdx-freetype.jar，一个是gdx-freetype-natives.jar，从命名上看，我们就能够猜想出来，我们所需要的文件很可能就在gdx-freetype-natives.jar里面，抑制不住内心的激动，打开一开，果然有我们所需要的文件

> dll 名词解释：动态链接库英文为DLL，是Dynamic Link Library 的缩写形式，DLL是一个包含可由多个程序同时使用的代码和数据的库，DLL不是可执行文件。动态链接提供了一种方法，使进程可以调用不属于其可执行代码的函数。函数的可执行代码位于一个 DLL 中，该 DLL 包含一个或多个已被编译、链接并与使用它们的进程分开存储的函数。DLL 还有助于共享数据和资源。多个应用程序可同时访问内存中单个DLL 副本的内容。DLL 是一个包含可由多个程序同时使用的代码和数据的库。
[百度百科](http://baike.baidu.com/link?url=-Tv-XUalwlB_WBlY9IScNU-Q_5y71nHqLuQ67xkbwjVct9fgYOeUHo3Wgpw4qp9jcz2DmJC-7cp5ubj-_kPtcK)
> 动态链接库（Dynamic Link Library或者Dynamic-link library，缩写为DLL），是微软公司在微软视窗操作系统中实现共享函数库概念的一种实作方式。这些库函数的扩展名是.DLL、.OCX（包含ActiveX控制的库）或者.DRV（旧式的系统驱动程序)。
[wiki](http://zh.wikipedia.org/wiki/%E5%8A%A8%E6%80%81%E9%93%BE%E6%8E%A5%E5%BA%93)
3. 有可能我们没有加上面两个必要的文件到classpath，所以导致无法加载，问题就此迎刃而解。

一个字，激动，两个字，非常激动。

O(∩_∩)O哈哈~