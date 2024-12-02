---
title: background-removal使用教程
tags:
  - 前端
  - npm
  - 抠图
categories:
  - 前端
abbrlink: 9583
date: 2023-11-07 03:29:07
---

该npm包于2023.7发布，能够直接在浏览器中删除图片的背景，无费用与隐私问题。[DEMO](https://img.ly/showcases/cesdk/background-removal/web?utm_medium=project&utm_source=github&utm_campaign=bg-removal)

<!--more-->

## 概述

`@imgly/background-removal`允许开发人员直接在浏览器中无缝地从图像中删除背景。

**特性：**

- **浏览器内执行后台删除**。直接在用户浏览器中执行整个后台删除过程，无需额外的服务器成本，利用本地设备计算能力，完成背景的去除。
- **数据隐私保护**。完全浏览器运行，无需传输到外部服务器。
- **与 IMG.LY 的 CE.SDK 无缝集成**。`@imgly/background-removal`提供与[IMG.LY 的 CE.SDK ](https://img.ly/products/creative-sdk?utm_source=github&utm_medium=project&utm_campaign=bg-removal)的无缝集成，使开发人员能够轻松地将强大的浏览器内图像抠图和背景去除功能合并到他们的项目中。

使用的神经网络（[ONNX 模型](https://onnx.ai/)`@imgly/background-removal`）和 WASM 文件托管在[UNPKG](https://www.unpkg.com/)上，因此库的所有用户都可以轻松下载。如果您想在自己的服务器上托管数据，请参阅自定义资产服务部分。

## 安装

```sh
npm install @imgly/background-removal
```

## 使用

```typescript
import imglyRemoveBackground from "@imgly/background-removal"

let image_src: ImageData | ArrayBuffer | Uint8Array | Blob | URL | string = ...;

imglyRemoveBackground(image_src).then((blob: Blob) => {
  // The result is a blob encoded as PNG. It can be converted to an URL to be used as HTMLImage.src
  const url = URL.createObjectURL(blob);
})
```

第一次运行获取 wasm 和 onnx 模型文件需要一定的时间。所有文件都由浏览器和附加模型缓存进行缓存。

## 高级配置

该库不需要任何配置即可启动，可选参数可以提供对库的更多控制。

```typescript
type Config = {
  publicPath: string; // 模型和wasm文件的公共路径
  debug: bool; // 启用或禁用console输出
  proxyToWorker: bool; // 是否代理计算给webworker. (Default true)
  model: 'small' | 'medium'; // 使用的模型. (Default "medium")
};
```

### 下载的大小与质量

- small（~40MB）：有时会显示伪影。
- medium（～80MB）：默认模型。

### 下载进度监控

首次运行获取必要的数据并存储在浏览器缓存中。由于下载可能需要一些时间，可以选择查看下载进度。

```typescript
let config: Config = {
  progress: (key, current, total) => {
    console.log(`Downloading ${key}: ${current} of ${total}`);
  }
};
```

### 性能

性能在很大程度上取决于可用的功能集。最重要的是，请确保 `SharedArrayBuffer` [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer)可用。由于 `SharedArrayBuffer` 的安全要求，需要设置两个标头来使您的站点与跨源隔离

```typescript
'Cross-Origin-Opener-Policy': 'same-origin',
'Cross-Origin-Embedder-Policy': 'require-corp'
```

### 定制资源

目前，wasm 和 onnx 神经网络通过 unpkg 提供服务。对于生产使用，我们建议您自行托管它们。因此，请将所有 .wasm 和 .onnx 文件复制到您的公共路径 $PUBLIC_PATH，并重新配置库。

```bash
cp node_modules/@imgly/background-removal/dist/*.wasm $PUBLIC_PATH
cp node_modules/@imgly/background-removal/dist/*.onnx $PUBLIC_PATH
```

然后，在代码中可以导入 `@imgly/background-removal` 库，配置并使用它来移除背景。参考以下示例：

```javascript
import imglyRemoveBackground, {Config} from "@imgly/background-removal"

const public_path = "https://example.com/assets/"; // assets 被提供的路径

let config: Config = {
  publicPath: public_path, // wasm 文件的路径
};

let image_src: ImageData | ArrayBuffer | Uint8Array | Blob | URL | string = ...;

imglyRemoveBackground(image_src, config).then((blob: Blob) => {
  // 结果是以 PNG 编码的 Blob。
  // 它可以转换为 URL，用作 HTMLImage.src
  const url = URL.createObjectURL(blob);
});
```

这段代码的作用是将 `@imgly/background-removal` 库的 wasm 和 onnx 文件从 unpkg 复制到您的公共路径，并配置库以使用这些文件来执行背景移除操作。请确保替换 `public_path` 变量为您自己的实际公共路径。

### 调试输出

启用调试输出并记录到控制台

```typescript
let config: Config = {
  debug: true
};
```

### 跨域资源共享（CORS）

如果您遇到 CORS 问题，您可能需要通过以下方式将其他参数传递给 fetch 函数

```typescript
let config: Config = {
  fetchArgs: {
    mode: 'no-cors'
  }
};
```

## 它们给谁用？

`@imgly/background-removal`适合需要直接在浏览器中高效且经济高效地去除背景的开发人员和项目，包括但不限于：

- 需要实时去除产品图像背景的**电子商务应用程序**。
- 需要背景去除功能以增强用户体验的**图像编辑应用程序**。
- **基于网络的图形设计工具**，旨在通过浏览器内背景删除来简化创作过程。

无论您是专业开发人员还是业余爱好者，`@imgly/background-removal`都可以让您轻松交付令人印象深刻的应用程序和服务。
