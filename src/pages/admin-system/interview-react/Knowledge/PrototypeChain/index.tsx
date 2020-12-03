import React, { useState } from 'react'

const PrototypeChain = () => {
  const [links] = useState([
    {
      name: '原型链 - 我的掘金博客',
      url: 'https://juejin.cn/post/6844904048873701389'
    },
  ])
  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)

  return (
    <div className="prototype-chain">
      <p>原型链</p>
      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default PrototypeChain
