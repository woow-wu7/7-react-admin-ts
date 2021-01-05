

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
  // !!相当于将数据转成布尔值类型
  // value存在 并且 value._CANCEL__ 存在就返回true
};
