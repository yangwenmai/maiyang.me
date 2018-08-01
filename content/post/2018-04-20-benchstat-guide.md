---
layout: post
title: 'benchstat 简单介绍'
keywords: Golang, benchmark, benchstat, Guide
date: 2018-04-20 18:30:00
description: 'benchstat 简单介绍'
categories: [Go, benchmark]
tags: [Golang, benchmark, benchstat, Guide]
comments: true
author: mai
---

    这是一篇介绍 benchstat 的文章。

----

## benchstat 命令

benchstat computes and compares statistics about benchmarks.

benchstat 计算并比较关于基准测试的统计数据。

benchstat 这个工具可以将多次测试的结果汇总，生成概要信息。

用法:

```
benchstat [-delta-test name] [-geomean] [-html] [-sort order] old.txt [new.txt] [more.txt ...]
```

Each input file should contain the concatenated output of a number of runs of “go test -bench.” For each different benchmark listed in an input file, benchstat computes the mean, minimum, and maximum run time, after removing outliers using the interquartile range rule.

If invoked on a single input file, benchstat prints the per-benchmark statistics for that file.

If invoked on a pair of input files, benchstat adds to the output a column showing the statistics from the second file and a column showing the percent change in mean from the first to the second file. Next to the percent change, benchstat shows the p-value and sample sizes from a test of the two distributions of benchmark times. Small p-values indicate that the two distributions are significantly different. If the test indicates that there was no significant change between the two benchmarks (defined as p > 0.05), benchstat displays a single ~ instead of the percent change.

The -delta-test option controls which significance test is applied: utest (Mann-Whitney U-test), ttest (two-sample Welch t-test), or none. The default is the U-test, sometimes also referred to as the Wilcoxon rank sum test.

If invoked on more than two input files, benchstat prints the per-benchmark statistics for all the files, showing one column of statistics for each file, with no column for percent change or statistical significance.

The -html option causes benchstat to print the results as an HTML table.

The -sort option specifies an order in which to list the results: none (input order), delta (percent improvement), or name (benchmark name). A leading “-” prefix, as in “-delta”, reverses the order.

Example
Suppose we collect benchmark results from running “go test -bench=Encode” five times before and after a particular change.

The file old.txt contains:

```
BenchmarkGobEncode    100   13552735 ns/op    56.63 MB/s
BenchmarkJSONEncode    50   32395067 ns/op    59.90 MB/s
BenchmarkGobEncode    100   13553943 ns/op    56.63 MB/s
BenchmarkJSONEncode    50   32334214 ns/op    60.01 MB/s
BenchmarkGobEncode    100   13606356 ns/op    56.41 MB/s
BenchmarkJSONEncode    50   31992891 ns/op    60.65 MB/s
BenchmarkGobEncode    100   13683198 ns/op    56.09 MB/s
BenchmarkJSONEncode    50   31735022 ns/op    61.15 MB/s
```

The file new.txt contains:

```
BenchmarkGobEncode     100    11773189 ns/op    65.19 MB/s
BenchmarkJSONEncode     50    32036529 ns/op    60.57 MB/s
BenchmarkGobEncode     100    11942588 ns/op    64.27 MB/s
BenchmarkJSONEncode     50    32156552 ns/op    60.34 MB/s
BenchmarkGobEncode     100    11786159 ns/op    65.12 MB/s
BenchmarkJSONEncode     50    31288355 ns/op    62.02 MB/s
BenchmarkGobEncode     100    11628583 ns/op    66.00 MB/s
BenchmarkJSONEncode     50    31559706 ns/op    61.49 MB/s
BenchmarkGobEncode     100    11815924 ns/op    64.96 MB/s
BenchmarkJSONEncode     50    31765634 ns/op    61.09 MB/s
```

The order of the lines in the file does not matter, except that the output lists benchmarks in order of appearance.

If run with just one input file, benchstat summarizes that file:

```shell
$ benchstat old.txt
name        time/op
GobEncode   13.6ms ± 1%
JSONEncode  32.1ms ± 1%
$
```

If run with two input files, benchstat summarizes and compares:

```shell
$ benchstat old.txt new.txt
name        old time/op  new time/op  delta
GobEncode   13.6ms ± 1%  11.8ms ± 1%  -13.31% (p=0.016 n=4+5)
JSONEncode  32.1ms ± 1%  31.8ms ± 1%     ~    (p=0.286 n=4+5)
$
```

Note that the JSONEncode result is reported as statistically insignificant instead of a -0.93% delta.

# 参考资料

1. [benchstat](https://godoc.org/golang.org/x/perf/cmd/benchstat)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)
