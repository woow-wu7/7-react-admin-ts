# 跨域

- 联系: Security 安全性相关的 XSS 攻击
- 扩展
  - secure 安全的 adj / 安全 n
  - security 安全 n
  - domain 领域 域名
  - // TIPS: Pay attention to the pronunciation of the word 'domain'. [domain-领域-域名-n]

## (2) 跨域通信

### (1) BroadcastChannel

- 联系: 注意跨标签通信时，会出现 XSS 攻击，通过接收消息时的 e.origin 可以得知发送消息的页面，可做白名单验证防止 XSS
- broadcast: 是广播的意思
- channel: 是频道，通道的意思

```
const broadcast = new BroadcastChannel("广播唯一标记ID");

发消息: broadcast.postMessage('发送的内容')
收消息: broadcast.onmessage = (e) => { e.data }
注意点: postMessage 和 onmessage 的大小写
```

### (2) storage 事件

```
发消息
- localStorage.setItem 会触发 storage 事件
button.addEventListener(
  "click",
  () => {
    window.localStorage.setItem(
      "data",
      JSON.stringify(`这是通过 localStorage 新存储的数据: ${+new Date()}`)
    );
  },
  false
);


收消息
window.addEventListener(
  "storage",
  function (e) {
    console.log("通过storage事件监听变化获取数据", e.newValue);
  },
  false
);
```

### (3) window.open

- 联系: 注意跨标签通信时，会出现 XSS 攻击，通过接收消息时的 e.origin 可以得知发送消息的页面，可做白名单验证防止 XSS

```
发消息
const targetWindow = window.open(
  "file:///Users/wuxia/work/personal/front_end/6-penetrate/FRONTEND/JS/1-cross-domain/%E8%B7%A8%E5%9F%9F%E9%80%9A%E4%BF%A1-%E6%94%B6%E6%B6%88%E6%81%AF.html",
  "新标签页"
);
button.addEventListener(
  "click",
  () =>
    targetWindow.postMessage("这是通过 window.open() 发送的消息", "*"),
  false
);


收消息
window.onmessage = (e) => {
  console.log("e.origin :>> ", e.origin);
  console.log("这是通过 window.open() 接收到的消息", e.data);
};
```
