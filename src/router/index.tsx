import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { lazyLoad } from '@/utils'


// 基础路由
const Login = lazyLoad('@/pages/login')
const NotFound = lazyLoad('@/pages/404')
const Layout = lazyLoad('@/pages/layout')

// renderRoutes 中包含 Switch 组件
const Router = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/404' component={NotFound} />
        <Route component={Layout} />
      </Switch>
    </Suspense>
  )
}

export default Router