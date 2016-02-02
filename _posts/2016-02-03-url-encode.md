---
layout: post
title: 'URL编码简析'
keywords: url, encode
date: 2016-02-03 00:30
description: 'URL编码简析,rfc1738协议'
categories: [url]
tags: [url]
comments: true
group: archive
icon: file-o
---

URL，每个人都不陌生，即便是非专业人士，也能懂。

或者我换个名词，你肯定能动了。

>URL，就是网址。

<!-- more -->

URL只能使用英文字母、阿拉伯数字和某些标点符号，不能使用其他文字或符号。这个在RFC1738协议中有明确要求的。

http://www.ietf.org/rfc/rfc1738.txt

关于URL中存在汉字的情况，阮一峰大神在很早之前有写一篇博文-[关于URL编码](http://www.ruanyifeng.com/blog/2010/02/url_encoding.html)，我在这里不再陈述。

URL还可能出现+，空格，/，?，%，#，&，=等特殊符号，我们要改如何是好呢？

答案就是URL Encode，它的编码的格式是：一个百分号，后面跟对应字符的ASCII（16进制）码值。

### URL字符转义 ###

>+    URL 中+号表示空格 						%2B   
空格  URL中的空格可以用+号或者编码               %20 
/    分隔目录和子目录                          %2F     
?    分隔实际的URL和参数                       %3F     
%    指定特殊字符                             %25     
#    表示书签                                %23
&    URL 中指定的参数间的分隔符                %26     
=    URL 中指定参数的值                      %3D

更多相关知识，我也不再陈述了。

### tips ###

接下来了，我给大家分享一个实际使用小技巧。

如果你使用过七牛的图片处理功能`imageView2`，那你应该能深有体会。

>http://developer.qiniu.com/resource/gogopher.jpg?imageView2/1/w/200/h/200

如果imageView2参数没有统一处理的话，就会存在一种情况是：每个使用图片的地方都按照自己所需进行了处理。

如果客户端和服务器都做了处理呢？

可能就得到了
>http://developer.qiniu.com/resource/gogopher.jpg?imageView2/1/w/200/h/200?imageView2/1/w/100/h/100

很显然我们知道，上面的链接是会报错的。

>{"error":"invalid argument"}

如果我们要让该图片按照我们自己控制的方式来显示，那么我们只需要在最前面URL后拼接imageView2,然后再带上#，得到如下URL:

>http://developer.qiniu.com/resource/gogopher.jpg?imageView2/1/w/200/h/200#?imageView2/1/w/100/h/100

就这样很巧妙的解决了。