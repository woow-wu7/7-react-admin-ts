# security 前端安全

- xss 跨站脚本攻击 - cross site script
- csrf 跨站请求伪造 - cross site request forgery
- 爬虫预防
  - 请求头: User-Agent --- 来判断用户是使用什么浏览器访问
  - 请求头: Referer ------ 网页是从哪里跳过来，也是 xss 的预防手段
  - Ajax: --------------- POST 代替 GET
  - Cookie: ------------- HttpOnly，也是 xss 的预防手段
  - 验证码: -------------- 也是 csrf 的预防手段

```
English
--

forge 伪造 锻造 v
forgery 伪造 锻造 n


secure 安全的adj 保护n
security 安全 n
-
【 social security. 社保 】
【 network security. 网络安全 】
【 information security. 信息安全 】
【 sense of security 安全感 】
-
【 security check. 安检 】
【 security camera. 监控摄像机 】
-
// 【 Security checks 】 can ensure 【 information security 】 and 【 network security 】, bringing people 【 a sense of security 】. 安检可以保证信息安全和网络安全，给人带来安全感
-
// Everyone should pay their 【 social security 】 and 【 individual income tax 】 【 on time 】. 每个人都应该按时缴纳社保和个人所得税


verify 验证 v
【 verification code. 验证码 】
```

## (1) xss 跨站脚本攻击

- 概念
  - xss 是 ( cross site script 跨站脚本攻击 )
  - cross site script 原本的缩写是 css，但是为了区分层叠样式表 css，改写为 XSS
- 攻击原理
  - XSS 攻击是指攻击者在网站上注入恶意的客户端代码，通过 恶意脚本 对客服端网页进行篡改，从而在用户浏览网页时，对用户浏览器就行控制，或者获取用户隐私数据一种攻击方式
- 恶意脚本
  - 主要指 javascript 代码，有时也指 html 和 flash
- 攻击方式
  - 有多种，共同的特征是：窃取用户的隐私数据
- 攻击类型
  - 可以分为三类
  - 反射型(非持久型)
  - 储存型(持久型)
  - 基于 DOM
- **危害**
  - 利用虚假的输入 ( 表单 )，骗取用户输入的 ( 用户信息 )
  - 利用 ( 脚本 )，获取用户的 ( cookie )
  - 显示伪造的 文章 和 图片
- **如何预防 XSS 攻击？**

  - 1. **设置 httpOnly**
    - cookie 是在服务端生成的，通过在响应头上的 set-cookie 字段来体现，除了设置 cookie 的值，还可设置 cookie 的属性，比如 Expires Max-Age Domain Path Secure HttpOnly
    - `Set-Cookie: key1=value1; domain=example.com; path=/blog; HttpOnly;Secure;`
      - Expires Max-Age
      - Domain Path
      - **Secure** 表示只允许 HTTPS
      - **HttpOnly** 表示 cookie 无法通过脚本获取
        - js --------------> document.cookie 读写 cookie
        - XMLHttpRequest --> xhr.getResponseHeader('Set-Cookie') 获取 cookie
  - 2. **过滤检查**

    - 对 input, textArea, form 表单做特殊符号的过滤检查
    - HtmlEncode：对 html 标签进行转换
    - JavascriptEncode：对 js 一些特殊符号进行转码

      ```
        (1) HtmlEncode：对html标签进行转换
        <  --------------------- &lt
        >  --------------------- &gt
        &  --------------------- &amp
        '' --------------------- &quot
        空格 ------------------- &nbsp

        (2)
        因为: 对于a标签，直接 HtmlEncode 还是不够，因为a标签的href中没有插入标签
        所以: 对于 a 标签，我们需要用 ( 白名单 ) 来做过滤
        <a href="javascript:alert(1)">点击a标签</a>
        <a href="Javascript:alert(1)">点击a标签</a><!-- Javascript第一个字母大写，也会生效 -->
        <a href="JAvascript:alert(1)">点击a标签</a><!-- JAvascript第一二个字母大写，也会生效 -->

        (3) JavascriptEncode：对js一些特殊符号进行转码
        \n --------------------- \\n
        \r --------------------- \\r
        "  --------------------- \\"
      ```

  - 3. **当跨标签通信时也会发生 XSS 攻击，所以通过事件对象上的 e.origin 来判断可信源**

    - 比如通过 window.open().postMessage 进行多标签通信时，在接受消息的标签页上通过 `window.onmessage = (e) => {}` 获取 e.origin 进行判断
    - BroadcastChannel 和 window.open() 一样，都可以通过 e.origin 来获取到发送消息的页面地址，详见 `FRONTEND/JS/1-cross-domain/README.md`

      ```
      发消息
      ---
      const targetWindow = window.open(
        "http://127.0.0.1:5500/FRONTEND/JS/1-cross-domain/%E8%B7%A8%E5%9F%9F%E9%80%9A%E4%BF%A1-%E6%94%B6%E6%B6%88%E6%81%AF.html",
        "新标签页"
      );
      button.addEventListener(
        "click",
        () =>
          targetWindow.postMessage("这是通过 window.open() 发送的消息", "*"),
        false
      );
      ```

      ```
      收消息
      ---
      window.onmessage = (e) => {
        console.log("e.origin :>> ", e.origin); // 通过 e.origin 查看发送消息的源信息是否是可信的网页
        console.log("这是通过 window.open() 接收到的消息", e.data);
      };
      ```

