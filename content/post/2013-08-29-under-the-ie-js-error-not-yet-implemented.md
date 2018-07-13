---
layout: post
title: 'IE下JS错误“尚未实现”'
date: 2013-08-29 03:14:00
comments: true
categories: [javascript]
---
###IE下JS错误“尚未实现”解决办法

今天在开发一个功能时，使用到了`onpaste=check();`，在FF,Chrome下一切都正常，但是当我用IE8测试的时候，总给我提示JS错误。
错误信息为“尚未实现”，无论怎么搞就搞不定。诡异的是在chrome和FF的调试模式下没有看到任何错误提示。

一打开IE8就遇到这个该死的“尚未实现”错误，根据IE8中提示的位置找过去也没有明白其发生了什么错误。

万般无奈之下，google搜索，终于找到了错误所在的地方。

根据文中所说，
>原来错误在于`window.onload= myFunc(var1,var2);`IE的`window.onload`函数中不支持参数调用，虽然函数会照样执行，但是却会出现报错，影响后续脚本的继续执行，下面是两种简单而有用的解决办法：
1. 再写一个函数，譬如`function loadFunc(){ myFunc(var1,var2) }`,然后`window.onload = loadFunc;`
2. 使用匿名函数。`onload =function(){myFunc(var1,var2)}`

 
所以依葫芦画瓢，我们的onpaste方法肯定也是不支持参数调用的。