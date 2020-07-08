---
title: 'DigitalOcean 服务器迁移'
keywords: digitalocean, migrate, 服务器, 迁移
date: 2020-07-06T23:10:00+08:00
lastmod: 2020-07-06T23:10:00+08:00
draft: false
description: '记录我在做 DigitalOcean 迁移时遇到的问题。'
categories: [体育]
tags: [运维, 服务器]
comments: true
author: mai
---

## 背景

https://talkgo.org/ 在国内访问的速度比较慢，所以就想着能不能在大原则：不更换服务器供应商的情况下，得到一定的解决。

## 从 DigitalOcean 的 SFO 2（San Francisco!）迁移到 SGP1。

尝试创建服务器的时候，发现不能从 snapshot 中恢复到 SGP1 服务器中。

## 搜索得到解决方案

https://bobcares.com/blog/digitalocean-create-droplet-from-snapshot/

1) Create Droplet from snapshot in different region
We’ve seen customers complain that they get the below error when creating a Droplet from a snapshot in a different region.

The image you specified is not available in the selected region, you can make it globally available by initiating an image region transfer from the images tab.

解决方案：

In order to create a Droplet from a snapshot taken in another datacenter, this snapshot should be transferred to the region where the new Droplet should be created.

Our Support Engineers transfer the snapshot to other regions from Snapshots > Droplet snapshots > More > Add to region > Click on region name. to fix this issue.


## DNS 配置

因为新申请机器有新的 IP，所以还需要配置一下 Cloudflare 上面的 DNS ，给 talkgo.org 指定新的 IP 地址。

### 检测 traceoute

```sh
traceroute: Warning: talkgo.org has multiple addresses; using 104.18.32.60
traceroute to talkgo.org (104.18.32.60), 64 hops max, 52 byte packets
 1  192.168.31.1  1.695 ms  1.145 ms  1.406 ms
 2  192.168.1.1  2.490 ms  3.541 ms  2.611 ms
 3  172.48.0.1  2.914 ms  2.854 ms  4.489 ms
 4  183.233.83.213  3.755 ms  3.687 ms  3.896 ms
 5  211.136.248.229  4.907 ms
    211.136.248.225  3.917 ms
    211.136.248.81  3.757 ms
 6  221.183.13.169  7.773 ms
    221.183.24.73  8.491 ms  7.770 ms
 7  221.176.18.110  7.878 ms
    221.176.22.106  12.514 ms
    221.183.68.141  8.124 ms
 8  221.176.19.190  12.258 ms
    221.176.19.198  11.550 ms
    221.176.19.42  8.641 ms
 9  221.183.55.77  14.100 ms  10.147 ms  10.561 ms
10  223.120.2.101  15.455 ms
    223.120.2.85  15.482 ms
    223.120.2.81  16.170 ms
11  223.120.2.118  14.981 ms  14.746 ms  14.258 ms
12  134.159.128.213  18.369 ms  17.115 ms  16.887 ms
13  202.84.157.38  14.602 ms  15.238 ms  15.851 ms
14  202.84.143.41  67.768 ms  65.121 ms  71.545 ms
15  202.127.69.182  60.488 ms  63.917 ms  67.805 ms
16  104.18.32.60  57.883 ms  58.748 ms  58.174 ms


北方的 traceout

1  202.97.80.125 (202.97.80.125)  13.099 ms  15.315 ms  14.971 ms
2  202.97.34.158 (202.97.34.158)  14.169 ms
3  202.97.12.62 (202.97.12.62)  21.245 ms  18.355 ms  15.856 ms
4  202.97.27.190 (202.97.27.190)  169.828 ms  170.080 ms  168.125 ms
5  202.97.92.37 (202.97.92.37)  172.055 ms  167.495 ms  168.079 ms
6  218.30.54.214 (218.30.54.214)  197.341 ms  200.079 ms  193.218 ms
7  172.67.210.27 (172.67.210.27)  171.300 ms  171.359 ms  172.522 ms
```

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。
