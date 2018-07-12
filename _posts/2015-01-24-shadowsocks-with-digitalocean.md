---
date: 2015-01-24 15:16:54 +0800
title: 使用 DigitalOcean 和 shadowsocks 来科学上网
description: 使用了各种不稳定的VPN服务以后，我还是觉得自己搭VPS比较靠谱。DigitalOcean 提供了可伸缩的 VPS，最便宜的服务器是每个月$5，虽然对于学生来说不算便宜，但好在一开始充$5送$10，而且成功申请到 Github Student pack 的话，还可以得到$100。ShadowSocks 是科学上网的利器，在 Github 上已经得到了五千多个 Star，使用的人极多、影响极深。而且它对各个平台的支持也非常好，目前我在 Windows/Mac/iOS 三个平台上都拥有了科学上网的环境。
permalink: /posts/shadowsocks-and-digitalocean/
key: 10023
labels: [shadowsocks, DigitalOcean, VPS]
---

使用了各种不稳定的VPN服务以后，我还是觉得自己搭VPS比较靠谱。DigitalOcean 提供了可伸缩的 VPS，最便宜的服务器是每个月$5，虽然对于学生来说不算便宜，但好在一开始充$5送$10，而且成功申请到 Github Student pack 的话，还可以得到$100。ShadowSocks 是科学上网的利器，在 Github 上已经得到了五千多个 Star，使用的人极多、影响极深。而且它对各个平台的支持也非常好，目前我在 Windows/Mac/iOS 三个平台上都拥有了科学上网的环境。

## DigitalOcean

首先注册账号，激活邮箱自不必说。激活后就会收到$10的奖励，但是仅仅这样还是无法在 DigitalOcean 上创建虚拟主机。你需要绑定信用卡或者直接向你的账户里冲入$5才能正式开始使用。我的话，是在 paypal 账号上绑定了一张银联的卡来付款的，按这几天的汇率大概¥31左右吧。（另外附上我的邀请链接，嘿嘿：[https://www.digitalocean.com/?refcode=09e0142818aa](https://www.digitalocean.com/?refcode=09e0142818aa)）

然后你就可以创建你的云主机了，选择 $5/mon 的那一档来支撑 shadowsocks 的服务足矣。经过测试 San Francisco 的机房延迟最低，平均在230ms左右。而 Singapore 的机房延迟在280ms，还有5%左右的丢包率。所以经过几次创建后又销毁重新创建地倒腾，我最后还是选择了使用 San Francisco 的节点。另外操作系统的话，我选择的是`ubuntu 14.04 x64`的。

### 创建 SSH key

接下来可以添加 SSH key，这一步不是必须的，但是我觉得使用 SSH key 比使用 DigitalOcean 为你创建的随机密码好一点。如果不想做这一步，或者你之前已经创建过 SSH key 的话，可以跳过这一部分。

#### 什么是 SSH key

SSH key 是一个简单而又安全地连接到你的远端设备的方式，通过它你不需要在网络上传输你的密码。SSH key 有 public 和 private 两部分，其中 private 部分存储在你的设备本地，而 public 部分则需要上传到远程设备上。当你通过 ssh 连接到远程设备上时，只有私钥和公钥匹配上才能登陆。

#### 如何创建 SSH key

第一步，首先查看你本地设备上是否有 SSH keys。你可以运行以下指令：

{% highlight console %}
cd ~/.ssh
ls *.pub
{% endhighlight %}

如果没有任何输出，说明你需要创建一个新的 SSH key：

{% highlight console %}
ssh-keygen -t rsa -C "email@example.com"
{% endhighlight %}

后面的 email 请替换成你自己的 email。接着你就会看到类似下面的信息：

{% highlight console %}
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/you/.ssh/id_rsa): [Press enter]
Enter passphrase (empty for no passphrase): [Type a passphrase]
Enter same passphrase again: [Type passphrase again]
Now your SSH key will be generated.
Your identification has been saved in /Users/your_username/.ssh/id_rsa.
Your public key has been saved in /Users/your_username/.ssh/id_rsa.pub.
The key fingerprint is:
01:0f:f4:3b:ca:85:d6:17:a1:7d:f0:68:9d:f0:a2:db email@example.com
{% endhighlight %}

比如我的公钥就生成于：/Users/Jerry/.ssh/id_rsa.pub，接下来就可以把公钥内容传到 DigitalOcean 上了，如下图所示：

![DigitalOcean SSH key][1]

## Shadowsocks

其实在 shadowsocks 的[github主页](https://github.com/shadowsocks/shadowsocks)上有很详细地说明，但是为了本文的完整性，还是将这些操作放在本文中以供参考。

### 在服务器端安装shadowsocks

首先需要远程登录到 DigitalOcean 的主机上，我租用的 San Francisco 的机房 IP 地址是 104.236.177.232。而因为之前已经建好了 SSH Key，所以直接用 root 用户登录即可：

{% highlight console %}
ssh root@104.236.177.232
{% endhighlight %}

在 Debian / Ubuntu 下 安装 shadowsocks

{% highlight console %}
apt-get install python-pip
pip install shadowsocks
{% endhighlight %}

我在实际安装下发现很多依赖缺失，所以需要先执行一下：apt-get update。另外也有一些同学会选择 CentOS 的服务器，附上在 CentOS 下安装 shadowsocks 的方法：

{% highlight console %}
yum install python-setuptools && easy_install pip
pip install shadowsocks
{% endhighlight %}

### 启动 shadowsocks 服务

安装好 shadowsocks 以后，启动 shadowsocks 服务可以通过以下指令：

{% highlight console %}
ssserver -p 8836 -k 你设置的密码 -m rc4-md5

# 或者可以通过以下指令在后台启动shadowsocks的服务：
ssserver -p 8836 -k 你设置的密码 -m rc4-md5 -d start
ssserver -p 8836 -k 你设置的密码 -m rc4-md5 -d stop
{% endhighlight %}

但上面的方法很不方便，我还是推荐使用配置文件的方法。首先创建一个文件：/etc/shadowsocks.json，示例如下：

{% highlight json %}
{
    "server":"你的服务器ip地址",
    "server_port":8388,
    "local_address": "127.0.0.1",
    "local_port":1080,
    "password":"你设置的密码",
    "timeout":300,
    "method":"aes-256-cfb",
    "fast_open": false
}
{% endhighlight %}

接下来你就可以使用下面这个指令启动服务

{% highlight console %}
ssserver -c /etc/shadowsocks.json

# 或者在后台运行
ssserver -c /etc/shadowsocks.json -d start
ssserver -c /etc/shadowsocks.json -d stop
{% endhighlight %}

### 使用shadowsocks客户端

shadowsocks 的客户端支持各大主流平台，而且客户端的配置一般都很简单，只需要配置一下服务器的ip地址和之前设置好的连接密码即可。

- [OS X](https://sourceforge.net/projects/shadowsocksgui/files/dist/) / [Windows](https://sourceforge.net/projects/shadowsocksgui/files/dist/)
- [Android](https://github.com/shadowsocks/shadowsocks/wiki/Ports-and-Clients#android) / [iOS](https://github.com/shadowsocks/shadowsocks-iOS/wiki/Help)
- [更多设备](https://github.com/shadowsocks/shadowsocks/wiki/Ports-and-Clients)

## 参考资料

- [Github Homepage for shadowsocks](https://github.com/shadowsocks/shadowsocks)
- [Configuration via Config File](https://github.com/shadowsocks/shadowsocks/wiki/Configuration-via-Config-File)

[1]: {{ site.static_url }}/posts/DigitalOcean_sshkey.png