import { IRouteModule } from '@/global/interface'
import BigScreenHome from '../../pages/bigscreen-system/home'

const bigScreenRoutes: IRouteModule[] = [{
  key: '/big-screen-home',
  path: '/big-screen-home',
  component: BigScreenHome,
  meta: {
    needLoginAuth: true,
    rolesAuth: ['user', 'admin']
  },
}]

export default bigScreenRoutes