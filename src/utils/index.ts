import { lazy } from "react"

export const lazyLoad = (modulePath: string) => {
  return lazy(() => import(modulePath))
}