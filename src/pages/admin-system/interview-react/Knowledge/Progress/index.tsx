import React, { useState } from 'react'

const Progress = () => {
  const [links] = useState([
    {
      name: 'js实现 Progress 进度条 - github源码',
      url: ''
    },
    {
      name: '纯css实现 Progress 进度条',
      url: 'https://juejin.cn/post/6844903758074216462'
    },
    {
      name: 'HTML5 <progress />标签实现',
      url: 'https://www.runoob.com/tags/tag-progress.html'
    }
  ])
  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)

  return (
    <div className="progress">
      <p>实现 Progress 进度条</p><br />
      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default Progress
