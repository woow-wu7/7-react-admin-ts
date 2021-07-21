import React, { useEffect, useRef } from 'react'
import './smart-progress.scss'

interface WIProps {
  scrollRef: HTMLDivElement
  option: WIoption
}

interface WIoption {
  height: string
  background: string
}

/**
 * @desc FC SmartProgress
 * @param {DOM} scrollRef 传入的具有滚动条的，需要监听的DOM元素
 * @param {object} option 配置对象，设置progress的 width height
 * @desc 不引入该组件，不会监听，即不会出现 progress bar
 */
const SmartProgress: React.FC<WIProps> = ({ scrollRef, option: { background, height } }) => {
  const refProgress = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const { scrollTop, clientHeight, scrollHeight } = scrollRef
      const totalWidth = scrollHeight - clientHeight
      const currentWidth = scrollTop
      refProgress.current?.style?.setProperty('width', `${(currentWidth / totalWidth) * 100}%`)
      refProgress.current?.style?.setProperty('background', `${background}`)
      refProgress.current?.style?.setProperty('height', `${height}`)
    }

    scrollRef.addEventListener('scroll', handleScroll, false)
    return () => scrollRef.removeEventListener('scroll', handleScroll, false)
  }, [background, height, scrollRef])

  return <div className="smart-progress" ref={refProgress} />
}

export default SmartProgress
