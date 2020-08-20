---
title: '科普：什么是鸽巢原理？'
keywords: pigeonhole principle, 鸽巢原理, science
date: 2020-08-19T18:35:00+08:00
lastmod: 2020-08-20T08:47:00+08:00
draft: false
description: '科普：什么是鸽巢原理？'
categories: [science]
tags: [pigeonhole principle, 鸽巢原理, science, 科学, 科普]
comments: true
author: mai
---

![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/too_many_pigeons.jpg)

## 鸽巢原理（Pigeonhole Principle）

鸽巢原理，它是德国数学家[狄利克雷](https://zh.wikipedia.org/wiki/%E7%B4%84%E7%BF%B0%C2%B7%E5%BD%BC%E5%BE%97%C2%B7%E7%8B%84%E5%88%A9%E5%85%8B%E9%9B%B7)（Divichlet，1805—1855）首先明确的提出来并用以证明一些数论中的问题，所以也称为狄利克雷原则。它是组合数学中最简单，也是最基本的原理。在数论和密码学中应用丰富。

它的定义：若有 n 个笼子和 n+1 只鸽子，所有的鸽子都被关在鸽笼里，那么至少有一个笼子有至少 2 只鸽子。

它的证明：如果这 n 个笼子中的每一个都至多装有一个鸽子🕊，那么鸽子🕊的总数最多是 n。既然我们有 n+1 个鸽子🕊，于是某个笼子里面就必然包含至少两个鸽子🕊。

大家如果想要了解更专业的数学证明，可以自行在网上搜索学习。

## 鸽巢原理在生活中的应用案例

盒子里有 10 只黑袜子、12 只蓝袜子，你需要拿一对同色的出来，最少需要拿出几只？假设总共只能拿一次，只要 3 只就无法回避会拿到至少两只相同颜色的袜子，因为颜色只有两种（鸽巢只有两个），而有三只袜子（三只鸽子），从而得到“拿 3 只袜子出来，就能保证有一双同色”的结论。

## 鸽巢原理在计算机领域的应用案例

分布式一致性算法的重要原理。

## 参考资料

1. https://en.wikipedia.org/wiki/Pigeonhole_principle
2. https://zh.wikipedia.org/wiki/%E9%B4%BF%E5%B7%A2%E5%8E%9F%E7%90%86
3. https://wenku.baidu.com/view/9e66fe068e9951e79b892783.html
4. [浅谈基于 simhash 的文本去重原理
 - 将鸽巢原理应用到 simhash 去重问题](https://mp.weixin.qq.com/s/CM4jB2ExWXR4PbyyhYMZ_w)
5. [鸽巢原理简单形式及应用 by 北航计算机学院 - 李建欣](http://act.buaa.edu.cn/lijx/course/combinatorics/ppt/Combinatorics2015.Chapter3.1.pdf)
6. [应用鸽巢原理的纸牌魔术一则](https://youtu.be/_OBiiYhGb0c)
7. [MIT mathematics for computer science exams](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-042j-mathematics-for-computer-science-spring-2015/counting/tp10-1/the-pigeonhole-principle/)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。
