/* @flow */

import config from '../config'
import Watcher from '../observer/watcher'
import Dep, { pushTarget, popTarget } from '../observer/dep'
import { isUpdatingChildComponent } from './lifecycle'

import { set, del, observe, defineReactive, toggleObserving } from '../observer/index'

import {
  warn,
  bind,
  noop,
  hasOwn,
  hyphenate,
  isReserved,
  handleError,
  nativeWatch,
  validateProp,
  isPlainObject,
  isServerRendering,
  isReservedAttribute,
} from '../util/index'

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop,
}

export function proxy(target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

export function initState(vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe((vm._data = {}), true /* asRootData */)
  }

  // computed计算属性，如果传入的new Vue(options)的  ( options ) 中具有 ( computed ) 属性，就执行 initComputed
  if (opts.computed) initComputed(vm, opts.computed)

  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}

function initProps(vm: Component, propsOptions: Object) {
  const propsData = vm.$options.propsData || {}
  const props = (vm._props = {})
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  const keys = (vm.$options._propKeys = [])
  const isRoot = !vm.$parent
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false)
  }
  for (const key in propsOptions) {
    keys.push(key)
    const value = validateProp(key, propsOptions, propsData, vm)
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      const hyphenatedKey = hyphenate(key)
      if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
        warn(`"${hyphenatedKey}" is a reserved attribute and cannot be used as component prop.`, vm)
      }
      defineReactive(props, key, value, () => {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            `Avoid mutating a prop directly since the value will be ` +
              `overwritten whenever the parent component re-renders. ` +
              `Instead, use a data or computed property based on the prop's ` +
              `value. Prop being mutated: "${key}"`,
            vm
          )
        }
      })
    } else {
      defineReactive(props, key, value)
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, `_props`, key)
    }
  }
  toggleObserving(true)
}

function initData(vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {}
  if (!isPlainObject(data)) {
    data = {}
    process.env.NODE_ENV !== 'production' &&
      warn(
        'data functions should return an object:\n' +
          'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
        vm
      )
  }
  // proxy data on instance
  const keys = Object.keys(data)
  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  while (i--) {
    const key = keys[i]
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(`Method "${key}" has already been defined as a data property.`, vm)
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' &&
        warn(`The data property "${key}" is already declared as a prop. ` + `Use prop default value instead.`, vm)
    } else if (!isReserved(key)) {
      proxy(vm, `_data`, key)
    }
  }
  // observe data
  observe(data, true /* asRootData */)
}

export function getData(data: Function, vm: Component): any {
  // #7573 disable dep collection when invoking data getters
  pushTarget()
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, `data()`)
    return {}
  } finally {
    popTarget()
  }
}

const computedWatcherOptions = { lazy: true }

// 计算属性的初始化
function initComputed(vm: Component, computed: Object) {
  // $flow-disable-line
  const watchers = (vm._computedWatchers = Object.create(null))
  // 1. 将 watchers 和 vm._computedWatchers 声明成一个 空对象
  // 2. 注意这个空对象是通过 Object.create(null) 生成的，即 ( 不继承任何属性和方法 )

  // computed properties are just getters during SSR
  const isSSR = isServerRendering()
  // 是否是 SSR 环境

  /***
   *
    Computed
    1. 这里先复习 computed 的用法
      computed: {
        reversedMessage: function () {
          return this.message.split('')
        }
      }
      - 这里computed是一个对象
      - key是reversedMessage
      - value是一个函数，这个函数将会作为 vm.reversedMessage 的 ( getter ) 函数
    2. computed 的特点
      - computed计算属性，只有在computed定义的计算属性 ( 被访问时才会去计算 )，如果没有任何地方访问到计算属性，则不会去计算
      - computed计算属性具有 ( 缓存功能 )
      - computed的 ( 依赖项必须是响应式数据 )，不然即使依赖发生变化，也不会触发computed重新计算，依赖比如是data，computed
      - 即使computed是响应式数据，并且依赖也变化了，但是最终计算的结果没有变化，也不会重新渲染

   *
   */
  for (const key in computed) {
    const userDef = computed[key]

    const getter = typeof userDef === 'function' ? userDef : userDef.get
    // getter
    // 1. ( getter ) 可以是一个 ( 函数 ) 或者 ( 具有get属性方法的对象 )
    // 2. 这里一般都是函数，并且该函数需要return一个值

    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(`Getter is missing for computed property "${key}".`, vm)
      // 如果不是函数或者对象就报警告
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions)
      // 非ssr环境，即浏览器环境，就新建 computed watcher
      // computed watcher
      // computedWatcherOptions = { lazy: true }
      // getter = 用户自定义的computed对象中的函数
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef)
      // defineComputed 将 computed 变成响应式
    } else if (process.env.NODE_ENV !== 'production') {
      // 处理重名的情况，在props,data,computed不能用重名的key
      if (key in vm.$data) {
        warn(`The computed property "${key}" is already defined in data.`, vm)
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(`The computed property "${key}" is already defined as a prop.`, vm)
      }
    }
  }
}

