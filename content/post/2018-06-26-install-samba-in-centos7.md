---
layout: post
title: '在 CentOS 7 中安装 Samba'
keywords: CentOS, Samba
date: 2018-06-26 07:40:00
description: '在 CentOS 7 中安装 Samba'
categories: [linux]
tags: [linux, install, Samba]
comments: true
author: mai
---

    这是一篇实践文章。

----

```shell
docker run --name samba -it -p 139:139 -p 445:445 -v /data/samba:/data/samba -d dperson/samba -u "username;password" -s "share;/data/samba/;yes;no;no;all;none”
```

特别要注意的：
如果不指定 `-v` 参数，通过用户名和密码连接上没有写入权限。

重要参数：

```shell
	-s "<name;/path>[;browse;readonly;guest;users;admins;writelist;comment]"
        Configure a share
        required arg: "<name>;</path>"
        <name> is how it's called for clients
        <path> path to share
        NOTE: for the default values, just leave blank
        [browsable] default:'yes' or 'no'
        [readonly] default:'yes' or 'no'
        [guest] allowed default:'yes' or 'no'
        [users] allowed default:'all' or list of allowed users
        [admins] allowed default:'none' or list of admin users
        [writelist] list of users that can write to a RO share
        [comment] description of share
```

## 参考资料

1. [dperson/samba](https://github.com/dperson/samba)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)
