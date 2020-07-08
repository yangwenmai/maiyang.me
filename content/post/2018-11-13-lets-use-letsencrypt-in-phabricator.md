---
title: '给 Phabricator 增加 Lets Encrypt 证书'
keywords: Phabricator, HTTPS, TTL, SSL, Encrypt
date: 2018-11-13T11:17:00+08:00
lastmod: 2018-11-14T23:58:00+08:00
draft: false
description: '给 Phabricator 增加 Lets Encrypt 证书'
categories: [https]
tags: [Phabricator, HTTPS, TTL, SSL, Encrypt]
comments: true
author: mai
---

## 安装步骤

参考其他文档

## 错误处理

配置 letsencrypt 之后，报错：

```sh
2018/11/13 03:27:34 [emerg] 1#1: BIO_new_file("/etc/letsencrypt/ xxx/cert.pem") failed (SSL: error:02001002:system library:fopen:No such file or directory:fopen('/etc/letsencrypt/xxx/cert.pem','r') error:2006D080:BIO routines:BIO_new_file:no such file)
nginx: [emerg] BIO_new_file("/etc/letsencrypt/xxx/cert.pem") failed (SSL: error:02001002:system library:fopen:No such file or directory:fopen('/etc/letsencrypt/xxx/cert.pem','r') error:2006D080:BIO routines:BIO_new_file:no such file)
```

原因是因为是你的 pem 需要进行转换，当然你也可以使用下面这种方式来生成就可直接使用了。

```sh
$ sudo apt-get install software-properties-common
...

OK

$ sudo apt-get update

$ sudo certbot --nginx

Deploying Certificate to VirtualHost /etc/nginx/sites-enabled/default

IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/xxx/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/xxx/privkey.pem
   Your cert will expire on 2019-02-11. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot again
   with the "certonly" option. To non-interactively renew *all* of
   your certificates, run "certbot renew"
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le
```

如果还是不能通过 https 访问，可以参考此解决方案：https://github.com/bitnami/bitnami-docker-phabricator/issues/57

但是我试验是不行的，但是它的解决思路可以借鉴。

```sh
$ docker exec -it phabricator bash
$ config set phabricator.base-uri https://$SITE_URL
$ config set security.require-https 'true'
$ cat > /opt/bitnami/phabricator/support/preamble.php <<EOF
<?php

\$_SERVER['HTTPS'] = true;
EOF
```

这里有一个坑的地方，就是需要对 $ 进行转义。

然后重启 phabricator 即可：

```sh
$ docker-compose restart phabricator
```

另外，[acme.sh](https://github.com/Neilpang/acme.sh) 项目看起来挺不错的，可以参考。

`acme.sh` 实现了 `acme` 协议, 可以从 letsencrypt 生成免费的证书.

主要步骤:

- 安装 `acme.sh`
- 生成证书
- copy 证书到 nginx/apache 或者其他服务
- 更新证书
- 更新 `acme.sh`
- 出错怎么办, 如何调试

## 如果你是通过 certbot new 创建的，怎么实现自动更新呢？

0. 停掉机器的所有 nginx 服务；（否则 `certbot renew` 会有 nginx restart 错误）
1. `certbot renew`；（会将最新的 *pem* 证书生成到:`/etc/letsencrypt/live/p.xxx.com/fullchain.pem`）
2. 拷贝证书：
	- `cp /etc/letsencrypt/live/p.xxx.com/privkey.pem /data/phabricator/nginx/ssl/privkey.pem`
	- `cp /etc/letsencrypt/live/p.xxx.com/fullchain.pem /data/phabricator/nginx/ssl/fullchain.pem`
3. `docker-compose restart -f /..../docker-compose.yml` 或者 `docker start 先前的容器名`
4. 配置 `crontab` 自动更新任务；(注意 crontab 读取环境变量的问题，可以查看参考资料)

## dns 模式（感谢 Kios）

dns01 模式 是 Let's Encrypt 提供的一种验证域名的方式，可以使用 CertBot 去验证 具体就是 使用 CertBot 启用 dns01 然后他会提供给你一个 域名解析中 的一个 TXT Record 然后你把这个放到你的域名解析上，最后记得现在你的服务器上 dig 一下 txt 记录看一下是否递归成功，最终完成 certbot 的提示 enter 就可以获取到新的证书或者更新证书了。

执行这条命令会提示你加一条 TXT 记录：
```sh
$ ./certbot-auto -d www.example.com --manual --prefered-challenges dns certonly
```

查询DNS是否递归完成：
```sh
dig -t txt _acme-challenge.www.example.com
```

我未进行验证，有需要的自己去试验吧。

## 参考资料

1. https://github.com/bitnami/bitnami-docker-phabricator/issues/57
2. [Let's Encrypt证书自动更新](https://blog.csdn.net/shasharoman/article/details/80915222)
	- 这里面详细讲解了配置 crontab 所遇到的问题。

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。


