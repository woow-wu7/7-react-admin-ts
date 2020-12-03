import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
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


interface ITitle {
  borderColor?: string;
  backgroundColor?: string;
  [propName: string]: any;
}


const ReactComponnet = () => {
  const scrollWrap = useSelector((state: any ) => state.admin.scrollContainer) // 容器
  const refBlogLink = useRef<HTMLDivElement>(null) // ceiling元素
  const refBlogLinkReplace = useRef<HTMLDivElement>(null) // 代替元素



  useEffect(() => {

    if (scrollWrap && refBlogLink.current && refBlogLinkReplace.current) {
      const ceilDOM = refBlogLink.current
      const replaceDOM = refBlogLinkReplace.current
      const wrapperDOM = scrollWrap

      const scrollHandle = (e: any) => {
        console.log(e.target.scrollTop);
        console.log(ceilDOM.offsetTop);

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

const UseStateCopmonnet = styled.div`
    background: #fff;
    margin: 10px 0;
  `

const Title = styled.div`
    display: inline-block;
    padding: 10px 30px;
    margin-bottom: 30px;
    background: ${(props: ITitle) => props.backgroundColor};
    border: 1px solid ${(props: ITitle) => props.borderColor};
    border-radius: 2px;
  }
  `

const LinkOther = styled(UseStateCopmonnet)`
  margin-top: 10px;
`


const UseFetchComponent = styled(UseStateCopmonnet)`
  
`


export default ReactComponnet
