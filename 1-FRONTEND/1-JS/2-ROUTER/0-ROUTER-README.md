### 前端路由

[[深入 11] 前端路由](https://juejin.cn/post/6844904054846390279)

### 常见问题

```
1. Why does the HistoryRouter need the support of the server? -- 详见 (二) history 路由
2. What's the difference between HashRouter and HistoryRouter ?
```

### 一些单词

```
anchor 锚
protocol 协议 n
domain 领域 域 n
// TIPS: Pay attention to the pronunciation of the word 'domain'. [domain-领域-域-n]
```

### 前置知识

```1111111 - URL的组成
1
URL的组成
---

http://www.baidu.com:80/stu/index.html?name=xxx&age=25#teacher

- protocol: 协议 http:// ，https://
- domain: 域名 www.baidu.com
- port: 端口 :80
  - http 协议的默认地址是: 80
  - https 自已的默认地址是: 443
- path: 文件路径， => /开始 ?之前的部分， 本例中是：/stu/index.html
- query: 查询字符串 => ?开头到结尾，或者?开头到#之前，本例是：?name=xxx&age=25
- hash: 哈希值 => #开头到结尾，本例是：teacher
```

```2222222 - DOMContentLoaded事件 和 load事件
2
DOMContentLoaded事件 和 load事件
---

- DOMContentLoaded: DOM加载完成时触发
- load: 需要 DOM，样式，脚本，图片，视频，等 ( 所有资源 ) 都加载完成时才会触发，即 ( 页面加载完成时触发 )
```

```3333333 - window.history
3
window.history 对象
---

window.history
- 方法:
  - go()
  - back()
  - forward()
  - pushState()
  - replaceState()

pushState 和 replaceState
- 不会触发页面刷新，只能导致History对象发生变化，地址栏的url会变化
- 会改变url，不会触发 popstate 事件，地址栏的url有所变化
- 注意: window.history.pushState() 和 window.history.replaceState() 不会触发 popstate 事件

window.history.pushState()
- window.history.pushState(state, title, url)
  - state：一个与添加的记录相关联的对象
  - title：新页面的标题，现在所有浏览器都忽略该参数，可以传入空字符串
  - url：新的url地址，必须与当前页面同一个域，浏览器的地址栏显示这个网址
- 例子: window.history.pushState({}, null, url)
- 特点: pushState不会刷新页面，只会改变History对象，地址栏url会变化

popstate
- 触发的条件:
  - 浏览器的前进后退按钮
  - history.go()， history.back()， history.forward() 等
```

```4444444 - void(0)
4
void(0) === undefined // true
void(0)的好处
- 在某些情况下用全局的undefined判断是有风险的。因为他可能会被修改过。而void 0在任何情况下返回的都是undefined，同时兼容性上所有浏览器都是支持的。
---

<a href="javascript:void(0)" data-href="/home">home</a>
```

## (一) hash 路由

- 当 hash 改变时，可以触发 hashchange 事件，在监听函数中可以请求数据，实现页面的更新操作 ------- 通过 window.location.hash 拿到最新变化后的 hash 值
- 当 hash 发生改变时，页面不会刷新，浏览器也不会向服务器发送请求
- url 中的 hash 以 # 号开头，原本用来作为锚点，从而定位到页面的特定区域

```1111111
1
hashchange事件
- 如果监听了hashchange事件，当 ( hash改变 )，( 地址栏的url中的hash部分就会改变 )，同时 ( hashchange也会触发 )
- 但是页面不会刷新，即浏览器的刷新按钮的圈圈不会转动
---

<body>
  <a href="#anchor1">锚点1</a>
  <a href="#anchor2">锚点2</a>
  <script>
    window.addEventListener('hashchange', function() {
      console.log('111111111')
    }, false)
  </script>
</body>
说明：
- 点击a标签，url中的hash改变，hash改变，hashchange事件触发，则监听函数就会执行，输出111111
```

```2222222
2
手写一个hash路由
- 详见 本项目/2-FRONTEND/1-JS/20-router/hash-router.html
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <a href="#/home">home</a>
    <a href="#/other">other</a>
    <div id="content">content初始内容</div>

    <script>
      const routes = [
        {
          path: "#/home",
          content: "这是home页面",
        },
        {
          path: "#/other",
          content: "这是other页面",
        },
      ];

      // hash router
      class HashRouter {
        constructor(routes) {
          this.createRouteMap(routes);
          this.init();
        }

        routeMap = {};

        createRouteMap = (routes) => {
          routes.forEach((route) => {
            this.routeMap[route.path] = () =>
              (document.getElementById("content").innerHTML = route.content);
          });
        };

        init = () => {
          window.addEventListener("load", this.updateView, { capture: false });
          window.addEventListener("hashchange", this.updateView, {
            capture: false,
          });
        };

        updateView = () => {
          const hash = window.location.hash;

          this.routeMap[hash]?.();
        };
      }

      new HashRouter(routes);
    </script>
  </body>
</html>
```

## (二) history 路由

- 优点: pushState()和 replaceState()可以改变 url，且实现不向服务器发送请求，不存在#号，比 hash 路由更美观
- 缺点: 但是 History 路由需要服务器的支持，并且需将所有的路由重定向到根页面
- 原理:
  - 第一条线: pushState
    - 1. 每个 a 标签的 ( href ) 属性要设置成空，并且要设置 ( 自定义属性-值为导航的路由 path ) ------------ <a href="javascript:void(0)" data-href="/home">home</a>
    - 2. 遍历所有 a 标签，给每个 a 标签添加 ( click 事件 )，在 click 事件中 ( 获取 data-href 属性 )，然后调用 ( window.history.pushState({}, null, data-href) 来改变 history 对象，同时地址栏的 path 会改变 )
    - 3. 当地址栏的 path 改变后，我们就可以通过 ( window.location.pathname 获取最新的 path，即 data-href 属性的值 )，然后在 routes 中匹配 path，匹配上就更新 component
  - 第二条线
    - 如果是 ( 浏览器的前进，后退按钮 )，或者通过 ( window.history.go() back() forward() 等触发时，我们需要执行 popstate 事件 ) -- 比如：window.history.go(-1)
- 需要的 API
  - window.history.pushState({}, null, path)
  - window.history.replaceState()
  - popstate 事件 -> 1.浏览器前进，后退按钮会触发 2.window.history.go()/back()/forward()会触发
- **【 问题: 为什么 history 路由需要 服务器 的支持？ 】**
- 回答:
  - 1. (file://)文件协议: 在本地通过浏览器打开 html 文件是 ( file://协议，而 file//协议是 - 不允许直接修改 window.history.pushState() )
  - 2. window.history.pushState() 和历史记录相关的操作需要 HTTP 协议的支持，在文件协议 (file://) 下，浏览器会限制一些操作，包括 ( 修改历史记录 )
  - 具体报错: _Failed to execute 'pushState' on 'History': A history state object with URL 'file:///home' cannot be created in a document with origin 'null'_

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- data-href 为自定义属性 -->
    <a href="javascript:void(0)" data-href="/home">home</a>
    <a href="javascript:void(0)" data-href="/other">home</a>
    <button id="button">
      手动执行 window.history.go() 触发 popstate 事件来导航
    </button>
    <div id="content">content初始内容</div>

    <script>
      const routes = [
        {
          path: "/home",
          content: "这是home页面",
        },
        {
          path: "/other",
          content: "这是other页面",
        },
      ];

      // history router
      // 记得要用本地服务器启动才可以
      class HistoryRouter {
        constructor(routes) {
          this.createRouteMap(routes);
          this.bindEvent();
          this.init();
        }

        routeMap = {};

        createRouteMap = (routes) => {
          routes.forEach((route) => {
            this.routeMap[route.path] = () =>
              (document.getElementById("content").innerHTML = route.content);
          });
        };

        bindEvent = () => {
          const aList = document.getElementsByTagName("a"); // document.getElementsByTagName() 返回的是 HTMLCollection 动态集合，不是数组，需要用 Array.from() 转成 数组
          Array.from(aList).forEach((a) => {
            a.addEventListener("click", () => {
              const path = a.getAttribute("data-href");
              window.history.pushState({}, null, path);
              this.updateView();
            });
          });
        };

        updateView = () => {
          const path = window.location.pathname;
          this.routeMap[path]?.();
        };

        init = () => {
          window.addEventListener("load", this.updateView, { capture: false });
          window.addEventListener("popstate", this.updateView, {
            capture: false,
          });
        };
      }

      const button = document.getElementById("button");
      button.addEventListener("click", () => window.history.go(-1));

      new HistoryRouter(routes);
    </script>
  </body>
</html>
```
