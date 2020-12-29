import React, { useState } from 'react'

const Em = () => {
  const [links] = useState([
    {
      name: '观察者模式 和 发布订阅模式 - 我的掘金博客',
      url: 'https://juejin.cn/post/6844904058604486663#heading-0'
    },
  ])
  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)
  return (
    <div className="observer">
      <p>观察者模式 和 发布订阅模式</p><br />
      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default Em