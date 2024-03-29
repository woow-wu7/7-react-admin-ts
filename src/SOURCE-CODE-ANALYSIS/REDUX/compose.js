/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
// ------------------------------------------------------------------------- compose函数
export default function compose(...funcs) {
  // 没传参数，就返回一个函数，这个函数直接将参数返回
  if (funcs.length === 0) {
    return arg => arg
  }

  // 参数个数为1，直接返回该参数的调用结果
  if (funcs.length === 1) {
    return funcs[0]
  }

  // 多个参数
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
  // 1
  // [a, b, c] => a(b(c(...args)))
  //  - 右边函数调用的结果作为左边函数的参数，迭代进行
  // 2
  // 最终返回什么？：funcs.reduce((a, b) => (...args) => a(b(...args))) 最终返回的是什么？
  // 最终返回：是一个函数，函数签名是 (...args) => f(g(h(...args))).
  // 3
  // 调用：dispatch = compose(...chain)(store.dispatch)
  // 等价于：dispatch = (store.dispatch) => f(g(h(store.dispatch)))
}
