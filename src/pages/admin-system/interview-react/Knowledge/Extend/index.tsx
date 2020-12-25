import React, { useState } from 'react'

const Em = () => {
  const [links] = useState([
    {
      name: '继承 - 我的掘金博客',
      url: 'https://juejin.cn/post/6844904050895372295#heading-0'
    },
  ])
  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)
  return (
    <div className="extend">
      <p>继承</p><br />
      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default Em