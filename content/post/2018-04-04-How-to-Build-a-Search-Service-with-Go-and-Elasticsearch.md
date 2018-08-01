---
layout: post
title: '基于 Go 和 Elasticsearch 构建一个搜索服务'
keywords: Golang, Elasticsearch
date: 2018-04-03 06:50:00
description: '基于 Go 和 Elasticsearch 构建一个搜索服务'
categories: [Golang]
tags: [Golang, Elasticsearch]
comments: true
author: mai
---

    这篇文章是一篇基于 Go 和 Elasticsearch 构建一个搜索服务的实践文章。

----

![](https://outcrawl.com/static/cover-0d8bc609bad3bae72b0b56054d496705-af52c.jpg)

本文介绍如何基于 [Go](http://golang.org) 和 [Elasticsearch](https://www.elastic.co/) 构建简单的搜索服务，该服务将在本地 [Docker](https://www.docker.com/) 机器中运行一个 Elasticsearch 实例。如果你只对源代码感兴趣，你可以在 [GitHub](https://github.com/tinrab/go-elasticsearch-example) 上找到它。

## 入门

如果你还没有安装 [Docker](https://docs.docker.com/install/)，[Go](https://golang.org/doc/install) 和 [golang/dep](https://github.com/golang/dep)-一个依赖管理工具，那你就点击链接按照步骤进行操作吧。

在 $GOPATH 中为你的项目创建一个目录。

## 配置服务

创建如下内容的 `docker-compose.yaml` 文件：

```yaml
version: '3.5'
services:
  search_api:
    container_name: 'search_api'
    build: './search-api'
    restart: 'on-failure'
    ports:
      - '8080:8080'
    depends_on:
      - elasticsearch
  elasticsearch:
    container_name: 'elasticsearch'
    image: 'docker.elastic.co/elasticsearch/elasticsearch:6.2.3'
    ports:
      - '9200:9200'
```

我们定义了两个服务：search_api 和 elasticsearch 。

search_api 服务是在端口 8080 上托管我们的应用程序，而 elasticsearch 是运行在官方的 Elasticsearch Docker 镜像上，服务端口是 9200 。

<!--more-->

接下来，咱们首先先来创建一个 `search-api` 子目录并且用 `dep` 来初始化这个项目。

```shell
$ mkdir search-api
$ cd search-api
$ dep init
```

在 serch-api 目录下给 search_api 服务写一个 Dockerfile 文件。

```yaml
FROM golang:1.10.0

RUN adduser --disabled-password --gecos '' api
USER api

WORKDIR /go/src/app
COPY . .

RUN go install -v ./...

CMD [ "app" ]
```

## 连接到 Elasticsearch

在 `search-api` 目录下创建一个入口文件 `main.go`。

```go
package main

import (
  "encoding/json"
  "fmt"
  "log"
  "net/http"
  "strconv"
  "time"

  "github.com/gin-gonic/gin"
  "github.com/olivere/elastic"
  "github.com/teris-io/shortid"
)

// 定义 Elasticsearch 索引和类型名字.
// 索引是具有不同类型的文档的集合，这个例子只定义了一个叫做 document 的类型。
const (
  elasticIndexName = "documents"
  elasticTypeName  = "document"
)

// Document 声明要建立索引的文档的主要结构。
type Document struct {
  ID        string    `json:"id"`
  Title     string    `json:"title"`
  CreatedAt time.Time `json:"created_at"`
  Content   string    `json:"content"`
}

// elasticsearch 客户端
var (
  elasticClient *elastic.Client
)

func main() {
  var err error
  for {
    elasticClient, err = elastic.NewClient(
      elastic.SetURL("http://elasticsearch:9200"),
      elastic.SetSniff(false),
    )
    if err != nil {
      log.Println(err)
      time.Sleep(3 * time.Second)
    } else {
      break
    }
  }
  // ...
}
```

Elasticsearch 必须知道如何处理文档的字段以及它们代表的是什么数据。这可以通过手动定义一个[映射](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html)来完成，或者像本文中使用的那样，通过[动态映射](https://www.elastic.co/guide/en/elasticsearch/reference/current/dynamic-mapping.html)将其留给 Elasticsearch。

启动 Docker 容器有准备连接的服务之间存在时间差。因此，代码逻辑是假如最初失败的话，则每隔 3 秒会重新再尝试连接一次 elasticsearch 服务。

解决这个问题的另一种方法是编写一个简单的 bash 脚本，它可以 "pings" 一些服务，直到准备好，然后运行你的应用程序。你可以将 CMD 指令的值更改为你的 bash 脚本。

## 插入文件

在你搜索他们之前，你需要一种方式去创建文档。

在 `main` 函数内使用 *gin-gonic/gin* 框架运行 **HTTP** 服务器。将 `/documents` 端点映射到 `createDocumentsEndpoint` 处理函数。

```go
r := gin.Default()
r.POST("/documents", createDocumentsEndpoint)
if err = r.Run(":8080"); err != nil {
  log.Fatal(err)
}
```

在请求体中声明一个结构体来代表一个简单的文档。

```go
// DocumentRequest 文档请求体
type DocumentRequest struct {
  Title   string `json:"title"`
  Content string `json:"content"`
}
```

给错误响应封装一个帮助函数。

```go
func errorResponse(c *gin.Context, code int, err string) {
  c.JSON(code, gin.H{
    "error": err,
  })
}
```

声明 `createDocumentsEndpoint` 处理函数，然后从请求体中读文档到一个数组。

```go
func createDocumentsEndpoint(c *gin.Context) {
  var docs []DocumentRequest
  if err := c.BindJSON(&docs); err != nil {
    errorResponse(c, http.StatusBadRequest, "Malformed request body")
    return
  }
  // ...
}
```

设置一个唯一 ID 和每个文档的创建时间，然后把他们用 [bulk](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html) 操作插入到 Elasticsearch 。

```go
bulk := elasticClient.
  Bulk().
  Index(elasticIndexName).
  Type(elasticTypeName)
for _, d := range docs {
  doc := Document{
    ID:        shortid.MustGenerate(),
    Title:     d.Title,
    CreatedAt: time.Now().UTC(),
    Content:   d.Content,
  }
  bulk.Add(elastic.NewBulkIndexRequest().Id(doc.ID).Doc(doc))
}
if _, err := bulk.Do(c.Request.Context()); err != nil {
  log.Println(err)
  errorResponse(c, http.StatusInternalServerError, "Failed to create documents")
  return
}
c.Status(http.StatusOK)
```

## 搜索

注册一个新的 `/search` 端点到 `main` 函数中。

```go
r := gin.Default()
r.POST("/documents", createDocumentsEndpoint)
r.GET("/search", searchEndpoint)
if err = r.Run(":8080"); err != nil {
  log.Fatal(err)
}
```

写 `searchEndpoint` 处理函数，并且解析必需的参数。
参数 skip 和 take 用于限制返回文档的数量并启用基本分页。

```go
func searchEndpoint(c *gin.Context) {
  // Parse request
  query := c.Query("query")
  if query == "" {
    errorResponse(c, http.StatusBadRequest, "Query not specified")
    return
  }
  skip := 0
  take := 10
  if i, err := strconv.Atoi(c.Query("skip")); err == nil {
    skip = i
  }
  if i, err := strconv.Atoi(c.Query("take")); err == nil {
    take = i
  }
  // ...
}
```

然后对 `title` 和 `content` 执行多重匹配查询。在这里，参数 `minimum_should_match` 和 `fuzziness` 被设置为一些“魔术”数字。请[参阅文档](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html)以查看其他可能的设置。

```go
esQuery := elastic.NewMultiMatchQuery(query, "title", "content").
  Fuzziness("2").
  MinimumShouldMatch("2")
result, err := elasticClient.Search().
  Index(elasticIndexName).
  Query(esQuery).
  From(skip).Size(take).
  Do(c.Request.Context())
if err != nil {
  log.Println(err)
  errorResponse(c, http.StatusInternalServerError, "Something went wrong")
  return
}
// ...
```

最后，创建一个响应对象，其中包含命中总数，以毫秒为单位的时间以及由 skip 和 take 参数确定的范围内的所有文档。

```go
res := SearchResponse{
  Time: fmt.Sprintf("%d", result.TookInMillis),
  Hits: fmt.Sprintf("%d", result.Hits.TotalHits),
}
docs := make([]DocumentResponse, 0)
for _, hit := range result.Hits.Hits {
  var doc DocumentResponse
  json.Unmarshal(*hit.Source, &doc)
  docs = append(docs, doc)
}
res.Documents = docs
c.JSON(http.StatusOK, res)
```

## 包装起来

在 `search-api` 目录中，保证所有依赖关系都正确设置。

```shell
$ cd search-api
$ dep ensure
```

使用 Docker-Compose 来构建和运行这两个服务。

```shell
$ docker-compose up -d --build
```

上传一些假文件，例如，在 [`fake-data.json`](https://raw.githubusercontent.com/tinrab/go-elasticsearch-example/master/fake-data.json) 文件中找到的文件。

```shell
$ curl -X POST http://localhost:8080/documents -d @fake-data.json -H "Content-Type: application/json"
```

试试看。

```shell
$ curl http://localhost:8080/search?query=exercitation+est+officia
{
  "time": "42",
  "hits": "43",
  "documents": [{
      "title": "Exercitation est officia fugiat labore deserunt est id voluptate magna.",
      "created_at": "2018-03-21T15:22:48.7830606Z",
      "content": "..."
    },
    // ...
  ]
}
```

整个源代码都可以在 [GitHub](https://github.com/tinrab/go-elasticsearch-example) 上找到。

## 参考资料

1. https://outcrawl.com/go-elastic-search-service/

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)
![打赏](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/money.jpg)
