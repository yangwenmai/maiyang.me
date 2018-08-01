---
layout: post
title: '如何从 Github 同步你的 fork 仓库'
keywords: GitHub, fork, repo, Git
date: 2017-12-13 14:36:00
description: '从 GitHub 同步你的 fork 仓库介绍'
categories: [GitHub]
tags: [GitHub, fork, repo, Git]
comments: true
author: mai
---

    本文是从 Github 同步你的fork 仓库的介绍。

----

## Configuring a remote for a fork ##

You must configure a remote that points to the upstream repository in Git to sync changes you make in a fork with the original repository. This also allows you to sync changes made in the original repository with the fork.

Open Terminal.

List the current configured remote repository for your fork.

git remote -v
origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)
origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)
Specify a new remote upstream repository that will be synced with the fork.

git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git
Verify the new upstream repository you've specified for your fork.

git remote -v
origin    https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)
origin    https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)
upstream  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (fetch)
upstream  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (push)

## Syncing a fork ##

Sync a fork of a repository to keep it up-to-date with the upstream repository.

Before you can sync your fork with an upstream repository, you must configure a remote that points to the upstream repository in Git.

1. Open Terminal.
2. Change the current working directory to your local project.
3. Fetch the branches and their respective commits from the upstream repository. Commits to master will be stored in a local branch, upstream/master.

```shell
$git fetch upstream
remote: Counting objects: 75, done.
remote: Compressing objects: 100% (53/53), done.
remote: Total 62 (delta 27), reused 44 (delta 9)
Unpacking objects: 100% (62/62), done.
From https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY
 * [new branch]      master     -> upstream/master
```

4. Check out your fork's local master branch.

```shell
git checkout master
Switched to branch 'master'
```

5. Merge the changes from upstream/master into your local master branch. This brings your fork's master branch into sync with the upstream repository, without losing your local changes.

```shell
git merge upstream/master
Updating a422352..5fdff0f
Fast-forward
 README                    |    9 -------
 README.md                 |    7 ++++++
 2 files changed, 7 insertions(+), 9 deletions(-)
 delete mode 100644 README
 create mode 100644 README.md
```

If your local branch didn't have any unique commits, Git will instead perform a "fast-forward":

```shell
git merge upstream/master
Updating 34e91da..16c56ad
Fast-forward
 README.md                 |    5 +++--
 1 file changed, 3 insertions(+), 2 deletions(-)
```

**Tip**: Syncing your fork only updates your local copy of the repository. To update your fork on GitHub, you must push your changes.

## 参考资料 ##

1. [fork](https://help.github.com/articles/configuring-a-remote-for-a-fork/)
2. [Syncing a fork](https://help.github.com/articles/syncing-a-fork/)
3. https://github.com/pingcap/tidb/blob/master/CONTRIBUTING.md#workflow

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)
![打赏](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/money.jpg)
