import React, { Suspense } from 'react'
import { Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from '../router/routes'



const Router = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Switch>
        {renderRoutes(routes)}
      </Switch>
    </Suspense>

  )
}

export default Router