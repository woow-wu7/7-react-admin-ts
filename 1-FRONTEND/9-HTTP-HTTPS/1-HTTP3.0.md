# HTTP3.0

- QUIC 协议
  - HTTP3.0 的核心是 QUIC (读音 quick - quick 是快的意思) 协议，由 Google 在 2015 年提出
  - QUIC 基于( UDP 协议 )，又取了 TCP 中的精华，实现了即快又可靠的协议
- 解决 HTTP2.0 以下问题
  - 1. 对头阻塞问题 2. RTT 时长问题 3.切换网络需要重新建立连接问题
  - **1.队头阻塞问题**
    - 队头阻塞原因: 指的是 ( 一个数据包影响了一堆数据包，它不来大家都走不了 )
    - 队头阻塞发生在那些地方: 可能存在于 ( **HTTP 应用层** ) 或 ( **TCP 传输层** )
      - **HTTP1.1**
        - HTTP 层和 TCP 层两层 都会队头阻塞
      - **HTTP2.0**
        - HTTP 层的队头阻塞:
          - 解决了 HTTP 层的队头阻塞，但是 TCP 层仍然会队头阻塞
        - TCP 层的队头阻塞:
          - 无法解决
          - 因为 TCP 协议在收到数据包之后，这部分数据可能是乱序到达的，但是 TCP 必须将所有数据收集排序整合后给上层使用，如果 ( 其中某个包丢失了，就必须等待重传 )，从而出现某个丢包数据 ( 阻塞 ) 整个连接的数据使用
      - **HTTP3.0**
        - QUIC 协议是基于 UDP 协议实现的，在一条链接上可以有多个流，流与流之间是互不影响的，当一个流出现丢包影响范围非常小，从而解决队头阻塞问题
        - 流与流之间完全独立互不影响
  - **2.RTT 建链**
    - ( 减少链接时长 ) 和 ( 优化链接性能 )
    - 问题
      - 问题: 什么是 RTT ?
      - 回答: 衡量网络建链的常用指标是 RTT ( Round-Trip Time )，也就是 ( 数据包一来一回的时间消耗 )
    - RTT 耗时对比
      - HTTPS -------- 2-3 个 RTT
      - HTTP3.0 ------ ( 1RTT 进行密钥交换 )，( 建立链接后的非首次链接，只需 0 个 RTT )
  - **3.解决 HTTP2.0 在移动互联网领域表现不佳(弱网环境)**
    - HTTP2.0 TCP
      - 切换网络会重连: TCP 当我们从 4G 环境切换到 wifi 环境时，手机的 IP 地址就会发生变化 ---------------- 这时必须创建新的 TCP 连接才能继续传输数据
    - HTTP3.0 QUIC
      - 切换网络不会重连: 基于 QUIC 协议之下，我们在日常 wifi 和 4G 切换时，或者不同基站之间切换都 ---------- 不会重连，从而提高业务层的体验

# (二) HTTP2.0

- 基本概念
  - 全双工通信
  - 一个 TCP 链接: ( 同一个域名 ) 下的 ( 所有的请求 ) 都是通过 ( 一个 TCP 链接 ) 并发完成
  - 二进制分帧: ( http1.1 是超文本 ) ( http2.0 是二进制帧 )
- 优点
  - 二进制分帧
  - 多路复用
  - 头部压缩
  - 服务端推送
- 缺点
  - 建立连接时间长(本质上是 TCP 的问题)
  - 队头阻塞问题
  - 移动互联网领域表现不佳(弱网环境)
  - 这些缺点基本都是由于 TCP 协议引起的

### (2.1) 二进制帧

