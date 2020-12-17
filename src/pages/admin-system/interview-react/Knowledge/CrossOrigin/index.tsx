import React, { useEffect, useState } from 'react'

const CrossOrigin = () => {

  const [links] = useState([
    {
      name: 'CORS',
      url: 'http://www.ruanyifeng.com/blog/2016/04/cors.html'
    },
  ])
  useEffect(() => {
    /**
     * cors
     * 
     * (一) 简单请求
     * - 简单请求的 ( 两个条件 )
     *   - 请求的方法：
     *     - GET 
     *     - POST
     *     - HEAD
     *   - 请求的头信息，不超出以下字段
     *     - Accept
     *     - Accept-Language
     *     - Content-Language
     *     - last-Event-ID
     *     - Content-Ttype: 只限于 
     *       - application/x-www-form-urlencode
     *       - multipart/form-data
     *       - text/plain
     * - 请求头
     *   - Origin
     * - 响应头
     *   - Access-Control-Allow-Origin
     *     - Origin: 请求头 Origin 的值
     *     - * ：表示接受任意域名的请求
     *   - Access-Control-Allow-Credentials
     *      - Access-Control-Allow-Credentials: true
     *      - xhr.withCredentitals = true
     *   - Access-Control-Expose-Headers
     *      - Cache-Control
     *      - Content-Language
     *      - Content-Type
     *      - Expires
     *      - Last-Modified
     *      - Pragma
     *      - 除了这6个字段，想拿到其他字段，就必须在Access-Control-Expose-Headers中指定
     * 
     * (二) 非简单请求
     * - 非简单请求是对服务器要求的请求
     * - 非简单请求的Cors请求，会在正式请求之前，增加一次 HTTP 查询请求，称为 `预检请求 ( preflight )`
     * - 1. 请求方法：比如 PUT DELETE
     * - 2. Content-Type: application/json
     * 
     * (1) 预检请求
     * - 请求头：
     *   - Origin
     *   - Access-Control-Request-methods
     *   - Access-Control-Request-Headers
     * - 响应头
     *   - Access-Control-Allow-Methods
     *   - Access-Control-Allow-Headers
     *   - Access-Control-Allow-Credentials
     *   - Access-Control-Max-Age
     * 
     */
  }, [])

  useEffect(() => {
    // nginx
    // 在 ( nginx.conf => http => server => location => proxy_pass )中设置
    /**
     * http {
     *  server {
     *    listen 8080;
     *    server_name localhost;
     * 
     *    location / {
     *      proxy_pass http://localhost:3000;
     *    }
     * }
     * }
     */
  }, [])

  useEffect(() => {
    // jsonp

  }, [])

  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)
  return (
    <div className="cross-origin">
      <p>跨域</p>
      <div>
        {renderLinks()}
      </div>
    </div>
  )
}



export default CrossOrigin
