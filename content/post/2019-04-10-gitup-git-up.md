---
title: 'Mac 上的 git 图形工具 GitUp 以及移除已经 merge 到 master 的本地开发分支'
keywords: mac, git, gitup, git-up, tools, 工具
date: 2019-04-10T10:23:00+08:00
lastmod: 2019-04-10T10:23:00+08:00
draft: false
description: 'Mac 上的 git 图形工具 GitUp 以及移除已经 merge 到 master 的本地开发分支'
categories: [tools]
tags: [mac, git, gitup, git-up, tools, 工具]
comments: true
author: mai
---

## gitup

![gitup](https://github.com/git-up/GitUp/wiki/images/16.png)

## 怎么样将本地已经合并到 master 的分支自动移除？

```sh
#!/bin/bash

function git_branch_cleanup() {
    for branch in `git branch --format='%(refname:short)'|grep -v '\*\|master'` ; do
        git checkout $branch
        check_results=`git fetch origin master && git rebase origin/master`
        echo $check_results
        result=$(echo $check_results | grep "up to date.")
        if [ "$result" == "" ];then
            echo "不包含 up to date. $check_results !\n"
        fi
    done
    git checkout master
    git branch --merged | grep -v '\*\|master' | xargs -n 1 git branch -d
}

git_branch_cleanup
```

或者

```sh
#!/bin/bash

git branch -d $(git branch -vv | grep ': gone\]' | awk '{print $1}')

```

还有一种方法是设置： git/hooks/post-merge

```sh
#!/bin/sh
#
# An example hook script to prepare a packed repository for use over
# dumb transports.
#
# To enable this hook, rename this file to "post-merge".
delete_merged_branch() {
    currentBranch=`git branch | grep \* | cut -d ' ' -f2`
    if [ $currentBranch -eq "master" ]
    then
        git branch --merged|grep -v 'master'|xargs -n1 git branch -D
    fi
}

delete_merged_branch
```

## 其他

```sh
git fetch --prune
```

```sh
git pull --rebase --autostash
```

另外一个相似的：[git-up(1) -- fetch and rebase all locally-tracked remote branches](https://github.com/aanand/git-up)

## 扩展阅读

1. [Mac 上的 git 图形工具 GitUp](http://qinghua.github.io/gitup/)
2. [Using-GitUp-Map-View](https://github.com/git-up/GitUp/wiki/Using-GitUp-Map-View)
3. [GitUp, 你不可错过的秀外慧中的git工具](https://wdd.js.org/gitup-the-git-gui-you-will-like.html)
4. [how-to-iterate-through-all-git-branches-using-bash-script](https://stackoverflow.com/questions/3846380/how-to-iterate-through-all-git-branches-using-bash-script)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。


