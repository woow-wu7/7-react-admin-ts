## HTTP

- https://juejin.cn/post/6844904085750038542

## 一些单词

```
transfer 转移 转让 v
-
tunnel 隧道 管道 n
channel 频道 n
-
patch 补丁 修补 n v
establish 建立 // 三次握手后客户端和服务端状态都变成了established
-
certificate 证书
cipher 密码 暗号 n
code 代码 暗号 n // the cipher is not a password.
-
joint 联合的adj 关节n
join 加入 v
participate in. 加入 v
-
expires 过期 v
range 范围 n
-
establish 建立 设立 v
-
shake hands. 握手 v
handshake 握手 n
-
certificate authority. 证书机构 n
-
encrypt 加密 v
decrypt 解密 v
-
built into. 内置... v
```

## (一) HTTP 方法

### (1.1) HTTP 有哪些请求方法

- HTTP1.0 定义了三种方法：GET, POST, HEAD
- HTTP1.1 定义了五种方法：PUT, PATCH, DELETE, OPTIONS, CONNECT
- // TIPS: Pay attention to the pronunciation of the word 'connect'. [connect-连接-n] // [joint-statement.联合声明]

```options and connect
OPTIONS
- 预检请求: 用于获取目的资源所支持的 ( 请求方法 )
- 返回报文的 ( 报文首部 - 响应头 ) 中包含 ( Allow ) 字段，值是-所支持的请求方法 // TIPS: Pay attention to the pronunciation of the word 'allow'.
- 响应头 Allow: GET,POST
- 应用: 比如 cors 设置跨域时，如果是非简单请求，就会先进行 options 请求
- 扩展: cors请求时，非简单请求的options请求有三个作用: 1.Origin表示的白名单 2.Access-Control-Request-Method会用的HTTP方法 3.Access-Control-Request-Headers允许的头信息


CONNECT
- 该方法可以开启一个客户端与所请求资源之间的双向沟通的通道。它可以用来创建隧道（tunnel）
- HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器
```

### (1.2) GET 和 POST 的区别？

- 作用
  - GET 获取资源
  - POST 添加资源/更新资源
- 参数
  - GET 通过 query 传递参数
  - POST 通过 body 传递参数
  - `本质上 GET 和 POST 都能通过 query 和 body 传递数据`，所以这只是一种约定，比如: 是有的公司 ( 所有的请求都只用 post )
- 幂等
  - GET 幂等 ---------------- 条件相同时，请求多次都会得到相同的结果（无副作用）
  - POST 非幂等
- 书签和缓存
  - GET 可以作为书签，能被浏览器和代理服务器缓存
  - POST 不能作为书签，不能被浏览器和代理服务器缓存
- TCP 数据包个数
  - GET 产生一个 TCP 数据包， POST 产生两个 TCP 数据包
  - GET: 浏览器会把 ( header 和 data ) 一并发送出去，服务器响应 200（返回数据）
  - POST: 浏览器( 先发送 header )，服务器响应 100 continue 表示继续请求，然后浏览器 ( 再发送 data )，服务器响应 200 ok（返回数据）

### (1.3) PUT 和 POST 的区别？

- 幂等性
  - PUT 是幂等的，即 连续调用一次或者多次的效果相同（无副作用）
  - POST 是非幂等的
- 资源
  - PUT 的 URI 指向是具体单一资源 -- 更新资源
  - POST 可以指向资源集合 --------- 新增资源
- 总结
  - POST 用于新增资源，非幂等，即多次提交会多次添加新资源
  - PUT 用于修改资源，幂等，每次提交都是修改成同样的内容，只争对单一资源

### (1.4) PUT 和 PATCH 的区别？

- 两者都可以 更新资源
- PATCH 是对资源进行 ( 局部更新 )，这样 PATCH 就会少提交一些 body 属性，减小报文大小
- POST 则是对资源进行 ( 全量更新 )
- // patch 是补丁的意思，PATCH 是对 PUT 方法的补充

## (二) http1.0 和 http1.1 的区别？

- http1.0
  - 无状态
  - 无连接
- http1.1
  - 长连接
  - 管道化
  - 缓存
  - 断点续传

