import React, { useState } from 'react'

const Em = () => {
  const [links] = useState([
    {
      name: 'GarbageCollection - 博客',
      url: 'https://juejin.cn/post/6911192116651622413'
    },
  ])
  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)
  return (
    <div className="garbage">
      <p>Garbage Collection 垃圾回收机制</p><br />
      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default Em