var utils = require("./utils");
var normalizeHeaderName = require("./helpers/normalizeHeaderName");

// Content-type: x-www-form-urlencoded
// 表单方式提交
// 是 XMLHttpRequest 的默认提交方法
var DEFAULT_CONTENT_TYPE = {
  "Content-Type": "application/x-www-form-urlencoded",
};

// 设置 Content-Type
// 条件: ( headers存在 ) 并且 (  headers[Content-Tpye]不存在 )
function setContentTypeIfUnset(headers, value) {
  if (
    !utils.isUndefined(headers) &&
    utils.isUndefined(headers["Content-Type"])
  ) {
    headers["Content-Type"] = value;
  }
}

// ---------------------------------------------------------------------- getDefaultAdapter
function getDefaultAdapter() {
  var adapter;

  // adapter会根据浏览器环境或node环境使用不同的请求
  // 浏览器 => XMLHttpRequest来判断 => XHR
  // node => process来判断 => http https

  if (typeof XMLHttpRequest !== "undefined") {
    // For browsers use XHR adapter
    // 1. 浏览器环境使用 XMLHttpRequest
    adapter = require("./adapters/xhr");
  } else if (
    typeof process !== "undefined" &&
    Object.prototype.toString.call(process) === "[object process]"
  ) {
    // For node use HTTP adapter
    // 2. node环境使用 http https 模块
    adapter = require("./adapters/http");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(), // adapter适配器

  transformRequest: [
    function transformRequest(data, headers) {
      normalizeHeaderName(headers, "Accept");
      normalizeHeaderName(headers, "Content-Type");
      if (
        utils.isFormData(data) ||
        utils.isArrayBuffer(data) ||
        utils.isBuffer(data) ||
        utils.isStream(data) ||
        utils.isFile(data) ||
        utils.isBlob(data)
      ) {
        return data;
      }
      if (utils.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils.isURLSearchParams(data)) {
        setContentTypeIfUnset(
          headers,
          "application/x-www-form-urlencoded;charset=utf-8"
        );
        return data.toString();
      }
      if (utils.isObject(data)) {
        setContentTypeIfUnset(headers, "application/json;charset=utf-8");
        return JSON.stringify(data);
      }
      return data;
    },
  ],

  transformResponse: [
    function transformResponse(data) {
      /*eslint no-param-reassign:0*/
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch (e) {
          /* Ignore */
        }
      }
      return data;
    },
  ],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
};

defaults.headers = {
  common: {
    Accept: "application/json, text/plain, */*",
  },
};

utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;
