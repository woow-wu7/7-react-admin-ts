

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function. 执行器
 */
// -------------------------------------------------------------------------- CancelToken
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  // executor 必须是一个函数
  var resolvePromise; // 存储 resolve 函数
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  // token 就是 CancelToken 构造函数生成的实例对象
  var token = this;

  // 调用CancelToken函数的参数函数 executor
  // 调用 executor, 传入 cancel函数 作为参数
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message); // reason对象上具有：message, toString, __CANCEL__ 等属性
    // Cancel 构造函数的
    // 1.实例属性
    //  - message: 就是传入Cancel构造函数的参数message
    // 2. 原型对象上的属性
    //  - toString(): 返回一个'Cancel'开头的字符串
    //  - __CANCEL__: 布尔值
    resolvePromise(token.reason); 
    // 1. 并把reason对象resolve出去
    // 2. 注意!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //    - cancel函数会resolve(reson)一个reson对象，可以通过 promise实例的 then 捕获
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 * 请求被取消，就抛出这个 Cancel 对象，即reson对象，即new Cancel(message)生成的reson对象
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason; // reson对象存在，就抛出这个reson对象
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
// -------------------------------------------------------------------------- source
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) { 
    // CancelToken内调用executor时，传入了 cancel 函数作为参数
    // 即将 cancel函数，赋值给这里的 cancel 变量
    cancel = c;
  });
  // source方法：返回一个对象
  return {
    token: token, // token实例，具有 promise, reason 等属性
    cancel: cancel // cancel函数
  };
};

module.exports = CancelToken;
