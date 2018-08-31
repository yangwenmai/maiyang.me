---
layout: post
title: 'MacBookPro自动切换网络和代理'
date: 2014-03-14 02:23:00
comments: true
categories: [tools]
tags: [Shell, macbookpro, 网络设置, networksetup, 代理]
---
##背景1
  在公司网络是使用dhcp分配的，但是经常要变更IP，所以我自己就使用网络偏好设置，更改为（使用dhcp-手动设定地址），保证我的IP是不变的，便于代码调试。

##背景2
  有了技术问题，要找到好的解决方案，上哪儿呢？当然少不了github.com，stackoverflow.com吧，但是国内不那么容易上了。所以公司提供给我们自由翻墙的，但是需要我们设置代理。可以在网络偏好设置里面的代理，勾选上“自动发现代理”即可。

##困惑
但是，因为移动办公，免不了就要切换网络，如果每次切换还要人工设置网络，那将是多么烦心的事情。
*mac电脑这么高级的东西，不至于要让我们自己来做这个重复的工作吧*，答案当然是不会。

##解决方案
google搜索得到苹果官方网站就有关于[网络设置](https://developer.apple.com/library/mac/documentation/Darwin/Reference/Manpages/man8/networksetup.8.html)。

那么针对我们这里需要的无非就是两个功能了：
1. 设置某无线网络的IP
2. 设置是否自动发现代理

附上我的脚本
```shell
#! /bin/sh

if [ "$1" = "on" ]; then
    sudo networksetup -setmanualwithdhcprouter "Wi-Fi" 192.168.1.100
    sudo networksetup -setproxyautodiscovery Wi-Fi on
elif [ "$1" = "off" ]; then
    sudo networksetup -setdhcp Wi-Fi
    sudo networksetup -setproxyautodiscovery Wi-Fi off
else
  echo "Sorry, only on or off."
  exit 1
fi
exit 0
```

