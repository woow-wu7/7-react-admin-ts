import React, { Suspense } from 'react'
import { renderRoutes } from '@/utils/render-routes/index'
import routes from '@/router/routes'
import { Route } from 'react-router-dom'
import JsEs6Detail from '@/pages/admin-system/js-es6-detail'

// renderRoutes 中包含 Switch 组件
const Router = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      {renderRoutes(routes)}
    </Suspense>

  )
}

export default Router