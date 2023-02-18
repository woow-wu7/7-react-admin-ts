var utils = require('./../utils')

// ---------------------------------------------------------------- InterceptorManager构造函数，将一些操作方法挂载到原型对象上
function InterceptorManager() {
  this.handlers = []
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
 * 返回值是一个数值类型的ID
 */
// ---------------------------------------------------------------- use函数
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    // 向 handlers 数组中添加 {}
    fulfilled: fulfilled, // fulfilled 和 rejected 是两个函数
    rejected: rejected,
  })
  // 在真实的开发中，如果调用 use
  // 1. request
  // axios.interceptors.request.use(config => config, err =>  Promise.reject(err)) 参数和promise的then差不多
  // 2. response
  // axios.interceptors.response.use(response => response, err => Promise.reject(err))

  return this.handlers.length - 1
  // 返回值类型的ID，用于eject操作
  // 其实就是通过数组下标来记录，是length长度减少1
}

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
    this.handlers[id] = null // 赋值为null，初始这里是赋值为null，而不是删除该成员
  }
}

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
    // 1
    // util.forEach(obj|array, fn)
    // - arr ====> fn(arr[i], i, arr)
    // - object => fn(obj[key], key, obj)

    // 2
    // 因为：handlers是一个数组
    // 所以：forEachHandler(h) === fn(arr[i], i, arr)
    // 所以：h 是第一个参数即 arr[i]

    // 3
    // utils.forEach
    // 1. 因为：this.handlers 是一个数组
    // 2. 所以：遍历 this.handlers 数组，将每个数组成员对象作为参数h，传入 forEachHandler 函数
    // 3. 在真实开发中，有两种调用forEach的情况，request和response来调用
    // 3. 调用 fn({
    //          fulfilled: fulfilled, // fulfilled 函数
    //          rejected: rejected, // rejected 函数
    //         })
    if (h !== null) {
      fn(h) // 最终，将 对象或数据的每个成员key对应的值传入fn
    }
  })
}

module.exports = InterceptorManager
