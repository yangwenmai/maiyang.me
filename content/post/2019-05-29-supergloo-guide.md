---
title: '安装使用 SuperGloo'
keywords: k8s
date: 2019-05-29T16:41:00+08:00
lastmod: 2019-05-29T16:41:00+08:00
draft: false
description: '安装使用 SuperGloo'
categories: [k8s]
tags: [k8s]
comments: true
author: mai
---

## SuperGloo 是什么？

SuperGloo 是一个大规模管理和编排服务网格的开源项目。
SuperGloo 是一个确定的抽象层，它可以简化服务网格的安装，管理和操作，无论你是 on-site，Cloud 还是其他任何拓扑上使用（或计划使用）单个网格或多个网格技术最适合你的。

![](https://supergloo.solo.io/img/architecture.png)

SuperGloo 可以让你最大化服务网格的优势同时还可以减少其复杂性。

## 为什么有 SuperGloo?

1. SuperGloo 帮助用户开始他们的服务网格体验。
>考虑使用服务网格的用户被那些必须要做的很多配置吓到了。
>SuperGloo 通过提供自动化安装过程的自定义 API 解决了这个问题，无需编写和部署复杂的 yaml 文件。

2. SuperGloo 负责与网格相关的关键功能，包括加密，遥测和跟踪。
>使用 SuperGloo 启动任何这些操作就像翻转交换机一样简单，完全绕过了复杂配置步骤的需要。

3. SuperGloo 统一管理入口流量（“北/南”）和网格流量（“东/西”）。
>每个服务网格都依赖于入口控制器来管理跨集群和互联网的流量。
>SuperGloo 提供全自动的自定义工作流程，用于配置网格以与你的入口配合使用，为所有流量提供统一的管理体验。

4. SuperGloo 让你可以自由地将任何服务网格与任何入口配对。
>SuperGloo 提供的网格抽象使用户可以自由选择他们喜欢的网格和入口，并将其留给 SuperGloo 来处理让他们一起工作所需的安装和配置。
>SuperGloo 还支持在同一集群中运行多个网格的多个入口。

5. SuperGloo 可以轻松探索不同的网格并在它们之间进行迁移。
>统一的界面以及自动化安装使得从一个网格到另一个网格的过渡变得快速而轻松。

6. SuperGloo 允许使用相同工具操作不同的网格。
>我们寻求提供的抽象将允许开发人员构建在任何网格或跨网格上运行的单个产品。
>对于用户而言，这将提供在服务网格提供者之间进行迁移的能力，而无需更改他们使用的工具。

7. SuperGloo 将任何类型的网格“粘合”成多网格。
>对于运行多个服务网格实例的公司，SuperGloo 将所有不同的网格连接在一起，跨越名称空间，跨集群，跨云服务。
>所有这些都使用平面网络和策略应用于该级别，而不是在每个单独级别重复，而无需跨网格同步配置。

## 特性

- 简单的 API - 大多数服务网格都是使用复杂的API构建的，旨在支持大量用例。 SuperGloo 将服务网络配置归结为基础，同时表达对用户最重要的功能。
- 安装 - 使用默认或自定义设置安装、卸载和重新安装服务网格。使用一键式 SuperGloo API 自动执行复杂的工作流程，例如支持多租户（多命名空间）安装。
- 发现 - 发现现有的服务网格安装并在其上集成 SuperGloo 以实现无缝管理，无需额外的用户配置或出错的风险。
- 安全性 - 通过单击按钮管理根证书，启用/禁用 mTLS，并在网格中实施策略。
- 路由流量控制 - 将复杂的 HTTP/2 功能应用于网格中的任何/所有流量，例如流量转移，故障注入，标头操作等。
- 路由恢复能力 - 异常检测，连接池，超时和重试。
- 可观察性度量标准 - SuperGloo 自动配置现有的 Prometheus，Grafana 和 Jaeger 安装，以便从你的网格服务中抓取并可视化数据。 不再编辑大型 YAML 文件和 kubernetes 配置文件！
- 入口集成 - 无缝安装和配置任何入口以使用网格，同时使用统一管理 API 进行配置。
- Ingress发现 - 发现已安装的入口并对其进行管理。
- 可插拔性 - 通过开发高度可扩展的开源 Go 架构的 SDK，可以轻松扩展 SuperGloo 的新功能和网格。

## 功能快照

|	|Istio	|Consul Connect	|Linkerd 2|
|----|----|----|----|
|Installation |	✔	 |✔ |	✔ |
|Discovery |	🚧 |	🚧 |	🚧 |
|Security：Root Cert |	✔ |	✔ |	🚧 |
|Security：mTLS |	✔ |	✔ |	🚧 |
|Security：Policy |	✔ |	✔ |	N/A |
|Routing：Traffic Control |	✔ |	N/A |	N/A |
|Routing：Resilience |	✔ |	N/A |	N/A |
|Observibility：Metrics via Prometheus | 	✔ |	N/A |	✔ |
|Observibility：Metrics via Grafana |	🚧 |	N/A |	🚧 |
|Observibility：OpenTracing |	🚧 |	N/A	 |🚧 |
|Ingress：Installation |	🚧 |	🚧 |	🚧 |
|Ingress：Discovery |	🚧 |	🚧 |	🚧 |

## 路线图

⬜	Service Mesh Discovery
⬜	Linkerd 2 encryption
⬜	Ingress install
⬜	Ingress discovery
⬜	Metrics via Grafana
⬜	OpenTracing

## 愿景

在 Solo，我们相信处于任何阶段的公司都将从体验多个服务网格中获益。
在采用的早期阶段，用户将受益于尝试多种技术的能力。
同一组织内的团体可能倾向于不同的选择，使多网格成为长期的现实。
无论多网格是过渡阶段还是最终阶段，在不影响易用性，功能性或灵活性的情况下保持你的选择开放将使早期采用者具有竞争优势。

我们的愿景是启用多网格，能够将任何类型的网格连接在一起，跨命名空间，跨集群，跨云服务。
所有这些都采用平面网络和策略应用于超级网格级别，而不是在每个单独级别重复，而无需跨网格同步配置。
我们寻求提供的抽象将允许开发人员构建在任何网格或跨网格上运行的单个产品。

----

## 安装 SuperGloo

Homebrew 安装：
```sh
brew install solo-io/tap/supergloo
```

也可以采用：
```sh
curl -sL https://run.solo.io/supergloo/install | sh
```

也可以直接下载 [ CLI ](https://github.com/solo-io/supergloo/releases)，但是需要设置环境变量：

```sh
export PATH=$HOME/.supergloo/bin:$PATH
```

通过安装的 CLI 运行：

```sh
$ supergloo --version
supergloo version 0.3.22
```

## 使用 `supergloo init` 将 SuperGloo Controller 安装到 Kubernetes 集群

```sh
$ supergloo init
installing supergloo version 0.3.22
using chart uri https://storage.googleapis.com/supergloo-helm/charts/supergloo-0.3.22.tgz
configmap/sidecar-injection-resources created
serviceaccount/supergloo created
serviceaccount/discovery created
serviceaccount/mesh-discovery created
clusterrole.rbac.authorization.k8s.io/discovery created
clusterrole.rbac.authorization.k8s.io/mesh-discovery created
clusterrolebinding.rbac.authorization.k8s.io/supergloo-role-binding created
clusterrolebinding.rbac.authorization.k8s.io/discovery-role-binding created
clusterrolebinding.rbac.authorization.k8s.io/mesh-discovery-role-binding created
deployment.extensions/supergloo created
deployment.extensions/discovery created
deployment.extensions/mesh-discovery created
install successful!
```

你可以通过运行 `supergloo init --dry-run` 来查看 kubernetes YAML， supergloo 正在安装到您的集群而无需安装。

*注意：*你可以通过提供 `--namespace` 选项将 SuperGloo 安装到指定的命名空间。如果未提供该选项，则命名空间默认为 `supergloo-system`。

```sh
$ supergloo init --namespace my-namespace
```

检查是否已创建 SuperGloo 和 Discovery pod：

```sh
$ kubectl --namespace supergloo-system get all
NAME                                  READY   STATUS    RESTARTS   AGE
pod/discovery-58fdbb95dd-ltfw5        1/1     Running   0          3m53s
pod/mesh-discovery-85d655f99d-6r7pj   1/1     Running   0          3m53s
pod/supergloo-688ff566-s88b2          1/1     Running   0          3m53s

NAME                             READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/discovery        1/1     1            1           3m53s
deployment.apps/mesh-discovery   1/1     1            1           3m53s
deployment.apps/supergloo        1/1     1            1           3m53s

NAME                                        DESIRED   CURRENT   READY   AGE
replicaset.apps/discovery-58fdbb95dd        1         1         1       3m53s
replicaset.apps/mesh-discovery-85d655f99d   1         1         1       3m53s
replicaset.apps/supergloo-688ff566          1         1         1       3m53s
```
## 使用 Helm 安装 SuperGloo

将 SuperGloo Helm 图表添加到本地 Helm 安装中。

```sh
$ helm repo add supergloo http://storage.googleapis.com/supergloo-helm
```

你可以通过运行以下命令来检查 SuperGloo 的可用版本

```sh
$ helm search supergloo/supergloo --versions
```

## 卸载

要卸载 SuperGloo 和所有相关组件，只需运行以下命令：

```sh
$ supergloo init --dry-run | kubectl delete --filename -
```

如果你将 SuperGloo 安装到其他名称空间，则必须使用 `--namespace` 选项指定该名称空间：

```sh
$ supergloo init --dry-run --namespace my-namespace | kubectl delete --filename -
```

## 安装服务网格

### 安装 Istio

（略）

### 安装 Linkerd

Linkerd 拥有简单，专注的用户体验。
随着他们继续扩展其功能集，用户将需要一致的 API 来安装和管理 Linkerd 网格。

在本节中，我们将了解 SuperGloo 如何统一 Linkerd 服务网格的安装和管理，类似于其他支持的网格。

#### 通过 SuperGloo 安装 Linkerd

首先，确保通过 supergloo init 或 Supergloo Helm Chart 在你的 kubernetes 集群中初始化 SuperGloo。
有关安装 SuperGloo 的详细说明，请参阅安装说明。

否则：

当 kubernetes 集群没有正常启动的时候，执行：`supergloo install linkerd --name linkerd`，将报错：
```sh
"Mon, 10 Jun 2019 18:05:25 CST: github.com/solo-io/supergloo/cli/pkg/helpers/clients/kubernetes.go:68"	failed to create install client: &errors.withStack{
	...
```

一旦安装了 SuperGloo，我们将创建一个带有配置参数的 Install CRD，然后触发 SuperGloo 开始网格安装。

这可以通过以下两种方式之一完成：

选项1：通过 `supergloo` CLI：
```sh
$ supergloo install linkerd --name linkerd
```

有关 linkerd 的完整安装选项列表，请参阅 `supergloo install linkerd --help`。

选项2：在 yaml 文件上使用 `kubectl apply`：

```yaml
cat <<EOF | kubectl apply --filename -
apiVersion: supergloo.solo.io/v1
kind: Install
metadata:
  name: linkerd
spec:
  installationNamespace: linkerd
  mesh:
    linkerdMesh:
      enableAutoInject: true
      enableMtls: true
      linkerdVersion: stable-2.3.0
EOF
```

创建安装 CRD 后，你可以跟踪链接器安装的进度：

```sh
$ kubectl --namespace linkerd get pod --watch

NAME                                      READY   STATUS            RESTARTS   AGE
linkerd-controller-77df4bdffb-vjs8w       0/4     PodInitializing   0          119s
linkerd-grafana-f64c55c5-llkvb            0/2     PodInitializing   0          119s
linkerd-identity-5c4df8fb5d-blqk8         0/2     PodInitializing   0          118s
linkerd-prometheus-648f7b5bd7-xgwt7       0/2     PodInitializing   0          119s
linkerd-proxy-injector-79f6595746-mmk7j   0/2     PodInitializing   0          118s
linkerd-sp-validator-88d47b74c-c4gqc      0/2     PodInitializing   0          119s
linkerd-web-7c475f76cb-f7k46              0/2     PodInitializing   0          118s
...
```

从这个演示中撕下一切：

```sh
$ kubectl --namespace default delete --filename https://raw.githubusercontent.com/istio/istio/1.0.6/samples/bookinfo/platform/kube/bookinfo.yaml
$ kubectl delete namespace not-injected
```

### 卸载 Linkerd

两种方法：

1. `supergloo uninstall --name linkerd`;
2. `kubectl edit install linkerd` 设置 `spec.disabled: true`;

```yaml
# Please edit the object below. Lines beginning with a '#' will be ignored,
# and an empty file will abort the edit. If an error occurs while saving this file will be
# reopened with the relevant failures.
#
apiVersion: supergloo.solo.io/v1
kind: Install
metadata:
  name: linkerd
  namespace: supergloo-system
spec:
   ## add the following line
   disabled: true
   ##
   installationNamespace: linkerd
   mesh:
     installedMesh:
       name: linkerd
       namespace: supergloo-system
     linkerdMesh:
       enableAutoInject: true
       enableMtls: true
       linkerdVersion: stable-2.3.0
```

### 注册 AWS App 网格
(略)

### 网格发现
(略)

## 参考资料

1. https://supergloo.solo.io/installation/

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。