```1. HTTP1.0
HTTP1.0
---

(1) 无状态
1. 服务器不跟踪记录请求过的状态
2. 对于无状态的特性可以借助 ( cookie/session ) 机制来做 ( 身份认证 ) 和 ( 状态记录 )

(2) 无连接
无连接导致的性能缺陷主要有两种：
1. 无法复用链接: 每次发送请求，都需要进行tcp链接，即三次握手和四次挥手，使得网络的利用率极低
2. 对头阻塞: http1.0规定，在前一个请求响应到达之后，下一个请求才能发送，如果前一个请求阻塞，后面的就都会阻塞，从而造成对头阻塞
```

```2. HTTP1.1
HTTP1.1
- 长连接
- 管道化
- 缓存
- 断点续传
---

(1) 长连接
- HTTP1.1默认保持长连接，数据传输完成，保持tcp链接不断开，继续使用这个通道传输数据
- 响应头: Connection: Keep-Alive --------------> 表示服务器支持 长链接
- 响应头: Keep-Alive: timeout=5, max=1000 -----> 提供长链接的详细信息
          - timeout：指定了一个 空闲连接 需要保持打开状态的 最小时长（以秒为单位）
          - max：在连接关闭之前，在此连接可以发送的请求的最大值
- 一般情况下，长链接是默认开启的，除非设置了 Connection: close 才会在http请求完成后，断开链接

(2) 管道化
- http1.0 ( 无链接 )
    - 请求1 > 响应1 --> 请求2 > 响应2 --> 请求3 > 响应3
- http1.1 ( 管道化 )
    - 请求1 --> 请求2 --> 请求3 > 响应1 --> 响应2 --> 响应3
- 总结: 虽然管道化一次可以发送多个请求，但响应仍然是顺序返回，仍然无法解决对头阻塞的问题，TCP传输层仍然会阻塞
- 问题: 为什么是顺序返回的呢？
- 回答: 因为http是一个文本协议，请求后顺序返回 - 浏览器 才能对应知道 返回的是哪一次的请求，才能区分对应的是哪一个请求，对应哪一个响应


(3) 缓存处理
- HTTP1.1新增 Cache-Control 字段
    - http1.0 响应头  =>  expires        => 是一个绝对时间点，用GMT时间格式
    - http1.1 响应头  =>  Cache-Control  => 是一个相时时间段(更精确，没有本地时间带来的误差)，以秒为单位，可以设置 max-age private/public no-cache 等
    // TIPS: Pay attention to the pronunciation of the word 'expires'. [expire-expires-过期-v]
- Cache-control: no-cache,private,max-age=123123
    - no-cache：不使用强缓存，使用协商缓存
    - max-age: 一个时间段，单位是秒
    - public: 允许所有服务器缓存该资源
    - private: 表示该资源仅仅属于发出请求的最终用户，这将禁止中间服务器（如代理服务器）缓存此类资源
               对于包含用户个人信息的文件，可以设置private
- Expires 和 Cache-Control 对比
    - 如果同时开启，Cache-Control 的优先级高于 Expires
    - expires是一个用GMT时间表示的时间点，Cache-Control是用秒表示的时间段(一个差值)，都是和浏览器本地时间做对比
    - Cache-Control 比 Expires 更加精确
    - Cache-Control 比 Expires 的优先级更高，都设置时，Cache-Control 生效

(4) 断点续传
- 请求头：Range
- 响应头：Content-Range
- 原理
    - 在上传/下载资源时，如果资源过大，将其分割为多个部分，分别上传/下载
    - 如果遇到网络故障，可以从已经上传/下载好的地方继续请求，不用从头开始，提高效率
- 案例：
    - Range: bytes=0-801
    - Content-Range: bytes 0-800/801
```

## (三) http2.0

- 二进制分帧
- 多路复用: 在共享 TCP 链接的基础上同时发送请求和响应
- 头部压缩
- 服务器推送: 服务器可以额外的向客户端推送资源，而无需客户端明确的请求

