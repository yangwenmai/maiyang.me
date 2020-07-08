---
title: '在 AWS 中的 EC2 上通过 Ansible 安装 Docker'
keywords: aws, ec2, ansible, docker
date: 2018-07-11T06:01:23+08:00
lastmod: 2018-07-11T06:01:23+08:00
draft: false
description: '在 AWS 中的 EC2 上通过 Ansible 安装 Docker'
categories: [aws]
tags: [aws, ec2, ansible, docker]
comments: true
author: mai
---

这是一篇在 AWS 中的 EC2 上通过 Ansible 安装 Docker 的操作方法，以及一些踩过的坑。

----

>前置条件：申请 AWS 账号，并根据以上文档创建了 EC2 实例(linux)。

## 在 CentOS 7 上安装 Docker

在单台机器上[安装 Docker](https://docs.docker.com/install/linux/docker-ce/centos/)，大家都知道非常简单。

如果我们要在多台机器上安装 Docker 呢？难不成要一台一台的执行以上的安装步骤，这也太繁琐了。有没有什么好的办法来解决这个问题呢？

>Ansible

## 安装 Ansible

```shell
yum install -y ansible
```

在 AWS 中，如果你使用的是密钥对来登录的话，需要做一下处理才能正常使用，具体操作可见后文。

### 1. 使用 Ansible ad-hoc 的方式连接 AWS EC2

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

### 2. 使用 Ansible-Playbook 的方式

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

注：如果你修改 `yaml` 文件，再重新执行也是可以的，并且它会把执行结果的变更数量体现出来。

```shell
...
PLAY RECAP *********************************************************************************************************************************************************************************************************************************************************************
10.0.0.11                  : ok=10   changed=0    unreachable=0    failed=0
10.0.1.11                  : ok=10   changed=1    unreachable=0    failed=0
```

如上面的 changed=1 ，说明变更了 1 个地方。

----

## 参考资料

1. [CentOS 7 安装 Docker](https://docs.docker.com/install/linux/docker-ce/centos/)
2. [使用Ansible连接AWS EC2](https://blog.csdn.net/wendll/article/details/38345187)
3. [Ansible Playbook install docker on CentOS](https://gist.github.com/yonglai/d4617d6914d5f4eb22e4e5a15c0e9a03)
4. [使用Ansible安装Docker CE 17.03](https://blog.frognew.com/2017/04/ansible-install-docker-ce-1703.html)
5. [Ansible user guide](https://docs.ansible.com/ansible/2.5/user_guide/intro_getting_started.html)
6. [Ansible 中文官方学习手册](http://ansible-tran.readthedocs.io/en/latest/docs/)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。


