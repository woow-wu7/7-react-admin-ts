

var utils = require('./../utils');

// ---------------------------------------------------------------- InterceptorManager构造函数
function InterceptorManager() {
  this.handlers = [];
  // handlers数组
  // 1. 成员是一个对象，该对象具有 fulfilled 和 rejected 属性
  // 2. stack: 栈
  // 3. heap: 堆
}

/**
 * Add a new interceptor to the stack
 * 向栈中添加新的 interceptor 拦截器对象
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 * 返回值是一个数值类型的ID，用于删除interceptor拦截器对象
 */
// ---------------------------------------------------------------- use函数
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 * 删除栈中的 interceptor 对象
 *
 * @param {Number} id The ID that was returned by `use`
 * 参数是上面的 use 方法返回的 ID
 */
// ---------------------------------------------------------------- eject函数
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null; // 赋值为null
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
// ---------------------------------------------------------------- forEach函数
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;
