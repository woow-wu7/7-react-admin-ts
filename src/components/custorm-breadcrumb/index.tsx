import React, { useEffect, useState } from 'react'
import { Breadcrumb } from 'antd'
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
// 1. 不足：使用localstore，在子组件set，在父组件get，但是父组件先执行，子组件后执行，并且localstore不会更新组件，所以导致面包屑不更新
// 2. 代替：在子组件 es6detail 中 dispatch 了一个action，但不是在onClick的事件中，触发了警告
  // 之所以还这样做，是要在子组件es6detail更新后，更新CustomBreadcrumb
  // 因为子组件es6detail更新了store，而父组件 CustomBreadcrumb 有引用store中的state，所以会更新
  // 不足：触发了警告
// ---------------------------- 2020-11-27 最新解决方案 ----------------------------
// 3. 完美解决：
// 3.1 利用 useEffect 依赖 pathname，当pathname变化时，就会执行useEffect的回调，在回调中再次获取 routeParams
// 3.2 为了保证 localStorage.getItem() 在 localStorage.setItem() 之后执行，使用定时器延时获取 routeParams
// 3.3 routeParams 的主要作用是：替换掉route.path中的动态参数 :id 等动态路由，从而实现 ( path:title ) 的 ( map ) 映射
// 3.4 --- 问 --- 为什么：一定要替换动态 ( route.path )中的 ( a/:b ) 动态参数呢？
// 3.4 --- 答 --- 因为：通过 useLocation 获取的 pathname 是真实的参数，而不是动态的占位符，做 map 时要一一对应
// 3.5 详见 useEffect() 函数


// (2) 
// 问题：退出重新登陆后，由于menu的openkeys和selectkeys做了缓存，会选中之前的menu并展开，但是面包屑却没有做缓存，不同步
// 解决：退出的时候，是应该清除掉所有缓存和localstory的数据的，即退出不再缓存面包屑，注意不是刷新，而是退出登陆
const CustomBreadcrumb = () => {
  const roles = useSelector((state: any) => state.app.loginMessage.roles) || getLocalStorage(CONST.LOGIN_MESSAGES)?.roles
  const pathname = useLocation().pathname // 获取url的path
  const history = useHistory()
  const [routeParams, setRouteParams] = useState({})

  useEffect(() => {
    setTimeout(() => {
      // routeParams => 获取useParams的params对象，对象中包含动态路由的id属性
      // 定时器：这里使用定时器，是因为避免这里通过localstore.getItem()取值时，detail组件中还未localStorage.setItem()的情况，确保万无一失
      const params = getLocalStorage('routeParams')
      setRouteParams(() => params)
    }, 100)
  }, [pathname])

  // 深拷贝 权限过滤后的adminRoutes
  const routesAmin = _.cloneDeep([...routesFilter(adminRoutes, roles)]) // 权限过滤，为了和menu同步


  // routeMap
  // generateRouteMap => 生成面包屑的 path,title 映射
  // 注意：( 重要 ) 每一个 detail 都要记得用 useParams 存入 localStorage
  const generateRouteMap = (routesAmin: IRouteModule[]) => {
    const routeMap = {}
    function step(routesAmin: IRouteModule[]) {
      routesAmin.forEach((item: any) => {
        if (item.path.includes(routeParams && Object.keys(routeParams)[0])) { // 动态路由存在:符号，缓存该 route，用于替换面包屑的最后一级名字
          item.path = item.path.replace(`:${Object.keys(routeParams)[0]}`, routeParams[Object.keys(routeParams)[0]])
          // 把动态路由参数（:id） 替换成真实的（params）
        }
        routeMap[item.path] = item.title // path:title 映射
        item.subs && step(item.subs) // 递归
      })
    }
    step(routesAmin) // 用于递归
    return routeMap
  }
  const routeMap = generateRouteMap(routesAmin)
  // console.log('routeMap :>> ', routeMap);


  // pathFilter 
  // pathFilter 函数声明 返回值是boolean
  // 面包屑是否可以点击导航
  // 同时用来做可点击，不可点击的 UI
  const pathFilter = (path: string) => {
    // normalizeFilterdAdminRoutes => 展平所有subs
    function normalizeFilterdAdminRoutes(routesAmin: IRouteModule[]) {
      let normalizeArr: IRouteModule[] = []
      routesAmin.forEach((item) => {
        item.subs
          ? normalizeArr = normalizeArr.concat(normalizeFilterdAdminRoutes(item.subs))
          : normalizeArr.push(item)
        // 这里是 ( 展平 ) 也是 ( 过滤 )
        // 如果 route.subs 不存在，一定是可以点击的，即是 menu.item，存在component，该层breadcrumb可以点击
        // 如果 route.subs 存在，则还有子menu，则该层是 submenu，因为submenu上没有component，则该层breadcrumb不可点击，置灰
      })
      return normalizeArr
    }
    const routes = normalizeFilterdAdminRoutes(_.cloneDeep(routesAmin))

    // LinkToWhere => 是否可以点击面包屑
    function LinkToWhere(routes: IRouteModule[]) {
      // let isCanGo = false
      // routes.forEach(item => {
      //   if (item.path === path && item.component) {
      //     isCanGo = true
      //   }
      // })
      // return isCanGo

      return routes.map(item => item.path).includes(path)
      // 优化了上面注释的一段代码
      // 过滤出 route 中的 path
      // ( path ) 是整个 ( pathFilter ) 的参数
    }

    return LinkToWhere(routes) // 返回boolean值
  }


  // 点击时的导航操作
  const goPage = (item: string) => {
    pathFilter(item) && history.push(item) // 调用
    // 函数组合，可以点击就就跳转
  }


  // data
  // generateBreadcrumbData => 生成面包屑的data
  const generateBreadcrumbData = (pathname: string) => {
    const arr = pathname.split('/')
    return arr.map((_, index) => {
      return arr.slice(0, index + 1).join('/')
    }).filter(v => !!v)
  }
  const data = generateBreadcrumbData(pathname)
  // console.log(data, '=> breadcrumb.data')


  // renderData
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

  // 整个组件的返回值
  return (
    <Breadcrumb className={styles.breadcrumb} separator="/">
      {data.map(renderData)}
    </Breadcrumb>
  )
}

export default CustomBreadcrumb