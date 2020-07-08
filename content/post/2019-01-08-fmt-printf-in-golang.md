---
title: 'Go 中的 fmt 格式化'
keywords: golang, fmt, print, format
date: 2019-01-08T17:00:00+08:00
lastmod: 2019-01-08T17:00:00+08:00
draft: false
description: 'Go 中的 fmt 格式化'
categories: [golang]
tags: [golang, fmt, print, format]
comments: true
author: mai
---

## fmt 概览

fmt 包实现了格式化的 I/O，其功能类似于 C 的 printf 和 scanf。格式化动作 'verbs' 源自 C，但更简单。

## verbs 有哪些？

### 通用

```shell
%v	值的默认格式表示
%+v	类似 `%v` ，但输出结构体时会添加字段名
%#v	值的 Go 语法表示
%T	值的类型的 Go 语法表示
%%	百分号
```

### 布尔值

```shell
%t	单词 true 或 false
```

### 整数

```shell
%b	表示为二进制
%c	该值对应的 unicode 码值
%d	表示为十进制
%o	表示为八进制
%q	该值对应的单引号括起来的 Go 语法字符字面值，必要时会采用安全的转义表示
%x	表示为十六进制，使用 a-f
%X	表示为十六进制，使用 A-F
%U	表示为 Unicode 格式：U+1234，等价于 "U+%04X"
```

### 浮点数与复数的两个组分

```shell
%b	无小数部分、二进制指数的科学计数法，如 `-123456p-78`；参见 `strconv.FormatFloat`
%e	科学计数法，如 `-1234.456e+78`
%E	科学计数法，如 `-1234.456E+78`
%f	有小数部分但无指数部分，如 `123.456`
%F	等价于 %f
%g	根据实际情况采用%e或%f格式（以获得更简洁、准确的输出）
%G	根据实际情况采用%E或%F格式（以获得更简洁、准确的输出）
```

### 字符串和 `[]byte`

```shell
%s	直接输出字符串或者 `[]byte`
%q	该值对应的双引号括起来的 Go 语法字符串字面值，必要时会采用安全的转义表示
%x	每个字节用两字符十六进制数表示（使用 a-f）
%X	每个字节用两字符十六进制数表示（使用 A-F）    
```

### 指针

```shell
%p	表示为十六进制，并加上前导的 `0x`
```

### 其他

没有 %u 。整数如果是无符号类型自然输出也是无符号的。类似的，也没有必要指定操作数的尺寸（int8，int64）。

### 精度

宽度通过一个紧跟在百分号后面的十进制数指定，如果未指定宽度，则表示值时除必需之外不作填充。精度通过（可选的）宽度后跟点号后跟的十进制数指定。如果未指定精度，会使用默认精度；如果点号后没有跟数字，表示精度为 0。举例如下：

```shell
%f:    默认宽度，默认精度
%9f    宽度 9，默认精度
%.2f   默认宽度，精度 2
%9.2f  宽度 9，精度 2
%9.f   宽度 9，精度 0
```

宽度和精度格式化控制的是Unicode码值的数量（不同于C的printf，它的这两个因数指的是字节的数量）。两者任一个或两个都可以使用'*'号取代，此时它们的值将被对应的参数（按'*'号和verb出现的顺序，即控制其值的参数会出现在要表示的值前面）控制，这个操作数必须是int类型。

对于大多数类型的值，宽度是输出字符数目的最小数量，如果必要会用空格填充。对于字符串，精度是输出字符数目的最大数量，如果必要会截断字符串。

对于整数，宽度和精度都设置输出总长度。采用精度时表示右对齐并用0填充，而宽度默认表示用空格填充。

对于浮点数，宽度设置输出总长度；精度设置小数部分长度（如果有的话），除了%g和%G，此时精度设置总的数字个数。例如，对数字123.45，格式%6.2f 输出123.45；格式%.4g输出123.5。%e和%f的默认精度是6，%g的默认精度是可以将该值区分出来需要的最小数字个数。

