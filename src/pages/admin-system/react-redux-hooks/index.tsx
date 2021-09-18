import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import actionType from './constant'
import './react-redux-hooks.scss'

const equalityFn = (prevState: any, nextState: any) => {
  console.log(prevState?.reactReduxState?.number, 'prevState')
  console.log(nextState?.reactReduxState?.number, 'nextState')
  return false
}

const ReactReduxHooks = () => {
  const dispatch = useDispatch()
  const number = useSelector((state: any) => state.reactReduxState.number, equalityFn) || 0

  const addNumber = () => {
    dispatch({
      type: actionType.ADD_NUMBER,
    })
  }

  const asyncFn = (params: any) => (dispatchFn: any) => {
    try {
      setTimeout(() => {
        dispatchFn({
          type: 'ADD_NUMBER',
          payload: params,
        })
      }, params)
    } catch (err) {
      console.log(err)
    }
  }
  const thunk = () => dispatch(asyncFn(2000))

  console.log(number, 'number')
  return (
    <div className="react-redux-hooks">
      <p>react-redux-hooks</p>
      <div style={{ margin: '20px 0', border: '1px solid #1890FF', padding: '0 10px' }}>
        <br />
        <a
          href="https://github.com/woow-wu7/7-react-admin-ts/tree/master/src/pages/admin-system/react-redux-hooks"
          target="__blank"
        >
          react-redux-hooks -- README.md
        </a>
        <br />
        <br />
        <a href="https://react-redux.js.org/introduction/quick-start" target="__blacnk">
          react-redux官网
        </a>
        <br />
        <br />
      </div>

      <div>
        <div>{number}</div>
        <br />
        <button onClick={addNumber}>点击add，验证react-redux中的useSelector的第二个参数equalityFn返回的布尔值</button>
        <br />
        <button onClick={thunk}>点击，验证redux-thunk</button>
      </div>
    </div>
  )
}

export default ReactReduxHooks
