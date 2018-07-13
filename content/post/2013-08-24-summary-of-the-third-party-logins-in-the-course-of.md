---
layout: post
title: '第三方登录使用过程中的总结'
date: 2013-08-24 07:54:00
comments: true
categories: [tech]
---
----------
SSO授权优势：不需要重复输入新浪微博用户名、密码，只需要一步操作，直接点击授权按钮即可完成授权，增强了操作简便性及帐号安全性。

----------
## 1. 新浪微博 ##
*1、整合准备*

- 新浪微博开放平台[http://open.weibo.com/](http://open.weibo.com/ "新浪微博开放平台")
	
	- 详情参阅Weibo_Android_SDK使用手册.pdf 

- 新浪微博SDK[https://github.com/mobileresearch/weibo_android_sdk](https://github.com/mobileresearch/weibo_android_sdk "新浪微博SDK")
![第三方页面](http://www.sinaimg.cn/blog/developer/wiki/SSOAuth20120603.png)
	- 配置并运行下载好的新浪微博SDK附带的demo 

*2、整合分析*


- 根据官方使用手册将需要应用信息整合到自己的应用代码中。

	- 后台接口需要支持第三方登录的识别和支持，目前接口是parterLogin


*3、注意事项*

<!--more-->

- SSO登录方式必须要在onActivityResult中配置。
- `com.weibo.sdk.android.WeiboException: {"error":"User does not exists!","error_code":20003,"request":`

在新浪微博授权后调用获取用户信息的接口时候会报以下错误(用户不存在):

    com.weibo.sdk.android.WeiboException: {"error":"User does not exists!","error_code":20003,"request":"/2/users/show.json"}

如果你查看新浪源码的就会发现，其实这个错误是一个很幼稚的问题，为什么这么说呢，我们先看下源码:如果传入的是字符串那么默认调用下面这个接口，所以会报 User does not exists! 如果传入的是long类型，那么调用的是上面那个接口，根据uid查询用户信息。PS：切勿将uid作为字符串进行调用接口！用另外一个微博帐号(就是区别于注册应用的这个帐号)时，会出现一些错误。错误信息:

    {"error":"applications over the unaudited use restrictions!","error_code":21321,"request":"/2/statuses/update.json"}
    
    weibo4j.model.WeiboException: 403:The request is understood, but it has been refused.  An accompanying error message will explain why.
    error:applications over the unaudited use restrictions! error_code:21321/2/statuses/update.json
    at weibo4j.http.HttpClient.httpRequest(HttpClient.java:414)
    at weibo4j.http.HttpClient.httpRequest(HttpClient.java:372)
    at weibo4j.http.HttpClient.post(HttpClient.java:301)
    at weibo4j.http.HttpClient.post(HttpClient.java:286)
    at weibo4j.Timeline.UpdateStatus(Timeline.java:708)
    at weibo4j.examples.timeline.UpdateStatus.main(UpdateStatus.java:18)
这个的解决办法：还是在我的应用那里，点击”应用信息“，”高级信息“，看到有添加UID，这个时候，你把想要发布微博的帐号的UID添加进去，就OK。



## 2. 腾讯QQ ##
*1、整合准备*

- 腾讯QQ互联[http://connect.qq.com/](http://connect.qq.com/ "腾讯QQ互联")

- 腾讯QQ互联SDK [http://wiki.connect.qq.com/android_sdk%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E](http://wiki.connect.qq.com/android_sdk%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E "QQ互联_android_sdk使用说明")


*2、整合分析*

- 根据官方使用手册将需要应用信息整合到自己的应用代码中。

	- 后台接口需要支持第三方登录的识别和支持，目前接口是parterLogin


*3、注意事项*

- 特别注意，必须将AndroidManifest.xml中配置的activity里面的腾讯QQ互联的activity增加`android:launchMode="singleTask"`
- 还有QQ互联的activity的finish方式跟新浪的有所不同，不能在UI主线程中进行网络请求