import { Breadcrumb } from 'antd'
import React, { useState } from 'react'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom'
import styles from './breadcrumb.module.scss'
import { routesFilter } from '@/utils/render-routes/index'
import adminRoutes from '@/router/admin-routes'
import { useSelector } from 'react-redux'
import { IRouteModule } from '@/global/interface'
import { getLocalStorage } from '@/utils'

const CustomBreadcrumb = () => {
  const roles = useSelector((state: any) => state.app.loginMessage.roles) || getLocalStorage('loginMessage').roles
  const pathname = useLocation().pathname
  let dynamicRoute: any = {} // 如果存在动态路由，就记录该route对象

  const routesAmin = routesFilter(adminRoutes, roles) // 权限过滤，为了和menu同步

  // generateRouteMap => 生成面包屑的 path,title映射
  const generateRouteMap = (routesAmin: IRouteModule[]) => {
    const routeMap = {}
    function step(routesAmin: IRouteModule[]) {
      routesAmin.forEach((item, index) => {
        if (item.path.includes(':')) { // 动态路由存在:符号，缓存该 route，用于替换面包屑的最后一级名字
          dynamicRoute = item
        }
        routeMap[item.path] = item.title
        item.subs && step(item.subs)
      })
    }
    step(routesAmin) // 用于递归
    return routeMap
  }
  const routeMap = generateRouteMap(routesAmin)
  console.log(routeMap, 'routeMap')

  // generateBreadcrumbData => 生成面包屑的data
  const generateBreadcrumbData = (pathname: string) => {
    const arr = pathname.split('/')
    return arr.map((item, index) => {
      return arr.slice(0, index + 1).join('/')
    }).filter(v => !!v)
  }
  const data = generateBreadcrumbData(pathname)

  // 渲染 breadcrumb
  const renderData = (item: string, index: number) => {
    console.log(dynamicRoute, '33');
    return (
      <Breadcrumb.Item key={index}>
        <Link to={item}>
          {
            (pathname.split('/').length === dynamicRoute.path.split('/').length && index === data.length - 1)// 这里不能用length来判断，明显修改
              // 匹配到动态路项，把面包屑最后一级名字替换成 动态路由的title
              // 因为动态路由总是存在最后一级，在这个项目中
              ? dynamicRoute.title
              : routeMap[item]
          }
        </Link>
      </Breadcrumb.Item>
    )
  }

  return (
    <Breadcrumb className={styles.breadcrumb} separator="/">
      {data.map(renderData)}
    </Breadcrumb>
  )
}

export default CustomBreadcrumb