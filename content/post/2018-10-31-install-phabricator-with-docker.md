---
title: '基于 Docker 安装 phabricator'
keywords: Docker, install, phabricator
date: 2018-10-31T16:52:00+08:00
lastmod: 2018-10-31T16:52:00+08:00
draft: false
description: '基于 Docker 安装 phabricator'
categories: [docker]
tags: [Docker, install, phabricator]
comments: true
author: mai
---

# phabricator

## phabricator 是什么？

Phabricator（发音像单词 fabricator）是一套网络应用程序， 目的在于使人们更容易构建软件，特别是在与团队一起工作时。 Phabricator 主要基于 Facebook 的内部工具。

Phabricator 主要组件:

- Differential, 代码审查工具
- Diffusion, 代码仓库浏览器
- Maniphest, bug 追踪工具
- Phriction, wiki 文档管理

同时，Phabricator 还包括一些较小的工具。

# phabricator 安装说明

基于 Docker 安装 phabricator 的教程，参考 [bitnami/bitnami-docker-phabricator](https://hub.docker.com/r/bitnami/bitnami-docker-phabricator/) 的安装教程。

## 1. 使用 `docker-compose.yml` 运行 phabricator

`docker-compose.yml`:

```sh
version: '3'

services:
  nginx:
    container_name: 'phabricator-nginx'
    hostname: 'phabricator-nginx'
    image: 'openresty/openresty:alpine-fat'
    depends_on:
      - phabricator
    volumes:
      - './nginx/nginx.conf:/usr/local/openresty/nginx/conf/nginx.conf'
      - './nginx/default.conf:/etc/nginx/conf.d/default.conf'
    ports:
      - '80:80'
    restart: on-failure
  fix-mariadb-volume-ownership:
    container_name: 'phabricator-fix-mariadb'
    hostname: 'phabricator-fix-mariadb'
    image: 'bitnami/mariadb:10.1.36'
    user: root
    command: chown -R 1001:1001 /bitnami
    volumes:
      - './mariadb_data:/bitnami'
  mariadb:
    container_name: 'phabricator-mariadb'
    hostname: 'phabricator-mariadb'
    image: 'bitnami/mariadb:10.1.36'
    environment:
      - MARIADB_ROOT_PASSWORD=******
    volumes:
      - ./mariadb_data:/bitnami
    depends_on:
      - fix-mariadb-volume-ownership
    restart: on-failure
  phabricator:
    container_name: 'phabricator'
    hostname: 'phabricator'
    image: 'bitnami/phabricator:2018.43.0'
    depends_on:
      - mariadb
    ports:
      - '8080:80'
    environment:
      - PHABRICATOR_HOST=your domain name:port
      - PHABRICATOR_USERNAME=xxxx
      - PHABRICATOR_PASSWORD=******
      - MARIADB_USER=xxxx
      - MARIADB_PASSWORD=******
      - MARIADB_PORT_NUMBER=3306
    volumes:
      - ./phabricator_data:/bitnami
    restart: on-failure
```

`docker-compose up -d` 即可运行。

然后在浏览器中输入： [http://your.domain.com or your ip](http://your.domain.com) ，注意这里的 IP 是你本地的 IP 或者服务器的 IP 地址，也可以是你绑定好的域名。

### 参数说明：

```sh
environment
  - PHABRICATOR_HOST={你的访问域名}
  - MARIADB_PORT_NUMBER={映射数据库的端口}
volumes:
	- '' #容器中的目录文件映射到本地宿主机中
# 其他参数，可以查看具体文档。
```

## 2. 设置 phabricator 的 SSH 访问端口（外网访问时所用）

```sh
# 进入 phabricator 容器
$ docker exec -it phabricator_phabricator_1 /bin/bash
	# 设置端口
$ /srv/phabricator/phabricator/bin/config set diffusion.ssh-port 2222
```

## 3. 设置邮件服务（也可以在运行登录后在控制面板配置）

```sh
# 先进入 phabricator 容器的目录 /srv/phabricator/phabricator/
# 以下是以 Gmail 邮箱为例子，其它邮箱换成相应参数即可
sudo ./bin/config set metamta.default-address test@yourdomain.com
sudo ./bin/config set metamta.domain yourdomain.com
sudo ./bin/config set metamta.can-send-as-user false
sudo ./bin/config set metamta.mail-adapter PhabricatorMailImplementationPHPMailerAdapter
sudo ./bin/config set phpmailer.mailer smtp
sudo ./bin/config set phpmailer.smtp-host smtp.gmail.com
sudo ./bin/config set phpmailer.smtp-port 465
sudo ./bin/config set phpmailer.smtp-user test@yourdomain.com
sudo ./bin/config set phpmailer.smtp-password {your mail password}
sudo ./bin/config set phpmailer.smtp-protocol SSL

# 测试邮件
./bin/mail send-test --to 123123123@qq.com --subject hello <README.md

# 如果你的邮件收不到邮件，则是没有配置成功，可以检查下  Config->Mail->metamta.mail-adapter 值是否配置正确。
```

查看 phabricator 的邮件内容：

```sh
cd /opt/bitnami/phabricator
#查看邮件日志
./bin/mail list-outbound;
#清单
1 Sent   [Phabricator] Welcome to Phabricator
2 Sent   [Phabricator] Welcome to Phabricator
3 Sent   [Phabricator] Welcome to Phabricator
#查看具体的邮件日志
./bin/mail show-outbound --id 3;
#其他更多 mail 命令说明，可以参考说明文档。
```

默认情况下，邮件提醒比较多，你可以给个人或者全局设置一下提醒的种类。

(https://xxxx.com/settings/builtin/global/page/emailpreferences/)

## 4. 配置宿主机的 Nginx，让外网可以通过 80 端口访问 phabricator Container

```sh
server {
	listen  80;
	server_name your.domain.com;
	server_name_in_redirect off;
	proxy_set_header Host $host:$server_port;
	proxy_set_header X-Real-IP $remote_addr;
	proxy_set_header REMOTE-HOST $remote_addr;
	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	
	location / {
	    proxy_pass http://phabricator;
	}
}
```

其中 `http://phabricator` 是你 docker-compose 服务的服务名。

## 5. 如果你的域名 your.domain.com 只是个测试域名，你可以配置本地 Hosts 进行访问

```sh
#根据自己的需要换成宿主机的IP地址
192.168.0.X  your.domain.com
```

**至此，您在浏览器输入 your.domain.com 便可以正常使用 phabricator 了，GIT 及 SVN 等都可正常使用了。注意：最好先去 http://your.domain.com/auth/config/new/ 开启 Username/Password 登录方式**

## 遇到的问题

`mariadb_1 | Error executing 'postInstallation': EACCES: permission denied, mkdir '/bitnami/mariadb'`

解决方案：https://github.com/bitnami/bitnami-docker-wordpress/issues/110

你可以 `cat phabricator_data/phabricator/conf/local/local.json` 查看 pha 的一些配置：

- STMP
- 其他配置参数...
- Message: SMTP Error: Could not authenticate. (修改一下密码)
- Message: SMTP Error: Could not connect to SMTP host.

### 上传文件报错：

```sh
Server responded: 
<html>
<head><title>413 Request Entity Too Large</title></head>
<body bgcolor="white">
<center><h1>413 Request Entity Too Large</h1></center>
<hr><center>openresty/1.13.6.2</center>
</body>
</html>
<!-- a padding to disable MSIE and Chrome friendly error page -->
<!-- a padding to disable MSIE and Chrome friendly error page -->
<!-- a padding to disable MSIE and Chrome friendly error page -->
<!-- a padding to disable MSIE and Chrome friendly error page -->
<!-- a padding to disable MSIE and Chrome friendly error page -->
<!-- a padding to disable MSIE and Chrome friendly error page -->
```

如果你是使用 nginx 作为反向代理，则需要在 `nginx.conf` 中添加以下配置（设置 body 最大尺寸为 30MB）：

```sh
http {
  ...
  client_max_body_size 30m;
  ...
}
```

### 如何删除上传的不需要的文件？

>你不会以为只需要将文档中的文件号引用去掉就可以了吧。

遇到问题，Google 知：

Provide some way for administrators to remove/reset a user's profile image

In Wikimedia Phabricator we sometimes experience vandalism (as our policies are pretty liberal).

Steps:

- A Phab user uploads and sets an {offending | NSFW | copyrights/license violating} image as their Phab profile image.
- (Unrelated: I disable the user account via the web interface, due to the user's vandalism actions.)
- I ssh onto the Phab instance and run sudo ./phabricator/bin/remove destroy F11729470 to delete their uploaded image.
- I go to /file/query/all/ to also find the ID of the corresponding image called profile, created by Phab. (Slightly cumbersome, but okay.)
- I run sudo ./phabricator/bin/remove destroy F11729471 to delete the corresponding profile image.

Expected outcome:**

The image on the profile gets reset to some default fallback image, or displays nothing, or is broken, or... well, anything that makes their image not get displayed anymore in people's web browsers.

Actual outcome:**
The image is still displayed on the user profile and I don't know how to get it removed. Meh.


这个是管理员处理方式，用户自己应该怎么处理呢？

查询你能可见的所有文件：[http://your.domain.com/file/query/all/](http://your.domain.com/file/query/all/)
查询你自己上传的所有文件：[http://your.domain.com/file/](http://your.domain.com/file/)

----

## 参考资料

1. [https://github.com/bitnami/bitnami-docker-phabricator](https://github.com/bitnami/bitnami-docker-phabricator)
2. [https://github.com/bylucky/phabricator-docker](https://github.com/bylucky/phabricator-docker)
3. [用户指南：管理Phabricator电子邮件](https://phabricator.webfuns.net/book/phabricator/article/mail_rules/)
4. [搭建 Phabricator 我遇到的那些坑](https://halfrost.com/phabricator_trouble/)
5. [Provide some way for administrators to remove/reset a user's profile image](https://secure.phabricator.com/T13029)
6. [default-nginx-client-max-body-size](https://stackoverflow.com/questions/28476643/default-nginx-client-max-body-size)
7. [Phabricator 用户文档 (配置)-配置文件存储](https://phabricator.webfuns.net/book/phabricator/article/configuring_file_storage/)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)
