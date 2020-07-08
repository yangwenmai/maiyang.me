---
title: 'Go type switches 详解'
keywords: Golang, Go, type, switch
date: 2018-11-12T11:43:00+08:00
lastmod: 2018-11-12T11:43:00+08:00
draft: false
description: 'Go type switch 详解'
categories: [golang]
tags: [Golang, Go, type, switch]
comments: true
author: mai
---

## type switches

type switches 比较的是类型而不是值，它在其他方面类似于表达式 switch。
它由一个特殊的 switch 表达式标记，该表达式具有使用保留字 type 而不是实际类型的[类型断言](https://golang.org/ref/spec#Type_assertions)的形式：

```golang
switch x.(type) {
// cases
}
```

可以用 type switches 进行运行时类型分析，但是在 type-switch 不允许有 fallthrough 。

go build 报错：`cannot fallthrough in type switch`

## 实例

```golang
	in := []interface{}{"123", false, 123, (int32)(123), 3.4, true}
	for _, x := range in {
		switch x.(type) {
		case string:
			fmt.Printf("string, type is %T, value is %s\n", x, x)
		case bool:
			fmt.Printf("bool, type is %T, value is %t\n", x, x)
		case int32:
			fmt.Printf("int32, type is %T, value is %d\n", x, x)
		default:
			fmt.Printf("unknow, type is %T\n", x)
		}
	}
```

如果仅仅是测试变量的类型，不用它的值，那么就可以不需要赋值语句，比如：

```golang
	switch x.(type) {
	case string:
	    // TODO
	case int32:
	    // TODO
	...
	default:
	    // TODO
	}
```

type switch 在处理来自于外部的、类型未知的数据时，比如解析 JSON 或 XML 编码的数据时，类型测试和转换非常有用。


## %T 与 %t

%T, which prints the type of a value.
>%T, 打印一个值的类型。

%t, 打印一个值类型为 bool 的值。

## 参考资料

1. https://golang.org/doc/effective_go.html#type_switch
2. https://golang.org/doc/effective_go.html#printing

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。


