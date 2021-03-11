---
title: '求一个中间位置的优化和改进'
keywords: 数学, 二分, 优化, 改进, 位运算, 右移, 性能, 位移, 计算机
date: 2020-12-25T09:44:00+08:00
lastmod: 2020-12-30T08:12:00+08:00
draft: false
description: '求一个中间位置的优化和改进'
categories: [math]
tags: [数学, 二分, 优化, 改进, 位运算, 右移, 位移, 计算机]
comments: true
author: mai
---

>本文源自于「Go 夜读知识星球」上的一次 #打卡阅读Go代码 第 51 天。

## 有何异同？

你能一眼看懂以下两行代码吗？

```
low + (high-low)/2
(low + high)/2
```

对于很多人，应该都能看出来，但是说实话我当时并没有看出来（数学的感觉已经随着时间慢慢消逝了😓）

## 数学演算

我来给大家做一下数学转换演算：

```
low + (high-low)/2
= low + high/2 - low/2
= low/2 + high/2
= (low + high)/2
```

反过来：

```
(low + high)/2 
= (2*low + high-low)/2
= (2*low)/2 + (high-low)/2 
= low + (high-low)/2
```

## 中间数的优化

我们求中间位置，可以写成：

`mid=(low+high)/2`

但是这种写法是有问题的。

因为如果 low 和 high 比较大的话，两者之和就有可能会溢出。

比方说：

```
low = 2147483641, high= 2147483648

2147483641 + 2147483648=4294967289

MAX_INT = 2147483647
```

那我们可以怎么改呢？改进的方法是将 mid 的计算方式写成 `low+(hgh-low)/2`。

也就是 `h := i + (j-i)/2 // avoid overflow when computing`,注释也写明了为什么这样写（防止计算溢出）

如果要将性能优化到极致的话，我们可以将这里的除以 2 操作转化成位运算 `low+((high-low)>>1)`。

因为相比除法运算来说，计算机处理位运算要快得多。

所以，在第 50 天打卡的 searchInts 函数的优化，大家应该就很容易理解了吧？

## 位移

优化的核心就是到了位移操作： >> 右移，那什么是右移呢？

```
1000（8）
0100（4）
0010（2）
0001（1）
```

维基百科：位操作是程序设计中对位模式或二进制数的一元和二元操作。在许多古老的微处理器上，位运算比加减运算略快，通常位运算比乘除法运算要快很多。在现代架构中，情况并非如此：位运算的运算速度通常与加法运算相同（仍然快于乘法运算）。

其中提到了一点说在现代架构中，位运算的运算速度通常与加法运算相同。

那维基百科上这种说法是否正确，以及它是什么原因？

While modern processors usually perform addition and multiplication just as fast as bitwise operations due to their longer instruction pipelines and other architectural design choices, bitwise operations do commonly use less power because of the reduced use of resources.[1]

https://en.wikipedia.org/wiki/Instruction_pipelining

https://en.wikipedia.org/wiki/Computer_architecture

https://cs.stackexchange.com/questions/75811/why-is-addition-as-fast-as-bit-wise-operations-in-modern-processors

## 参考资料

1. [位运算](https://zh.wikipedia.org/wiki/%E4%BD%8D%E6%93%8D%E4%BD%9C)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。
