/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
// -------------------------------------------------------------------------- Cancel构造函数
function Cancel(message) {
  this.message = message
}

// -------------------------------------------------------------------------- toString
Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '')
}

Cancel.prototype.__CANCEL__ = true // __CANCEL__ 默认值是true

module.exports = Cancel
