var utils = require('./utils')
var normalizeHeaderName = require('./helpers/normalizeHeaderName')

// Content-type: x-www-form-urlencoded
// 表单方式提交
// 是 XMLHttpRequest 的默认提交方法
var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded',
}

// 设置 Content-Type
// 条件: ( headers存在 ) 并且 (  headers[Content-Type]不存在 )
function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value
  }
}

// ---------------------------------------------------------------------- getDefaultAdapter
function getDefaultAdapter() {
  var adapter

  // adapter会根据浏览器环境或node环境使用不同的请求
  // 浏览器 => XMLHttpRequest来判断 => XHR
  // node => process来判断 => http https

  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    // 1. 浏览器环境使用 XMLHttpRequest
    adapter = require('./adapters/xhr')
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    // 2. node环境使用 http https 模块
    adapter = require('./adapters/http')
  }
  return adapter
}

var defaults = {
  // adapter适配器，即根据 ( 浏览器环境 ) 和 ( node环境 ) 使用不同的请求方法
  adapter: getDefaultAdapter(),

  transformRequest: [
    function transformRequest(data, headers) { // body headers
      normalizeHeaderName(headers, 'Accept') // 相当于格式化，将headers中不正规的key的写法正规化
      normalizeHeaderName(headers, 'Content-Type') // 同上
      if (
        utils.isFormData(data) ||
        utils.isArrayBuffer(data) ||
        utils.isBuffer(data) ||
        utils.isStream(data) ||
        utils.isFile(data) ||
        utils.isBlob(data)
      ) {
        return data // 是以上类型直接返回
      }
      if (utils.isArrayBufferView(data)) {
        return data.buffer // buffer类型的数据
      }
      if (utils.isURLSearchParams(data)) {
        // data是 URLSearchParams 类型
        setContentTypeIfUnset(
          // Content-Type不存在，设置为"application/x-www-form-urlencoded;charset=utf-8"
          headers,
          'application/x-www-form-urlencoded;charset=utf-8'
        )
        return data.toString()
      }
      if (utils.isObject(data)) {
        // data是 object 类型
        setContentTypeIfUnset(headers, 'application/json;charset=utf-8') // Content-Type不存在，设置为"application/json;charset=utf-8"
        return JSON.stringify(data)
      }
      return data
    },
  ],

  transformResponse: [
    function transformResponse(data) {
      /*eslint no-param-reassign:0*/
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data) // parse一下
        } catch (e) {
          /* Ignore */
        }
      }
      return data
    },
  ],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   * ---
   * timeout
   * 表示超时终止请求，值为0表示不会终止请求
   */
  timeout: 0, // 请求超时时间，超过 timeout 就会 abort中断请求

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300
  },
}

defaults.headers = {
  common: {
    // common
    Accept: 'application/json, text/plain, */*',
  },
}

// delete,get,head
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {}
  // 将header中的这三个字段设置为空对象
})

// post put patch
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE)
})

module.exports = defaults
