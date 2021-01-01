import $$observable from "symbol-observable";

import ActionTypes from "./utils/actionTypes";
import isPlainObject from "./utils/isPlainObject";

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 * - 创建一个redux store, 用来保存 state
 * - 改变redux中state的唯一方式就是：使用 dispatch() 函数
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 * - 一个app中只能有一个 store
 * - 你可以通过 combineReducers() 将多个reducer合并成一个总的reducer
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 * - reducer(prevState, action) => newState
 * - reducer 函数接收一个 旧的state 和 action，返回一个新的state
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 * - 初始化state, 初始化整个store
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 * - enhancer() 增强器
 * - 1. 可以在 ( dispatch ) 一个 ( action ) 到达 ( reducer ) 之前做一些增强处理
 * - 2. 比如：打印日志，dispatch一个函数
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 * - 返回一个store
 */

// createStore
// createStore(reducer, preloadedState, enhancer)
// 分析
// 1. enhancer不存在
//      - 就返回内部定义的store对象，具有 dispatch getState subscribe replaceReducer observable
// 2. enhancer存在
//      - 并且是函数，返回  enhancer(createStore)(reducer, preloadedState)
// 3. enhancer()
//      - enhancer在真实项目中，一般代表 applyMiddleware()
//      - applyMiddleware 调用签名是： (...middlewares) => (createStore) => (...args) => ({...store, dispath})
//      - applyMiddleware(logger, thunk)返回值是： (createStore) => (...args) => ({...store, dispath})
// 4. createStore(combineReducers(), applyMiddleware(logger, thunk))
//      - 返回值 enhancer(createStore)(reducer, preloadedState)
//      - 调用过程
//      - 1. (createStore) => (...args) => ({...store, dispath}) 传入的两层参数分别是 ( createStore ) 和 ( reducer, preloadedState )
//      - 2. (reducer, preloadedState) => ({...store, dispatch}) 调用该函数
//      - 3. (reducer, preloadedState) 这两个参数会作为 createStore(reducer, preloadedState)来生成store
//      - 4. 最终返回 { ...store, dispatch }

