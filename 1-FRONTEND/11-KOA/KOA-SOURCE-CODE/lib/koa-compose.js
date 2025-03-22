
'use strict'

/**
 * Expose compositor.
 */

module.exports = compose

/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */
// ------------------------------------------------------------------------------------------------------------------- compose
// compose
// - 参数
//    - 中间价组成的数组，每个中间件必须是函数
// - 返回值
//    - 返回一个函数，该返回函数的参数是 context 和 next
function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!') // 参数必须是数组
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!') // 每个中间件必须由函数组成
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)

    function dispatch (i) { // 调用时：dispatch(0)

      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      // i <= index 证明next()方法被多次调用
      // dispatch(0)时得出: ( 0<=-1不成立 )

      index = i
      // index = i = 0

      let fn = middleware[i]
      // 第一个中间件函数

      if (i === middleware.length) fn = next
      // 当为最后一个中间件时，继续执行 dispatch() --> fn=next=undefined --> return Promise.resolve()，
      // - next不存在，return Promise.resolve()
      // - next存在，则执行next(context, dispatch.bind(null, i+1))


      // fn不存在
      if (!fn) return Promise.resolve()

      // fn存在
      // 则继续往下执行
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
        // 返回Promise成功的结果 -> 即执行中间件，中间件返回值作为promise成功状态的结果值
        // 1
        // 中间件函数的结构
        // app.use(async (ctx, next) => { ... })
        // async (ctx, next) => {...}
        // 2
        // fn(context, dispatch.bind(null, i + 1)) ---> next() 其实就是这里的 dispatch() 函数 ---> i+1就是下一个中间件
        // 比如: 有三个中间件ABC，即三个app.use(fn(ctx, next)) 的回调，当A中调用 next() 其实就是调用 dispatch()，而dispatch就是执行下一个中间件

        // 2022.04.11 添加一个问题
        // 问题：到底是什么是中间件中的next
        // 回答：
        // - 1. 中间件 app.use(async (ctx, next) => { ... })
        // - 2. next 就是上面的 dispatch 函数
        // - 3. 而 dispatch 又会去执行下一个中间件，不断重复，直到最后一个中间件
        // - 4. 还要注意 next() 调用的时机，如果next() 后面还有代码，在next()执行完后，还会回来继续执行

        // 2023.03.01
        // 最终形态
        // const [fn1, fn2, fn3] = this.middleware()
        // const fnMiddleware = function(context, next) {
        //   return Promise.resolve(fn1(context, function next1() {
        //     return Promise.resolve(fn2(context, function next2() { // 每个中间件，如果存在next就return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))，不存在就 return Promise.resolve()
        //       return Promise.resolve(fn3(context, function next3() { // 最后一个中间件没有next函数了，因为已经是最后一个
        //         return Promise.resolve()
        //       }))
        //     }))
        //   }))
        // }
      } catch (err) {
        return Promise.reject(err)
      }

    }
  }
}
