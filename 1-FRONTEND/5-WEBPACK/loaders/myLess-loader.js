// loader
// 1. 概念
// - loader是一个 ( 函数 )，函数的第一个参数就是 ( 源码字符串 )，返回一个解析后的 ( 新的字符串 )
// 2. 注意点
// - loader不能写成 ( 箭头函数 )，因为内部需要使用 ( this ) 来获取更多的api
// - 比如：
//    - this.async
//    - this.callback

const less = require("less");

const lessLoader = function (source) {
  let res;
  less.render(source, function (err, content) {
    // 转义 \n => \\n
    // 转义 \r => \\r
    // 其他应用：比如在避免XSS攻击时，可以使用httponly以外，还可以转义html标签，和js中的 \n=>\\n \r=>\\r
    res = content.css.replace(/\n/g, "\\n").replace(/\r/g, "\\r");
  });
  return res;
};

module.exports = lessLoader;
