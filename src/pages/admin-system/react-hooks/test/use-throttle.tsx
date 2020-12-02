import React, { useEffect, useState, useRef } from 'react'
import { useThrottle } from '@/utils/hooks/use-throttle'

const UseThrottle = () => {
  const [count, setCount] = useState(0)
  const refCount = useRef(0)

  useEffect(() => {
    refCount.current = window.setInterval(() => setCount(count => count + 1), 1000)
    return () => window.clearInterval(refCount.current)
  }, [])

  const doSomething = () => {
    console.log('throttle');
  }

  return (
    <div style={{
      background: '#fff',
      margin: '10px 0',
      padding: '10px',
      border: '1px solid black'
    }}>
      <p style={{
        margin: '10px 0', padding: '14px 24px', background: '#fdf2ff',
        border: '1px solid #e821ff', display: 'inline-block',
      }}>useThrottle</p>

      <br />
      <br />
      <div>{count}</div>
      <br />
      <br />
      <button onClick={useThrottle(doSomething, 1000)}>
        点击测试 - throttle 函数 看console
      </button>
    </div>
  )
}

export default UseThrottle
