// 常量枚举
// const 枚举
// const enum xxx {...}
// - ( 常量枚举 ) 只能使用 ( 常量枚举表达式 )
// - 并且不同于常规的枚举它们在 ( 编译阶段会被删除 ) ( 编译阶段会被删除 ) ( 编译阶段会被删除 )
// - 使用场景: 为了避免 ( 在额外生成的代码上的开销 ) 和 ( 额外的非直接的对枚举成员的访问 )，我们可以使用 const枚举
// - 详见: 1-FRONTEND/2-TS/3.4-enum和const enum.ts

// 资料
// https://juejin.cn/post/7205875448567808059#heading-14
// 1. 如果业务场景里不在意 ts 在处理enum时，生成的IIFE的Side Effect，直接使用 enum 就好
// 2. 如果业务场景不需要使用enum的object的值，只需要用到它的value值，使用常量枚举 const enum 更好
// 3. 如果业务场景需要使用enum的object的值，又不想要Side Effect的干扰，直接使用 ( object as const来替代枚举类型 )，使得编译出最纯净的 js，或者使用上文介绍的其他方法，消除副作用


// 普通枚举
enum EClass {
  en = 2,
  ch,
}

// 常量枚举额
const enum EClass2 {
  en = 20,
  ch,
}

const class1 = EClass.en; // 2
const class2 = EClass[2]; // 'en'

const class3 = EClass2.en;
const class4 = EClass2["20"]; // 报错，不存在 数字枚举反向映射
