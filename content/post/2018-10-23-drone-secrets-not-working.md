---
title: 'drone 的 secret 无法读取'
keywords: drone, secret, read
date: 2018-10-23T08:18:00+08:00
lastmod: 2018-10-23T08:18:00+08:00
draft: false
description: '在 Mac 电脑中 ssh 读取加载 config.d 目录'
categories: [mac]
tags: [mac, ssh, config.d, config]
comments: true
author: mai
---

## drone 如何配置 secret

在 drone 控制面板中直接使用 Secrets 中添加。

>但是这里默认只支持 PUSH TAG DEPLOYMENT

## drone client command

```sh
$ drone secret add --repository=yangwenmai/ratelimit --image=robertstettner/drone-codecov --event=pull_request --event=push --event=tag --name=codecov_token --value=xxx
$ drone secret update --repository=yangwenmai/ratelimit --image=robertstettner/drone-codecov --event=pull_request --event=push --event=tag --name=codecov_token --value=yyy
```

## 参考资料

1. [http://docs.drone.io/secrets-not-working/](http://docs.drone.io/secrets-not-working/)
2. [https://discourse.drone.io/t/secrets-not-working-0-8-1/1101](https://discourse.drone.io/t/secrets-not-working-0-8-1/1101)
3. [https://discourse.drone.io/t/solved-secrets-not-available-to-drone-exec-local/270/3](https://discourse.drone.io/t/solved-secrets-not-available-to-drone-exec-local/270/3)
5. [http://docs.drone.io/cli-secret-add/](http://docs.drone.io/cli-secret-add/)
5. [http://docs.drone.io/cli-secret-update/](http://docs.drone.io/cli-secret-update/)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)