// defineComputed 将 computed 变成响应式
export function defineComputed(target: any, key: string, userDef: Object | Function) {
  const shouldCache = !isServerRendering()
  // shouldCache 如果在浏览器环境就是 true

  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key) // 定义computed被访问时，触发的get
      : createGetterInvoker(userDef)
    sharedPropertyDefinition.set = noop
  } else {
    // userDef 不是 function，我们直接忽略，暂不分析
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop
    sharedPropertyDefinition.set = userDef.set || noop
  }
  if (process.env.NODE_ENV !== 'production' && sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(`Computed property "${key}" was assigned to but it has no setter.`, this)
    }
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
  // 定义响应式 computed
  // 1. 当通过 this.xxxx 访问computed，就会触发 sharedPropertyDefinition 对象中的 get
  // 2. get 其实就是下面createComputedGetter返回的 computedGetter 函数
}

function createComputedGetter(key) {
  return function computedGetter() {
    const watcher = this._computedWatchers && this._computedWatchers[key]
    // this._computedWatchers[key] => 取出每一个 computed watcher

    if (watcher) {
      if (watcher.dirty) {
        // watcher.dirty
        // 1. 默认初始化时，comoputed watcher 的 dirty=true
        // 2. 当 dirty=true 就会执行 watcher.evaluate()
        // 3. watcher.evaluate() 执行完后， dirty=false
        // 总结：  dirty=true => watcher.evaluate() => dirty=false

        watcher.evaluate()
        // 1. evaluate
        // evaluate() {
        //   this.value = this.get()
        //   this.dirty = false
        // }

        // 2. watcher.get()
        // get() {
        //   pushTarget(this)
        //   let value
        //   const vm = this.vm
        //   try {
        //     value = this.getter.call(vm, vm)
        //   } catch (e) {
        //     if (this.user) {
        //       handleError(e, vm, `getter for watcher "${this.expression}"`)
        //     } else {
        //       throw e
        //     }
        //   } finally {
        //     // "touch" every property so they are all tracked as
        //     // dependencies for deep watching
        //     if (this.deep) {
        //       traverse(value)
        //     }
        //     popTarget()
        //     this.cleanupDeps()
        //   }
        //   return value
        // }

        // watcher.evaluate()
        // 1. 会去执行 computed watcher 中的 get()
        // pushTarget(this)
        // 1. 将 computed watcher 添加到  targetStack 数组中
        // 2. 将 Dep.target = computed watcher
        // 执行 this.getter.call(vm, vm) 即用户自定义的 computed对象中的方法
        // 1. 列如： computed: {newName() {return this.name + 'new' }}
        // 2. 因为：computed的newName方法中，依赖了data中的this.name，即访问到了this.name就会触发data响应式的get方法
        // 3. 所以：ata响应式的get方法执行过程如下
        // 获取到了this.name的值
        // 此时，Dep.target 是computed watcher
        // 然后执行this.name对象的dep类的depend方法进行依赖收集
        // 向 computed watcher 的newDeps中添加render watcher的dep
        // 向 render watcher 的 subs 中添加 computed watcher
        //  popTarget()
        // 1. targetStack.pop()将 computed watcher从targetStack数组中删除
        // 2. 并且将 Dep.target 指定为数组中的前一个 watcher，没有了就是undefined
        // 2. 将 dirty=false
      }
      if (Dep.target) {
        watcher.depend()
        // 1
        // depend() {
        //   let i = this.deps.length
        //   while (i--) {
        //     this.deps[i].depend()
        //   }
        // }

        // 2
        // depend() {
        //   if (Dep.target) {
        //     Dep.target.addDep(this)
        //   }
        // }
      }
      return watcher.value
      // 返回计算属性的值，因为在watcher中计算得到的value会赋值给 watcher.value
      // this.dirty = true 就会重新计算computed
      // this.dirty = false 则会直接返回 watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter() {
    return fn.call(this, this)
  }
}

function initMethods(vm: Component, methods: Object) {
  const props = vm.$options.props
  for (const key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof methods[key] !== 'function') {
        warn(
          `Method "${key}" has type "${typeof methods[key]}" in the component definition. ` +
            `Did you reference the function correctly?`,
          vm
        )
      }
      if (props && hasOwn(props, key)) {
        warn(`Method "${key}" has already been defined as a prop.`, vm)
      }
      if (key in vm && isReserved(key)) {
        warn(
          `Method "${key}" conflicts with an existing Vue instance method. ` +
            `Avoid defining component methods that start with _ or $.`
        )
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm)
  }
}

function initWatch(vm: Component, watch: Object) {
  for (const key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}

function createWatcher(vm: Component, expOrFn: string | Function, handler: any, options?: Object) {
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  return vm.$watch(expOrFn, handler, options)
}

export function stateMixin(Vue: Class<Component>) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  const dataDef = {}
  dataDef.get = function () {
    return this._data
  }
  const propsDef = {}
  propsDef.get = function () {
    return this._props
  }
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function () {
      warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this)
    }
    propsDef.set = function () {
      warn(`$props is readonly.`, this)
    }
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef)
  Object.defineProperty(Vue.prototype, '$props', propsDef)

  Vue.prototype.$set = set
  Vue.prototype.$delete = del

  Vue.prototype.$watch = function (expOrFn: string | Function, cb: any, options?: Object): Function {
    const vm: Component = this
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {}
    options.user = true
    const watcher = new Watcher(vm, expOrFn, cb, options)
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value)
      } catch (error) {
        handleError(error, vm, `callback for immediate watcher "${watcher.expression}"`)
      }
    }
    return function unwatchFn() {
      watcher.teardown()
    }
  }
}
