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

我是 macOS 用户，再加上我还是一个 Gopher ，原以为我只需要安装 `rustup` 。
>rustup 是 Rust 的官方工具链管理器，类似于 Ruby 世界的 rvm 或 rbenv 。

结果，还需要安装 `brew install cmake`。

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
make build
cargo build --features "default sse no-fail"
    Updating registry `https://github.com/rust-lang/crates.io-index`
    Updating git repository `https://github.com/busyjay/jemallocator.git`
    Updating git repository `https://github.com/pingcap/kvproto.git`
    Updating git repository `https://github.com/pingcap/murmur3.git`
    Updating git repository `https://github.com/pingcap/rust-rocksdb.git`
    Updating git repository `https://github.com/pingcap/tipb.git`
    Updating git repository `https://github.com/alexcrichton/bzip2-rs.git`
    Updating git repository `https://github.com/busyjay/libz-sys.git`
    Updating git repository `https://github.com/busyjay/lz4-rs.git`
    Updating git repository `https://github.com/busyjay/rust-snappy.git`
    Updating git repository `https://github.com/gyscos/zstd-rs.git`
 Downloading sys-info v0.5.1
 Downloading prometheus v0.4.2
 Downloading slog v2.2.3
 Downloading num v0.2.0
 Downloading chrono v0.4.0
 Downloading serde v1.0.52
 Downloading rustc-serialize v0.3.24
 Downloading lazy_static v0.2.8
 Downloading libc v0.2.42
 Downloading crossbeam-channel v0.2.1
 Downloading bitflags v1.0.1
 Downloading backtrace v0.2.3
 Downloading regex v0.1.80
 Downloading signal v0.4.1
 Downloading zipf v0.2.0
 Downloading tokio-timer v0.2.4
 Downloading slog-term v2.4.0
 Downloading fs2 v0.4.0
 Downloading serde_derive v1.0.8
 Downloading utime v0.2.0
 Downloading grpcio v0.3.0
 Downloading crc v1.2.0
 Downloading prometheus-static-metric v0.1.4
 Downloading fxhash v0.2.1
 Downloading futures v0.1.23
 Downloading tempdir v0.3.4
 Downloading protobuf v2.0.2
 Downloading tokio-core v0.1.6
 Downloading futures-cpupool v0.1.8
 Downloading slog-scope v4.0.1
 Downloading mio v0.5.1
 Downloading slog-async v2.3.0
 Downloading fnv v1.0.5
 Downloading quick-error v0.2.2
 Downloading raft v0.3.1
 Downloading toml v0.4.3
 Downloading serde_json v1.0.2
 Downloading nix v0.9.0
 Downloading slog-stdlog v3.0.2
 Downloading byteorder v0.5.1
 Downloading uuid v0.6.3
 Downloading crossbeam v0.2.12
 Downloading rand v0.3.14
 Downloading fail v0.2.0
 Downloading indexmap v1.0.1
 Downloading log v0.3.9
 Downloading derive_more v0.11.0
 Downloading time v0.1.38
 Downloading clap v2.23.3
 Downloading url v1.7.0
 Downloading gcc v0.3.54
 Downloading cfg-if v0.1.3
 Downloading hyper v0.9.18
 Downloading spin v0.4.6
 Downloading cookie v0.2.5
 Downloading httparse v1.1.2
 Downloading language-tags v0.2.2
 Downloading solicit v0.4.4
 Downloading traitobject v0.0.1
 Downloading unicase v1.4.0
 Downloading num_cpus v1.6.2
 Downloading mime v0.2.2
 Downloading typeable v0.1.2
 Downloading percent-encoding v1.0.0
 Downloading matches v0.1.2
 Downloading idna v0.1.0
 Downloading unicode-normalization v0.1.2
 Downloading unicode-bidi v0.2.3
 Downloading log v0.4.1
 Downloading hpack v0.2.0
 Downloading rustc_version v0.1.7
 Downloading semver v0.1.20
 Downloading num-traits v0.2.5
 Downloading num-integer v0.1.39
 Downloading num-rational v0.2.1
 Downloading num-complex v0.2.0
 Downloading num-iter v0.1.37
 Downloading num-bigint v0.2.0
 Downloading num v0.1.32
 Downloading num-traits v0.1.32
 Downloading cmake v0.1.28
 Downloading pkg-config v0.3.8
 Downloading cc v1.0.3
 Downloading blob v0.2.0
 Downloading glob v0.2.11
 Downloading base64 v0.5.2
 Downloading byteorder v1.2.3
 Downloading lazy_static v0.1.16
 Downloading parking_lot v0.5.5
 Downloading crossbeam-epoch v0.4.3
 Downloading smallvec v0.6.2
 Downloading crossbeam-utils v0.4.1
 Downloading parking_lot_core v0.2.13
 Downloading owning_ref v0.3.3
 Downloading rand v0.4.2
 Downloading stable_deref_trait v1.0.0
 Downloading memoffset v0.2.1
 Downloading crossbeam-utils v0.3.2
 Downloading arrayvec v0.4.7
 Downloading scopeguard v0.3.3
 Downloading lazy_static v1.0.0
 Downloading nodrop v0.1.12
 Downloading backtrace-sys v0.1.15
 Downloading kernel32-sys v0.2.2
 Downloading rustc-demangle v0.1.2
 Downloading winapi v0.2.8
 Downloading dbghelp-sys v0.2.0
 Downloading winapi-build v0.1.1
 Downloading regex-syntax v0.3.9
 Downloading thread_local v0.2.7
 Downloading aho-corasick v0.5.3
 Downloading utf8-ranges v0.1.3
 Downloading memchr v0.1.11
 Downloading thread-id v2.0.0
 Downloading bitflags v0.9.1
 Downloading void v1.0.2
 Downloading tokio-executor v0.1.2
 Downloading thread_local v0.3.5
 Downloading isatty v0.1.7
 Downloading term v0.5.1
 Downloading unreachable v1.0.0
 Downloading serde_derive_internals v0.15.1
 Downloading quote v0.3.12
 Downloading syn v0.11.11
 Downloading synom v0.11.3
 Downloading unicode-xid v0.0.4
 Downloading quick-error v1.2.1
 Downloading grpcio-sys v0.2.3
 Downloading syn v0.13.11
 Downloading proc-macro2 v0.3.8
 Downloading quote v0.5.2
 Downloading unicode-xid v0.1.0
 Downloading mio v0.6.6
 Downloading slab v0.3.0
 Downloading bytes v0.4.1
 Downloading iovec v0.1.0
 Downloading tokio-io v0.1.1
 Downloading scoped-tls v0.1.0
 Downloading net2 v0.2.23
 Downloading lazycell v0.4.0
 Downloading ws2_32-sys v0.2.1
 Downloading nix v0.5.1
 Downloading slab v0.1.3
 Downloading miow v0.1.5
 Downloading bytes v0.3.0
 Downloading bitflags v0.4.0
 Downloading take_mut v0.2.2
 Downloading dtoa v0.4.1
 Downloading itoa v0.3.1
 Downloading term_size v0.3.0
 Downloading unicode-segmentation v1.1.0
 Downloading unicode-width v0.1.4
 Downloading bitflags v0.8.2
 Downloading strsim v0.6.0
 Downloading ansi_term v0.9.0
 Downloading vec_map v0.7.0
 Downloading atty v0.2.2
   Compiling byteorder v1.2.3
   Compiling num-traits v0.2.5
   Compiling cc v1.0.3
   Compiling num-integer v0.1.39
   Compiling cfg-if v0.1.3
   Compiling semver v0.1.20
   Compiling matches v0.1.2
   Compiling winapi-build v0.1.1
   Compiling serde v1.0.52
   Compiling pkg-config v0.3.8
   Compiling num-iter v0.1.37
   Compiling unicode-normalization v0.1.2
   Compiling gcc v0.3.54
   Compiling glob v0.2.11
   Compiling num-bigint v0.2.0
   Compiling winapi v0.2.8
   Compiling protobuf v2.0.2
   Compiling unicode-xid v0.1.0
   Compiling libc v0.2.42
   Compiling percent-encoding v1.0.0
   Compiling unicode-xid v0.0.4
   Compiling void v1.0.2
   Compiling num-rational v0.2.1
   Compiling smallvec v0.6.2
   Compiling stable_deref_trait v1.0.0
   Compiling quote v0.3.12
   Compiling num-complex v0.2.0
   Compiling nodrop v0.1.12
   Compiling num-traits v0.1.32
   Compiling scopeguard v0.3.3
   Compiling slog v2.2.3
   Compiling lazycell v0.4.0
   Compiling backtrace v0.2.3
   Compiling lazy_static v1.0.0
   Compiling bitflags v0.9.1
   Compiling prometheus v0.4.2
   Compiling bitflags v0.4.0
   Compiling rustc-serialize v0.3.24
   Compiling httparse v1.1.2
   Compiling slab v0.3.0
   Compiling typeable v0.1.2
   Compiling traitobject v0.0.1
   Compiling crossbeam v0.2.12
   Compiling memoffset v0.2.1
   Compiling lazy_static v0.2.8
   Compiling quick-error v1.2.1
   Compiling language-tags v0.2.2
   Compiling futures v0.1.23
   Compiling lazy_static v0.1.16
   Compiling vec_map v0.7.0
   Compiling regex-syntax v0.3.9
   Compiling ansi_term v0.9.0
   Compiling unicode-width v0.1.4
   Compiling spin v0.4.6
   Compiling crossbeam-utils v0.4.1
   Compiling scoped-tls v0.1.0
   Compiling strsim v0.6.0
   Compiling slab v0.1.3
   Compiling utf8-ranges v0.1.3
   Compiling quick-error v0.2.2
   Compiling take_mut v0.2.2
   Compiling dtoa v0.4.1
   Compiling fnv v1.0.5
   Compiling bytes v0.3.0
   Compiling bitflags v0.8.2
   Compiling unicode-segmentation v1.1.0
   Compiling itoa v0.3.1
   Compiling rustc-demangle v0.1.2
   Compiling byteorder v0.5.1
   Compiling bitflags v1.0.1
   Compiling unicode-bidi v0.2.3
   Compiling log v0.4.1
   Compiling crossbeam-utils v0.3.2
   Compiling ws2_32-sys v0.2.1
   Compiling kernel32-sys v0.2.2
   Compiling dbghelp-sys v0.2.0
   Compiling base64 v0.5.2
   Compiling fxhash v0.2.1
   Compiling term v0.5.1
   Compiling murmur3 v0.4.0 (https://github.com/pingcap/murmur3.git#4af9e1a8)
   Compiling rustc_version v0.1.7
   Compiling cmake v0.1.28
   Compiling libz-sys v1.0.18 (https://github.com/busyjay/libz-sys.git?branch=static-link#bb77b618)
   Compiling bzip2-sys v0.1.6 (https://github.com/alexcrichton/bzip2-rs.git#0ae38c2c)
   Compiling lz4-sys v1.8.0 (https://github.com/busyjay/lz4-rs.git?branch=adjust-build#41509fea)
   Compiling backtrace-sys v0.1.15
   Compiling sys-info v0.5.1
   Compiling proc-macro2 v0.3.8
   Compiling unreachable v1.0.0
   Compiling synom v0.11.3
   Compiling owning_ref v0.3.3
   Compiling arrayvec v0.4.7
   Compiling iovec v0.1.0
   Compiling time v0.1.38
   Compiling rand v0.4.2
   Compiling num_cpus v1.6.2
   Compiling memchr v0.1.11
   Compiling isatty v0.1.7
   Compiling atty v0.2.2
   Compiling term_size v0.3.0
   Compiling rand v0.3.14
   Compiling fs2 v0.4.0
   Compiling nix v0.5.1
   Compiling nix v0.9.0
   Compiling crc v1.2.0
   Compiling slog-scope v4.0.1
   Compiling log v0.3.9
   Compiling idna v0.1.0
   Compiling tokio-executor v0.1.2
   Compiling unicase v1.4.0
   Compiling snappy-sys v0.1.0 (https://github.com/busyjay/rust-snappy.git?branch=static-link#be021783)
   Compiling grpcio-sys v0.2.3
   Compiling librocksdb_sys v0.1.0 (https://github.com/pingcap/rust-rocksdb.git#2f868cb7)
   Compiling thread_local v0.3.5
   Compiling syn v0.11.11
   Compiling bytes v0.4.1
   Compiling futures-cpupool v0.1.8
   Compiling aho-corasick v0.5.3
   Compiling clap v2.23.3
   Compiling crossbeam-epoch v0.4.3
   Compiling quote v0.5.2
   Compiling blob v0.2.0
   Compiling serde_json v1.0.2
   Compiling toml v0.4.3
   Compiling indexmap v1.0.1
   Compiling hpack v0.2.0
   Compiling mime v0.2.2
   Compiling slog-stdlog v3.0.2
   Compiling parking_lot_core v0.2.13
   Compiling uuid v0.6.3
   Compiling fail v0.2.0
   Compiling tempdir v0.3.4
   Compiling zipf v0.2.0
   Compiling tokio-timer v0.2.4
error: failed to run custom build command for `snappy-sys v0.1.0 (https://github.com/busyjay/rust-snappy.git?branch=static-link#be021783)`
process didn't exit successfully: `/Users/maiyang/develop/goworkspace/src/github.com/pingcap/tikv/target/debug/build/snappy-sys-d19d4fa50317739c/build-script-build` (exit code: 101)
--- stdout
running: "cmake" "/Users/maiyang/.cargo/git/checkouts/rust-snappy-0ed33e4b7b96fc57/be02178/snappy-sys/snappy" "-DCMAKE_INSTALL_PREFIX=/Users/maiyang/develop/goworkspace/src/github.com/pingcap/tikv/target/debug/build/snappy-sys-18e2adb6e5be4bad/out" "-DCMAKE_C_FLAGS= -ffunction-sections -fdata-sections -fPIC -m64" "-DCMAKE_C_COMPILER=/usr/bin/cc" "-DCMAKE_CXX_FLAGS= -ffunction-sections -fdata-sections -fPIC -m64" "-DCMAKE_CXX_COMPILER=/usr/bin/c++" "-DCMAKE_BUILD_TYPE=Debug"

--- stderr
thread 'main' panicked at '
failed to execute command: No such file or directory (os error 2)
is `cmake` not installed?

build script failed, must exit now', /Users/maiyang/.cargo/registry/src/github.com-1ecc6299db9ec823/cmake-0.1.28/src/lib.rs:631:5
note: Run with `RUST_BACKTRACE=1` for a backtrace.

warning: build failed, waiting for other jobs to finish...
error: failed to run custom build command for `grpcio-sys v0.2.3`
process didn't exit successfully: `/Users/maiyang/develop/goworkspace/src/github.com/pingcap/tikv/target/debug/build/grpcio-sys-c6aa379e1c7d6d70/build-script-build` (exit code: 101)
--- stdout
cargo:rerun-if-changed=grpc_wrap.c
cargo:rerun-if-changed=grpc
cargo:rerun-if-env-changed=GRPCIO_SYS_USE_PKG_CONFIG
running: "cmake" "/Users/maiyang/.cargo/registry/src/github.com-1ecc6299db9ec823/grpcio-sys-0.2.3/grpc" "-DCMAKE_INSTALL_PREFIX=/Users/maiyang/develop/goworkspace/src/github.com/pingcap/tikv/target/debug/build/grpcio-sys-079de8dda26d3e5a/out" "-DCMAKE_C_FLAGS= -ffunction-sections -fdata-sections -fPIC -m64" "-DCMAKE_C_COMPILER=/usr/bin/cc" "-DCMAKE_CXX_FLAGS= -stdlib=libc++ -ffunction-sections -fdata-sections -fPIC -m64" "-DCMAKE_CXX_COMPILER=/usr/bin/c++" "-DCMAKE_BUILD_TYPE=Debug"

--- stderr
thread 'main' panicked at '
failed to execute command: No such file or directory (os error 2)
is `cmake` not installed?

build script failed, must exit now', /Users/maiyang/.cargo/registry/src/github.com-1ecc6299db9ec823/cmake-0.1.28/src/lib.rs:631:5
note: Run with `RUST_BACKTRACE=1` for a backtrace.

warning: build failed, waiting for other jobs to finish...
error: build failed
make: *** [build] Error 101
```

好多依赖啊。。。发现一个错误，这个很好解决，只需要 `brew install cmake` 。

在执行到 `Compiling tikv v2.1.0-beta (file:///Users/maiyang/develop/goworkspace/src/github.com/pingcap/tikv)` 的时候，电脑风扇转的厉害。。。

在各种依赖包都齐备的情况下， `make build` 执行花了 4 分钟。
```shell
$ make build
cargo build --features "default sse no-fail"
   Compiling signal v0.4.1
   Compiling num-integer v0.1.39
   Compiling num-complex v0.2.0
   Compiling zstd-sys v1.4.4+zstd.1.3.5 (https://github.com/gyscos/zstd-rs.git#0100c848)
   Compiling snappy-sys v0.1.0 (https://github.com/busyjay/rust-snappy.git?branch=static-link#be021783)
   Compiling grpcio-sys v0.2.3
   Compiling lz4-sys v1.8.0 (https://github.com/busyjay/lz4-rs.git?branch=adjust-build#41509fea)
   Compiling bzip2-sys v0.1.6 (https://github.com/alexcrichton/bzip2-rs.git#0ae38c2c)
   Compiling backtrace-sys v0.1.15
   Compiling url v1.7.0
   Compiling libz-sys v1.0.18 (https://github.com/busyjay/libz-sys.git?branch=static-link#bb77b618)
   Compiling sys-info v0.5.1
   Compiling parking_lot v0.5.5
   Compiling tokio-io v0.1.1
   Compiling raft v0.3.1
   Compiling tipb v0.0.1 (https://github.com/pingcap/tipb.git#658ea9c1)
   Compiling serde_derive_internals v0.15.1
   Compiling syn v0.13.11
   Compiling slog-async v2.3.0
   Compiling unicase v1.4.0
   Compiling solicit v0.4.4
   Compiling thread-id v2.0.0
   Compiling utime v0.2.0
   Compiling net2 v0.2.23
   Compiling backtrace v0.2.3
   Compiling num-iter v0.1.37
   Compiling num-bigint v0.2.0
   Compiling crossbeam-channel v0.2.1
   Compiling cookie v0.2.5
   Compiling thread_local v0.2.7
   Compiling serde_derive v1.0.8
   Compiling miow v0.1.5
   Compiling mio v0.6.6
   Compiling num v0.1.32
   Compiling regex v0.1.80
   Compiling hyper v0.9.18
   Compiling mio v0.5.1
   Compiling num-rational v0.2.1
   Compiling chrono v0.4.0
   Compiling tokio-core v0.1.6
   Compiling num v0.2.0
   Compiling derive_more v0.11.0
   Compiling prometheus-static-metric v0.1.4
   Compiling slog-term v2.4.0
   Compiling prometheus v0.4.2
   Compiling librocksdb_sys v0.1.0 (https://github.com/pingcap/rust-rocksdb.git#2f868cb7)
   Compiling grpcio v0.3.0
   Compiling kvproto v0.0.1 (https://github.com/pingcap/kvproto.git#5e6e69a5)
   Compiling rocksdb v0.3.0 (https://github.com/pingcap/rust-rocksdb.git#2f868cb7)
   Compiling tikv v2.1.0-beta (file:///Users/maiyang/develop/goworkspace/src/github.com/pingcap/tikv)
    Finished dev [unoptimized + debuginfo] target(s) in 4m 12s
```

然后执行：

```shell
cargo install cargo-watch
    Updating registry `https://github.com/rust-lang/crates.io-index`
warning: spurious network error (2 tries remaining): [52] Server returned nothing (no headers, no data) (Empty reply from server); class=Net (12)
 Downloading cargo-watch v7.0.1
  Installing cargo-watch v7.0.1
 Downloading clap v2.32.0
 Downloading watchexec v1.8.6
 Downloading unicode-width v0.1.5
 Downloading bitflags v1.0.3
 Downloading term_size v0.3.1
 Downloading ansi_term v0.11.0
 Downloading strsim v0.7.0
 Downloading textwrap v0.10.0
 Downloading vec_map v0.8.1
 Downloading atty v0.2.11
 Downloading notify v4.0.3
 Downloading globset v0.2.1
 Downloading env_logger v0.4.3
 Downloading lazy_static v0.2.11
 Downloading fsevent-sys v0.1.6
 Downloading bitflags v0.7.0
 Downloading fsevent v0.2.17
 Downloading filetime v0.1.15
 Downloading walkdir v2.1.4
 Downloading cfg-if v0.1.4
 Downloading same-file v1.0.2
 Downloading regex v0.2.11
 Downloading aho-corasick v0.6.6
 Downloading fnv v1.0.6
 Downloading memchr v2.0.1
 Downloading regex-syntax v0.5.6
 Downloading utf8-ranges v1.0.0
 Downloading ucd-util v0.1.1
 Downloading lazy_static v1.0.2
 Downloading log v0.4.3
   Compiling libc v0.2.42
   Compiling void v1.0.2
   Compiling lazy_static v1.0.2
   Compiling cfg-if v0.1.4
   Compiling ucd-util v0.1.1
   Compiling regex v0.2.11
   Compiling same-file v1.0.2
   Compiling unicode-width v0.1.5
   Compiling utf8-ranges v1.0.0
   Compiling bitflags v0.7.0
   Compiling ansi_term v0.11.0
   Compiling vec_map v0.8.1
   Compiling bitflags v1.0.3
   Compiling fnv v1.0.6
   Compiling bitflags v0.9.1
   Compiling strsim v0.7.0
   Compiling lazy_static v0.2.11
   Compiling glob v0.2.11
   Compiling log v0.4.3
   Compiling unreachable v1.0.0
   Compiling walkdir v2.1.4
   Compiling regex-syntax v0.5.6
   Compiling memchr v2.0.1
   Compiling term_size v0.3.1
   Compiling fsevent-sys v0.1.6
   Compiling filetime v0.1.15
   Compiling atty v0.2.11
   Compiling nix v0.9.0
   Compiling thread_local v0.3.5
   Compiling textwrap v0.10.0
   Compiling fsevent v0.2.17
   Compiling aho-corasick v0.6.6
   Compiling log v0.3.9
   Compiling env_logger v0.4.3
   Compiling clap v2.32.0
   Compiling notify v4.0.3
   Compiling globset v0.2.1
   Compiling watchexec v1.8.6
   Compiling cargo-watch v7.0.1
    Finished release [optimized] target(s) in 1m 25s
  Installing /Users/maiyang/.cargo/bin/cargo-watch
```

然后再执行：

```shell
$ cargo watch -s "cargo check"
```

Rust 编译运行程序太消耗电脑了，一运行，电脑风扇转个不停，都可以煮鸡蛋了。。。

>以上是我们安装 Rust 以及其相关依赖，还有 TiKV 的项目编译、测试、检查学习。

----

>接下来，我将记录我的 TiKV Contributors 工作流程，如有遗漏欢迎指正。

----

## Contribution flow

This is a rough outline of what a contributor's workflow looks like:

### Step 1: Fork in the cloud

1. Visit https://github.com/pingcap/tikv
2. Click Fork button (top right) to establish a cloud-based fork.

### Step 2: Clone fork to local storage

Define a local working directory:

```sh
# Define a local working directory:
$ working_dir=/.../src/github.com/pingcap
$ user={your github profile name}
```

Create your clone:

```sh
$ mkdir -p $working_dir
$ cd $working_dir
$ git clone https://github.com/$user/tikv.git
$ cd $working_dir/tikv
```

Set remote:

```sh
$ git remote -v
origin	https://github.com/$user/tikv.git (fetch)
origin	https://github.com/$user/tikv.git (push)

$ git remote add upstream https://github.com/pingcap/tikv.git
$ git remote -v
origin	https://github.com/$user/tikv.git (fetch)
origin	https://github.com/$user/tikv.git (push)
upstream	https://github.com/pingcap/tikv.git (fetch)
upstream	https://github.com/pingcap/tikv.git (push)

# Never push to upstream master since you do not have write access.
$ git remote set-url --push upstream no_push
$ git remote -v
origin	https://github.com/$user/tikv.git (fetch)
origin	https://github.com/$user/tikv.git (push)
upstream	https://github.com/pingcap/tikv.git (fetch)
upstream	no_push (push)
```

### Step 3: Branch

Get your local master up to date:

```sh
cd $working_dir/tikv
git fetch upstream
git checkout master
git rebase upstream/master
```

Branch from master:

```sh
git checkout -b myfeature
```

### Step 4: Develop

#### Edit the code

You can now edit the code on the `myfeature` branch.

#### Run stand-alone mode

```sh
$ make build
```

#### Run Test

When you're ready to test out your changes, use the `dev` task. It will format your codebase, build with clippy enabled, and run tests. This should run without failure before you create a PR.

```sh
$ make dev
```

- Run tests and make sure all the tests are passed.
- Make sure your commit messages are in the proper format.

### Step 5: Keep your branch in sync

```sh
# While on your myfeature branch.
git fetch upstream
git rebase upstream/master
```

### Step 6: Commit

Commit your changes.

```sh
git commit
```

### Step 7: Push

When ready to review (or just to establish an offsite backup or your work), push your branch to your fork on github.com:

```sh
git push -f origin myfeature
```

### Step 8: Create a pull request

1. Visit your fork at [https://github.com/$user/tikv](https://github.com/$user/tikv) (replace $user obviously).
2. Click the Compare & pull request button next to your `myfeature` branch.

### Step 9: Get a code review

Once your pull request has been opened, it will be assigned to at least two reviewers. Those reviewers will do a thorough code review, looking for correctness, bugs, opportunities for improvement, documentation and comments, and style.

Commit changes made in response to review comments to the same branch on your fork.

Very small PRs are easy to review. Very large PRs are very difficult to review.

Thanks for your contributions!

----

## TiKV Contributors 工作流程

### 第一步：Fork TiKV 项目

1. 访问 [https://github.com/pingcap/tikv](https://github.com/pingcap/tikv)；
2. 点击 Fork 按钮（顶部右侧），简历基于此的分支；

### 第二步：克隆分支到你本地

```sh
# Define a local working directory:
$ working_dir=/.../src/github.com/pingcap
$ user={your github profile name}
$ mkdir -p $working_dir
$ cd $working_dir
$ git clone https://github.com/$user/tikv.git
$ cd $working_dir/tikv
$ git remote -v
origin	https://github.com/$user/tikv.git (fetch)
origin	https://github.com/$user/tikv.git (push)

$ git remote add upstream https://github.com/pingcap/tikv.git
$ git remote -v
origin	https://github.com/$user/tikv.git (fetch)
origin	https://github.com/$user/tikv.git (push)
upstream	https://github.com/pingcap/tikv.git (fetch)
upstream	https://github.com/pingcap/tikv.git (push)

# Never push to upstream master since you do not have write access.
$ git remote set-url --push upstream no_push
$ git remote -v
origin	https://github.com/$user/tikv.git (fetch)
origin	https://github.com/$user/tikv.git (push)
upstream	https://github.com/pingcap/tikv.git (fetch)
upstream	no_push (push)
```

### 第三步：分支

让你本地 master 分支保持最新：

```sh
$ cd $working_dir/tikv
$ git fetch upstream
$ git checkout master
$ git rebase upstream/master
```

从 master 开分支：

```sh
$ git checkout -b myfeature
```

### 第四步：开发

#### 编辑代码

你现在能在 `myfeature` 分支上编辑代码了。

#### 独立运行模式

```sh
$ make build
```

当你准备测试修改的代码，可以使用 `dev` 指令，它将格式化你的代码库，在启用 `clippy` 的情况下构建，并运行测试。在创建 PR 之前，你要保证这是没有失败的。

```sh
$ make dev
```

#### 运行测试

```sh
# Run the full suite
$ make test
```

### 第五步：保持分支同步

```sh
# While on your myfeature branch.
$ git fetch upstream
$ git rebase upstream/master
```

### 第六步：提交

提交你的修改：

```sh
$ git commit
```

### 第七步：推送

准备好审核：

```sh
git push -f origin myfeature
```

### 第八步：创建一个 pull request

1. 访问你 fork 的 [https://github.com/$user/tikv](https://github.com/$user/tikv) (替换 $user)；
2. 点击 myfeature 分支旁边的 Compare & pull request 按钮；

### 第九步：获取代码审核

一旦你的 Pull Request 被打开，它将被分配给至少两个审核者。
这些审核人员将进行彻底的代码审查，寻找正确性，错误，改进机会，文档和评论以及样式。

## 参考资料

1. [Rust install](https://www.rust-lang.org/zh-CN/install.html)
2. [TiKV README](https://github.com/pingcap/tikv/blob/master/README.md)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)
