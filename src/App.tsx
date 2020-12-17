import React from 'react';
import Router from '@/router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actions from './app.action'
import { LOG_LOGO } from '@/global/constant'

function App() {
  console.log(`%c${LOG_LOGO}`, 'color:red') // %c 样式占位符，在第二个参数中可以输入样式
  console.log('process.env.NODE_ENV :>> ', process.env.NODE_ENV);
  console.log('REACT_APP_AUTHOR :>> ', process.env.REACT_APP_AUTHOR); // .env
  console.log('REACT_APP_CURRENT_ENVIRONMENT :>> ', process.env.REACT_APP_CURRENT_ENVIRONMENT); // development or production
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