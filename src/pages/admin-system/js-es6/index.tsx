import { Button } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom'


const JsEs6 = (props: any) => {
  const history = useHistory()
  return (
    <div>
      <header>JsEs6 page  admin</header>
      <Button onClick={() => history.push({pathname: '/admin-js/es6/go'})}>去 ES6 详情</Button>
    </div>
  )
}

export default JsEs6
