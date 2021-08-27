

var utils = require('./../utils');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed // 被转换的数据
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
// -------------------------------------------------------------------------- transformData
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
    // 1. 遍历fns
    // 2. 将 fns 数组中的每个fn作为参数传入 transform 函数，并调用 transform
    // 3. 调用每个 fn(data, headers)
  });

  return data;
};
