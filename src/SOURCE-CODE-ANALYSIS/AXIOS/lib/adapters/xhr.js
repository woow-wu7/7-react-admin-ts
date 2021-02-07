var utils = require('./../utils')
var settle = require('./../core/settle')
var cookies = require('./../helpers/cookies')
var buildURL = require('./../helpers/buildURL')
var buildFullPath = require('../core/buildFullPath')
var parseHeaders = require('./../helpers/parseHeaders')
var isURLSameOrigin = require('./../helpers/isURLSameOrigin')
var createError = require('../core/createError')

// 浏览器环境的请求方法
module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data // requestData
    var requestHeaders = config.headers // requestHeaders

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type'] // Let the browser set it
      // 是 requestData 是 FormData 类型的话，就删除 Content-Type 这个 header
      // Content-Type: application/json, application/x-www-form-urlencode, text/plain, text/html
    }

    if ((utils.isBlob(requestData) || utils.isFile(requestData)) && requestData.type) {
      delete requestHeaders['Content-Type'] // Let the browser set it
      // 处理 blob 类型
    }

    var request = new XMLHttpRequest() // xhr实例

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || ''
      var password = unescape(encodeURIComponent(config.auth.password)) || ''
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password)
    }

    // fullpath
    // buildFullPath的作用是拼接 baseUrl + url
    // baseUrl => const axiosInstance = axios.create({baseRul: ...})
    // url => axiosInstance({url: ...})
    var fullPath = buildFullPath(config.baseURL, config.url)

    // xhr.open(method, url, async, username, password)
    // 1. method必须大写，比如 GET POST HEAD
    // 发起请求
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true)

    // timeout
    // Set the request timeout in MS
    request.timeout = config.timeout // timeout超时时间

    // onreadystatechange
    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return
        // xhr.readyState === 4 时，请求完成
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null
      var responseData =
        !config.responseType || config.responseType === 'text' ? request.responseText : request.response
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request,
      }

      settle(resolve, reject, response) // 根据 response 的状态决定是 resolve 还是 reject

      // Clean up request
      // 请求完成后，清除 XMLHttpRequest 生成的 xhr 实例
      request = null
    }

    // onabort
    // Handle browser request cancellation (as opposed to a manual cancellation)
    // 中断请求，取消请求
    request.onabort = function handleAbort() {
      if (!request) {
        return
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request))

      // Clean up request
      request = null
    }

    // onerror
    // Handle low level network
    // 错误处理，捕获错误
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request))

      // Clean up request
      request = null
    }

    // ontimeout
    // Handle timeout
    // 超时处理
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded'
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED', request))

      // Clean up request
      request = null
    }

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue =
        (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName
          ? cookies.read(config.xsrfCookieName)
          : undefined

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key]
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val)
        }
      })
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress)
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress)
    }

    // ------------------------------------------------------------------- 重要
    // ------------------------------------------------------------------- 处理取消请求
    if (config.cancelToken) {
      // Handle cancellation
      // 1. cancelToken = token = new CancelToken(executor) 生成的实例中是有 promise 实例的
      // 2. exectutor(c)中的c是这样一个函数 resolvePromise(token.reason)
      // 3. resolvepromise = resolve 其实就是 token.promise(resolvepromise => resolvepromise(token.reason))
      // 4. resolve的结果在这里通过 then 来捕获
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return
        }

        request.abort() // abort中断请求
        reject(cancel) // reject出去，可以通过axios().catch()来捕获
        // Clean up request
        request = null
      })
    }

    if (!requestData) {
      requestData = null
    }

    // Send the request
    // 以上都通过，就发送请求
    request.send(requestData)
  })
}