对复数，宽度和精度会分别用于实部和虚部，结果用小括号包裹。因此%f用于1.2+3.4i输出(1.200000+3.400000i)。

其它 flag：

```shell
'+'	总是输出数值的正负号；对%q（%+q）会生成全部是ASCII字符的输出（通过转义）；
' '	对数值，正数前加空格而负数前加负号；
'-'	在输出右边填充空白而不是默认的左边（即从默认的右对齐切换为左对齐）；
'#'	切换格式：
  	八进制数前加0（%#o），十六进制数前加0x（%#x）或0X（%#X），指针去掉前面的0x（%#p）；
 	对%q（%#q），如果strconv.CanBackquote返回真会输出反引号括起来的未转义字符串；
 	对%U（%#U），输出Unicode格式后，如字符可打印，还会输出空格和单引号括起来的go字面值；
  	对字符串采用%x或%X时（% x或% X）会给各打印的字节之间加空格；
'0'	使用0而不是空格填充，对于数值类型会把填充的0放在正负号后面；
```

verb 会忽略不支持的 flag。例如，因为没有十进制切换模式，所以 %#d 和 %d 的输出是相同的。

对每一个类似 Printf 的函数，都有对应的 Print 型函数，该函数不接受格式字符串，就效果上等价于对每一个参数都是用 verb %v。另一个变体 Println 型函数会在各个操作数的输出之间加空格并在最后换行。

不管 verb 如何，如果操作数是一个接口值，那么会使用接口内部保管的值，而不是接口，因此：

```golang
var i interface{} = 23
fmt.Printf("%v\n", i)
```

会输出23。

除了 verb %T 和 %p 之外；对实现了特定接口的操作数会考虑采用特殊的格式化技巧。按应用优先级如下：

1. 如果操作数实现了Formatter接口，会调用该接口的方法。Formatter提供了格式化的控制。

2. 如果verb %v配合flag #使用（%#v），且操作数实现了GoStringer接口，会调用该接口。

如果操作数满足如下两条任一条，对于%s、%q、%v、%x、%X五个verb，将考虑：

3. 如果操作数实现了error接口，Error方法会用来生成字符串，随后将按给出的flag（如果有）和verb格式化。

4. 如果操作数具有String方法，这个方法将被用来生成字符串，然后将按给出的flag（如果有）和verb格式化。

复合类型的操作数，如切片和结构体，格式化动作verb递归地应用于其每一个成员，而不是作为整体一个操作数使用。因此%q会将[]string的每一个成员括起来，%6.2f会控制浮点数组的每一个元素的格式化。

为了避免可能出现的无穷递归，如：

```golang
type X string
func (x X) String() string { return Sprintf("<%s>", x) }
```

应在递归之前转换值的类型：

```golang
func (x X) String() string { return Sprintf("<%s>", string(x)) }
```

### 显式指定参数索引

在Printf、Sprintf、Fprintf三个函数中，默认的行为是对每一个格式化verb依次对应调用时成功传递进来的参数。但是，紧跟在verb之前的[n]符号表示应格式化第n个参数（索引从1开始）。同样的在 '\*' 之前的[n]符号表示采用第n个参数的值作为宽度或精度。在处理完方括号表达式[n]后，除非另有指示，会接着处理参数 n+1，n+2……（就是说移动了当前处理位置）。例如：

```golang
fmt.Sprintf("%[2]d %[1]d\n", 11, 22)
```
会生成"22 11"，而：

`fmt.Sprintf("%[3]*.[2]*[1]f", 12.0, 2, 6),` 等价于： `fmt.Sprintf("%6.2f", 12.0),`

会生成" 12.00"。因为显式的索引会影响随后的verb，这种符号可以通过重设索引用于多次打印同一个值：

```golang
fmt.Sprintf("%d %d %#[1]x %#x", 16, 17)
```
会生成"16 17 0x10 0x11"

### 格式化错误：

如果给某个verb提供了非法的参数，如给%d提供了一个字符串，生成的字符串会包含该问题的描述，如下所例：

