import React, { useState } from 'react'

const Em = () => {
  const [links] = useState([
    {
      name: '前端模块化 - 我的掘金博客',
      url: 'https://juejin.cn/post/6844904056557682701'
    },
  ])
  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)
  return (
    <div className="frontend-module">
      <p>前端模块化</p><br />
      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default Em