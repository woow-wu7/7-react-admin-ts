import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { CONST } from '@/global/enum'
import { getLocalStorage } from '@/utils'
import AdminSystem from '../admin-system'
import BigScreen from '../bigscreen-system'


const Layout = (props: any) => {
  const { systemType } = props
  const { pathname } =  useLocation()
  let history = useHistory();

  const token =
    useSelector((state: { app: { loginMessage: { token: string } } }) => state.app.loginMessage.token) ||
    getLocalStorage(CONST.LOGIN_MESSAGES)?.token || '';
  
  const currentSystemType = getLocalStorage("CURRENT_SYSTEMTYPE") 
    ? getLocalStorage("CURRENT_SYSTEMTYPE") 
    : systemType

  console.log(currentSystemType, "==> 当前系统")
  console.log(token, "==> 当前token")
  console.log(pathname, "==> 当前的pathname")

  const isToLogin = () => {
    // admin系统
    if (currentSystemType === "ADMIN") {
      console.log('admin系统')
      !token
        ? history.replace('/login') // 为登陆：去登陆页
        : pathname === '/' && history.push('/admin-home') // 已登录：如果是 '/'，就重定向''/admin-home'
    }

    // 大屏系统
    else {
      console.log('大屏系统')
      !token
        ? history.replace('/login') // 为登陆：去登陆页
        : pathname === '/' && history.push('/big-screen-home') // 已登录：如果是 '/'，就重定向''/admin-home'
    }
  }

  /* eslint-disable */
  useEffect(() => {
    isToLogin()
  }, [pathname])
  /* eslint-disable */


  return getLocalStorage("CURRENT_SYSTEMTYPE") && getLocalStorage("CURRENT_SYSTEMTYPE")  === "ADMIN"
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