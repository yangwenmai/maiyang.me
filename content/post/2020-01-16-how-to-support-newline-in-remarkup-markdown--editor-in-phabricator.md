---
title: '如何在 remarkup 编辑器（Phabricator）中使得在表格中的文本可以换行？'
keywords: remarkup, phabricator, tools, wiki, facebook, editor, newline
date: 2020-01-16T15:20:00+08:00
lastmod: 2020-01-16T15:20:00+08:00
draft: false
description: '如何在 remarkup 编辑器（Phabricator）中使得在表格中的文本可以换行？'
categories: [工具]
tags: [remarkup, phabricator, tools, wiki, facebook, editor, newline]
comments: true
author: mai
---

## 如何在 remarkup 编辑器（Phabricator）中使得在表格中的文本可以换行？

因为 phabricator 不是使用的 markdown 来渲染，而是 remarkup，虽然 remakrup 是支持绝大多数的 markdown 语法的，但是 markdown 中怎么支持换行呢？

## 搜索关键词

关键词： “phabricator newline”。

结果：

- https://discourse.phabricator-community.org/t/request-for-a-newline-in-a-table-t5427/1618

## 使用语法

#src/extensions/newline.php
```php
<?php

final class RemarkupNewLineRule extends PhabricatorRemarkupCustomInlineRule
{
  public function getPriority() {
    return 300.0;
  }

  public function apply($text) {
        return preg_replace_callback(
        '@{newline}@m',
        array($this, 'markupNewLine'),
        $text);
  }

  public function markupNewLine($matches) {
    $engine = $this->getEngine();
    if ($engine->isTextMode()) {
      return "\n";
    }
    if ($engine->isHTMLMailMode()) {
      return phutil_safe_html('');
    }
    // Normal mode, return parsed text
    return $this->getEngine()->storeText(phutil_safe_html('<br />'));

   }
}
```

然后重启一下 phabricator 服务即可。

## 参考资料

1. [Request for a newline in a table (T5427)](https://discourse.phabricator-community.org/t/request-for-a-newline-in-a-table-t5427/1618)
2. [Phabricator 重启参考文档](https://phabricator.webfuns.net/book/phabricator/article/restarting/)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)
