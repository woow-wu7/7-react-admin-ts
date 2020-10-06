import { RouteModule } from '../../global/interface'
import BigScreenHome from '../../pages/bigscreen-system/home'

const bigScreenRoutes: RouteModule[] = [{
  key: '/big-screen-home',
  path: '/big-screen-home',
  component: BigScreenHome,
}]

export default bigScreenRoutes