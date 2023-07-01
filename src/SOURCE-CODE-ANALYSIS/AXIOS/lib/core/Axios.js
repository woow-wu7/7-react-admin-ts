var utils = require('./../utils')
var buildURL = require('../helpers/buildURL')
var InterceptorManager = require('./InterceptorManager')
var dispatchRequest = require('./dispatchRequest')
var mergeConfig = require('./mergeConfig')

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
  this.defaults = instanceConfig // 默认参数
  this.interceptors = {
    // interceptors: axios实例对象上挂载 interceptors 属性对象
    // interceptors: 是拦截器的意思
    // 注意:
    // - 这里 request中的handlers 和 response中的handlers 是相互独立的，是不同的实例，因为是各自new，生成不同实例，实例上有不同的 handlers
    // - 也就是说，当我们向 chain 添加 handlers 时，是不同的 handlers

    // new InterceptorManager()
    // - handlers -> []
    // - use ------> handler.push({fulfilled, rejected })
    // - eject
    // - forEach
    request: new InterceptorManager(),
    response: new InterceptorManager(),
    // 在真实的开发中，如果调用 use
    // 1. request
    // axios.interceptors.request.use(config => config, err =>  Promise.reject(err)) 参数和promise的then差不多
    // 2. response
    // axios.interceptors.response.use(response => response, err => Promise.reject(err))
  }
}


// -------------------------------------------------------------------------- request方法
// -------------------------------------------------------------------------- request方法
// -------------------------------------------------------------------------- request方法
/**
 * Dispatch a request
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
// Axios.prototype.request 最终返回的是一个 promise 对象
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/

  // 1
  // Allow for axios('example/url'[, config]) a la fetch API
  // 1. 允许 axios('example/url'[, config]) 这样发送请求
  // 2. 即 axios(url, config)

  // 2
  // axios允许发送请求的方法有下面几种
  // 11. axios(config)
  // 22. axios(url[, config])
  // 33. axios.request(config)
  //    axios.get(url[, config])
  //    axios.post(url[, data[, config]])
  //    axios.delete put head options patch
  // 44. axios.create([config]).get(url[, config])

  if (typeof config === 'string') {
    // 对应22
    // config是一个字符串
    config = arguments[1] || {} // 1. 如果config是一个字符串，那么config就是第二个参数，获取配置对象config
    config.url = arguments[0] // 2. 那么第一个参数就是rul, 获取请求url，并赋值给配置对象 config
  }
  // config不是字符串，即是一个 对象 或者 不传
  else {
    config = config || {}
  }

  config = mergeConfig(this.defaults, config) // 合并参数对象和默认对象，返回合并后的总对象，是深拷贝

  // Set config.method
  if (config.method) {
    // 1. config对象中存在 method 属性
    config.method = config.method.toLowerCase() // 转成小写
  } else if (this.defaults.method) {
    // 2. config对象中method属性不存在，但是axios实例中default对象中method属性存在
    config.method = this.defaults.method.toLowerCase()
  } else {
    // 3. 都不存在，默认get方法
    config.method = 'get'
  }

  // chain
  // Hook up interceptors middleware
  // 拦截器中间件
  // dispatchRequest => 执行adapter，并返回一个promise
  var chain = [dispatchRequest, undefined]

  var promise = Promise.resolve(config)
  // promise
  // 1. 生成promise实例
  // 2. config
  //      (1) 会作为then的第一个回调函数的参数传入，经过中间件，结合chain数组一起看
  //      (2) interceptor.request((config) => {}) => request(config) => interceptor.response()

  // request
  // interceptors.request.forEach() 的作用
  //  1. 遍历 handlers 数组的每个成员，以每个成员作为参数，传入unshiftRequestInterceptors函数
  //  2. handler是这样的数组 [{fulfilled, rejected}, {fulfilled, rejected}]
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    // 1. 遍历handlers数组(handler数组是构造函数InterceptorManager中声明的)，调用 unshiftRequestInterceptors 函数，参数是handlers数组每个成员对象{ fulfilled, rejected }
    // 2. unshift 添加成员到数组头部
    chain.unshift(interceptor.fulfilled, interceptor.rejected)
    // [interceptor.fulfilled2, interceptor.rejected2, interceptor.fulfilled1, interceptor.rejected1, dispatchRequest, undefined]
    // [请求成功拦截2, 请求失败拦截2, 请求成功拦截1, 请求失败拦截1, dispatchRequest, undefined]
  })

  // response
  // interceptors.response.forEach
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected)
    // [dispatchRequest, undefined, interceptor.fulfilled1, interceptor.rejected1, interceptor.fulfilled2, interceptor.rejected2,]
    // [dispatchRequest, undefined, 响应成功拦截1, 响应失败拦截1, 响应成功拦截2, 响应失败拦截2]
    // 扩展
    // - 如果存在 cancelToken 取消请求的流程的话，请求总流程应该是下面这样
    // - 总流程: [请求拦截，request->dispatchRequest->adapter->xhrAdapter->cancelToken存在 -> promise/pending状态 -> cancel()函数执行 -> promise/resolve状态, 响应拦截]
    // - xhrAdapter文件位置: 本项目/src/SOURCE-CODE-ANALYSIS/AXIOS/lib/adapters/xhr.js
  })

  // 在真实的开发中，如果调用 use
  // 1. request
  // axios.interceptors.request.use(config => config, err =>  Promise.reject(err)) 参数和promise的then差不多
  // 2. response
  // axios.interceptors.response.use(response => response, err => Promise.reject(err))
  // 最终 chain = [请求成功拦截2, 请求失败拦截2, 请求成功拦截1, 请求失败拦截1, dispatchRequest, undefined, 应成功拦截1, 响应失败拦截1, 响应成功拦截2, 响应失败拦截2]
  while (chain.length) {
    // chain 数组不为空
    // 先执行request, 再执行dispatchRequest请求, 最后执行response
    promise = promise.then(chain.shift(), chain.shift())
    // 从左往右一次一次取出两个方法
    // promise = Promise.resolve(config)
    // .then('请求成功拦截2', '请求失败拦截2') // 依此向下传递config , 注意2在1前面，unshift
    // .then('请求成功拦截1', '请求失败拦截1')
    // .then(dispatchRequest, undefined) // 真正发送请求，(config) => adapter(config).then(value => value, reason => Promise.reject(reason))
    // .then('响应成功拦截1', '响应失败拦截1')
    // .then('响应成功拦截2', '响应失败拦截2') // 注意2在1后面，push
  }

  return promise
  // 最后返回 promise
  // 就又可以通过 .then() 方法获取请求得到的结果值
}

// -------------------------------------------------------------------------- getUri方法
Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config)
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '')
}

// A
// 1. 将 get head options delete 方法绑定到 Axios.prototype上
// 2. 上面这四个方法都是调用 request 方法
// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(
      mergeConfig(config || {}, {
        method: method,
        url: url,
      })
    )
  }
})

// B
// 1. 将 post put patch 方法绑定到 Axios.prototype上
// 2. 同样这三个方法也是调用request方法
// A和B的区别：参数对象中是否包含 data
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, data, config) {
    return this.request(
      mergeConfig(config || {}, {
        method: method,
        url: url,
        data: data,
      })
    )
  }
})

module.exports = Axios
