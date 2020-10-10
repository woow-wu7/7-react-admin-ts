import { setLocalStorage } from '@/utils'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import actionType from '../../../app.constant'

let runOneTime = true

const JsEs5Detail = (props: any) => {
  const params = useParams()
  const dispatch = useDispatch()
  setLocalStorage('routeParams', params)
  const state = useSelector(state => state)
  console.log(state);
  
  if (runOneTime) {
    dispatch({
      type: actionType.GET_ROUTE_PARAMS,
      payload: params
    })
    runOneTime = false
  }
  return (
    <div>
      <header>JsEs6Detail page  admin</header>
    </div>
  )
}

export default JsEs5Detail
