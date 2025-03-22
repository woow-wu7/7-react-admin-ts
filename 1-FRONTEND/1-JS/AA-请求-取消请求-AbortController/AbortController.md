# 中断请求

- [axios-源码分析](https://github.com/woow-wu7/7-react-admin-ts/tree/master/src/SOURCE-CODE-ANALYSIS/AXIOS)
- [axios-源码分析-掘金](https://juejin.cn/post/6844904147532120072)
- [axios-手写中间件-手写取消请求](https://github.com/woow-wu7/6-penetrate/blob/main/2-FRONTEND/1-JS/8-promise/AXIOS-MIDDLEWARE/axios-middleware.html)
- [XHMHttpRequest 和 fetch 终止请求的区别](https://github.com/woow-wu7/6-penetrate/blob/main/2-FRONTEND/1-JS/HH-AbortController)

- XMLHttpRequest
  - GET POST 文件位置: 本项目/2-FRONTEND/1-JS/3-XMLHttpRequest.html
  - abort 取消请求文件位置: 本项目/2-FRONTEND/1-JS/HH-AbortController/AbortController.html
- fetch
  - const abortController = new AbortController()
  - const res = await fetch( "url...", { signal: abortController.signal } )
  - abortController.abort();
- addEventListener

# fetch - AbortController

- 作用
  - 1. 终止 fetch 请求
    - fetch: AbortController
      - abortController.signal
      - abortController.abort()
    - XMLHttpRequest: 注意对比 XMLHttpRequest 中的终止请求 xhr.abort
  - 2. 终止 addEventListener 事件

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
    <button id="fetch">发起fetch</button>
    <button id="fetch-cancel">取消fetch</button>
    <script>
      // 1
      // fetch 终止请求
      const abortController = new AbortController();
      const signal = abortController.signal;

      const fetchRequest = async () => {
        const res = await fetch(
          "https://api.66mz8.com/api/translation.php?info=I come from China TestGetStaticProps",
          {
            signal,
          }
        ).then((response) => response.json());
        console.log("res", res);
        return res;
      };

      const fetchRequestCancel = () => {
        abortController.abort();
      };

      // fetch request
      const fetchButton = document.getElementById("fetch");
      fetchButton.addEventListener("click", fetchRequest);

      // fetch cancel
      const fetchSignalButton = document.getElementById("fetch-cancel");
      fetchSignalButton.addEventListener("click", fetchRequestCancel, false);
    </script>
  </body>
</html>
```
