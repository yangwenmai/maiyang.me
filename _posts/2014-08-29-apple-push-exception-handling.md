---
layout: post
title: '苹果推送异常处理'
keywords: certificate_unknown
date: 2014-08-29 10:20
description: '苹果推送异常处理'
categories: [Archive]
tags: [certificate_unknown]
comments: true
group: archive
icon: file-o
---

# 异常"Received fatal alert: certificate_unknown"

从网络上搜索此异常，给出最多的解答是证书导出不正确。根据说明的步骤和方法再次导出后，我分别使用IntelliJ idea和Eclipse开发工具进行iOS push的时候，程序一直报错
> Received fatal alert: certificate_unknown

不能不解决这个问题，所以继续google，不经意间查看到导出的p12文件跟我们的Java环境有关系。所以我把JDK7替换到了JDK6，然后继续在IntelliJ idea和Eclipse上运行，Eclipse这次居然能正确运行了，但是IntelliJ idea还是不能运行。

>
I solved the issue in jdk 1.7 and using p12 after changing the passwd length of p12 file greater than or equal 6. Otherwise, the following error happens:
[[1] not transmitted to token 595d8..725bf  javapns.communication.exceptions.InvalidCertificateChainException: Invalid certificate chain (Received fatal alert: certificate_unknown)!  Verify that the keystore you provided was produced according to specs...]

心里顿时对IntelliJ idea最好用的Java IDE工具表示怀疑了，不过我还是再次确认和检查，最后发现原来是我的IntelliJ idea的Java环境是JDK7，后面改为JDK6就可以正常运行了。

