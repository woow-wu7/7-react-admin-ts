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
      <p>一些动画</p><br/>
      <div className="animates__main1">
        <div className="animates__wave">点击冲击波</div>
        <div className="animates__wave2">冲击波</div>
        <div className="animates__3">hover</div>
      </div>
      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default Triangle
