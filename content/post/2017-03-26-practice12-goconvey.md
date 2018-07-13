---
layout: post
title: 'goconvey 入门实战'
keywords: goconvey 入门实战
date: 2017-03-26 09:08:00
description: 'gocovey 介绍'
categories: [Golang]
tags: [golang]
comments: true
group: archive
icon: file-o
---

	本文耗时100分钟，可能需要耗费你10分钟。

昨天是不是习惯养成记的“时间”，不过是开始打卡的第13天。

<!--more-->

昨天是周六，所以对于之前确定的习惯养成计划来说，是没有什么安排的。

不过，没有计划的早起习惯却养成了。

最近开始关注 go test。很早之前就了解到有一个针对 Go 语言的testing框架--GoConvey。
	
	GoConvey 是个相当不错的 Go 语言单元测试包，直接与 go test 集成，具有完全自动化且效果出众的Web界面和可读性强的色彩控制台输出。GoConvey会监控项目文件变化，自动运行测试脚本。

### goconvey 安装 ###

`go get github.com/smartystreets/goconvey`
或者
`gopm get github.com/smartystreets/goconvey`

备注：go环境 和 gopath 路径要提前安装配置好。

### goconvey 简单介绍 ###

我用一个加减乘除预算来进行演示：

math.go，详细代码如下：
`
package goconvey

import (
	"errors"
)

// Add 加法
func Add(a, b int) int {
	return a + b
}

// Subtract 减法
func Subtract(a, b int) int {
	return a - b
}

// Multiply 乘法
func Multiply(a, b int) int {
	return a * b
}

// Division 除法
func Division(a, b int) (int, error) {
	if b == 0 {
		return 0, errors.New("被除数不能为 0")
	}
	return a / b, nil
}
`
，单元测试代码 `math_test.go`如下：
`
package goconvey

import (
	"testing"

	. "github.com/smartystreets/goconvey/convey"
)

func TestAdd(t *testing.T) {
	Convey("两数相加", t, func() {
		So(Add(0, 1), ShouldEqual, 1)
	})
}

func TestSubtract(t *testing.T) {
	Convey("两数相减", t, func() {
		So(Subtract(0, 1), ShouldEqual, -1)
	})
}

func TestMultiply(t *testing.T) {
	Convey("两数相乘", t, func() {
		So(Multiply(3, 7), ShouldEqual, 21)
	})
}

func TestDivision(t *testing.T) {
	Convey("两数相除", t, func() {

		Convey("除以非 0 数", func() {
			num, err := Division(1024, 8)
			So(err, ShouldBeNil)
			So(num, ShouldEqual, 128)
		})

		Convey("除以 0", func() {
			_, err := Division(10, 0)
			So(err, ShouldNotBeNil)
		})
	})
}
`
进入到文件目录下，执行 `go test` 或者 `go test -v`，如果你要看Web UI，则可以执行 `goconvey`。

### goconvey基本概述 ###

GoConvey 有两个比较重要的方法一个是 Convey  和 So。

1. Convey 函数接受的第一个参数为 string 类型的描述；第二个参数一般为*testing.T，即本例中的变量 t；第三个参数为不接收任何参数也不返回任何值的函数（习惯以闭包的形式书写）。
2. So 用来进行断言（[详细介绍](https://github.com/smartystreets/goconvey/wiki/Assertions)）
3. 最外层的 Convey 需要传入变量 t，内层的嵌套不需要传入。
4. GoConvey也支持自己定义一个断言函数 So的函数原型如下：

我们从So函数：`func So(actual interface{}, assert assertion, expected ...interface{})`可以看到第二个参数是 assertion，assertion 定义:`type assertion func(actual interface{}, expected ...interface{}) string`，只要我们传入一个符合assertion格式的函数就可以当做自定义断言函数了。

goconvey 还支持忽略Convey`skipconvey`以及某个So`skipso`。

还有网页端写测试用例， `http://127.0.0.1:8080/composer.html`，测试覆盖率报告，`http://127.0.0.1:8080/reports/`（选择某一个*.html即可查看）

### goconvey Web UI ###

多图介绍。

### 总结 ###

1. 有了可视化测试结果，以及测试覆盖率，应该会让你喜欢上写测试吧。
2. 热加载自动运行单元测试，这个功能非常赞。

----

### 拓展 ###

1. etcd 官方建议是3个单点。
2. 线上服务，做好备份，该高可用的一定要搭建高可用。

----

**茶歇驿站**

一个让你可以在茶歇之余，停下来看一看，里面的内容或许对你有一些帮助。

这里的内容主要是团队管理，个人管理，后台技术相关，其他个人杂想。

![茶歇驿站二维码](http://ww4.sinaimg.cn/large/824dcde4gw1f358o5j022j20by0bywf8.jpg)
