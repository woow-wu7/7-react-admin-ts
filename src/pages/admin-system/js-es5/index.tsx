import { Button } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom'


const JsEs5 = (props: any) => {
  const history = useHistory()
  const goDetail = () => {
    history.push({pathname: '/admin-js/es5/go'})
  }

  return (
    <div>
      <header>JsEs6 page  admin</header>
      <Button onClick={() => goDetail()}>去 ES5 详情</Button>
    </div>
  )
}

export default JsEs5