```
HTTP2.0

(1) 二进制分帧
- 将所有传输的信息分割为更小的消息和帧,并对它们采用二进制格式的编码

(2) 多路复用
- 基于二进制分帧
- 在同一域名下所有访问都是从同一个tcp连接中走，http消息被分解为独立的帧，乱序发送，服务端根据标识符和首部将消息重新组装起来
- 比如：一个页面有三个http请求，在HTTP1.0时需要发三次http请求，而HTTP2.0只需要发送一次HTTP请求，将之前的三次分层不同的stream，乱序发送

(3) 头部压缩
- 将http中的头部中的key:value的纯文本，在两端做了一个映射表，发送的时候只需要记录key就可以了
```

## (四) HTTP 的一些概念

- HTTP
  - HTTP 是 ( 超文本传输协议 ) 的缩写 ( HyperText Transfer Protocol ) // 【 transfer 转移 转让 v 】
  - 超文本: 指 ( 传输的内容是超文本 - 是文字，图片，视频，超链接 的 混合体 ) -- html 就是常见的超文本
  - 扩展
    - URL 和 URI
      - URL: 强调 Location，表示 ----- 统一资源定位符
      - URI: 强调 Identifier，表示 --- 统一资源标识符
    - encodeURI 和 encodeURIComponent
      - encodeURI: 编码整个 url
      - encodeURIComponent: 编码 url 的参数部分，即 query 部分，主要用于对 url 中包含回调地址，对回调地址的处理用 encodeURIComponent
    - IP 地址 和 MAC 地址
      - 通过 IP 地址能找到 MAC 地址，从而找到具体的设备
    - 递归 和 迭代
      - 递归: a->b->c->b->a
      - 迭代: a->b b->a a->c c->a
    - 如何判断是几级域名
      - 有几个点就是几级域名: www.baidu.com.cn 一共有 3 个点，所以是 3 级域名

## (五) TCP/IP 协议

- 应用层 ---------- HTTP
- 传输层 ---------- TCP UDP
- 网络层 ---------- IP ICMP
- 数据链路层
- 物理层

```
IP是高速公路
TCP是货车
HTTP时货物
```

## (六) TCP 报文

- HTTP 报文 = 报文首部 + 空行 + 报文主体
  - 请求报文首部 = 【 请求行 ( HTTP 请求的方法 + URI + HTTP 版本 ) 】 + 请求头
  - 响应报文首部 = 【 响应行 即 状态行 ( HTTP 版本 + 状态码 + 原因短语 ) 】 + 响应头
  -
  - 序号: Seq
  - 确认号: Ack ---------- Ack = Seq + 1
  - 标志位
    - ACK: 只有 标志位 ACK=1 时，确认号 Ack 才有效
    - SYN: 发起一个链接
    - FIN: 释放一个链接

## (七) TCP 三次握手 【 three handshakes. 】

- https://juejin.cn/post/6844904085750038542
- 1. 客户端 -> 服务端
  - 标志位 SYN=1，序号 Seq=x，的 ( 建立链接的-包 )
  - 客户端状态: CLOSED -> SYN_SENT
  - 标志位 SYN=1，表示建立链接
- 2. 服务端 -> 客户端
  - 标志位 SYN=1，ACK=1, 序号 Seq=y，确认号 Ack=x+1，的 ( 确认包 )
  - 服务端状态: CLOSED -> SYN_RECEIVED
- 3. 客户端 -> 服务器
  - 标志位 ACK=1，序号 Seq=x+1，确认号 Ack=y+1，的 ( 确认包 )
  - 双方的状态: 都变成了 established
- Other supplements:
  - Status
    - 客户端: CLOSED -> SYN_SENT
    - 服务端: CLOSED -> SYN_RECEIVED
    - 最后: 都 Established
  - SYN:
    - SYN 是一个标志位，表示 发起一个链接
  - English
    - establish 建立 设立 v
    - established 建立的 adj

