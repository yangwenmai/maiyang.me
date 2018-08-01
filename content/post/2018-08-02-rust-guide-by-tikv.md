---
title: '通过 TiKV 入门 Rust'
keywords: rust, TiKV, PingCAP
date: 2018-08-02T06:30:00+08:00
lastmod: 2018-08-02T06:30:00+08:00
draft: false
description: '通过 TiKV 入门 Rust'
categories: [rust]
tags: [rust, TiKV, PingCAP]
comments: true
author: mai
---

这是我参加[三十分钟成为 Contributor | 为 TiKV 添加 built-in 函数](https://pingcap.com/blog-cn/30mins-become-contributor-of-tikv/)活动的实践之路，包括对于 Rust 语言的入门学习，以及对于 TiKV 的入门了解，也记录了我成为 TiKV 的成长之路，以及实际耗时。

----

## TiKV Contributor 的详细历程

- 安装 Rust：2018-08-01 06:30:00 ~ 2018-08-01 07:10:00
	- 主要卡在下载上了。（国内的网络不敢恭维）
- 构建 TiKV：2018-08-01 07:10:00 ~ 2018-08-01 07:20:00
	- 主要卡在 `Updating registry 'https://github.com/rust-lang/crates.io-index'`

## 检查先决条件

构建 TiKV 你将至少需要以下安装：

- git
- rustup
- awk
- cmake
- go
- make
- clang/gcc

我是 macOS 用户，再加上我还是一个 Gopher ，所以我当前只需要安装 `rustup` 。
>rustup 是 Rust 的官方工具链管理器，类似于 Ruby 世界的 rvm 或 rbenv 。

## 安装 Rust

要安装 Rust 时，请在终端中运行以下命令，然后按照屏幕上的提示进行操作。

```shell
$ curl https://sh.rustup.rs -sSf | sh
info: downloading installer

Welcome to Rust!

This will download and install the official compiler for the Rust programming
language, and its package manager, Cargo.

It will add the cargo, rustc, rustup and other commands to Cargo's bin
directory, located at:

  /Users/maiyang/.cargo/bin

This path will then be added to your PATH environment variable by modifying the
profile files located at:

  /Users/maiyang/.profile
  /Users/maiyang/.zprofile

You can uninstall at any time with rustup self uninstall and these changes will
be reverted.

Current installation options:

   default host triple: x86_64-apple-darwin
     default toolchain: stable
  modify PATH variable: yes

1) Proceed with installation (default)
2) Customize installation
3) Cancel installation
>1

info: syncing channel updates for 'stable-x86_64-apple-darwin'
info: latest update on 2018-07-20, rust version 1.27.2 (58cc626de 2018-07-18)
info: downloading component 'rustc'
 56.5 MiB /  56.5 MiB (100 %)   1.0 MiB/s ETA:   0 s
info: downloading component 'rust-std'
 44.8 MiB /  44.8 MiB (100 %)   1.9 MiB/s ETA:   0 s
info: downloading component 'cargo'
  3.2 MiB /   3.2 MiB (100 %)   1.4 MiB/s ETA:   0 s
info: downloading component 'rust-docs'
  8.8 MiB /   8.8 MiB (100 %)   1.6 MiB/s ETA:   0 s
info: installing component 'rustc'
info: installing component 'rust-std'
info: installing component 'cargo'
info: installing component 'rust-docs'
info: default toolchain set to 'stable'

  stable installed - rustc 1.27.2 (58cc626de 2018-07-18)

Rust is installed now. Great!

To get started you need Cargo's bin directory ($HOME/.cargo/bin) in your PATH
environment variable. Next time you log in this will be done automatically.

To configure your current shell run source $HOME/.cargo/env
```

需要我们手动选择一个安装选项，再下载完成之后将自动安装。我们如果要使其在终端可用的话，还需要设置 `PATH` 环境变量。

```shell
$ source $HOME/.cargo/env
$ rustc version
```

如果你使用 macOS 和 zsh 的话，在这里可能会遇到一个问题：为什么我执行 `rustc version`/`cargo version` 的时候会提示正在同步更新下载 `info: syncing channel updates for 'nightly-2018-07-18-x86_64-apple-darwin'`?

>我当前也不知道为什么！！！等知道了再来补充吧。

反正不知道原因，那么就等它下载安装呗。。。

```shell
$ rustc version
info: syncing channel updates for 'nightly-2018-07-18-x86_64-apple-darwin'
info: latest update on 2018-07-18, rust version 1.29.0-nightly (4f3c7a472 2018-07-17)
info: downloading component 'rustc'
 57.5 MiB /  57.5 MiB (100 %) 333.5 KiB/s ETA:   0 s
info: downloading component 'rust-std'
 46.7 MiB /  46.7 MiB (100 %) 1015.9 KiB/s ETA:   0 s
info: downloading component 'cargo'
  3.2 MiB /   3.2 MiB (100 %)   1.8 MiB/s ETA:   0 s
info: downloading component 'rust-docs'
  8.9 MiB /   8.9 MiB (100 %)   1.7 MiB/s ETA:   0 s
info: installing component 'rustc'
info: installing component 'rust-std'
info: installing component 'cargo'
info: installing component 'rust-docs'
cargo 1.29.0-nightly (af9e40c26 2018-07-05)

$ rustc version
rustc 1.29.0-nightly (4f3c7a472 2018-07-17)
$ cargo version
cargo 1.29.0-nightly (af9e40c26 2018-07-05)
```

## 下载 TiKV

```shell
$ git clone https://github.com/pingcap/tikv.git
$ cd tikv
...
```

## 配置你的 Rust 工具链

TiKV 使用 rust-toolchain 中指定的 Rust 工具链版本。
`rustup` 和 `cargo` 将自动使用此文件。我们还使用了 `rustfmt` 和 `clippy` 组件。

```shell
$ rustup component add rustfmt-preview
info: downloading component 'rustfmt-preview'
  1.7 MiB /   1.7 MiB (100 %) 214.5 KiB/s ETA:   0 s
info: installing component 'rustfmt-preview'
```

## 构建和测试

虽然 TiKV 包含具有常见工作流程的 Makefile ，但你也可以像在普通 Rust 项目中一样使用 `cargo`。

构建 TiKV：

```shell
$ make build

```

## 参考资料

1. [Rust install](https://www.rust-lang.org/zh-CN/install.html)
2. [TiKV README](https://github.com/pingcap/tikv/blob/master/README.md)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)
