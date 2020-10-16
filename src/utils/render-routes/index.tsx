import React from 'react'
import { IRouteModule } from '@/global/interface'
import { Switch, Route, useHistory, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getLocalStorage } from '..'
import { CONST } from '@/global/enum'

/**
 * @function routesFilter routes的权限过滤
 */
export function routesFilter(routes: IRouteModule[], roles: string) {
	return routes.filter(({ meta: { needLoginAuth, rolesAuth }, routes: nestRoutes, subs }) => {
		if (nestRoutes) { // 存在routes，对routes数组过滤，并重新赋值过滤后的routes
			nestRoutes = routesFilter(nestRoutes, roles) // 递归
		}
		if (subs) { // 存在subs，对subs数组过滤，并重新赋值过滤后的subs
			subs = routesFilter(subs, roles) // 递归
		}
		return !needLoginAuth
			? true
			: rolesAuth?.includes(roles)
				? true
				: false
	})
}


/**
 * @function normalize
 * @description 递归的对route.subs做normalize，即把所有嵌套展平到一层，主要对menu树就行路由注册
 * @description 因为menu树都在同一个路由视口，所以可以在同一层级就行路由注册
 * @description 注意：path 和 component 在存在subs的那层menu-route对象中同时存在和同时不存在
 */
export function normalize(routes?: IRouteModule[]) {
	let result: IRouteModule[] = []
	routes?.forEach(route => {
		!route.subs
			? result.push(route)
			: result = result.concat(normalize(route.subs)) // 拼接
	})
	return result
}

/* eslint-disable */

/**
 * @function renderRoutes
 * @description 注册所有路由，并向嵌套子路由组件传递 route 对象属性，子组件就可以获取嵌套路由属性 routes
 */
export const renderRoutes = (routes: IRouteModule[], extraProps = {}, switchProps = {}) => {
	const history = useHistory()

	const token =
		useSelector((state: { app: { loginMessage: { token: string } } }) => state.app.loginMessage.token) ||
		getLocalStorage(CONST.LOGIN_MESSAGES)?.token;

	const roles =
		useSelector((state: { app: { loginMessage: { roles: string } } }) => state.app.loginMessage.roles) ||
		getLocalStorage(CONST.LOGIN_MESSAGES)?.roles;

	if (!token) {
		history.push('/login') // token未登录去登陆页面
	}
	routes = routesFilter(routes, roles) // 权限过滤，这里只用于路由注册，menu过滤还需在menu页面调用routesFilter
	routes = normalize(routes) // 展平 subs

	return routes
		? <Switch {...switchProps}>
			{
				routes.map((route, index) => { // 先对subs做处理
					return route.path && route.component &&
						// path 并且 component 同时存在才进行路由注册
						// path 和 componet 总是同时存在，同时不存在
						// 但是 path 是必须字段，是因为在 breadcrumb面包屑中需用用到
						<Route
							key={route.key || `${index + +new Date()}`}
							path={route.path}
							exact={route.exact}
							strict={route.strict}
							render={props => {
								return route.render
									? route.render({ ...props, ...extraProps, route: route })
									: <route.component {...props} {...extraProps} route={route} />
								// 向嵌套组件中传递 route属性，通过route.routes在嵌套路由组件中可以再注册嵌套路由
							}} />
				})}
			<Redirect to="/404"></Redirect>
		</Switch>
		: null
}

/* eslint-disable */