import React, { useEffect, useState, useRef } from 'react'
import { useDebounce } from '@/utils/hooks/use-debounce'

const UseDebounce = () => {
  const [count, setCount] = useState(0)
  const refInterval = useRef(0)
  const doSomething = () => {
    console.log('debounce');
  }

  useEffect(() => {
    refInterval.current = window.setInterval(() => {
      setCount(v => v + 1)
    }, 1000)
    return () => window.clearInterval(refInterval.current)
  }, [])

  return (
    <div
      style={{
        background: '#fff',
        margin: '10px 0',
        padding: '10px',
        border: '1px solid black'
      }}
    >
      <br />
      <p style={{
        margin: '10px', padding: '14px 24px', background: '#b5e6ff',
        border: '1px solid #0989f9', display: 'inline-block',
      }}>useDebounce</p><br />
      <div> {count}</div><br /><br />
      <button onClick={useDebounce(doSomething, 1000, false)}>
        点击测试 - debounce 函数 看console
      </button>
    </div>
  )
}

export default UseDebounce
