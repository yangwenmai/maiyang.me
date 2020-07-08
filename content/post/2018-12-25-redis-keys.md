---
title: 'Redis 中的 key 和 value 大小限制以及性能分析'
keywords: Redis, Golang, key, value, perfermance, limit
date: 2018-12-25T18:45:00+08:00
lastmod: 2018-12-25T18:45:00+08:00
draft: false
description: 'Redis 中的 key 和 value 大小限制以及性能分析'
categories: [Golang]
tags: [Redis, Golang, key, value, perfermance, limit]
comments: true
author: mai
---

## Redis 键

Redis key 是二进制安全的，这意味着您可以使用任何二进制序列作为 key，从 “foo” 这样的字符串到 JPEG 文件的内容，空字符串也是有效 key。

关于 key 的一些其他规则：

- 很长的 key 不是一个好主意。例如，1024 字节的 key 不仅是内存方面的坏主意，不仅仅因为内存浪费，更是因为在数据集中搜索对比 key 时需要消耗更多成本。当要处理一个非常大的值，从内存和带宽的角度来看，使用这个值的 hash 值是更好的办法（比如使用 `SHA1`）。
- 非常短的 key 通常也是不推荐的。在写 “u1000flw” 这样的 key 的时候，有一个小小的要点，我们可以使用 “user:1000:followers” 替代它。对于 key 和 value 对象所增加的空间占用与可读性相比，它倒是次要的。虽然短 key 可以减少消耗内存，但我们的工作就是要找到合适的平衡点。
- 尝试固定一个结构。例如，“object-type:id” 是一个好主意，如 “user:1000” 。点或短划线通常用于多字字段，如 “comment:1234:reply.to” 或 “comment:1234:reply-to”。
- 允许的最大 key 大小为 512 MB。

## Redis 中的 key 和 value 大小限制以及性能分析

更多详细数据，可以参考参考资料。

结论是：key 和 value 越大，性能就越差。

## 参考资料

1. [data-types-intro keys](https://redis.io/topics/data-types-intro)
1. [redis键名长度如何影响性能的？](https://segmentfault.com/q/1010000015797664)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。


