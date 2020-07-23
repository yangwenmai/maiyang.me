---
title: 'go:nosplit 究竟是个啥？有啥用？'
keywords: go, nosplit, golang
date: 2020-07-21T07:51:00+08:00
lastmod: 2020-07-23T22:42:00+08:00
draft: false
description: '探究 go:nosplit 的用途，以及来由'
categories: [golang]
tags: [go, nosplit]
comments: true
author: mai
---

## //go:xxx 是什么？

`//go:xxx` 是编译器指令，编译器接受注释形式的指令。
为了将它们与非指令注释区分开来，指令在注释开头和指令名称之间不需要空格。 但是，由于它们是注释，因此不了解指令约定或特定指令的工具可以像其他注释一样跳过指令。

## 行指令

那行指令又是什么呢？
>行指令是历史上的特例。行指令通常出现在机器生成的代码中，以便编译器和调试器将原始输入中的位置报告给生成器。

行指令有以下几种形式：

```
//line :line
//line :line:col
//line filename:line
//line filename:line:col
/*line :line*/
/*line :line:col*/
/*line filename:line*/
/*line filename:line:col*/
```

所有其他指令的形式为 `//go:name`，并且必须从行的开头开始，指示该指令由 Go 工具链定义。

现在有以下 go 编译器指令：

- //go:noescape
- //go:nosplit
- //go:linkname localname [importpath.name]

### //go:nosplit 是什么？

`//go:nosplit` 指令是用于指定文件中声明的下一个函数不得包含堆栈溢出检查（简单来讲，就是这个函数跳过堆栈溢出的检查。）。在不安全地抢占调用 goroutine 的时间调用的低级运行时源最常使用此方法。

### //go:nosplit 有什么用？

如果编译器发现函数栈太大会将其编译成能 split 栈的函数，但是运行时里面有些函数不能 split，编写的时候人为用 //go:nosplit 指令标记这个函数不能 split，如果以后有人改代码把这个函数的栈改大了，就能早期检测到错误

在 `src/cmd/compile/internal/gc/plive.go` 中也有一些阐述，通常的理解就是“在这个函数上没有安全点”

```golang
func (lv *Liveness) issafepoint(v *ssa.Value) bool {
	// The runtime was written with the assumption that
	// safe-points only appear at call sites (because that's how
	// it used to be). We could and should improve that, but for
	// now keep the old safe-point rules in the runtime.
	//
	// go:nosplit functions are similar. Since safe points used to
	// be coupled with stack checks, go:nosplit often actually
	// means "no safe points in this function".
}
```

### //go:nosplit 能用吗？

//go:nosplit 不是 Go 语言的一部分。除非你在 Go 运行时本身上进行工作，否则即使在核心之外进行任何操作，也不应使用它。如果你尝试使用它，可能只是评论。

### go:nosplit 源码级探究

编译阶段的入口函数是 `func Main(archInit func(*Arch))`

```golang
func Main(archInit func(*Arch)) {
	// ...

	timings.Start("fe", "parse")
	lines := parseFiles(flag.Args())
	timings.Stop()
	timings.AddEvent(int64(lines), "lines")
}
```

parseFiles 中循环 filenames 时，会 goroutine 调用到 pragma PragmaHandler， `func (p *noder) pragma(pos syntax.Pos, text string) syntax.Pragma` 。

```golang
func pragmaValue(verb string) syntax.Pragma {
	switch verb {
	// ...
	case "go:nosplit":
		// Nosplit                      // func should not execute on separate stack
		// NoCheckPtr                   // func should not be instrumented by checkptr
		return Nosplit | NoCheckPtr // implies NoCheckPtr (see #34972)
	// ...
}
```

## 其他问题

什么时候可以在 unsafe.Pointer 和 uintptr 之间安全转换？可以参见 https://golang.org/issue/8994

## Reference

1. https://golang.org/cmd/compile/#hdr-Compiler_Directives
2. https://dave.cheney.net/2018/01/08/gos-hidden-pragmas
3. https://groups.google.com/g/golang-nuts/c/jlZXm5VujCI/m/d3DCOI_nCAAJ
4. https://groups.google.com/g/golang-nuts/c/Tq3cFNlg7ac/m/97sLI9uCAgAJ
5. [4.1.1 堆栈溢出](https://www.yuque.com/docs/share/21876bec-c481-4055-b97f-7a5115844829)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。
