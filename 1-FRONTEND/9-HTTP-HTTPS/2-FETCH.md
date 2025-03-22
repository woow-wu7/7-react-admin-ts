### Fetch

```
fetch('url')
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(err => console.log('Request Failed', err));
以上使用 async 改写
async function getJSON() {
  let url = 'xxx';
  try {
    let response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log('Request Failed', error);
  }
}


---
1
response
- response: is a Stream Object
- response.json(): is async operation. get the all contents, and convert it to json.


---
tutorial
- https://juejin.cn/post/6844903734716137479
```
