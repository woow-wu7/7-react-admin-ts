import React, { useState, useEffect } from 'react'

type TAdd<T> = (a: T, b: T, c: T, d: T) => T
interface IAdd<T> {
  (a: T, b: T, c: T, d: T): T
}
const Curry = () => {
  const [links] = useState([
    {
      name: 'curry函数柯里化 - 我的掘金博客',
      url: 'https://juejin.cn/post/6844904052879261710#heading-5'
    },
  ])

  // 柯里化阶段一
  useEffect(() => {
    const add: TAdd<number> = (a, b, c, d) => {
      return a + b + c + d
    }
    const add2: IAdd<number> = (a, b, c, d) => {
      return a + b + c + d
    }
    console.log('add(1, 2, 3, 4)', add(1, 2, 3, 4))
    console.log('add2(1, 2, 3, 4)', add2(1, 2, 3, 4))

    const curryAdd = (a: number) => {
      return function (b: number) {
        return function (c: number) {
          return function (d: number) {
            return a + b + c + d
          }
        }
      }
    }
    console.log('curryAdd(1)(2)(3)(4)', curryAdd(1)(2)(3)(4))
  }, [])


  // 柯里化阶段二
  useEffect(() => {
    function curry() {
      let totalParams: number[] = []
      function closure(...rest: number[]): any {
        if (rest.length) {
          totalParams = [...totalParams, ...rest]
          return closure
        }
        return totalParams.reduce((total: number, current: number) => total + current)
      }
      return closure
    }
    const curryAdd = curry()
    const res = curryAdd(1)(2)(3, 4)()
    console.log('curry-res00000:>>', res) // 10
  }, [])


  // 柯里化阶段三
  useEffect(() => {
    function add(a: number, b: number, c: number, d: number, e: number) {
      return a + b + c + d + e
    }
    function curry(fn: (...args: number[]) => number): any {
      let totalParams: number[] = []
      function closure(...rest: number[]): any {
        totalParams = [...totalParams, ...rest] // 先收集参数，收集完，在拿最新的进行判断
        if (totalParams.length >= fn.length) {
          return fn(...totalParams)
        } else {
          return closure
        }
      }
      return closure
    }

    const curryAdd = curry(add)
    const res = curryAdd(1, 2)(3)(4, 5, 6)
    console.log('curry-res11111:>> ', res);
  }, [])

  // 柯里化阶段四
  useEffect(() => {
    function add(a: number, b: number, c: number, d: number, e: number) {
      return a + b + c + d + e
    }

    function curry(fn: (...args: number[]) => number): any { // 闭包，只负责收集参数
      let totalParams: number[] = []
      function closure(...rest: number[]): any {
        totalParams = [...totalParams, ...rest]
        return closure
      }
      closure.getSum = () => { // 在闭包上单独绑定add函数，调用该函数实现相加并返回
        return fn(...totalParams)
      }
      return closure
    }
    const curryAdd = curry(add)
    const closure = curryAdd(1, 2)(3)(4, 5, 6)
    const res = closure.getSum()
    console.log('curry-res2222:>> ', res);
  }, [])


  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)
  return (
    <div className="curry">
      <p>curry 函数柯里化</p><br />

      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default Curry