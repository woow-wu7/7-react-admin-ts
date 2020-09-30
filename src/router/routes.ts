import React from 'react'
import Login from '../pages/login';
import Home from '../pages/home';
import Layout from '../pages/layout';

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
        path: '/home',
        exact: true,
        component: Home,
      }
    ]
  }
]

export default routes