import React, { useState, useEffect } from 'react'

const consoleLog = (v: number) => {
  console.log(`%c${v}`, 'color:olive;')
}
const PromiseLearn = () => {
  const [links] = useState([
    {
      name: 'Promise面试题 - 我的语雀',
      url: 'https://www.yuque.com/woowwu/msyqpd/ypfh8g'
    },
  ])
  useEffect(() => {
    consoleLog(1)
    // A promise
    new Promise((resolve: any) => {
      consoleLog(2)
      resolve()
      consoleLog(3)
    }).then(() => { // E then
      consoleLog(4)
      // C 定时器
      setTimeout(() => consoleLog(5))
    })
    consoleLog(6)
    // B 定时器
    setTimeout(() => {
      consoleLog(7)
      // D promise
      new Promise((resolve: any) => {
        consoleLog(8)
        resolve()
      }).then(() => consoleLog(9)) // F then
    })
    consoleLog(10)
    /**
     * 第一轮 Event loop
     * 1 => 同步任务，进入函数调用栈，立即执行
     * A => A的回调立即执行
     *      2 => 同步任务，立即执行
     *      E => 微任务，进入微任务队列
     *      3 => 同步任务，立即执行
     * 6 => 同步任务，立即执行
     * B => 宏任务，B的回调进入宏任务队列
     * 10 => 同步任务，立即执行
     * 此时执行情况如下：
     * 输出：1，2，3，6，10
     * 微任务：[E]
     * 宏任务：[B]
     *
     * 第二轮 Event loop
     * 清空微任务队列，取出宏任务队列的第一个成员
     * E => 4 同步任务，立即执行
     *      C 宏任务，进入宏任务队列，此时的宏任务队列 [B, C]
     * B => 7 同步任务，立即执行
     *      D promise的回调立即执行
     *        => 8 同步任务，立即执行
     *        => F 微任务，进入微任务队列，此时的微任务队列 [F]
     * 此时执行情况如下：
     * 输出：4，7，8
     * 微任务：[F]
     * 宏任务：[C]
     *
     * 第三轮 Event loop
     * 清空微任务队列，取出宏任务队列的第一个成员
     * F => 9 同步任务，立即执行
     * C => 5 同步任务，立即执行
     *
     * 总的输出顺序：1，2，3，6，10，4，7，8，9，5
     */
  }, [])
  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)
  return (
    <div className="promise-learn">
      <p>Promise</p>

      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default PromiseLearn
