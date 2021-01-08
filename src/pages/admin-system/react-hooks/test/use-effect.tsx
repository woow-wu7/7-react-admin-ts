import React, { useState, useEffect } from 'react'
import { Button } from 'antd'

const UseState = () => {
  const [show, setShow] = useState(true)
  const switchComponent = () => {
    setShow((v) => !v)
  }
  return (
    <div className="use-effect">
      <p>useEffect</p>
      <a href="https://juejin.cn/post/6844904127110053895">useEffect资料</a>

      <Button onClick={switchComponent}>点击加载和卸载子组件，用来测试useEffect的CleanUp函数，卸载时执行最后一次Effect的Cleanup函数，或者依赖数组为空时的第一次的useEffect的Cleanup清除函数</Button>
      {
        show ?  <Child /> : null
      }
    </div>
  )
}

const Child = () => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    return () => {
      console.log('useEffect Cleanup函数执行了，第一次不会执行Cleanup函数，第二次执行上一次得useEffect得cleanup清除函数，组件卸载清除最后一次得Cleanup清除函数')
    }
  })
  const add = () => {
    setCount(v => v+1)
  }

  return (
    <div style={{background: '#fdf2ff', padding: '10px', margin: '10px 0'}}>
      <p>子组件</p><br/>
      <div>count: {count}</div><br/>
      <Button onClick={add}>点击，增加count，测试useEffect的Cleanup函数，执行时机</Button>
    </div>
  )
}


export default UseState
