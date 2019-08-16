---
title: '使用 redis_exporter + Prometheus + Grafana 进行 Redis 的统计监控'
keywords: redis, monitor, prometheus, grafana
date: 2019-08-16T10:00:00+08:00
lastmod: 2019-08-16T10:00:00+08:00
draft: false
description: '使用 redis_exporter + Prometheus + Grafana 进行 Redis 的统计监控'
categories: [redis]
tags: [redis, monitor, prometheus, grafana]
comments: true
author: mai
---

## Redis 统计

- redis-stat
- RedisLive
- redis_exporter

## redis_exporter

Go 开发的基于 Prometheus 的数据格式统计，可方便的展现在 Grafana 上。

### 操作步骤

```sh
-rw-r--r--  1 root root   59 Aug 15 23:20 grafana_start.sh
-rw-r--r--  1 root root   41 Aug 15 23:37 grafana_stop.sh
-rw-r--r--  1 root root  273 Aug 15 23:47 prometheus.yml
-rw-r--r--  1 root root  185 Aug 15 23:19 prometheus_start.sh
-rw-r--r--  1 root root   37 Aug 15 23:37 prometheus_stop.sh
-rw-r--r--  1 root root  126 Aug 15 23:19 redis_exporter_start.sh
-rw-r--r--  1 root root   55 Aug 15 23:38 redis_exporter_stop.sh
```

redis_exporter_stat.sh

```sh
docker run -d --network=daycam_prod --name redis_exporter -p 9121:9121 oliver006/redis_exporter --redis.addr=172.18.0.5:6379
```

prometheus_stat.sh

```sh
docker run -d --network=daycam_prod --name prome -p 9090:9090 -v /data/redis_monitor/prometheus.yml:/tmp/prometheus.yml quay.io/prometheus/prometheus --config.file=/tmp/prometheus.yml
```

prometheus.yml

```yaml
global:
  scrape_interval: 5s
  evaluation_interval: 5s
scrape_configs:
  - job_name: 'redis_exporter_targets'
    static_configs:
      - targets:
        - localhost:9090

  - job_name: 'redis_exporter'
    static_configs:
      - targets:
        - 172.18.0.3:9121
```

grafana_start.sh

```sh
docker run -d --name=grafana -p 3000:3000 grafana/grafana
```

是不是超级简单？
(注：以上均为试验配置，生产环境慎用！！！)

## 可能的问题

1. docker 网络组不同的问题；
2. prometheus 配置的问题；
3. redis_exporter 无法连接上 redis 的问题；

## 参考资料

1. [Grafana 监控图的配置 JSON](https://grafana.com/grafana/dashboards/763)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)
