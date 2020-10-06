import { IRouteModule } from '../../global/interface'
import BigScreenHome from '../../pages/bigscreen-system/home'

const bigScreenRoutes: IRouteModule[] = [{
  key: '/big-screen-home',
  path: '/big-screen-home',
  component: BigScreenHome,
}]

export default bigScreenRoutes