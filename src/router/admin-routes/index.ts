import { RouteModule } from '../../global/interface'
import AdminHome from '../../pages/admin-system/home'
import AdminHome2 from '../../pages/admin-system/home2'

const adminRoutes: RouteModule[] = [{
  title: '首页',
  icon: 'SettingFilled',
  key: '/admin-home',
  path: '/admin-home',
  component: AdminHome,
  subs: [ // subs用于注册路由，并且用于menu树形菜单
    {
      title: '首页2',
      icon: 'SettingFilled',
      key: '/admin-home2',
      path: '/admin-home2',
      component: AdminHome2,
    }
  ]
}]

export default adminRoutes