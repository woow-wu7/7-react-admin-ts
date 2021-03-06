import { IRouteModule } from '../global/interface'
import adminRoutes from './admin-routes'
import bigScreenRoutes from './big-screen-routes'

const totalRoutes: IRouteModule[] = [
  {
    meta: {
      needLoginAuth: false,
    },
    routes: [ 
      // routes：用于嵌套路由，注意不是嵌套菜单
      // subs：主要还遍历注册menu树形菜单，和渲染menu树形菜单，在不同系统的路由中定义了subs
      // 嵌套路由通过 renderRoutes函数 做处理
      ...adminRoutes, // --------------------------- 后台系统路由表
      ...bigScreenRoutes, // ----------------------- 大屏系统路由表
    ]
  }
]


export default totalRoutes