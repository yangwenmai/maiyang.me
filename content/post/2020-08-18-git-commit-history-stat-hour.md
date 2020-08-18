---
title: 'git commit 提交历史的一些有趣统计'
keywords: git, commit, stat, 统计, 有趣, history
date: 2020-08-18T22:00:00+08:00
lastmod: 2020-08-18T22:00:00+08:00
draft: false
description: 'git commit 提交历史的一些有趣统计'
categories: [git]
tags: [git, commit, history, stat, 统计, 有趣]
comments: true
author: mai
---

## 查看某个用户的一天每小时的提交情况

```sh
git log --author="yangwenmai" --date=iso | perl -nalE 'if (/^Date:\s+[\d-]{10}\s(\d{2})/) { say $1+0 }' | sort | uniq -c|perl -MList::Util=max -nalE '$h{$F[1]} = $F[0]; }{ $m = max values %h; foreach (0..23) { $h{$_} = 0 if not exists $h{$_} } foreach (sort {$a <=> $b } keys %h) { say sprintf "%02d - %4d %s", $_, $h{$_}, "*"x ($h{$_} / $m * 50); }'

00 -   20 ****
01 -    9 *
02 -    1
03 -    1
04 -    0
05 -    0
06 -    2
07 -    5 *
08 -   16 ***
09 -   51 **********
10 -   75 ***************
11 -  117 ************************
12 -   71 **************
13 -    2
14 -   75 ***************
15 -  141 *****************************
16 -  157 ********************************
17 -  240 **************************************************
18 -  197 *****************************************
19 -   77 ****************
20 -   94 *******************
21 -   94 *******************
22 -  123 *************************
23 -   83 *****************
```

## 查看仓库前 10 名贡献者

```sh
git log --pretty='%aN' | sort | uniq -c | sort -k1 -n -r | head -n 10
```

## 统计每个人增删行数

```sh
git log --format='%aN' | sort -u | while read name; do echo -en "$name\t"; git log --author="$name" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -; done
```

## 查看 git 上的个人代码量

```sh
git log --author="yangwenmai" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -
```

## 查看你在某个项目上的周一-周五，以及周六周日的情况

```sh
✗ ➭ git show|head -1; git log --author='yangwenmai' --format="%H %ai" | perl script.pl
commit bd76c7f6f48d7084e4f16e15e57313e9aedf4bd7

  hour          Monday to Friday                       Saturday and Sunday
    00       17 *                                    3
    01        4                                      5
    02        0                                      1
    03        0                                      1
    04        0                                      0
    05        0                                      0
    06        1                                      1
    07        2                                      3
    08       15 *                                    1
    09       48 *****                                3
    10       68 *******                              7
    11      116 ************                         1
    12       67 *******                              4
    13        2                                      0
    14       69 *******                              6
    15      139 **************                       2
    16      144 ***************                     13 *
    17      232 *************************            8
    18      190 ********************                 7
    19       73 *******                              4
    20       94 **********                           0
    21       93 **********                           1
    22      121 *************                        2
    23       78 ********                             5

Total:     1573 (95.3%)                             78 (4.7%)
```

`script.pl` 附件：

```sh
✗ ➭ cat script.pl
#!/usr/bin/perl

# This script is made to show graphs with git commit time made on workweek vs weekend
#
# The desription of this script and results of its usage is avaliable at:
# https://ivan.bessarabov.com/blog/famous-programmers-work-time-part-2-workweek-vs-weekend
#
# usage:
#
#   git log --author="Sebastian Riedel" --format="%H %ai" | perl script.pl
#


use strict;
use warnings FATAL => 'all';
use utf8;
use open qw(:std :utf8);
use feature qw(say);

use List::Util qw(max sum);
use Time::Local;

my %workweek;
my %weekend;

sub is_saturday_or_is_sunday {
    my ($yyyy_mm_dd) = @_;

        my ($year, $month, $day) = split /-/, $yyyy_mm_dd;

        my $timestamp = timegm(
                0,
                0,
                0,
                $day,
                $month - 1,
                $year,
        );

        my $wday = [gmtime($timestamp)]->[6];

        return $wday == 0 || $wday == 6;
}

while (my $line = <>) {

    # 181971ff7774853fceb0459966177d51eeab032c 2019-04-26 19:53:58 +0200

    my ($commit_hash, $date, $time, $timezone) = split / /, $line;
    my ($hour, $minute, $second) = split /:/, $time;

    $hour += 0;

    if (is_saturday_or_is_sunday($date)) {
        $weekend{$hour}++;
    } else {
        $workweek{$hour}++;
    }
}

my $max = max(values(%workweek), values(%weekend));

my $format = "%6s   %6s %-30s  %6s %-30s",

say '';
say sprintf $format, 'hour', '', 'Monday to Friday', '', 'Saturday and Sunday';

foreach my $hour (0..23) {
    $workweek{$hour} //= 0;
    $weekend{$hour} //= 0;
    say sprintf $format,
        sprintf('%02d', $hour),
        $workweek{$hour},
        '*' x ($workweek{$hour} / $max * 25),

        $weekend{$hour},
        '*' x ($weekend{$hour} / $max * 25),
        ;
}

my $total_commits_workweek = sum(values %workweek);
my $total_commits_weekend = sum(values %weekend);
my $total_commits = $total_commits_workweek + $total_commits_weekend;

say '';
say sprintf $format,
    'Total:',
    $total_commits_workweek,
    sprintf('(%.1f%%)', $total_commits_workweek * 100 / $total_commits),
    $total_commits_weekend,
    sprintf('(%.1f%%)', $total_commits_weekend* 100 / $total_commits),
    ;

say '';
```

## 参考资料

1. [大神程序员，夜夜coding到天明？Python之父昼伏夜出，PHP创始人24小时都在线](https://mp.weixin.qq.com/s/p0XGABh2ZkJQWrgjtZhyBg)
2. [根据Git推算程序员大佬作息：同样是熬夜，为什么他发量那么多？](https://zhuanlan.zhihu.com/p/74412777)
 - 文中的脚本见上文的脚本

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。
