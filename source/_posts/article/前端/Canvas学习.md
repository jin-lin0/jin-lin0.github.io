---
title: Canvas学习
abbrlink: 30460
date: 2023-11-17 17:06:30
tags:
- 前端
- HTML5
- Canvas
categories:
- 前端
---
Canvas是HTML5提供的一种绘图API，它可以通过JavaScript在网页上绘制图形、图像和动画。

Canvas提供了一个类似画布的区域，可以在其中动态绘制图形。

<!--more-->

## API

### CanvasRenderingContext2D.arc()

绘制圆弧路径的方法

`void ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);`

**参数**

*x*：圆弧中心的x坐标

*y*：圆弧中心的y坐标

radius：圆弧的半径

startAngle：圆弧的起始点，单位弧度

endAngle：圆弧的终点，单位弧度

anticlockwise：true为逆时针，false为顺时针

**示例**

```javascript
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.arc(100, 75, 50, 0, 2 * Math.PI);
ctx.stroke();
```

### CanvasRenderingContext2D.createLinearGradient()

创建线性的渐变对象，渐变可用于填充矩形、圆形、线条、文本等。

`CanvasGradient ctx.createLinearGradient(x0, y0, x1, y1);`

**参数**

*x0*： 渐变开始点的 x 坐标

*y0*：渐变开始点的 y 坐标

*x1*：渐变结束点的 x 坐标

*y1*：渐变结束点的 y 坐标

**返回值**

CanvasGradient，据指定线路初始化的线性 `CanvasGradient` 对象。

### CanvasRenderingContext2D.createRadialGradient()

创建放射性渐变对象。

`CanvasGradient ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);`

**参数**

*x0*：开始圆形的 x 轴坐标。

*y0*：开始圆形的 y 轴坐标。

*r0*：开始圆形的半径。

*x1*：结束圆形的 x 轴坐标。

*y1*：结束圆形的 y 轴坐标。

*r1*：结束圆形的半径

### CanvasGradient

描述渐变的不透明对象，通过`CanvasRenderingContext2D.createLinearGradient()`或`CanvasRenderingContext2D.createRadialGradient()` 的返回值得到。

**方法**

**`CanvasGradient.addColorStop(offset,color)`**

指定到偏移的渐变色。

**参数**

*offset*：`0`到`1`之间的值，超出范围将抛出`INDEX_SIZE_ERR`错误

*color*：CSS 颜色值，若颜色值不能被解析为有效的 CSS 颜色值，将抛出`SYNTAX_ERR`错误。

## Canvas创建渐变色星空背景

```typescript
import { useRef, useEffect } from "react";

const CanvasStar = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // x：星星的x坐标 y：星星的y坐标 alpha：透明度
  const starsRef = useRef<{ x: number; y: number; alpha: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;
    
		// 制作渐变色背景
    const drawBackground = () => {
      // 从(canvas.width / 2, 0)到(canvas.width / 2, canvas.height)的线性渐变对象
      const gradient = context.createLinearGradient(
        canvas.width / 2,
        0,
        canvas.width / 2,
        canvas.height
      );
      // 为渐变颜色对象添加百分比颜色渐变断点
      gradient.addColorStop(0.1, "#1b2947");
      gradient.addColorStop(0.6, "#75517d");
      gradient.addColorStop(1, "#e96f92");
			// 填充canvas
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
    };
		
    // 制作一个星星
    const drawShootingStar = (x: number, y: number, alpha: number): void => {
      // 生成放射渐变对象，(x,y)半径为0的圆至(x,y)半径为10的圆渐变
      let gradient = context.createRadialGradient(x, y, 0, x, y, 10);
      gradient.addColorStop(0, "#fff");
      gradient.addColorStop(0.3, "transparent");
      context.fillStyle = gradient;
      // 设置透明度
      context.globalAlpha = alpha;
      context.beginPath();
      // 画圆填充
      context.arc(x, y, 10, 0, Math.PI * 2);
      context.fill();
    };

    // 生成num个星星的数组
    const generateRandomStars = (
      num: number
    ): {
      x: number;
      y: number;
      alpha: number;
    }[] => {
      const stars = [];

      for (let i = 0; i < num; i++) {
        const x = Math.random() * canvas.width;
        // 0.6对应制作背景的渐变色
        const y = Math.random() * canvas.height * 0.6;
        const alpha = Math.random();
        stars.push({ x, y, alpha });
      }

      return stars;
    };
    
    // 视窗更新，重新生成stars数组
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      starsRef.current = generateRandomStars(Math.max(canvas.width / 10, 20));
    };
		
    // 动画渲染函数
    const animateStars = (): void => {
      // 清空canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.globalAlpha = 1;
      drawBackground();

      starsRef.current.forEach((star) => {
        drawShootingStar(star.x, star.y, star.alpha);
        // 闪烁效果
        if (Math.random() < 0.1 && star.alpha < 0.9) {
          star.alpha += 0.1;
        } else if (Math.random() > 0.9 && star.alpha > 0.1) {
          star.alpha -= 0.1;
        }
      });
      // 动画API
      requestAnimationFrame(animateStars);
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    animateStars();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      // 背景沉底
      style={{ position: "absolute", zIndex: -2 }}
    />
  );
};

export default CanvasStar;

```

渐变星空背景的效果图如下：

![image-20231118191540055](https://s2.loli.net/2024/12/02/RZx4pnIkbdUeK2V.png)
