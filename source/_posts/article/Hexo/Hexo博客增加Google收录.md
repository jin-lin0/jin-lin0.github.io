---
title: Hexo博客增加Google收录
abbrlink: 29809
date: 2023-11-20 23:32:23
tags:
- Hexo
categories:
- Hexo
---
## 查看是否收录

在Google的搜索栏中搜索：` site:https://xxxx.github.io`，如果是尝试使用Google Search Console，则未收录。

<!--more-->

## 提交申请

使用Google账号登入[Search Console](https://search.google.com/search-console/about?hl=zh-CN)，点击网址前缀添加：

![image-20231121011634101](https://s2.loli.net/2024/12/01/EL5FcxMomAwJNHi.png)

下载HTML文件，放置到根目录source目录中

![image-20231121011515612](https://s2.loli.net/2024/12/01/bL1hMmXyA5SOI9r.png)

修改HTML文件，添加以下代码后保存上传

```yaml
---
layout: false
---
```

```bash
sh deploy.sh
```

