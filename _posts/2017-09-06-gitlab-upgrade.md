---
layout: post
title: 'Gitlab 血泪迁移升级史'
keywords: Gitlab, upgrade
date: 2017-09-07 06:30
description: 'Gitlab 血泪迁移升级史，包含了数据盘文件系统损坏，重新挂载磁盘，备份文件，重启服务等各种操作，然后又进行gitlab版本升级，超过10个版本的更迭。'
categories: [gitlab]
tags: [gitlab]
comments: true
group: archive
icon: file-o
---

* content
{:toc}

    本文耗时较长，包括实战演练。

----

# 准备 gitlab 的迁移、升级方案 #

## 准备工作 ##

1. 申请一台新的云主机用于重新安装，然后迁移备份好的 Gitlab；
2. 配置开放 ssh 端口 380（修改SSH的端口很大程度上能杜绝被黑客扫描，增加系统的安全系数）
  
  ```
  vim /etc/ssh/sshd_config（开放 380 端口）
    Port 22
    Port 380
    ListenAddress 0.0.0.0:22
    ListenAddress 0.0.0.0:380
  /etc/init.d/sshd restart
  ```

注意：

  我们要先设置成两个端口，测试成功后再关闭一个端口 22，这是为了在修改的过程中，万一出现掉线、断网、误操作等未知情况时候，还能通过另外一个端口连接上去调试，以免发生连接不上的状况。

## 安装 ##

1. 配置清华大学的开源源站地址
  [Gitlab Community Edition 镜像使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/gitlab-ce/)

  **RHEL/CentOS 用户**

  新建 `/etc/yum.repos.d/gitlab-ce.repo`，内容为

  [gitlab-ce]
  name=Gitlab CE Repository
  baseurl=https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el$releasever/
  gpgcheck=0
  enabled=1

  再执行

  sudo yum makecache
  sudo yum install gitlab-ce-8.13.11-ce.0.el6.x86_64
  sudo gitlab-ctl status;
  sudo gitlab-ctl reconfigure;

注意
1. 我们这里选择的 omnibus 方式的 Gitlab 版本（8.13.11）；
2. 安装好之后，启动一下刷新配置，然后再重新启动，确认是否可以正常访问。

<!--more-->

## 备份旧数据 ##

1. 使用一键安装包安装 Gitlab 非常简单，同样的备份恢复与迁移也非常简单，用一条命令即可创建完整的 Gitlab 备份:
  
  `gitlab-rake gitlab:backup:create`

以上命令将在 `/var/opt/gitlab/backups` 目录下创建一个名称类似为`xxxxxxxx_gitlab_backup.tar`的压缩包, 这个压缩包就是 Gitlab 的完整备份包, 其中开头的 xxxxxx 是备份创建的时间戳。

# 新版本 1504736919_2017_09_07_9.5.3_gitlab_backup.tar
gitlab-rake gitlab:backup:restore BACKUP=1504736919_2017_09_07_9.5.3_gitlab_backup.tar


2. 修改 `/etc/gitlab/gitlab.rb` 来修改默认存放备份文件的目录:

  gitlab_rails['backup_path'] = '/data/gitlab/backups'

修改后使用 `gitlab-ctl reconfigure` 命令重载配置文件（nginx可能会被重置）。

3. 备份脚本

```
#每天2点备份gitlab数据
0 2 * * * /usr/bin/gitlab-rake gitlab:backup:create
0 2 * * * /opt/gitlab/bin/gitlab-rake gitlab:backup:create
```

```
find . -mtime +0 # find files modified greater than 24 hours ago
find . -mtime 0 # find files modified between now and 1 day ago
# (i.e., in the past 24 hours only)
find . -mtime -1 # find files modified less than 1 day ago (SAME AS -mtime 0)
find . -mtime 1 # find files modified between 24 and 48 hours ago
find . -mtime +1 # find files modified more than 48 hours ago
```

## 恢复/迁移 ##

