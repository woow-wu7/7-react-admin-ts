import { lazy } from "react"
export { renderRoutes } from './react-router-config'

export const lazyLoad = (modulePath: string) => {
  return lazy(() => import(modulePath))
}