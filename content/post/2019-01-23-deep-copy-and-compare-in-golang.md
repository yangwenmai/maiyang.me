---
title: 'Go 中 map 的 deep copy 和 compare'
keywords: golang, go, map, deep, copy
date: 2019-01-23T17:00:00+08:00
lastmod: 2019-01-23T17:00:00+08:00
draft: false
description: 'Go 中 map 的 deep copy 和 compare'
categories: [golang]
tags: [golang, go, map, deep, copy]
comments: true
author: mai
---

## deepcopy map in golang

```golang
func DeepCopy(value map[string]interface{}) map[string]interface{} {
	newMap := make(map[string]interface{})
	for k, v := range value {
		newMap[k] = v
	}

	return newMap
}

func DeepCopy2(dst, src map[string]interface{}) error {
	var buf bytes.Buffer
	if err := gob.NewEncoder(&buf).Encode(src); err != nil {
		return err
	}
	return gob.NewDecoder(bytes.NewBuffer(buf.Bytes())).Decode(dst)
}
```

以上实现都是不满足条件的。

```golang
package mapx

import (
	"fmt"
	"reflect"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestDeepCopy(t *testing.T) {
	m1 := map[string]interface{}{}
	m1["1"] = "1"
	m1["2"] = 2
	mmm:=map[string]interface{}{"x": "2", "y": 3}
	m1["3"] = mmm
	m1["4"] = &mi{mis: "f"}
	m1["5"] = mi{mis: "f"}
	m1["6"] = mi{mis: 2}
	mis := []*mi{}
	mis = append(mis, &mi{mis: "2"})
	mis = append(mis, &mi{mis: 3})
	m1["7"] = mis
	mis2 := []mi{}
	mis2 = append(mis2, mi{mis: "2"})
	mis2 = append(mis2, mi{mis: 3.3})
	m1["8"] = mis2

	// m2 := map[string]interface{}{}
	// DeepCopy2(m1, m2)
	m2:=DeepCopy(m1)
	mmm["x"]="3"
	t.Log(m1)
	t.Log(m2)
	p1 := fmt.Sprintf("%p", m1)
	p2 := fmt.Sprintf("%p", m2)
	assert.NotEqual(t, p1, p2)

	assert.EqualValues(t, m1, m2)
	assert.True(t, reflect.DeepEqual(m1, m2))
}

type mi struct {
	mis interface{}
}
```

### reflect.DeepEqual

```golang
// Map values are deeply equal when all of the following are true:
// they are both nil or both non-nil, they have the same length,
// and either they are the same map object or their corresponding keys  (matched using Go equality) map to deeply equal values.
```

## map 的比较

是否可以直接使用 != 呢？

直接比较两个 map 会报错：`Invalid operation: m1 != m2 (operator != not defined on map[string]string)`

[https://golang.org/ref/spec#Type_identity](https://golang.org/ref/spec#Type_identity) 中有一段话：`Two map types are identical if they have identical key and element types.`

[https://golang.org/ref/spec#Comparison_operators](https://golang.org/ref/spec#Comparison_operators) 中有一段话：`Slice, map, and function values are not comparable.`

## 扩展阅读

1. [Golang deep variable equality test that returns human-readable differences](https://github.com/go-test/deep.git)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。


