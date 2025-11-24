---
title: '如何解决 macOS 系统里面 System Data 占比巨大的问题？'
keywords: macOS, 巨大, System Data, large
date: 2025-11-20T20:00:00+08:00
lastmod: 2025-11-20T20:00:00+08:00
draft: false
description: '当你的电脑使用蛮长时间之后，是不是磁盘空间越来越不够用了？特别是有一个 System Data 占比了 100 GB 以上，这个问题如何解决？'
categories: [macOS]
tags: [macOS, Operator System]
comments: true
author: MaiYang
---

当你的电脑使用蛮长时间之后，是不是磁盘空间越来越不够用了？特别是有一个 System Data 占比了 100 GB 以上，这个问题如何解决？

常规的解决办法，肯定是直接把你不需要的文件删除，简便的方法是：

1. 点击屏幕左上角，About This Mac
2. 点击 More Info...
3. 找到 Storage, 点击 Storage Settings...
4. 让程序运行一会儿，系统会自动计算出每个部分的磁盘大小占用
5. 点击 ! 即可自主的清理你不需要的文件。

---

如果你已经把以上大文件和不怎么需要的文件都清理了，此时依旧没有解决你的磁盘问题。那就需要上强度了。

## 强度一

去 Mac App Store 找一些磁盘分析管理软件。

## 强度二

上命令行。（杀手锏）

1. 命令：

```shell
> df -h | grep Gi

df -h | grep Gi
/dev/disk3s1s1   460Gi    11Gi    24Gi    32%    447k  256M    0%   /
/dev/disk3s6     460Gi   4.0Gi    24Gi    15%       4  256M    0%   /System/Volumes/VM
/dev/disk3s2     460Gi   7.2Gi    24Gi    23%    1.3k  256M    0%   /System/Volumes/Preboot
/dev/disk3s4     460Gi   2.0Mi    24Gi     1%      64  256M    0%   /System/Volumes/Update
/dev/disk3s5     460Gi   412Gi    24Gi    95%    5.1M  256M    2%   /System/Volumes/Data
```

2. 命令：查看挂载的盘占用最多的一个： "/System/Volumes/Data"，查看详情。

```shell
> du -h /System/Volumes/Data | grep "G\t" | sort
```

给他一些时间，我们就能够发现，它能帮我们列出来一大堆偏系统层面和一些程序隐藏文件。

可能会包括你过往试过的各种软件，删除软件，但是残留了一些缓存、运行日志、运行过程中下载的一些文件、资源等等。

经过这样一顿操作，我的磁盘一下子就剩 140 GB 了，太爽了！

```shell
df -h | grep Gi
/dev/disk3s1s1   460Gi    11Gi   119Gi     9%    447k  1.3G    0%   /
/dev/disk3s6     460Gi   5.0Gi   119Gi     5%       5  1.3G    0%   /System/Volumes/VM
/dev/disk3s2     460Gi   7.2Gi   119Gi     6%    1.3k  1.3G    0%   /System/Volumes/Preboot
/dev/disk3s4     460Gi   2.0Mi   119Gi     1%      63  1.3G    0%   /System/Volumes/Update
/dev/disk3s5     460Gi   317Gi   119Gi    73%    4.6M  1.3G    0%   /System/Volumes/Data
```

## Reference

1. https://www.reddit.com/r/mac/comments/ynv4d0/system_data_taking_up_all_my_storage_how_do_i_fix/
2. https://vi-control.net/community/threads/my-mac-system-file-is-260-gb-i-cant-figure-out-why-its-so-big.153818/
