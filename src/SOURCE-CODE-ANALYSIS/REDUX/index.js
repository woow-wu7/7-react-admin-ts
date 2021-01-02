import createStore from './createStore'
import combineReducers from './combineReducers'
import bindActionCreators from './bindActionCreators'
import applyMiddleware from './applyMiddleware'
import compose from './compose' // 以上是redux暴露的几个api
import warning from './utils/warning'
import __DO_NOT_USE__ActionTypes from './utils/actionTypes'

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */
function isCrushed() {} // crushed是压坏，压碎的意思

if (
  process.env.NODE_ENV !== 'production' &&
  typeof isCrushed.name === 'string' &&
  isCrushed.name !== 'isCrushed' // 压缩后name会被修改成更短的名字，达到压缩的目的
) {
  warning(
    'You are currently using minified code outside of NODE_ENV === "production". ' +
      'This means that you are running a slower development build of Redux. ' +
      'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' +
      'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' +
      'to ensure you have the correct code for your production build.'
  )
}

// redux最终暴露以下api
export {
  createStore,
  combineReducers,
  bindActionCreators,
  applyMiddleware,
  compose,
  __DO_NOT_USE__ActionTypes
}
