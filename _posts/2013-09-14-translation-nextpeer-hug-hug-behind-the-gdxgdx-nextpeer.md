---
layout: post
title: '[译]Nextpeer拥抱GDX，GDX后面拥抱Nextpeer'
date: 2013-09-14 10:39
comments: true
categories: 
---
![Nextpeer](http://tctechcrunch2011.files.wordpress.com/2013/08/nextpeer.png?w=300)
原文链接：http://www.badlogicgames.com/wordpress/?p=3166

> [NextPeer](http://nextpeer.com/) is a service for creating synch and asynch multiplayer games, with tons of features. The big differentiator between NextPeer and Google Play Game Services is that it actually works on both Android and iOS (only leaderboards are crossplatform in GPGS) and that it allows both asynch and synch multiplayer games (only synch is supported by GPGS). The fine folks over at NextPeer, who have their headquaters in Isreal, contacted me a while ago to see if there’s a way to collaborate.

NextPeer是一个被用于创建同步和异步多人游戏的服务，有很多特性功能。NextPeer和Google Play 游戏服务最大的不同是，它实际上适用于Android和iOS（仅排行榜跨平台GPGS），它允许异步和同步多人游戏（仅支持同步由GPGS）。优秀的开发者在Nextpeer，总部设在以色列，前段时间，NextPeer与我联系，看看是否有合作的可能。

> We agreed that we’d start out with working on a [libgdx integration guide](https://developers.nextpeer.com/docs/view/libgdx). Turns out it’s as easy as adding their Android library to your game’s Android project, and then use a tiny shim to make it work with the rest of the libgdx infrastructure. You can find a modified [Super Jumper example on Github](https://github.com/ItamarM/Nextpeer-libgdx).

我们同意我们着手进行[libgdx集成指南](https://developers.nextpeer.com/docs/view/libgdx)。原来它是那么容易，因为他们的Android库添加到你的游戏的Android项目，然后用一个小垫片把它寄托于libgdx的基础设施上。你可以找到一个修改[Super Jumper example on Github](https://github.com/ItamarM/Nextpeer-libgdx)。

> The shim is currently a bit incomplete but can be easily extended if necessary. Also, things do not yet work for iOS. We’ll hold out with that until we finished the RoboVM transition.

垫片目前有点不完整的，但如果有必要，能很容易扩展。此外，事情还不能工作在iOS上。我们会坚持直到我们完成了RoboVM的过渡。

> In the meantime, hop over to NextPeer’s website, register a free account and start integrating multiplayer in your game!

在此期间，跳到NextPeer的网站，注册一个免费帐户，并开始整合多人在你的游戏！