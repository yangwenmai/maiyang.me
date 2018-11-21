---
title: '如何在 phabricator 中添加或更新 js 或 CSS 文件资源？'
keywords: Docker, Docker-Compose, phabricator, assets, js, css
date: 2018-11-22T00:52:00+08:00
lastmod: 2018-11-14T23:57:00+08:00
draft: false
description: '如何在 phabricator 中更新资源？'
categories: [tools]
tags: [Docker, Docker-Compose, phabricator, assets, js, css]
comments: true
author: mai
---

>参考资料：[Adding New CSS and JS](https://secure.phabricator.com/book/phabcontrib/article/adding_new_css_and_js/)

目前这篇 wiki 文档还没有中文翻译，大家可以权当是我对此的翻译加自己的实践总结吧。

## 给 phabricator 添加新的 CSS 和 JS 文件

>解释如何向 Phabricator 添加新的 CSS 和 JS 文件。

### 概述

Phabricator 使用一个名为 Celerity 的系统来管理静态资源。
如果你是现任或前任Facebook员工，Celerity 基于 Facebook 使用的 Haste 系统，通常表现相似。

本文档适用于 Phabricator 开发人员和贡献者。
对于第三方代码，插件或扩展，此过程无法正常运行。

### 添加新文件

要添加新的 CSS 或 JS 文件，请在 `phabricator/` 中的 `webroot/rsrc/css/` 或 `webroot/rsrc/js/` 中的适当位置创建。

每个文件必须 `@provides` 自己作为组件，在标题注释中声明：

```css
/**
 * @provides duck-styles-css
 */

.duck-header {
  font-size: 9001px;
}
```

请注意，此注释必须是 Javadoc 样式的注释，而不仅仅是任何注释。

如果你的组件依赖于其他组件（这在 JS 中很常见但在 CSS 中很少见且不可取），那么请使用 `@requires` 声明：

```css
/**
 * @requires javelin-stratcom
 * @provides duck
 */

/**
 * Put class documentation here, NOT in the header block.
 */
JX.install('Duck', {
  ...
});
```

然后重建 Celerity 映射（参见下一节）。

### 改变现有文件

添加，移动或删除文件或更改现有 JS 或 CSS 文件的内容时，应重建 Celerity 映射：

```sh
phabricator/$ ./bin/celerity map
```

如果您只更改了文件内容，即使您没有更改文件内容，但如果您跳过此步骤，它们将来也可能无法正常工作。

生成的文件资源 `/celerity/map.php` 经常导致合并冲突。可以通过运行 Celerity 映射器来解决它们。您可以通过运行以下命令自动执行此过程：

```sh
phabricator/$ ./scripts/celerity/install_merge.sh
```

这将安装 Git merge 驱动，该驱动将在此文件发生冲突时运行。

### 包含文件

要在页面中包含 CSS 或 JS 文件，请使用 [`require_celerity_resource()`](https://secure.phabricator.com/diviner/find/?name=require_celerity_resource&type=function&jump=1)：

```php
require_celerity_resource('duck-style-css');
require_celerity_resource('duck');
```

如果您的映射是最新的，则现在应该在呈现页面时正确包含资源。

您应该将此调用尽可能靠近实际使用资源的代码，即不在 Controller 的顶部。
我们的想法是，只有当您在页面的特定呈现中实际使用资源时，才应该 [require_celerity_resource()](https://secure.phabricator.com/diviner/find/?name=require_celerity_resource&type=function&jump=1) 资源，而不仅仅是因为页面的某些视图可能需要它。

## 解决问题

### 为什么我修改资源文件，还是不生效呢？

如果你使用的是 bitnami docker-compose 版本，则，你可以直接通过 `docker exec -it phabricator /bin/bash` 进入容器，然后 `cd /opt/bitnami/phabricator/webroot/rsrc/` 进入到指定文件夹，修改你所需要修改的 js 或者 css 文件。

然后你需要执行：

```sh
$ celerity map
Rebuilding 1 resource source(s).
Rebuilding resource source "phabricator" (CelerityPhabricatorResources)...
Found 111 binary resources.
Found 383 text resources.
Found 10 packages.
Writing map "/opt/bitnami/phabricator/resources/celerity/map.php".
Done.
```

看到此内容即表示更新映射成功，你只需要重启你的容器服务即可。

```sh
$ docker-compose restart phabricator
```

## 参考资料

1. [Adding New CSS and JS](https://secure.phabricator.com/book/phabcontrib/article/adding_new_css_and_js/)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)
