---
title: '基于 gogs/gitlab 和 drone 搭建的 CI/CD 平台'
keywords: gogs, drone, ci, cd
date: 2018-08-11T06:28:00+08:00
lastmod: 2018-08-11T06:28:00+08:00
draft: false
description: '基于 gogs/gitlab 和 drone 搭建的 CI/CD 平台'
categories: [drone]
tags: [gogs, drone, ci, cd]
comments: true
author: mai
---

至于完整的搭建过程，大家可以参考参考资料的几篇文章，我这里只把我遇到的一些问题做一些总结。

----

## 坑集

- 如果遇到镜像无法被拉取（墙），则可以在 `drone-server` 配置

```yaml
...
services:
  drone-server:
    ...
    environment:
      - HTTP_PROXY=http://192.168.0.5:1087
      - HTTPS_PROXY=http://192.168.0.5:1087
...
```

drone 默认使用的数据库是 sqlite，在生产环境上，我们可以切换为 MySQL 或者 PG 数据库。

```yaml
...
services:
  drone-server:
    ...
    environment:
	  - DRONE_DATABASE_DRIVER=mysql
      - DRONE_DATABASE_DATASOURCE=root:123456@tcp(192.168.0.5:3306)/drone?parseTime=true
```

- 打开 gogs 的安装界面，记得将所有的 localhost 都改成本机的ip地址，否则 Drone agent 跑在自己的容器里面，使用 http://localhost:3000/xxx/demo.git 这样的地址是不可能把项目 clone 下来的，这是一个巨坑。

- drone-agent 中的挂载 `-v /var/run/docker.sock:/var/run/docker.sock` 是指你本地 docker 的地址，不要随意修改；

- 当你在 Gitlab 上配置 Application 的时候，如果你输入了错误 Redirect URL ，会报错：The redirect URI included is not valid.
	
	[docker-compose-with-drone-and-gitlab-gitlab-errors-the-redirect-uri-included-i](https://stackoverflow.com/questions/41723841/docker-compose-with-drone-and-gitlab-gitlab-errors-the-redirect-uri-included-i)

- Failed to activate your repository
	
	这个问题，我卡了蛮长时间的。出现这个原因是 drone 无法连接到 gitlab/gogs：
	
	- 检查你启动 drone 配置的 `- DRONE_HOST=http://192.168.0.55:9000`
	- 如果你是 gitlab ，则很有可能因为 gitlab 限制了本地网络的调用导致的，你需要进行以下设置：（https://gitlab.com/gitlab-org/gitlab-ce/issues/46490）。

- 通过 Docker 启动的 Gitlab，默认给予的 external_url 是容器ID，这个是无法正常 clone 的。
	- 在 Docker 启动的时候配置参数 `-e 'GITLAB_HOST=http://192.168.0.5'`。

```sh
docker exec -it gitlab /bin/bash
vim /etc/gitlab/gitlab.rb
# 找到 external_url，修改为 external_url 'http://ip or domain'
# 然后执行
gitlab-ctl reconfigure
```

- 如果你使用了同一个域名，然后又构建了不同 ssh 连接，你在 `git push` 的时候可能会报错：

```sh
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the ECDSA key sent by the remote host is
SHA256:DIOVqCtRge3+qGPgkJQv6pi3OCb2RXK1v+e0Cscz4UE.
Please contact your system administrator.
Add correct host key in ~/.ssh/known_hosts to get rid of this message.
Offending ECDSA key in ~/.ssh/known_hosts:23
ECDSA host key for 192.168.0.5 has changed and you have requested strict checking.
Host key verification failed.
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```
>你只需要进入到 `~/.ssh/known_hosts` 删除你之前已经配置过的一行记录即可重新提交。

----

## 参考资料

1. [drone docs](http://docs.drone.io/)
2. [基于Gogs+Drone搭建的私有CI/CD平台](http://www.mdslq.cn/archives/1a623683.html)
3. [私有化的 CI/CD & DevOps 解决方案](https://github.com/khs1994-docker/ci)
4. [k8s+drone cicd](https://github.com/iyacontrol/baa-cicd)
5. [体验基于gogs+Drone搭建的CI/CD平台](https://www.jianshu.com/p/15506f46f75a)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)
