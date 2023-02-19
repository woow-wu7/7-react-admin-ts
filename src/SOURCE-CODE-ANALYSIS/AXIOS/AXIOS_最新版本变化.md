# AXIOS 新版本的一些变化

- [axios 源码分析](https://juejin.cn/post/6844904147532120072)

## 一些单词

```
cancellation 取消 // noun名词
deprecate 被废弃 过时 不赞成
abort 终止 放弃
```

## 取消请求

- 之前版本: CancelToken Cancel isCancel
- 最新版本: AbortController

### 1. 之前的版本

```11111111111111111111111111111111111
之前版本
取消请求一共有两种方式
----------

1
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function (thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // handle error
  }
});

axios.post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token
})

// cancel the request (the message parameter is optional)
source.cancel('Operation canceled by the user.');
----------


2
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // An executor function receives a cancel function as a parameter
    cancel = c;
  })
});

// cancel the request
cancel();
```

### 2.最新版本 1.3.3

- AbortController: 在最新版本中，已经不建议使用 cancelToken 了，提供了最新的 api: AbortController

```222222222222222222222222222222
const controller = new AbortController();

axios.get('/foo/bar', {
   signal: controller.signal
}).then(function(response) {
   //...
});
// cancel the request
controller.abort()
```

# AbortController
- 可以作用于 fetch, addEventListener 等
- XMLHttpRequest
  - GET POST 文件位置: 本项目/2-FRONTEND/1-JS/3-XMLHttpRequest.html
  - abort 取消请求文件位置: 本项目/2-FRONTEND/1-JS/HH-AbortController/AbortController.html
- fetch
  - const abortController = new AbortController()
  - const res = await fetch( "url...", { signal: abortController.signal } )
  - abortController.abort();
- addEventListener

### fetch - AbortController

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
