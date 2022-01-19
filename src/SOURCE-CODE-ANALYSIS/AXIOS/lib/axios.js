var utils = require('./utils')
var bind = require('./helpers/bind')
var Axios = require('./core/Axios')
var mergeConfig = require('./core/mergeConfig')
var defaults = require('./defaults')

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance 默认配置
 * @return {Axios} A new instance of Axios 实例
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig)

  // 1
  // context 对象
  // - 属性
  //    - defaults
  //    - interceptors

  // 1-1
  // defaults
  // defaults 其实就是参数 defaultConfig
  // defaultConfig -> defaults 中的属性
  // - adapter 主要是请求方法的适配器，浏览器环境使用XMLHttpRequest，node环境使用http
  // - transformRequest
  // - transformResponse
  // - timeout
  // - xsrfCookieName: 'XSRF-TOKEN',
  // - xsrfHeaderName: 'X-XSRF-TOKEN',
  // - maxContentLength: -1,
  // - maxBodyLength: -1,
  // - validateStatus() 表示状态码 status >= 200 && status < 300 的布尔值

  // 1-2
  // interceptors
  // - 属性 request response
  // - 两个属性都是 InterceptorManager 构造函数new生成的实例

  // request response
  // - 属性 handlers use eject forEach

  // instance函数
  // bind函数将 ( request ) 方法中的this绑定到 ( context ) 对象上，并返回一个 ( 新的函数 )，新函数一apply的方式调用，即把返回的新函数的参数组装成数组传入apply
  var instance = bind(Axios.prototype.request, context)

  // 继承原型
  // Copy axios.prototype to instance
  // 将 axios.prototype 拷贝到 instance 函数上，作为instance函数的属性，函数属性的话将this绑定到context上
  // Axios.prototype上有哪些属性 -> request + getUri + 请求相关的各种方法比如get head options delete post put patch等
  utils.extend(instance, Axios.prototype, context)

  // 继承实例
  // Copy context to instance
  // 同样拷贝 context 到 instance 函数上，函数属性的话将this绑定到context上返回新函数作为value再拷贝
  // context 上有哪些属性 -> defaults interceptor
  utils.extend(instance, context)

  return instance
  // instance 函数上
  //  1. 同时具有request, Axios.prototype, new Axios(defaultConfig)
  //  2. 即 instance 函数拷贝了(继承) axios实例和原型上的属性和方法，instance本身是request函数
  //  3. 其实 instance本身就是 request 方法
}

// Create the default instance to be exported
// -------------------------------------------------------------------------- axios函数
var axios = createInstance(defaults)

// Expose Axios class to allow class inheritance
// 扩展 Axios类，则可以继承属性
axios.Axios = Axios // Axios 属性

// create
// Factory for creating new instances
// 用工厂函数生成新的实例，即create方法的作用是生成一个axios实例
// - create方法的特点
//    - 1. create函数存在的核心目的，是为了可以配置request函数的 ( 配置参数对象 )，而不是仅仅使用 defaults
//    - 2. 通过create创建的实例，就不再具有 Axios，Cancel，CancelToken，isCancel，all，spread 等属性和方法了
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig))
  // 1. axios.defaults === new Axios(defaultConfig).defaults === defaultConfig
  // 2. 最终 axios.defaults === defaultConfig
}

// Expose Cancel & CancelToken
// 取消请求相关的三个属性
// 1
// 有两种方法来取消请求
// - 1. new axios.CancelToken(c => cancelFn => c)
// - 2. const source = axios.CancelToken.source()
//      - source.token
//      - source.cancel
// 2
// 问题：如果判断axios请求是否已经取消了
// 回答：axios.isCancel(Error对象)
// 链接：https://github.com/axios/axios#cancellation
axios.Cancel = require('./cancel/Cancel')
axios.CancelToken = require('./cancel/CancelToken')
axios.isCancel = require('./cancel/isCancel')


// all
// Promise.all()
// Expose all/spread 即 Promise.all()
axios.all = function all(promises) {
  return Promise.all(promises)
}

axios.spread = require('./helpers/spread') //调用函数和扩展参数数组的语法糖
// spread 是传播的意思

module.exports = axios

// Allow use of default import syntax in TypeScript
// 为了允许在TypeScript中使用default
module.exports.default = axios
