import React, {Suspense} from 'react'
import {Route, Switch} from 'react-router-dom'

function renderRoutes(routes: any, extraProps ={}, switchProps = {}) {
  return routes
    ? (
        <Suspense fallback={<div>loading...</div>}>
          <Switch {...switchProps}>
            {
              routes.map((route: any, index: number) => {
                const {key, path, exact, strict, render} = route
                return (
                  <Route 
                    key={key || index}
                    path={path}
                    exact={exact}
                    strict={strict}
                    render={(props) => {
                      return render 
                        ? render({...props, ...extraProps, route: route})
                        : <route.component {...props} {...extraProps} route={route}/>
                    }}
                  />
                )
              })
            }
          </Switch>
        </Suspense>
      )
    : null
}

export default renderRoutes