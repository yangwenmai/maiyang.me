---
layout: post
title: 'Gitlab-ci 配置说明'
keywords: gitlab-ci
date: 2017-06-08 07:10:00
description: 'gitlab-ci 配置说明'
categories: [ci]
tags: [gitlab,ci]
comments: true
group: archive
icon: file-o
---

	本文耗时60分钟，建议实战。

----

## gitlab-ci 配置说明

1. 在项目根目录下创建一个 `.gitlab-ci.yml`文件，详细内容见下文源码。
2. 修改README.md 文件，加上图标展示:（[![build status](http://xxx.gitlab.local/server/xxx/badges/develop/build.svg)](http://xxx.gitlab.local/server/user/commits/develop)）
3. 提交代码，然后就可以查看到build状态了（http://xxx.gitlab.local/server/xxx/builds）

注意：经过以上3步之后，build 状态会显示[pending 状态]，原因是因为还没有给他配置 Runner。

我们还要配置一下 Runner，如果没有 Runner 则可以参考这个：[http://xxx.gitlab.local/server/xxx/runners](http://xxx.gitlab.local/server/xxx/runners)
其实，Gitlab 已经有 Runner 了，可以直接用于你的项目。点击使其可用就好了。

另外：

1. 有可能你的项目没有Pipelines，也没有Runners，所以我们需要打开 builds。(怎么打开呢？点击Edit Project，然后在`Feature Visibility`中找到 builds，改变权限，然后点击保存。)
2. 这个选项是需要你上一步选择之后，才会出来：Only allow merge requests to be merged if the build succeeds。(Builds need to be configured to enable this feature.)

![mr](http://oqos7hrvp.bkt.clouddn.com/blog/merge_when_build_succeeds_only_if_succeeds_settings.png)

所以，我们应该把这个选项都全部勾选上，用于要求被Merge的代码一定是通过  build 的。

## .gitlab-ci.yml 文件

`.gitlab-ci.yml` 示例,拿到这个文件之后，只需要修改一下REPO_NAME，即可将build状态应用到你自己的项目中了。

```yaml
variables:
    REPO_NAME: xxx.gitlab.local/xxx

before_script:
  - go version
  - echo $CI_BUILD_REF
  - echo $CI_PROJECT_DIR

after_script:
  - rm -rf $GOPATH/src/$REPO_NAME/

stages:
  - build
  - test

build-project:
  stage: build
  script:
    - mkdir -p $GOPATH/src/$REPO_NAME
    - mv $CI_PROJECT_DIR/* $GOPATH/src/$REPO_NAME/
    - cd $GOPATH/src/$REPO_NAME
      #  - gometalinter # 代码检查
    - go build

test-project:
  stage: test
  script:
    - mkdir -p $GOPATH/src/$REPO_NAME
    - mv $CI_PROJECT_DIR/* $GOPATH/src/$REPO_NAME/
    - cd $GOPATH/src/$REPO_NAME
    - go test
```

希望以上配置能够给你帮助。

----

**茶歇驿站**

一个让你可以在茶歇之余，停下来看一看，里面的内容或许对你有一些帮助。

这里的内容主要是团队管理，个人管理，后台技术相关，其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)

当然，你觉得对你有帮助，也可以给我打赏。
![打赏](http://oqos7hrvp.bkt.clouddn.com/blog/wxpay.png)