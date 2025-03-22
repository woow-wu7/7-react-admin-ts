# HTML

### (1) meta 标签都有哪些属性

```
meta
- meta标签可提供 ( 页面有关的元信息 )
---

属性
- charset: 规定HTM文档的 字符编码
- name: 把 content 属性关联到一个名称
- content: 定义与 http-equiv 或 name 属性相关的元信息
- http-equiv: 把 content 属性关联到 HTTP 头部
- scheme: 定义用于翻译 content 属性的格式


// (七)
// meta标签
// <meta> 标签提供关于 HTML 文档的 ( 元数据 )
// - 它不会显示在页面上，但是对于机器是可读的
// - 可用于浏览器（如何显示内容或重新加载页面），搜索引擎（关键词），或其他 web 服务
// - 位于 head 标签中
// 7.1
// meta标签有哪些属性？
// <meta charset="UTF-8" />
// <meta http-equiv="X-UA-Compatible" content="IE=edge" /> 百度会自动对网页进行转码，这个标签是禁止百度的自动转码
// <meta name="viewport" content="width=device-width, initial-scale=1.0" />
// <meta name="keywords" content="your keywords">
// <meta name="description" content="your description">
// <meta name="author" content="author,email address">
// 7.2
// English
// - ( meta ) 英语是 ( 元数据 ) 的意思

1
charset
<meta charset="UTF-8">

2
name
- keywords 便于搜索引擎
- viewport
<meta name="keywords" content="HTML,ASP,PHP,SQL">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

3
http-equiv
<meta http-equiv="charset" content="iso-8859-1">
<meta http-equiv="expires" content="31 Dec 2008">
```

### (2) async 和 defer

```
script标签中的  ( defer属性 ) 和 ( async属性 )
---

defer
- 异步加载，不阻塞页面，在DOM解析完成后才执行js文件
- 顺序执行，不影响依赖关系

async 属性
- 异步加载，加载不阻塞页面，但是async会在异步加载完成后，立即执行，如果此时html未加载完，就会阻塞页面
- 注意：异步加载，加载不会阻塞页面，执行会阻塞页面
- 不能保证各js文件的执行顺序
```
