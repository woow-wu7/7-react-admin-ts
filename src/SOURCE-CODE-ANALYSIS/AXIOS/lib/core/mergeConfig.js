

var utils = require('../utils');

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
// -------------------------------------------------------------------------- mergeConfig
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};

  var config = {}; // 合并过后的总对象，最终的函数的返回值

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];
  // 以上都是在定义变量

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      // 不是undefined
      config[prop] = getMergedValue(config1[prop], config2[prop]); // 合并
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  // forEach(obj, fn)会遍历obj(plainObject或数组)，然后调用 fn(obj[value], obj[key], obj)
  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      // 如果传入的config中不存在 ( url, method, data ) 这这几个属性
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  // 将 'headers', 'auth', 'proxy', 'params' 这些属性放入 config
  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  // 将 defaultToConfig2Keys 数组的每个成员拷贝到 config
  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  // 将 validateStatus 拷贝到 config
  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  // axiosKeys
  // 拼接上面定义的四个数组，合成一个总数组
  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  // otherKeys
  // 1. 拼接 ( 两个参数对象 ) 中 ( key ) 组成的数组
  // 2. 拼接后，过滤掉 axiosKeys 中已经存在的key
  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1; // 在总对象上过滤掉 axiosKeys 存在的属性，得到 otherKeys
    });

  utils.forEach(otherKeys, mergeDeepProperties); // 深拷贝到config
  // utils.forEach(otherKeys, mergeDeepProperties)
  // - 将otherKeys数组的每个成员，作为参数传入 mergeDeepProperties 函数中

  return config; // 返回config
};
