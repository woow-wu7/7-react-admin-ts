/* eslint-disable */

var bind = require('./helpers/bind')

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
// -------------------------------------------------------------------------- isArray函数
function isArray(val) {
  return toString.call(val) === '[object Array]'
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined'
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return (
    val !== null &&
    !isUndefined(val) &&
    val.constructor !== null &&
    !isUndefined(val.constructor) &&
    typeof val.constructor.isBuffer === 'function' &&
    val.constructor.isBuffer(val)
  )
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]'
}

/**
 * Determine if a value is a FormData
 * // 确定值是不是 FormData
 * // determin: 确定
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
// -------------------------------------------------------------------------- isFormData
function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData
  // 如果: 环境支持FormData, 并且val是FormData的实例，就返回 true
  // 否则: 返回false
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val)
  } else {
    result = val && val.buffer && val.buffer instanceof ArrayBuffer
  }
  return result
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string'
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number'
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object'
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
// -------------------------------------------------------------------------- isPlainObject
// isPlainObject(val)
// 用来判断是否是一个纯对象
function isPlainObject(val) {
  // 1. 首先要是一个对象
  if (toString.call(val) !== '[object Object]') {
    return false
  }

  // 2. 当val的的原型对象是null或者Object.prototype时，返回true
  // 3. 即通过 ( Object.create(null)生成的对象 ) 或者通过 ( 对象字面量方式声明的对象 )
  var prototype = Object.getPrototypeOf(val)
  return prototype === null || prototype === Object.prototype
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]'
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]'
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]'
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]'
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe)
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '')
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (
    typeof navigator !== 'undefined' &&
    (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')
  ) {
    return false
  }
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the ( value, index, and complete array ) for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the ( value, key, and complete object ) for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
// -------------------------------------------------------------------------- forEach方法
// forEach
//  - 作用：
//    - 1. 循环遍历 obj，将obj的value,key,obj作为参数传入fn，并调用fn
//    - 2. 只不过这个obj包含数组和对象两种情况
function forEach(obj, fn) {
  // Don't bother if no value provided // bother: 是打扰的意思
  if (obj === null || typeof obj === 'undefined') {
    // 1. obj是 null 或者 undefined 则直接返回
    // 2. 即 obj必须存在
    return
  }

  // Force an array if not already something iterable
  // (1) typeof => number string boolean undefined symbol function object 一共7种数据类型
  //      - 1. 上面排出了 null 和 undefined
  //      - 2. 这里排除了 object 和 array
  //      - 3. 剩下: number string boolean symbol function
  //      - 4. 即: 将上面3剩下的几种类型包装成数组
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj]
  }

  // 到这里还剩: array, object 两种类型
  // 为什么还剩两种类型，因为上面会将其他的类型都包装成数组，即还剩 typeof obj === 'object'的两种类型
  // 1. array
  if (isArray(obj)) {
    // Iterate over array values
    // iterate: 是迭代的意思
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj)
      // 调用 fn(obj[i], i, obj)
      // 其实就是 fn(value, index, 原数组)
    }
    // 2. object
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj)
        // fn(value, key, 原对象)
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
// -------------------------------------------------------------------------- merge
// 合并对象
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {}
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val)
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val)
    } else if (isArray(val)) {
      result[key] = val.slice()
    } else {
      result[key] = val
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue)
    // 遍历每个参数对象，并将每个对象的 assignValue(value, key, arguments[i]) 作为参数传入
  }
  return result
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
// -------------------------------------------------------------------------- extend函数
function extend(a, b, thisArg) {
  // assign: 是分配，指定的意思
  forEach(b, function assignValue(val, key) {
    // 这里的key，val就是参数b对象的key和value
    if (thisArg && typeof val === 'function') {
      // 1. 遍历 b (对象或数组)
      // 2. 如果 b 的某一个属性值是一个function，就绑定this后，复制到 a 上
      // 3. 如果 b 的某一个属性不是function, 直接拷贝到 a 上
      a[key] = bind(val, thisArg)
    } else {
      a[key] = val
    }
  })
  return a
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xfeff) {
    content = content.slice(1)
  }
  return content
}

module.exports = {
  isArray: isArray, // is开头的方法都是判断是不是该类型
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData, // isFormData 判断值是不是 FormData 的实例
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject, // 纯对象 => 是否是纯对象
  isUndefined: isUndefined, // isUndefined => 是否是undefined
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach, // forEach 用于遍历数组和对象，并把 value 传入参数函数执行
  merge: merge, // merge 合并
  extend: extend, // extend 继承
  trim: trim, // trim 修剪，去除字符串两端的空白字符
  stripBOM: stripBOM,
}

/* eslint-disable */
