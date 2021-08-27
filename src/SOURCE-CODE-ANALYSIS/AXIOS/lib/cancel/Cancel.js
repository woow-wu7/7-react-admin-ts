/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
// -------------------------------------------------------------------------- Cancel构造函数
// Cancel
// - 实例属性 message
// - 原型属性 toString 和 __CANCEL__
function Cancel(message) {
  this.message = message
}

// -------------------------------------------------------------------------- toString
Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '')
}

Cancel.prototype.__CANCEL__ = true // 标志位 ( __CANCEL__ ) 默认值是true

module.exports = Cancel
