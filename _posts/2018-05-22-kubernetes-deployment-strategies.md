---
layout: post
title: 'kubernetes 部署策略'
keywords: k8s, kubernetes, deployment, strategy
date: 2018-05-22 19:00
description: '译文 - kubernetes 部署策略'
categories: [k8s]
tags: [k8s, kubernetes, deployment, strategy]
comments: true
author: mai
---

* content
{:toc}

    这是一篇基于 [https://container-solutions.com/kubernetes-deployment-strategies/](https://container-solutions.com/kubernetes-deployment-strategies/) 的译文，并且还附加了一个加强的实践内容，希望对大家真正理解部署策略有帮助。

----

在 Kubernetes 中，有几种不同的发布应用程序的方式，有必要选择正确的策略，以便在应用程序更新期间使您的基础架构可靠。

选择正确的部署程序取决于需求，我们在下面列出了一些可能采用的策略：

- 重新创建：终止旧版本并释放新版本；
- 渐变：一个接一个地以滚动更新的方式发布新版本；
- 蓝/绿：与旧版本一起发布新版本，然后切换流量；
- 金丝雀：向部分用户发布新版本，然后进行全面推出；
- a/b 测试：以精确的方式向用户的子集发布新版本（HTTP标头，cookie，重量等）。

>A/B 测试实际上是一种基于统计数据制定业务决策的技术，但我们将简要介绍这一过程。这并非 Kubernetes 开箱即用，它意味着需要额外的工作来设置更高级的基础设施（Istio，Linkerd，Traefik，自定义nginx / haproxy等）。

您可以使用 Minikube 试验这些策略中的每一种，遵循的清单和步骤在此存储库中进行说明：[https：//github.com/ContainerSolutions/k8s-deployment-strategies](https：//github.com/ContainerSolutions/k8s-deployment-strategies)

让我们来看看每个策略，看看哪种类型的应用最适合它。

## 重新创建 - 最适合开发环境

使用类型为 [Recreate](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#recreate-deployment) 的策略定义的部署将终止所有正在运行的实例，然后使用新版本重新创建它们。

```yaml
spec:
  replicas: 3
  strategy:
    type: Recreate
```

完整的示例和部署步骤可以在 [https://github.com/ContainerSolutions/k8s-deployment-strategies/tree/master/recreate](https://github.com/ContainerSolutions/k8s-deployment-strategies/tree/master/recreate) 找到。

优点：

- 申请状态完全更新

缺点：

- 停机时间取决于应用程序的关闭和启动持续时间

## 渐变 - 缓慢展开

渐变部署 pod 是以[rolling update](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-update-deployment) 方式更新窗格，使用新版本的应用程序创建辅助 ReplicaSet ，然后减少旧版副本的数量，并增加新版本，直到达到正确数量的副本。

![kubernetes-deployment-strategy-ramped](https://container-solutions.com/content/uploads/2017/09/kubernetes-deployment-strategy-ramped.png)

```yaml
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 2        # how many pods we can add at a time
      maxUnavailable: 0  # maxUnavailable define how many pods can be unavailable
                         # during the rolling update
```

完整的示例和部署步骤可以在：[https://github.com/ContainerSolutions/k8s-deployment-strategies/tree/master/ramped](https://github.com/ContainerSolutions/k8s-deployment-strategies/tree/master/ramped) 找到。

与[horizontal-pod-autoscaling](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)一起安装时，使用更方便的基于百分比的值而非 [maxSurge](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#max-surge)和 [maxUnavailable](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#max-unavailable) 的数字。

如果你在现有的 rollout 进行时触发部署，则部署将暂停 rollout ，并通过重写卷展栏来继续发布新版本。

优点：

- 版本在实例间缓慢发布
- 有状态应用程序可以很方便的处理数据得到平衡

缺点：

- 首次发布/回滚可能需要一些时间
- 支持多种 API 很难
- 无法控制流量

## 蓝/绿 - 最好避免API版本问题

蓝色/绿色部署与渐变部署不同，因为应用程序的“绿色”版本与“蓝色”版本一起部署。

在测试新版本满足要求之后，我们更新扮演负载均衡器角色的 Kubernetes 服务对象，以通过替换选择器字段中的版本标签将流量发送到新版本。

![kubernetes-deployment-strategy-blue-green](https://container-solutions.com/content/uploads/2017/09/kubernetes-deployment-strategy-blue-green.png)

```yaml
apiVersion: v1
kind: Service
metadata:
 name: my-app
 labels:
   app: my-app
spec:
 type: NodePort
 ports:
 - name: http
   port: 8080
   targetPort: 8080

 # Note here that we match both the app and the version.
 # When switching traffic, we update the label “version” with
 # the appropriate value, ie: v2.0.0
 selector:
   app: my-app
   version: v1.0.0
```
完整的示例和部署步骤可以在：[https://github.com/ContainerSolutions/k8s-deployment-strategies/tree/master/blue-green](https://github.com/ContainerSolutions/k8s-deployment-strategies/tree/master/blue-green) 找到。

优点：

- 即时展开/回滚
- 避免版本控制问题，一次改变整个群集状态

缺点：

- 需要双倍的资源
- 整个平台的正确测试应在发布之前完成
- 处理有状态的应用程序可能很难


## 金丝雀 - 让客户进行测试

金丝雀部署包括将一部分用户路由到新功能。在 Kubernetes 中，可以使用具有普通 pod 标签的两个部署完成金丝雀部署。

新版本的一个副本与旧版本一起发布，然后过了一段时间，如果没有检测到错误，请放大新版本的副本数量并删除旧的部署。

使用这种 ReplicaSet 技术需要根据需要提供尽可能多的豆荚以获得适当的流量比例。

也就是说，如果要将1％的流量发送到版本B，则需要使用版本B运行一个群集，并使用版本A运行99个群集。这可能会非常不方便管理，因此如果您正在寻找更好的管理流量分配，查看负载平衡器（如[HAProxy](http://www.haproxy.org/)）或服务网格（如[Linkerd](https://linkerd.io/)），这些网络提供更好的流量控制。

![kubernetes-deployment-strategy-canary](https://container-solutions.com/content/uploads/2017/09/kubernetes-deployment-strategy-canary.png)

在以下示例中，我们并排使用两个 ReplicaSets，版本 A 具有三个副本（占通信量的75％），版本 B 具有一个副本（占通信量的25％）。
截断的部署清单版本A：

```yaml
spec:
  replicas: 3
```

截断的部署清单版本B请注意，我们只启动应用程序的一个副本：

```yaml
spec:
  replicas: 1
```

完整的示例和部署步骤可以在： [https://github.com/ContainerSolutions/k8s-deployment-strategies/tree/master/canary](https://github.com/ContainerSolutions/k8s-deployment-strategies/tree/master/canary) 找到

优点：

- 版本针对一部分用户发布
- 方便错误率和性能监测
- 快速回滚

缺点：

- 缓慢首次发布
- 精细调整的交通分布可能很昂贵（99％ A / 1％ B = 99 pod A，1 pod B）

上面使用的过程是 Kubernetes 原生，我们调整 ReplicaSet 管理的副本数量以在各版本之间分配流量。
如果您对新功能的发布可能对平台的稳定性产生的影响没有信心，则建议使用金丝雀发布策略。

## A/B 测试 - 最适用于部分用户的功能测试

A/B 测试实际上是一种基于统计信息制定业务决策的技术，而不是部署策略。然而，它是相关的，并且可以使用金丝雀部署来实现，因此我们将在这里简要讨论它。

除了基于权重在版本之间分配流量之外，您还可以根据几个参数（cookie，用户代理等）精确定位给定的用户池。此技术广泛用于测试给定功能的转换，并只推出转换最多的版本。

与其他服务网格一样，[Istio](https://www.istio.io/) 提供了一种更细粒度的方式，以基于权重和/或 HTTP 标头的动态请求路由来细分服务实例。

![kubernetes-deployment-strategy-a-b-testing](https://container-solutions.com/content/uploads/2017/09/kubernetes-deployment-strategy-a-b-testing.png)

以下是使用 Istio 进行规则设置的示例，因为 Istio 仍在大力开发中，以下示例规则可能在未来发生变化：

```yaml
route:
- tags:
  version: v1.0.0
  weight: 90
- tags:
  version: v2.0.0
  weight: 10
```
完整的示例和部署步骤可以在 [https://github.com/ContainerSolutions/k8s-deployment-strategies/tree/master/ab-testing](https://github.com/ContainerSolutions/k8s-deployment-strategies/tree/master/ab-testing) 找到。
像 [Linkerd](https://linkerd.io/)，[Traefik](https://traefik.io/)，[NGINX](https://www.nginx.com/)，[HAProxy](http://www.haproxy.org/)等其他工具也允许你这样做。

优点：

- 需要智能负载平衡器
- 多个版本并行运行
- 完全控制交通分布

缺点：

- 很难排除给定会话的错误，分布式跟踪变成强制性的
- 不直接，你需要设置额外的工具

## 总结一下

部署应用程序有多种不同的方式，在向 development/staging 环境发布时，重新创建或倾斜部署通常是不错的选择。

在生产方面，斜坡或蓝/绿部署通常很合适，但对新平台的正确测试是必要的。

如果您对平台的稳定性没有信心，以及发布新软件版本会产生什么影响，那么应该是一条金丝雀版本。

通过这样做，您可以让消费者测试应用程序及其与平台的集成。

最后但并非最不重要的一点是，如果您的企业需要在特定用户池中测试新功能，例如所有使用移动电话访问应用程序的用户都会发送到版本A，则所有通过桌面访问的用户都会转到版本B。然后您可能想要使用 A/B 测试技术，通过使用 Kubernetes 服务网格或自定义服务器配置，您可以根据某些参数定位用户应该路由的位置。

我希望这是有用的，如果您有任何问题/反馈，请随时在下面发表评论。

----

## 实战（内容为转载 - 链接见后文）

因为互联网或者说网络的发展速度太快导致竞争力很大，各家公司为了保证为用户提供更好的体验就慢慢出现了“灰度”发布这种业务零中断的发布方式。

所谓的“灰度”发布是指为了让老版本更新成新版本，以及为了更充分测试老版本会让部署在生产环境的应用处于老版本和新版本共存，并逐渐过度到新版本的一种发布方式。

其实应用很容易支持“灰度”发布，因为它是无状态的。但是如果应用依赖了数据库那么它就可能变成“有状态”。这里的可能是指当需要变更数据库的时候它是有状态，如果不需要变更数据库它依然是无状态。

所以为了让应用可以支持“灰度”发布，就应该考虑好数据库的依赖问题，主要有两个方面：

- 在对事务要求不高的应用上使用非关系数据库，如，mongo，hbase等这类弱模式的数据库。这样在进行应用变更时可以动态变更数据库的表结构（或者说无需变更表结构）
- 在设计关系数据库时需要考虑好扩容问题，应避免因表结构变动影响到新老应用的兼容问题

在容器之前一般有两种办法进行“灰度发布”：

- 最早采用手工一台一台应用进行发布
- 采用部署工具，比如salt或者ansible等进行自动发布

不管采用哪种方式，其原理都是一样的：

- 部署一台新的应用
- 验证新应用是否正常
- 正常后停掉一台老应用
- 继续1-3步骤，直到所有应用升级完成

我们目前大部分应用采用的是kubernetes进行的容器化部署，kubernetes本身有一个“滚动”发布的功能用于进行“灰度”发布。下面我们来测试下kuberentes的“滚动”发布是如果玩的。

### 基础测试程序

>准备了一个叫做testpage的简单应用，这个应用提供一个rest的访问接口返回自身ip和版本，如：I am: 172.1.62.11, the version is: 0.5

**Dockerfile:**

```dockerfile
FROM python:2.7-alpine

ADD testpage.py /testpage.py

CMD ["python", "/testpage.py"]

EXPOSE 8080
```

**testpage.py:**

```python
#-*- coding:utf-8 -*-

#----------------------------------------------------------------------
import socket
import fcntl
import struct

def get_ip_address(ifname):
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    return socket.inet_ntoa(fcntl.ioctl(
        s.fileno(),
        0x8915,  # SIOCGIFADDR
        struct.pack('256s', ifname[:15])
    )[20:24])

#----------------------------------------------------------------------
import BaseHTTPServer
import os


class RequestHandler(BaseHTTPServer.BaseHTTPRequestHandler):

    Page = 'I am: %s, the version is: %s\n' % (get_ip_address('eth0'), os.environ.get('VERSION'))

    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-Type", "text/html")
        self.send_header("Content-Length", str(len(self.Page)))
        self.end_headers()
        self.wfile.write(self.Page)

#----------------------------------------------------------------------

if __name__ == '__main__':
    serverAddress = ('0.0.0.0', 8081)
f
    server = BaseHTTPServer.HTTPServer(serverAddress, RequestHandler)
    server.serve_forever()
```

简单说明：以上 `testpage.py` 是一个 Python 脚本，启动一个 web 服务，接受一个 VERSION 的操作系统环境变量，然后将自身的 ip 和 version 返回：`I am: 172.1.62.11, the version is: 0.5`

```
# 构建 docker 镜像到 docker hub
docker build -t your_docker_hub_name/testpage:[version1]
```

### kubernetes 的部署脚本

service 是为了让我们的容器服务能够被集群外访问到，如果不对外的话，是可以不需要的，也就是它不是必须的。

**service.yaml**

```yaml
kind: Service
apiVersion: v1
metadata:
  name: testpage
  namespace: default
  labels:
    type: testpage
spec:
  type: NodePort
  ports:
  - port: 8080
    nodePort: 31000
  selector:
    type: testpage
```

**deployment.yaml**

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: testpage
  namespace: default
  labels:
    type: testpage
spec:
  replicas: 3
  revisionHistoryLimit: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    metadata:
      labels:
        type: testpage
    spec:
      containers:
      - name: testpage
        image: dean/testpage:0.5
        imagePullPolicy: Always
        resources:
          limits:
            cpu: 10m
            memory: 20Mi
        env:
        - name: VERSION
          value: "0.5"
        ports:
        - containerPort: 8080
        readinessProbe:
          tcpSocket:
            port: 8080
        livenessProbe:
          tcpSocket:
            port: 8080
```
`deployment.yaml` 需要注意的几个方面：

- revisionHistoryLimit 用于限制保留多少份历史版本，因为“滚动”发布每次发布都会作为一个版本来进行管理，默认所有历史版本都会保留，也提供你进行回退等操作。
- strategy 这里指定了“滚动”发布的策略，maxSurge 是最大的变动 pod 数量（这里主要是指新增 pod 个数），maxUnavailable 指定允许最大的无效 pod 数量，这个值等于 0 的意义是我们在“滚动”发布的过程中必须保证有 replicas 个的 pod 在提供服务。
- livenessProbe 和 readinessProbe，这两个参数用于指定如何验证 pod 的“存活”和“可使用”。“滚动”发布主要使用 readinessProbe 进行验证。当“滚动”发布过程中一个新 pod 创建，那么 kubernetes 需要检查readinessProbe 为 ok（这里是验证端口8080是否可访问）才会删除老的 pod。

### 部署 `testpage`

```
$ kubectl create -f service.yaml
$ kubectl create -f deployment.yaml
$ kubectl get po -o wide -l type=testpage
NAME                       READY     STATUS    RESTARTS   AGE       IP            NODE
testpage-230767614-fm0m1   1/1       Running   0          4m           192.168.0.11
testpage-230767614-glvbz   1/1       Running   0          4m            192.168.0.12
testpage-230767614-hpx9s   1/1       Running   0          4m            192.168.0.13
```

#### 测试脚本

每一秒访问一次 testpage 服务，返回：访问到的 pod 的 ip 和 version

`while true; do date; curl http://192.168.72.2:21000; sleep 1; done`

监控testpage的pod变化情况：

`while true; do date; kubectl get po -l type=testpage -o wide; sleep 1; done`

监控testpage的deployment“滚动”发布状态:

`while true; do date; kubectl rollout status deployment testpage; sleep 1; done`

### 开始测试

我们模拟的testpage当前版本是 0.5，这时我们需要将其升级到 0.6

1. 根据上述 dockerfile 大家可以自己 build 出 0.6 的镜像: `username/testpage:v0.6`

2. 修改 `deployment.yaml`（将镜像版本和VERSION变量修改成0.6）

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: testpage
  namespace: default
  labels:
    type: testpage
spec:
  replicas: 3
  revisionHistoryLimit: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    metadata:
      labels:
        type: testpage
    spec:
      containers:
      - name: testpage
        image: dean/testpage:0.6
        imagePullPolicy: Always
        resources:
          limits:
            cpu: 10m
            memory: 20Mi
        env:
        - name: VERSION
          value: "0.6"
        ports:
        - containerPort: 8080
        readinessProbe:
          tcpSocket:
            port: 8080
        livenessProbe:
          tcpSocket:
            port: 8080
```
3. 执行测试脚本：

`while true; do date; curl http://192.168.0.11:31000; sleep 1; done`

该脚本持续返回：

```
Thu Mar  24 10:39:09 CST 2018
I am: 172.1.14.7, the version is: 0.5
Thu Mar  24 10:39:10 CST 2018
I am: 172.1.14.7, the version is: 0.5
Thu Mar  24 10:39:11 CST 2018
I am: 172.1.14.7, the version is: 0.5
Thu Mar  24 10:39:12 CST 2018
I am: 172.1.60.5, the version is: 0.5
Thu Mar  24 10:39:13 CST 2018
I am: 172.1.62.10, the version is: 0.5
```

从上面的输出我们可以看到总共有三个 pod 对应的 ip 地址，这里会返回三个 ip，对应的三个 pod，版本是 0.5 。

4. 执行两个监控脚本

```
while true; do date; kubectl get po -l type=testpage -o wide; sleep 1; done
while true; do date; kubectl rollout status deployment testpage; sleep 1; done
```

5. 开始“滚动”发布

`kubectl apply -f deployment.yaml`

6. 观察测试脚本和监控脚本的变化（这里都是动态滚动的）：

rollout status 结果如下:

```
Thu Mar  24 10:42:24 CST 2018
deployment "testpage" successfully rolled out
Thu Mar  24 10:42:25 CST 2018
Waiting for deployment spec update to be observed...
Waiting for rollout to finish: 1 out of 3 new replicas have been updated...
Waiting for rollout to finish: 1 out of 3 new replicas have been updated...
Waiting for rollout to finish: 1 out of 3 new replicas have been updated...
Waiting for rollout to finish: 2 out of 3 new replicas have been updated...
Waiting for rollout to finish: 2 out of 3 new replicas have been updated...
Waiting for rollout to finish: 2 out of 3 new replicas have been updated...
Waiting for rollout to finish: 1 old replicas are pending termination...
Waiting for rollout to finish: 1 old replicas are pending termination...
deployment "testpage" successfully rolled out
```

上述过程可以看到kuberentes的pod是一个一个更新的。直到最后老pod被清理掉。升级完成

kubectl get po 输出, 这里可以直观看出整个过程，下列的输出我是截取了关键的变化点。

```yaml
Thu Mar  9 10:42:39 CST 2017
NAME                       READY     STATUS              RESTARTS   AGE       IP            NODE
testpage-230767614-fm0m1   1/1       Running             0          7m        172.1.62.10   192.168.72.233
testpage-230767614-glvbz   1/1       Running             0          7m        172.1.60.5    192.168.72.2
testpage-230767614-hpx9s   1/1       Running             0          7m        172.1.14.7    192.168.72.128
testpage-515849216-059b0   0/1       ContainerCreating   0          14s       <none>        192.168.72.190   (标注1:因为配置文件中strategy的配置，不运行kuberentes进行同位替换，所有kuberentes创建了一个新pod)
Thu Mar  9 10:42:40 CST 2017
NAME                       READY     STATUS    RESTARTS   AGE       IP            NODE
testpage-230767614-fm0m1   1/1       Running   0          7m        172.1.62.10   192.168.72.233
testpage-230767614-glvbz   1/1       Running   0          7m        172.1.60.5    192.168.72.2
testpage-230767614-hpx9s   1/1       Running   0          7m        172.1.14.7    192.168.72.128
testpage-515849216-059b0   0/1       Running   0          15s       172.1.65.4    192.168.72.190    (标注2:新pod创建成功，但是因为readinessProbe的配置kubernetes需要检测到8080端口的可访问才算是READY状态，所以状态READY为0/1（这里数字的原因是一个pod中可以有多个容器）)
...
Thu Mar  9 10:43:06 CST 2017
NAME                       READY     STATUS              RESTARTS   AGE       IP            NODE
testpage-230767614-fm0m1   1/1       Terminating         0          7m        172.1.62.10   192.168.0.13   (标注4:包括新pod因为有3个pod可以提供服务，所有这是kubernetes下令中止一个老pod)
testpage-230767614-glvbz   1/1       Running             0          7m        172.1.60.5    192.168.0.12
testpage-230767614-hpx9s   1/1       Running             0          7m        172.1.14.7    192.168.0.11
testpage-515849216-059b0   1/1       Running             0          41s       172.1.65.4    192.168.0.12   (标注3:新pod创建成功，并且READY处于1/1（说明一个pod中的容器全部ready）这是该新pod会被添加到service中接受访问，我们结合testpage的访问数据可以看到在43:09时新pod被访问到

Thu Mar  24 10:43:09 CST 2018
I am: 172.1.65.4, the version is: 0.6

	)
testpage-515849216-1sf6b   0/1       ContainerCreating   0          1s        <none>        192.168.0.13   (标注5:因老pod已被中止（这里是异步的），kuberentes下令开始再创建一个新pod用于进行下一个老pod的替换 循环这个过程直到所有老pod替换完成，升级结束)
...
Thu Mar  9 10:43:18 CST 2017
NAME                       READY     STATUS        RESTARTS   AGE       IP            NODE
testpage-230767614-fm0m1   1/1       Terminating   0          7m        172.1.62.10   192.168.0.13
testpage-230767614-glvbz   1/1       Running       0          7m        172.1.60.5    192.168.0.12
testpage-230767614-hpx9s   1/1       Running       0          7m        172.1.14.7    192.168.0.11
testpage-515849216-059b0   1/1       Running       0          53s       172.1.65.4    192.168.0.13
testpage-515849216-1sf6b   0/1       Running       0          13s       172.1.62.11   192.168.0.13
...
Thu Mar  9 10:43:36 CST 2017
NAME                       READY     STATUS              RESTARTS   AGE       IP            NODE
testpage-230767614-glvbz   1/1       Terminating         0          8m        172.1.60.5    192.168.0.11
testpage-230767614-hpx9s   1/1       Running             0          8m        172.1.14.7    192.168.0.12
testpage-515849216-059b0   1/1       Running             0          1m        172.1.65.4    192.168.0.13
testpage-515849216-1sf6b   1/1       Running             0          31s       172.1.62.11   192.168.0.13
testpage-515849216-5jfb5   0/1       ContainerCreating   0          0s        <none>        192.168.0.11
...
Thu Mar  9 10:43:49 CST 2017
NAME                       READY     STATUS        RESTARTS   AGE       IP            NODE
testpage-230767614-glvbz   1/1       Terminating   0          8m        172.1.60.5    192.168.0.11
testpage-230767614-hpx9s   1/1       Running       0          8m        172.1.14.7    192.168.0.12
testpage-515849216-059b0   1/1       Running       0          1m        172.1.65.4    192.168.0.13
testpage-515849216-1sf6b   1/1       Running       0          44s       172.1.62.11   192.168.0.13
testpage-515849216-5jfb5   0/1       Running       0          13s       172.1.60.11   192.168.0.11
...
Thu Mar  9 10:44:07 CST 2017
NAME                       READY     STATUS        RESTARTS   AGE       IP            NODE
testpage-230767614-hpx9s   1/1       Terminating   0          8m        172.1.14.7    192.168.0.12
testpage-515849216-059b0   1/1       Running       0          1m        172.1.65.4    192.168.0.13
testpage-515849216-1sf6b   1/1       Running       0          1m        172.1.62.11   192.168.0.13
testpage-515849216-5jfb5   1/1       Running       0          31s       172.1.60.11   192.168.0.11
...
Thu Mar  24 10:47:46 CST 2018
NAME                       READY     STATUS    RESTARTS   AGE       IP            NODE
testpage-515849216-059b0   1/1       Running   0          5m        172.1.65.4    192.168.0.13
testpage-515849216-1sf6b   1/1       Running   0          4m        172.1.62.11   192.168.0.12
testpage-515849216-5jfb5   1/1       Running   0          4m        172.1.60.11   192.168.0.11
```

## 总结

- 策略配置让 kubernetes 必须先创建一个新 pod 去替换老 pod（而不是删除老 pod 再创建新 pod，这个策略可自行配置）
- 每次仅替换一个 pod，并进行业务的无缝切换
- 整个过程 readinessProbe 非常重要，确定着业务是否会被中断（必须确保 readinessProbe 的验证是对业务的准确验证，因为测试这里仅进行端口验证）

## kubernetes 支持其他 rollout 操作

读取 deployment 历史：

```yaml
kubectl rollout history deployment testpage
kubectl rollout history deployment testpage --revision 42
```

回滚到之前部署的版本：

```yaml
kubectl rollout undo deployment testpage
kubectl rollout undo deployment testpage --to-revision 21
```

暂停和恢复

```yaml
kubectl rollout pause deployment testpage
kubectl rollout resume deployment testpage
```

----

## 参考资料

0. [https://container-solutions.com/kubernetes-deployment-strategies/](https://container-solutions.com/kubernetes-deployment-strategies/)
1. [https://github.com/ContainerSolutions/k8s-deployment-strategies](https://github.com/ContainerSolutions/k8s-deployment-strategies)
2. [k8s - “灰度”发布](https://github.com/hellwen/myblog/blob/master/source/_posts/kuberntes-rollout-update.md)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)
