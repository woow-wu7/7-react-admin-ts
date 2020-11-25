# (1) vw布局
- 设计稿的大小：1920 * 1080
- width = uiWidth / 1920 * 100vw
- height = ( uiHeight / 1080 ) / ( 1080 / 1920 * 100vw )
- fontSize = uiFontSize / 1920 * 100vw

# (2) useSelector
- `const result: any = useSelector(selector: Function, equalityFn?: Function)`
- 当dispated后，select会进行 === 比较，如果不相等，就会从新执行selector函数
- equalityFn(prveState, nextState) 返回true不重新渲染