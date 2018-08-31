---
layout: post
title: 'Golang 中获取字符个数以及 emoji 表情处理'
keywords: Golang, 字符串, emoji, 表情
date: 2015-06-16 14:00:00
description: 'Golang 中获取字符个数以及 emoji 表情处理'
categories: [golang]
tags: [Golang, 字符串, emoji, 表情]
comments: true
group: archive
icon: file-o
---

在 Ruby 中，我们可以直接调用 str.length 来判断字符串的长度。

在 Golang 中，不能直接调用 len 函数来统计字符串字符长度，这是因为在 Go 中，字符串是以 UTF-8 为格式进行存储的，在字符串上调用 len 函数，取得的是字符串包含的 byte 的个数。

例如字符串："Hello, 世界" 包含 9 个字符。使用 len("Hello, 世界") 得到的结果为 13，因为这个字符串占用 13 个字节：

	s := "Hello, 世界"
	fmt.Println(len(s)) // 13
	fmt.Println([]byte(s)) // [72 101 108 108 111 44 32 228 184 150 231 149 140]

<!--more-->

那么如何统计 Golang 字符串长度呢？有下面几种方法：

	- 使用 bytes.Count() 统计
	- 使用 strings.Count() 统计
	- 将字符串转换为 []rune 后调用 len 函数进行统计
	- 使用 utf8.RuneCountInString() 统计

对应代码如下：

```go
	package count

    import "bytes"
    import "strings"
    import "unicode/utf8"

    func f1(s string) int {
        return bytes.Count([]byte(s), nil) - 1
    }

    func f2(s string) int {
        return strings.Count(s, "") - 1
    }

    func f3(s string) int {
        return len([]rune(s))
    }

    func f4(s string) int {
        return utf8.RuneCountInString(s)
    }
```

用上面 4 个函数计算字符串"Hello, 世界" 都会得到正确的字符个数：9。那究竟哪个方法更好一些呢？做一下测试看看：

创建文件：count_test.go，内容如下：

```go
	package count

    import "bytes"
    import "strings"
    import "unicode/utf8"
    import "testing"

    func f1(s string) int {
        return bytes.Count([]byte(s), nil) - 1
    }

    func f2(s string) int {
        return strings.Count(s, "") - 1
    }

    func f3(s string) int {
        return len([]rune(s))
    }

    func f4(s string) int {
        return utf8.RuneCountInString(s)
    }

    var s = "Hello, 世界"

    func Benchmark1(b *testing.B) {
        for i := 0; i < b.N; i++ {
            f1(s)
        }
    }

    func Benchmark2(b *testing.B) {
        for i := 0; i < b.N; i++ {
            f2(s)
        }
    }

    func Benchmark3(b *testing.B) {
        for i := 0; i < b.N; i++ {
            f3(s)
        }
    }

    func Benchmark4(b *testing.B) {
        for i := 0; i < b.N; i++ {
            f4(s)
        }
    }
```

在命令行中运行命令：`go test count_test.go -bench ".*"`，输出如下内容：

`
testing: warning: no tests to run
PASS
Benchmark1	10000000	       118 ns/op
Benchmark2	20000000	        63.7 ns/op
Benchmark3	10000000	       248 ns/op
Benchmark4	20000000	        59.9 ns/op
ok  	command-line-arguments	6.635s
`
从测试结果来看，速度最快的是 `utf8.RuneCountInString()`。

----

另：大家应该都知道 MySQL >= 5.5.3版本才支持 emoji 表情，如果不做处理直接保存的话，会发生MySQL 异常：`Error 1366: Incorrect string value: '\xF0\x9F\x98\x84\xF0\x9F...' for column`
如果要让 DB 直接支持，只需要升级 MySQL 版本，然后字符集设置为`utf8m4`，注意：对于旧表必须将字段的字符也做`utf8m4`更改才能生效。

如果 MySQL 升级比较麻烦，那么我们还可以通过过滤 emoji 表情，不支持它的存储来达到正常使用的效果。

```go
// 过滤 emoji 表情
func FilterEmoji(content string) string {
	new_content := ""
	for _, value := range content {
		_, size := utf8.DecodeRuneInString(string(value))
		if size <= 3 {
			new_content += string(value)
		}
	}
	return new_content
}
```

