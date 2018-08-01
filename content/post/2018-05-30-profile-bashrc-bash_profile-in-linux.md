---
layout: post
title: 'Linux 中 profile，bashrc，bash_profile，/etc/profile，/etc/profile.d/的区别'
keywords: Linux, profile, bashrc, bash_profile
date: 2018-05-30 15:00:00
description: 'Linux 中 profile，bashrc，bash_profile，/etc/profile，/etc/profile.d/的区别'
categories: [linux]
tags: [Linux, profile, bashrc, bash_profile]
comments: true
author: mai
---

    这是一篇有关环境变量加载的入门介绍（不太确定）。

----

`/etc/profile`: 此文件为系统的每个用户设置环境信息，当用户第一次登录时，该文件被执行。并从 `/etc/profile.d` 目录的配置文件中收集 shell 的设置。如果你有对 `/etc/profile` 有修改的话必须得 source 一下 你的修改才会生效，此修改对*每个用户*都生效。

`/etc/bashrc`: 为每一个运行 bash shell 的用户执行此文件。当 bash shell 被打开时，该文件被读取。如果你想对所有的使用 bash 的用户修改某个配置并在以后打开的 bash 都生效的话可以修改这个文件，修改这个文件不用重启，重新打开一个 bash 即可生效。

`~/.bash_profile`: 每个用户都可使用该文件输入专用于自己使用的 shell 信息，当用户登录时，该文件仅仅执行一次!默认情况下,他设置一些环境变量，执行用户的 .bashrc 文件。
此文件类似于 `/etc/profile`，也是需要需要 source 才会生效，`/etc/profile` 对所有用户生效，`~/.bash_profile` 只对当前用户生效。

`~/.bashrc`: 该文件包含专用于你的 bash shell 的 bash 信息，当登录时以及每次打开新的 shell 时，该文件被读取。（每个用户都有一个 `.bashrc` 文件，在用户目录下）
此文件类似于 `/etc/bashrc`，不需要重启就可以生效，重新打开一个 bash 即可生效，`/etc/bashrc` 对所有用户新打开的 bash 都生效，但 `~/.bashrc` 只对当前用户新打开的 bash 生效。

`~/.bash_logout`: 当每次退出系统(退出 bash shell)时，执行该文件。

## 总结

`/etc/profile` 中设定的变量(全局)的可以作用于任何用户，而 `~/.bashrc` 中设定的变量(局部)只能继承 `/etc/profile` 中的变量，他们是"父子"关系。
 
`~/.bash_profile` 是交互式、login 方式进入 bash 运行的；
`~/.bashrc` 是交互式 non-login 方式进入 bash 运行的；

通常二者设置大致相同，所以通常前者会调用后者。

## 参考资料

1. [Linux 之 /etc/profile、~/.bash_profile 等几个文件的执行过程](https://blog.csdn.net/ithomer/article/details/6322892)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)
