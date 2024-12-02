---
title: Mac or iPhone or iPad
tags:
  - Mac
categories:
  - Mac
abbrlink: 51317
date: 2024-02-24 15:27:38
---
记录Mac/iPhone/iPad实用操作

<!--more-->

### Mac快速复制文件夹路径

选中文件夹，使用option + command + c复制文件夹路径， 然后command+v 粘贴即可

### Mac随航功能和通用控制冲突

前往“系统偏好设置”>“显示器”>“通用控制”，然后取消勾选“拖过屏幕边缘来连接附近的 Mac 或 iPad”以及“自动重新连接附近的任何Mac 或 iPad”选项以防止在你不需要的情况下自动启用通用控制功能。后续如需要使用通用控制功能，可以从“显示器”设置或者控制中心中手动连接设备。

![img](https://s2.loli.net/2024/12/02/FlAagGH82pN4QKf.png)

### iphone网页创建桌面快捷方式

点击分享->添加到主屏幕

### iPad/iPhone快捷指令自动切换vpn

在使用iPad或者iPhone的软件与服务中，有些软件需要使用VPN，有些软件需要暂时关闭VPN能实现更快的响应速度。发现了一个之前没有使用过的应用叫 **快捷指令** 可以有效解决全部手动打开/关闭VPN的问题。

#### 操作步骤

1. 打开手机的快捷指令软件，打开自动化，点击创建个人自动化

   <img src="https://s2.loli.net/2024/12/02/MjU5qukJxiBZFco.jpg" alt="auto-quick instructions.jpeg" style="zoom:25%;" />

2. 选择当启用app的时候执行连接/断开连接VPN即可，然后关闭运行前询问，点击执行（ps：iphone没有找到设定vpn选项）

   ![IMG_0161](https://s2.loli.net/2024/12/02/T4QPG9Hha2BDOos.png)

### 微信输入法

全角输出英文样式：ｓｊ半角输出英文：sj

切换快捷键：`shift`+`option`+`H`

## 终端

#### npm

`npm view xxx versions` 查看所有版本

##### 更新brew时报错unknown or unsupported macOS version: :dunno (MacOSVersionError) 

使用`brew update-reset`

##### 在vs code中打开zsh终端报错.zshrc:source:107: no such file or directory: .bash_profile

mac终端没有报错但是在vscode终端报错导致环境变量不可用，排查了很久才终于发现是.zshrc中写的不规范，首先`open -e .zshrc`打开配置文件将`source .bash_profile` 改为`source~/.bash_profile`

