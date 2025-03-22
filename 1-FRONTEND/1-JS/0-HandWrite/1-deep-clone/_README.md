# 对象深拷贝

- [[深入 09] 深浅拷贝](https://juejin.cn/post/6844904053764259854)

### 前置知识

```11111111111
1
for...in 和 for...of 的区别？
---

for...in
- 可以遍历 对象 和 数组
- key: 遍历的是 数组 的 ( 下标 )
- key: 遍历的是 对象 的 ( 属性名 )
- 需要注意的是
  - 因为: for...in 可以遍历 ( 自身可枚举属性 + 继承的可枚举属性 )，不能遍历 ( 自身不可枚举属性 + 继承的不可枚举属性 )
  - 所以: 一般情况下，都是只想遍历对象自身的属性，所以使用for...in的时候，应该结合使用 hasOwnProperty 方法
  - 遍历枚举: for...in 可以遍历 ( 自身的可枚举属性 ) 和 ( 继承的可枚举属性 )
- 扩展1
  - 问题: 如何定义一个对象的属性是否可枚举
  - 定义可枚举属性: Object.defineProperty(obj, "can_enum", { enumerable: true, writable: true, configurable: true, value: 'true'})
  - 定义不可枚举属性: Object.defineProperty(obj, "can_not_enum", { enumerable: false, writable: true, configurable: true, value: 'false'})
- 扩展2
 - hasOwnProperty
 - 所以我们在使用 for...in 遍历时，需要使用 ( hasOwnProperty ) 来遍历 ( 自身可枚举属性 ), 而避免去遍历 ( 继承的可枚举属性 )
- 扩展3
  - tutorial
  - [enumerable](file:///Users/xiawu/work/personal/frontend/8-penetrate/1-FRONTEND/1-JS/0-HandWrite/1-deep-clone/66_text-enumberable-forin.html)

for...of
- 只能遍历 数组，不能遍历对象
- 能遍历 Map，Set，某些类似数组的对象: 一个数据结构只要部署了 Symbol.iterator 属性，就被视为具有 iterator 接口，就可以用for...of循环遍历它的成员
- value: 遍历的是数组的 value

var arr = ['a', 'b', 'c', 'd'];
for (let a in arr) { console.log(a); // 0 1 2 3 }
for (let a of arr) { console.log(a); // a b c d }

扩展
- for...in
- Object.keys
- Object.getOwnPropertyNames
- Reflect.ownKeys
- 以上四者的区别 案例详见: 链接: 本项目/2-FRONTEND/1-JS/DD-遍历对象/对象的遍历.html
- [The difference between the functions above.](file:///Users/xiawu/work/personal/frontend/8-penetrate/1-FRONTEND/1-JS/DD-遍历对象/对象的遍历.html)
```

```22222222222
2
Object.keys() 和 Object.getOwnPropertyNames()
---

Object.keys() ------------------------ 遍历 自身可枚举属性
Object.getOwnPropertyNames() --------- 遍历 自身属性可枚举属性 + 自身不可枚举属性

链接: 本项目/2-FRONTEND/1-JS/DD-遍历对象/对象的遍历.html
```

### (1) 浅拷贝

- 对象浅拷贝
  - Object.assign()
  - {...object}
- 数组浅拷贝
  - Array.prototype.slice() 不加参数
  - Array.prototype.concat() 不加参数
  - [...array]

### (2) 深拷贝

- JSON.parse(JSON.stringify())
  - 只能拷贝 对象和数组
  - 不能拷贝 函数，循环引用，原型链上的属性和方法
- 手写

### (3) 手写深拷贝

- 需要解决的问题
  - 循环引用 ----------------------------- Map
  - symbol 类型的 key -------------------- Reflect.ownKeys
  - 特殊的对象: Date Error RegExp 等 ------ 结构化克隆

```
// 深拷贝 - 总

// 深拷贝 需要解决的问题
// - 循环引用 ----------------------------- Map
// - symbol 类型的 key -------------------- Reflect.ownKeys
// - 特殊的对象: Date Error RegExp 等 ------ 结构化克隆

const obj = {
  num: 1,
  str: "string",
  boo: true,
  nul: null,
  undefined: undefined,
  [Symbol("symbol")]: "symbol", // symbol key
  big: BigInt(9007199254740991), // bigint
  arr: [1, 2, 3],
  obj: {
    name: "woow_wu7",
    obj2: { age: 10 },
  },
  date: new Date(), // 特殊对象，结构化克隆
  regexp: new RegExp(),
  error: new Error(), // SyntaxError ReferenceError RangeError TypeError URIError EvalError
};
obj.circle = obj; // 循环引用

// ------------------------------------------------
// deepClone
// - 参数：再添加一个参数map，用来存储所有递归时传入的参数，该参数表示的是需要克隆的对象，如果该参数存在，就直接从缓存中取
const deepClone = (obj, map = new Map()) => {
  if (
    (typeof obj !== "object" && typeof obj !== "function") ||
    obj === null
  ) {
    return obj; // 如果不是对象，数组，function => 则是原始类型，直接返回；
  }

  let res = Array.isArray(obj) ? [] : {};

  if (map.has(obj)) return map.get(obj);
  map.set(obj, res);

  // 注意 obj.constructor 返回的是 构造函数
  switch (obj.constructor) {
    case Date:
    case RegExp: {
      res = new obj.constructor(obj);
      break;
    }
    default: {
      // Reflect.ownKeys 可以遍历对象的 ( 自身可枚举 + 自身不可枚举 + symbol类型的key )
      Reflect.ownKeys(obj).forEach((item) => {
        if (typeof obj[item] === "object") {
          res[item] = deepClone(obj[item], map);
        } else {
          res[item] = obj[item];
        }
      });
    }
  }

  return res;
};

const result = deepClone(obj);
console.log("result", result);
```
