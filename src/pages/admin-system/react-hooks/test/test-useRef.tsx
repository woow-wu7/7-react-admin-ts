import React, { useRef, useState, useEffect, useImperativeHandle } from 'react'

const Father = () => {
  const [count, setCount] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const childRef = useRef<any>(null)
  const countRef = useRef<number | null>(null)

  useEffect(() => {
    countRef.current = count
    // 每次渲染后，都更新ref.current
  })

  const getFocus = () => {
    inputRef.current && inputRef.current.focus()
    console.log('useRef绑定DOM节点');
  }

  const add = () => {
    setCount(prevCount => prevCount + 1)
    console.log(count, 'setState后，立即打印state的值，是上一次的state值，因为此时回调并没有执行，如果要拿到的话，可以使用setTimeout宏任务+sueRef实现，在更新后打印')
    setTimeout(() => {
      console.log(countRef.current, '这是在setState后利用 ( setTimeout+useRef ) 获取的最新的state的值')
    }, 1000)
    setTimeout(() => {
      console.log(count, '注意：如果直接在setState后，利用setTimeout中打印state，任然不是更新后的state，因为state保存的是快照')
    }, 1000)
  }
  const delayConsole = () => {
    setTimeout(() => {
      console.log('不用useRef延时打印cout，是打印的快照count，即打印的是当时add得到的count，而不是现在add得到的count :>> ', count);
    }, 3000)
  }


  const delayConsoleUseRef = () => {
    setTimeout(() => {
      console.log('用useRef保存count的值，每次渲染后更新ref.current，延时打印的不是快照，而是本次渲染的count :>> ', countRef.current);
    }, 3000)
  }

  const getChildMehod = () => {
    childRef.current && childRef.current.getMessage() // 调用子组件传递的方法
  }

  return (
    <div style={{ background: '#fff', margin: '10px 0', padding: '10px', border: '1px solid black' }}>
      <p>父组件</p>
      <p style={{
        margin: '10px', padding: '14px 24px', background: '#e8eaff',
        border: '1px solid #345bf9', display: 'inline-block',
      }}> useRef </p>

      <div>
        <input type="text" ref={inputRef} />
        <button onClick={getFocus}>获取焦点</button>
      </div>

      <br />

      <div style={{ background: '#bcffb7', padding: '10px', margin: '10px 0' }}>
        <p>count: {count}</p>
        <button onClick={add}>add</button> &nbsp;
        <button onClick={delayConsole}>不用useRef时，延时打印count</button> &nbsp;
        <button onClick={delayConsoleUseRef}>用useRef保存count的值，延时打印count</button>
      </div>

      <br />
      <button onClick={getChildMehod}>useRef+useImperativeHandle实现父组件调用子组件的方法</button>
      <Child ref={childRef} />
    </div>
  )
}

const Child = React.forwardRef((props: any, ref: any) => { // react.ForwardRef() 获取父组件传递的ref作为子组件props
  useImperativeHandle(ref, () => ({ // useImperativeHandle() 设置允许子组件暴露给父组件的方法
    getMessage: () => {
      console.log('打印子组件方法的内容');
    }
  }))

  return (
    <div style={{ margin: '10px', border: '1px solid red', padding: '4px' }}>
      <p>子组件</p>
    </div>
  )
})

export default Father