```
问题: 为什么需要第三次握手？
回答:
  - 1.第一次握手，服务端能确认: 客户端的(发送)能力正常，自己的(接收)能力正常
  - 2.第二次握手，客户端能确认: 服务端的(接收发送)能力正常，自己的(发送接收)能力正常 ---- 注意: ( 第二次握手 ) ( 服务端 ) ( 不能确认客户端的接收能力是否正常 )，所以需要第三次握手
  - 3.第三次握手，服务端能确认: 客户端的接收、发送能力，和服务端的接收、发送能力都是正常
总结:
  - 如果两次握手，服务端是没法确认客户端的接收能力是正常
  - 防止已失效的连接请求又传送到服务器端，因而产生错误
  - 为了实现可靠数据传输， TCP 协议的通信双方都必须维护一个序列号， 标识发送出去的数据包哪些已经被对方收到
  - 三次握手的过程即是通信双方相互告知序列号起始值， 并确认对方已经收到了序列号起始值的必经步骤
```

## (八) TCP 四次挥手

- 1. 客户端 -> 服务端
  - 标志位 FIN=1，序号 Seq=u，的 ( 释放链接的-包 )
  - 客户端状态: ESTABLISHED -> FIN_WAIT1
  - 表明的是: 客户端的报文发送完了，但是客户端还能 接收报文
- 2. 服务端 -> 客户端
  - 标志位: ACK=1，序号 Seq=v，确认号 Ack=u+1，的 ( 确认包 )
  - 服务端状态: ESTABLISHED 状态 => CLOSE_WAIT
- 3. 服务端 -> 客户端
  - 标志位 FIN=1，ACK=1，序号 Seq=w，确认号 Ack=u+1，的 ( 释放包 )
  - 服务端状态：CLOSE_WAIT => LAST_ACK
  - 表明的是：主动方(服务端)的报文发送完了，但是主动方(服务端)还是可以接收报文
- 4. 客户端 -> 服务器
  - 标志位: ACK=1，序号 Seq=u+1，确认号 Ack=w+1 的 ( 确认包 )
  - 客户端状态：FIN_WAIT2 => TIME_WAIT

## (九) HTTP 常见的状态码 - HTTP Status Code.

```
100 Continue 客户端应该继续请求，比如post请求就是分两段: ( header ) 和 ( data )，即 先发送header数据，返回100状态码后在继续发送data
101 Switching Protocols 升级协议，切换协议

// 100
// - 1. POST产生两个TCP数据包，GET产生一个TCP数据包
// - 1. POST请求:
//      - POST请求就是分两段，header 和 data，即先发送header数据，返回100状态码后，再继续发送data
//      - 注意: 这两次请求都是post请求，( 不要和post跨域时，两次请求搞混 - 一次是options请求，一次是post请求 )

200 ok
201 created 创建成功: 这个状态码通常在 ( POST ) 请求成功后返回，表示服务器已经成功处理了请求，并且创建了一个新的资源
204 No Content 请求成功，但没有资源可以返回
206 Partial Content 范围请求

301 Moved Permanently 永久重定向，需要修改之前保存的书签
302 Found 临时重定向，不需要修改之前保存的书签
303 See Other 临时重定向，------------------------------- + 应采用 GET 方法获取资源
304 Not Modified 资源未被修改 --------------------------- 用户 ( 协商缓存 )
307 Temporary Redirect 临时重定向，---------------------- + 不需要从 POST 换成 GET

400 Bad Request 错误的请求，存在错误语法
401 UnAuthorized 未授权
403 Forbidden 权限不够
404 Not Found 资源未找到，访问的地址不存在
405 Method Not Allowed 请求方法错误 // TIPS: Pay attention to the pronunciation of word 'allow'. [allow-允许-v]
408 Request Timeout 请求超时

500 Internet Server Error 服务端错误
502 Bad Gateway 网关错误
503 Service UnAvailable 服务器过载
504 Gateway Timeout 网关超时
```

## (十) HTTP 的缺点

- 通信是( 明文 )，内容可能被 ---------- 窃听
- 不验证通信双方的( 身份 )，可能会遭遇 -- 伪装
- 无法验证报文的 ( 完整性 )，啃根会被 ---- 篡改
- 扩展
  - 加密的对象有哪些: 1.通信线路的加密 2.通信内容的加密

## (十一) HTTP 报文

- HTTP 报文 = 报文首部 + 空行 + 报文主体
  - 请求报文首部 = 请求行 ( 请求的方法 + URI + HTTP 版本 ) + 请求头
  - 响应报文首部 = 响应行 即 状态行 ( HTTP 版本 + 状态码 + 原因短语 ) + 响应头
