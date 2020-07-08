---
title: '在 Mac 电脑中 ssh 读取加载 config.d 目录'
keywords: mac, ssh, config.d, config
date: 2018-10-22T09:00:00+08:00
lastmod: 2018-10-23T08:18:00+08:00
draft: false
description: '在 Mac 电脑中 ssh 读取加载 config.d 目录'
categories: [mac]
tags: [mac, ssh, config.d, config]
comments: true
author: mai
---

## 背景

一般情况下，我们ssh 配置都是使用 `~/.ssh/config` 里面的配置即可。

但是如果我们线上所要维护或者要连接的机器比较多，我们怎么分门别类呢？

大家请看：

```sh
Include
	Include the specified configuration file(s).  Multiple path‐names may be specified and each pathname may contain glob(3) wildcards and, for user configurations, shell-like ‘~’ references to user home directories.  Files without absolute paths are assumed to be in ~/.ssh if included in a user configuration file or /etc/ssh if included from the system configuration file. Include directive may appear inside a Match or Host block to perform conditional inclusion.
```

>注意: `Include` 必须在 `config` 配置的 `Host` 之前的位置，不能夹杂在多个 `Host` 之间。

涉及到的脚本：

Makefile
```sh
install-ssh-config:
	@./install-ssh-config.sh $(identify_file)
```

install-ssh-config.sh:
```sh
identify_file=${1:-""}
if [ ! -z $identify_file ]; then
	identify_file="IdentityFile $identify_file"
fi

...
grep -q -F 'Include ~/.ssh/config.d/*' "$HOME/.ssh/config" || cat -n "$HOME/.ssh/config" |grep -i host |awk '{print $1-1}'|sed -n "1"p |xargs -I LINE sed -i '' -e $'LINE i\\\n''Include ~/.ssh/config.d/*' "$HOME/.ssh/config"
```

分步分析：

1. Makefile 的参数传递，可以通过带指定参数名来传递给 shell；
2. shell 通过 `$参数位置` 读取，更多详解请查阅文档；
3. grep -q 的命令；
4. grep -F ；
5. grep -i 不区分大小写；
6. awk 获取参数值；
7. sed -n "1"p 获取到第 1 个值并打印出来；
8. xargs -I LINE 将结果通过管道带入到下一个语句中，并赋值给 LINE；
9. `sed -i '' -e $'LINE i\\\n''xxx'` 在匹配的位置插入 "xxx"

## 参考资料

1. [What's wrong with my OpenSSH Include directive?](https://superuser.com/questions/1162387/whats-wrong-with-my-openssh-include-directive/1162392)
2. [ssh_config — OpenSSH SSH client configuration files](http://man7.org/linux/man-pages/man5/ssh_config.5.html)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。