- 二进制分帧 可以实现 多路复用
- 二进制分帧层: 在 ( HTTP 应用层 ) 和 ( TCP 传输层 ) 之间添加了 ( 二进制分帧层 )
- 二进制分帧
  - 帧:
    - 是 http2.0 通信的最小单位
    - 分为 ( head 帧 - head ) 和 ( data 帧 - body )
  - 流:
    - 是 TCP 连接中的一个 ( 虚拟通道 )，可以承载双向的消息
    - 每个流都有一个唯一的整数标识符 id，来标识 ( 不同的帧属于哪个流 )，从而实现 ( 乱序发送，然后在服务器侧，在二进制帧层通过 id 就行重组组装 )
    - 特点
      - 双向性：同一个流内，可以同时发送和接收数据
      - 有序性：流中传递的数据是二进制分帧
      - 并行性：流中的 二进制帧 都是被并行传输的，无需按顺序等待
      - 流的创建和关闭：可以被客户端和服务端单方面创建，也可以被单方面关闭
      - 流的 ID 都是奇数，说明是由客户端发起的，这是标准规定的
      - 流的 ID 都是偶数，说明是由服务端发起的

### (2.2) 多路复用

- 传输内容：http2 中采用 ( 二进制分帧传输 )，取代了 http1 中的 ( 文本传输 )
- 优点
  - 所有 ( 相同的域名的请求 ) 都通过 ( 同一个 tcp 链接并发完成 )
  - 通过对每个请求 stream 的唯一标识区别出是哪一个请求(帧属于哪个流)，并在传输到服务器后进行重组，实现并发无序发送

# (三) HTTP1.1

- 长链接
  - 响应头
    - Connection: Keep-Alive
    - Keep-Alive: timeout=5, max=1000
- 管道化
  - 仍然没有解决 HTTP 层的队头阻塞问题，因为返回时也需要按照请求的顺序返回
- 缓存
  - cache-control
- 断点续传
  - 请求头: Range: bytes=0-801
  - 响应头: Content-Range: bytes 0-800/801

# (四) HTTP1.0

- 无状态: 不保留请求过的状态
- 无链接: 每次请求都需要重新建立链接
- 扩展
  - HTTP1.0 的方法: GET POST HEAD
  - HTTP1.1 的方法: PUT PATCH DELETE OPTIONS CONNECT
- 扩展
  - 幂等性
    - GET 幂等
    - PUT 幂等
    - POST 非幂等
  - 范围
    - PUT 整体
    - PATCH 范围

# 扩展 - TCP 和 UDP

- UDP
  - 无链接
  - 丢包，错误包不会重传
  - 面向报文
  - 不会队头阻塞
  - 传输快，不可靠
  - 一对一，一对多，多对一，多对多
- TCP
  - 面向链接
  - 丢包，错误包不重传
  - 面向字节流
  - 队头阻塞
  - 传输慢，可靠
  - 全双工

# 扩展 - 有哪些常见的 - 请求头 和 响应头

- **缓存相关**
  - 强缓存: ( 请求头 Expires Cache-Control )
  - 协商缓存: ( 响应头 Last-Modified Etag ) ( 请求头 If-Modified-Since If-None-Match)
- **cors 相关**
  - 简单请求
    - 请求头
      - Accept Accept-Language Content-Language Last-Event-Id
      - Content-Type: application/x-www-form-urlencoded --------- 不能发送文件资源
      - Content-Type: multipart/form-data ----------------------- 可以发送文件资源
      - Content-Type: text/plain
      - Origin
      - ------ 分隔符 ------
      - Accept
      - Accept-Language
      - Content-Language
      - Last-Event-ID
      - Content-Type：只限于三个值 application/x-www-form-urlencoded、multipart/form-data、text/plain
    - 响应头
      - Access-Control-Allow-Origin
      - Access-Control-Allow-Credentials
      - Access-Control-Expose-Headers
  - 非简单请求
    - 响应头
      - Access-Control-Allow-Methods
      - Access-Control-Allow-Headers
- **HTTP1.1 相关**
  - 长链接: 响应头 Connection Keep-Alive
  - 缓存: Cache-Control
  - 断点续传: ( 请求头 Range ) ( 响应头 Content-Range )
- **CSRF 攻击**
  - referer

# 资料

- https://www.51cto.com/article/625999.html