- 请看本页 (六) TCP 报文

## (十二) HTTPS

- HTTPS = HTTP + 加密 + 认证 + 完整性保护
- 是在 ( 应用层 ) 和 ( 传输层 ) 之间加了 ( SSL 层 )
- 特点
  - 公钥加密，私钥解
  - 私钥加密，公钥解
- 加密方式
  - HTTPS 采用 ( 混合加密的方式 )，即 ( 对称加密 + 非对称加密 )
  - 交换密钥阶段: ------------ 使用非对称加密，安全得交换密钥 - 该密钥是对称加密通信时所需要的密钥，只有一个，双方共享
  - 建立通信，交换报文阶段: ---- 使用对称加密，进行通信，提升性能
- 数字证书认证机构的业务流程
  - 前置知识
    - 服务器: 有一对非对称加密的密钥: 一个公钥，一个私钥
    - 证书颁发机构: 也有一对非对称加密的密钥: 一个公钥，一个私钥，注意: 私钥是提前内置在浏览器中
    - 证书的后缀名: .pem 文件，从浏览器上下载的证书后缀名是 .pem
    - 如何下载一个证书: 点击地址栏 input 框的 【 锁按钮 -> ConnectionIsSecure -> CertificateIsValid -> detail -> export 】
  - 具体流程
    - 1. 服务器把自己的 ( 公钥 ) 向证书认证机构申请证书
    - 2. 证书颁发机构用自己的 ( 私钥 ) 对服务器的 ( 公钥 ) 进行数字签名，并生成 ( 公钥证书 ) ------ 公钥加密私钥解，私钥加密公钥解
    - 3. ( 服务器 ) 向 ( 客户端 ) 发送证书颁发机构颁发的 ( 公钥证书 )
    - 4. ( 客户端 ) 收到公钥证书后，利用内置在自己的 ( 证书颁发机构的 公钥 ) 解密， (公钥证书中，证明服务器的公钥的真实性 )
    - 5. 如果是真实的服务的公钥证书，那么 ( 客户端就会用服务器的公钥加密之后在对称加密才会用到的 密钥 ) 并发送给服务器
    - 6. 服务器收到 ( 加密后的信息后 ) 用自己的私钥 ( 解密 )，解密后服务端就获取到了 ( 对称加密的密钥了 )
    - 7. 接下来，通信双发就可以进行 ( 对称加密通信了 )，即可以建立通信，交换报文了
    - 总结: 服务器公钥 -> 给证书机构，机构用私钥加密服务器的公钥，生成公钥证书 -> 给服务器 -> 客户端 -> 客户端用内置的机构的公钥解机构私钥，获得服务器的公钥 -> 用服务的公钥加密对称加密时用到的密钥 -> 发给服务器，服务器用自己的私钥解，获得对称密钥 -> 之后就是对称加密通信
  -
  - The specific process.具体流程 英文版
    - 1. "SERVER" sends its own "Public_Key" to the "Certificate authority".
    - 2. "Certificate authority" use its own "Private_Key" to encrypt the "SERVER's Public_Key" to generate the "Public_Key_certificate".
    - 3. "Certificate authority" -> "SERVER" -> "CLIENT".
    - 4. "CLIENT" uses the "Certificate authority"'s "Public_Key" built into browser to decrypt the "Public_Key_certificate" and then get the "Public_Key" of "SERVER".
    - 5. Then "CLIENT" uses the "SERVER"'s "Public_Key" to encrypt the "KEY" that is used in the symmetric communication.
    - 6. When the "SEVER" received the "KEY", "SEVER" can uses its own "Private_Key" to decrypt the "Public_Key" to get the "KEY".

## (十三) HTTPS 通信工程 - SSL 握手过程

```
-> ClientHello

<-- ServerHello
<-- Certificate
<-- ServerHelloDone

-> ClientKeyExchange
-> ChangeCipherSpec
-> Finished

<- ChangeCipherSpec
<- Finished

-> ApplicationData
<- ApplicationData
```

