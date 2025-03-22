# 回文字符串

- 英语：palindromic string
- palindrome 回文 n
- palindromic 回文的 adj

### (1) 判断一个字符串是不是 palindromic string 的方法有哪些？

- 反转字符串
  - 优点
    - 不用考虑字符串是 ( 奇数还是偶数 )
- 双指针
  - 原理
    - 字符串转成数组，然后从数组的 ( 两端向中间遍历 )，判断是不是相等
  - 优点
    - 同样不需要虑字符串是 ( 奇数还是偶数 )
- 递归
  - 原理
    - 1. 如果传入的字符串长度是 ( 0 或 1 )，则直接返回 true，也就是说一定是回文字符串，因为递归函数执行的条件是对比的前后字符相等
    - 2. 每次递归都缩小范围 ( 因为进入递归，说明两端的值相等，那么就减去两端的范围 )

### (1) 反转字符串

```
function palindromicString_reverse(str) {
  const reverseStr = str.split("").reverse().join("");
  return str === reverseStr;
}
const result = palindromicString_reverse(str);
console.log("result", result);
```

### (2) 双指针

```
function palindromicString_pointer(str) {
  for (
    let left = 0, right = str.length - 1;
    left <= right;
    left++, right-- // 左增右减
  ) {
    if (str[left] !== str[right]) return false;
  }
  return true;
}
const pointerResult = palindromicString_pointer(str);
console.log("pointerResult: ", pointerResult);
```

### (3) 递归

- 递归结束的条件
  - 1. start 和 end 不相等 ------------------------------------------ 返回 false
  - 2. 直到缩小到最小的范围的字符串长度是 0 或 1 时，start 和 end 都相等，----- 返回 true

```
function palindromicString_recursive(str) {
  const len = str.length;
  if (len <= 1) return true;
  // 如果是空字符串 或 字符串长度是1，则一定是回文字符串 ----- '' 或 '1'
  // -------------------- 递归结束条件1 ----- true

  const start = str[left];
  const end = str[str.length - 1]; // 这里使用 const 是因为每次递归都是新声明的常量，常量的值本身不会改变

  return start === end
    ? palindromicString_recursive(str.slice(1, str.length - 1))
    : false; // -------- 递归结束条件2 ------ false
}
```
