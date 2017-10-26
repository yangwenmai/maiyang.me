---
layout: post
title: 'Golang 的十二条最佳实践'
keywords: golang, go, practice
date: 2017-10-21 09:35
description: '本文是对 Golang 十二条最佳实践的解读。'
categories: [Golang]
tags: [Go, Golang, BestPractices]
comments: true
group: archive
icon: file-o
---

* content
{:toc}

    本文是对十二条 Golang 最佳实践的解读。

----

1. 首先避免嵌套处理错误
2. 尽可能避免重复
3. 重要的代码先行
4. 注释代码
5. 短即是好/越短越好
6. 具有多个文件的包
7. 让你的包能够通过 "go get" 得到
8. 了解你自己的需求
9. 保持包的独立
10. 避免在你的方法中内置并发
11. 使用 goroutines 来管理状态
12. 避免 goroutine 泄漏

<!--more-->

### 最佳实践 ###

**From Wikipedia**

>"A best practice is a method or technique that has been generally accepted as superior to any alternatives because it produces results that are superior to those achieved by other means or because it has become a standard way of doing things, e.g., a standard way of complying with legal or ethical requirements."

**编写 Go 代码的方法是：**

- 简单
- 可读
- 可维护

![go](http://golang.org/doc/gopher/gopherbw.png)

## 详解十二条最佳代码实战 ##

### 首先避免嵌套处理错误 ###

```go
type Gopher struct {
    Name     string
    AgeYears int
}

func (g *Gopher) WriteTo(w io.Writer) (size int64, err error) {
    err = binary.Write(w, binary.LittleEndian, int32(len(g.Name)))
    if err == nil {
        size += 4
        var n int
        n, err = w.Write([]byte(g.Name))
        size += int64(n)
        if err == nil {
            err = binary.Write(w, binary.LittleEndian, int64(g.AgeYears))
            if err == nil {
                size += 4
            }
            return
        }
        return
    }
    return
}
```

优化代码如下：（首先避免嵌套处理错误）

```go
func (g *Gopher) WriteTo(w io.Writer) (size int64, err error) {
    err = binary.Write(w, binary.LittleEndian, int32(len(g.Name)))
    if err != nil {
        return
    }
    size += 4
    n, err := w.Write([]byte(g.Name))
    size += int64(n)
    if err != nil {
        return
    }
    err = binary.Write(w, binary.LittleEndian, int64(g.AgeYears))
    if err == nil {
        size += 4
    }
    return
}
```

较少的嵌套意味着读者的认知难度就减少，更容易读懂代码。

### 尽可能避免重复 ###

```go
type binWriter struct {
    w    io.Writer
    size int64
    err  error
}

// Write writes a value to the provided writer in little endian form.
func (w *binWriter) Write(v interface{}) {
    if w.err != nil {
        return
    }
    if w.err = binary.Write(w.w, binary.LittleEndian, v); w.err == nil {
        w.size += int64(binary.Size(v))
    }
}
```

用 binWriter

```go
func (g *Gopher) WriteTo(w io.Writer) (int64, error) {
    bw := &binWriter{w: w}
    bw.Write(int32(len(g.Name)))
    bw.Write([]byte(g.Name))
    bw.Write(int64(g.AgeYears))
    return bw.size, bw.err
}
```

用 switch 处理特殊情况

```go

func (w *binWriter) Write(v interface{}) {
    if w.err != nil {
        return
    }
    switch v.(type) {
    case string:
        s := v.(string)
        w.Write(int32(len(s)))
        w.Write([]byte(s))
    case int:
        i := v.(int)
        w.Write(int64(i))
    default:
        if w.err = binary.Write(w.w, binary.LittleEndian, v); w.err == nil {
            w.size += int64(binary.Size(v))
        }
    }
}

func (g *Gopher) WriteTo(w io.Writer) (int64, error) {
    bw := &binWriter{w: w}
    bw.Write(g.Name)
    bw.Write(g.AgeYears)
    return bw.size, bw.err
}
```

在switch中加入简短的变量声明 **v := v.(type) v:=v.(string)

```go
func (w *binWriter) Write(v interface{}) {
    if w.err != nil {
        return
    }
    switch x := v.(type) {
    case string:
        w.Write(int32(len(x)))
        w.Write([]byte(x))
    case int:
        w.Write(int64(x))
    default:
        if w.err = binary.Write(w.w, binary.LittleEndian, v); w.err == nil {
            w.size += int64(binary.Size(v))
        }
    }
}
```

写任何东西或什么都不写

```go
type binWriter struct {
    w   io.Writer
    buf bytes.Buffer
    err error
}

// Write writes a value to the provided writer in little endian form.
func (w *binWriter) Write(v interface{}) {
    if w.err != nil {
        return
    }
    switch x := v.(type) {
    case string:
        w.Write(int32(len(x)))
        w.Write([]byte(x))
    case int:
        w.Write(int64(x))
    default:
        w.err = binary.Write(&w.buf, binary.LittleEndian, v)
    }
}

// Flush writes any pending values into the writer if no error has occurred.
// If an error has occurred, earlier or with a write by Flush, the error is
// returned.
func (w *binWriter) Flush() (int64, error) {
    if w.err != nil {
        return 0, w.err
    }
    return w.buf.WriteTo(w.w)
}

func (g *Gopher) WriteTo(w io.Writer) (int64, error) {
    bw := &binWriter{w: w}
    bw.Write(g.Name)
    bw.Write(g.AgeYears)
    return bw.Flush()
}
```

函数适配器

```go
func init() {
    http.HandleFunc("/", handler)
}

func handler(w http.ResponseWriter, r *http.Request) {
    err := doThis()
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        log.Printf("handling %q: %v", r.RequestURI, err)
        return
    }

    err = doThat()
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        log.Printf("handling %q: %v", r.RequestURI, err)
        return
    }
}
```

优化代码

```go
func init() {
    http.HandleFunc("/", errorHandler(betterHandler))
}

func errorHandler(f func(http.ResponseWriter, *http.Request) error) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        err := f(w, r)
        if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            log.Printf("handling %q: %v", r.RequestURI, err)
        }
    }
}

func betterHandler(w http.ResponseWriter, r *http.Request) error {
    if err := doThis(); err != nil {
        return fmt.Errorf("doing this: %v", err)
    }

    if err := doThat(); err != nil {
        return fmt.Errorf("doing that: %v", err)
    }
    return nil
}
```

### 重要的代码先行 ###

License 信息，构建标签，包说明。
导入声明，相关组用空行分隔。

```go
import (
    "fmt"
    "io"
    "log"

    "golang.org/x/net/websocket"
)
```

剩下的部分，是以重要的类型声明开始，帮助方法或类型结束。

### 注释代码 ###

以 go 官方建议来做就好了。

```go
// Package playground registers an HTTP handler at "/compile" that
// proxies requests to the golang.org playground service.
package playground
```

在 godoc 中导出显示的标识符，在文档中能正确显示。

```go
// Author represents the person who wrote and/or is presenting the document.
type Author struct {
    Elem []Elem
}

// TextElem returns the first text elements of the author details.
// This is used to display the author' name, job title, and company
// without the contact details.
func (p *Author) TextElem() (elems []Elem) {
```

[http://godoc.org/code.google.com/p/go.talks/pkg/present#Author](http://godoc.org/code.google.com/p/go.talks/pkg/present#Author)

### 短即是好/越短越好 ###

或者说至少长不一定好。

尝试去找出最短的名字来表示。

  - Prefer MarshalIndent to MarshalWithIndentation.

不要忘记包名称将出现在您选择的标识符之前。

  - 在 encoding/json 里面，我们看到的是 Encoder 类型, 而不是 JSONEncoder.
  - 使用时是这样的 json.Encoder.


### 具有多个文件的包 ###

你应该将拆一个包到多个文件吗？

避免长文件。
>标准包 `net/http` 包含了 47 个文件 15734 行代码。

分成代码和测试。

>`net/http/cookie.go` and `net/http/cookie_test.go` 都是 http 包的一部分。

>测试代码仅仅只在测试时才被编译。

拆分包的文档

>当我们在一个包里面有超过1个文件的时候，惯例是创建一个 `doc.go` 包含包的文档。

### 让你的包能够通过 "go get" 得到 ###

一些包可能是可重用的，其他的不一定是。

一些定义的网络协议包可以在一个定义时被重用，但是一些可执行命令可能就不会。

![cmd](https://talks.golang.org/2013/bestpractices/cmd.png)

[https://github.com/bradfitz/camlistore](https://github.com/bradfitz/camlistore)

### 了解你自己的需求 ###

我们继续使用 Gopher 类型

```go
type Gopher struct {
    Name     string
    AgeYears int
}
```

We could define this method
我们可以定义这个方法

```go
func (g *Gopher) WriteToFile(f *os.File) (int64, error) {
```

但是使用一个具体类型的时候这个代码难以测试，所以需要使用接口。

```go
func (g *Gopher) WriteToReadWriter(rw io.ReadWriter) (int64, error) {
```

自从我们用了接口，我们只应该询问我们需要的方法。

```go
func (g *Gopher) WriteToWriter(f io.Writer) (int64, error) {
```

### 保持包的独立 ###

```
import (
    "golang.org/x/talks/2013/bestpractices/funcdraw/drawer"
    "golang.org/x/talks/2013/bestpractices/funcdraw/parser"
)

    // Parse the text into an executable function.
    f, err := parser.Parse(text)
    if err != nil {
        log.Fatalf("parse %q: %v", text, err)
    }

    // Create an image plotting the function.
    m := drawer.Draw(f, *width, *height, *xmin, *xmax)

    // Encode the image into the standard output.
    err = png.Encode(os.Stdout, m)
    if err != nil {
        log.Fatalf("encode image: %v", err)
    }
```

parsing

```go
type ParsedFunc struct {
    text string
    eval func(float64) float64
}

func Parse(text string) (*ParsedFunc, error) {
    f, err := parse(text)
    if err != nil {
        return nil, err
    }
    return &ParsedFunc{text: text, eval: f}, nil
}

func (f *ParsedFunc) Eval(x float64) float64 { return f.eval(x) }
func (f *ParsedFunc) String() string         { return f.text }
```

```go
import (
    "image"

    "golang.org/x/talks/2013/bestpractices/funcdraw/parser"
)

// Draw draws an image showing a rendering of the passed ParsedFunc.
func DrawParsedFunc(f parser.ParsedFunc) image.Image {
```

用接口避免依赖

```go
import "image"

// Function represent a drawable mathematical function.
type Function interface {
    Eval(float64) float64
}

// Draw draws an image showing a rendering of the passed Function.
func Draw(f Function) image.Image {
```

测试

用接口替代具体的类型更容易测试。

```go
package drawer

import (
    "math"
    "testing"
)

type TestFunc func(float64) float64

func (f TestFunc) Eval(x float64) float64 { return f(x) }

var (
    ident = TestFunc(func(x float64) float64 { return x })
    sin   = TestFunc(math.Sin)
)

func TestDraw_Ident(t *testing.T) {
    m := Draw(ident)
    // Verify obtained image.
```

### 避免在你的方法中内置并发 ###

```go
func doConcurrently(job string, err chan error) {
    go func() {
        fmt.Println("doing job", job)
        time.Sleep(1 * time.Second)
        err <- errors.New("something went wrong!")
    }()
}

func main() {
    jobs := []string{"one", "two", "three"}

    errc := make(chan error)
    for _, job := range jobs {
        doConcurrently(job, errc)
    }
    for _ = range jobs {
        if err := <-errc; err != nil {
            fmt.Println(err)
        }
    }
}

// 优化后的代码
func do(job string) error {
    fmt.Println("doing job", job)
    time.Sleep(1 * time.Second)
    return errors.New("something went wrong!")
}

func main() {
    jobs := []string{"one", "two", "three"}

    errc := make(chan error)
    for _, job := range jobs {
        go func(job string) {
            errc <- do(job)
        }(job)
    }
    for _ = range jobs {
        if err := <-errc; err != nil {
            fmt.Println(err)
        }
    }
}
```


### 使用 goroutines 来管理状态 ###

使用 chan 或带 chan 的 struct 来与 goroutine 通讯。

```go
type Server struct{ quit chan bool }

func NewServer() *Server {
    s := &Server{make(chan bool)}
    go s.run()
    return s
}

func (s *Server) run() {
    for {
        select {
        case <-s.quit:
            fmt.Println("finishing task")
            time.Sleep(time.Second)
            fmt.Println("task done")
            s.quit <- true
            return
        case <-time.After(time.Second):
            fmt.Println("running task")
        }
    }
}

func (s *Server) Stop() {
    fmt.Println("server stopping")
    s.quit <- true
    <-s.quit
    fmt.Println("server stopped")
}

func main() {
    s := NewServer()
    time.Sleep(2 * time.Second)
    s.Stop()
}
```

### 避免 goroutine 泄漏 ###

```go
func sendMsg(msg, addr string) error {
    conn, err := net.Dial("tcp", addr)
    if err != nil {
        return err
    }
    defer conn.Close()
    _, err = fmt.Fprint(conn, msg)
    return err
}

func broadcastMsg(msg string, addrs []string) error {
    errc := make(chan error)
    for _, addr := range addrs {
        go func(addr string) {
            errc <- sendMsg(msg, addr)
            fmt.Println("done")
        }(addr)
    }

    for _ = range addrs {
        if err := <-errc; err != nil {
            return err
        }
    }
    return nil
}

func main() {
    addr := []string{"localhost:8080", "http://google.com"}
    err := broadcastMsg("hi", addr)

    time.Sleep(time.Second)

    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println("everything went fine")
}
```

- 在 chan 写的时候 goroutine 会被阻塞。
- goroutine 处理了一个到 chan 的关联。
- chan 永远不会被 gc 回收。

优化

```go
func broadcastMsg(msg string, addrs []string) error {
    errc := make(chan error, len(addrs))
    for _, addr := range addrs {
        go func(addr string) {
            errc <- sendMsg(msg, addr)
            fmt.Println("done")
        }(addr)
    }

    for _ = range addrs {
        if err := <-errc; err != nil {
            return err
        }
    }
    return nil
}
```

如果我们不能预估 channel 的容量怎么办？

```go
func broadcastMsg(msg string, addrs []string) error {
    errc := make(chan error)
    quit := make(chan struct{})

    defer close(quit)

    for _, addr := range addrs {
        go func(addr string) {
            select {
            case errc <- sendMsg(msg, addr):
                fmt.Println("done")
            case <-quit:
                fmt.Println("quit")
            }
        }(addr)
    }

    for _ = range addrs {
        if err := <-errc; err != nil {
            return err
        }
    }
    return nil
}
```

## 参考资料 ##

1. https://talks.golang.org/2013/bestpractices.slide

----

**茶歇驿站**

一个让你可以在茶歇之余，停下来看一看，里面的内容或许对你有一些帮助。

这里的内容主要是团队管理，个人管理，后台技术相关，其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)
