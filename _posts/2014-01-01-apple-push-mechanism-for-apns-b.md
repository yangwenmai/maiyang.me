---
layout: post
title: '苹果推送机制APNs（二）'
date: 2014-01-01 16:07
comments: true
categories: 
---
上一篇介绍了一下APNs的基本原理和处理流程，通过介绍，对APNs的机制有了大致的了解后，我们就来看看如何把APNS服务集成到我们自己的项目中来，首先登陆我们的Apple Developer后台为将要使用推送服务的App新建一个App ID，如下图，点击新建后输入基本信息：


新建完毕后找到我们刚申请的App ID，把“Enable for Apple Push Notification service”的勾选上

从上面可以看到，推送证书分为两个版本，一个是Development版，一个是Production版，分别对应开发证书和发布证书（这样确实有点麻烦，不过Apple这么做肯定是有自己的理由的）。由于现在我们用做开发测试用，所以只配置Development Push的SSL证书，如果是要发布App到市场的话，就配置Production证书，流程是完全一样的。点击右侧的Configure，进入认证界面，在下一步操作之前，我们要准备好我们本机的认证证书，这个证书在我们配置开发者账号时就申请过，如果没保存的话也可以重新生成一个，其生成方式如下：
首先打开“钥匙串”程序，点击菜单选项如下图：


然后输入基本信息，确认后将后缀名为.certSigningRequest的认证证书文件保存到本地：


保存证书到本地，待会会用到：        


然后回到之前的页面，点击Configure进入，点击Continue后然后选择文件，上传我们刚刚申请的.certSigningRequest文件：


上传成功后，点击Generate按钮，Apple会根据我们上传的证书颁发一个开发板的推送证书给我们：


继续点击Continue，最后就进入到下载界面，下载推送证书到本地，保存备用：


下载下来的文件名为aps_development.cer，如果是发布版的推送证书，就为aps_production.cer。然后双击该证书，将推送证书安装到我们的Mac机器上，安装成功后会看到如下界面（如果是发布版，则证书的Development部分显示的是Production）


到这里，推送证书的申请和安装就完成了，接下来的操作就是根据我们之前申请的App ID，为其产生Provisioning证书，该证书申请完成后同样双击安装到我们的Xcode里面，开发时，将签名证书选择我们对应的Provisioning文件即可。这里主要介绍如何申请和安装推送证书，太详细的就不再叙述了，如果想了解更多，可以参考前人总结的文章（个人觉得很不错）http://article.ityran.com/archives/194

好了，时间比较赶，就简要介绍到此了，另外，这篇博客是在机场候机时写的，嘿嘿，因为飞机晚点了，闲着没事，正好机场有无线，所以把这篇文章补上，写的不好不够详细的地方大家可以另外跟我交流，谢谢！
加入我们的QQ群或微信公众账号请查看：Ryan's zone公众账号及QQ群

转自于 [Ryan‘s zone](http://blog.csdn.net/ryantang03/article/details/8540362)