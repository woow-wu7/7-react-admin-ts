import { useState, MutableRefObject } from 'react'
import screenfull from 'screenfull'

type Target<T = HTMLElement> = T | null | (() => T | null) | MutableRefObject<T | null | undefined>

const useFullscreen = (target: Target) => {
  const [isFull, setIsFull] = useState(false)

  const _safeCheck = () => {
    if (!target) return
  }

  const onChange = () => {
    if (screenfull.isEnabled) {
      if (screenfull.isFullscreen) {
        // 做点什么
      } else {
        screenfull.off('change', onChange)
        // 这里注意
        // 1. 取消事件的监听函数后，本次执行的函数还是会执行，换言之，setIsFull还是会执行
        // 2. 取消事件的监听函数，只是下次在触发事件，不会在监听该事件了，换言之，就是不再执行监听函数了
      }
      setIsFull(() => true)
    }
  }

  const onFull = () => {
    _safeCheck()
    if (screenfull.isEnabled) {
      console.log('全屏')
      screenfull.request(target as HTMLElement)
      console.log(`1111`, screenfull.isFullscreen)
      screenfull.on('change', onChange)
    }
  }

  const offFull = () => {
    _safeCheck()
    if (screenfull.isEnabled) {
      console.log('退出全屏')
      screenfull.exit()
      setIsFull(() => false)
    }
  }

  const switchFull = () => (isFull ? offFull() : onFull())

  return [
    isFull,
    {
      onFull,
      offFull,
      switchFull,
    },
  ] as const
}

export { useFullscreen }
