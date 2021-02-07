var utils = require('../utils')

module.exports = function normalizeHeaderName(headers, normalizedName) {
  // 1. 遍历headers对象，执行processHeader(value, name) 参数value和name是headers对象的value，key
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value
      delete headers[name]
    }
  })
}
