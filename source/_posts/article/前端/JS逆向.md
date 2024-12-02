---
title: JS逆向
abbrlink: 32357
date: 2023-11-13 12:55:36
tags:
- JS
- 逆向
categories:
- 前端
---

## 反爬虫

限制爬虫程序访问服务器资源和获取数据的行为，包括不限于请求限制、拒绝响应、客户端身份验证、文本混淆、动态渲染。

<!--more-->

## JS混淆

通过一系列技术手段，使 JS 代码变得难以理解和分析，增加代码的复杂性和混淆度，阻碍逆向工程和代码盗用

### 混淆手段：

- 变量名/函数名的替换，通过将有意义的变量名和函数名替换为随机生成的名称。

  ```javascript
  	function calculateArea(radius) {
      return Math.PI * radius * radius;
    }
    console.log(calculateArea(5));
    */
    function _0x2d8f05(_0x4b083b) {
      return Math.PI * _0x4b083b * _0x4b083b;
    }
    console.log(_0x2d8f05(5));
  ```

- 字符串混淆，将代码中的字符串替换为编码或加密的形式，可以防止字符串被轻易读取。

    ```JavaScript
    // console.log("Hello, world!");
    console.log("\x48\x65\x6c\x6c\x6f\x2c\x20\x77\x6f\x72\x6c\x64\x21");
    ```

- 控制流混淆，改变代码的执行顺序或结构。例如，可以使用条件语句和循环语句来替换简单的赋值操作。

    ```JavaScript
    /*
    let a = 1;
    let b = 2;
    let c = a + b;
    console.log(c);
    */
    let a = 1;
    let b = 2;
    let c;
    if (a === 1) {
      if (b === 2) {
        c = a + b;
      }
    }
    console.log(c);
    ```

- 死代码插入，即在源码插入一些不会被执行的代码。

    ```JavaScript
    /*
    let a = 1;
    let b = 2;
    let c = a + b;
    console.log(c);
    */
    let a = 1;
    let b = 2;
    if (false) {
      console.log(a - b);
    }
    let c = a + b;
    console.log(c);
    ```

- 代码转换，将代码转换为等价的，但更难理解的形式。

    ```JavaScript
    /*
    let a = 1;
    let b = 2;
    let c = a + b;
    console.log(c);
    */
    let a = 1;
    let b = 2;
    let c = a - (-b);
    console.log(c);
    ```

### 常见反调试手段

实现防止他人调试、动态分析自己的代码，我们可以预先在代码中做处理，防止用户调试代码。

- 无限 debugger。比如写个定时器死循环禁止调试。

    ```JavaScript
    var c = new RegExp("1");
    c.toString = function () {
        alert("检测到调试")
        setInterval(function() {
            debugger
        }, 1000);
    }
    console.log(c);
    ```

- 内存耗尽。更隐蔽的反调试手段，代码运行造成的内存占用会越来越大，很快会使浏览器崩溃。

    ```JavaScript
    var startTime = new Date();
    debugger;
    var endTime = new Date();
    var isDev = endTime - startTime > 100;
    var stack = [];
    
    if (isDev) {
        while (true) {
            stack.push(this);
            console.log(stack.length, this);
        }
    }
    ```

- 检测函数、对象属性修改。攻击者在调试的时，经常会把防护的函数删除，或者把检测数据对象进行篡改。可以检测函数内容，在原型上设置禁止修改。

    ```JavaScript
    function eval() {
        [native code]
    }
    
    window.eval = function(str) {
        console.log("[native code]");
    };
    
    window.eval = function(str) {
    };
    
    window.eval.toString = function() {
        return `function eval() {[native code]}`
    };
    
    function hijacked(fun) {
        return "prototype" in fun || fun.toString().replace(/\n|\s/g, "") != "function" + fun.name + "() {[nativecode]}";

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

