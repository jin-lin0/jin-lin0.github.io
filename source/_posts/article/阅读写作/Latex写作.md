---
title: Latex写作
tags:
  - Latex
  - 论文
categories:
  - 阅读写作
abbrlink: 33233
date: 2023-12-28 15:40:04
---
<!--more-->

## latex Elsevier模板

[下载地址](https://www.elsevier.com/researcher/author/policies-and-guidelines/latex-instructions)

### 去掉ORCID(s)

`\begin{document}`下面添加`\let\printorcid\relax`

### 参考文献改为序号引用

注释掉`\usepackage[authoryear,longnamesfirst]{natbib}`

使用`\usepackage[numbers]{natbib}`
