import React, { useImperativeHandle, useRef } from 'react'

type TFocus = {
  focus: () => void;
  blur: () => void;
}

const UseImperativeHandle = () => {
  const refChild = useRef<TFocus>(null)
  const getChild = () => {
    if (refChild.current) {
      refChild.current.focus()
    }
  }
  const getChildBlur = () => {
    if (refChild.current) {
      refChild.current.blur()
    }
  }
  return (
    <div style={{
      background: '#ffe0e0',
      margin: '10px 0',
      padding: '10px',
      border: '1px solid black'
    }}>
      <p style={{
        margin: '10px 0', padding: '14px 24px', background: '#ffffdd',
        border: '1px solid #e8b900', display: 'inline-block',
      }}>useImperativeHandle</p>

      <div style={{ padding: '10px', background: '#e0e6ff' }}>
        <p>father组件</p><br />
        <div> ( useImperativeHandle ) 应与 ( React.forwardRef ), ( useRef ) 一起使用</div><br />
        <button onClick={getChild}>点击：获取子组件的的focus方法</button> &nbsp;&nbsp;
        <button onClick={getChildBlur}>点击：获取子组件的的blur方法</button><br />
        <Child ref={refChild} />
      </div>
    </div>
  )
}

const Child = React.forwardRef((props, ref) => {
  const refInput = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, () => ({
    focus: () => { refInput?.current?.focus?.() },
    blur: () => { refInput?.current?.blur?.() }
  }))
  return (
    <div style={{ padding: '10px 0px', background: '#fde0ff', margin: '10px 0' }}>
      <p style={{ marginBottom: '4px' }}>child组件</p>
      <input type="text" ref={refInput} />
    </div>
  )
})

export default UseImperativeHandle