```shell
错误的类型或未知的verb：%!verb(type=value)
	Printf("%d", hi):          %!d(string=hi)
太多参数（采用索引时会失效）：%!(EXTRA type=value)
	Printf("hi", "guys"):      hi%!(EXTRA string=guys)
太少参数: %!verb(MISSING)
	Printf("hi%d"):            hi %!d(MISSING)
宽度/精度不是整数值：%!(BADWIDTH) or %!(BADPREC)
	Printf("%*s", 4.5, "hi"):  %!(BADWIDTH)hi
	Printf("%.*s", 4.5, "hi"): %!(BADPREC)hi
没有索引指向的参数：%!(BADINDEX)
	Printf("%*[2]d", 7):       %!d(BADINDEX)
	Printf("%.[2]d", 7):       %!d(BADINDEX)
```

所有的错误都以字符串"%!"开始，有时会后跟单个字符（verb标识符），并以加小括弧的描述结束。

如果被print系列函数调用时，Error或String方法触发了panic，fmt包会根据panic重建错误信息，用一个字符串说明该panic经过了fmt包。例如，一个String方法调用了panic("bad")，生成的格式化信息差不多是这样的：

```shell
%!s(PANIC=bad)
```

%!s指示表示错误（panic）出现时的使用的verb。

## Scanning

一系列类似的函数可以扫描格式化文本以生成值。

Scan、Scanf和Scanln从标准输入os.Stdin读取文本；Fscan、Fscanf、Fscanln从指定的io.Reader接口读取文本；Sscan、Sscanf、Sscanln从一个参数字符串读取文本。

Scanln、Fscanln、Sscanln会在读取到换行时停止，并要求一次提供一行所有条目；Scanf、Fscanf、Sscanf只有在格式化文本末端有换行时会读取到换行为止；其他函数会将换行视为空白。

Scanf、Fscanf、Sscanf会根据格式字符串解析参数，类似Printf。例如%x会读取一个十六进制的整数，%v会按对应值的默认格式读取。格式规则类似Printf，有如下区别：

```shell
%p 未实现
%T 未实现
%e %E %f %F %g %G 效果相同，用于读取浮点数或复数类型
%s %v 用在字符串时会读取空白分隔的一个片段
flag '#'和'+' 未实现
```

在无格式化 verb 或 verb %v 下扫描整数时会接受常用的进制设置前缀0（八进制）和0x（十六进制）。

宽度会在输入文本中被使用（%5s表示最多读取5个rune来生成一个字符串），但没有使用精度的语法（没有%5.2f，只有%5f）。

当使用格式字符串进行扫描时，多个连续的空白字符（除了换行符）在输出和输出中都被等价于一个空白符。在此前提下，格式字符串中的文本必须匹配输入的文本；如果不匹配扫描会中止，函数的整数返回值说明已经扫描并填写的参数个数。

在所有的扫描函数里，\r\n都被视为\n。

在所有的扫描函数里，如果一个操作数实现了Scan方法（或者说，它实现了Scanner接口），将会使用该接口为该操作数扫描文本。另外，如果如果扫描到（准备填写）的参数比提供的参数个数少，会返回一个错误。

提供的所有参数必须为指针或者实现了Scanner接口。注意：Fscan等函数可能会在返回前多读取一个rune，这导致多次调用这些函数时可能会跳过部分输入。只有在输入里各值之间没有空白时，会出现问题。如果提供给Fscan等函数的io.Reader接口实现了ReadRune方法，将使用该方法读取字符。如果该io.Reader接口还实现了UnreadRune方法，将是使用该方法保存字符，这样可以使成功执行的Fscan等函数不会丢失数据。如果要给一个没有这两个方法的io.Reader接口提供这两个方法，使用bufio.NewReader。

## go example

