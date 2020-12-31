import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actionType from '../../constant'

/**
 *  @function redux-thunk
    function createThunkMiddleware(extraArgument) {
        return ({ dispatch, getState }) => (next) => (action) => {
          if (typeof action === 'function') {
            return action(dispatch, getState, extraArgument);
          }
          return next(action);
        };
      }
      const thunk = createThunkMiddleware();
      thunk.withExtraArgument = createThunkMiddleware;
      export default thunk;
 * 
 */
const ReduxSourceCode = () => {
  const dispatch = useDispatch()
  const count = useSelector((state: { interview: { interviewCount: number } }) => state.interview.interviewCount)
  const [links] = useState([
    {
      name: 'redux和react-redux源码 - 我的掘金博客',
      url: 'https://juejin.cn/post/6844904137952329742'
    },
    {
      name: 'redux-thunk - 源码',
      url: 'https://github.com/reduxjs/redux-thunk'
    },
  ])
  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)

  const handleThunk = (dispatch: any, getState: any) => {
    console.log('从store中获取的getState :>> ', getState);
    setTimeout(() => {
      dispatch({
        type: actionType.ADD_INTERVIEW,
        payload: 1
      })
    }, 2000)
  }
  const add = () => {
    dispatch(handleThunk) // 使用redux-thunk可以直接dispatch一个 ( 函数 )
  }
  const decCommon = () => {
    dispatch({
      type: actionType.DEC_INTERVIEW,
      payload: 1
    })
  }
  return (
    <div className="redux">
      <p>redux 和 react-redux 源码</p><br />

      <div style={{background: 'yellow', padding: '10px'}}>
        <div>interviewCount: {count}</div><br />
        <button onClick={add}>(+1) 验证redux-thunk如何使用 - 可以直接dispatch一个函数</button><br /><br/>
        <button onClick={decCommon}>(-1) 普通的dispatch一个action</button><br/><br/>
      </div>
      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default ReduxSourceCode