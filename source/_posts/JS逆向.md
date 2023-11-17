---
title: JS逆向
abbrlink: 32357
date: 2023-11-13 12:55:36
tags:
- JS
- 逆向
categories:
- 前端
- JS
---

## 反爬虫

限制爬虫程序访问服务器资源和获取数据的行为，包括不限于请求限制、拒绝响应、客户端身份验证、文本混淆、动态渲染。

<!--more-->

## 浏览器五个组件与三个解释器

用户界面：包括地址栏、前进、后退、页面主窗口等

浏览器引擎：用户操作传递给渲染引擎

渲染引擎：调用解释器解释HTML、CSS、JS代码，重排页面

数据存储：本地存储体积较小的数据，cookie、storage等

网络：自动加载HTML文档中需要的其他资源

解释器：CSS解释器、HTML解释器、Javascript解释器

## PyExecJS

安装Pyexecjs

```bash
pip install pyexecjs
```

检测环境

```python
import execjs
print(execjs.get().name)
# Node.js (V8)
```

举个例子

```python
# 定义一个简单的 JavaScript 函数
js_code = """
function add(a, b) {
    return a + b;
}
"""

# 在 JavaScript 运行时中执行 JavaScript 代码
context = execjs.compile(js_code)

# 调用 JavaScript 函数并获取结果
result = context.call("add", 3, 4)

# 打印结果
print(result)
```

特殊编码的输入输出可以用Base64编码

## 使用NodeJS与浏览器的问题

NodeJS没有window对象，需要自己创建空对象，或者指向global

window.btoa在nodeJS不存在，可以使用Buffer.from('xxx').toString('base64')转化

## Hook

使用hook重新执行函数，寻找到JS加解密入口

```javascript
function hook(object, attr){
  var func = object[attr];
  object[attr] = function(){
    console.log('xxx');
    return func.apply(object, arguments)
  }
}

//eg:
hook(window, 'btoa')
```

