import React, { useRef } from 'react'
import { useViewport } from '@/utils/hooks/use-viewport'
import './smart-viewport.scss'

const SmartViewport = () => {
  const ref = useRef<HTMLDivElement>(null)
  const timerRef = useRef<any>(0)
  const { width, height } = useViewport(doAnimate)

  const debounce = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
    }
    timerRef.current = window.setTimeout(() => {
      if( ref.current) {
        ref.current.style.display = 'none'
      }
    }, 2000)
  }

  function doAnimate() {
    if (ref.current) {
      ref.current.style.display = 'block'
    }
    debounce()
  }

  return (
    <div className="smart-viewport" ref={ref}>
      <span>wdith: {`${width}px`}</span>
      <span>height: {`${height}px`}</span>
    </div>
  )
}

export default SmartViewport
