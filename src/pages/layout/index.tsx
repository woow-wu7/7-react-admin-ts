import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { SYSTEMTYPE } from '@/global/enum'
import { getLocalStorage } from '@/utils'
import AdminSystem from '../admin-system'
import BigScreen from '../bigscreen-system'


const Layout = (props: any) => {
  const { systemType } = props
  const { pathname } = useLocation()
  let history = useHistory();
  console.log(location);
  const token =
    useSelector((state: { app: { loginMessage: { token: string } } }) => state.app.loginMessage.token) ||
    getLocalStorage('loginMessage').token;

  const isToLogin = () => {
    // admin系统
    if (systemType === SYSTEMTYPE.ADMIN) {
      !token
        ? history.replace('/login') // 登陆页
        : pathname === '/' ? history.replace('/admin-home') : history.replace(pathname)
      // token
      // 不存在去 login
      // 存在，如果是 '/' 跳转到 '/admin-home'
      // 存在，如果不是 '/' 跳转到当前的 pathname
    }
    // 大屏系统
    else {
    }
  }

  useEffect(() => {
    isToLogin()
  }, [])

  return systemType === SYSTEMTYPE.ADMIN
    ?
    <AdminSystem {...props} />
    :
    <BigScreen {...props} />
}

const mapStateToProps = (state: any) => {
  return {
    systemType: state.app.systemType
  }
}


export default connect(mapStateToProps)(Layout)