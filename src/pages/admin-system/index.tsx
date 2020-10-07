import React from 'react'
import { renderRoutes } from '../../utils/render-routes/index'
import styles from './index.module.scss'
import { Layout, Menu } from 'antd';
import adminRoutes from '../../router/admin-routes'
import { IRouteModule } from '../../global/interface'
import IconFont from '../../components/Icon-font'
import { useHistory } from 'react-router-dom';

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

const Admin = (props: any) => {
	const history = useHistory()

	/**
	 * @function renderMenu
	 * @description 递归渲染菜单
	 */
	const renderMenu = (adminRoutes: IRouteModule[]) => {
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
				</Content>
			</Layout>
		</Layout>
	)
}

export default Admin