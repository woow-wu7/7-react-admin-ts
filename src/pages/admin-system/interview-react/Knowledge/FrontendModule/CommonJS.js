let b = 1;

// CommonJS的模块，导出的是 ( 值的拷贝 )，修改不会影响原模块
setTimeout(() => {
  b = 2
}, 6000)

module.exports = {
  b
}