---
layout: post
title: '在 AWS 中构建你自己的 EC2 局域网络环境'
keywords: aws, ec2, VPC
date: 2018-07-10 07:00
description: '在 AWS 中构建你自己的 EC2 局域网络环境'
categories: [aws]
tags: [aws, ec2, VPC]
comments: true
author: mai
---

* content
{:toc}

    这是一篇在 AWS 中构建你自己的 EC2 局域网络环境的简短教程，包括我自己踩过的一些坑。

----

## AWS

>亚马逊网络服务（英语：Amazon Web Services，缩写为AWS），由亚马逊公司所创建的云计算平台，提供许多远程 Web 服务。Amazon EC2 与 Amazon S3 都架构在这个平台上。

## Amazon VPC

Amazon Virtual Private Cloud (Amazon VPC) 允许您在 AWS 云中预配置出一个采用逻辑隔离的部分，在这个部分中，您可以在自己定义的虚拟网络中启动 AWS 资源。您可以完全掌控您的虚拟联网环境，包括选择自己的 IP 地址范围、创建子网以及配置路由表和网络网关。您在 VPC 中既可以使用 IPv4 也可以使用 IPv6，从而实现安全而轻松的资源访问和应用程序访问。
您可以轻松自定义 Amazon VPC 的网络配置。例如，您可以为可访问 Internet 的 Web 服务器创建公有子网，而将数据库或应用程序服务器等后端系统放在不能访问 Internet 的私有子网中。您可以利用安全组和网络访问控制列表等多种安全层，帮助对各个子网中 Amazon EC2 实例的访问进行控制。

此外，您也可以在公司数据中心和 VPC 之间创建硬件虚拟专用网络 (VPN) 连接，并将 AWS 云用作公司数据中心的扩展。


在网络和内容分发，选择 VPC ，进入 VPC 控制面板，点击 Create VPC，出现

### 步骤1.选择一个 VPC 配置：

1. 带单个公有子网的 VPC
2. 带有公有和私有子网的 VPC
3. 带有公有和私有子网以及硬件 VPN 访问的 VPC
4. 仅带有私有子网和硬件 VPN 访问的 VPC

更多内容，大家可以自行登录后测试。

