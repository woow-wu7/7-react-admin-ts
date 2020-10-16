import React, { Suspense } from 'react'
import { renderRoutes } from '@/utils/render-routes/index'
import routes from '@/router/routes'

// renderRoutes 中包含 Switch 组件
const Router = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      {renderRoutes(routes)}
    </Suspense>
  )
}

export default Router