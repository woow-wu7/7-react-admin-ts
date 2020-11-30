import { useEffect, useReducer, useCallback } from 'react'

interface IViewportState {
  width?: number;
  height?: number;
}

interface IViewportActionn {
  type: string;
  payload: any;
}

// constant
const actionType = {
  CHANGE_VIEWPORT: 'CHANGE_VIEWPORT'
}

// reducer
const viewPortReducer = (state: IViewportState, action: IViewportActionn) => {
  switch (action.type) {
    case actionType.CHANGE_VIEWPORT:
      return {
        ...state,
        width: action.payload.width,
        height: action.payload.height,
      }
    default:
      return {
        ...state
      }
  }
}

// initialState
const initialState: IViewportState = {
  width: 0,
  height: 0,
}

// -------------------- reducer 版本 --------------------
/**
 * useViewport
 * @desc 实时获取视口的宽高
 * @param { function } doSomething 在窗口变化时，需要执行的函数
 */
export const useViewport = (doSomething?: () => void) => {
  const [state, dispatch] = useReducer(viewPortReducer, initialState)

  const changeViewport = () => {
    const HTML_DOM = document.documentElement
    const width = HTML_DOM.clientWidth
    const height = HTML_DOM.clientHeight
    dispatch({
      type: actionType.CHANGE_VIEWPORT,
      payload: { width, height }
    })
    if (doSomething) {
      doSomething()
    }
  }
  const memoryChangeViewPort = useCallback(changeViewport, [])

  useEffect(() => {
    memoryChangeViewPort()
    window.addEventListener('resize', memoryChangeViewPort, false) // 监听 resize
    return () => { window.addEventListener('resize', memoryChangeViewPort, false) }
  }, [memoryChangeViewPort])

  return {
    width: state.width,
    height: state.height,
  }
}

// -------------------- state 版本 --------------------
// export const useViewport = () => {
//   const HTML_DOM = document.documentElement
//   const [width, setWidth] = React.useState(HTML_DOM.clientWidth)
//   const [height, setHeight] = useState(HTML_DOM.clientHeight)
//   const changeWindowSize = () => {
//     const HTML_DOM_CURRENT = document.documentElement
//     setWidth(v => HTML_DOM_CURRENT.clientWidth)
//     setHeight(v => HTML_DOM_CURRENT.clientHeight)
//   }
//   useEffect(() => {
//     window.addEventListener('resize', changeWindowSize, false)
//     return () => {
//       window.removeEventListener('resize', changeWindowSize, false)
//     }
//   }, [])
//   return { width, height }
// }