## (十三) HTTP 和 HTTPS 的默认端口

```
http 80 // 注意不是8080
https 443
```

## (十四) 浏览器从 输入 url 到 显示整个页面的全过程

```
url到页面显示的过程
---

1. DNS域名解析
- DNS是 ( domain name system ) 域名系统 的缩写
- 将 域名 解析成 ip 地址
  - 一个域名对应一个以上的ip地址
  - 问题: 为什么要将 域名 解析成 ip地址？
  - 回答: 因为 ( TCP/IP网络 ) 是通过 ( ip地址 ) 来确定 ( 通信对象 )，不知道ip就无法将消息发送给对方
- DNS域名解析的过程：// 递归查询 和 迭代查询
0. 先从 ( DNS缓存 ) 中找，找不到再按照下面的方式查找
1. ( 浏览器 ) 中查询 DNS 缓存，有则进入建立tcp链接阶段，下面同理
2. ( 本机的系统 )中查询 DNS 缓存
3. ( 路由器 ) 中查询 DNS 缓存
4. ( 运营商服务器 ) 中查询 DNS 缓存
5. 递归查询 // 根域名/一级域名/二级域名 ....blog.baidu.com
  - .com
  - .baidu
  - blog
  - 还未找到就报错
- 优化
  - 当第一次访问结束后，会 ( 缓存 ) ( 域名 和 IP 的映射 )
  - 但是一个项目足够大时，可能 ( img的src是不同的域名的url ) ( style的link是不同域名的url )，这些都是要做 DNS域名 解析的
  - 1. DNS预解析
    - 1. meta标签: 用meta信息来告知浏览器, 当前页面要做DNS预解析 <meta http-equiv="x-dns-prefetch-control" content="on" />
    - 2. link标签: 在页面 header 中使用 link 标签来强制对 DNS 预解析 <link rel="dns-prefetch" href="http://..." />
  - 2. DNS缓存优化
    - 1. 加本地 DNS 缓存的大小
    - 2. 优化本地 DNS 缓存的清理策略
  - 3. CDN域名加速
    - CDN服务缩短了用户查看内容的访问延迟
    - 将静态资源通过 CDN 进行加速，减少IP地址切换带来的影响，解决了网络带宽小、用户访问量大、网点分布不均等问题
7. DNS域名解析总结：
  - 1. 浏览器DNS缓存 => 操作系统DNS缓存 => 本机host文件 => 路由器 => 运营商 => 以上都没有DNS缓存，就递归查询一级/二级/三级域名
  - 2. ( 递归查询 ) 和 ( 迭代查询 ) 的区别
    - 递归查询: 询问者的角色是变化的，a->b->c->d->c->b->a
    - 迭代查询: 询问者的角色始终保持不变，每次都会将询问结果返回给同一个询问者，然后迭代，直到找到想要的结果; a->b->a, a->c->a



2. 建立tcp链接 // 三次握手
- 第一次握手
    - 客服端发送一个 标志位SYN=1,序号Seq=x的链接包给服务端
        - SYN：表示发起一个新链接，( Synchronize Sequence Numbers )
        - Seq：序号是随机的
- 第二次握手
    - 服务端发送一个 标志位SYN=1,ACK=1,确认号Ack=x+1,序号Seq=y的确认包给客户端
    - 标志位 ACK 表示响应
- 第三次握手
    - 客户端发送一个 SYN=0,ACK=1,确认号Ack=y+1,序号Seq=x+1的确认包给服务器
    - 为什么需要三次握手
        - 之所以要第三次握手，主要是因为避免无效的连接包延时后又发送到服务器，造成服务器以为又要建立链接的假象，造成错误


3. 客户端发送http请求
4. 服务端处理请求，并返回http响应报文


5. 浏览器解析渲染
  - 浏览器解析渲染: 会经过 parseHTML -> parseStylesheet -> evaluateScript -> layout -> paint -> composite
  - 遇见HTML标记，浏览器调用HTML解析器，解析成Token并构建 - DOM树
  - 遇见style/link标记，浏览器调用css解析器，解析成 ------ CSSOM树
  - 遇见script标记，浏览器调用js解析器，处理js代码 ( 绑定事件，可能会修改 DOM tree 和 CSSOM tree )
  - 将 DOM tree 和 CSSOM tree 合并成 ----------------- 渲染树 // -- render tree
  - 根据 render tree 计算布局 ------------------------ 布局 // ---- layout
  - 将各个节点的颜色绘制到屏幕上（渲染）------------------ 渲染 // ---- paint
  - 最后是一个多层绘制时的 ( 合成 ) 阶段 ---------------- 合成 // ---- composite // 【 composite material. 合成材料 n 】 raw material. building material.
  - // 合成: 在复杂的页面中，可能存在多层元素（如通过CSS的 z-index 堆叠顺序）或者需要将多个独立绘制的部分组合在一起,合成阶段是将之前绘制的各个部分按照正确的顺序和层次组合成最终的页面
  - // 合成: 例如，一个半透明的元素覆盖在另一个元素上时，需要通过合成来正确显示它们叠加后的效果。
  - // 可以加上 浏览器 进程 和 线程 相关的知识点
  - // 可以加上 repaint 和 reflow 相关的知识点 // 1-FRONTEND/7-CSS/__README.md/(十七) repaint 重绘 和 reflow 重排(回流) 和 合成
  - // 1. 浏览器进程: 1个-主进程 1个-网络进程 1个-GPU进程 多个-渲染进程 多个-插件进行
  - // 2. 浏览器线程: GUI渲染线程 JS引擎线程 计时器线程 异步http请求线程 事件触发线程
  - // 3. 详见: 1-FRONTEND/8-BROWSER/浏览器.md
AA.
EXPAND
Repaint 重绘 / Reflow 重排(回流) / Composite 合成
- repaint 重绘
  - 对 DOM 的修改只导致了 ( 样式 ) 的变化，并没有改变 ( 几何属性 )，浏览器不需要从新计算几何样式，而是从新绘制新的样式，这个过程叫做重绘 repaint
  - 跳过了 ( 布局树 ) 和 ( 建图层树 )
- reflow 重排
  - 对 DOM 的修改引发了 DOM 几何尺寸的变化(宽高，隐藏等)，浏览器需要 ( 重新计算 ) 元素的几何属性
  - 同时 ( 其他元素的集合属性 和 位置也将受到影响 )，浏览器需要重新将计算结果绘制出来，这个过程叫做回流 reflow
- composite 合成
  - 就是更改了一个既不要 ( 布局 layout ) 也不要 ( 绘制 paint ) 的属性，那么渲染引擎会跳过布局和绘制，直接执行后续的 ( 合成 composite ) 操作，这个过程就叫合成
- 特点
  - reflow 一定会 repaint
  - repaint 不会定会 reflow
- **常见的会引起 ( reflow 重排-回流 ) 的操作有哪些？**
  - 页面首次渲染
  - 浏览器窗口大小变化
  - 元素尺寸 和 位置变化 width height position padding margin border
  - fontSize
  - 显示/隐藏元素
  - 添加/删除元素
  - 激活 css 伪类
  - offsetWidth, clientWidth, scrollTop/scrollHeight 的计算， 会使浏览器将渐进回流队列 Flush，立即执行回流
- **只会 composite 合成的属性，不会重绘重排回流**
  - transform // -- translate scale rotate skew
  - opacity // ---- 不同明度 n
  - filter // ----- filter: drop-shadow();  // filter: brightness(200%); // filter: grayscale(100%);
  - will-change //  will-change: transform;
  - 所以动画最好使用 transform opacity 等属性来实现，结合 32 一起看




6. 断开TCP链接 // 四次挥手，( FIN : 表示释放链接 )
- 第一次挥手：浏览器发起，告诉服务器我请求报文发送完了，你准备关闭吧
- 第二次挥手：服务器发起，告诉浏览器我请求报文接收完了，我准备关闭了，你也准备吧
- 第三次挥手：服务器发起，告诉浏览器，我响应报文发送完了，你准备关闭吧
- 第四次挥手：浏览器发起，告诉服务器，我响应报文接收完了，我准备关闭了，你也准备吧
- 先是服务器先关闭，再是浏览器关闭
```
