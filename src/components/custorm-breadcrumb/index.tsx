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
import { CONST } from '@/global/enum'

// 问题记录

// (1)
// 需求：面包屑在点击到详情时，更新全局面包屑
// 不足：使用localstore，在子组件set，在父组件get，但是父组件先执行，子组件后执行，并且localstore不会更新组件，所以导致面包屑不更新
// 代替：在子组件 es6detail 中 dispatch 了一个action，但不是在onClick的事件中，触发了警告
  // 之所以还这样做，是要在子组件es6detail更新后，b更新CustomBreadcrumb
  // 因为子组件es6detail更新了store，而父组件 CustomBreadcrumb 有引用store中的state，所以会更新
  // 不足：触发了警告

// (2) 
// 问题：退出重新登陆后，由于menu的openkeys和selectkeys做了缓存，会选中之前的menu并展开，但是面包屑却没有做缓存，不同步
// 解决：退出的时候，是应该清除掉所有缓存和localstory的数据的，即退出不再缓存面包屑，注意不是刷新，而是退出登陆
const CustomBreadcrumb = () => {
  const roles = useSelector((state: any) => state.app.loginMessage.roles) || getLocalStorage(CONST.LOGIN_MESSAGES).roles
  const pathname = useLocation().pathname // 获取url的path
  const history = useHistory()

  // routeParams => 获取useParams的params对象，对象中包含动态路由的id属性
  const routeParams = getLocalStorage('routeParams')
  // debugger

  

  // 深拷贝 权限过滤后的adminRoutes
  const routesAmin = _.cloneDeep([...routesFilter(adminRoutes, roles)]) // 权限过滤，为了和menu同步

  // generateRouteMap => 生成面包屑的 path,title映射
  const generateRouteMap = (routesAmin: IRouteModule[]) => {
    const routeMap = {}
    function step(routesAmin: IRouteModule[]) {
      routesAmin.forEach((item: any, index) => {
        if (item.path.includes(routeParams && Object.keys(routeParams)[0])) { // 动态路由存在:符号，缓存该 route，用于替换面包屑的最后一级名字
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

  // pathFilter 
  // 面包屑是否可以点击导航
  // 同时用来做可点击，不可点击的 UI
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

    // LinkToWhere => 是否可以点击面包屑
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

  // 点击时的导航操作
  const goPage = (item: string) => {
    pathFilter(item) && history.push(item)
    // 函数组合，可以点击就就跳转
  }

  // 渲染 breadcrumb
  const renderData = (item: string, index: number) => {
    return (
      <Breadcrumb.Item key={index} onClick={() => goPage(item)}>
        <span className={pathFilter(item) ? styles.canClick : styles.forbidClick}>
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