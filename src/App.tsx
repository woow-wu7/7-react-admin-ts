import React from 'react';
import Router from '@/router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actions from './app.action'
import { LOG_LOGO } from '@/global/constant'

function App() {
  console.log(`%c${LOG_LOGO}`, 'color:red') // %c 样式占位符，在第二个参数中可以输入样式
  return (
    <div className="app">
      <Router />
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