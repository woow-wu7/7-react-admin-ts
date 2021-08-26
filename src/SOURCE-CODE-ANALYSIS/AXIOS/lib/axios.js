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
  // content
  // - 属性 defaults interceptors request getUri ...

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
  utils.extend(instance, Axios.prototype, context)

  // 继承实例
  // Copy context to instance
  // 同样拷贝 context 到 instance 函数上，函数属性的话将this绑定到context上返回新函数作为value再拷贝
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
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig))
  // 1. axios.defaults === new Axios(defaultConfig).defaults === defaultConfig
  // 2. 最终 axios.defaults === defaultConfig
}

// Expose Cancel & CancelToken
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

module.exports = axios

// Allow use of default import syntax in TypeScript
// 为了允许在TypeScript中使用default
module.exports.default = axios
