---
layout: post
title: 'sync.Once 源码分析'
keywords: golang, sync, Once
date: 2018-02-09 11:00:00
description: 'sync.Once 源码分析'
categories: [Golang]
tags: [Golang, sync, Once]
comments: true
author: mai
---

    本文是sync.Once的源码分析。

----

源码很少，直接看源码吧。

```golang
// Copyright 2009 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package sync

import (
    "sync/atomic"
)

// Once 是一个会执行一个动作的对象。
type Once struct {
    m    Mutex
    done uint32
}

// 当且仅当第一次为这个 Once 实例调用 Do 时，才调用函数 f。
// 换句话说，定义一个 var once Once，如果 once.Do(f) 被调用多次，只有第一次会调用 f，即使 f 在每次调用中都有不同的值。
// 为了执行每个函数，需要新的Once实例。
// Do 是用于初始化的，只能运行一次. 由于 f 是 niladic，因此需要使用函数文字来捕获由 Do 调用的函数的参数：
//  config.once.Do(func() { config.init(filename) })
// 因为没有给 Do 的调用返回，直到对 f 的一次调用返回，如果 f 导致 Do 被调用，它将会死锁。
// 如果 f panic，Do 认为它已经返回了；未来调用 Do 将不再调用 f 。
//
func (o *Once) Do(f func()) {
    if atomic.LoadUint32(&o.done) == 1 {
        return
    }
    // Slow-path.
    o.m.Lock()
    defer o.m.Unlock()
    if o.done == 0 {
        defer atomic.StoreUint32(&o.done, 1)
        f()
    }
}
```

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)
![打赏](http://oqos7hrvp.bkt.clouddn.com/blog/money.jpg)
