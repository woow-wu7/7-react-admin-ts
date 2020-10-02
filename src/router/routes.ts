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
        exact: true,
        component: HomeBigScreen,
      },
      {
        path: '/home-admin',
        exact: true,
        component: HomeAdmin,
      },
    ]
  }
]

export default routes