1. 将老服务器 `/data/gitlab/backups` 目录下的备份文件拷贝到新服务器上的 `/data/gitlab/backups`。
2. 停止 unicorn 和 sidekiq ，保证数据库没有新的连接，不会有写数据情况。
3. 执行命令

```
# 停止相关数据连接服务
gitlab-ctl stop unicorn
  # ok: down: unicorn: 0s, normally up
gitlab-ctl stop sidekiq
  # ok: down: sidekiq: 0s, normally up
# 从xxxxx编号备份中恢复
# 然后恢复数据，1406691018为备份文件的时间戳
gitlab-rake gitlab:backup:restore BACKUP=1406691018
```

注：
有可能出现无法访问读取目录、文件，你更改一下相应权限即可：

  `chown git xxxxxxx_gitlab_backup.tar`
  `chgrp git xxxxxxx_gitlab_backup.tar`

4. 恢复完成后，执行 `sudo gitlab-ctl reconfigure`
5. 启动后再查看 gitlab 的状态，`sudo gitlab-ctl start`

## 完整升级历程 ##

8.13.11(我的初始版本)->8.14.0->8.15.0->8.16.0->8.17.0->9.0.0->9.1.0->9.2.0->9.3.0->9.4.0->9.5.3 一直升级到最新版本。

详细过程如下：

1. 执行脚本：

`sudo touch /etc/gitlab/skip-auto-migrations（避免pg升级导致数据合并的问题）`

循环执行以下步骤：
```
sudo yum install gitlab-ce-x.x.xxxx
sudo gitlab-ctl stop sidekiq;
sudo gitlab-ctl stop unicorn;
sudo gitlab-ctl status;
sudo gitlab-ctl reconfigure;
sudo gitlab-ctl status;
sudo gitlab-ctl start;
cat /var/opt/gitlab/gitlab-rails/VERSION
访问网站是否可以；
```

1. 从8.13.11 -> 8.14.0（出现了一个错误：undefined method `cached_assigned_issuables_count’ 继续升级新版就正常了）。
2. 升级9.1.0->9.2.0的时候报错（migrate gitlab-rails database] action run
    [execute] rake aborted!
              StandardError: An error has occurred, all later migrations canceled:）
是一个 bug，我们继续升级到 9.3.0，可以正常使用；
3. 9.4.0 可直接升级到 9.5.3；

## 附加说明 ##

1. 配置 https
  
  `/var/opt/gitlab/nginx/conf/gitlab-http.conf` 在里面配置好ssl证书
  
  ```
  listen 443 ssl;
  ...
  ssl_certificate      /var/opt/gitlab/nginx/xxxxyyyyy.crt;
  ssl_certificate_key  /var/opt/gitlab/nginx/xxxxyyyyy.key;
  ssl_session_cache    shared:SSL:10m;
  ssl_session_timeout  10m;
  ssl_ciphers XXXXXXXXXXX;
  ssl_prefer_server_ciphers on;
  ```

其中 xxxxyyyyy 是你自己的证书的名字

`sudo gitlab-ctl restart nginx`, 重启 nginx 。

2. 配置 SMTP

  。。。  

## 再升级的问题 ##

当我从 9.5.3 升级为 10.0.3 时，操作步骤如下：

```
sudo yum install gitlab-ce-10.0.3-ce.0.el6.x86_64
sudo gitlab-ctl stop unicorn;
sudo gitlab-ctl stop sidekiq;
sudo gitlab-ctl reconfigure;
sudo gitlab-ctl start;
```

直接有如下提示：

```
Total download size: 338 M
Is this ok [y/N]: y
Downloading Packages:
gitlab-ce-10.0.3-ce.0.el6.x86_64.rpm                                                                                                                          | 338 MB     01:04
Running rpm_check_debug
Running Transaction Test
Transaction Test Succeeded
Running Transaction
gitlab preinstall:
gitlab preinstall: Your version of PostgreSQL is no longer supported. Please upgrade your PostgreSQL version.
gitlab preinstall: Check https://docs.gitlab.com/omnibus/update/#updating-gitlab-100-or-newer for details.
gitlab preinstall:
gitlab preinstall: Upgrade failed. Retry the upgrade after upgrading your PostgreSQL version.
error: %pre(gitlab-ce-10.0.3-ce.0.el6.x86_64) scriptlet failed, exit status 1
Error in PREIN scriptlet in rpm package gitlab-ce-10.0.3-ce.0.el6.x86_64
error:   install: %pre scriptlet failed (2), skipping gitlab-ce-10.0.3-ce.0.el6
  Verifying  : gitlab-ce-10.0.3-ce.0.el6.x86_64                                                                                                                                  1/2
