import React from 'react'
import { renderRoutes, routesFilter } from '../../utils/render-routes/index'
import styles from './index.module.scss'
import { Layout, Menu } from 'antd';
import adminRoutes from '../../router/admin-routes'
import { IRouteModule } from '../../global/interface'
import IconFont from '../../components/Icon-font'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

const Admin = (props: any) => {
	const history = useHistory()

	/**
	 * @function renderMenu
	 * @description 递归渲染菜单
	 */
	const renderMenu = (adminRoutes: IRouteModule[]) => {
		const roles = useSelector((state: { app: { loginMessage: { roles: string } } }) => state.app.loginMessage.roles)
		adminRoutes = routesFilter(adminRoutes, roles) // adminRoutes权限过滤

		return adminRoutes.map(({ subs, key, title, icon }) => {
			return subs
				?
				<SubMenu key={key} title={title} icon={<IconFont type={icon || 'anticon-shouye'} />}>
					{renderMenu(subs)}
				</SubMenu>
				:
				<Menu.Item key={key} icon={<IconFont type={icon || 'anticon-shouye'} />} >{title}</Menu.Item>
		})
	}

	const goPage = ({ keyPath }: { keyPath: any }) => {
		history.push(keyPath[0])
	}

	return (
		<Layout className={styles.layoutAdmin}>
			<Sider>
				<Menu
					mode="inline"
					theme="dark"
					onClick={goPage}
				>
					{renderMenu(adminRoutes)}
				</Menu>
			</Sider>
			<Layout>
				<Header className={styles.header}>
					<ul className={styles.topMenu}>
						<li onClick={() => history.push('/login')}>退出</li>
					</ul>
				</Header>
				<Content className={styles.content}>
					{renderRoutes(props.route.routes)}
					{/* renderRoutes(props.route.routes) 再次执行，注册嵌套的路由，成为父组件的子组件 */}
				</Content>
			</Layout>
		</Layout>
	)
}

export default Admin