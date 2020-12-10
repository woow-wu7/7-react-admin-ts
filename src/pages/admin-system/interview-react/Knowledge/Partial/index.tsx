import React, { useState, useEffect } from 'react'

const Partial = () => {
  useEffect(() => {
    function add(a: number, b: number, c: number, d: number): number {
      return a + b + c + d
    }
    function partial(...rest: any[]): any {
      const add = rest.shift() // shift，删除数组第一个成员，返回该成员，改变原数组
      return add.bind(null, ...rest) // bind函数，绑定上下文，返回一个新函数，接受add的部分或者全部参数
    }
    const bindResFn = partial(add, 1, 2)
    const res = bindResFn(3, 4) // bind返回的新函数，继续接受剩余参数
    console.log('resPartial :>> ', res);
  }, [])

  useEffect(() => {
    function add(a: number, b: number, c: number, d: number): number {
      return a + b + c + d
    }
    function partial(...rest: any[]) {
      const add = rest.shift()
      let paramsFixed: number[] = [...rest]
      function closure(...rest: number[]) {
        paramsFixed = [...paramsFixed, ...rest]
        if (paramsFixed.length < add.length) {
          return closure
        }
        return add(...paramsFixed)
      }
      return closure
    }
    const closure = partial(add, 1, 2)
    const res = closure(3, 4)
    console.log('resPratial5 :>> ', res);
  }, [])

  useEffect(() => {
    function add(a: number, b: number, c: number, d: number): number {
      return a + b + c + d
    }

    function memorizeCreator(fn: (...params: any[]) => any) {
      const cacheMap = {}
      function closure(...rest: any[]) {
        const key = JSON.stringify(rest) // 一次参数可能有多个，转成字符串作为key
        if (!cacheMap.hasOwnProperty(key)) {
          cacheMap[key] = fn(...rest) // key不存在，添加映射
          console.log('执行了');
        }
        return cacheMap[key] // 返回结果
      }
      return closure
    }
    const memorize = memorizeCreator(add)
    const res1 = memorize(1, 2, 3, 4)
    const res2 = memorize(1, 2, 3, 4) // 调用两次，'执行了字符串只打印了一次'
    console.log(res1, res2);
  }, [])


  const [links] = useState([
    {
      name: 'partial偏函数 和 memorize函数记忆- 我的掘金博客',
      url: 'https://juejin.cn/post/6844904052879261710#heading-8'
    },
    {
      name: 'compose函数组合 - 我的掘金博客',
      url: 'https://juejin.cn/post/6844904137952329742#heading-10'
    },
  ])

  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)
  return (
    <div className="partial">
      <p>partial偏函数 </p><br />
      <p>memorize函数记忆</p><br/>
      <p>compose函数组合</p><br/>
      <p>recursive尾递归和尾调用</p><br/>

      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default Partial