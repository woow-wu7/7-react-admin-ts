import React from 'react'
import { IRouteModule } from '@/global/interface'
import { Switch, Route } from 'react-router-dom'

const renderRoutes = (routes?: IRouteModule[], extraProps = {}, switchProps = {}) => {
  function iterateRoutes(routes: IRouteModule[]): any {
    return routes.map((route, index) => {
      return (
        [<Route
          key={`${index + +new Date()}`}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={props => {
            return route.render
              ? route.render({ ...props, ...extraProps, route: route })
              : <route.component {...props} {...extraProps} route={route} />
          }} />, 
          route.subs && iterateRoutes(route.subs)
        ]
      )
    })
  }

  return routes
    ? <Switch {...switchProps}>
        {iterateRoutes(routes)}
      </Switch>
    : null
}


export {
  renderRoutes
}