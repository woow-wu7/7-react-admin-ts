/* eslint-disable */
import React, { useCallback, useMemo, useState } from 'react'

const Father = () => {
  const [count, setCount] = useState(0)
  const [number, setNumber] = useState(1)

  const add = () => {
    setCount(prevCount => prevCount + 1)
  }
  const memoryAdd = useCallback(add, [])

  const obj = { age: 20 }
  const memoryObj = useMemo(() => obj, [])

  return (
    <div style={{ background: '#fff', padding: '12px 0' }}>
      <p style={{
        margin: '10px', padding: '14px 24px', background: '#edfffb',
        border: '1px solid #00b792', display: 'inline-block',
      }}>
        useCallback useMemo React.memo做性能优化
      </p>
      <div style={{ margin: '10px', padding: '4px' }}>
        <button onClick={() => setNumber(number => number + 1)}>点击 - 改变number</button>
      </div>
      <Child />
      <NotMemoryFnChild count={count} add={add} />
      <MemoryFnChild count={count} memoryAdd={memoryAdd} />
      <NotMemoryObjChild obj={obj} />
      <MemoryObjChild memoryObj={memoryObj} />
    </div>
  )
}

const Child = () => {
  return (
    <div style={{ margin: '10px', border: '1px solid red', padding: '4px', fontSize: '13px' }}>
      <div>纯函数组件 - 父组件重新渲染，该子组件就会重新渲染</div>
      <div>{Math.random()}</div>
    </div>
  )
}

const NotMemoryFnChild = React.memo<{ count: number, add: () => void }>(({ count, add }) => {
  return (
    <div style={{ margin: '10px', border: '1px solid red', padding: '10px', fontSize: '13px' }}>
      <div>不用 ( useCallback ) 只用React.memo做对props浅比较，props中有函数时，每次钱比较的结果都是变化，子组件会重新渲染</div>
      <div>{Math.random()}</div>
    </div>
  )
})

const MemoryFnChild = React.memo<{ count: number, memoryAdd: () => void }>(({ count, memoryAdd }) => {
  return (
    <div style={{
      margin: '10px', border: '1px solid red', padding: '10px',
      background: 'yellow', fontSize: '13px'
    }}>
      <div>用 useCallback() 缓存子组件的props中的函数，并用React.memo做浅比较，props没变，子组件不重新渲染</div>
      <div>{Math.random()}</div>
    </div>
  )
})

const NotMemoryObjChild = React.memo<{ obj: { age: number } }>(({ obj }) => {
  return (
    <div style={{ margin: '10px', border: '1px solid red', padding: '10px', fontSize: '13px' }}>
      <div>不用 useMemo() 缓存 props中的对象属性，即使在React.Memo() 做浅比较，因为有对象props，每次都是一个新对象，导致浅比较的结果是props变化，子组件更新</div>
      <div>{Math.random()}</div>
    </div>
  )
})

const MemoryObjChild = React.memo<{ memoryObj: { age: number } }>(({ memoryObj }) => {
  console.log(memoryObj, 'memoryObj');
  return (
    <div style={{ margin: '10px', border: '1px solid red', padding: '10px', background: 'yellow', fontSize: '13px' }}>
      <div>用 useMemo() 缓存 props中的对象属性，在React.Memo() 做浅比较，因为对象props做了缓存，props做浅比较时没有变化，子组件不更新</div>
      <div>{Math.random()}</div>
    </div>
  )
})

export default Father

/* eslint-disable */