import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue(options) {
  if (
    process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue) // 如果 this instanceof Vue 是false的话，说明并不是通过 new命令调用的 Vue
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
  // 当 new Vue(options)时，其实就是执行了 this._init(options) 方法
  // this._init() 方法是定义在Vue.prototype上的，在 initMixin(Vue) 中挂载到原型上的
  // 在构造函数中，this指向实例
}

initMixin(Vue) // ------------------ _init
stateMixin(Vue) // ------------------ $set $delete $watch
eventsMixin(Vue) // ----------------- $on $once $off $emit
lifecycleMixin(Vue) // -------------- _update $forceUpdate $destroy
renderMixin(Vue) // ----------------- $nextTick _render
// 上面几个方法就是分别向 Vue.prototype 上添加方法
// 好处：
// 这样用不同的函数，把Vue传入，在Vue.prototype上做扩展，将扩展分散到各个函数（模块）中实现，使得逻辑清晰，好维护

export default Vue
