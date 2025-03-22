# Typescript

- [掘金-Typescript](https://juejin.cn/post/6999807282343051277#heading-1)
- [掘金-封装 06-从 0 开始封装一个 VUE3-UI 组件库](https://juejin.cn/post/7131232733841817631#heading-7)
- [github-6penetrate](https://github.com/woow-wu7/6-penetrate/tree/main/2-FRONTEND/TS)
- [在线测试-演练场](https://www.typescriptlang.org/zh/play)

# 前置知识

```一
一些问题
---

1. readonly 和 const 的区别？
2. type 和 interface 的区别？
3. public private protected 的区别？
4. void 和 never 的区别？
5. any 和 unknown 的区别?
6. enum 和 const enum 的区别?

7. infer 关键字
8. 如何通过 ( 数组类型T ) 获取数组长度？ ---- ( T['length'] 获取数组长度 ) // 1-FRONTEND/2-TS/2-类型体操/5-LengthOfTuple.ts
9. 如何获取 ( 数组 或 元素 ) 的类型？------- ( Arr[number] 获取数组类型 ) // 1-FRONTEND/2-TS/2-类型体操/3-TupleToObject. // 详见5.2
10. 如何获取 ( 枚举类型 ) 的 key 和 value ？
-- key ( keyof typeof x -> 返回枚举x中所有key的 联合类型 )
-- value ( `${x}` - 返回枚举x中的value的 联合类型 )
-- 详见 1-FRONTEND/2-TS/2.1-keyof-in-typeof-extends-T[K].ts
11. keyof any // 返回 string | number | symbol


12. 泛型 泛型变量 泛型函数 泛型接口 泛型type 泛型类
13. as类型断言  x!非空断言  const断言(as const)
14. is类型谓词
15. extends
16. in keyof typeof


17. 在 Typescript 中有哪些方法可以是一个 值 变成 常量，或者说不可修改
- Readonly 工具类型
- as const 常量断言
- interface 和 class 中有 readonly 属性
// 17.1
// interface IName { name: string; }
// Type TC = Readonly(IName)
// 17.2
// const arr = [1, 3] as const;
// 17.3
// interface IA { readonly name: string; }
// class CA { readonly name: string = ''; }
```

```二
1
安装 typescript
- sudo npm install typescript -g

2
tsc 命令
- 安装了typescript后，就可以使用 tsc 命令了

3
生成 tsconfig.json 文件
- tsc --init

4. tsconfig.json 文件的作用
- 指定了用来编译这个项目的 ( 根文件 ) 和 ( 编译选项 )
- 如果一个目录下存在tsconfig.json文件，那么意味着这个目录是typescript项目的根目录

5
其他命令
tsc --version 打印编译器的版本信息
```

```三
一些单词
---

infer 推断 推论
// 在 ts 中是一个关键字，表示待推断的类型
// 详见 (3.10) infer

implements 实现
// extends implements

implicit 隐式的 adj
// noImplicitAny 有隐含any类型时是否报错
// - noun 名词
// - pronoun 代词
// - verb 动词
// - adverb 副词
// - adjective 形容词
// - preposition 介词
// - quantifier 量词

composite 合成
// "references": [{ "path": "./tsconfig.node.json" }] 引入的文件配置的 "composite": true 必须是true

interop 互相操作
// esModuleInterop=true，表示node环境也可以使用 import，而不是只能 require


联合类型 union type.
交叉类型 intersection type.
// -
// union 联盟 同盟 美国
// -
// intersect 相交 v
// intersection 相交 n 十字路口 n


private 私人的 私有的 adj
//【 private property. 私有财产 】
//【 private conversation. 私人谈话 】
//【 personal privacy. 个人隐私 】


protect 保护
protected 保护的adj / v过去式

enumeration 枚举 n
```

# `(一)` Typescript 常见考点 和 常见技巧

```
(一)
type 类型别名 VS interface 接口
- 尽量使用 interface
A.不同点
  1. 是否会新建一个类型
    - interface --> 会新建一个类型
    - type -------> 不会新建类型，它只是给这个已有的类型 ( 取了一个新的名字 )，来 ( 引用这个类型 )
  2. 是否能 extends 和 implements
    - type -------> 不能被 ( extends继承 和 implements实现 )
      - 但 type 可以使用 & 交叉类型 来实现 extends 相同的效果
      - interface IA extends IB, IC
      - type TA = IB & IC
  3. 作用
    - type 主要用于：原始值，元组，联合类型(union type.联合类型)，等任何需要你手写的类型，和 无法通过interface来描述的类型
    - interface 只能用于声明 ( 对象类型 )
  4. 声明合并
    - interface 存在声明合并; 而type不能声明合并，会报错
    - interface 非函数成员 声明合并: 属性名一样时，类型必须一样，不然会报错
    - interface 函数成员 声明合并: 会函数 重载，并且后面的interface中的函数声明优先级高
  5. 鼠标hover时
    - type会显示具体的类型
    - interface则会显示是接口，具体的类型还需要通过在接口中查看
B. 相同点
  1. interface 和 type 都可以有 【 泛型(Generics) 】
- english:
  - union type. 联合类型
  - intersection type. 交叉类型
  -
  - union 联盟 联合
  - intersection 十字路口 相交 交叉
  -
  -【 cross the intersection. 穿过十字路口 】
  - Take a right turn at the 【 intersection 】. 在十字路口向右拐


(二)
public private protected 的区别？
---
- public 公有属性 ---- 可以在 任何地方 访问到 ---------------- 能在 声明它的 ( 类，子类，实例 ) 中访问到
- private 私有属性 --- 只能在声明它的 ( 类中 ) 访问到 --------- 不能在 ( 声明它的类 ) 的 ( 外部 ) 使用，比如 ( 子类 实例 子类实例 都不能访问 )
- protected 保护属性 - 只能在声明它的 ( 类 和 子类 ) 中访问到 -- ( 实例不能访问，子类实例不能访问 )，即 ( 实例不能访问，但是子类可以访问 )
- 注意: 这三个属性，都是以 P 开头，方便记忆
- 详见:
  - 7
  - 本项目/1-FRONTEND/2-TS/7-public-private-protected.ts
- english
  - private
    - private 私人的 私有的 adj
    - 【 private property. 私有财产 】
    - 【 private conversation. 私人谈话 】
    - 【 personal privacy. 个人隐私 】
  - protected
    - protect 保护
    - protected 保护的adj / v过去式
    - // We should 【 protect 】 the environment.
    - // TIPS: Pay attention to the pronunciation of the word 'protect'.
    - // TIPS: Pay attention to the pronunciation of the word 'protected'.


(三)
any 和 unknown 的区别?
- 推荐使用 unknown 而不是 any
- unknown
  - unknown 在 ( 使用 ) 的时候必须指定 ( 具体的类型 )，即 ( unknown 必须要在判断完它是什么类型之后，才能继续用 )
  - unknown 类型，是 any 类型对应的 安全类型
- any
  - any 会绕过类型检查，对 any 类型的值执行操作之前，我们不必进行任何检查
- 详见
  - 4.3
  - 本项目/1-FRONTEND/2-TS/3.2-Unknown类型和Any类型.ts
// unknown
const unk: unknown = 1;
const product = unk * unk; // ---------------------------- 报错，unknown在使用时必须指定 具体的类型
const product2 = (unk as number) * (unk as number); // --- 正确
// any
const unk2: any = 2;
const product3 = unk2 * unk2; // 正确，any不会进行类型检查


(四)
never 和 void 的区别
- never类型
  - 赋值
    - never 可以赋值给其 他任意类型
    - 其他任意类型 不能赋值给 never
  - 使用场景
    - 1.用在 总会抛错的函数的 返回值类型
    - 2.用在 一定会死循环的函数 的返回值类型
    - 3.用在 穷尽检查 时，将其收窄为 never 类型
  - 表示
    - 永远不存在的值类型
  - 详见
    - 3.2
    - 本项目/1-FRONTEND/2-TS/3.2-Never类型.ts
- void 和 never 的区别
    - void: void 类型的值可以是 undefined 或 null
    - never: 表示没有任何返回，用在函数可能死循环，总会抛出错误，穷尽检查时



(五) Typescript 使用过程中的一些技巧

5.1
【 enumeration 枚举 n 】
【 enumeration type. 枚举类型 】
枚举类型获取每个 key 和 value
enum Enu {
  A = 2,
  B,
  C = 'C'
}
type People4 = keyof typeof Enu; // 'A' | 'B' | 'C' ++++++ key
type People5 = `${Enu}`; // "C" | "2" | "3" ++++++++++++++ value
// `` 为 模版字符串 语法

5.2
当我们声明 联合类型 时，可以使用 枚举类型来代替
这样做的好处是:
- 魔法字符串: 当我们在其他地方需要使用联合类型的成员时，就可以使用 枚举类型 访问成员的能力解决魔法字符串的问题
- 枚举: enum RequestType { "node", "go" }
- 转成联合类型: type AAA: keyof typeof RequestType ++++++++++++++++++ key
- 访问: AAA['node'] ================================================ 0
- 注意点: 只有数字枚举存在反向映射
- 学习: [枚举类型](file:///Users/xiawu/work/personal/front-end/8-penetrate/1-FRONTEND/2-TS/3.1-enum.ts)

5.3
数组类型 和 元组类型 获取每个 成员类型
type TArr1 = string[];
type TArr2 = [number, boolean, undefined];
type a = TArr1[number]; // 相当于: type a = string
type b = TArr2[number]; // 相当于: type b = number | boolean | undefined，注意是联合类型
// 对比
// type TLen = tesla['length']; ------- 获取长度
// type a = TArr1[number]; ------------ 获取所有成员类型的(联合类型)

5.4
获取数组类型 的 长度
type Ttesla = ["tesla", "model 3", "model X", "model Y"];
// type TLen = tesla['length']
// 相当于 type TLen = 4
// -
// 注意: 是 tesla['length'] 中是字符串 'length'
// -
// 对比
// type TLen = tesla['length']; ------- 获取长度
// type a = TArr1[number]; ------------ 获取所有成员类型的(联合类型)
```

# `(二)` **范型工具类型**

- 详见: [link](file:///Users/xiawu/work/personal/frontend/8-penetrate/1-FRONTEND/2-TS/2-泛型工具类型.ts)
- 演练场: [在线测试-演练场](https://www.typescriptlang.org/zh/play)
-
- Record +
-
- Partial
- Required +
-
- Pick
- Omit
- Exclude
-
- Parameters
- ReturnType
- InstanceType
-
- Readonly +
- ReadonlyArray +
-
- Uppercase
- Lowercase
-
- Awaited +
- NonNullable
-
- // 2023/12/18 补充
- // Required vs Partial
- // Omit vs Pick vs Exclude
- // Parameters vs ReturnType vs InstanceType
- 1.详见: 1-FRONTEND/2-TS/2-泛型工具类型.ts
- 2.类型体操详见: 本项目/1-FRONTEND/2-TS/2-类型体操

### (1) Record

- [Link-2-泛型工具类型](file:///Users/xiawu/work/personal/front-end/8-penetrate/1-FRONTEND/2-TS/2-泛型工具类型.ts)

```1
Record
- 是一种工具类
- Record<Keys， Type>
  - keys: 表示对象的属性 - 键
  - type: 表示对象的属性 - 值
  - 用于将 ( 一种类型属性 ) 映射到 ( 另一种类型 )
  - // keys 必须是联合类型
- Record的实现
  - type Record<K extends keyof any, T> = { [P in K]: T };
  - keyof any 返回 string|number|symbol
---

例1
type roles = 'tester' | 'developer' | 'manager'
const staffCount: Record<roles, number> = { // 第一个参数 (最终) 是一个联合类型，第二参数是具体的类型
  tester: 10,
  developer: 20,
  manager: 30
}
表示：roles联合类型的每个属性值为interface的成员，类型都是number

---
例2
interface Staff { name: string; salary: number;}
type StaffJson = Record<keyof Staff, string>; // keyof索引类型查询操作符 获取 interface 上的所有 ( 已知公共属性名 ) 的 - 联合类型
const product: StaffJson = {
  name: "John",
  salary: "3000",
};
表示：interface中的所有属性名的联合类型中的 ( 每个属性的属性值 ) 的类型是 string
英语:
- staff 员工
- salary 薪水
- breed 养育 品种

---
例3
interface CatInfo {
  age: number;
  breed: string; // breed 是品种的意思
}
type CatName = 'miffy'| 'boris';
type CatsR = Record<CatName, CatInfo>;
type cats2 = Record<keyof CatsR, CatInfo> = Record<keyof CatsR, CatInfo>;
const cats: CatsR ={
   miffy: {age: 10, breed: "Persian"},
   boris: {age:5, breed: 'Maine Coon'},
};

---
例4
interface IO {
  name: string;
  age: number;
  sex: "man" | "women";
}
type AA = Record<keyof IO, IO["sex"]>;
// IO["sex"] = "man" | "women"; ------- T[K] 是索引访问操作符
// keyof IO --------------------------- 'name' | 'age' | 'sex' 返回interface中已知的公共属性名的联合类型
// 相当于
type AA = {
  name: "man" | "women";
  age: "man" | "women";
  sex: "man" | "women";
}

---
例5
Record<string, any>
- 表示 key 是 string
- 表示 value 是 any
相当于
type Txx = {
  [x: string]: any;
}

---
例6
Record<keyof any, any>
- keyof any 相当于 string | number | symbol
- Record<string | number | symbol, any>
相当于
type TRecord6 = {
  [x: string]: any;
  [x: number]: any;
  [x: symbol]: any;
}
```

```11
Record 的实现
---

type Record<K extends keyof any, T> = {
  [P in K]: T;
};

1
keyof any =  string | number | symbol
因为: 因为一个 对象 的值不管是什么类型，它的 key 只能是 string number symbol 中的一种

2
P in string | number | symbol 用来遍历联合类型
```

### (2) Partial ----- 对比 Required

```
Partial
- Partial<T>
- 将 ( 类型 ) 定义的 ( 所有属性 ) 都修改为 ( 可选的 )
- Partial的实现
  - type Partial<T> = { [P in keyof T]?: T[P]; };
  - Partial实现很简单，遍历所有key(索引类型查询+遍历)，添加可选符，再索引访问
---

type Coord = Partial<Record<'x' | 'y', number>>;
// 这里是 Record 和 Partial 的组合
// - Record 等同于一个interface，key是第一个参数所有属性，值类型是第二个参数
// - Partial 变为可选属性
// 等同于
type Coord = {
  y?: number | undefined;
  x?: number | undefined;
}
```

### (3) Required ---- 对比 Partial

```
Required
Required<Type>
---

interface Color {
  a?: number;
  b?: string;
  c: string;
}
type TR = Required<Color>
const tr: TR = {
  a: 1,
  b: '2',
  c: '3'
}
```

### (4) Pick -------- 对比 Omit

```
Pick
- 从类型定义的属性中，选取 ( 指定一组的属性 )，返回一个 ( 新的类型定义 )
- 从字面意思也能知道是 ( 摘取部分属性 )
- Pick的实现
  - type Pick<T, K extends keyof T> = { [P in K]: T[P]; };
---

例1
type Coord = Record<'x' | 'y', number>;
type CoordX = Pick<Coord, 'x'>;
// 等同于
type CoordX = { x: number; }

---
例2
type Animal = {
  name: string,
  age: number,
  category: string,
  eat: () => number
}
const bird: Pick<Animal, "name" | "age"> = { name: 'bird', age: 1 }

---
例3
const pick3: Pick<Record<"a" | "b", number>, "b"> = {
  b: 1,
};
const pick4: Pick<Record<"a" | "b" | "c", string>, "a" | "c"> = {
  a: "",
  c: "",
};
interface Color2 {
  red: string;
  yellow: string;
}
const pick5: Pick<Record<keyof Color2, number>, "red"> = {
  red: 1,
};
```

### (5) Omit -------- 对比 Pick

- Omit 和 Pick 是相反的
- Omit: 省略 忽略 的意思

```
Omit
- type Omit = Pick<T, Exclude<keyof T, K>>
- 省略
---

例1
type UserState = {
  name: string
  age: number
}
type Person = Omit<UserState, 'age'>
// 等价于
type Person {
  name: string
}

---
例2
const omit2: Omit<Record<"a" | "b" | "c", boolean>, "a" | "b"> = {
  c: true,
};
```

### (6) Exclude

```
Exclude
- Exclude 就是将前面类型的与后面类型对比，( 从 前面类型 剔除掉 后面类型 中有的属性 )
- Exclude的实现
  - Exclude<T, U> = T extends U ? never : T;
  - 当 T 是枚举类型时，T extends U 表示的是: 遍历 T 中的每一个成员 i，都做  ( i extends U ? never : i ) 这样的判断
  - 详见: 本项目/1-FRONTEND/2-TS/2-类型体操/6-Exclude.ts
---

const str: Exclude<'a' | '1' | '2', 'a' | 'y' | 'z'> = '1'; // str 的类型是 "1" | "2"
type Result = Exclude<"a" | "b" | "c", "a">; // 'b' | 'c'
type Result2 = Exclude<"a" | "b" | "c", "a" | "b">; // 'c'
```

### (7) Readonly

```
Readonly
- Readonly<Type>
- 将类型 T 中包含的属性设置为readonly，并返回一个新类型
- Readonly<type> 实现
  - type Readonly<T> = { readonly [P in keyof T]: T[P]; }
---

interface Person {
  name: string
  age: number
}
const person: Readonly<Person> = {
  name: 'lpp',
  age: 18
}
person.age = 20; // 报错，无法分配到 "age" ，因为它是只读属性。ts(2540)
// 扩展
// 除了使用 Readonly<Person>能做到只读外，也可以直接设置 interface Person { readonly name: string; }
```

### (8) ReadonlyArray

```
ReadonlyArray
- 数组只读
---
7.1
type TReadonlyArray = ReadonlyArray<any>;
const readonlyArr: TReadonlyArray = ["1", 1];
readonlyArr[0] = "11"; // 报错，类型“TReadonlyArray”中的索引签名仅允许读取。

7.2
在React的useEffect函数签名中
function useEffect(effect: EffectCallback, deps?: DependencyList): void
  - type EffectCallback = () => (void | (() => void | undefined))
  - type DependencyList = ReadonlyArray<any>

7.3
function foo(arr: ReadonlyArray<string>) {
  arr.slice(); // okay
  arr.push("hello!"); // error!
}
在最新的 typescript3.4 版本中可以使用下面的写法，注意这里的函数参数中 readonly 只能用于 数组 和 元组
function foo(arr: readonly string[]) {
  arr.slice(); // okay
  arr.push("hello!"); // error!
}
function foo(arr: readonly string) {
  // 报错，仅允许对数组和元组字面量类型使用 "readonly" 类型修饰符。ts(1354)
}
```

### (9) Parameters

```
Parameters
- Parameters<T>
- 获取函数的 参数类型
- Parameters的实现
  - type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) =>  any ? P : never
---

function fn8(name: string, rest: { a: number; b: string }): void {}

type TP1 = Parameters<typeof fn8>;
// 相当于
// type TP1 = [name: string, rest: { a: number; b: string; }]
```

### (10) ReturnType

```
ReturnType
- ReturnType<T>
- 获取函数 返回值类型
- ReturnType的实现
  - type ReturnType<T> = T extends (...args: any[]) => infer P ? P : any;
---

function f1(s: string) {
   return { a: 1, b: s };
}

type T14 = ReturnType<typeof f1>;  // { a: number, b: string }
type T10 = ReturnType<() => string>;  // string
type T2 = ReturnType<(s: string) => number[]>; // number[]
type T11 = ReturnType<(s: string) => void>;  // void
type T12 = ReturnType<(<T>() => T)>;  // {}

type T13 = ReturnType<(<T extends U, U extends number[]>() => T)>;  // number[]
type T15 = ReturnType<any>;  // any
type T16 = ReturnType<never>;  // any
type T17 = ReturnType<string>;  // Error
type T18 = ReturnType<Function>;  // Error
```

### (11) InstanceType

```
InstanceType
- 获取 构造函数类型的 实例类型
- InstanceType的实现
type InstanceType<T extends new (...args: any[]) => any> = T extends new (
   ...args: any[]
) => infer R
   ? R
   : never;
---

class Fn1 {}
type TInstance = InstanceType<typeof Fn1>; // 相当于 type TInstance = Fn
type TInstance2 = InstanceType<any>; // any
type TInstance3 = InstanceType<never>; // any
type TInstance4 = InstanceType<string>; // Error
type TInstance5 = InstanceType<Function>; // Error
```

### (12) Uppercase Lowercase

```
type Name = "woow_wu7";
type UpperName = Uppercase<Name>; // 相当于 type UpperName = "WOOW_WU7"
```

### (13) Awaited

```
Awaited
Awaited<Type>
---

type AAA1 = Awaited<Promise<string>>; // string
type AAA2 = Awaited<Promise<Promise<number>>>; // number - 不管嵌套有多深，都可以得到参数类型
type AAA3 = Awaited<boolean | Promise<number>>; //  number | boolean
```

#### (14) NonNullable

```
NonNullable
去除 null 和 undefined 类型
---

type T0 = NonNullable<string | number | undefined>; // type T0 = string | number
type T1 = NonNullable<string[] | null | undefined>; // type T1 = string[]
```

# `(三)` **高级类型**

- [在线测试-演练场](https://www.typescriptlang.org/zh/play)
-
- [11.]
- `【 keyof 】`
- 索引类型查询操作符
- > 定义: keyof T 是 ( 索引类型查询 操作符 )，返回 ( T 上已知的公共属性名的 联合类型 )
- > 作用于: Interface, Class, ( Enumeration, Object - 这两个先要通过 typeof 转成类型 )
- > 【 keyof 】------------------- [link](./2.1.1-keyof.ts)
-
- [22.]
- `【 in 】`
- > 接着可以使用 [k in keyof T] 来进行遍历
- > 类型: in 可以遍历 ( 枚举 ) 和 ( 联合类型 )
- > 值: 判断属性是否在对象中
- > 【 in 】---------------------- [link](./2.1.3-in.ts)
-
- [33.]
- `【 T[K] 】`
- 索引访问操作符
- > 【 T[K] 】-------------------- [link](./2.1.2-T[K].ts)
-
- [44.]
- `【 typeof 】`
- 获取 ( 变量 或 对象 ) 的类型
-
- [55.]
- `【 extends 】`
- > 范型约束: ( K extends P ) 表示即 K 继承 P，则 K 具有 P 相同的属性，其实就是约束了 K 的属性只能在 P 的范围内
- > 【 extends 】 ---------------- [link](./2.1.4-extends.ts)
-
- [66.]
- 特例
- 结果: **keyof any** 返回 **string | number | symbol**
- 原因: 因为不管是什么类型，它的 key 只能是 string number symbol 中的一种
-
- [AA.]
- `【 断言 as 】`
- > 【 非空断言 X! 】 -------------- [link](./5-非空断言x!.ts)
- > 【 常量断言 const 】------------ [link](./5-const断言.ts)
- > 【 类型断言 】------------------ [link](./5-类型断言as-类型谓词is.ts)
-
- [BB.]
- `【 类型谓词 is 】`
- > 【 类型谓词 】------------------ [link](./5-类型断言as-类型谓词is.ts)
- is: parameterName 必须是来自当前函数签名里的一个 ( 参数名 )，一般用于 ( 返回值 - 缩小范围 )
-
- [CC.]
- `【 unknown 类型 】`
- > unknown 类型是 any 类型的安全类型
- > 【 unknown 类型 】------------- [link](./3.2-Unknown类型和Any类型.ts)
-
- [DD.]
- `【 never 类型 】`
- > 【 never 类型 】--------------- [link](./3.2-Never类型.ts)
- 表示: 永远不存在的值类型，用在 ( 函数可能死循环，总会抛出错误，穷尽检查时 )
- 问题: never 和 void 的区别？
- 回答:
- // void: void 类型的值可以是 undefined 或 null
- // never: 表示没有任何返回，用在函数可能死循环，总会抛出错误，穷尽检查时
-
- [EE.]
- `【 infer 】`
- > infer 推断 推论 v
- > infer / refer / defer / prefer
- > 【 infer 】-------------------- [link](./2.2-infer.ts)
-
- [FF.]
- `【 enum 枚举 】`
- > 【 enum 枚举 】----------------- [link](./3.1-enum.ts)

### (3.1) keyof 索引类型查询 操作符

```
keyof
- 索引类型查询操作符
- keyof T 返回 T 上已知公共属性名的 联合类型
---

例1
interface Person {
  name: string;
  age: number;
}
let personProps: keyof Person; // 'name' | 'age'

---
例2
三和四组合案例
- ( K extends P ) 表示即K继承P，则K具有P相同的属性，其实就是约束了 K 的属性只能在 P 的范围内
- keyof T 索引类型查询操作符，返回T上已知公共属性名的联合
- T[K] 索引访问操作符
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}
interface Person {
   name: string;
   age: number;
}
let person: Person = {
   name: 'Jarid',
   age: 35
};
let strings: string[] = pluck(person, ['name']); // ok, string[]
```

```
---
例3
type Record<K extends keyof any, T> = {
  [P in K]: T;
};

1
keyof any =  string | number | symbol
因为: 因为不管是什么类型，它的 key 只能是 string number symbol 中的一种

2
P in string | number | symbol 用来遍历联合类型
```

```
列4
keyof 和 typeof 的联用
---

interface IObj {
  attr1: number;
  attr2: string;
}
let obj1: IObj;

type TObj = keyof typeof obj1;
// 相当于 type TObj = 'attr1' | 'attr2'
```

### (3.2) T[K] 索引访问操作符

```
T[K]
---

例1
interface Person {
   name: string;
   age: number;
}
Person['name'] // string


---
例2
三和四组合案例
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}
interface Person {
   name: string;
   age: number;
}
let person: Person = {
   name: 'Jarid',
   age: 35
};
let strings: string[] = pluck(person, ['name']); // ok, string[]
```

### (3.3) in

- in 运算符作用主要有两个
  - 在类型中使用: **可以用来遍历 联合类型 和 枚举类型**
  - 在值中使用: 判断对象中是否存在某个 key 注意包括 ( 自身属性 ) 和 ( 继承属性 )

```
in
---
1
in 用来遍历联合类型 -> type Obj = { name: any, age: any }
type T = 'name' | 'age';
type Obj = {
  [k in T]: any
}
相当于
// type Obj = { name: any, age: any }


---
2
in 用来遍历枚举类型 -> type City3 = { 2: string; 3: string; 4: string; }
enum City {
  BEIJING = 2,
  SHANGHAI,
  GUANGZHOU,
}
type City3 = {
  [key in City]: string;
};
相当于
// type City3 = { 2: string; 3: string; 4: string; }


---
3
enum Enu {
  A = 2,
  B,
}
返回的是枚举中的 key =================================== 枚举中的 key
type People4 = keyof typeof Enu; // 'A' | 'B' ++++++ key
type People6 = `${Enu}`; // "2" | "3" ++++++++++++++ value
注意区分:
type People5 = keyof Enu; //  "toFixed" | "toExponential" | "toPrecision" | "toString" | "valueOf" | "toLocaleString"


---
4
in 用来判断 obj 对象中是否存在 name 属性，缺点是不能识别 ( 自身属性 ) 还是 ( 继承属性 )
const obj: Obj = {
  name: 'woow_wu7',
  age: 20
}
console.log('name' in obj)


var obj = {};
'toString' in obj // true，即非自身属性时，继承的属性也会返回true
```

### (3.4) 泛型

- 泛型函数
- 泛型接口
- 泛型类
- 泛型 type 类型别名
- 泛型约束
  - T extends interface 等具体的类型

```
1
泛型函数
---

普通函数: function identity(arg: any): any { return arg; }
泛型函数: function identity<T>(arg: T): T { return arg; }
调用方式:
  - 传入类型参数调用: let output = identity<string>("myString");
  - 类型推断调用: let output = identity("myString");
泛型优势:
  - 泛型函数能保证 传入参数类型和返回值类型一致
  - 而不是any，造成丢掉一些细节，比如 ( 参数和返回值都是any，当参数是string时，返回值是any类型 )
```

```
2
泛型约束
T extends interface
---

interface Lengthwise {
  length: number;
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);  // Now we know it has a .length property, so no more error
  return arg;
}
```

### (3.5) 类型谓词 is -- 类型保护(类型约束)

- 类型保护(类型约束)
  - 1. 定义联合类型: 如果你希望一个变量的值有多种类型，可以使用联合类型
  - 2. 使用联合类型: 当我们使用联合类型时，我们必须把 ( 当前值的类型 ) 收窄为 ( 当前值的实际类型 )
  - 3. 类型保护: 就是 ( 缩小 ) ( 值范围 ) 的一种手段
- 使用场景
  - 当一个函数返回值是 boolean 时，`function isStr(s: any): s is string { return typeof s === 'string'; }`
  - 让我们明确地告诉 TypeScript，如果 isStr 函数的返回值为真，参数的类型就是字符串类型
  - 这里是把函数的参数 s 从 any 范围缩小到 string 类型
- 解析
  - 当一个函数返回值是 boolean 时，比如 `function isStr(s: any): s is string { return typeof s === 'string'; }`
  - 让我们明确地告诉 TypeScript，如果 isStr 函数的返回值为真，参数的类型就是字符串类型，即 ( 把函数的参数 s 从 any 范围缩小到 string 类型 )

```
1
is - 类型谓词
- parameterName is Type
- parameterName 必须是来自当前函数签名里的一个 ( 参数名 )

2
as - 类型断言
类型断言有两种方式
- let strLength: number = (someValue as string).length;
- let strLength: number = (<string>someValue).length;
- 唯一区别是，在JSX中，尖扩号与JSX语法冲突，只能使用as关键字
--

// 1
// is - 类型谓词 - 类型保护
// - 类型谓词 is
// - parameterName is Type
// - parameterName 必须是来自当前函数签名里的一个 ( 参数名 )，一般用于 ( 返回值 - 缩小范围 )
// - 使用场景
//  - 当一个函数返回值是boolean时
//    - function isStr(s: any): s is string { return typeof s === 'string'; }
//    - 让我们明确地告诉TypeScript，如果isStr为真，参数的类型就是字符串类型
//    - 这里是把函数的参数 s 从 any 范围缩小到 string 类型
//  - 通常用在给联合类型确定一个具体的类型

// 2
// as - 类型断言
// 类型断言有两种方式
// - let strLength: number = (someValue as string).length;
// - let strLength: number = (<string>someValue).length;
// - 唯一区别是，在JSX中，尖扩号与JSX语法冲突，只能使用as关键字

例1
interface Bird {
  fly();
  layEggs();
}
interface Fish {
  swim();
  layEggs();
}
function isFish(pet: Fish | Bird): pet is Fish { // pet is Fish: 表示如果isFish函数返回值为真，参数的类型就是Fish类型
  return (<Fish>pet).swim !== undefined;
  // return (pet as Fish).swim !== undefined 类型断言，这两种写法都可以
}

例2
type num_str  = number | string ;
function isNumber(x: any): x is number {
  return typeof x === "number";
  // 将 any 类型范围缩小为 number
  // 同样在isNumber函数返回值是true时，参数x的类型是number
}
```

### (3.6) 类型断言 as

```
as - 类型断言
--

1
类型断言有两种方式
- let strLength: number = (someValue as string).length;
- let strLength: number = (<string>someValue).length;
- 唯一区别是，在JSX中，尖扩号与JSX语法冲突，只能使用as关键字
```

```
2
const断言 - as const
- as const
  - 称为const断言，表示使用最窄或具体的类型，如果不选择断言，则可能因为更广的范围而产生一个错误推断
- 特点
  - 该表达式中的 ( 字面类型不应被扩展 )
  - 对象字面量获取只读属性
  - 数组字面量成为只读元组
---

2.1
对象只读属性
const obj = {
  name: "woow_wu7",
  age: 10,
};
const obj2 = {
  name: "woow_wu7",
  age: 10,
} as const; // const 断言，属性不能被修改
obj.age = 20; // 正确，普通的对象属性可以被修改
obj2.age = 20; // 报错，无法为“age”赋值，因为它是只读属性。--- 即 as const 断言后，对象类型的数据的属性变成只读

---
2.2
数组是只读数组
const arr = [1,3] as const
arr[1]= 2
// const arr: readonly [1, 3]
// 无法为“1”赋值，因为它是只读属性。ts(2540)
arr.push(1)
// 类型“readonly [1, 3]”上不存在属性“push”
---

具体列子见 3.5
```

### (3.7) 非空断言 x!

```
非空断言 x!
x! 表示的是 ( 排除掉变量中的 null 和 undefined )
---

// 报错
function notNullFn(arg: string | null | undefined): string {
  return arg;
  // 不能将类型“string | null | undefined”分配给类型“string”。不能将类型“undefined”分配给类型“string”。
}

// 1
// 解决办法1 - 非空断言 x!
function notNullFn2(arg: string | null | undefined): string {
  return arg!; // 非空断言，即 arg 一定是非空的，即排除 null 和 undefined，这里 arg 就一定是 string
}

// 2
// 解决办法2 - as
function notNullFn3(arg: string | null | undefined): string {
  return arg as string; // 类型断言为 string
}

// 3
// 解决办法3
function notNullFn4(arg: string | null | undefined): string {
  if (arg) return arg; // 类型断言为 string
  return "";
}
```

### (3.8) const 断言

```
const断言 - as const
- as const
  - 称为const断言，表示使用最窄或具体的类型，如果不选择断言，则可能因为更广的范围而产生一个错误推断
- 特点
  - 该表达式中的 ( 字面类型不应被扩展 )
  - 对象字面量获取只读属性
  - 数组字面量成为只读元组
---

1
对象只读属性
const obj = {
  name: "woow_wu7",
  age: 10,
};
const obj2 = {
  name: "woow_wu7",
  age: 10,
} as const; // const 断言，属性不能被修改
obj.age = 20; // 正确，普通的对象属性可以被修改
obj2.age = 20; // 报错，无法为“age”赋值，因为它是只读属性。--- 即 as const 断言后，对象类型的数据的属性变成只读

---
2
数组是只读数组
const arr = [1,3] as const
arr[1]= 2
// const arr: readonly [1, 3]
// 无法为“1”赋值，因为它是只读属性。ts(2540)
arr.push(1)
// 类型“readonly [1, 3]”上不存在属性“push”
```

### (3.9) 类型保护 typeof instanceof is

```
详见
- 本项目/2-FRONTEND/2-TS/5-类型断言 as-类型谓词 is.ts
- 本项目/2-FRONTEND/2-TS/6-类型保护-is-typeof-instanceof.ts
```

### (3.10) infer

- 详见 本项目/1-FRONTEND/2-TS/2.2-infer.ts
- 资料 https://juejin.cn/post/6844904170353328135

```
infer
- infer 表示在 ( extends ) ( 条件语句 ) 中 ( 待推断 ) 的 ( 类型变量 )
---

例1
type ParamType<T> = T extends (arg: infer P) => any ? P : T;
- 表示: 如果 T 能赋值给 (arg: infer P) => any，则结果是返回 (arg: infer P) => any 类型中的参数 P，否则返回为 T
- 其中infer表示: infer P 表示待推断的函数参数
interface User {
  name: string;
  age: number;
}
type Func = (user: User) => void;
type Param = ParamType<Func>; // Param = User
type AA = ParamType<string>; // string，因为 T 不是 函数，所以返回值类型就直接是 T


例2
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
 - 表示: 如果 T 能赋值给 (...args: any[]) => infer R，即T满足这样的函数签名，就返回  (函数的返回值类型R )，否则返回 ( any )
 - 其中infer表示: infer R 表示函数的返回值 类型
type func = () => number;
type variable = string;
type funcReturnType = ReturnType<func>; // funcReturnType = number，因为T满足是函数，并且满足该函数签名，所以返回值就是 函数的返回值
type varReturnType = ReturnType<variable>; // varReturnType = any，T不满足条件，返回any


例3
type MyFirst<T extends any[]> = T extends [infer F, ...any] ? F : never;
- 表示: 如果 T 满足是一个数组，那么就返回 F，即第一个元素；否则返回never
type arr111 = ["a", "b", "c"];
type arr222 = [3, 2, 1];
type head111 = MyFirst<arr1>; // expected to be 'a'
type head222 = MyFirst<arr2>; // expected to be 3
```

# `(四)` 类型系统

### (4.1) 枚举

```
1
反向映射 - 数字枚举，存在反向映射
---

enum Enum { A }
let a = Enum.A; // 0
let nameOfA = Enum[a]; // "A"
```

```
2
枚举中成员 使用 另一个成员的值
---

enum Enum2 {
  A = 1,
  B = 2 * A,
}
const b = Enum2.B; // 2
```

```
3
const 枚举
- ( 常量枚举 ) 只能使用 ( 常量枚举表达式 )
- 并且不同于常规的枚举，它们在 ( 编译阶段会被删除 ) ( 编译阶段会被删除 ) ( 编译阶段会被删除 )
```

```
4 扩展
in
1. 在 ( 类型 ) 中使用，用来遍历 ( 联合类型 和 枚举类型 )
2. 在 ( 值 ) 中使用，用来判断对象中是否存在某个 key 注意包括 ( 自身属性 ) 和 ( 继承属性 )
enum Enu {
  A = 2,
  B,
}

2.1
in 遍历 枚举类型 ===================================== 枚举中的 value
type People2 = {
  // ------- in 遍历枚举
  [K in Enu]: boolean;
};
// 相当于
// type People2 = {
//   2: boolean;
//   3: boolean;
// }

2.2
in 遍历 联合类型
type People3 = {
  // ------- in 遍历联合类型
  [K in keyof People]: boolean;
};

2.3
返回的是枚举中的 key =================================== 枚举中的 key
type People4 = keyof typeof Enu; // 'A' | 'B' ++++++ key
type People6 = `${Enu}`; // "2" | "3" ++++++++++++++ value

注意区分
type People5 = keyof Enu; //  "toFixed" | "toExponential" | "toPrecision" | "toString" | "valueOf" | "toLocaleString"
```

### (4.2) never 类型

- 表示: 永远不存在的值类型
- 特点:
  - 可以将 never 类型的变量分配给 任何其他类型
  - 不能将其他类型 分配给 never
- 区别
  - 问题: never 和 void 的区别？
  - 回答:
    - void: void 类型的值可以是 undefined 或 null
    - never: 表示没有任何返回，用在函数可能死循环，总会抛出错误，穷尽检查时

```
never应用场景
- (1) 函数: 从来不会有返回值的函数
  - 1.函数可能存在死循环
  - 2.函数总会抛出一个错误
- (2) 穷尽检查
  - 3.对于一个联合类型，将其类型收窄为never
---

1
let foo: never; // ok
let foo: never = 123; // Error: number 类型不能赋值给 never 类型

2
const throwErr = () => {
  throw new Error("error");
};
let neverVar: never = throwErr(); // ---------------------------------------------- never类型的变量
let neverVar2 = neverVar; // ------------------------------------------------------ 1. never类型的变量 只能 赋值给never类型的变量
const str = "";
const int: number = neverVar; // -------------------------------------------------- 2. never类型 可以赋值给 number类型，和其他任意类型
neverVar = str; // Type 'string' is not assignable to type 'never' ---------------- 报错: 其他任意类型都不能赋值给 never类型

---
3
函数总会抛出一个错误时，使用 never 作为返回值
const throwErrorFunc = () => {
  throw new Error("error")
};
const throwErr2: () => never = () => {
  throw new Error("error");
};
function throwErr3(): never {
  throw new TypeError("error");
}

4
函数可能存在死循环时，使用 never 作为返回值
// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {}
}

---
5
穷尽检查
- 对于一个联合类型，将其类型收窄为never
interface Foo {
  type: 'foo'
}
interface Bar {
  type: 'bar'
}
type All = Foo | Bar

function handleValue(val: All) {
  switch (val.type) {
    case 'foo':
      // 这里 val 被收窄为 Foo
      break
    case 'bar':
      // val 在这里是 Bar
      break
    default:
      // 1. val 在这里是 never，因为永远不可能到这个分之来
      // 2. 我们以后扩充了 val 的类型后，有了default内使用 never 就会报错
      //    - 因为除了前面两个case，default就会是第三种扩充的类型，而我们default使用了never，其他类型都不能赋值给never
      //    - 如果没有就不会报错了
      const exhaustiveCheck: never = val
      break
  }
}
```

### (4.3) unknown 类型

```
unknown 类型
- 定义
  - unknown 类型，是 any 类型对应的安全类型
  - 所有类型都可以被归为 any，所有类型也都可以被归为 unknown
  - 这使得 unknown 成为 TypeScript 类型系统的另一种顶级类型（另一种是 any）
- 特点
  - unknown 类型只能被赋值给 any 类型和 unknown 类型本身
  - 任意类型的值都可以赋值给 unknown 类型的值，这点 any 和 unknown 一样
- 问题
  - 问题: unknown 和 any 的区别？
  - 回答:
    - unknown: unknown 必须要在判断完它是什么类型之后，才能继续用
    - any: any 会绕过类型检查，对 any 类型的值执行操作之前，我们不必进行任何检查
推荐使用 unknown 而不是 any
---


1
const unk: unknown = 1;
const product = unk * unk; // 报错，unknown在使用时必须执行具体的类型
const product2 = (unk as number) * (unk as number); // 正确

2
const unk2: any = 2;
const product3 = unk2 * unk2; // 正确，any不会进行类型检查
```

# (五) 函数重载

- 函数重载 有两部分组成
  - 多个 重载签名
  - 一个 实现签名 + 函数体
  - 函数体
- 详见: 1-FRONTEND/2-TS/3.3-函数重载.ts

```
(1)
前置知识
---

1
函数签名
- 定义了函数或方法的输入与输出
  - 参数和参数类型
  - 返回值和返回值类
  - 可能会抛出或传回的 异常

2
函数重载
- 问题
  - 问题: 为什么需要函数重载?
  - 思考: 我们如果定义一个函数，当参数是string类型的时，返回值是string类型。当参数是number类型时，返回值是number类型，并且我们要调用返回值上的一些特有属性
  - 比如: 例子1就报错了
  - 解决: 函数重载，在声明时具体指定了，输入string返回string，输入number返回number，则可以调用 fn2(1).toFixed() 不会报错
```

```
(2)
函数重载案例
- 资料: https://juejin.cn/post/7029481950691737630
- 资料: https://juejin.cn/post/7055668560965681182

例子1
- 未使用 函数重载
function fn(args: string | number): number | string {
  const type = typeof args;
  if (type === "string") return "1";
  return 1;
}
fn(1).toFixed(); // 报错: 类型“string | number”上不存在属性“toFixed”。类型“string”上不存在属性“toFixed”。

例子2
- 函数重载
function fn2(args: string): string; // -------------------- 函数签名
function fn2(args: number): number;
function fn2(args: string | number): number | string { // - 实现签名 + 函数体
  const type = typeof args;
  if (type === "string") return "1";
  return 1;
}
fn2(1).toFixed(); // 没有报错了
```

# (六) 声明合并

- [官网](https://www.tslang.cn/docs/handbook/declaration-merging.html)

### (6.1) interface 声明合并

详见: 1-FRONTEND/2-TS/1-声明合并.ts

```6.1 1111111
- 非函数成员
  - 接口的 ( 非函数成员 ) 应该是 ( 唯一 ) 的，如果不是唯一的，那么 ( 同名成员 ) 它们必须是 ( 相同的类型 )，否则会 ( 报错 )
- 函数成员
  - 每个同名函数声明都会被当成这个函数的一个 ( 重载 )
  - 当接口 A 与后来的接口 A 合并时，后面的接口具有更高的优先级
```

```6.1 2222222
// 函数重载
// - 包含: 函数签名 + 实现签名
// - 资料: https://juejin.cn/post/7029481950691737630

// 问题: 为什么需要函数重载？
// 回答: 例子1中，我们调用 fn(1).toFixed() 报错，因为返回的值类型没有确定是number还是string
// 解决: 函数重载，声明时，具体执行不同输入和返回值之间的对应关系，输入string返回string，输入number返回number

// 例子1
// - 未使用 函数重载
function fn(args: string | number): number | string {
  const type = typeof args;
  if (type === "string") return "1";
  return 1;
}
fn(1).toFixed(); // 报错: 类型“string | number”上不存在属性“toFixed”。类型“string”上不存在属性“toFixed”。

// 例子2
// - 函数重载
function fn2(args: string): string; // -------------------- 函数签名 -------------- 多个函数签名
function fn2(args: number): number;
function fn2(args: string | number): number | string {
  // ------------------------------------------------------ 实现签名 + 函数体 ------ 一个实现签名
  const type = typeof args;
  if (type === "string") return "1";
  return 1;
}
fn2(1).toFixed(); // 没有报错了

// 例子3
// type AType = "name" | 1;
// let resA = "name";
// function fnA(arg: AType): arg is "name" {
//   return typeof arg === "string";
// }
```

# (七) public private protected 的区别？

- 例子 本项目/1-FRONTEND/2-TS/7-public-private-protected.ts

```
- public 公有属性 -------- 可以在 任何地方 访问到，---------------- ( 声明它的 类中，子类，实例 都能访问到 )
- private 私有属性 ------- 只能在声明它的 ( 类中 ) 访问到 ---------- 不能在 ( 声明它的类 ) 的 ( 外部 ) 使用，比如 ( 子类 或 实例 或 子类实例 都不能访问 )
- protected 保护属性 ----- 只能在声明它的 ( 类 和 子类 ) 中访问到 --- 实例不能访问，子类实例不能访问，即 ( 实例不能访问，但是子类可以访问 )
---

class Cons {
  attr1 = 1;

  public pub = 2; // ------- public 公共属性 可以在任何地方访问
  private pri = 3; // ------ private 私有属性 只能在声明他的 类(构造函数)内部 访问
  protected pro = 4; // ---- protected 保护属性 只能在声明他的 类 及其 子类 中访问

  getPri = () => {
    console.log("this.pri", this.pri); // private 私有属性 只能在声明他的 类 中访问
  };

  getPro = () => {
    console.log("this.pro", this.pro); // protected 保护属性 只能在声明他的 ( 类 及其 子类 ) 中访问
  };
}

// 实例
const cons = new Cons();
console.log("cons.pub", cons.pub);
console.log("cons.pri", cons.pri); // 报错，属性“pri”为私有属性，只能在类“Cons”中访问；则就不能在子类或实例上范围
console.log("cons.pro", cons.pro); // 报错，属性“pro”受保护，只能在类“Cons”及其子类中访问；则不能在实例上访问

console.log("cons.getPri()", cons.getPri());
console.log("cons.getPro()", cons.getPro());

// 子类
class ChildCons extends Cons {
  getPro = () => {
    console.log("this.pro", this.pro); // protected 可以在声明他的 ( 类 和 子类 ) 中访问
  };
}
const childCons = new ChildCons();
console.log("childCons.getPro()", childCons.getPro());
```

# (八) 命名空间

- 作用: 避免 命名冲突

```
1
如果引入命名空间
- 1. /// <reference path='xxx.ts'>
- 2. 如果 namespace export 的话，可以直接用 import 来引入即可
---

1
没有 export namespace - 可以使用 /// <reference path="namespace-a.ts" /> 来引入文件
namespace FruitNamespace {
  export interface Apple {
    color: string;
    getColor: () => void;
  }
}


2
有 export namespace - 使用 import 来引入
export namespace FruitNamespace2 {
  export interface Apple {
    color: string;
    getColor: () => void;
  }
}
```

# (九) tsconfig.json

- [链接](https://juejin.cn/post/6999807282343051277#heading-19)
- 例子: 本项目/2-FRONTEND/2-TS/\_TsconfigJson.md

### (9.1) 说明

```
9.1
tsconfig.json - 顶层属性
---

AA.
compilerOptions ----> 编译选项
include ------------> 编译器需要编译的文件，或文件夹
exclude ------------> 编译器需要排除的文件，或文件夹
extends ------------> 引入其他配置文件，继承配置
files --------------> 表示编译器需要编译的单个文件列表
references ---------> 指定依赖工程，它允许用户为项目的不同部分使用不同的 TypeScript 配置，主要是一个项目中有 Node和Browser 两种环境的代码
compileOnSave ------> 可以让IDE在保存文件的时候根据`tsconfig.json`重新生成文件
typeAcquisition
  子属性如下
  - enable: boolean是否开启自动引入库类型定义文件.d.ts
  - include: array允许自动引入的库名
  - exclude: array排除的库名
  // acquisition 是收购，获取的意思


BB.
{
  "extends": "",
  "compileOnSave": true,
  "compilerOptions": {},
  "files": [],
  "include": [],
  "exclude": [],
  "references": []
}


CC.
在使用 Vite 创建 vue-ts 模板的项目时，会发现除了 tsconfig.json 外，还有一个 tsconfig.node.json 文件
同时在 tsconfig.json 中有这样一段对我来说比较陌生的代码
{ "references": [{ "path": "./tsconfig.node.json" }] }
"composite": true
- 表示: 上面的表示 ( 项目引用 ): 它允许用户为项目的不同部分使用不同的 TypeScript 配置，主要是一个项目中有 Node和Browser 两种环境的代码
- 详见: 随便起一个 vite 的项目都有两份配置
- 资料: https://juejin.cn/post/7126043888573218823
```

```
8.2
compilerOptions 配置项
---

baseUrl
// baseUrl
// 含义：用于解析(非相对模块名称)的(基目录)，也可以认为是指定(根目录)
// 配合：baseUrl + paths 可以实现类似 alias 的功能
// 原因：当配置了 paths 时，一定需要配置 baseUrl

paths
// paths
// 值类型：Object
// 含义：( 模块名 ) 或 ( 路径映射 ) 的列表，类似于 alias
// 特点：需要搭配 ( baseUrl )
// 例子0 vue中配置的例子
// "compilerOptions": {
//    "baseUrl": ".",
//    "paths": {
//      "@/*": ["./src/*"]
//     }
// }
// 例子 1
// "baseUrl": "./",
// "paths": { "@/_": ["src/_"] }
// 例子 2
// "baseUrl": "./",
// "paths": {
// "_": ["types/_"]
// },
// "esModuleInterop": true,
// 例子 2 表示：寻在声明文件需要到 当前目录/types 目录中去寻找
// -- 例子 3 -- 下面三种写法等价
// "baseUrl": "src", //
// "paths": {
// "@/_": ["/_"]
// }
// "baseUrl": ".",
// "paths": {
// "@/_": ["src/_"]
// }
// "baseUrl": "./src",
// "paths": {
// "@/_": ["/_"]
// }
// -- 例子 4 -- 官网的配置
- 遇到问题
- 问题：当在 webpack 配置了别名后，ts 报错找不到模块
- 回答：
  - **paths**：因为 webpack 知道了别名路径，但是 ts 并不知道这是设置了别名，所以需要设置 tsconfig.json 文件中的 `paths`
  - **baseUrl**: 当设置了 paths 时，就必须设置 baseUrl
    {
      "compilerOptions": {
        "baseUrl": ".", // this must be specified if "paths" is specified.当指定 paths 的时候，就必须指定 baseUrl
        "paths": {
          "jquery": ["node_modules/jquery/dist/jquery"] // 该映射是相对于 baseUrl 的
            "@/_": "src/_"
          }
      }
    }
    官网说明：https://www.typescriptlang.org/tsconfig#paths


typeRoots
types
// typeRoots 和 types
// 值类型：两者都是 array
// - typeRoots 数组成员是(@types 包的文件夹路径)
// - types 数组成员是(npm 包名)
// 场景：
//  - 默认所有可见的 @types 包 会在编译过程中被包含进来
//  - 比如我们安装 jquery 时，在ts中引入就回报错找不到到类型，还需安装 @types/jquery
//      - typeRoots 场景：如果指定了 typeRoots，则只有 typeRoots 数组(指定的文件夹)中的(@types 包会被包含进来)
//      - types 场景：如果指定了 types，则只有 types 数组中的(npm 包会包含进来)
// 案例 (重要!):
// "typeRoots": ["./typings"], // 只有 typings 文件夹下的@types 包会包含进来，node_modules 中的则不会包含进来
// "types": ["jquery", "node", "webpack-env]
//   - jquery, node, webpack-env，库 npm 包会包含进来，如果不写的话，设计到ts类型时就会报错
//   - 即使这个人安装了另一个声明文件，比如 npm install @types/node，它的全局变量（例如 process）也不会泄漏到你的代码中
// 官网说明:
// - https://www.tslang.cn/docs/handbook/tsconfig-json.html#types-typeroots-and-types
// - https://jkchao.github.io/typescript-book-chinese/typings/types.html


noImplicitAny
// noImplicitAny
// 类型值：boolean，默认是 false
// 含义：有 隐含 any 时是否报错
// 单词：implicit 是隐式的意思
// 例子
// function setName(name) {}
// - 如果 noImplicitAny: false 时，name 参数不会报错
// - 如果 noImplicitAny: true 时，name 参数会报错，因为 name 推测出 any 类型，除非我们使用 function setName(name: any) {} 就不会报错


noUnusedLocals + noUnusedParameters
// 1
// noUnusedLocals
// 类型值：boolean，默认值是 false
// 含义：有未使用的 ( 局部 ) 变量时，是否报错
// 注意点：注意这里是局部变量，如果一个变量是非局部变量，比如导出的模块变量 export const a = 1，即使没用到也不会报错！！！！！
// 2
// noUnusedParameters
// 类型值：boolean，默认值是 false
// 含义：有未使用的 ( 参数 ) 时，是否报错
// 例子
// function notUse(age: number, who: string) { // 当设置 noUnusedParameters: true 时，who 报错，因为参数未使用
// console.log(`age`, age)
// }

esModuleInterop
// esModuleInterop
// 含义：`esModuleInterop`选项的作用是支持使用`import d from 'cjs'`的方式引入`commonjs`包
// 解释：本来 commonjs 只支持 require 的方法，esModuleInterop=true，则可以使用 import 的方式
// interop 是相互操作的意思

target
// target
// 含义：将 ts 编译成什么版本的 js 文件
// 可选值："ES3"， "ES5"， "ES6"/ "ES2015"， "ES2016"， "ES2017"，"ESNext"
// 默认值："ES3"
// "ESNext" 表示 tc39 最新的 ES proposed features

module
// module
// 含义：将 ts 编译成 js 文件时，js 文件使用什么(模块系统)
// 可选值："None"， "CommonJS"， "AMD"， "System"， "UMD"， "ES6"， "ES2015"，"ESNext"
// 默认值根据 --target 或者 target 选项不同而不
// - target=es6 时，module=es6
// - target 不是 es6 时，module=commonjs
// - 比如：
// - module=es6 时，打包后的 js 文件中，使用 import
// - module=commonjs 时，打包后的 js 文件中，使用 require

lib
// lib
// 含义：编译过程中需要引入的 ( 库文件 ) 的列表
// 值类型：string[]，
// 默认值：
// - 默认值是根据--target 选项不同而不同
// - target=es5 时 -> 默认值是 ['DOM', 'ES5', 'ScriptHost']
// - target=es6 时 -> 默认值是 ['DOM', 'ES6', 'ScriptHost', 'DOM.Iterable']
// 可选值：可选的值有很多，常用的有 ES5，ES6，ESNext，DOM，DOM.Iterable、WebWorker、ScriptHost 等

allowJs
checkJs
// 1
// allowJs
// 值类型：boolean ，默认值是 false
// 含义：是否允许编译 javascript 文件，true 则表示 js 后缀的文件也会被 typescript 编辑器编译
// 例子
// allowJs=true，你在 ts 文件中引入了一个 js 文件就(不会报错)
// allowJs=false，你在 ts 文件文件中引入了一个 js 文件会(报错)
// 2
// checkJs
// 值类型：boolean，默认值是 false
// 含义：是否在 .js 文件中报告错误，与 ( checkJs 和 allowJs ) 一起配合使用


jsx
// jsx
// 值类型：枚举
// 值范围：'preserve' 'react-native' 'react'
// 含义：指定 jsx 代码生成，这些模式只在代码生成阶段起作用
// 1 preserve => 生成代码中会保留 jsx 后续的转换操作(比如以后还可以用 babel)，输出文件带有 .jsx
// 2 react => 生成 React.createElement，在使用前不需要转化了，输出文件带 .js
// 3 react-native => 保留了所有 jsx，输出文件扩展名是 .js
模式 | 输入 | 输出 | 输出文件扩展名 |
| -------------- | --------- | ---------------------------- | ------- |
| `preserve` | `<div />` | `<div />` | `.jsx` |
| `react` | `<div />` | `React.createElement("div")` | `.js` |
| `react-native` | `<div />` | `<div />` | `.js` |

outDir // 输出文件夹
rootDir // 输入文件夹

moduleResolution
// moduleResolution
// 值类型：string 类型的枚举，支持 ( node ) ( classic )
// 含义：如何处理模块
// 大白话：遇到 import {} from ... 时应该如何去寻找模块
// 一般情况下都选择 node
// moduleResolution: 'node'

removeComments // ------------- boolean，是否移除代码中的注释 ！
strictNullChecks // ----------- boolean，是否开启 null 和 undefined 检查 ！
allowSyntheticDefaultImports // boolean，是否允许从没有设置默认导出的模块中默认导入 ！
strict // --------------------- boolean，是否启用 ( 所有 ) 严格类型检查选项，相当于启用 noImplicitAny noImplicitThis alwaysStrict strictNullChecks strictFunctionTypes strictPropertyInitialization !
importHelpers // -------------- boolean，是否从 ( tslib ) 导入辅助工具函数，比如 \_extends \_rest 等 !

sourceMap // ------------------ boolean，是否生成目标文件的 sourceMap 文件
skipLibCheck // --------------- boolean，是否跳过 lib 库检查
noImplicitReturns // ---------- boolean，是否在函数的每个分支都有返回值



---- 分割线 ----
include
exclude
// include 和 exclude
// 值类型：Array
// 含义
// - 在未设置 include 时，编译器默认包含(当前目录和子目录)的所有 typescript 文件(.ts, .d.ts 和 .tsx)
// - 当(allowJs=true)时，还包括所有的 js 文件(.js 和.jsx)
// 例子
// "include": ["src/**/*"] // 表示编译 src/二级目录/三级目录中的所有(三级目录)中的 typescript 文件




---- 分割线 ----
2022 年 1 月 20 更新
---

1
resolveJsonModule
- 表示从 .json 文件中导入，导出其类型
  // settings.json ---> { "dry": false, "debug": false }
  // import settings from "./settings.json";
  // settings.debug === true; // OK
  // settings.dry === 2; // Error: '===' 不能用于比较 boolean 和 number 类型

2
isolatedModules
- 是否将每个文件作为单独的模块，默认为 true
- 不可以和 declaration 同时设定
  // isolated 表示单独，分离，隔离

3
noEmit
- 不编译输出文件
- 用 ts 新建一个项目，发现 build 时，没有输出，最后发现时 tsconfig.json 中 noEmit 选项的原因

4
skipLibCheck
- 是否跳过 lib 库检查，即跳过声明文件的类型检查
- 如果我们开启了这个选项，则可以节省编译期的时间，但可能会牺牲类型系统的准确性。在设置该选项时，推荐值为 true
```

### (9.2) 具体配置

- 资料: https://juejin.cn/post/7153615781321703438

```
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */

    /* Projects */
    // "incremental": true,                              /* Save .tsbuildinfo files to allow for incremental compilation of projects. */
    // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
    // "tsBuildInfoFile": "./.tsbuildinfo",              /* Specify the path to .tsbuildinfo incremental compilation file. */
    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects. */
    // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
    // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */

    /* Language and Environment */
    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    // "lib": [],                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
    // "jsx": "preserve",                                /* Specify what JSX code is generated. */
    // "experimentalDecorators": true,                   /* Enable experimental support for legacy experimental decorators. */
    // "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
    // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'. */
    // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
    // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using 'jsx: react-jsx*'. */
    // "reactNamespace": "",                             /* Specify the object invoked for 'createElement'. This only applies when targeting 'react' JSX emit. */
    // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
    // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */
    // "moduleDetection": "auto",                        /* Control what method is used to detect module-format JS files. */

    /* Modules */
    "module": "commonjs",                                /* Specify what module code is generated. */
    // "rootDir": "./",                                  /* Specify the root folder within your source files. */
    // "moduleResolution": "node10",                     /* Specify how TypeScript looks up a file from a given module specifier. */
    // "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
    // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
    // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
    // "typeRoots": [],                                  /* Specify multiple folders that act like './node_modules/@types'. */
    // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
    // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
    // "moduleSuffixes": [],                             /* List of file name suffixes to search when resolving a module. */
    // "allowImportingTsExtensions": true,               /* Allow imports to include TypeScript file extensions. Requires '--moduleResolution bundler' and either '--noEmit' or '--emitDeclarationOnly' to be set. */
    // "resolvePackageJsonExports": true,                /* Use the package.json 'exports' field when resolving package imports. */
    // "resolvePackageJsonImports": true,                /* Use the package.json 'imports' field when resolving imports. */
    // "customConditions": [],                           /* Conditions to set in addition to the resolver-specific defaults when resolving imports. */
    // "resolveJsonModule": true,                        /* Enable importing .json files. */
    // "allowArbitraryExtensions": true,                 /* Enable importing files with any extension, provided a declaration file is present. */
    // "noResolve": true,                                /* Disallow 'import's, 'require's or '<reference>'s from expanding the number of files TypeScript should add to a project. */

    /* JavaScript Support */
    // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
    // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from 'node_modules'. Only applicable with 'allowJs'. */

    /* Emit */
    // "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
    // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
    // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
    // "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
    // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
    // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output. */
    // "outDir": "./",                                   /* Specify an output folder for all emitted files. */
    // "removeComments": true,                           /* Disable emitting comments. */
    // "noEmit": true,                                   /* Disable emitting files from a compilation. */
    // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
    // "importsNotUsedAsValues": "remove",               /* Specify emit/checking behavior for imports that are only used for types. */
    // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    // "newLine": "crlf",                                /* Set the newline character for emitting files. */
    // "stripInternal": true,                            /* Disable emitting declarations that have '@internal' in their JSDoc comments. */
    // "noEmitHelpers": true,                            /* Disable generating custom helper functions like '__extends' in compiled output. */
    // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
    // "preserveConstEnums": true,                       /* Disable erasing 'const enum' declarations in generated code. */
    // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */
    // "preserveValueImports": true,                     /* Preserve unused imported values in the JavaScript output that would otherwise be removed. */

    /* Interop Constraints */
    // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
    // "verbatimModuleSyntax": true,                     /* Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting. */
    // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

    /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,                         /* When type checking, take into account 'null' and 'undefined'. */
    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,                      /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    // "noImplicitThis": true,                           /* Enable error reporting when 'this' is given the type 'any'. */
    // "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
    // "noUnusedLocals": true,                           /* Enable error reporting when local variables aren't read. */
    // "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read. */
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
    // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
    // "noUncheckedIndexedAccess": true,                 /* Add 'undefined' to a type when accessed using an index. */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type. */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true,                                 /* Skip type checking all .d.ts files. */
    "noImplicitAny": false, /* any类型不报错 */
  },
  "include": [
    "1-FRONTEND/8-WEBPACK"
  ]
}
```

# (十) 声明文件

- 当使用第三方库时, 我们需要引用它的声明文件, 才能获得对应的代码补全、接口提示等功能
- 声明文件必需以 ( .d.ts ) 为后缀

```12
1
识别声明文件的顺序
tsconfig.json/includes字段配置的路径 > 项目中声明的 *.d.ts 文件 > node_modules/@types


2
声明文件的位置
- 第三方包
  - 第三方安装的 @types/xxx，会在 node_modules/@types 路径下
- 自定义
  - 项目的根路径 types
  - { "compilerOptions": { "typeRoots" : ["./types"] } }
```

```3
3
自定义声明文件
- 社区不是万能的，有时候需要我们自己定义声明文件
---

3.1
declare (var | let | const) 声明全局变量
declare function 声明全局方法, 在函数类型的声明语句中, 函数重载也是支持的
declare class 声明全局类
declare enum 声明全局枚举类型
declare module 声明模块
```
