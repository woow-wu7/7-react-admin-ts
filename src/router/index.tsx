import React, { Component } from 'react'
import { Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from '../router/routes'



const Router = () => {
  return (
    <Switch>
      {renderRoutes(routes)}
    </Switch>
  )
}

export default Router