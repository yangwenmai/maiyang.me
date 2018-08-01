---
layout: post
title: 'cannot take a address of temp params'
keywords: Golang
date: 2018-03-20 00:21:00
description: 'cannot take a address of temp params'
categories: [Golang]
tags: [Golang]
comments: true
author: mai
---

    本文介绍不能给临时变量分配内存地址。

----

The Go Programming Language Specification

## Address operators

For an operand x of type T, the address operation &x generates a pointer of type *T to x. The operand must be addressable, that is, either a variable, pointer indirection, or slice indexing operation; or a field selector of an addressable struct operand; or an array indexing operation of an addressable array. As an exception to the addressability requirement, x may also be a (possibly parenthesized) composite literal. If the evaluation of x would cause a run-time panic, then the evaluation of &x does too.

对于类型为 T 的操作数 x，地址操作 ＆x 生成一个类型为 \*T 的指针给 x。操作数必须是可寻址的，即变量，指针间接或片段索引操作; 或可寻址结构操作数的字段选择器; 或可寻址阵列的数组索引操作。作为寻址能力要求的一个例外，x 也可以是（可能加括号的）复合文字。 如果对x的评估会导致运行时恐慌，那么对 ＆x 的评估也会如此。

For an operand x of pointer type *T, the pointer indirection *x denotes the variable of type T pointed to by x. If x is nil, an attempt to evaluate *x will cause a run-time panic.

对于指针类型 \*T 的操作数 x，指针间接 \*x表示由 x 指向的类型 T 的变量。如果 x 是零，则评估 \*x 的尝试将导致运行时恐慌。

```go
&x
&a[f(2)]
&Point{2, 3}
*p
*pf(x)

var x *int = nil
*x   // causes a run-time panic
&*x  // causes a run-time panic
```

## 实战

```go
package main

func a() string {
    return "a"
}

func main() {
    var b *string
    b = &a() // cause a compile error: cannot take the address of a()
}
```

## 扩展阅读

1. https://stackoverflow.com/questions/10535743/address-of-a-temporary-in-go
2. https://stackoverflow.com/questions/40926479/take-the-address-of-a-character-in-string
3. https://golang.org/ref/spec#Address_operators

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)
![打赏](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/money.jpg)
