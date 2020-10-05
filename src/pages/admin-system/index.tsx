import React from 'react'
import { renderRoutes } from '../../utils/render-routes/index'
import styles from './index.module.scss'
import { Layout, Menu } from 'antd';
import adminRoutes from '../../router/admin-routes'
import { RouteModule } from '../../global/interface'

const Admin = (props: any) => {
    const { Header, Sider, Content } = Layout;
    console.log(renderRoutes(props.route.routes), '22222222')

    const renderMenu = (adminRoutes: RouteModule[]) => {
        return adminRoutes.map((item, index) => {
            return '111'
        })
    }

    return (
        <Layout className={styles.layoutAdmin}>
            <Sider>
                {/* <Menu
                    mode="inline"
                    theme="dark"
                >
                    {renderMenu(adminRoutes)}
                </Menu> */}
            </Sider>
            <Layout>
                <Header className={styles.header}>
                    <ul className={styles.topMenu}>
                        <li>退出</li>
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