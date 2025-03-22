# window

- window 对象指的是 ( 浏览器窗口 )，是当前页面的 ( 顶层对象，所有其他对象 都是 window 顶层对象的下属 )
- **document 对象也是 window 对象的一部分**

### (1) window 对象的属性

- window.name
  - 表示当前窗口的名字，只能是字符串
  - window.name 属性主要配合 ( 超链接 ) 和 ( 表单的 target 属性 ) 使用
  - 只要浏览器窗口不关闭，这个属性是不会消失的
- window.closed
  - 返回 boolean，表示窗口是否关闭
  - 这个属性一般用来检查，使用脚本打开的新窗口是否关闭
- window.opener
  - 表示打开当前窗口的父窗口
- window.self 和 window.window
  - 都指向窗口本身，即 ( **window.self === window.window === window** )
  - 这两个属性只读
- window.status
  - 读写浏览器状态栏的文本
- window.devicePixelRatio
  - 屏幕像素比
- **全局对象属性**
  - window.document
  - window.location
    - hash 路由相关: window.location.hash
    - history 路由相关: window.location.pathname
  - window.history
    - window.history.go()
    - window.back()
    - window.forward()
  - window.localStorage + window.sessionStorage
  - window.navigator
  - window.console
  - window.screen

### (2) window.navigator 对象

- window.navigator.userAgent
  - 表示浏览器的厂商和版本信息
  - userAgent 可以大致准确地识别手机浏览器，方法就是测试是否包含 mobi 字符串
- window.navigator.plugins
  - 返回浏览器安装的插件
- window.navigator.onLine
  - 表示用户当前在线还是离线（浏览器断线）
- **window.navigator.geolocation**
  - 返回一个 Geolocation 对象，包含用户地理位置的信息