gitlab-ce-9.5.3-ce.0.el6.x86_64 was supposed to be removed but is not!
  Verifying  : gitlab-ce-9.5.3-ce.0.el6.x86_64                                                                                                                                   2/2

Failed:
  gitlab-ce.x86_64 0:9.5.3-ce.0.el6                                                        gitlab-ce.x86_64 0:10.0.3-ce.0.el6

Complete!
```

意思是需要升级 pg 数据库。

接下来就是升级 pg 数据库。

首先查看当前 pg 数据库的版本

`>/opt/gitlab/embedded/bin/psql --version`

`>psql (PostgreSQL) 9.2.18`

升级数据库：

```
>sudo gitlab-ctl pg-upgrade

Checking for an omnibus managed postgresql: OK
Checking if we already upgraded: NOT OK
Checking for a newer version of PostgreSQL to install: OK
Upgrading PostgreSQL to 9.6.3
Checking if PostgreSQL bin files are symlinked to the expected location: OK
Toggling deploy page:cp /opt/gitlab/embedded/service/gitlab-rails/public/deploy.html /opt/gitlab/embedded/service/gitlab-rails/public/index.html
Toggling deploy page: OK
Toggling services:ok: down: gitaly: 0s, normally up
ok: down: gitlab-monitor: 1s, normally up
ok: down: logrotate: 0s, normally up
ok: down: node-exporter: 1s, normally up
ok: down: postgres-exporter: 0s, normally up
ok: down: prometheus: 0s, normally up
ok: down: redis-exporter
...

Running handlers:
Running handlers complete
Chef Client finished, 8/473 resources updated in 06 seconds
Running reconfigure: OK
Database upgrade is complete, running analyze_new_cluster.sh
==== Upgrade has completed ====
Please verify everything is working and run the following if so
rm -rf /var/opt/gitlab/postgresql/data.9.2.18
Toggling deploy page:rm -f /opt/gitlab/embedded/service/gitlab-rails/public/index.html
Toggling deploy page: OK
Toggling services:ok: run: gitaly: (pid 20136) 0s
ok: run: gitlab-monitor: (pid 20152) 1s
ok: run: logrotate: (pid 20156) 0s
ok: run: node-exporter: (pid 20162) 1s
ok: run: postgres-exporter: (pid 20169) 0s
ok: run: prometheus: (pid 20174) 1s
ok: run: redis-exporter: (pid 20219) 0s
ok: run: sidekiq: (pid 20233) 0s
Toggling services: OK
```

表示 pg 数据库升级成功，查看当前 pg 数据库版本。

`>/opt/gitlab/embedded/bin/psql --version`

`>psql (PostgreSQL) 9.6.3`

然后我再进行一次 gitlab 升级的操作步骤。

```
sudo yum install gitlab-ce-9.5.3-ce.0.el6.x86_64
sudo gitlab-ctl stop unicorn;
sudo gitlab-ctl stop sidekiq;
sudo gitlab-ctl reconfigure;
sudo gitlab-ctl start;
```

执行 `sudo yum install gitlab-ce-9.5.3-ce.0.el6.x86_64` 之后，会有如下信息即表示安装成功。

```Total download size: 338 M
Is this ok [y/N]: y
Downloading Packages:
gitlab-ce-10.0.3-ce.0.el6.x86_64.rpm                                                                                                                          | 338 MB     01:01
Running rpm_check_debug
Running Transaction Test
Transaction Test Succeeded
Running Transaction
gitlab preinstall:
gitlab preinstall: This node does not appear to be running a database
gitlab preinstall: Skipping version check, if you think this is an error exit now
gitlab preinstall:
  Updating   : gitlab-ce-10.0.3-ce.0.el6.x86_64                                                                                                                                  1/2
  Cleanup    : gitlab-ce-9.5.3-ce.0.el6.x86_64                                                                                                                                   2/2