```golang
// Go offers excellent support for string formatting in
// the `printf` tradition. Here are some examples of
// common string formatting tasks.

package main

import "fmt"
import "os"

type point struct {
	x, y int
}

func main() {

	// Go offers several printing "verbs" designed to
	// format general Go values. For example, this prints
	// an instance of our `point` struct.
	p := point{1, 2}
	fmt.Printf("%v\n", p)

	// If the value is a struct, the `%+v` variant will
	// include the struct's field names.
	fmt.Printf("%+v\n", p)

	// The `%#v` variant prints a Go syntax representation
	// of the value, i.e. the source code snippet that
	// would produce that value.
	fmt.Printf("%#v\n", p)

	// To print the type of a value, use `%T`.
	fmt.Printf("%T\n", p)

	// Formatting booleans is straight-forward.
	fmt.Printf("%t\n", true)

	// There are many options for formatting integers.
	// Use `%d` for standard, base-10 formatting.
	fmt.Printf("%d\n", 123)

	// This prints a binary representation.
	fmt.Printf("%b\n", 14)

	// This prints the character corresponding to the
	// given integer.
	fmt.Printf("%c\n", 33)

	// `%x` provides hex encoding.
	fmt.Printf("%x\n", 456)

	// There are also several formatting options for
	// floats. For basic decimal formatting use `%f`.
	fmt.Printf("%f\n", 78.9)

	// `%e` and `%E` format the float in (slightly
	// different versions of) scientific notation.
	fmt.Printf("%e\n", 123400000.0)
	fmt.Printf("%E\n", 123400000.0)

	// For basic string printing use `%s`.
	fmt.Printf("%s\n", "\"string\"")

	// To double-quote strings as in Go source, use `%q`.
	fmt.Printf("%q\n", "\"string\"")

	// As with integers seen earlier, `%x` renders
	// the string in base-16, with two output characters
	// per byte of input.
	fmt.Printf("%x\n", "hex this")

	// To print a representation of a pointer, use `%p`.
	fmt.Printf("%p\n", &p)

	// When formatting numbers you will often want to
	// control the width and precision of the resulting
	// figure. To specify the width of an integer, use a
	// number after the `%` in the verb. By default the
	// result will be right-justified and padded with
	// spaces.
	fmt.Printf("|%6d|%6d|\n", 12, 345)

	// You can also specify the width of printed floats,
	// though usually you'll also want to restrict the
	// decimal precision at the same time with the
	// width.precision syntax.
	fmt.Printf("|%6.2f|%6.2f|\n", 1.2, 3.45)

	// To left-justify, use the `-` flag.
	fmt.Printf("|%-6.2f|%-6.2f|\n", 1.2, 3.45)

	// You may also want to control width when formatting
	// strings, especially to ensure that they align in
	// table-like output. For basic right-justified width.
	fmt.Printf("|%6s|%6s|\n", "foo", "b")

	// To left-justify use the `-` flag as with numbers.
	fmt.Printf("|%-6s|%-6s|\n", "foo", "b")

	// So far we've seen `Printf`, which prints the
	// formatted string to `os.Stdout`. `Sprintf` formats
	// and returns a string without printing it anywhere.
	s := fmt.Sprintf("a %s", "string")
	fmt.Println(s)

	// You can format+print to `io.Writers` other than
	// `os.Stdout` using `Fprintf`.
	fmt.Fprintf(os.Stderr, "an %s\n", "error")
}
```

Result:

```shell
$ go run string-formatting.go
{1 2}
{x:1 y:2}
main.point{x:1, y:2}
main.point
true
123
1110
!
1c8
78.900000
1.234000e+08
1.234000E+08
"string"
"\"string\""
6865782074686973
0x42135100
|    12|   345|
|  1.20|  3.45|
|1.20  |3.45  |
|   foo|     b|
|foo   |b     |
a string
an error
```

## 参考资料

1. [fmt 中文文档](https://studygolang.com/pkgdoc)
2. [string-formatting go by example](https://gobyexample.com/string-formatting)
3. [string-formatting go by example 中文](https://gobyexample.xgwang.me/string-formatting.html)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。


