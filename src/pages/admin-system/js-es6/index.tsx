import actionType from '@/app.constant'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'


const JsEs6 = (props: any) => {
  const history = useHistory()
  return (
    <div>
      <header>JsEs6 page  admin</header>
      <button onClick={() => history.push({pathname: '/admin-js/es6/go'})}>去详情</button>
    </div>
  )
}

export default JsEs6
