import React, { useEffect, useRef } from 'react'
import { useFullscreen } from '@/utils/hooks/use-fullscreen'

const InterviewFullscreen = () => {
  const ref = useRef<any>()
  const [ifFull, { onFull, offFull, switchFull }] = useFullscreen(ref.current)

  useEffect(() => {
    window.addEventListener('click', test, false)
  }, [])

  const test = () => {
    setInterval(() => console.log(`1`, 1), 2000)
  }

  const cancelEvent = () => {
    window.removeEventListener('click', test, false)
  }

  const renderFull = () => (
    <div ref={ref} style={{ background: '#fff' }}>
      <p>useFullscreen</p>
      <button onClick={onFull}>onFull</button>
      <button onClick={offFull}>offFull</button>
      <button onClick={switchFull}>toggleFull</button>
      <div>
        <p>这是需要全屏的内容</p>
        <div>是否全屏: {`${ifFull}`}</div>
        <ul>
          <li>这是需要全屏的内容</li>
          <li>这是需要全屏的内容</li>
          <li>这是需要全屏的内容</li>
          <li>这是需要全屏的内容</li>
        </ul>
      </div>
    </div>
  )

  const renderRemoveEvent = () => (
    <div>
      <button onClick={cancelEvent}>点击取消监听，本次监听函数中的代码还会执行吗？</button>
      <div>结论：取消监听，表示再次触发事件，不会再执行监听函数了，但是之前在执行的函数还是会执行</div>
    </div>
  )

  return (
    <div>
      {renderFull()}
      {renderRemoveEvent()}
    </div>
  )
}

export default InterviewFullscreen
