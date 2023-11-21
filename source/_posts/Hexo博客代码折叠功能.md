---
title: Hexo博客代码折叠功能
abbrlink: 42993
date: 2023-11-20 02:11:38
tags:
- Hexo
categories:
- Hexo
---
Hexo博客中超过指定高度的代码，增加代码自动折叠功能，优化体验。

调研了多篇hexo代码自动折叠功能的实现后，笔者认为该篇的实现效果目前最好，但是代码的风格和源代码风格应该还存在不是完美契合的地方。

**注**：此功能需要修改Next源码，参考[hexo博客代码折叠功能](https://www.toimc.com/hexo-usage-2/)实现。

本博客环境：`hexo@7.0.0`，`next@7.8.0`

<!--more-->

## 步骤

1. 添加`code-unfold.js`在`themes/next/source/js/code-unfold.js`

   ```javascript
   var CODE_MAX_HEIGHT = 200;
   var containers = [];
   
   // 展开
   $("body").on("click", ".js_unfold_code_btn", function () {
     $(this).closest(".js_highlight_container").addClass("on");
   });
   // 收起
   $("body").on("click", ".js_retract_code_btn", function () {
     var $container = $(this).closest(".js_highlight_container").removeClass("on");
     var winTop = $(window).scrollTop();
     var offsetTop = $container.offset().top;
     $(this).css("top", 0);
     if (winTop > offsetTop) {
       // 设置滚动条位置
       $("body, html").animate(
         {
           scrollTop: $container.offset().top - CODE_MAX_HEIGHT,
         },
         600
       );
     }
   });
   // 滚动事件，触发动画效果
   $(window).on("scroll", function () {
     var scrollTop = $(window).scrollTop();
     var temp = [];
     for (let i = 0; i < containers.length; i++) {
       var item = containers[i];
       var { $container, height, $hide, hasHorizontalScrollbar } = item;
       if ($container.closest("body").length === 0) {
         // 如果 $container 元素已经不在页面上, 则删除该元素
         // 防止pjax页面跳转之后，元素未删除
         continue;
       }
       temp.push(item);
       if (!$container.hasClass("on")) {
         continue;
       }
       var offsetTop = $container.offset().top;
       var hideBtnHeight = $hide.outerHeight();
       // 减去按钮高度，减去底部滚动条高度
       var maxTop = parseInt(
         height - (hasHorizontalScrollbar ? 17 : 0) - hideBtnHeight
       );
       let top = parseInt(
         Math.min(
           Math.max(scrollTop - offsetTop, 0), // 如果小于 0 ，则取 0
           maxTop // 如果大于 height ，则取 height
         )
       );
       // 根据 sin 曲线设置"收起代码"位置
       var halfHeight = parseInt(
         ($(window).height() / 2) *
           Math.sin((top / maxTop) * 90 * ((2 * Math.PI) / 360))
       );
       $hide.css("top", Math.min(top + halfHeight, maxTop));
     }
     containers = temp;
   });
   
   // 添加隐藏容器
   function addCodeWrap($node) {
     var $container = $node
       .wrap(
         '<div class="js_highlight_container highlight-container"><div class="highlight-wrap"></div></div>'
       )
       .closest(".js_highlight_container");
   
     // 底部 "展开代码" 与 侧边栏 "收起代码"
     var $btn = $(`
       <div class="highlight-footer">
         <a class="js_unfold_code_btn show-btn" href="javascript:;">展开代码<i class="fa fa-angle-down" aria-hidden="true"></i></a>
       </div>
       <a class="js_retract_code_btn hide-btn" href="javascript:;"><i class="fa fa-angle-up" aria-hidden="true"></i>收起代码</a>
     `);
   
     $container.append($btn);
     return $container;
   }
   
   function codeUnfold() {
     $(".highlight").each(function () {
       // 防止重复渲染
       if (this.__render__ === true) {
         return true;
       }
       this.__render__ = true;
       var $this = $(this);
       var height = $(this).outerHeight();
       if (height > CODE_MAX_HEIGHT) {
         // 添加展开&收起容器
         var $container = addCodeWrap($this);
         containers.push({
           $container,
           height,
           $hide: $container.find(".js_retract_code_btn"),
           hasHorizontalScrollbar: this.scrollWidth > this.offsetWidth,
         });
       }
     });
   }
   
   ```

2. 开启`jquery`支持

   Next的主题配置文件开启fancybox引用的`jquery`：

   ```yaml
   fancybox: true
   ```

3. 引用code-unfold.js

   修改文件`themes/next/layout/_scripts/index.swig`

   ```swig
   // 添加
   {{- next_js('code-unfold.js') }}
   ```

   修改文件`themes/next/source/js/next-boot.js`：

   ```javascript
   NexT.boot.refresh = function () {
     // 添加
     codeUnfold()
     // ...
   ```

4. 添加`highlight.styl`在`theme/next/source/css/_common/components/highlight.styl`

   ```stylus
   // 展开收起效果
   .highlight-container
     position: relative
     &.on
       .highlight-footer
         display: none
       .hide-btn
         display: flex
       .highlight-wrap
         max-height: none
     .highlight-wrap
       overflow: hidden
       max-height: 200px
     .highlight-footer
       position absolute
       width: 100%
       left: 0
       bottom: 0
       text-align: center
     .show-btn
       font-size: 12px
       color: #fff
       position: absolute
       left: 50%
       transform: translateX(-50%)
       bottom: 0
       line-height: 2em
       text-decoration: none
       padding: 0 0.8em
       text-align: center
       border-radius: 4px 4px 0
       &:hover
         text-decoration: none
     .hide-btn
       display: none
       color: #fff
       font-size: 12px
       width: 22px
       position: absolute
       left: -21px
       line-height: 1em
       text-decoration: none
       text-align: center
       flex-direction: column
       border-radius: 4px 0 0 4px
       padding: 0.1em 0 0.6em
       transition: top ease 0.35s
     .fa-angle-up,
     .fa-angle-down
       font-style: normal
       color: #fff
     .fa-angle-up:before
       content:"\f106"
     .fa-angle-down:before
       content:"\f107"
       margin-left: 0.5em
     .js_unfold_code_btn, .js_retract_code_btn
       background: rgba(0,0,0,0.5)
       border-bottom: none !important
   ```

5. 引用`highlight.styl`

   修改文件`themes/next/source/css/_common/components.styl`：

   ```stylus
   // 添加
   @import 'highlight'
   ```

   

