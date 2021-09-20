import ActionTypes from "./utils/actionTypes";
import warning from "./utils/warning";
import isPlainObject from "./utils/isPlainObject";

function getUndefinedStateErrorMessage(key, action) {
  const actionType = action && action.type;
  const actionDescription =
    (actionType && `action "${String(actionType)}"`) || "an action";

  return (
    `Given ${actionDescription}, reducer "${key}" returned undefined. ` +
    `To ignore an action, you must explicitly return the previous state. ` +
    `If you want this reducer to hold no value, you can return null instead of undefined.`
  );
}

function getUnexpectedStateShapeWarningMessage(
  inputState,
  reducers,
  action,
  unexpectedKeyCache
) {
  const reducerKeys = Object.keys(reducers);
  const argumentName =
    action && action.type === ActionTypes.INIT
      ? "preloadedState argument passed to createStore"
      : "previous state received by the reducer";

  if (reducerKeys.length === 0) {
    return (
      "Store does not have a valid reducer. Make sure the argument passed " +
      "to combineReducers is an object whose values are reducers."
    );
  }

  if (!isPlainObject(inputState)) {
    return (
      `The ${argumentName} has unexpected type of "` +
      {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] +
      `". Expected argument to be an object with the following ` +
      `keys: "${reducerKeys.join('", "')}"`
    );
  }

  const unexpectedKeys = Object.keys(inputState).filter(
    (key) => !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key]
  );

  unexpectedKeys.forEach((key) => {
    unexpectedKeyCache[key] = true;
  });

  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return (
      `Unexpected ${unexpectedKeys.length > 1 ? "keys" : "key"} ` +
      `"${unexpectedKeys.join('", "')}" found in ${argumentName}. ` +
      `Expected to find one of the known reducer keys instead: ` +
      `"${reducerKeys.join('", "')}". Unexpected keys will be ignored.`
    );
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach((key) => {
    const reducer = reducers[key];
    const initialState = reducer(undefined, { type: ActionTypes.INIT });
    // reducer(pervState, action) => nextState

    if (typeof initialState === "undefined") {
      throw new Error(
        `Reducer "${key}" returned undefined during initialization. ` +
          `If the state passed to the reducer is undefined, you must ` +
          `explicitly return the initial state. The initial state may ` + // explicitly 明确的
          `not be undefined. If you don't want to set a value for this reducer, ` +
          `you can use null instead of undefined.` // 初始化state不能是undefined，如果是请用null代替
      );
    }

    if (
      typeof reducer(undefined, {
        type: ActionTypes.PROBE_UNKNOWN_ACTION(),
      }) === "undefined"
    ) {
      throw new Error(
        `Reducer "${key}" returned undefined when probed with a random type. ` +
          `Don't try to handle ${ActionTypes.INIT} or other actions in "redux/*" ` +
          `namespace. They are considered private. Instead, you must return the ` +
          `current state for any unknown actions, unless it is undefined, ` +
          `in which case you must return the initial state, regardless of the ` +
          `action type. The initial state may not be undefined, but can be null.`
      );
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


// ---------------------------------------------------------------------------------------------------------------------
// combineReducers
// 参数：reducer组成的对象
// 返回值：返回一个函数，即返回 ( combination ) 函数
// 真实的调用：const store = createStore(combineReducers(totalReducers), composeWithDevTools(applyMiddleware(thunk, logger)))
export default function combineReducers(reducers) {
  // reducers是一个对象
  // const totalReducers = { app: appReducer, admin: adminReducer }
  // combineReducers(totalReducers)
  const reducerKeys = Object.keys(reducers);
  // Object.keys
  // 1. Object.keys 和 Object.getOwnPropertyNames 的区别
  // - Object.getOwnPropertyNames() ==============> 遍历 ( 所有自身属性 )，包括不可枚举属性
  // - Object.keys() =============================> 遍历自身属性，但是 ( 不包括不可枚举属性 )
  // 2. 如何声明一个对象的属性，是不可枚举的？
  // - const a = {name: 'woow_wu7'}
  // - Object.defineProperty(a, 'age', {value: 20, enumerable: false})
  // - Object.keys(a) ============================> ["name"]
  // - Object.getOwnPropertyNames(a) =============> ["name", "age"]

  const finalReducers = {}; // 如果reducer是函数，就把每个reducer拷贝到finalReducers中
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i];

    if (process.env.NODE_ENV !== "production") {
      if (typeof reducers[key] === "undefined") {
        warning(`No reducer provided for key "${key}"`);
      }
    }

    // 如果是函数就拷贝到 finalReducers
    if (typeof reducers[key] === "function") {
      finalReducers[key] = reducers[key];
    }
  }
  const finalReducerKeys = Object.keys(finalReducers); // finalReducers 对象的key 数组

  // This is used to make sure we don't warn about the same
  // keys multiple times. // 不多次警告相同的key
  let unexpectedKeyCache;
  if (process.env.NODE_ENV !== "production") {
    unexpectedKeyCache = {};
  }

  let shapeAssertionError;
  try {
    assertReducerShape(finalReducers);
    // assert 断言 assertReducerShape
    // assertReducerShape 主要是做一些reducer的检查工作，必须符合规范
  } catch (e) {
    shapeAssertionError = e;
  }


  // ---------------------------------------------------------------------------------------------------------------------
  return function combination(state = {}, action) {
    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== "production") {
      const warningMessage = getUnexpectedStateShapeWarningMessage(
        state,
        finalReducers,
        action,
        unexpectedKeyCache
      );
      if (warningMessage) {
        warning(warningMessage);
      }
    }

    let hasChanged = false;
    const nextState = {};
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i]; // key
      const reducer = finalReducers[key]; // value 对应 reducer函数
      const previousStateForKey = state[key]; // state初始化时是一个空对象，key表示reducerMap中的key
      const nextStateForKey = reducer(previousStateForKey, action); // 新的state
      if (typeof nextStateForKey === "undefined") {
        const errorMessage = getUndefinedStateErrorMessage(key, action);
        throw new Error(errorMessage);
      }

      nextState[key] = nextStateForKey;
      // 1. nextState[key] = nextStateForKey;
      // - 赋值，其实就是把总的 key --- reducer ---- state 三者关联起来
      // - 将 ( reducer-map中的key，即combineReducer中的key ) 和 ( reducer生成的state ) 一一对应，放入nextState


      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
      // 1. hasChanged = true 则 hasChanged为true
      // 2. 只要有一次nextStateForKey 和 previousStateForKey不同，就说明整个state不同，hasChanged就为true
    }
    hasChanged =
      hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
    // 如果state变化了，返回新的state (nextState)
    // 如果state没有变化，返回就的state (state)
    // 其实就是做缓存处理，来提升性能

    // 所以：
    // 1. combineReducer(rootReducer) 执行返回的是一个函数 ( combination )，返回的这个函数类型其实就是 ( reducer函数 )
    // 2. combination(state, action) 即是一个reducer函数类型，执行后返回的是 state，只不过会做缓存处理，state没变化直接返回
  };
}
