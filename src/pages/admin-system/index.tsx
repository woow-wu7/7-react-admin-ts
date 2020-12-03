import React, { useCallback, useEffect, useRef, useState } from 'react'
import { renderRoutes } from '@/utils/render-routes/index'
import styles from './index.module.scss'
import { BackTop, Layout } from 'antd';
import adminRoutes from '@/router/admin-routes'
import CustomBreadcrumb from '@/components/custorm-breadcrumb';
import { MenuFoldOutlined, MenuUnfoldOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import SmartMenu from '@/components/SmartMenu';
import SmartAvatarMenu from '@/components/SmartAvatarMenu'
import SmartViewport from '@/components/SmartViewport'
import { useDispatch } from 'react-redux'
import { actionType } from './reducer'

const { Header, Sider } = Layout;

const Admin = () => {
	const [collapsed, setcollapsed] = useState(false)
	const refScroll = useRef<HTMLDivElement>(null) // ( 回到顶部 ) 和 ( 吸顶效果 ) 都要用到 ( refScroll )
	const dispatch = useCallback(useDispatch(), [])
	

	// useEffect(() => {
	// 	console.log("admin-system初始化")
	// 	// 这里要考虑 ( 登陆第一次跳转的加载 ) 和 ( 刷新浏览器的加载 )
	// 	// 不管哪种情况，都获取当前的 pathname，当前pathname是 ( path和menu的keys要一致的原因  )
	// 	const TempSelectedKeys = [pathname]
	// 	const CurrentopenKeys = getLocalStorage(CONST.OPENKEYS) || []
	// 	setSelectedKeys(() => TempSelectedKeys)
	// 	setOpenKeys(() => CurrentopenKeys)
	// }, [pathname])

	// 上面useEffect中的判断，已经抽成组件，在menu中判断了

	const toggleCollapsed = () => {
		setcollapsed(v => v = !v)
	};

	useEffect(() => {
		if (refScroll.current) {
			dispatch({ // ceiling效果的容器
				type: actionType.GET_SCROLLCONTAINER,
				payload: refScroll.current
			})
		}
	}, [dispatch])

	return (
		<Layout className={styles.layoutAdmin}>
			<Sider
				className={styles.silderWrap}
				collapsed={collapsed}
				width={200}
				onCollapse={toggleCollapsed}
				collapsible
			>
				<SmartMenu />
			</Sider>
			<Layout className={styles.contentWrap}>
				<Header className={styles.header}>
					{/* Header-左 */}
					<aside onClick={toggleCollapsed}>
						<span>
							{collapsed
								? <MenuUnfoldOutlined className={styles.toggleCollapsedIcon} />
								: <MenuFoldOutlined className={styles.toggleCollapsedIcon} />
							}
						</span>
					</aside>
					{/* Header-右 */}
					<ul className={styles.topMenu}>
						<SmartAvatarMenu />
					</ul>
				</Header>
				{/* scroll相关 ref */}
				<div className={styles.content}>
					<CustomBreadcrumb />
					<div className={styles.routerViewWrap} ref={refScroll} >
						{renderRoutes(adminRoutes)}
					</div>
					{/* renderRoutes(props.route.routes) 再次执行，注册嵌套的路由，成为父组件的子组件 */}
				</div>
			</Layout>

			{/* 返回顶部，层级放在那里都可以 */}
			<BackTop target={() => refScroll.current || window} visibilityHeight={200}>
				<div className={styles.scrollTop}>
					<VerticalAlignTopOutlined style={{ color: '#fff', fontSize: '30px' }} />
				</div>
			</BackTop>

			<SmartViewport />
		</Layout>
	)
}

export default Admin