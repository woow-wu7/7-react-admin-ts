

var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');

/**
 * Throws a `Cancel` if cancellation has been requested.
 * 1. 如果: 请求时，传入的配置对象config对象中存在 cancelToken
 * 2. 那么：就调用 config.cancelToken.throwIfRequested() 方法
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
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
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
// ---------------------------------------------------------------------- dispatchRequest函数
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // transformData
  // 1. 作用：遍历 transformRequest 数组，调用每个成员函数，参数是data和headers，并重新赋值给data
  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;
  // adapter
  // 1. 浏览器环境是 (config) => new Promise()

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};
