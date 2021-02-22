import React, { Suspense, useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { lazyLoad } from '@/utils'
import { message } from 'antd'

// 基础路由
// lazyLoad 是用 React.lazy(() => import(/* webpackChunkName: "[request]" */`@/pages/${path}`))封装的函数
const Login = lazyLoad('@/pages/login')
const NotFound = lazyLoad('@/pages/404')
const Layout = lazyLoad('@/pages/layout')

// renderRoutes 中包含 Switch 组件
const Router = () => {
  const location = useLocation()
  useEffect(() => {
    // TODO: 监听 location.pathname
    // message.success(`${location.pathname}`)
    console.log('location.pathname :>> ', location.pathname)
  }, [location])
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Switch>
        <Route
          path="/login"
          render={(props) => {
            console.log('login路由')
            return <Login {...props} />
          }}
        />
        <Route
          path="/404"
          render={(props) => {
            console.log('NotFount路由')
            return <NotFound {...props} />
          }}
        />
        <Route component={Layout} />
      </Switch>
    </Suspense>
  )
}

export default Router
