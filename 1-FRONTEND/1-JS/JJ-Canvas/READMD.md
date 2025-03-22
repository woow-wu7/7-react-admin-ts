# 前置知识

- [[深入 14] canvas](https://juejin.cn/post/6844904063029477389)

### 一些单词

```
illegal 非法的
```

### (1) canvas

```
<canvas id="canvas" width="200" height="200" style="border: 1px solid red" ></canvas>
const canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
---

1
指定 width 和 height 有三种方法
- 标准方式：canvas 标签自带的 width 和 height 属性
- css方法: 通过 id 或 class 选择器
- js方式: domTarget.width 和 domTarget.height

2
判断浏览器是否支持 canvas
if (!canvas.getContext) {
    throw new Error("你的浏览器不支持Canvas!");
}

3
常用属性
3.1 drawImage
- context.drawImage(img, x, y, width, height)
- context.drawImage(img图片, x：在画布上放置图像的 x 坐标, y, width图像的宽度, height)
3.2 fillText
- context.fillText(text,x,y,maxWidth) 在画布上绘制填色的文本
3.3 font
- font: font-style font-variant font-weight font-sizet font-family
- font-style: normal|italic斜体|oblique斜体|inherit;
3.4 toDataURL()
- canvas.toDataURL(type, encoderOptions)：返回一个包含图片展示的URI
- type：图片的类型 `image/png`



4
绘制图形
// 矩形
ctx.fillRect(20, 20, 100, 100); // 填充矩形，fillRect(x, y, width, height) xy表示矩形左上角的坐标，原点是左上角00位置
ctx.clearRect(55, 55, 30, 30); // 清除矩形区域，使其清除部分完全透明
ctx.strokeRect(140, 20, 100, 100); // 矩形框
// 三角形
ctx.beginPath(); //------------------------------------------ 一个路径的开始
ctx.moveTo(500, 30); // ----- 起始点
ctx.lineTo(450, 120); // ------ 直线的第二个点
ctx.lineTo(550, 120); // ----- 直线的第三个点
ctx.closePath(); // ----------------------------------------- 一个路径的结束
ctx.lineWidth = 4; // -------- 直线的宽度
ctx.strokeStyle = "red"; // ------ 直线的颜色，需要在绘画前设置
ctx.stroke(); // --------------------------------------------- 描边 (绘制)
ctx.fillStyle = "yellow"; // ------ 填充的颜色，需要在绘画前设置
ctx.fill(); // ----------------------------------------------- 填充 (绘制)
// 直线
ctx.beginPath();
ctx.moveTo(300, 30);
ctx.lineTo(400, 30);
ctx.closePath();
ctx.lineWidth = 2;
ctx.strokeStyle = "blue";
ctx.stroke();
// 圆弧
// arc(x, y, radius, startAngle, endAngle, anticlockwise)
//以x,y为圆心，radius为半径， startAngle和endAngle为角度，anticlockwise是否为逆时针方向的 圆弧（圆）
// startAngle, endAngle代表的是( 弧度 )，而不是角度
// 注意：起始角度为三点钟位置，并且是以弧度计算的
ctx.beginPath();
ctx.arc(60, 200, 40, (90 * Math.PI) / 180, 1.5 * Math.PI, false);
ctx.stroke();
// 圆
ctx.beginPath();
ctx.arc(180, 200, 40, 0, 2 * Math.PI, false);
ctx.fill();


5
绘制图片
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <img
      src="../../../static/images/成都.jpg"
      id="image"
      width="300"
      height="300"
    />
    <button id="button">生成图片</button>

    <div id="imgContainer"></div>
  </body>
  <script>
    window.onload = function () {
      const image = document.getElementById("image");
      const button = document.getElementById("button");
      const imgContainer = document.getElementById("imgContainer");

      button.addEventListener("click", clickButton, false);
      function clickButton() {
        combine();
      }
      function combine() {
        const canvas = document.createElement("canvas"); // -------- 创建canvas标签
        canvas.width = 500;
        canvas.height = 500;
        canvas.style = "border: 1px solid red";
        document.documentElement.appendChild(canvas); // ------------ 添加到HTML的DOM中

        const context = canvas.getContext("2d"); // ----------------- 获取渲染上下文和绘画功能

        // context.drawImage(img, x, y, width, height)
        // img：图片
        // x：在画布上放置图像的 x 坐标
        // y：在画布上放置图像的 y 坐标
        // width：图像的宽度
        // height：图像的高度
        context.drawImage(image, 50, 55, 400, 400); // ----------------- drawImage() 生成图片
        context.fillStyle = "white";
        context.font = "30px Georgia";
        context.fillText("生成的图片", 100, 100); // ------------------- 填充文字
      }
    };
  </script>
</html>
```