Checking PostgreSQL executables: OK
Found /etc/gitlab/skip-auto-migrations, exiting...

     _______ __  __          __
    / ____(_) /_/ /   ____ _/ /_
   / / __/ / __/ /   / __ \`/ __ \
  / /_/ / / /_/ /___/ /_/ / /_/ /
  \____/_/\__/_____/\__,_/_.___/


Upgrade complete! If your GitLab server is misbehaving try running
  sudo gitlab-ctl restart
before anything else.
If you need to roll back to the previous version you can use the database
backup made during the upgrade (scroll up for the filename).

  Verifying  : gitlab-ce-10.0.3-ce.0.el6.x86_64                                                                                                                                  1/2
  Verifying  : gitlab-ce-9.5.3-ce.0.el6.x86_64                                                                                                                                   2/2

Updated:
  gitlab-ce.x86_64 0:10.0.3-ce.0.el6

Complete!
```

执行 `sudo gitlab-ctl reconfigure;` 有一个报错，这时候启动 gitlab ，打开网站也是报错 502 。

错误信息是：

```
Running handlers:
Running handlers complete
Chef Client failed. 15 resources updated in 28 seconds
```

```
* bash[migrate gitlab-rails database] action run
    [execute] rake aborted!
              PG::ConnectionBad: could not connect to server: No such file or directory
                Is the server running locally and accepting
                connections on Unix domain socket "/var/opt/gitlab/postgresql/.s.PGSQL.5432"?
              /opt/gitlab/embedded/service/gitlab-rails/lib/tasks/gitlab/db.rake:49:in `block (3 levels) in <top (required)>'
              /opt/gitlab/embedded/bin/bundle:23:in `load'
              /opt/gitlab/embedded/bin/bundle:23:in `<main>'
              Tasks: TOP => gitlab:db:configure
              (See full trace by running task with --trace)

    ================================================================================
    Error executing action `run` on resource 'bash[migrate gitlab-rails database]'
    ================================================================================

    Mixlib::ShellOut::ShellCommandFailed
    ------------------------------------
...
...
Running handlers:
Running handlers complete
Chef Client failed. 15 resources updated in 28 seconds
```

出现这个错误的原因是因为我们升级了 pg 数据库，所以必须再执行 `sudo gitlab-ctl reconfigure;` 之前，执行 `sudo touch /etc/gitlab/skip-auto-migrations（避免pg升级导致数据合并的问题）`。

然后再重新执行`sudo gitlab-ctl reconfigure;`

```
Running handlers:
Running handlers complete
Chef Client finished, 11/475 resources updated in 31 seconds
gitlab Reconfigured!
```

再执行 gitlab 启动，然后就可以正常打开 gitlab 了。

还有一个要注意的地方就是，每次升级后，你配置的 https 都得重新再配置一次（因为默认升级会覆盖 Nginx 的配置）。

## 参考资料 ##

1. https://mirrors.tuna.tsinghua.edu.cn/help/gitlab-ce/
2. https://docs.gitlab.com/omnibus/update/README.html#updating-gitlab-via-omnibus-gitlab
3. https://segmentfault.com/a/1190000008025217
4. https://segmentfault.com/a/1190000007180257
5. http://blog.licess.com/sshd_listen_address/
6. https://unix.stackexchange.com/questions/92346/why-does-find-mtime-1-only-return-files-older-than-2-days

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站。

这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)
