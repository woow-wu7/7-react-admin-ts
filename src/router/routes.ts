import { FormProvider } from 'antd/lib/form/context';
import { lazy } from 'react';
import { RouteModule } from '../global/interface'
import adminRoutes from './admin-routes'
import bigScreenRoutes from './big-screen-routes'


const Login = lazy(() => import(/* webpackChunkName: 'Login' */'../pages/login'))
const Layout = lazy(() => import(/* webpackChunkName: 'Layout' */'../pages/layout'))
const NotFound = lazy(() => import(/* webpackChunkName: 'NotFound' */'../pages/404'))

const totalRoutes: RouteModule[] = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/404',
    component: NotFound,
  },
  {
    path: '/',
    component: Layout,
    routes: [
      ...bigScreenRoutes,
      ...adminRoutes,
    ]
  }
]


export default totalRoutes