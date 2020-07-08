---
layout: post
title: '[译]探讨有关 `math/rand` 的并发安全'
keywords: golang, context
date: 2018-02-22 22:00:00
description: '[译]探讨有关 `math/rand` 的并发安全。'
categories: [Golang]
tags: [Golang, context]
comments: true
author: mai
---

    本文翻译自“GitHub Issue [#3611](https://github.com/golang/go/issues/3611)”，希望这一篇能够让我们对 `math/rand` 的并发安全有更深一点的理解。

----

## 问题

[@gar3ts)]：
我有一个项目，会多次使用不同的值调用 `rand.Intn()`。我的项目经常由于索引超出范围而发生 panic。

```golang
math/rand.(*rngSource).Int63(0xf84006a400, 0xf8412cc2a0, 0xf840050ab0, 0xf84006a400)
        C:/Go/src/pkg/math/rand/rng.go:243 +0x7e
math/rand.(*Rand).Int63(0xf84003d5e0, 0x200027bb78, 0x42e0eb, 0xf84003d5e0)
        C:/Go/src/pkg/math/rand/rand.go:37 +0x46
math/rand.(*Rand).Int31(0xf84003d5e0, 0x414b1b, 0x444369, 0x27bb60)
        C:/Go/src/pkg/math/rand/rand.go:43 +0x28
math/rand.(*Rand).Int31n(0xf84003d5e0, 0x3, 0x27bb60, 0x43c9c1, 0x20, ...)
        C:/Go/src/pkg/math/rand/rand.go:72 +0x79
math/rand.(*Rand).Intn(0xf84003d5e0, 0xf800000003, 0xf84104a5c8, 0xf841e9b160,
0xf84244e300, ...)
        C:/Go/src/pkg/math/rand/rand.go:86 +0x70
```

**你用(5g, 6g, 8g, gccgo)哪一个编译的?**

>`go run`

**你用哪个操作系统?**

>Windows7

**你用哪个版本?  (run 'go version')**

>1.0.1，但 1.0 有同样的问题

**请在下面提供任何附加信息。**

>它只发生在我使用多个处理器时，例如：`runtime.GOMAXPROCS(2)`
从 1000 个 goroutine 实例中去调用 rand 。
我检测 Int63() 捕获有用的值在一个 recover() 然后下载 MinGW 和
编译 Go amd64。以下是一些被捕获的状态：

```
seed: 1336714659800372000  
count: 1003446 // number of calls to Int63()
rng.feed: 330
rng.tap: 1212
```

另外一个:

```sh
seed: 1336715957940621400
count: 726597
rng.feed: 333
rng.tap: 1212
```

另外一个:

```
seed: 1336716097220587700
count: 478936
rng.feed: 327
rng.tap:  1212
```

注意 `len(rng.vec)` 是 607，`rng.feed` 和 `rng.tap` 被用作该数组的索引，所以对于上面的例子来说，显然 `rng.tap` 有问题的。目前尚不清楚它是如何超越范围的。

以下是来自索引超出范围 panic 的捕获，但没有超出范围的值：

```
rng.seed: 1336716288342519300
count: 390314
rng.feed: 337
rng.tap: 604
```

和:

```
rng.seed: 1336717800504010000
count: 143252
rng.feed: 334
rng.tap: 606
```

这看起来像是线程安全问题（最新的 http://golang.org/pkg/math/rand/ 已经明确提到了）。

----

[@ianlancetaylor](https://github.com/ianlancetaylor)：
如果你使用自己的 Rand 对象，你必须提供自己的锁定。Rand.Int31 使用的全局 Rand 对象，确实会锁定自己，所以我认为这是一个文档问题（可能旧文档没有提到 rand 是非线程安全的）。

[@robpike](https://github.com/robpike)：
确实是文档问题。

[@rsc](https://github.com/rsc)：
一般来说，规则是这样的：顶级函数像 `strings.Split` 或者
`fmt.Printf` 或 `rand.Int63` 可以随时从任何 goroutine 调用
（否则用它们来编程会太严格），但是你创建的对象（如新的 `bytes.Buffer` 或 `rand.Rand` ）只能是
除非另有说明，否则一次只能由一个 goroutine 使用（如
net.Conn 的文档）。

没有足够的堆栈信息来确切地说明，但听起来像你在自己分配的 `rand.Rand` 上用多个 goroutine 调用 Int63 。这是不被承诺可运行的，事实证明也不能。
如果你真的在调用顶层函数 `rand.Int63` 并且它崩溃了，那么这就是我们的错误，我们应该进行进一步的调查。请让我们知道它是什么。
谢谢。

[@gar3ts]：
我从我创建的 rand 调用 `rand.Intn(int)。
最好是用一个 mutex 去控制连接我创建的rand？

[@rsc](https://github.com/rsc)：
是的，用一个 mutex 是正确的解决方案，或者调用包的顶级 Intn 函数。

另外，通过对局部变量进行递减和范围修正，`rng.go` 中的代码是不是可以做 goroutine 安全的（防止 tap 和 feed 从跳转到 vector 的末尾）？

```go
    tap := rng.tap -1
    if tap < 0 {
        tap += _LEN
    }
    rng.tap = tap
    feed := rng.feed -1
    if feed < 0 {
        feed += _LEN
    }
    rng.feed = feed
```

[@rsc](https://github.com/rsc)：
重写可能会奏效，但你仍然有这个问题，对 Intn 的同时调用返回相同的值。另外，优化编译器将被允许将新代码重写到你的旧代码中。

[@gar3ts]：
好的，谢谢。我将创建不同的 rand 为了减少对顶层 rand 的争夺。
请根据我的建议考虑修订。我认为不同的 rands 偶尔会得到相同的值会比超出范围发生异常要好 - 至少编译器不会优化临时变量。

[@rsc](https://github.com/rsc)：
我考虑过这个问题，我认为可能会出现多余的代码崩溃。

## 扩展阅读

1. https://github.com/golang/go/issues/3611

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。


![打赏](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/money.jpg)
