import React, { useState, useEffect } from 'react'

const ProiseManual = () => {
  const [links] = useState([
    {
      name: '手写Promise - 我的掘金',
      url: 'https://juejin.cn/post/6844903823429861389'
    },
  ])

  useEffect(() => {
    // 手写Promise
  })

  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)
  return (
    <div className="promise-manual">
      <p>手写promise</p>

      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default ProiseManual
