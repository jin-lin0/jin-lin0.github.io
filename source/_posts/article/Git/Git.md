---
title: Git
abbrlink: 6295
date: 2023-11-06 13:33:29
tags:
- Git
categories:
- Git
---

## Git

### 查看Github仓库占用的存储空间

1. 登录Github首页，点击账户的setting

   <!--more-->

   ![image-20231106133638213](https://s2.loli.net/2024/12/02/W147sTa3tbXclHm.png)

2. 进入设置页面，点击Repositories，即可看到各个仓库占用的存储。(单个文件仓库1个G以下应该都是没有问题的，单文件限制100m，大于100m的文件需要用git-lfs)

   ![image-20231106133806358](https://s2.loli.net/2024/12/02/NLRBlXkzDtvOnm6.png)

### Github中的readme中生成目录结构

**Mac**    安装 tree 指令： brew install tree；

执行 `tree [folder-name]`

## Git命令

```bash
git push origin main:master --force // 本地main分支强制覆盖远程master分支全部代码
```

### Git合并N个提交记录

```bash
git rebase -i HEAD~N // 压缩最近的N次提交, N代表重新审视的提交数量, -i代表交互模式
```

执行后，文本编辑器会打开，列出最近N次提交

```
pick e3a1b35 Initial commit
squash 7ac9a67 Add feature X
squash 1d2a3f4 Improve feature X
squash 0b1d2f5 Fix bug in feature X
```

保存关闭编辑器后，可以编辑重新填写的提交信息
