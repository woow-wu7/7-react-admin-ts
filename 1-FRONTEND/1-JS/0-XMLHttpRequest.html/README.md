# XMLHttpRequest

- [axios-源码分析](https://github.com/woow-wu7/7-react-admin-ts/tree/master/src/SOURCE-CODE-ANALYSIS/AXIOS)
- [axios-源码分析-掘金](https://juejin.cn/post/6844904147532120072)
- [axios-手写中间件-手写取消请求](https://github.com/woow-wu7/6-penetrate/blob/main/2-FRONTEND/1-JS/8-promise/AXIOS-MIDDLEWARE/axios-middleware.html)
- [XHMHttpRequest 和 fetch 终止请求的区别](https://github.com/woow-wu7/6-penetrate/blob/main/2-FRONTEND/1-JS/HH-AbortController)
- 详见 本项目/1-FRONTEND/1-JS/3-XMLHttpRequest.html/XMLHttpRequest.html

```
const api = new XMLHttpRequest()

(1) api.open()
- 初始化HTTP请求参数（url，http方法等），但并不发送请求，供 send() 方法使用
- api.open(method, url, async, username, password)
  - method：HTTP请求的方法GET, POST, HEAD
  - url：请求的地址
  - async：是否异步，默认是true，即异步的发送请求
    - false：同步，对send方法的调用将阻塞，直到响应完全接受
    - true或者省略：异步，且通常需要调用 onreadystatechange() 方法
- 阶段: open() 在 readState 的 ( 1-OPEND ) 阶段会被调用，此时 send() 方法未被调用
- 阶段: send() 在 readState 的 ( 2-HEADERS_RECEIVED ) 阶段被调用

(2) api.send()
- 发送一个http请求，请求参数写在send方法中
- api.send(body)
  - get请求： 参数可以写在 open() 方法中
  - post请求：参数必须卸载 send() 方法中
- 阶段: open() 在 readState 的 ( 1-OPEND ) 阶段会被调用，此时 send() 方法未被调用
- 阶段: send() 在 readState 的 ( 2-HEADERS_RECEIVED ) 阶段被调用

(3) api.setRequestHeader()
- 指定一个HTTP请求的头部（请求头）
- 只有在 readyState 为 1 时才能调用 ------ 即 open()之后，send()之前
- api.setRequestHeader(name, value)
  - name: key
  - value：value
注意：setRequestHeader()方法只有在 readyState = 1 时才能调用，即 open()之后 send()之前
注意：setRequestHeader()方法可以多次调用，最终的值不是覆盖override而是追加append

(4) api.getResponseHeader()
- 返回指定的HTTP响应头部的值（响应头）

(5) api.abort() //abort：中止的意思
- 取消当前响应，关闭连接并且结束任何未决的网络活动
- api.abort()将readyState重置为0
- 应用：如果请求用了太长的时间，而且响应不在必要时，可以调用这个方法


(6) api.onreadystatechange()
- api.onreadystatechange()当 readyState = 3 时可以调用多次
- 注意：onreadystatechange都是小写，而readyState是驼峰写法

readyState状态：
一共有5种状态，0-4
0 UNSENT ------------------ xhr对象成功构造，open()方法未被调用，即xhr实例生成并且open()未被调用
1 OPEND ------------------- open()方法被调用，send()方法还未被调用，setRequestHeader()可以被调用，因为此时的 readState=1
2 HEADERS_RECEIVED -------- send()方法被调用，响应头和响应状态已经返回
3 LOADING ----------------- 响应体（response entity body）正在下载中，此状态下api.response可能已经有了响应数据
4 DONE -------------------- 整个数据传输过程结束，不管本次请求是成功还是失败

(7) api.onload()
// api.onloadstart()
// api.onload()
// api.onloadend()
- api.onload()请求成功时触发，此时 readyState = 4
- 请求成功的回调有两个：
- 1. readyState===4时的api.onreadystatechange()
- 2. api.onload()方法
api.onload = function () {
  //如果请求成功
  if(api.status == 200){
    //do successCallback
  }
}

注意：status===200是有坑的，因为协商缓存返回的状态码是304，请求也是成功的请求，所以下面的判断跟完善
api.onload = function() {
    if((api.status>=200 && api.status < 300) || api.status === 304) {
        // do successCallback
    }
}

(8) api.timeout
- api.timeout用来设置过期时间

问题1：请求的开始时间怎么确定？是api.onloadstart事件触发的时候，也就是api.send()调用的时候
解析：因为api.open()只是创建了链接，当并没有真正传输数据，只有调用api.send()时才真正开始传输
问题2：什么时候是请求结束？
解析：api.onload 事件触发时结束

(9) api.onprogress() 下载进度信息，和(10)的写法类似

(10)
api.upload.onprogress = function(e) { 上传进度信息
  if ( e.lengthComputable ) {
    const present = e.loaded / e.total * 100;
  }
}


-----------------------------------------------------------------------------------------------
1.
问题1：如何获取response
提供三个属性来获取response：( api.response ) 和 ( api.responseText ) 和 ( responseXML )
api.response -------> 对应 xhr.responseType = "json";
api.responseText ---> 对应 xhr.responseType = "text";

2.
问题2：api.responseType 有哪些类型
api.responseType类型有：text, json, document, blob, arrayBuffer
// api.response -------> 对应 xhr.responseType = "json";
// api.responseText ---> 对应 xhr.responseType = "text";

1. cors跨域设置
(一)
cors XMLHttpRequest
当设置 cors 跨域时，默认不携带cookie，携带cookie，必须满足两个条件
- 1. 响应头中有: Access-Control-Allow-Credentials: true
- 2. XMLHttpRequest设置: xhr.withCredentials = true
- 3. fetch设置: fetch(url, {credentials: 'include'|'same-origin'|'omit'})
(二)
cors fetch
- 如果是通过 fetch 请求的话，需要设置
- credentials: include || same-origin || omit 范围逐渐缩小
- fetch设置: fetch(url, {credentials: 'include'|'same-origin'|'omit'})
- mdn https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
```
