var utils = require('./../utils')
var transformData = require('./transformData')
var isCancel = require('../cancel/isCancel')
var defaults = require('../defaults')

/**
 * Throws a `Cancel` if cancellation has been requested.
 * 1. 如果: 请求时，传入的配置对象config对象中存在 cancelToken
 * 2. 那么：就调用 config.cancelToken.throwIfRequested() 方法
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
    // throwIfRequested()
    //  - 作用：如果 reason 对象存在，就 throw reason，即 throw {message: '...'}
    //  - reason = new Cancel(message)
    //  - reason对象具有 message 属性
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 * 使用配置的适配器向服务器发送请求
 *
 * @param {object} config The config that is to be used for the request // 用于请求的config配置项
 * @returns {Promise} The Promise to be fulfilled // 返回 fulfilled 状态的 promise
 */
// ---------------------------------------------------------------------- dispatchRequest函数
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config)

  // Ensure headers exist
  config.headers = config.headers || {} // 熔断处理

  // (一)
  // transformData
  // 1. 作用：遍历 transformRequest 数组，调用每个成员函数，参数是data和headers，并重新赋值给data
  // -------------------------------------------------------------------------- transformData
  // module.exports = function transformData(data, headers, fns) {
  //   /*eslint no-param-reassign:0*/
  //   utils.forEach(fns, function transform(fn) {
  //     data = fn(data, headers);
  //     // 1. 遍历fns
  //     // 2. 将 fns 数组中的每个fn作为参数传入 transform 函数，并调用 transform
  //     // 3. 调用每个 fn(data, headers)
  //   });
  //   return data;
  // };
  // -------------------------------------------------------------------------- transformData

  // (二)
  // transformRequest 是这样一个数组
  // -------------------------------------------------------------------------- transformRequest
  // transformRequest: [
  //   function transformRequest(data, headers) {
  //     normalizeHeaderName(headers, "Accept"); // 相当于格式化，将headers中不正规的key的写法正规化
  //     normalizeHeaderName(headers, "Content-Type"); // 同上
  //     if (
  //       utils.isFormData(data) ||
  //       utils.isArrayBuffer(data) ||
  //       utils.isBuffer(data) ||
  //       utils.isStream(data) ||
  //       utils.isFile(data) ||
  //       utils.isBlob(data)
  //     ) {
  //       return data; // 是以上类型直接返回
  //     }
  //     if (utils.isArrayBufferView(data)) {
  //       return data.buffer; // buffer类型的数据
  //     }
  //     if (utils.isURLSearchParams(data)) { // data是 URLSearchParams 类型
  //       setContentTypeIfUnset( // Content-Type不存在，设置为"application/x-www-form-urlencoded;charset=utf-8"
  //         headers,
  //         "application/x-www-form-urlencoded;charset=utf-8"
  //       );
  //       return data.toString();
  //     }
  //     if (utils.isObject(data)) { // data是 object 类型
  //       setContentTypeIfUnset(headers, "application/json;charset=utf-8"); // Content-Type不存在，设置为"application/json;charset=utf-8"
  //       return JSON.stringify(data);
  //     }
  //     return data;
  //   },
  // ],

  // -------------------------------------------------------------------------- transformRequest
  // Transform request data
  // 1
  // transformData
  // - 1. transformRequest是函数 ---------> 将 data 和 header 作为参数，传入transformRequest函数
  // - 2. transformRequest是函数组成的数组 -> 遍历，将 data 和 header 作为参数，传入transformRequest数组成员的每一个函数
  // 2
  // config.data是什么？
  // config.data是post等请求的 body
  // 3
  // transformRequest = [transformRequest] 做了哪些事情
  // - 1. 格式化headers中的 Accept Content-Type 等为标准的写法
  // - 2. 根据config.data的不同类型，设置 Content-Type 的默认值
  config.data = transformData(config.data, config.headers, config.transformRequest)

  // Flatten headers
  config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers)

  utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
    delete config.headers[method]
    // 删除以上方法
  })

  var adapter = config.adapter || defaults.adapter
  // adapter
  // 1. 浏览器环境是 (config) => new Promise()
  // 2. 允许自定义处理请求，使测试更容易，返回一个promise
  // 3. 一般在config中都不会传 adapter，所以一般都是使用 defaults.adapter，可以直接点击 defaults.adapter 跳到 defaults.adapter 的函数定义 => adapter: getDefaultAdapter()
  // 4. adapter 是适配器 的意思

  return adapter(config).then( // 执行完then的回调，返回一个promise对象

    // 成功回调
    function onAdapterResolution(response) {
      throwIfCancellationRequested(config)

      // Transform response data
      response.data = transformData(response.data, response.headers, config.transformResponse)

      return response
    },

    // 失败回到
    function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config)

        // Transform response data
        if (reason && reason.response) {
          reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse)
        }
      }

      return Promise.reject(reason)
    }
  )
}
