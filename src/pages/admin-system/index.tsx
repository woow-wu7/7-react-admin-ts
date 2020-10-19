import React, { useEffect, useRef, useState } from 'react'
import { renderRoutes, routesFilter } from '@/utils/render-routes/index'
import styles from './index.module.scss'
import { Avatar, BackTop, Dropdown, Layout, Menu } from 'antd';
import adminRoutes from '@/router/admin-routes'
import { IRouteModule } from '@/global/interface'
import IconFont from '@/components/Icon-font'
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/utils';
import CustomBreadcrumb from '@/components/custorm-breadcrumb';
import { LoginOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import { CONST } from '@/global/enum';

const { SubMenu } = Menu;
const { Header, Sider } = Layout;

const Admin = (props: any) => {
	const [collapsed, setcollapsed] = useState(false)
	const [selectedKeys, setSelectedKeys] = useState(['/admin-home'])
	const [openKeys, setOpenKeys]: any = useState(['/admin-home'])
	const history = useHistory()
	const { pathname } = useLocation()
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		// 这里要考虑 ( 登陆第一次跳转的加载 ) 和 ( 刷新浏览器的加载 )
		// 不管哪种情况，都获取当前的 pathname，当前pathname是 ( path和menu的keys要一致的原因  )
		const TempSelectedKeys = [pathname]

		const openKeys = getLocalStorage(CONST.OPENKEYS)
		setSelectedKeys(v => v = TempSelectedKeys)
		setOpenKeys((v: any) => v = openKeys)
	}, [pathname])

	const roles =
		useSelector((state: { app: { loginMessage: { roles: string } } }) => state.app.loginMessage.roles) ||
		getLocalStorage(CONST.LOGIN_MESSAGES).roles;

	/**
	 * @function renderMenu
	 * @description 递归渲染菜单
	 */
	const renderMenu = (adminRoutes: IRouteModule[]) => {

		const adminRoutesDeepClone = routesFilter([...adminRoutes], roles) // adminRoutes权限过滤

		return adminRoutesDeepClone.map(({ subs, key, title, icon, path }) => {
			return subs
				?
				<SubMenu key={key} title={title} icon={<IconFont type={icon || 'anticon-shouye'} />}>
					{renderMenu(subs)}
				</SubMenu>
				:
				!path.includes(':') && <Menu.Item key={key} icon={<IconFont type={icon || 'anticon-shouye'} />} >{title}</Menu.Item>
			// 动态路由不进行显示，因为一般动态路由是详情页
			// 虽然不显示，但是需要注册路由，只是menu不显示
		})
	}

	// 点击 menuItem 触发的事件
	const goPage = ({ keyPath, key }: { keyPath: any[], key: any }) => {
		history.push(keyPath[0])
		setSelectedKeys(v => v = [key]) // 修改当前组件的state
	}

	// 展开/关闭的回调
	const onOpenChange = (openKeys: any) => {
		setOpenKeys((v: any) => v = openKeys)
		setLocalStorage(CONST.OPENKEYS, openKeys) // 记住展开关闭的组，刷新持久化
	}

	const toggleCollapsed = () => {
		setcollapsed(v => v = !v)
	};

	const loginOut = () => {
		history.replace('/login')
		removeLocalStorage() // 不传参表示删除所有
	}

	const menu = (
		<Menu>
			<Menu.Item disabled style={{ width: '200px' }}>
				用户设置
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item onClick={loginOut}>
				<LoginOutlined /> 退出登陆
			</Menu.Item>
		</Menu>
	)
	return (
		<Layout className={styles.layoutAdmin}>
			<Sider className={styles.silderWrap} collapsed={collapsed}>
				<Menu
					mode="inline"
					theme="dark"
					onClick={goPage}
					// inlineCollapsed={} 在有 Sider 包裹的情况下，需要在Sider中设置展开隐藏
					inlineIndent={24}
					selectedKeys={selectedKeys}
					openKeys={openKeys}
					onOpenChange={onOpenChange}
				>
					{renderMenu([...adminRoutes])}
				</Menu>
			</Sider>
			<Layout className={styles.contentWrap}>
				<Header className={styles.header}>
					<aside>
						<span onClick={toggleCollapsed}>
							{collapsed
								? <MenuUnfoldOutlined className={styles.toggleCollapsedIcon} />
								: <MenuFoldOutlined className={styles.toggleCollapsedIcon} />
							}
						</span>
					</aside>
					<ul className={styles.topMenu}>
						<Dropdown overlay={menu}>
							<Avatar style={{ backgroundColor: '#87d068', cursor: 'pointer' }} icon={<UserOutlined />} />
						</Dropdown>
					</ul>
				</Header>
				{/* scroll相关 */}
				<div className={styles.content} ref={ref}>
					<div className={styles.scrollInner}>
						<CustomBreadcrumb />
						{renderRoutes(props.route.routes)}
						{/* renderRoutes(props.route.routes) 再次执行，注册嵌套的路由，成为父组件的子组件 */}
					</div>
				</div>
			</Layout>

			{/* 返回顶部，层级放在那里都可以 */}
			<BackTop target={() => ref.current || window} visibilityHeight={200}>
				<div className={styles.scrollTop}>
					<VerticalAlignTopOutlined style={{ color: '#fff', fontSize: '30px' }} />
				</div>
			</BackTop>
		</Layout>
	)
}

export default Admin