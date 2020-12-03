import React, { useState } from 'react'
import { Button } from 'antd'
import styled from 'styled-components'

interface ITitle {
  borderColor?: string;
  backgroundColor?: string;
  [propName: string]: any;
}

const UseState = () => {
  const [count, setCount] = useState(0)

  const add = () => {
    setCount(count + 1)
  }

  const delayConsole = () => {
    setTimeout(() => {
      console.log(count);
    }, 4000)
  }

  const clear = () => {
    setCount(0)
  }
  return (
    <div className="use-state">
      <p>useState</p>
      <a href="https://juejin.im/post/6844904132164190221">useState资料</a>
      <h2>{count}</h2><br />
      <Button onClick={add}>Add</Button> &nbsp;
      <Button onClick={delayConsole}>延时console</Button>  &nbsp;
      <Button onClick={clear}>清零</Button><br />
      <h1>现象：点击add5次后，点击console，再点击add两次，显示5，而不是7，每次延时console.log显示的是，那一次的count值，每次渲染都是独立分开的</h1>

      <LinkOther>
        {/* <Title borderColor="#ff533d" backgroundColor="#FFF2F0">资料</Title> */}
        <div>
        </div>
      </LinkOther>
    </div>
  )
}

const UseStateCopmonnet = styled.div`
    background: #fff;
    margin: 10px 0;
  `

const LinkOther = styled(UseStateCopmonnet)`
  margin-top: 10px;
`

export default UseState
