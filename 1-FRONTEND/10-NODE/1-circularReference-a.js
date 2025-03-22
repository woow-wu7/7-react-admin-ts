module.exports.a = "a";

const b = require("./1-circularReference-b.js");
console.log("b", b);

module.exports.a = "aa";

// nodejs 循环引用问题

// 结果
// 最终输出
// a { a: 'a' }
// b { b: 'bb' }

// 原因
// 相当于下面的代码
// module.exports.a = "a";
// const b = require("./1-circularReference-b.js"); // 加载整个b

// module.exports.b = "b";
// const a = require("./1-circularReference-a.js"); // 此时加载的a是: a刚执行到的地方之前的所有代码，没执行的不会在b中被加载
// console.log("a", a);
// module.exports.b = "bb";

// console.log("b", b);
// module.exports.a = "aa";
