import React, { useState } from 'react'

const VisibilityDisplay = () => {
  const [links] = useState([
    {
      name: 'visibility:hidden和display:node的区别 - 我的掘金博客',
      url: 'https://juejin.cn/post/6844904090644774926#heading-25'
    },
  ])
  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)

  return (
    <div className="visibility_display">
      <p>visibility:hidden; display:none 两者的区别</p>

      <div>
        <h2>visibility: hidden;隐藏后，会占据原来的位置</h2>
        <h2>display: none;隐藏后不会占据原来的位置</h2>
        <h2>注意：他们都会在DOM节点中，只是通过css方式隐藏，任然在DOM树中</h2>
        <div style={{ visibility: 'hidden' }}>隐藏了</div>
        <div style={{ display: 'none' }}>隐藏了</div>
      </div>
      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default VisibilityDisplay
