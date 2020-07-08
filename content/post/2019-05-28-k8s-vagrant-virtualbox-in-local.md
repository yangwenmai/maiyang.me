---
title: '基于 vagrant 和 VirtualBox 在本地构建 k8s 集群和 Istio Service Mesh'
keywords: k8s, vagrant, VirtualBox
date: 2019-05-28T22:10:00+08:00
lastmod: 2019-05-28T22:10:00+08:00
draft: false
description: '使用Vagrant和VirtualBox在本地搭建分布式的Kubernetes集群和Istio Service Mesh'
categories: [k8s]
tags: [k8s, vagrant, VirtualBox]
comments: true
author: mai
---

## vagrant

install vagrant_2.2.4_x86_64.dmg

## VirtualBox

VirtualBox-6.0.8-130520-OSX.dmg

## 下载 repos

```sh
git clone https://github.com/rootsongjc/kubernetes-vagrant-centos-cluster.git
cd kubernetes-vagrant-centos-cluster
```

## vagrant 安装

```sh
vagrant up
Bringing machine 'node1' up with 'virtualbox' provider...
Bringing machine 'node2' up with 'virtualbox' provider...
Bringing machine 'node3' up with 'virtualbox' provider...
==> node1: Importing base box 'centos/7'...
==> node1: Matching MAC address for NAT networking...
==> node1: Setting the name of the VM: node1
==> node1: Clearing any previously set network interfaces...
==> node1: Preparing network interfaces based on configuration...
    node1: Adapter 1: nat
    node1: Adapter 2: hostonly
==> node1: Forwarding ports...
    node1: 22 (guest) => 2222 (host) (adapter 1)
==> node1: Running 'pre-boot' VM customizations...
==> node1: Booting VM...
==> node1: Waiting for machine to boot. This may take a few minutes...
    node1: SSH address: 127.0.0.1:2222
    node1: SSH username: vagrant
    node1: SSH auth method: private key
    node1: Warning: Connection reset. Retrying...
    node1: Warning: Remote connection disconnect. Retrying...
    node1: Warning: Connection reset. Retrying...
    node1: Warning: Remote connection disconnect. Retrying...
    node1: Warning: Connection reset. Retrying...
    node1: Warning: Remote connection disconnect. Retrying...
    node1:
    node1: Vagrant insecure key detected. Vagrant will automatically replace
    node1: this with a newly generated keypair for better security.
    node1:
    node1: Inserting generated public key within guest...
    node1: Removing insecure key from the guest if it's present...
    node1: Key inserted! Disconnecting and reconnecting using new SSH key...
==> node1: Machine booted and ready!
==> node1: Checking for guest additions in VM...
    node1: No guest additions were detected on the base box for this VM! Guest
    node1: additions are required for forwarded ports, shared folders, host only
    node1: networking, and more. If SSH fails on this machine, please install
    node1: the guest additions and repackage the box to continue.
    node1:
    node1: This is not an error message; everything may continue to work properly,
    node1: in which case you may ignore this message.
==> node1: Setting hostname...
==> node1: Configuring and enabling network interfaces...
==> node1: Exporting NFS shared folders...
==> node1: Preparing to edit /etc/exports. Administrator privileges will be required...
Password:
The nfsd service does not appear to be running.
Starting the nfsd service
==> node1: Mounting NFS shared folders...
...

    node3: serviceaccount/admin created
    node3: the admin role token is:。。。
    node3: login to dashboard with the above token
    node3: https://172.17.8.101:8443
    node3: install traefik ingress controller
    node3: ingress.extensions/traefik-ingress created
    node3: clusterrolebinding.rbac.authorization.k8s.io/traefik-ingress-controller created
    node3: serviceaccount/traefik-ingress-controller created
    node3: daemonset.extensions/traefik-ingress-controller created
    node3: service/traefik-ingress-service created
    node3: Configure Kubectl to autocomplete
```

基本上按照 https://github.com/rootsongjc/kubernetes-vagrant-centos-cluster/blob/master/README-cn.md 即可搭建起来（但是 k8s 比较耗资源，所以本地运行还是很吃力。。。）
>下载资源什么的需要翻墙，所以最好是全局翻墙吧。

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。


