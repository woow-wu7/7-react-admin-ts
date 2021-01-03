
// -------------------------------------------------------------------------- bind函数
// bind
//  参数
//    - fn: 被绑定的函数
//    - thisArg: 被绑定函数中this所要指向的对象
//  返回值
//    - 一个新的函数
//  实质
//    - 实质就是bind函数的简单实现，简单到不能用new去调用
module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};
