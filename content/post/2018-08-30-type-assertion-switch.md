---
title: 'Go 语言中的 Type Assertion 与 Type Switch'
keywords: golang, type_assertion, type_switch
date: 2018-08-30T06:00:00+08:00
lastmod: 2018-08-30T06:00:00+08:00
draft: false
description: 'Go 语言中的 Type Assertion 与 Type Switch'
categories: [golang]
tags: [golang, type_assertion, type_switch]
comments: true
author: mai
---


----

## Type assertions

>类型断言并不真正将接口转换为另一种数据类型，但它提供了对接口具体值的访问，这通常是你想要的。

类型断言提供对接口值的基础具体值的访问。

`t := i.(T)`

该语句断言接口值 i 保持具体类型 T 并将基础 T 值分配给变量 t。

如果 i 不能持有 T，这个语句将发生 panic。

要测试接口值是否包含特定类型，类型断言可以返回两个值：基础值和报告断言是否成功的布尔值。

`t, ok := i.(T)`

如果 i 能持有 T，t 将得到基础值，ok 将是 true。

如果不能， ok 将是 false，t 将是 T 类型的零值， 并且没有 panic 发生。

请注意此语法与从 map 读取的语法之间的相似性。

Tour Examples：

```golang
package main

import "fmt"

func main() {
	var i interface{} = "hello"

	s := i.(string)
	fmt.Println(s)

	// ok 是 true 表明 i 存储的是 string 类型的值，false 则不是。
	s, ok := i.(string)
	fmt.Println(s, ok)

	// ok 是 true 表明 i 存储的是 float64 类型的值，false 则不是。
	f, ok := i.(float64)
	fmt.Println(f, ok)

	f = i.(float64) // panic
	fmt.Println(f)
}
```

### Type Switch

>type switch 串行执行多个类型断言，并以匹配类型运行第一个匹配。

用途：如果需要区分多种类型，可以使用 type switch 断言，这个将会更简单更直接。

```golang
switch t := i.(type) {
case *S:
    fmt.Println("i store *S", t)
case *R:
    fmt.Println("i store *R", t)
}
```

----

## 参考资料

1. [Explain type assertions in go](https://stackoverflow.com/questions/38816843/explain-type-assertions-in-go)
2. [Type Assertion And Type Switch](https://nanxiao.gitbooks.io/golang-101-hacks/content/posts/type-assertion-and-type-switch.html)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)
