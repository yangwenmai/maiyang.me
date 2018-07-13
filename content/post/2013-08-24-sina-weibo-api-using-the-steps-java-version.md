---
layout: post
title: 'sina weibo api使用步骤（Java版）'
date: 2013-08-24 07:53:00
comments: true
categories: [java]
---
首先下载java sdk并导入eclipse中 http://open.weibo.com/wiki/index.php/SDK
然后，在http://open.weibo.com/上创建应用（必须要有新浪微博账号）。创建完毕系统会给出App Key和App Secret。
在eclpse中找出配置文件config.properties，里面client_ID 对应App Key ，client_SERCRET对应App Secret
（回调地址先不要填写，因为还没有获得access_token）。
然后运行weibo4j.examples.oauth2包中的OAuth4Code.java。
程序会自动打开浏览器并要求输入微博帐号密码进行授权，然后地址栏会跳转到回调地址页面，url的形式如：
https://api.weibo.com/oauth2/authorize?code=************************。
这里的的code后面的值就是传说中的access_token。这个地址就是传说中的回调地址。
接着让我们回到之前，对！就是配置文件config.properties中的回调地址redirect_URI上填入这个回调地址。
（准备阶段就此结束）
下面，我们进行测试：
运行weibo4j.examples.use包下面的ShowUser.java
（参数args[0]是access_token和args[1]是uid，即微博帐号的id。可以登录微博，首页的url形式：
http://weibo.com/u/********，星号所代表的就是uid）
然后运行程序，将会在控制台打印你的账户信息：用json返回来的用户信息以及最新的微博信息。
到此，一切宣告结束
笔者话：一个普通大学生的摸索结果
逍遥子2012/3/21