import React, { useCallback, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { CONST, SYSTEMTYPE } from '@/global/enum'
import { getLocalStorage } from '@/utils'
import AdminSystem from '../admin-system'
import BigScreen from '../bigscreen-system'


const Layout = (props: any) => {
  const { systemType } = props
  const { pathname } =  useLocation()
  let history = useHistory();

  const token =
    useSelector((state: { app: { loginMessage: { token: string } } }) => state.app.loginMessage.token) ||
    getLocalStorage(CONST.LOGIN_MESSAGES).token;


  const isToLogin = () => {
    // admin系统
    if (systemType === SYSTEMTYPE.ADMIN) {
      !token
        ? history.replace('/login') // 为登陆：去登陆页
        : pathname === '/' && history.push('/admin-home') // 已登录：如果是 '/'，就重定向''/admin-home'
    }

    // 大屏系统
    else {
    }
  }

  /* eslint-disable */
  useEffect(() => {
    isToLogin()
  }, [pathname])
  /* eslint-disable */

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