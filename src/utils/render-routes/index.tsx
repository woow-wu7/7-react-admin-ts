import React from 'react'
import { RouteModule } from '../../global/interface'
import { Switch, Route } from 'react-router-dom'

/**
 * @function normolize
 * @description 对route.subs做normalize，即展平到上一层
 */
function normolize(routes?: RouteModule[]) {
	const arr: RouteModule[] = []
	routes?.forEach(route => {
		arr.push(route)
		route.subs?.forEach(route => {
			arr.push(route)
		})
	})
	return arr
}


/**
 * @function renderRoutes
 * @description 注册所有路由，并向嵌套子路由组件传递 route 对象属性，子组件就可以获取嵌套路由属性 routes
 */
const renderRoutes = (routes?: RouteModule[], extraProps = {}, switchProps = {}) => {
	return routes
		? <Switch {...switchProps}>
				{normolize(routes).map((route, index) => {
					return (
						<Route
							key={route.key || `${index + +new Date()}`}
							path={route.path}
							exact={route.exact}
							strict={route.strict}
							render={props => {
								return route.render
									? route.render({ ...props, ...extraProps, route: route })
									: <route.component {...props} {...extraProps} route={route} />
						}}/>
					)
				})}
			</Switch>
		: null
}


export {
	renderRoutes
}