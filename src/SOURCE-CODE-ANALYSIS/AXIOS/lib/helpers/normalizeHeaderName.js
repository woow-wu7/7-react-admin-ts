var utils = require('../utils')

module.exports = function normalizeHeaderName(headers, normalizedName) {
  // 1. 遍历headers对象，执行processHeader(value, name) 参数value和name是headers对象的value，key
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      // 1. 如果传入的 ( headers中的key ) 和 ( 标准写法 ) 相等
      // 2. 都转成大写后，还是不相等，就用标准的写法，删除不标准的写法
      headers[normalizedName] = value
      delete headers[name]
    }
  })
}
