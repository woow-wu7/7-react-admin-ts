import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { CONST, SYSTEMTYPE } from '@/global/enum'
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/utils'
import AdminSystem from '../admin-system'
import BigScreen from '../bigscreen-system'
import actionType from '@/app.constant'


const Layout = (props: any) => {
  const { systemType } = props
  const { pathname } = useLocation()
  let history = useHistory();
  const dispatch = useDispatch()
  
  const token =
    useSelector((state: { app: { loginMessage: { token: string } } }) => state.app.loginMessage.token) ||
    getLocalStorage(CONST.LOGIN_MESSAGES).token;

  const stepNext = () => {
    // token存在的情况
      // 如果是 '/' 路由跳转到 '/admin-home'，同时同步 menu
      // 如果不是 '/' 路由跳转到当前的 pathname ， 注意同步 menu
    if (pathname === '/') {
      history.replace('/admin-home')
      setLocalStorage(CONST.SELECTKEYS, ["/admin-home"])
    } else {
      setLocalStorage(CONST.SELECTKEYS, [pathname])
      history.replace(pathname)
      // dispatch({ // 存入redux
      //   type: actionType.SELECT_KEYS,
      //   payload: [pathname]
      // })
    }
  }

  const isToLogin = () => {
    // admin系统
    if (systemType === SYSTEMTYPE.ADMIN) {
      !token
        ? history.replace('/login') // 登陆页
        // : pathname === '/' ? history.replace('/admin-home') : history.replace(pathname)
        : stepNext()
      // token
      // 不存在去 login
      // 存在，如果是 '/' 跳转到 '/admin-home'
      // 存在，如果不是 '/' 跳转到当前的 pathname
    }
    
    // 大屏系统
    else {
    }
  }

  const clearCash = () => {
    removeLocalStorage()
  }

  useEffect(() => {
    isToLogin()
  }, [pathname, token])

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