import React from 'react'
import { useHistory } from 'react-router-dom'

const ReactRouterHooks = () => {
  const history = useHistory()

  const goDetail = () => {
    history.push('/admin-react-router/hooks/77')
  }

  return (
    <div>
      <p>ReactRouterHooks</p>

      <br />
      <button onClick={goDetail}>详情 - 验证useParams</button>
    </div>
  )
}

export default ReactRouterHooks