##### (一) Questions

// [1,2,3].map(parseInt) -------------- [1, NaN, NaN]
// [1,7,11].map(parseInt) ------------- [1, NaN, 3]
// [10,10,10,10].map(parseInt) -------- [10, NaN, 2, 3]

##### (二) analyze 分析

```
A.
[1, 2, 3].map(parseInt)
相当于
[1, 2, 3].map(parseInt(value, index))
相当于
[1, 2, 3].map((value, index) => parseInt(value, index))

parseInt(1, 0) // 1 --------- 分析：radix=0，根据前面的字符串来判断，不是 0 或 0x 开头，都以 10 进制来解析 -- 表示把八进制1转成十进制 => 1
parseInt(2, 1) // NaN ------- 第二个参数 radix 必须在 2-36 之间
parseInt(3, 2) // NaN ------- 3 不能作为二进制
// 最终结果 [1, NaN, NaN]
// 特例: 因为 parseInt(string, radix) 的第二个参数radix， 必须在 2-36之间，而数组的index是1，所以数组的 ( 第二个元素 ) 通过 ( map(parseInt) ) 始终是 ( NaN )
---


B.
[10,10,10,10].map(parseInt)
[10,10,10,10].map((value, index) => parseInt(value, index))
parseInt(10, 0) // 10
parseInt(10, 1) // NaN
parseInt(10, 2) // 2
parseInt(10, 3) // 3
// 最终结果 [10, NaN, 2, 3]
```

##### (三) parseInt(string, radix)

```

1
parseInt(string, radix)

- 作用
  - 解析参数字符串，返回解析成功的 ( 十进制整数 )，不能解析返回 ( NaN )
  - 从书面意思上就能知道：是解析成 ( 整数 )
  - 注意: 最终结果是 ( 10 进制数 ) 或者 ( NaN )
- 参数
  - string：表示需要解析的字符串，不是字符串则会将其转化为字符串
  - radix
    - 含义
      - 表示 从 `2` 到 `36` 字符串的基数
      - 例如指定 `16` 表示被解析值是十六进制数
      - radix 英语是( 基数 ) 的意思
    - 当 radix 是 ( 0，undefined，未指定 ) 三种情况时，做如下处理
      - 参数字符串以 '0x' 开头 -------------------- 将 ox 其于部分解析成十六进制的整数
      - 参数字以数字 0 开头(数字，不是字符串) -------- 将 o 其于部分解析成八进制
      - 其他类型的字符串 -------------------------- 解析为十进制的整数
- 返回值
  - 从给定的字符串中解析出的一个十进制整数
  - 1. 要么是一个十进制整数
  - 2. 要么是 NaN

- 例子
  - parseInt('0x11') -------------- 17
  - parseInt(010, ) --------------- 8

- Special case.
  - parseInt(012, 0) ------- 10 // 当第二个参数是 ( 0 || undefined || 不传 ) 时，前面的数字以 0 开头，当8进制来解析成10进制
  - parseInt('0x11', 0) ---- 17 // 当第二个参数是 ( 0 || undefined || 不传 ) 时, 前面的字符串以 '0x' 开头，当16进制...

- examples
  - The following examples all return number 15
  - parseInt("0xF", 16);
  - parseInt("F", 16);
  - parseInt("17", 8);
  - parseInt("015", 10); // but `parseInt('015', 8)` will return 13
  - parseInt("15,123", 10);
  - parseInt("FXX123", 16);
  - parseInt("1111", 2);
  - parseInt("15 * 3", 10);
  - parseInt("15e2", 10);
  - parseInt("15px", 10);
  - parseInt("12", 13);
```

##### English

```
radix 基数
parse 语法分析
```
