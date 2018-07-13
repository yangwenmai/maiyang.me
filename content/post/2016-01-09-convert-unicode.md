---
layout: post
title: 'Golang Unicode字符串转义神坑'
keywords: podcast
date: 2016-01-09 01:00:00
description: 'Golang Unicode字符串转义神坑'
categories: [golang]
tags: [golang, unicode, 问题]
comments: true
group: archive
icon: file-o
---

在开发中遇到一个非常诡异的问题，一个Unicode字符串无法被正确的转成中文，一直显示Unicode字符串。

转义字符，维基百科：

>在计算机科学与远程通信中，转义字符是这样一个字符，标志着在一个字符序列中出现在它之后的后续几个字符采取一种替代解释。......

`https://zh.wikipedia.org/wiki/%E8%BD%AC%E4%B9%89%E5%AD%97%E7%AC%A6`

<!--more-->

代码最有说服力，我直接贴代码吧！

测试代码

> var str = "\u5751\u7239\u7684\u5b57\u7b26\u4e32\u8f6c\u4e49"

> fmt.Println(str)

执行以上代码，能够输出 `坑爹的字符串转义`。

但是我的代码

> var kk = "" // 这个字符串是从其他地方读取到的，切是unicode字符串

接下来这里的代码跟我上面写的测试代码基本一样。

但是运行的结果却是： `\u5751\u7239\u7684\u5b57\u7b26\u4e32\u8f6c\u4e49`

一开始没有怎么仔细思考，只是简单的以为可能是我处理字符串有问题，没有处理好，所以花了一点时间再检查kk 数据来源。

后面又对着`\u5751\u7239\u7684\u5b57\u7b26\u4e32\u8f6c\u4e49`沉思，突然想起来，他元数据是这样的，我打印不了中文，那肯定是转义出问题了。

那为什么不能转义呢？这时候大家应该想到了，肯定是这一串Unicode字符串中的\被转义了，这样得到字符串`\\u5751\\u7239\\u7684\\u5b57\\u7b26\\u4e32\\u8f6c\\u4e49`，如果是这样的字符串，那么我们通过程序输出打印的话，肯定得到的就是我们上面看到的值了。

既然知道原因，那我们要怎么解决呢？

最开始真的是一通乱想，想过根据\u来拆分，一组一组的来拼接，还想过google，寻找解决方案，然并卵。

后面想起来`的用法，` 可以声明无转义的字符串。

网上文章，详细说明

>[1](https://github.com/astaxie/build-web-application-with-golang/blob/master/zh/02.2.md)

>[2](http://novtopro.coding.io/2015/10/08/golang-fundamentals-01-overview/)

>[3](http://xhrwang.me/2014/12/27/golang-fundamentals-6-string-pointer.html)

所以我们可以这样来用。

> var kk = "" // 这个字符串是从其他地方读取到的，切是unicode字符串

> convertString := `"` + kk + `"`

然后我再使用的时候把前后的双引号去掉，就是我想要字符串了，直接输出即可。

怎么样把"" 方便的去掉了，golang提供了这样的方法

> strconv.Unquote(convertString)

相关说明，[godoc strconv](https://godoc.org/strconv)

在学习基础的时候，以为"", ``声明字符串也没有那么复杂，都挺简单的嘛，没想到自己在实际运用中，还是踩坑了。只能怪自己学艺不精啊，不过今天把它给研究透了。也是值得高兴，更重要的是要分享给大家，避免因此而继续踩坑。

希望今天的小case能够对你的工作和生活带来帮助。