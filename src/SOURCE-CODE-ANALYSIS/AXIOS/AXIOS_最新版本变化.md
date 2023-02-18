# AXIOS 新版本的一些变化

- [axios 源码分析](https://juejin.cn/post/6844904147532120072)

### 一些单词

```
cancellation 取消 // noun名词
deprecate 被废弃 过时 不赞成
```

### 取消请求

- 之前版本: CancelToken Cancel isCancel

```
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