// ------------------------------------------------------------------------- createStore函数
export default function createStore(reducer, preloadedState, enhancer) {
  if (
    (typeof preloadedState === "function" && typeof enhancer === "function") ||
    (typeof enhancer === "function" && typeof arguments[3] === "function")
  ) {
    throw new Error(
      "It looks like you are passing several store enhancers to " +
        "createStore(). This is not supported. Instead, compose them " +
        "together to a single function."
    );
  }

  if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
    enhancer = preloadedState;
    preloadedState = undefined;
    // 如果: 第二个参数preloadedState是一个函数，第三个参数enhancer是undefined，
    // 即: 只传入了两个参数的情况
    // 则: 把第二个参数赋值给第三个参数，把第二个参数设置成undefined
  }

  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      // 如果: enhancer 参数存在，但是不是function的话就报错
      // 说明: enhancer 只能是函数
      throw new Error("Expected the enhancer to be a function.");
    }
    // enhancer 是函数时, 很明显是一个高阶函数
    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== "function") {
    throw new Error("Expected the reducer to be a function.");
  }

  let currentReducer = reducer; // 缓存reducer, reducer是传入createStore()的参数
  let currentState = preloadedState; // 缓存preloadedState，preloadedState是传入的参数
  let currentListeners = []; // 新建 监听者数组
  let nextListeners = currentListeners; // 赋值，即两个变量指向同一个堆地址，修改相互影响，注意区分赋值，浅拷贝，深拷贝

  let isDispatching = false; // 表示为，表示是否在dispatch过程中
  // isDispatching 初始值为false
  // isDispatching
  // true：在dispatch()中调用reducer()前isDispatching会被修改为true
  // false：更新完state后isDispatching会被修改为false

  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
      // 做一层浅拷贝
      // 当两个对象的属性值是基本类型的数据时，修改互不影响
      // 注意区分赋值，浅拷贝，深拷贝的区别
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */

  // ------------------------------------------------------------------------- getState函数
  function getState() {
    if (isDispatching) {
      // 在dispatch过程中就报错
      throw new Error(
        "You may not call store.getState() while the reducer is executing. " +
          "The reducer has already received the state as an argument. " +
          "Pass it down from the top reducer instead of reading it from the store."
      );
    }

    return currentState; // 直接返回 currentState
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */

  // ------------------------------------------------------------------------- subscribe函数
  // subscribe(listener)
  // 参数
  // 1. listener 监听函数
  // 返回值
  // 1. 返回 unsubscribe 函数，用于取消订阅
  function subscribe(listener) {
    if (typeof listener !== "function") {
      // listener必须是一个函数
      throw new Error("Expected the listener to be a function.");
    }

    if (isDispatching) {
      // 在dispatch过程中报错
      // 在执行dispatch过程中，不允许subscribbr
      throw new Error(
        "You may not call store.subscribe() while the reducer is executing. " +
          "If you would like to be notified after the store has been updated, subscribe from a " +
          "component and invoke store.getState() in the callback to access the latest state. " +
          "See https://redux.js.org/api-reference/store#subscribelistener for more details."
      );
    }

    let isSubscribed = true; // 表示位，是否被订阅

    ensureCanMutateNextListeners(); // 确保listeners数组可以被mutate，即做一个浅拷贝
    nextListeners.push(listener); // 将参数listener函数push进nextListeners数组

    return function unsubscribe() {
      // 返回一个unsubscribe 取消订阅的函数
      if (!isSubscribed) {
        return; // 没有被订阅过，直接返回
      }

      if (isDispatching) {
        // 在dispatch()执行时，不能取消订阅
        // 因为idispatch(action)主要做两件事情
        // 1. 将action传递给reducer纯函数，去更新state
        // 2. state更新之后，去执行监听数组中的所有监听函数
        throw new Error(
          "You may not unsubscribe from a store listener while the reducer is executing. " +
            "See https://redux.js.org/api-reference/store#subscribelistener for more details."
        );
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      const index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1); // 从nextListeners中删除该 listener
      currentListeners = null; // 并重置 currentListeners
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */

  // ------------------------------------------------------------------------- dispatch函数
  // dispatch(actoin)
  // 参数
  // 1. action对象必须是一个纯对象 plainObject
  // 2. action纯对象中必须要有 type 属性
  // 返回值
  // 1. dispath函数返回传入的参数，即返回一个action
  // 主要作用
  // 1. 将 action 纯对象(plainObject)传递给 reducer纯函数，reducer纯函数负责更新state
  // 2. reducer更新state后，遍历监听数组中的所有监听函数，比如更新页面等
  function dispatch(action) {
    if (!isPlainObject(action)) {
      // 不是纯对象，就报错
      // 1. 纯对象是必须通过对象字面量声明的对象 或者 通过构造函数声明的对象，即 {} 或者 new Object() 生成的对象
      // 2. 数组，Date对象，Regexp对象，Error对象，Function对象等都不是纯对象
      // 3. 这里action不是对象就抛错，如果不是对象，可能是个函数，比如异步提交的函数，就需要通过redux中间件处理
      throw new Error(
        "Actions must be plain objects. " +
          "Use custom middleware for async actions."
      );
    }

    // action纯对象中，必须要有 type 属性
    if (typeof action.type === "undefined") {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
          "Have you misspelled a constant?"
      );
    }

    if (isDispatching) {
      // 在 dispatch 过程中
      throw new Error("Reducers may not dispatch actions.");
    }

    try {
      isDispatching = true; // 标志位置为true
      currentState = currentReducer(currentState, action); // 调用reducer函数，接收currentState和action，返回nextState
    } finally {
      isDispatching = false; // 执行完reducer函数，则将是否正在dipathing的标志位改为 false
    }

    const listeners = (currentListeners = nextListeners);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
      // 当执行reducer函数，更新state之后，执行监听数组listeners数组中的所有监听函数
    }

    return action;
    // dispatch函数最终返回 action对象
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */

  // ------------------------------------------------------------------------- replaceReducer
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== "function") {
      throw new Error("Expected the nextReducer to be a function.");
    }

    currentReducer = nextReducer; // 直接赋值传入的新的nextReducer

    // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.
    dispatch({ type: ActionTypes.REPLACE });
    // 触发内置的replace事件
    // 即执行dispatch()方法，action是 { type: ActionTypes.REPLACE }
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  // ------------------------------------------------------------------------- observable函数
  function observable() {
    const outerSubscribe = subscribe;
    return {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(observer) {
        if (typeof observer !== "object" || observer === null) {
          throw new TypeError("Expected the observer to be an object.");
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        const unsubscribe = outerSubscribe(observeState);
        return { unsubscribe };
      },

      [$$observable]() {
        return this;
      },
    };
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable,
  };
}
