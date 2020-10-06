import React from 'react'
import { IRouteModule } from '../../global/interface'
import { Switch, Route } from 'react-router-dom'
// { route.subs ? renderRoutes(route.subs) : null }
const renderRoutes = (routes?: IRouteModule[], extraProps = {}, switchProps = {}) => {
  return routes
    ? <Switch {...switchProps}>
        {routes.map((route, index) => {
          return (
            <Route
              key={route.key || `${index + +new Date()}`}
              path={route.path}
              exact={route.exact}
              strict={route.strict}
              render={props => {
                return route.render
                  ? route.render({ ...props, ...extraProps, route: route })
                  : <route.component {...props} {...extraProps} route={route} />
              }} />
          )
        })}
        
        {routes.map((route, index) => {
          return route.subs
            ?
            route.subs.map((route, index) => {
              return (
                <Route
                  key={route.key || route.path || `${index + +new Date()}`}
                  path={route.path}
                  exact={route.exact}
                  strict={route.strict}
                  render={props => {
                    return route.render
                      ? route.render({ ...props, ...extraProps, route: route })
                      : <route.component {...props} {...extraProps} route={route} />
                  }} />
              )
            })
            : null
        })}
      </Switch>
    : null
}


export {
  renderRoutes
}