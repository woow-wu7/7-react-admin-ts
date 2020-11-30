import React, { useEffect, useState } from 'react'
import { useDebounce } from '@/utils/hooks/use-debounce'

const UseDebounce = () => {
  const [count, setCount] = useState(0)
  const doSomething = () => {
    console.log('debounce');
  }

  useEffect(() => {
    setInterval(() => {
      setCount(v => v + 1)
    }, 1000)
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
      <br/>
      <p>useDebounce</p><br/>
      <div> {count}</div><br/>
      <button onClick={useDebounce(doSomething, 1000, false)}>
        点击测试 - debounce 函数 看console
      </button>
    </div>
  )
}

export default UseDebounce
