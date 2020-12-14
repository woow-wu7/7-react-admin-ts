import React, { useRef } from 'react'
import { useViewport } from '@/utils/hooks/use-viewport'
import './smart-viewport.scss'

const SmartViewport = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { width, height } = useViewport(doAnimate)

  const debounce = (delay: number) => {
    let timer = 0;
    return () => {
      if (timer) {
        window.clearTimeout(timer)
      }
      timer = window.setTimeout(() => {
        if (ref.current) {
          ref.current.style.display = 'none'
        }
      }, delay)
    }
  }

  function doAnimate() {
    if (ref.current) {
      ref.current.style.display = 'block'
    }
    const debounceClosure = debounce(2000)
    debounceClosure()
  }

  return (
    <div className="smart-viewport" ref={ref}>
      <span>wdith: {`${width}px`}</span>
      <span>height: {`${height}px`}</span>
    </div>
  )
}

export default SmartViewport
