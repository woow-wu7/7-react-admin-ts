import React, { useEffect, useState } from 'react'
import { renderRoutes, routesFilter } from '@/utils/render-routes/index'
import styles from './index.module.scss'
import { Avatar, Button, Dropdown, Layout, Menu } from 'antd';
import adminRoutes from '@/router/admin-routes'
import { IRouteModule } from '@/global/interface'
import IconFont from '@/components/Icon-font'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getLocalStorage, removeStorage, setLocalStorage } from '@/utils';
import CustomBreadcrumb from '@/components/custorm-breadcrumb';
import { LoginOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

const Admin = (props: any) => {
	const [collapsed, setcollapsed] = useState(false)
	const [selectedKeys, setSelectedKeys] = useState(['/admin-home'])
	const [openKeys, setOpenKeys]: any = useState(['/admin-home'])
	const history = useHistory()

	useEffect(() => {
		// 初始化，加载持久化的 selectedKeys 和 openKeys
		const selectedKeys = getLocalStorage('selectedKeys')
		const openKeys = getLocalStorage('openKeys')
		setSelectedKeys(v => v = selectedKeys)
		setOpenKeys((v: any) => v = openKeys)
	}, [])

	const roles =
		useSelector((state: { app: { loginMessage: { roles: string } } }) => state.app.loginMessage.roles) ||
		getLocalStorage('loginMessage').roles;

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
		setSelectedKeys(v => v = [key])
		setLocalStorage('selectedKeys', [key]) // 记住当前点击的item，刷新持久化
	}

	// 展开/关闭的回调
	const onOpenChange = (openKeys: any) => {
		setOpenKeys((v: any) => v = openKeys)
		setLocalStorage('openKeys', openKeys) // 记住展开关闭的组，刷新持久化
	}

	const toggleCollapsed = () => {
		setcollapsed(v => v = !v)
	};

	const loginOut = () => {
		history.replace('/login')
		removeStorage() // 不传参表示删除所有
	}

	const menu = (
		<Menu>
			<Menu.Item disabled style={{width: '200px'}}>
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
			<Sider collapsed={collapsed}>
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
			<Layout>
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
				<Content className={styles.content}>
					<CustomBreadcrumb />
					{renderRoutes(props.route.routes)}
					{/* renderRoutes(props.route.routes) 再次执行，注册嵌套的路由，成为父组件的子组件 */}
				</Content>
			</Layout>
		</Layout>
	)
}

export default Admin