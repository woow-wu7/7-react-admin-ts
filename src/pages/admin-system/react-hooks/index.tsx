import React, { useState } from 'react'
import { Button, Layout } from 'antd'
import styled from 'styled-components'


interface ITitle {
  borderColor?: string;
  backgroundColor?: string;
  [propName: string]: any;
}

const ReactComponnet = (props: any) => {
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
    <ReactHooks>
      <UseStateCopmonnet>
        <Title borderColor="#67ce00" backgroundColor="#F6FFED">useState</Title>
        <br /><p>{count}</p><br />
        <Button onClick={add}>Add</Button> &nbsp;
        <Button onClick={delayConsole}>延时console</Button>  &nbsp;
        <Button onClick={clear}>清零</Button><br />

        <Phenomenon>现象：点击add5次后，点击console，再点击add两次，显示5，而不是7，每次延时console.log显示的是，那一次的count值，每次渲染都是独立分开的</Phenomenon>
      </UseStateCopmonnet>

      <LinkOther>
        <Title borderColor="#ff533d" backgroundColor="#FFF2F0">资料</Title>
        <div>
          <a href="https://juejin.im/post/6844904132164190221">useState资料</a>
        </div>
      </LinkOther>
    </ReactHooks>
  )
}

const ReactHooks = styled.div`
  `;

const UseStateCopmonnet = styled.div`
    background: #fff;
    padding: 10px;
  `

const Phenomenon = styled.div`
    padding: 10px 0;
    font-size: 12px;
    line-height: 18px;
    padding-top: 20px;
  `

const Title = styled.div`
    display: inline-block;
    padding: 10px 30px;
    margin-bottom: 30px;
    background: ${(props: ITitle) => props.backgroundColor};
    border: 1px solid ${(props: ITitle) => props.borderColor};
  }
  `

const LinkOther = styled(UseStateCopmonnet)`
  margin-top: 10px;
`


export default ReactComponnet
