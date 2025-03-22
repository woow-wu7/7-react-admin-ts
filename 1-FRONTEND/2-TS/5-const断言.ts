// 1
// const 断言
// - 让一个 对象 中的所有属性 只读
// - 让一个 数组 只读

// 2
// 在 Typescript 中有哪些方法可以是一个 值 变成 常量，或者说不可修改
// - Readonly 工具类型
// - as const 常量断言
// - interface 和 class 中有 readonly 属性
// 2.1
// interface IName { name: string; }
// Type TC = Readonly(IName)
// 2.2
// const arr = [1, 3] as const;
// 2.3
// interface IA { readonly name: string; }
// class CA { readonly name: string = ''; }

// 1
// 对象只读属性
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
// 报错，无法为“age”赋值，因为它是只读属性。--- 即 as const 断言后，对象类型的数据的属性变成只读
// Cannot assign to 'age' because it is a read-only property.ts(2540)

// 2
// 数组是只读数组
const arr = [1, 3] as const;
arr[1] = 2;
// const arr: readonly [1, 3]
// 无法为“1”赋值，因为它是只读属性。ts(2540)

arr.push(1);
// 类型“readonly [1, 3]”上不存在属性“push”

/** 
------- ------- ------- ------- ------- ------- -------

assign 分配 布置 v
assignment 任务 作业 分配 n
sign 签名 签字 v
signature 签名 n
// 1. assign:  I will 【 assign 】 some tasks 【 to 】 you. 我将分配一些任务给你
// 2. assignment:  I have an 【 assignment 】 【 for 】 you. 我有一项任务要交给你  // I have a task for you.
// -
// 【 I‘m going to assign you a task. 我将分配你一个任务 】
// He assigned these workers to work with each other. 他分配这些工人们共同合作
// 1. 【 We assign it a value. 我们给它赋一个值 】
// 2. Assign a different color to each different type of information. 为每种不同类型的信息分配不同的颜色
// 3. 【 The teacher assigned each of the children a different task. 老师给每个儿童都布置了不同的作业 】

assignment 任务 作业 分配n
task 任务
// 英式英语: homework 作业
// 美式英语: assignment 作业
// sign
// assign
// assignment 任务:【 I have an assignment for you. 我有一项任务要交给你 】// I have a task for you.
// assign 分配:【 I‘m going to assign you a task. 我将分配你一个任务 】// I'll assign you some tasks.


sigh 叹气
-
sign 标志n 签名v
signature 签名n
-
resign 辞职 // TIPS: pay attention to pronunciation.
-
assign 分配 分派
assignment 任务 作业
【 digital signature. 数字签名 】
// 英式英语: homework 作业
// 美式英语: assignment 作业
// 1. assign:  I will 【 assign 】 some tasks 【 to 】 you. 我将分配一些任务给你
// 2. assignment:  I have an 【 assignment 】 【 for 】 you. 我有一项任务要交给你  // I have a task for you.
// assign: Assign an initial value of 1 to your variable. 赋一个初始值 1 给你的变量
// assign: 【 I‘m going to assign you a task. 我将分配你一个任务 】
// -
// 3. signature:  Each person's 【 signature 】 is unique. 每个人的签名都是独一无二的
// 4. sigh:  He gave a deep 【 sigh 】. 他深深地叹了一口气
// 5. sign 标志n: These three road 【 signs 】 telling us we have to go another way.
// 6. resign 辞职: After much consideration, the employee 【 resign 】 from his job. 深思熟虑后，这位员工辞职了
// -- resign 辞职 v ( 比较正式 )
// -- quit 辞职 v n ( 比较口语 )
// -- quite 相当的
// -- quiet 安静的

**/