[aws 如何在创建实例的时候不自动生成公网IP，同时实例能够访问公网](http://www.nosa.me/2014/10/16/109/)

我们需要的 VPC 配置是第 2 个。

如果你的服务需要访问公网，那么必须有一个公网子网，以上 VPC 只有一种情况是没有公网的。

一般的用法是创建一个带有共有和私有子网的 VPC。

**带有公有和私有子网的 VPC:**

>除了包含公有子网之外，此配置还添加了一个私有子网，该子网的实例无法从 Internet 寻址。私有子网中的实例可以使用 Network Address Translation (NAT) 通过公有子网与 Internet 建立出站连接。
>创建: 具有两个 /24 子网的 /16 网络。公共子网实例，使用弹性 IP 地址访问 Internet。私有子网实例通过 Network Address Translation (NAT) 实例访问 Internet。 (NAT 实例按小时收费)

### 步骤 2: 带有公有和私有子网的 VPC

配置 IPv4 CIDR 块：10.0.0.0/16
Pv6 CIDR 块: 无

VPC 名称：my-vpc

```
公有子网的 IPv4 CIDR:* 10.0.0.0/24
可用区:* 无首选项
公有子网名称：my-vpc-public-subnet

私有子网的 IPv4 CIDR:* 10.0.1.0/24
可用区:* 无首选项
私有子网名称：my-vpc-private-subnet

指定 NAT 网关的详细信息
弹性 IP 分配 ID: //这里需要我们提前将 EIP 申请好，以便于这里进行绑定。

启用 DNS 主机名:* 是
```

点击创建 VPC 即可。

系统会默认创建 VPC, 子网，路由表，Internet 网关，NAT 网关。

注意，你创建的公有网络并不会自动分配 IPv4，需要进行修改。

### 更新您的 VPC 的 DNS 支持

您可以通过 Amazon VPC 控制台查看并更新您的 VPC 中的 DNS 支持属性。

使用控制台描述和更新 VPC 的 DNS 支持

打开 Amazon VPC 控制台 https://console.aws.amazon.com/vpc/。

在导航窗格中，选择 Your VPCs。

从列表中选择 VPC。

查看 Summary (摘要) 选项卡中的信息。在这个例子中，两项设置都已被启用。

DNS 设置选项卡
要更新这些设置，请选择 Actions 并选择 Edit DNS Resolution 或 Edit DNS Hostnames。在打开的对话框中选择 Yes 或 No，然后选择 Save。

## EC2

### 步骤 1: 选择一个 Amazon 系统映像(AMI)

搜索 CentOS 7，然后选择，进入下一步。

### 步骤 2: 选择一个实例类型

选择 t2.micro （符合条件的免费套餐：1核1G的低配），点击下一步：配置实例详细信息。

### 步骤 3: 配置实例详细信息

这一步主要是配置 VPC ，选择你之前创建的 my-vpc，子网选择公有网络的子网，自动分配公有IP，这里要开启。

你也可以将创建的实例置放到某个群组中。

特别注意：网络接口中，不要自动分配，最好是我们自己给分配 IP（10.0.0.10）。

点击下一步：添加存储。

### 步骤 4: 添加存储

选择通用型 8G即可。

点击下一步：添加标签。

### 步骤 5: 添加标签

添加你所需要的标签，然后点击下一步：配置安全组。

### 步骤 6: 配置安全组

这个安全组可以选择你所期望的配置，也可以重新配置。

>安全组名称只能包含字符： `a-z、 A-Z、 0-9，空白和 . 。_-:/()#,@[]+=&;{}!$*`，这个提示不准确，还包括描述也不能使用中文。

点击审核和启动，进入到最终确认页面，确认没问题，就点击启动，弹出一个选择现有的密钥对或者创建新的密钥对的选项。

然后就开始创建一个EC2实例了。

## 搭建 EC2 局域网环境

当你创建好了一个公网子网和私有子网的时候，后续创建 EC2 实例，你可以选择公网或者私有子网的机器，点击“操作->启动更多类似项”。

注意：如果我们要ping局域网内是否互通，你应该要检查一下你所设置的安全组，是否有开通 ICMP 协议。

自此，你就可以创建好你所希望要的局域网了，相互直接也能够ping同。

## 安装 Docker

如何在多台机器上同时安装 Docker 呢？

### 安装 Ansible

```shell
$ yum install -y ansible
```

在 AWS 中，如果你使用的是密钥对来登录的话，需要做一下处理才能正常检测。

#### 使用 Ansible 连接 AWS EC2

前置条件：申请 AWS 账号，并根据以上文档创建了 EC2 实例(linux)。

##### 1. 使用 Ansible ad-hoc 的方式连接 AWS EC2

*使用 ansible 连接上 EC2 执行 ping*

**第一种配置方式：**

hosts文件中内容：

```shell
[k8s]
centos@10.0.0.11
centos@10.0.1.11
```

执行：

```shell
ansible k8s -i hosts --private-key ../private/aws-ec2.pem -m ping
```

**第二种配置方式：**

hosts文件中内容：

```shell 
[k8s]
10.0.0.11
10.0.1.11
```

执行：

```shell
ansible k8s -i hosts --private-key ../private/aws-ec2.pem -m ping -u centos
```

**第三种配置方式：**

hosts文件内容：

```shell
[k8s]
10.0.0.11    ansible_ssh_private_key_file=../private/aws-ec2.pem
10.0.0.11    ansible_ssh_user=centos
10.0.1.11    ansible_ssh_private_key_file=../private/aws-ec2.pem
10.0.1.11    ansible_ssh_user=centos
```

执行：

```shell
ansible k8s -i hosts -m ping
```

**第四种配置方式：**

hosts 文件内容：

```shell
[k8s:vars]
ansible_ssh_private_key_file=../private/aws-ec2.pem
ansible_ssh_user=centos

[k8s]
10.0.0.11
10.0.1.11
```

执行：

```shell
ansible k8s -i hosts -m ping
```

以上四种配置方法都可以正常的执行 ping 命令。

结果：

```json
10.0.0.11 | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
10.0.1.11 | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
```

----

也可以使用 sudo 来使用 root 用户执行 ping 命令。

```shell
ansible k8s -i hosts --private-key ../private/aws-ec2.pem -m ping -u centos -s -U root -K
```

解释：

-u 为 ssh 连接时使用的用户。

-s 表示用 sudo，也可以使用 --sudo

-U 表示 ssh 连接后 sudo 的用户，也可以使用 --sudo-user=SUDO_USER

-K 表示可以交互的输入密码，也可以使用 --ask-sudo-pass

如果 sudo 时只需要是默认超级用户 root 且不用输入密码，则只需要在 centos 后加 -s 即可。

还可以使用 su 来使用 root 用户执行 ping 命令：

```shell
ansible k8s -i hosts --private-key ../private/aws-ec2.pem -m ping -u centos -S -R root --ask-su-pass
```

-S 表示为 su，也可以使用 --su
-R 表示 su 用户，也可以使用 --su-user=SU_USER
-K 表示可以交互的输入密码，也可以使用 --ask-sudo-pass

上面使用的是 ping 模块。也可以使用如下方式来执行 shell 命令：

```shell
ansible k8s -i hosts --private-key ../private/aws-ec2.pem -a "/bin/echo hello" -u centos
10.0.0.11 | SUCCESS | rc=0 >>
hello

10.0.1.11 | SUCCESS | rc=0 >>
hello

```

或者：

```shell
ansible k8s -a "/bin/echo hello"
10.0.0.11 | SUCCESS | rc=0 >>
hello

10.0.1.11 | SUCCESS | rc=0 >>
hello
```

这里默认使用模块为 command 模块。

##### 2. 使用 Ansible-Playbook 的方式

*使用 Ansible Playbook 在 EC2 上安装 Docker*

hosts 文件内容：

```shell
[k8s:vars]
ansible_ssh_private_key_file=../private/aws-ec2.pem
ansible_ssh_user=centos

[k8s]
10.0.0.11
10.0.1.11
```

`install_tools.yml` (vim && docker) 文件内容：

```yaml
---
- name: Install docker
  gather_facts: No
  hosts: k8s

  tasks:
    - name: Install yum vim
      yum:
        name: vim
        state: latest

    - name: Install yum utils
      yum:
        name: yum-utils
        state: latest

    - name: Install device-mapper-persistent-data
      yum:
        name: device-mapper-persistent-data
        state: latest

    - name: Install lvm2
      yum:
        name: lvm2
        state: latest

    - name: Add Docker Repo
      get_url:
        url: https://download.docker.com/linux/centos/docker-ce.repo
        dest: /etc/yum.repos.d/docer-ce.repo
      become: yes

    - name: Enable Docker Edge repo
      ini_file:
        dest: /etc/yum.repos.d/docer-ce.repo
        section: 'docker-ce-edge'
        option: enabled
        value: 0
      become: yes

    - name: Enable Docker Test repo
      ini_file:
        dest: /etc/yum.repos.d/docer-ce.repo
        section: 'docker-ce-test'
        option: enabled
        value: 0
      become: yes

    - name: Install Docker
      package:
        name: docker-ce
        state: latest
      become: yes

    - name: Start Docker service
      service:
        name: docker
        state: started
        enabled: yes
      become: yes

    - name: Add user centos to docker group
      user:
        name: centos
        groups: docker
        append: yes
      become: yes
```

执行的结果：

```shell
ansible-playbook -i /etc/ansible/hosts -s install_docker.yaml
[DEPRECATION WARNING]: The sudo command line option has been deprecated in favor of the "become" command line arguments. This feature will be removed in version 2.6. Deprecation warnings can be disabled by setting deprecation_warnings=False in ansible.cfg.

PLAY [Install docker] **********************************************************************************************************************************************************************************************************************************************************

TASK [Install yum utils] *******************************************************************************************************************************************************************************************************************************************************
ok: [10.0.0.11]
ok: [10.0.1.11]

TASK [Install device-mapper-persistent-data] ***********************************************************************************************************************************************************************************************************************************
changed: [10.0.0.11]
changed: [10.0.1.11]

TASK [Install lvm2] ************************************************************************************************************************************************************************************************************************************************************
changed: [10.0.1.11]
changed: [10.0.0.11]

TASK [Add Docker Repo] *********************************************************************************************************************************************************************************************************************************************************
changed: [10.0.1.11]
changed: [10.0.0.11]

TASK [Enable Docker Edge repo] *************************************************************************************************************************************************************************************************************************************************
changed: [10.0.1.11]
changed: [10.0.0.11]

TASK [Enable Docker Test repo] *************************************************************************************************************************************************************************************************************************************************
changed: [10.0.1.11]
changed: [10.0.0.11]

TASK [Install Docker] **********************************************************************************************************************************************************************************************************************************************************
changed: [10.0.1.11]
changed: [10.0.0.11]

TASK [Start Docker service] ****************************************************************************************************************************************************************************************************************************************************
changed: [10.0.1.11]
changed: [10.0.0.11]

TASK [Add user centos to docker group] *****************************************************************************************************************************************************************************************************************************************
changed: [10.0.1.11]
changed: [10.0.0.11]

PLAY RECAP *********************************************************************************************************************************************************************************************************************************************************************
10.0.0.11                  : ok=9    changed=8    unreachable=0    failed=0
10.0.1.11                  : ok=9    changed=8    unreachable=0    failed=0
```

其他 ansible 的命令：

```shell
ansible k8s -m command -a 'hostnamectl'
ansible k8s -m command -a 'df -h'
ansible k8s -m command -a 'uptime'
```

注：如果你修改 yaml 文件，则重新执行也是可以的，并且它会把哪些执行的标注出来。

```shell
...
PLAY RECAP *********************************************************************************************************************************************************************************************************************************************************************
10.0.0.11                  : ok=10   changed=0    unreachable=0    failed=0
10.0.1.11                  : ok=10   changed=1    unreachable=0    failed=0
```

有明确的 changed=1 ，说明变更了1个地方。

----

## 参考资料

1. [Amazon VPC 介绍](https://aws.amazon.com/cn/vpc/?nc2=h_m1)
2. [什么是 AWS VPC？](https://docs.aws.amazon.com/zh_cn/AmazonVPC/latest/UserGuide/VPC_Introduction.html)
3. [VPC 和子网](https://docs.aws.amazon.com/zh_cn/AmazonVPC/latest/UserGuide/VPC_Subnets.html)
4. [Amzon VPC 入门](https://docs.aws.amazon.com/zh_cn/AmazonVPC/latest/UserGuide/getting-started-ipv4.html)**
5. [你的 VPC 中的 IP 地址](https://docs.aws.amazon.com/zh_cn/AmazonVPC/latest/UserGuide/vpc-ip-addressing.html)
6. [使用Ansible连接AWS EC2](https://blog.csdn.net/wendll/article/details/38345187)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)
