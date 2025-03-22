# (一) cors

- 名词解释
  - cors 表示 ( 跨域资源共享 )
  - cross-origin-resource-sharing
- 条件
  - CORS 需要浏览器和服务器同时支持
- 分类
  - 简单请求
  - 非简单请求

### (1) 简单请求

- 条件
  - 1.请求的方法: 必须是 http1.0 的三种方法之一
    - GET
    - POST
    - HEAD
  - 2.HTTP 头信息不超出以下字段
    - Accept
    - Accept-Language
    - Content-Language
    - Last-Event-ID
    - Content-Type:只限三个值 application/x-www-form-urlencoded multipart/form-data text/plain
  - // Expand Knowledge
  - // http1.1 => DELETE PUT PATCH OPTIONS CONNECT
- 特点
  - **请求头: Origin**
    - Origin 字段用来说明，本次请求来自哪个源（协议 + 域名 + 端口）
    - Origin: http://api.bob.com
  - 响应头
    - **Access-Control-Allow-Origin**: http://api.bob.com
    - **Access-Control-Allow-Credentials**: true
    - **Access-Control-Expose-Headers**: FooBar
- Access-Control-Allow-Origin 的值只有 ( 两种 ) 可能
  - `Origin 指定的值`
  - `*`
- Access-Control-Allow-Credentials
  - XMLHttpRequest ----> xml.withCredentials = true
  - fetch -------------> credentials=include same-origin omit
  - `Access-Control-Allow-Origin 不能是*`

### (2) 非简单请求

- 凡是不同时满足上面两个条件，就属于 ( 非简单请求 )
- 比如
  - 请求的方法是 PUT DELETE 等
  - Content-Type: application/json
- 特点
  - 非简单请求比简单请求，多了 ( **OPTIONS 预检请求** )
- **OPTIONS 请求的作用**
  - 当前网页所在的域名是否在服务器的许可名单之中
    - **Origin**: 即 Origin 指定的域是否在服务器允许访问
  - 可以使用哪些 HTTP 动词和头信息字段
    - **Access-Control-Request-Method**
    - **Access-Control-Request-Headers**
  - 总结
    - 1. 服务求收到 OPTIONS 预检请求后，会检查 ( Origin + Access-Control-Request-Method + Access-Control-Request-Headers )，即 ( 许可的域名，方法，头信息 )
    - 2. 之后和简单请求的处理一样

# (二) 跨域方法总结

- JSONP
- cors
- nginx 反向代理
  - **【 nginx.conf/http/server/location/proxy_pass 】**
- 前端本地服务 proxy 设置
  - 通过本地启动 devServer 服务器来设置 proxy

```
nginx反向代理
通过设置 nginx.conf 文件中的 ( http -> server -> location -> proxy_pass ) 实现反向代理
---

http {
  server {
    listen 8080;
    server_name  localhost;
    location / {
      #root  D:/nginx/nginx-1.14.2/static;
      # proxy_pass 将http://localhost:8080反向代理到http://localhost:3000
      proxy_pass  http://localhost:3000;
      }
  }
}
```

# 资料

- https://www.ruanyifeng.com/blog/2016/04/cors.html
