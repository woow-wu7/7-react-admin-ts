import React from 'react'
import { renderRoutes, matchRoutes } from 'react-router-config'

const Layout = (props: any) => {
  return (
    <div>
      <header>layout page</header>
      { renderRoutes(props.route.routes)}
    </div>
  )
}

export default Layout