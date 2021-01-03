

var utils = require('./../utils');
var buildURL = require('../helpers/buildURL');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var mergeConfig = require('./mergeConfig');

/**
 * Create a new instance of Axios
 * Axios 构造函数用于创建一个新的 axios 实例
 * @param {Object} instanceConfig The default config for the instance
 */
// -------------------------------------------------------------------------- Axios构造函数
// Axios
// - 实例属性
//    - default
//    - request
//    - getUri
//    - interceptors
//      - request
//      - response
//        - handlers
//        - use
//        - eject
//        - forEach
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = { 
    // axios实例对象上挂载 interceptors 属性对象
    // interceptors: 是拦截器的意思
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
// -------------------------------------------------------------------------- request方法
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  // 1. 允许 axios('example/url'[, config]) 这样发送请求
  // 2. 即 axios(url, config)

  if (typeof config === 'string') { 
    // config是一个字符串
    config = arguments[1] || {}; // 获取配置对象config
    config.url = arguments[0]; // 获取请求url，并赋值给配置对象 config
  } else {
    // config不是字符串，即是一个 对象 或者 不传
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) { 
    // 1. config对象中存在 method 属性
    config.method = config.method.toLowerCase(); // 转成小写
  } else if (this.defaults.method) { 
    // 2. config对象中method属性不存在，但是axios实例中default对象中method属性存在
    config.method = this.defaults.method.toLowerCase();
  } else {
    // 3. 都不存在，默认get方法
    config.method = 'get';
  }

  // Hook up interceptors middleware
  // 拦截器中间件
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);
  // promise
  // 1. 生成promise实例
  // 2. config 
  //      (1) 会作为then的第一个回调函数的参数传入，经过中间件
  //      (2) interceptor.request((config) => {}) => request(config) => interceptor.resonese()

  // interceptors.request.forEach
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    // 1. 遍历handlers数组，调用 unshiftRequestInterceptors 函数，参数是handlers数组每个成员对象{ fulfilled, rejected }
    // 2. unshift 添加成员到数组头部
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
    // [interceptor.fulfilled2, interceptor.rejected2, interceptor.fulfilled1, interceptor.rejected1, dispatchRequest, undefined]
  });

  // interceptors.response.forEach
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
    // [dispatchRequest, undefined, interceptor.fulfilled1, interceptor.rejected1, nterceptor.fulfilled2, interceptor.rejected2,]
  });

  while (chain.length) { // chain 数组不为空
    // 先执行request, 再执行dispatchRequest请求, 最后执行response
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// -------------------------------------------------------------------------- getUri方法
Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;
