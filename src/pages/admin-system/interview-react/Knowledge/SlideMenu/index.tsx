import React, { useState, useEffect, useRef } from 'react'

// 滑动菜单
const SlideMenu = () => {
  const [links] = useState([
    {
      name: '滑动菜单 - bilibili',
      url: 'https://www.bilibili.com/video/BV1nT4y1M7bS?t=10'
    },
  ])

  const markerRef = useRef<HTMLDivElement>(null)
  const firstMarkerRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    // marker: 标记
    // market: 超市
    const indicator = (target: any) => {
      if (markerRef.current) {
        // offsetLeft => 每个a标签距离父元素的left差值
        // width增加4，则left减少2，就能保证居中
        markerRef.current.style.setProperty('left', `${target.offsetLeft - 5}px`);
        markerRef.current.style.setProperty('width', `${target.offsetWidth + 10}px`);
      }
    }
    // 给每个a标签绑定click事件监听函数，把当前点击的a标签的DOM即 e.target 传入
    const list = document.querySelectorAll('.slide-menu-content a')
    Array.from(list).forEach(item => {
      item.addEventListener('click', (e) => {
        indicator(e.target)
      })
    })

    // 第一个标签默认选中
    indicator(firstMarkerRef.current)
    
  }, [])
  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)
  return (
    <div className="slide-menu">
      <p>滑动菜单 - css</p><br />

      <div className="slide-menu-content-wrap">
        <div className="slide-menu-content">
          <div className="marker" ref={markerRef}></div>
          <a href="#" ref={firstMarkerRef}>地址1</a>
          <a href="#">地址2</a>
          <a href="#">地址3</a>
          <a href="#">地址4</a>
          <a href="#">地址5</a>
          <a href="#">地址6</a>
          <a href="#">地址7</a>
          <a href="#">地址8</a>
          <a href="#">地址9</a>
        </div>
      </div>

      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default SlideMenu