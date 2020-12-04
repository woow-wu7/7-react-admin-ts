import React, { useEffect, useRef } from 'react'
import TestUseCallbackUseMemo from './test/test-usecallback-usememo'
import TestUseRef from './test/test-useRef'
import TestCustomHooks from './test/custom-hooks'
import TestUseDebounce from './test/use-debounce'
import TestUseThrottle from './test/use-throttle'
import TestUseIntersectionObserver from './test/use-intersectionObserver'
import TestUseImperativeHandle from './test/use-imperativeHandle'
import TestUseState from './test/use-state'
import TestUseFetch from './test/use-fetch'
import { useSelector } from 'react-redux';
import './react-hooks.scss'

// ceiling 效果
// 注意：实现吸顶效果用js方式，性能并不好，相比较，使用 ( css方式 positon:sticky方式简单高效得多 )
const ReactComponnet = () => {
  const scrollWrap = useSelector((state: any) => state.admin.scrollContainer) // 容器
  const refBlogLink = useRef<HTMLDivElement>(null) // ceiling元素
  const refBlogLinkReplace = useRef<HTMLDivElement>(null) // 代替元素

  useEffect(() => {
    if (scrollWrap && refBlogLink.current && refBlogLinkReplace.current) {
      const replaceDOM = refBlogLinkReplace.current
      const wrapperDOM = scrollWrap
      const scrollHandle = (e: any) => {
        if (e.target && e.target.scrollTop > 0) {
          replaceDOM.style.setProperty('display', 'block')
        } else {
          replaceDOM.style.setProperty('display', 'none')
        }
      }
      wrapperDOM.addEventListener('scroll', scrollHandle, false)
      return () => wrapperDOM.removeEventListener('scroll', scrollHandle, false)
    }
  }, [scrollWrap])

  return (
    <div className="react-hooks">
      <div ref={refBlogLink} className="ceil-dom">
        <a href="https://juejin.cn/post/6887132776512880654" target="__blank">自定义hooks博客链接</a>
      </div>

      <div ref={refBlogLinkReplace} className="replace-dom">
        <a href="https://juejin.cn/post/6887132776512880654" target="__blank">自定义hooks博客链接</a>
      </div>
      <TestUseState />
      <TestUseFetch />
      <TestUseCallbackUseMemo />
      <TestUseRef />
      <TestUseImperativeHandle />
      <TestCustomHooks />
      <TestUseDebounce />
      <TestUseThrottle />
      <TestUseIntersectionObserver />
    </div>
  )
}

export default ReactComponnet
