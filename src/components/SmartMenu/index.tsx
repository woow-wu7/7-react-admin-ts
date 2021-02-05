import React, { useEffect, useState } from 'react'
import { IRouteModule } from '@/global/interface'
import { routesFilter } from '@/utils/render-routes/index'
import { Menu } from 'antd'
import { useSelector } from 'react-redux'
import { CONST } from '@/global/enum'
import IconFont from '@/components/IconFont'
import { useHistory, useLocation } from 'react-router-dom'
import { getLocalStorage, setLocalStorage } from '@/utils'
import adminRoutes from '@/router/admin-routes'

const { SubMenu } = Menu

const SmartMenu = () => {
  const history = useHistory()
  const location = useLocation()
  const [selectedKeys, setSelectedKeys] = useState(['/admin-home'])
  const [openKeys, setOpenKeys]: any = useState(['/admin-home'])

  useEffect(() => {
    console.log('menu组件渲染了')
    // 说明：
    // (1)
    // 这里要考虑 ( 登陆第一次跳转的加载 ) 和 ( 刷新浏览器的加载 )
    // 不管哪种情况，都获取当前的 pathname，当前pathname是 ( path和menu的keys要一致的原因  )
    // (2)
    // openKeys ===> 是要存在localStorage的，因为需要持久化保存，刷新按钮刷新时，获取
    // selectkeys => 不需要做持久化，而是从 location.pathname 中获取，因为我们的routes中 path 和 key 是一致的，获取的当前path就是当前选中的menu.item的key
    // (3)
    // 该 effect 同时用于初始化和刷新
    const CurrentopenKeys = getLocalStorage(CONST.OPENKEYS) || []
    const currentPathname = location.pathname
    setOpenKeys(() => CurrentopenKeys) // 菜单的展开和关闭的 keys，每一个menu成员都有一个唯一的key
    setSelectedKeys(() => [currentPathname]) // 选中菜单的keys数组，我们的 route 中的  key 和 path 是一样的
  }, [location.pathname])

  const roles =
    useSelector((state: { app: { loginMessage: { roles: string } } }) => state.app.loginMessage.roles) ||
    getLocalStorage(CONST.LOGIN_MESSAGES)?.roles

  // 点击 menuItem 触发的事件
  const goPage = ({ keyPath, key }: { keyPath: any[]; key: any }) => {
    history.push(keyPath[0])
    setSelectedKeys(() => [key]) // 修改当前组件的state
  }

  // 展开/关闭的回调
  const onOpenChange = (openKeys: any) => {
    console.log(openKeys, 'onOpenChange执行了')
    setOpenKeys(() => openKeys)
    setLocalStorage(CONST.OPENKEYS, openKeys) // 记住展开关闭的组，刷新持久化
  }

  // const onOpenChange = (openKeys: any) => {
  //   console.log(openKeys, 'onOpenChange执行了')
  //   const currentopenKeys = openKeys.length
  //     ? openKeys
  //     : getLocalStorage(CONST.OPENKEYS)
  //   setLocalStorage(CONST.OPENKEYS, currentopenKeys) // 记住展开关闭的组，刷新持久化
  //   setOpenKeys(() => currentopenKeys)
  // }

  const renderMenuMembers = (adminRoutes: IRouteModule[]) => {
    const adminRoutesDeepClone = routesFilter([...adminRoutes], roles) // adminRoutes权限过滤
    return adminRoutesDeepClone.map(({ subs, key, title, icon, path }) => {
      return subs ? (
        <SubMenu key={key} title={title} icon={<IconFont type={icon || 'anticon-shouye'} />}>
          {renderMenuMembers(subs)}
        </SubMenu>
      ) : (
        path && !path.includes(':') && (
          <Menu.Item key={key} icon={<IconFont type={icon || 'anticon-shouye'} />}>
            {title}
          </Menu.Item>
        )
      )
      // 动态路由不进行显示，因为一般动态路由是详情页
      // 虽然不显示，但是需要注册路由，只是menu不显示
    })
  }

  return (
    <Menu
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
  )
}

export default SmartMenu
