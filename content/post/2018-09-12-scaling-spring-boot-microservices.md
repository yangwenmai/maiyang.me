---
title: '[译]使用 Horizo​​ntal Pod Autoscaler 自动缩放 Spring Boot 并在 Kubernetes 上自定义度量标准'
keywords: golang, kubernetes, hpa, SpringBoot
date: 2018-09-12T06:00:00+08:00
lastmod: 2018-09-12T06:00:00+08:00
draft: false
description: '使用 Horizo​​ntal Pod Autoscaler 自动缩放 Spring Boot 并在 Kubernetes 上自定义度量标准'
categories: [golang]
tags: [golang, kubernetes, hpa, SpringBoot]
comments: true
author: mai
---

这是一篇翻译+自我理解实践。

----

## 使用消息队列，Spring Boot 和 Kubernetes 伸缩微服务

![](https://learnk8s.io/blog/scaling-spring-boot-microservices/autoscaling.png)

当你设计和构建应用程序时，你将面临两个重大挑战：**可伸缩性和健壮性（scalability and robustness）**。

您应该设计您的服务，即使它受到间歇性很大的负载，它仍然可靠地运行。

*以Apple Store为例*

每年都有数百万 Apple 客户预先注册购买新的 iPhone。这是数百万人同时购买物品。

如果您将 Apple 商店的流量描述为每秒请求数，那么这就是图形的样子：

现在想象一下，你的任务是构建这样的应用程序。

您正在建立一个商店，用户可以在那里购买自己喜欢的商品。
您构建了一个微服务来呈现网页并提供静态资产。
您还构建了一个后端 REST API 来处理传入的请求。
您希望将两个组件分开，因为使用相同的 REST API 可以为网站和移动应用程序提供服务。

今天是很重要的一天，你的商店上线了。

您决定将应用程序扩展为前端的四个实例和后端的四个实例，因为您预测网站比平常更大压力。

您开始接收越来越多的流量，前端服务正在处理流量。
您注意到连接到数据库的后端正在努力跟上事务的数量。
不用担心，您可以将后端的副本数量扩展为8。

您收到了越来越多的流量，后端无法应对。一些服务开始丢弃连接。愤怒的客户与您的客户服务取得联系。现在你正在处理流量。你的后端无法应付它，它会失去很多连接。

你将损失一大笔钱，并且你的用户也不高兴。
您的应用程序并非设计为健壮且高度可用：

- 前端和后端紧密耦合 - *实际上它不能在没有后端的情况下处理应用程序*
- 前端和后端必须一致扩展 - *如果没有足够的后端，你可能会被淹没在流量中*
- 如果后端不可用，则无法处理传入的事务。

失去了交易也就是收入受损了。

您可以重新设计体系结构，以便将前端和后端与队列分离。

前端将消息发布到队列，而后端则一次处理一个待处理消息。

新架构有一些明显的好处：

- 如果后端不可用，则队列充当缓冲区
- 如果前端产生的消息多于后端可以处理的消息，则这些消息将缓冲在队列中
- 您可以独立于前端扩展后端 - 即您可以拥有数百个前端服务和后端的单个实例

太好了，但是你如何构建这样的应用程序？

您如何设计可处理数十万个请求的服务？
您如何部署动态扩展的应用程序？
在深入了解部署和扩展的细节之前，让我们关注应用程序。

### 编写Spring应用程序

该服务有三个组件：前端，后端和消息代理。

前端是一个简单的Spring Boot Web应用程序，带有Thymeleaf模板引擎。

后端是一个消耗队列消息的工作者。
由于Spring Boot与JMS的集成非常好，因此您可以使用它来发送和接收异步消息。
您可以在 learnk8s/spring-boot-k8s-hpa 中找到一个带有连接到 JMS 的前端和后端应用程序的示例项目。

>请注意，该应用程序是用Java 10编写的，以利用改进的Docker容器集成。

只有一个代码库，您可以将项目配置为作为前端或后端运行。
您应该知道该应用程序具有：

- 你可以购买物品的主页
- 管理面板，您可以在其中检查队列中的消息数
- 一个 /health 端点，用于在应用程序准备好接收流量时发出信号
- 一个 /submit 端点，从表单接收提交并在队列中创建消息
- 一个 /metrics 端点，用于公开队列中待处理消息的数量（稍后将详细介绍）

该应用程序可以在两种模式下运行：

作为前端，应用程序呈现人们可以购买物品的网页。

![](https://learnk8s.io/blog/scaling-spring-boot-microservices/store.png)

作为工作者，应用程序等待队列中的消息并处理它们。

![](https://learnk8s.io/blog/scaling-spring-boot-microservices/admin.png)
 
>请注意，在示例项目中，使用 `Thread.sleep(5000)` 等待五秒钟来模拟处理。

您可以通过更改 `application.yaml` 中的值来在任一模式下配置应用程序。

### 纯粹的运行应用程序

默认情况下，应用程序作为前端和工作程序启动。

您可以运行该应用程序，只要您在本地运行 ActiveMQ 实例，您就应该能够购买物品并让系统处理这些物品。

![](https://learnk8s.io/blog/scaling-spring-boot-microservices/demo.gif)

如果您检查日志，您应该看到工作人员处理项目。

正常！

编写Spring Boot应用程序很容易。

一个更有趣的主题是学习如何将Spring Boot连接到消息代理。

### 使用JMS发送和接收消息

Spring JMS（Java消息服务）是一种使用标准协议发送和接收消息的强大机制。

如果您以前使用过 JDBC API，那么您应该熟悉 JMS API，因为它的工作方式类似。

您可以使用 JMS 使用的最流行的消息代理是 [ActiveMQ](http://activemq.apache.org/) - 一个开源消息服务器。

使用这两个组件，您可以使用熟悉的接口（JMS）将消息发布到队列（ActiveMQ），并使用相同的接口来接收消息。

更妙的是，Spring Boot与JMS完美集成，因此您可以立即加速。
实际上，以下短类封装了用于与队列交互的逻辑：

```java
@Component
public class QueueService implements MessageListener {
  private static final Logger LOGGER = LoggerFactory.getLogger(QueueService.class);

  @Autowired
  private JmsTemplate jmsTemplate;

  public void send(String destination, String message) {
    LOGGER.info("sending message='{}' to destination='{}'", message, destination);
    jmsTemplate.convertAndSend(destination, message);
  }

  @Override
  public void onMessage(Message message) {
    if (message instanceof ActiveMQTextMessage) {
      ActiveMQTextMessage textMessage = (ActiveMQTextMessage) message;
      try {
        LOGGER.info("Processing task " + textMessage.getText());
        Thread.sleep(5000);
        LOGGER.info("Completed task " + textMessage.getText());
      } catch (InterruptedException e) {
        e.printStackTrace();
      } catch (JMSException e) {
        e.printStackTrace();
      }
    } else {
      LOGGER.error("Message is not a text message " + message.toString());
    }
  }
}
```

您可以使用 `send` 方法将消息发布到命名队列。

此外，Spring Boot将为每个传入消息执行 `onMessage` 方法。

最后一个难题是指示Spring Boot使用该类。
您可以通过在Spring Boot应用程序中[注册侦听器来在后台处理消息](https://docs.spring.io/spring/docs/current/spring-framework-reference/integration.html#jms-annotated-programmatic-registration)，如下所示：

```java
@SpringBootApplication
@EnableJms
public class SpringBootApplication implements JmsListenerConfigurer {
  @Autowired
  private QueueService queueService;

  public static void main(String[] args) {
    SpringApplication.run(SpringBootApplication.class, args);
  }

  @Override
  public void configureJmsListeners(JmsListenerEndpointRegistrar registrar) {
    SimpleJmsListenerEndpoint endpoint = new SimpleJmsListenerEndpoint();
    endpoint.setId("myId");
    endpoint.setDestination("queueName");
    endpoint.setMessageListener(queueService);
    registrar.registerEndpoint(endpoint);
  }
}
```

其中id是使用者的唯一标识符，destination是队列的名称。
您可以从Github上的项目中完整地[读取Spring队列服务的源代码](https://github.com/learnk8s/spring-boot-k8s-hpa/blob/master/src/main/java/com/learnk8s/app/queue/QueueService.java)。

请注意您是如何在少于40行代码中编写可靠队列的。

你必须喜欢Spring Boot。

### 您在部署时节省的所有时间都可以专注于编码

您已经验证了应用程序的工作原理，现在是时候部署它了。

此时，您可以启动VPS，安装Tomcat，花些时间制作自定义脚本来测试，构建，打包和部署应用程序。

或者您可以编写一个您希望拥有的描述：一个消息代理和两个部署了负载均衡器的应用程序。

诸如Kubernetes之类的协调员可以阅读您的愿望清单并提供正确的基础设施。
由于花在基础架构上的时间减少意味着更多的时间编码，这次你将把应用程序部署到Kubernetes。

但在开始之前，您需要一个Kubernetes集群。

您可以注册 Google Cloud Platform 或 Azure 并使用云提供商 Kubernetes 产品。
或者，您可以在将应用程序移动到云之前在本地尝试Kubernetes。

minikube是一个打包为虚拟机的本地Kubernetes集群。

如果您使用的是Windows，Linux和Mac，那就太好了，因为创建群集需要五分钟。

您还应该安装kubectl，即连接到群集的客户端。
您可以从官方文档中找到有关如何安装minikube和kubectl的说明。

>如果您在Windows上运行，则应查看有关如何安装Kubernetes和Docker的详细指南。

您应该启动一个具有8GB RAM和一些额外配置的集群：

```sh
minikube start \
  --memory 4096 \
  --extra-config=controller-manager.horizontal-pod-autoscaler-upscale-delay=1m \
  --extra-config=controller-manager.horizontal-pod-autoscaler-downscale-delay=2m \
  --extra-config=controller-manager.horizontal-pod-autoscaler-sync-period=10s
```

>如果你正在使用已经存在的 minikube 实例，则可以通过销毁 VM 来重新调整 VM 的大小。只需添加 `--memory 4096` 就不会有任何影响。

您应该使用以下命令验证安装是否成功：

```sh
kubectl get all
```
您应该看到一些资源列为表格。

集群已经准备就绪，也许您应该立即开始部​​署？

不是。

你必须先装好你的东西。

你应该安装 `jq` - 一个轻量级且灵活的命令行 JSON 处理器。
你可以在官方网站上找到[更多关于jq的信息](https://github.com/stedolan/jq)。

### 什么比uber-jar更好？容器

部署到Kubernetes的应用程序必须打包为容器。

毕竟，Kubernetes是一个容器协调器，所以它本身无法运行你的jar。
容器类似于fat jar：它们包含运行应用程序所需的所有依赖项。

*甚至JVM也是容器的一部分。*

所以他们在技术上是一个更胖的fat jar。

将应用程序打包为容器的流行技术是Docker。

>虽然最受欢迎，但Docker并不是唯一能够运行容器的技术。
>其他受欢迎的选项包括 `rkt` 和 `lxd`。

如果您没有安装Docker，可以按照Docker官方网站上的说明进行操作。
通常，您构建容器并将其推送到仓库中。

它类似于向Artifactory或Nexus发布 jar。

但在这种特殊情况下，您将在本地工作并跳过仓库部分。

实际上，您将直接在minikube中创建容器镜像。

首先，按照此命令打印的指令将Docker客户端连接到minikube：

```sh
minikube docker-env
```

>请注意，如果切换终端，则需要重新连接minikube内的Docker守护程序。
每次使用不同的终端时都应遵循相同的说明。

并从项目的根目录构建容器镜像：

```sh
docker build -t spring-k8s-hpa .
```

您可以验证镜像是否已构建并准备好运行：

```sh
docker images | grep spring
```

非常好！

群集已准备好，您打包应用程序，也许您已准备好立即部署？
是的，您最终可以要求Kubernetes部署应用程序。

### 将您的应用程序部署到Kubernetes

您的应用程序有三个组件：

- 呈现前端的Spring Boot应用程序
- ActiveMQ作为消息代理
- 处理事务的Spring Boot后端

您应该单独部署这三个组件。

对于他们每个人你应该创建：

- 一个Deployment对象，描述部署的容器及其配置
- 一个Service对象，充当Deployment部署创建的应用程序的所有实例的负载均衡器

部署中的每个应用程序实例都称为Pod。

![](./blog/scaling-spring-boot-microservices-05.png)

### 部署ActiveMQ

让我们从ActiveMQ开始吧。

您应该创建一个 `activemq-deployment.yaml` 文件，其中包含以下内容：

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: queue
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: queue
    spec:
      containers:
      - name: web
        image: webcenter/activemq:5.14.3
        imagePullPolicy: IfNotPresent
        ports:
          - containerPort: 61616
        resources:
          limits:
            memory: 512Mi
```

该模板冗长但直接易读：

- 您从名为 [webcenter/activemq](https://hub.docker.com/r/webcenter/activemq/) 的官方仓库中请求了一个 activemq 容器
- 容器在端口61616上公开消息代理
- 为容器分配了512MB的内存
- 你要了一个副本 - 你的应用程序的一个实例

使用以下内容创建 `activemq-service.yaml` 文件：

```yaml
apiVersion: v1
kind: Service
metadata:
  name: queue
spec:
  ports:
  - port: 61616
    targetPort: 61616
  selector:
    app: queue
```

幸运的是，这个模板更短！

yaml读取：

- 您创建了一个公开端口61616的负载均衡器
- 传入流量分发到所有具有 `app:queue` 类型标签的Pod（请参阅上面的部署）
- targetPort是Pod公开的端口

您可以使用以下命令创建资源：

```sh
kubectl create -f activemq-deployment.yaml
kubectl create -f activemq-service.yaml
```

您可以使用以下命令验证数据库的一个实例是否正在运行：

```sh
kubectl get pods -l=app=queue
```

### 部署前端

使用以下内容创建 `fe-deployment.yaml` 文件：

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: frontend
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: spring-boot-hpa
        imagePullPolicy: IfNotPresent
        env:
        - name: ACTIVEMQ_BROKER_URL
          value: "tcp://queue:61616"
        - name: STORE_ENABLED
          value: "true"
        - name: WORKER_ENABLED
          value: "false"
        ports:
          - containerPort: 8080
        livenessProbe:
          initialDelaySeconds: 5
          periodSeconds: 5
          httpGet:
            path: /health
            port: 8080
        resources:
          limits:
            memory: 512Mi
```

Deployment 看起来很像前一个。

但是有一些新的 fields：

- 有一个部分可以注入环境变量
- 有活动探测器，可以告诉您应用程序何时可以接受流量

使用以下内容创建 `fe-service.yaml` 文件：

```yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend
spec:
  ports:
  - nodePort: 32000
    port: 80
    targetPort: 8080
  selector:
    app: frontend
  type: NodePort
```

您可以使用以下命令创建资源：

```sh
kubectl create -f fe-deployment.yaml
kubectl create -f fe-service.yaml
```

您可以使用以下命令验证前端应用程序的一个实例是否正在运行：

```sh
kubectl get pods -l=app=fe
```

### 部署后端

使用以下内容创建 `backend-deployment.yaml` 文件：

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: backend
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: backend
      annotations:
        prometheus.io/scrape: 'true'
    spec:
      containers:
      - name: backend
        image: spring-boot-hpa
        imagePullPolicy: IfNotPresent
        env:
        - name: ACTIVEMQ_BROKER_URL
          value: "tcp://queue:61616"
        - name: STORE_ENABLED
          value: "false"
        - name: WORKER_ENABLED
          value: "true"
        ports:
          - containerPort: 8080
        livenessProbe:
          initialDelaySeconds: 5
          periodSeconds: 5
          httpGet:
            path: /health
            port: 8080
        resources:
          limits:
            memory: 512Mi
```

使用以下内容创建 `backend-service.yaml` 文件：

```yaml
apiVersion: v1
kind: Service
metadata:
  name: backend
spec:
  ports:
  - nodePort: 31000
    port: 80
    targetPort: 8080
  selector:
    app: backend
  type: NodePort
```

您可以使用以下命令创建资源：

```sh
kubectl create -f backend-deployment.yaml
kubectl create -f backend-service.yaml
```

您可以验证后端的一个实例是否正在运行：

```sh
kubectl get pods -l=app=backend
```

部署完成。
它真的有效吗？

您可以使用以下命令在浏览器中访问该应用程序：

```sh
minikube service backend
```

和

```sh
minikube service frontend
```

如果它有效，你应该尝试购买一些物品！
*工人处理交易吗？*

是的，如果有足够的时间，工作人员将处理所有待处理的消息。

恭喜你！

您刚刚将应用程序部署到Kubernetes！


### 手动伸缩以满足不断增长的需求

单个工作人员可能无法处理大量消息。

实际上，它当时只能处理一条消息。

如果您决定购买数千件物品，则需要数小时才能清除队列。

此时您有两种选择：

- 你可以手动扩容和缩容
- 您可以创建自动缩放规则以自动向上或向下扩容

让我们先从基础知识开始。

您可以使用以下方法将后端扩展为三个实例：

```sh
kubectl scale --replicas=5 deployment/backend
```

您可以验证Kubernetes是否创建了另外五个实例：

```sh
kubectl get pods
```

并且应用程序可以处理五倍以上的消息。

一旦工人排空队列，您可以缩小：

```sh
kubectl scale --replicas=1 deployment/backend
```

如果您知道最多的流量何时达到您的服务，手动扩大和缩小都很棒。

如果不这样做，设置自动缩放器允许应用程序自动缩放而无需手动干预。

您只需要定义一些规则。

### 公开应用程序指标

Kubernetes如何知道何时扩展您的申请？

很简单，你必须告诉它。

自动调节器通过监控指标来工作。

只有这样，它才能增加或减少应用程序的实例。

因此，您可以将队列的长度公开为度量标准，并要求 autoscaler 观察该值。

>启用自动缩放器后，队列中的待处理消息越多，Kubernetes将创建的应用程序实例就越多。

那么你如何公开这些指标呢？

应用程序具有 `/metrics` 端点以显示队列中的消息数。

如果您尝试访问该页面，您会注意到以下内容：

```sh
# HELP messages Number of messages in the queue
# TYPE messages gauge
messages 0
```

应用程序不会将指标公开为 JSON 格式。

格式为纯文本，是公开 [Prometheus 指标](https://prometheus.io/docs/concepts/metric_types/)的标准。

不要担心记忆格式。

大多数情况下，您将使用其中一个 [Prometheus客户端库](https://prometheus.io/docs/instrumenting/clientlibs/)。

### 在Kubernetes中使用应用程序指标

你几乎准备好自动缩放; 您应该首先安装指标服务器。

事实上，默认情况下，Kubernetes不会从您的应用程序中提取指标。

如果您愿意，您应该启用Custom Metrics API。

要安装Custom Metrics API，您还需要Prometheus - 时间序列数据库。

安装Custom Metrics API所需的所有文件都可以方便地打包在 [learnk8s/spring-boot-k8s-hpa](https://github.com/learnk8s/spring-boot-k8s-hpa) 中。

您应下载该存储库的内容，并将当前目录更改为该项目的 `monitoring` 文件夹中。

### 安装自定义 Metrics API

确保你在 `monitoring` 文件夹下：

```sh
cd monitoring
```

在 `kube-system` 命名空间中部署 Metrics Server：

```sh
kubectl create -f ./metrics-server
```

一分钟后，metrics-server 开始上报节点和 pod 的 CPU 和内存使用情况。

查看节点 metrics：

```sh
kubectl get --raw "/apis/metrics.k8s.io/v1beta1/nodes" | jq .
```

查看 pod metrics：

```sh
kubectl get --raw "/apis/metrics.k8s.io/v1beta1/pods" | jq .
```

创建监控命名空间：

```sh
kubectl create -f ./namespaces.yaml
```

在监控命名空间中部署Prometheus v2：

```sh
kubectl create -f ./prometheus
```

部署 Prometheus 自定义 metrics API 适配器：

```sh
kubectl create -f ./custom-metrics-api
```

列出 Prometheus 提供的自定义 metrics：

```sh
kubectl get --raw "/apis/custom.metrics.k8s.io/v1beta1" | jq .
```

获取监控命名空间中所有 pod 的 FS 使用情况：

```sh
kubectl get --raw "/apis/custom.metrics.k8s.io/v1beta1/namespaces/monitoring/pods/*/fs_usage_bytes" | jq .
```

任务完成！

您已准备好使用指标。

实际上，您应该已经找到了队列中消息数量的自定义指标：

```sh
kubectl get --raw "/apis/custom.metrics.k8s.io/v1beta1/namespaces/default/pods/*/messages" | jq .
```

恭喜，您有一个公开指标的应用程序和使用它们的指标服务器。

您最终可以启用自动缩放器！

----
这里需要调整一下

### 打包应用程序

你将应用程序打包为容器：

```sh
eval $(minikube docker-env)
docker build -t spring-boot-hpa .
```

### 部署应用程序

使用以下命令在 Kubernetes 中部署应用程序：

```sh
kubectl create -f kube/deployment.yaml
```

这里需要调整一下

----

### 在Kubernetes中自动扩展部署

Kubernetes有一个名为 Horizo​​ntal Pod Autoscaler 的对象，用于监视部署并上下调整Pod的数量。

您将需要其中一个来自动扩展实例。

您应该创建一个包含以下内容的 `hpa.yaml` 文件：

```yaml
apiVersion: autoscaling/v2beta1
kind: HorizontalPodAutoscaler
metadata:
  name: spring-boot-hpa
spec:
  scaleTargetRef:
    apiVersion: extensions/v1beta1
    kind: Deployment
    name: backend
  minReplicas: 1
  maxReplicas: 10
  metrics:
  - type: Pods
    pods:
      metricName: messages
      targetAverageValue: 10
```

该文件含糊不清，让我为您翻译：

Kubernetes监视scaleTargetRef中指定的部署。在这种情况下，它是工人。
您正在使用消息指标来扩展您的Pod。当队列中有超过十条消息时，Kubernetes将触发自动扩展。
至少，部署应该有两个Pod。 Ten Pods是上限。
您可以使用以下命令创建资源：

```sh
kubectl create -f hpa.yaml
```

提交自动缩放器后，您应该注意到后端的副本数量是两个：

```sh
kubectl get pods
```

这是有道理的，因为您要求自动缩放器始终至少运行两个副本。

您可以检查触发自动缩放器的条件以及由此产生的事件：

```sh
kubectl describe hpa
```

自动定标器建议它能够将Pod扩展到2，并且它已准备好监视部署。

令人兴奋的东西，但它有效吗？

### 负载测试

只有一种方法可以知道它是否有效：在队列中创建大量消息。

转到前端应用程序并开始添加大量消息。

```sh
while true; do sleep 0.5; curl -d "quantity=1" http://<minikube ip>:32000/submit; done
```

在添加消息时，使用以下方法监视 Horizontal Pod Autoscaler 的状态：

```sh
kubectl describe hpa
```

Pod的数量从2上升到4，然后是8，最后是10。

该应用程序随消息数量而变化！

欢呼！

您刚刚部署了一个完全可伸缩的应用程序，该应用程序可根据队列中待处理消息的数量进

另外，缩放算法如下：

```
MAX(CURRENT_REPLICAS_LENGTH * 2,4)
```

在解释算法时，文档没有多大帮助。您可以在代码中找到详细信息。

此外，每分钟都会重新评估每个放大，而每两分钟缩小一次。

以上所有都是可以调整的设置。

但是你还没有完成。

### 什么比自动缩放实例更好？ 自动缩放集群

跨节点扩展Pod非常有效。

但是，如果集群中没有足够的容量来扩展Pod，该怎么办？

如果您在群集中达到峰值容量，Kubernetes将使Pod处于挂起状态并等待更多资源可用。

如果您可以使用类似于 Horizontal Pod 自动缩放器的自动缩放器，但对于节点则会很棒。

好消息！

您可以拥有一个群集自动缩放器，可以在需要更多资源时为 Kubernetes 群集添加更多节点。

集群自动定标器有不同的形状和大小。

它也是特定于云提供商的。

请注意，您将无法使用 minikube 测试自动缩放器，因为它根据定义是单节点。

您可以在Github上找到有关集群自动调节器和云提供程序实现的更多信息。

### 总结

大规模设计应用程序需要仔细规划和测试。

基于队列的体系结构是一种出色的设计模式，可以解耦您的微服务并确保它们可以独立扩展和部署。

虽然您可以推出部署脚本，但利用Kubernetes等容器协调器可以更轻松地自动部署和扩展应用程序。

### 这就是所有！

感谢Nathan Cashmore和Andy Griffiths的反馈！

如果您喜欢这篇文章，您可能会发现有趣的阅读：

3个简单的技巧，用于较小的Docker镜像，并学习如何更快地构建和部署Docker镜像。
Kubernetes Chaos Engineering：经验教训 - 第1部分Kubernetes出现问题时会发生什么？ Kubernetes可以从失败和自愈中恢复吗？

----

## 参考资料

1. [https://learnk8s.io/blog/scaling-spring-boot-microservices](https://learnk8s.io/blog/scaling-spring-boot-microservices)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)
