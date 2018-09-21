---
title: '浅析 Go 中的 defer channel close 的一些情况'
keywords: golang, defer, channel, close, nil
date: 2018-09-21T09:00:00+08:00
lastmod: 2018-09-21T09:00:00+08:00
draft: false
description: '浅析 Go 中的 defer channel close 的一些情况'
categories: [golang]
tags: [golang, defer, channel, close, nil]
comments: true
author: mai
---

## 背景

```golang
defer func() {
		fmt.Println("defer start...")
		if err := recover(); err != nil {
			fmt.Printf("err1:%v\n", err)
		}
		fmt.Println("defer end...")
	}()
	c := make(chan int)
	// var c chan int
	go func() {
		// defer func() {
		// 	if err := recover(); err != nil {
		// 		fmt.Printf("err2:%v\n", err)
		// 	}
		// }()
		c <- 1
	}()
	// 以下两行代码对调的话，运行就正常了，否则会 panic
	close(c)
	fmt.Println(<-c)

	for i := 0; i < 100; i++ {
		cc, ok := <-c
		if ok {
			fmt.Println(cc)
		}
		// fmt.Println(<-c)
	}
```

对于这个示例代码中的一些问题总结：

1. goroutine 里面的 panic ，在外面是不能被 recover() 的。
2. chan 是阻塞式的。
3. 从已关闭的 chan 读数据永远不会阻塞，一律返回空值。
4. 向已关闭的 chan 以任何形式写数据都会 panic。
	- 如果我们先调用 `go func() {c <- 1}()`，然后关闭 chan，此时再读取 chan 是有可能成功读取到数据，但是系统调度到执行 go func （即当我们向关闭的chan send 数据时，会报错 panic: send on closed channel）。
5. defer 只针对当前协程有效。
	- 当主函数都执行完了，函数中的协程也没执行完，并且 chan 关闭，再在协程中写数据， recover() 是不会报错的，因为我主函数执行完都还没有执行到协程中 chan 写数据。
	- 当主函数未执行完就执行协程中的写数据，并且在写之前 chan 已经关闭，则会执行 defer，但是 recover() 没有捕捉到错误，因为错误发生在另外一个协程中。
6. 关闭一个 nil channel 会发生 panic。

## 参考资料

1. [Close](https://golang.org/ref/spec#Close)
2. [Why does Go panic on writing to a closed channel?](https://stackoverflow.com/questions/34897843/why-does-go-panic-on-writing-to-a-closed-channel)
3. [Go 延迟函数 defer 详解](https://mp.weixin.qq.com/s/5xeAOYi3OoxCEPe-S2RE2Q)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)
