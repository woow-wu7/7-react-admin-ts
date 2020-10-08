import { Breadcrumb } from 'antd'
import React from 'react'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom'
import styles from './breadcrumb.module.scss'
import { routesFilter } from '@/utils/render-routes/index'
import adminRoutes from '@/router/admin-routes'
import { useSelector } from 'react-redux'
import { IRouteModule } from '@/global/interface'
import { getLocalStorage } from '@/utils'

const CustomBreadcrumb = () => {
  const roles = useSelector((state: any) => state.app.loginMessage.roles) || getLocalStorage('loginMessage').roles
  const lastBreadCrumbUseParams = useSelector((state: any) => state.app.lastBreadCrumbUseParams)
  const pathname = useLocation().pathname

  const routesAmin = routesFilter(adminRoutes, roles) // 权限过滤，为了和menu同步

  // generateRouteMap => 生成面包屑的 path,title映射
  const generateRouteMap = (routesAmin: IRouteModule[]) => {
    const routeMap = {}
    function step(routesAmin: IRouteModule[]) {
      routesAmin.forEach((item, index) => {
        // lastBreadCrumbUseParams && item.path.includes(':') && (item.path = item.path.slice(0, item.path.indexOf(':')) + lastBreadCrumbUseParams)
        routeMap[item.path] = item.title
        item.subs && step(item.subs)
      })
    }
    step(routesAmin)
    return routeMap
  }
  const routeMap = generateRouteMap(routesAmin)
  console.log(routeMap, 'routeMap')

  // generateBreadcrumbData => 生成面包屑的data
  const generateBreadcrumbData = (pathname: string) => {
    const arr = pathname.split('/')
    return arr.map((item, index) => {
      return arr.slice(0, index + 1).join('/')
    })
  }
  const data = generateBreadcrumbData(pathname)

  // 渲染 breadcrumb
  const renderData = (item: string, index: number) => {
    return (
      <Breadcrumb.Item key={index}>
        <Link to={item}>{routeMap[item]} </Link>
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