## (2) csrf 跨站请求伪造攻击

- 概念
  - csrf 是 ( cross site request forgery 跨站请求伪造 ) 的缩写
  - CSRF 是一种劫持受信任用户向服务器发送非预期请求的攻击方式
  - forgery 伪造 锻造 n 是伪造的意思
  - forge 伪造 锻造 v
- 原理
  - 主要是通过获取用户在目标网站的 cookie，骗取目标网站的服务器的信任，在用户已经登录目标站的前提下，访问到了攻击者的钓鱼网站，攻击者直接通过 url 调用目标站的接口，伪造用户的行为进行攻击，通常这个行为用户是不知情的。
  - 即获取了 cookie，就可以做很多事情：比如以你的名义发送邮件、发信息、盗取账号、购买商品、虚拟货币转账等等
- **【 预防 CSRF 攻击 ( 四种方法 ) 】**
  - **【 验证码 verification code. 】**
    - CSRF 往往是在用户不知情的情况下构建了网络请求，而验证码会强制用户必须与应用进行交互才能完成最终的请求
  - **【 Referer 】** 检查
    - HTTP ( 请求头 ) 中有 ( Referer ) 字段，表示请求来源地址，通过 Refer 可以检查请求是否来自合法的源，服务器只对合法的源予以响应
    - 扩展
      - Referer 发送的条件
        - 不发送 Referer: 地址栏输入网址 和 书签
        - 发送 Referer: 网页链接 表单 网页加载静态资源，比如加载图片、脚本、样式
        - 链接: https://www.ruanyifeng.com/blog/2019/06/http-referer.html
  - **【 token 】**
    - CSRF 主要就是获取 cookie，所以要防御的话，就需要在请求中加入攻击者不能伪造的信息，并且该信息不能保存在 cookie 中
    - 好处: token 是可以跨端的，而 cookie 只能在浏览器环境中，比如在手机系统上就不存在 cookie
  - **【 响应头 `Set-Cookie: SameSite=Strict` 】**
    - 作用
      - Cookie 的 SameSite 属性用来限制 ( 第三方 cookie - 这种第三方网站引导发出的 Cookie，就称为第三方 Cookie )
      - Chrome 51 开始，浏览器的 Cookie 新增加了一个 SameSite 属性，用来防止 CSRF 攻击和用户追踪
    - 属性
      - Strict Lax None
      - Set-Cookie: SameSite=Strict
        - 完全禁止第三方 cookie
      - Set-Cookie: SameSite=Lax
        - 规则稍稍放宽，大多数情况也是不发送第三方 Cookie，但是导 航到目标网址的 Get 请求除外 ( lax 是松散的意思 )
      - Set-Cookie: SameSite=None
        - 无论是否跨站都会发送 Cookie
- 案例

```
案例：

CSRF攻击的思想：（核心2和3）
1、用户浏览并登录信任网站（如：淘宝）
2、登录成功后在浏览器产生信息存储（如：cookie）
3、用户在没有登出淘宝的情况下，访问危险网站
  // 注意：如果该cookie在没有设置过期时间或者为null，默认是会话时间session-cookie，关闭浏览器后cookie会被清除
  // Expires，Max-Age可以设置cookie的过期时间
  // 所以这里强调了是没有登出的情况，就有cookie被获取的风险
  // 如果cookie设置了具体的过期时间，有效期内都可能被获取
4、危险网站中存在恶意代码，代码为发送一个恶意请求（如：购买商品/余额转账）
  // 该请求，携带刚刚在浏览器产生的信息(cookie)，进行恶意请求
5、淘宝验证请求为合法请求（区分不出是否是该用户发送）
  // 用HTTP中的header头中的 Refer 来预防
  // refer 可以检查请求源，只有合法的请求来源服务器才予以响应
6、达到了恶意目标
```

### (3) 资料

- https://tech.meituan.com/2018/09/27/fe-security.html
