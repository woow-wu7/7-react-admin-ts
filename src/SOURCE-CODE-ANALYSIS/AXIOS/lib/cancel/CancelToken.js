var Cancel = require('./Cancel')

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 * CancelToken 是一个对象，可以用来实现取消请求操作
 *
 * @class
 * @param {Function} executor The executor function. 执行器
 */
// -------------------------------------------------------------------------- CancelToken
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.')
    // executor 必须是一个函数
  }

  // executor 必须是一个函数
  var resolvePromise // 存储 resolve 函数
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve
  })

  // token 就是 CancelToken 构造函数生成的实例对象
  var token = this

  // 执行 CancelToken 构造函数，就会在内部执行 executor 函数
  // 调用CancelToken函数的参数函数 executor
  // 调用 executor, 传入 cancel函数 作为参数
  // 1
  // - 1. 业务方：axios.get('/user/12345', cancelToken: new axios.CancelToken(c => cancelFn = c)
  // - 2. 当 ( cancelFn ) 函数执行时，CancelToken生成的实例上的 ( promise属性 ) 的状态才会改变为 ( fulfilled ) 状态
  // 2
  // cancel 函数执行还要结合
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      // 请求已经取消
      return
    }

    token.reason = new Cancel(message) // reason对象上具有：message, toString, __CANCEL__ 等属性
    // Cancel 构造函数的
    // 1.实例属性
    //  - message: 就是传入Cancel构造函数的参数message
    // 2. 原型对象上的属性
    //  - toString(): 返回一个'Cancel'开头的字符串
    //  - __CANCEL__: 布尔值
    resolvePromise(token.reason)
    // 1. 并把reason对象resolve出去
    // 2. 注意!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //    - cancel函数会resolve(reason)一个reason对象，可以通过 promise实例的 then 的第一个回调函数的参数去接收reason对象
    //    - 具体就是在 dispatchRequest => adapter => getDefaultAdapter => xhr.js 中的then进行获取的token.reason
  })
  // CancelToken 总结
  // CancelToken构造函数生成的实例属性有两个 promise 和 reason
  // token = {
  //   promise: new Promise(resolve => resolve({message: 'xxxxxxx'})),
  //   reason: {messge: 'xxxxxx'}
  // }
  //  注意：生成的cancelToken实例是要挂载到请求的config对象中的 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // `axios.get('/user/12345', { cancelToken: source.token }).catch()`像这样 !!!!!!!!!!!!!!!!!!!!!!!!!!!!
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 * 请求被取消，就抛出这个 Cancel 对象，即reson对象，即new Cancel(message)生成的reson对象
 */
// -------------------------------------------------------------------------- throwIfRequested
// throwIfRequested
// - throwIfRequested
// - 会在 axios 请求的配置项 axios.get('xxx', { cancelToken: source.token }) 中
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason // reason对象存在，就抛出这个reason对象
  }
}

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 * 返回一个对象，该对象包含 ( 新的 new CancelToken 实例 ) 和 ( cancel函数 )
 */
// -------------------------------------------------------------------------- source
// source
// 一个工厂函数
CancelToken.source = function source() {
  var cancel

  // token
  // - 1. 调用 new CancelToken() 调用时传入了 ( 实参 executor 函数 )，在 CancelToken 内部调用
  // - 2. 调用 executor 函数时，传入了 ( 实参 cancel 函数，cancel 函数会赋值给这里的 cancel 变量  )，cancel函数的作用是 ( resolve 包含 message 的错误对象  )
  //       - A. 当请求时: [requestInterceptorSuccess, requestInterceptorReject, request, responseInterceptorSuccess, responseInterceptorReject]
  //       - B. 取消请求相关: cancel相关的都是在上面 request 的过程中
  //       - C: 取消请求的原理: 在 request 中也有 promise 链条，当 cancel 函数执行时，其实就是将 request 中的 promise 状态变成了 resolve，然后直接返回
  //       - D: 总流程: [请求拦截，request->dispatchRequest->adapter->xhrAdapter->cancelToken存在 -> promise/pending状态 -> cancel()函数执行 -> promise/resolve状态, 响应拦截]
  //       - E: xhrAdapter文件位置: 本项目/src/SOURCE-CODE-ANALYSIS/AXIOS/lib/adapters/xhr.js
  var token = new CancelToken(function executor(c) {
    // CancelToken内调用executor时，传入了 cancel 函数作为参数
    // 即将 cancel函数，赋值给这里的 cancel 变量
    cancel = c
  })

  // source方法：返回一个对象
  return {
    token: token, // token实例，具有 promise, reason 等属性
    cancel: cancel, // cancel函数
  }
}

module.exports = CancelToken
