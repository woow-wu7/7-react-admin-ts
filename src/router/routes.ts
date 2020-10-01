import React from 'react'
import Login from '../pages/login';
import HomeBigScreen from '../pages/home/bigscreen.home';
import HomeAdmin from '../pages/home/admin.home';
import Layout from '../pages/layout';
import store from '../store'
import { SYSTEMTYPE } from '../global/enum'

interface RouteModule {
  path: string;
  component: any;
  exact?: boolean;
  routes?: any
}

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