---
title: typora添加自动上传图片到smms
abbrlink: 43043
date: 2024-12-01 20:43:19
tags:
- typora
- 图床
categories:
---
PicGo: 一个用于快速上传图片并获取图片 URL 链接的工具

PicGo 本体支持如下图床：

- `七牛图床` v1.0
- `腾讯云 COS v4\v5 版本` v1.1 & v1.5.0
- `又拍云` v1.2.0
- `GitHub` v1.5.0
- `SM.MS V2` v2.3.0-beta.0
- `阿里云 OSS` v1.6.0
- `Imgur` v1.6.0

<!--more-->

1. 注册登录[smms](https://sm.ms/)，并在API Token页面申请新的token

   <img src="https://s2.loli.net/2024/12/01/YTSZcXzIErtMUN6.png" alt="image-20241201205817318" style="zoom:50%;" />

2. 下载picgo软件，[github链接](https://github.com/Molunerfinn/PicGo)，[下载地址](https://github.com/Molunerfinn/PicGo/releases)，mac可能不会弹出主窗口，在通知栏寻找是否有picgo的图标

   <img src="https://s2.loli.net/2024/12/01/n4ASFGKpPzcfVWq.png" alt="image-20241201204914654" style="zoom: 50%;" />

3. 进入插件设置，查看是否可以搜索到smms-user插件，笔者搜索都为空，于是采取下面的措施

4. 打开配置文件，并记住配置文件的路径

   <img src="https://s2.loli.net/2024/12/01/3qadC8LnjJklPs1.png" alt="image-20241201205241933" style="zoom:50%;" />

5. 进入该配置文件所在的文件夹，执行命令

   `npm install picgo-plugin-smms-user `

   注：进入Application Support文件夹的时候，使用字符串逃逸空格转义检查，即`cd "Application Support" `

6. 重新回到picgo页面可以看到插件已经加载成功

<img src="https://s2.loli.net/2024/12/01/7uOR9EDNBoJMK4H.png" alt="image-20241201205914676" style="zoom:50%;" />

7. 进入smms-登录用户设置，输入auth即token，并设为默认图床

   <img src="https://s2.loli.net/2024/12/01/Czn9RFmXPea8T5H.png" alt="image-20241201210202661" style="zoom:50%;" />

8. 配置typora和配置picgo（自定义）
   
   <img src="https://s2.loli.net/2024/12/01/U19F5MWQHokVDLY.png" alt="202412012104485-picgo.png" style="zoom:50%;" />

<img src="https://s2.loli.net/2024/12/01/H63lAvY7JTFOqKe.png" alt="image-20241201210742502" style="zoom:50%;" />
