---
layout: post
title: '浮点精度问题终极解决方案'
keywords: decimal, 浮点, 精度
date: 2016-02-18 09:00
description: 'golang 浮点进度问题终极解决方案'
categories: [golang]
tags: [decimal]
comments: true
group: archive
icon: file-o
---

首先，谢谢大家关注“茶歇驿站”。

过年放假8天，年后刚上班，又很忙，所以断更了12天。

在此之前，本公众号的更新频率是每日一更，当时的想法就很简单，每天坚持一篇，让自己养成分享和写作的“好习惯”。

在写作的过程中，我一直在思考，为了坚持而坚持输出的文章质量真的很难保证。有好多都太偏向于是个人日志了，发出来给大家看也是在浪费大家的时间。

所以我将在此之后进行不定期更新，保证每一篇文章都是有料的，至少可以给你带来价值的。

<!-- more -->

今天的主题是浮点类型的精度问题。

>本篇文章所涉及的代码都是基于Golang的，不知道Golang是什么的话，就google吧。

### 案例分析 ###

**第一个例子**

var f1 float32 = 9.90
fmt.Println(f1*100)
var f2 float64 = 9.90
fmt.Println(f2*100)

得到的结果是：

989.99994
990


如果你是开发新手，是不是感觉到很奇葩，很诡异，如此简单的运算，计算机居然给出来这样的结果。

**第二个例子**

>在字符串与浮点类型之间转换

由于浮点数有精度的问题，精度不一样，ParseFloat 和 FormatFloat 可能达不到互逆的效果。


s := strconv.FormatFloat(1234.5678, 'g', 8, 32)
fmt.Println(s)
fmt.Println(strconv.ParseFloat(s, 32))
s = strconv.FormatFloat(1234.5678, 'g', 8, 64)
fmt.Println(s)
fmt.Println(strconv.ParseFloat(s, 64))

得到的结果是

1234.5677
1234.5677490234375 <nil>
1234.5678
1234.5678 <nil>


通过上面的例子，大家会不会觉得float64就是解决float32的精度问题呢？float64就基本安全了呢？

如果你真那么认为的话，只能用前国家主席的话来说你了。

**最后一个例子**

var n float64 = 0
for i := 0; i < 1000; i++ {
	n += .01
}
fmt.Println(n)

得到的结果是

9.999999999999831

可运行地址：http://play.golang.org/p/TQBd4yJe6B

你还会不会觉得float64就安全了呢？

更多的例子，在这里就不在赘述（这一次我的拼音终于打出来了）了。

### 精度问题的来源 ###

浮点数主要应用于价格（元角分），其实要解决这个场景下的精度问题最简单的方案就是不要使用浮点数，而是*100后的整型，不让问题产生是最好的解决办法。

但是，浮点数进度问题是存在的，不可能不去解决啊，也不可能都能用整型解决啊。

### 解决方案 ###

[Arbitrary-precision fixed-point decimal numbers in go](https://github.com/shopspring/decimal)

安装

>go get github.com/shopspring/decimal

用法

	package main

	import (
    "fmt"
    "github.com/shopspring/decimal"
	)

	func main() {
    price, err := decimal.NewFromString("136.02")
    if err != nil {
        panic(err)
    }

    quantity := decimal.NewFromFloat(3)

    fee, _ := decimal.NewFromString(".035")
    taxRate, _ := decimal.NewFromString(".08875")

    subtotal := price.Mul(quantity)

    preTax := subtotal.Mul(fee.Add(decimal.NewFromFloat(1)))

    total := preTax.Mul(taxRate.Add(decimal.NewFromFloat(1)))

    fmt.Println("Subtotal:", subtotal)                      // Subtotal: 408.06
    fmt.Println("Pre-tax:", preTax)                         // Pre-tax: 422.3421
    fmt.Println("Taxes:", total.Sub(preTax))                // Taxes: 37.482861375
    fmt.Println("Total:", total)                            // Total: 459.824961375
    fmt.Println("Tax rate:", total.Sub(preTax).Div(preTax)) // Tax rate: 0.08875
	}

更多针对此库的分析，且看后文。

### 延伸阅读 ###

1. [IEEE_754](https://zh.wikipedia.org/wiki/IEEE_754)
2. [浮点进度问题讲解的文章](http://coolshell.cn/articles/11235.html)
3. [golang floating point precision float32 vs float64](http://stackoverflow.com/questions/22337418/golang-floating-point-precision-float32-vs-float64)
4. [2.4/0.8=2?](http://stackoverflow.com/questions/15342357/golang-float-number-division)
5. [What Every Programmer Should Know About Floating-Point Arithmetic](http://floating-point-gui.de/)