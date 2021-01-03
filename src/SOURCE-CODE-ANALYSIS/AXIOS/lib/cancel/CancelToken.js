

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
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

  var token = this;
  // 调用CancelToken函数的参数函数 executor
  // 调用 executor, 传入 cancel函数 作为参数
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message); // reason对象上具有：message, toString, __CANCEL__ 等属性
    resolvePromise(token.reason); // 并把reason对象resolve出去
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
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
