import React from 'react'
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom'
import { setLocalStorage } from '@/utils'
import './detail.scss'

const ReactRouterHooksDetail = () => {
  const history = useHistory()
  const location = useLocation()
  const params = useParams()
  const MatchObj = useRouteMatch({
    path: '/admin-react-router/hooks/:id'
  })

  // 注意：( 重要 ) 每一个 detail 都要记得用 useParams 存入 localStorage
  setLocalStorage('routeParams', params)

  console.log('history :>> ', history);
  console.log('location :>> ', location);
  console.log('params :>> ', params);
  console.table(MatchObj);

  const renderUseRouteMatch = (params: any) => {
    return params
      ? Object.keys(params).map((item: any, index: number) => {
        console.log('item :>> ', item);
        // if (Object.prototype.toString.call(params[item]).includes('Object')) {
        //   console.log('55555555555 ', item);
        //   return renderUseRouteMatch(DeepCloneParams[item])
        // }
        if (Object.prototype.toString.call(params[item]).includes('Object')) {
         return Object.keys(params[item]).map((item2, index2) => {
          return <div key={index2 + +new Date()}>
            <p>{item}</p>
            <br/>
            <span>---</span> <span>{item2} : {params[item][item2]}</span>
          </div>
          })
        }
        return <div key={index + +new Date()}>{item} : {`${params[item]}`}</div>
      })
      : null
  }

  return (
    <div className="react-router-hooks-detail">
      <div>ReactRouterHooks - detail</div>

      <div>useHistory</div>
      <div>useLocation</div>
      <div>
        <p>useParams</p>

        <br />
        <div>useParams：用来获取动态Route中的动态参数对象</div>
        <div>{`Route: {path:  'root/detail/:id'}`}</div>
        <div>{`page:  history.push('root/detail/444')`}</div>
        <div>{`useParams:  {id: 444}`}</div>
      </div>

      <div>
        <p>useRouteMatch</p>
        <div>useRouteMatch：返回匹配后的Route中的match对象</div>
        <div>{renderUseRouteMatch(MatchObj)}</div>
        <br />
        <a href="https://reactrouter.com/web/api/Hooks/useroutematch" target="__blank">官网说明</a>
      </div>

      <br />
      <button onClick={history.goBack}>返回</button>
    </div>
  )
}

export default ReactRouterHooksDetail