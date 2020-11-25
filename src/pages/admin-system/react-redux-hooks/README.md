# (1) useSelector
- `const result: any = useSelector(selector: Function, equalityFn?: Function)`
- 当dispated后，select会进行 === 比较，如果不相等，就会从新执行selector函数
- equalityFn(prveState, nextState) 返回true不重新渲染

# (2) useDispatch
- `const dispatch = useDispatch()`
- 当一个使用了 dispatch 函数的回调函数传递给 ( 子组件 ) 时，需要使用 useCallback 做性能优化, 依赖数组中的依赖项就是 dispatch 函数

# (3) useStore
- `const store = useStore()`
- 获取 store 的引用
- useStore钩子要尽量少用，一般使用 useSelector 获取state
- 在要 替换store中的reducer函数时，useStore挺有用

# (4) 自定义context
- 如果你自己写了一个类似的redux，你不想自己的store和redux中的store冲突，很有用
```
import React from 'react'
import {
  Provider,
  createStoreHook,
  createDispatchHook,
  createSelectorHook
} from 'react-redux'

const MyContext = React.createContext(null)

// Export your custom hooks if you wish to use them in other files.
export const useStore = createStoreHook(MyContext)
export const useDispatch = createDispatchHook(MyContext)
export const useSelector = createSelectorHook(MyContext)

const myStore = createStore(rootReducer)

export function MyProvider({ children }) {
  return (
    <Provider context={MyContext} store={myStore}>
      {children}
    </Provider>
  )
}
```


# (5) 官方翻译：
- https://juejin.cn/post/6844903937275854856