import { Breadcrumb } from 'antd'
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import styles from './breadcrumb.module.scss'
import { routesFilter } from '@/utils/render-routes/index'
import adminRoutes from '@/router/admin-routes'
import { useSelector } from 'react-redux'
import { IRouteModule } from '@/global/interface'
import { getLocalStorage } from '@/utils'
import _ from 'lodash'


const CustomBreadcrumb = () => {
  const roles = useSelector((state: any) => state.app.loginMessage.roles) || getLocalStorage('loginMessage').roles
  const pathname = useLocation().pathname // 获取url的path
  const history = useHistory()

  // routeParams => 获取useParams的params对象，对象中包含动态路由的id属性
  const routeParams = getLocalStorage('routeParams')

  // 深拷贝 权限过滤后的adminRoutes
  const routesAmin = _.cloneDeep([...routesFilter(adminRoutes, roles)]) // 权限过滤，为了和menu同步

  // generateRouteMap => 生成面包屑的 path,title映射
  const generateRouteMap = (routesAmin: IRouteModule[]) => {
    const routeMap = {}
    function step(routesAmin: IRouteModule[]) {
      routesAmin.forEach((item, index) => {
        if (item.path.includes(Object.keys(routeParams)[0])) { // 动态路由存在:符号，缓存该 route，用于替换面包屑的最后一级名字
          item.path = item.path.replace(`:${Object.keys(routeParams)[0]}`, routeParams[Object.keys(routeParams)[0]])
          // 把动态路由参数（:id） 替换成真实的（params）
        }
        routeMap[item.path] = item.title
        item.subs && step(item.subs)
      })
    }
    step(routesAmin) // 用于递归
    return routeMap
  }
  const routeMap = generateRouteMap(routesAmin)

  // generateBreadcrumbData => 生成面包屑的data
  const generateBreadcrumbData = (pathname: string) => {
    const arr = pathname.split('/')
    return arr.map((item, index) => {
      return arr.slice(0, index + 1).join('/')
    }).filter(v => !!v)
  }
  const data = generateBreadcrumbData(pathname)

  // pathFilter 面包屑是否可以点击导航
  const pathFilter = (path: string) => {
    // normalizeFilterdAdminRoutes => 展平所有subs
    function normalizeFilterdAdminRoutes(routesAmin: IRouteModule[]) {
      let normalizeArr: IRouteModule[] = []
      routesAmin.forEach((item, index: number) => {
        item.subs
          ?
          normalizeArr = normalizeArr.concat(normalizeFilterdAdminRoutes(item.subs))
          :
          normalizeArr.push(item)
      })
      return normalizeArr
    }
    const routes = normalizeFilterdAdminRoutes(_.cloneDeep(routesAmin))

    // 是否可以点击面包屑
    function LinkToWhere(routes: IRouteModule[]) {
      let isCanGo = false
      routes.forEach(item => {
        if (item.path === path && item.component) {
          isCanGo = true
        }
      })
      return isCanGo
    }
    return LinkToWhere(routes)
  }

  const goPage = (item: string) => {
    pathFilter(item) && history.push(item)
  }

  // 渲染 breadcrumb
  const renderData = (item: string, index: number) => {
    return (
      <Breadcrumb.Item key={index} onClick={() => goPage(item)}>
        <span
          style={{
            cursor: pathFilter(item) ? 'pointer' : 'not-allowed',
            color: pathFilter(item) ? '#4DB2FF' : 'silver'
          }}
        >
          {routeMap[item]}
        </span>
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