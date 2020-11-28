import React, { useState } from 'react'
import { IRouteModule } from '@/global/interface'
import { routesFilter } from '@/utils/render-routes/index'
import { Menu } from 'antd';
import { useSelector } from 'react-redux';
import { CONST } from '@/global/enum';
import IconFont from '@/components/Icon-font'
import { useHistory } from 'react-router-dom';
import { getLocalStorage, setLocalStorage } from '@/utils';
import adminRoutes from '@/router/admin-routes'

const { SubMenu } = Menu;


const SmartMenu = () => {
  const history = useHistory()
  const [selectedKeys, setSelectedKeys] = useState(['/admin-home'])
  const [openKeys, setOpenKeys]: any = useState(['/admin-home'])

  const roles =
    useSelector((state: { app: { loginMessage: { roles: string } } }) => state.app.loginMessage.roles) ||
    getLocalStorage(CONST.LOGIN_MESSAGES)?.roles;


  // 点击 menuItem 触发的事件
  const goPage = ({ keyPath, key }: { keyPath: any[], key: any }) => {
    history.push(keyPath[0])
    setSelectedKeys(() => [key]) // 修改当前组件的state
  }

  // 展开/关闭的回调
  const onOpenChange = (openKeys: any) => {
    console.log(openKeys, 'onOpenChange执行了')
    setOpenKeys(() => openKeys)
    setLocalStorage(CONST.OPENKEYS, openKeys) // 记住展开关闭的组，刷新持久化
  }

  const renderMenuMembers = (adminRoutes: IRouteModule[]) => {
    const adminRoutesDeepClone = routesFilter([...adminRoutes], roles) // adminRoutes权限过滤
    return adminRoutesDeepClone.map(({ subs, key, title, icon, path }) => {
      return subs
        ?
        <SubMenu key={key} title={title} icon={<IconFont type={icon || 'anticon-shouye'} />}>
          {renderMenuMembers(subs)}
        </SubMenu>
        :
        path && !path.includes(':') && <Menu.Item key={key} icon={<IconFont type={icon || 'anticon-shouye'} />} >{title}</Menu.Item>
      // 动态路由不进行显示，因为一般动态路由是详情页
      // 虽然不显示，但是需要注册路由，只是menu不显示
    })
  }

  return <Menu
    mode="inline"
    theme="dark"
    // inlineCollapsed={} 在有 Sider 包裹的情况下，需要在Sider中设置展开隐藏
    inlineIndent={24}
    selectedKeys={selectedKeys}
    openKeys={openKeys}
    onClick={goPage}
    onOpenChange={onOpenChange}
  >
    {renderMenuMembers([...adminRoutes])}
  </Menu>
}


export default SmartMenu