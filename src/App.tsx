import React, { useState, useEffect } from 'react';
import Router from '@/router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actions from './app.action'
import { LOG_LOGO } from '@/global/constant'
import Joyride from 'react-joyride' // 新手指引
import {setLocalStorage, getLocalStorage} from '@/utils'

function App() {
  console.log(`%c${LOG_LOGO}`, 'color:red') // %c 样式占位符，在第二个参数中可以输入样式
  console.log('process.env.NODE_ENV :>> ', process.env.NODE_ENV);
  console.log('REACT_APP_AUTHOR :>> ', process.env.REACT_APP_AUTHOR); // .env
  console.log('REACT_APP_CURRENT_ENVIRONMENT :>> ', process.env.REACT_APP_CURRENT_ENVIRONMENT); // development or production

  // runTimes
  // 1. App组件执行的次数，初始渲染执行了 4 次
  // 2. 通过 runTimes 执行的次数，判断是否显示 joyride 新手导航
  // 3. runTimes <= 4 次是显示
  const runTimes = +getLocalStorage('joyRunTimes')
  setLocalStorage('joyRunTimes', +getLocalStorage('joyRunTimes') + 1)

  const steps: any[] = [{
    target: '.toggle-collapse-icon-wrap',
    content: '展开收缩左侧菜单',
    disableBeacon: false,
    placementBeacon: 'bottom',
  }, {
    target: '.top-menu',
    content: '用户设置-具有登出，博客等菜单项',
    disableBeacon: false,
    placementBeacon: 'bottom',
  }]

  const handleJoyrideCallback = (data: any) => {
    console.log('Joyride回调返回的参数 :>> ', data);
  }

  return (
    <div className="app">
      <Router />
      {/* 新手指引 */}
      <Joyride
        steps={steps}
        continuous={true}
        disableOverlay={false}
        disableOverlayClose={true}
        showSkipButton={true}
        callback={handleJoyrideCallback}
        run={runTimes <= 4}
      />
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);