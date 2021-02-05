/*

HTMLDivElement ------------------ div
HTMLButtonElement --------------- button
HTMLParagraphElemnt ------------- p
HTMLAnchorElement --------------- a
HTMLInputElement ---------------- input


-------


const countRef = useRef<number | null>(null) // uesRef用于绑定number类型的数据
const countRef = useRef(0)


-------


import { Switch, Redirect, Route, RouteChildrenProps } from 'react-router-dom';
const BasicLayout: React.FC<RouteChildrenProps> = (props) => {...}


-------


<Input
  ref={refInput}
  onChange={handleInputChange}
  onFocus={(e) => inputFocus(e, inputs)}
  onBlur={(e) => inputBlur(e, inputs)}
/>
import { Input } from 'antd'
const refInput = useRef<Input>(null)
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
};
const inputFocus = (e: React.FocusEvent<HTMLInputElement>, inputs: any) => {
}
const inputBlur = (e: React.FocusEvent<HTMLInputElement>, inputs: any) => {
}


-------


const handleSubmit = async (e: React.FormEvent) => {......}
<Form className={'Login-form'} onSubmit={handleSubmit}></Form>


-------


interface MenuInfo {
  key: React.Key;
  keyPath: React.Key[];
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement>;
}


-------


(1) typescript中 class 和 interface 的区别
- interface 只声明成员方法，不做实现
- class 声明并实现方法


-------


(2) typescript中 type(类型别名) 和 interface(接口) 的区别
1. 是否创建新的名字
- interface: 创建了一个新的名字，可以在任何地方使用
- type: 并不创建新的名字
- 如何理解？？？？？？？？？？比如鼠标悬浮在interface上是显示的就是名字，而type并不会显示名字，而是对象数据本身
2. 是否能被 extends 和 implements
- interface 可以被 extends 和 implements
- type 不能
3. 如果不能用interface来描述一个类型，并且需要使用 ( 联合类型 ) 或 ( 元组类型 )，通常会使用type
4. ( type ) 可以作用于 ( 原始值 ) ( 联合类型 ) ( 元组 ) 以及其他 ( 任何你需要手写的类型 )
5. 类型别名type和interface接口都可以用于 ( 泛型 )


-------


(3) type 的 ( 泛型 ) 和 ( 交叉类型 ) 的组合使用
type LinkedList<T> = T & { next: LinkedList<T> };
interface Person {
    name: string;
}
var people: LinkedList<Person>;
// 1. people是LinkedList<Person>类型
// 2. LinkedList<Person>是一个泛型type => 是 T & { next: LinkedList<T>} 的交叉类型，即同时具有两个类型，而LinkedList<T>同理是两个类型的交叉类型
// 3. 通过1和2的分析可以知道，people.next还是一个和people具有相同类型的类型，则还具有next和name属性，所以可以继续的.next
var s = people.name;
var s = people.next.name;
var s = people.next.next.name;
var s = people.next.next.next.name;


-------


(4) ( 索引类型查询操作符 ) 和 ( 索引访问操作符 )
- 索引类型查询操作符 keyof T
  - typeof T ======================================> 是 T 上 ( 已知的公共属性名的联合 )
  - interface A {name: string, age: number} =======> keyof A // 'name' | 'age'
  - 上面等价于 =====================================> 'name' | 'age' 就是已知的公共属性名的联合类型
  - typeof T 会随着 T 类型中添加新的元素类型时而 ( 自动的添加 )
- 索引访问操作符 T[K]
  - function getPeople<T, K extends keyof T>(people: T, name: K): T[K] => people[name]
  - getPeople({name: 'woow_wu7', age: 20}, age)

- keyof索引类型查询 和 字符串所以签名
  - interface Map<T> { [key: string]: T }
  - const keys: keyof Map<number> ======================> string

- K[T]索引访问操作符
  - interface Map<T> { [key: string]: T }
  - const value: Map<number>['foo'] ====================> number


-------


(5) 映射类型 in
- 映射类型
  - 1. 表示 新类型以相同的形式去转换旧类型中的每个属性
  - 2. 比如 你可以让每个属性成为 readonly 类型
- 例子
  - type Keys = 'name' | 'age'
  - type Flags = { [K in keyof Keys]: boolean } // 给每个属性都限制成boolean类型
  - 相当于 type Flags = { name: boolean, age: boolean }


-------
----------------(二) 声明文件
(1)
全局 ---------------- global.d.ts
模块 ---------------- module.d.ts  module-class.d.ts  module-function.d.ts
插件 ---------------- module-plugin.d.ts
防止命令冲突 --------- 使用库定义的 ( 全局变量名 ) 来声明 ( 命名空间 ) 类型
 */

export {}
