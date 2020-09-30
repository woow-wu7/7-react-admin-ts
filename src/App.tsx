import React from 'react';
import Router from '../src/router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actions from './app.action'

function App() {
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

const mapDispatchToProps = (payload: any) => {
  return bindActionCreators(actions, payload)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
