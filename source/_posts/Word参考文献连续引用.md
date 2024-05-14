---
title: Word参考文献连续引用
tags:
  - Word
  - 参考文献
categories:
  - Word
abbrlink: 37449
date: 2023-12-20 20:21:40
---
Word中实现连续多个参考文献的引用，如xxx<sup><a href="#xxx">[1-4]</a></sup>

<!--more-->

1. 首先将参考文献自动编号

   ![image-20231220202721738](Word参考文献连续引用/image-20231220202721738.png)

2. 光标移到需要引用的位置，选择【引用】-【交叉引用】，插入需要引用文献编号的首位和末位，然后点击【开始】选择$X^2$

   ![image-20231220203157006](Word参考文献连续引用/image-20231220203157006.png)

3. 选中右键选择**切换域代码**，得到下面的代码

   ```mathematica
   {REF _Ref153957510 \r \h  \* MERGEFORMAT }{REF _Ref153996683 \r \h  \* MERGEFORMAT }
   ```

   修改上面的代码如下，右键选择**更新域**即可实现

   ```mathematica
   {REF _Ref153957510 \r \h \#"[0" \* MERGEFORMAT }-{REF _Ref153996683 \r \h \#"0]" \* MERGEFORMAT }
   ```

   ![image-20231220203700207](Word参考文献连续引用/image-20231220203700207.png)

