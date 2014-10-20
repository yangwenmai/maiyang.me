---
layout: post
title: 'jekyll配合github pages搭建个人博客'
keywords: 个人博客, jekyll, github pages
date: 2014-10-20 23:59
description: 'jekyll配合github pages搭建个人博客'
categories: [jekyll, github pages, 个人博客, 总结]
tags: [jekyll,github pages, 个人博客]
comments: true
group: archive
icon: file-o
---

现在有各种博客服务商，但是作为一个技术人，不折腾一下自己怎么能算是技术人呢。
一直以来，我都是在这样的自我鞭策下开始我的各种折腾。

先是CSDN，JavaEye，后是百度空间，XXXX，roon.io,writings.io,再到最近的jianshu.io,logdown.com，反正是怎么折腾就怎么来。详见我的另一篇[博文](http://maiyang.github.io/2013/08/28/my-blog-domain-name-history)。

回到今天的正题，技术圈一度风靡的jekyll配合github pages服务搭建自己的博客，可以绑定自己的域名，可以自定义样式，默认使用github提供的[maiyang](http://maiyang.github.io)二级域名。

怎么开始呢？

首先，你得申请一个github账号，然后你再生成一个项目，进入setting，即可将本项目作为一个github pages来使用了，成功之后大约10分钟，你就可以访问setting中指定的xxx.github.io。风格简洁。

其次，你可能已经看到很多人各式各样的基于github.io的风格，其中那肯定有你喜欢的风格，你只需要去fork一份他的博客项目代码，做部分修改调整即可发布上线了，是不是非常简单呢。这里推荐(https://github.com/pengx17/pengx17.github.io)/(https://github.com/codepiano/codepiano.github.com)

再次，fork代码之后,只能在线上操作也太土鳖了，所以我们可以clone到本地。这个时候jekyll就发挥作用了：他可以时刻预览clone本地的项目显示效果，还有其他更多功能。

最后，把新发布的文章push到自己的项目里面，刷新xxx.github.io即可看到新发布的文章了。是不是超级简单呢~

不过，再次过程中也并非就能一帆风顺，也有各种坑，比方说jekyll安装不成功，github pages无法指定自己想要的github.io二级域名。多用户无法正常提交github等。