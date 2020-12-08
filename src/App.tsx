import React from 'react';
import Router from '@/router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actions from './app.action'

function App() {
  const ascll = `
  ##      ##  #######   #######  ##      ##         ##      ## ##     ## ######## 
  ##  ##  ## ##     ## ##     ## ##  ##  ##         ##  ##  ## ##     ## ##    ## 
  ##  ##  ## ##     ## ##     ## ##  ##  ##         ##  ##  ## ##     ##     ##   
  ##  ##  ## ##     ## ##     ## ##  ##  ##         ##  ##  ## ##     ##    ##    
  ##  ##  ## ##     ## ##     ## ##  ##  ##         ##  ##  ## ##     ##   ##     
  ##  ##  ## ##     ## ##     ## ##  ##  ##         ##  ##  ## ##     ##   ##     
   ###  ###   #######   #######   ###  ###  #######  ###  ###   #######    ##     
  `
  console.log(`%c${ascll}`, 'color:red')
  return (
    <div className="App">
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