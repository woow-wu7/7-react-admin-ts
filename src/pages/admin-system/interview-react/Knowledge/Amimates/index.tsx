import React, { useState } from 'react'

const Triangle = () => {
  const [links] = useState([
    {
      name: '一些动画 - 我的掘金博客',
      url: 'https://juejin.cn/post/6844904090644774926#heading-24'
    },
  ])
  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)

  return (
    <div className="animates">
      <p>一些动画</p><br />
      <div className="animates__main1">
        <div className="animates__wave">点击冲击波</div>
        <div className="animates__wave2">冲击波</div>
        <div className="animates__3">hover</div>
        {/* hover动画2 */}
        {/* 主要就是利用了子元素的z-index高于伪类，然后做transition的width动画 */}
        <div className="animates__5">
          <div className="animates-in">
            <div className="animates-in-text">hover</div>
          </div>
        </div>
        <div className="animates__4">
          <div className="animates-wave-wrap">
            <div className="wave1"></div>
            <div className="wave2"></div>
            <div className="wave3"></div>
          </div>
        </div>

      </div>
      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default Triangle
