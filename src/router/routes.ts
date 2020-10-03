import { lazy } from 'react';

interface RouteModule {
  path: string;
  component: any;
  exact?: boolean;
  routes?: any
}

const Login = lazy(() => import(/* webpackChunkName: 'Login' */'../pages/login'))
const HomeBigScreen = lazy(() => import(/* webpackChunkName: 'HomeBigScreen' */'../pages/home/bigscreen.home'))
const HomeAdmin = lazy(() => import(/* webpackChunkName: 'HomeAdmin' */'../pages/home/admin.home'))
const Layout = lazy(() => import(/* webpackChunkName: 'Layout' */'../pages/layout'))
const NotFound = lazy(() => import(/* webpackChunkName: 'Layout' */'../pages/404'))

const routes: RouteModule[] = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    component: Layout,
    routes: [
      {
        path: '/home-bigscreen',
        component: HomeBigScreen,
      },
      {
        path: '/home-admin',
        component: HomeAdmin,
      },
      {
        path:  '*',
        component: NotFound
      }
    ]
  }
]

export default routes