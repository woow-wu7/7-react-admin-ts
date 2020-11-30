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
      <button onClick={goDetail}>详情分析页 - 验证useParams，useRouteMatch</button>

      <br/>
      <br/>
      <a href="https://reactrouter.com/web/guides/quick-start">官网链接</a>
    </div>
  )
}

export default ReactRouterHooks