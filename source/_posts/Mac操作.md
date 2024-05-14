---
title: Mac操作
tags:
  - Mac
categories:
  - Mac
abbrlink: 51317
date: 2024-02-24 15:27:38
---
记录Mac常用操作

<!--more-->

### 快速复制文件夹路径

选中文件夹，使用option + command + c复制文件夹路径， 然后command+v 粘贴即可

### Mac随航功能和通用控制冲突

前往“系统偏好设置”>“显示器”>“通用控制”，然后取消勾选“拖过屏幕边缘来连接附近的 Mac 或 iPad”以及“自动重新连接附近的任何Mac 或 iPad”选项以防止在你不需要的情况下自动启用通用控制功能。后续如需要使用通用控制功能，可以从“显示器”设置或者控制中心中手动连接设备。

![img](https://discussionschinese.apple.com/content/attachment/ae7a071c-93a0-45cd-8393-8625a61c3931)

## 终端

##### 更新brew时报错unknown or unsupported macOS version: :dunno (MacOSVersionError) 

使用`brew update-reset`

##### 在vs code中打开zsh终端报错.zshrc:source:107: no such file or directory: .bash_profile

mac终端没有报错但是在vscode终端报错导致环境变量不可用，排查了很久才终于发现是.zshrc中写的不规范，首先`open -e .zshrc`打开配置文件将`source .bash_profile` 改为`source~/.bash_profile`
