import React, { useState } from 'react'

const Progress = () => {
  const [links] = useState([
    {
      name: 'js实现 Progress 进度条 - github源码链接',
      url: 'https://github.com/woow-wu7/7-react-admin-ts/blob/master/src/components/SmartProgress/index.tsx'
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
        <h1>js方式实现</h1>
        <h1>实时进度条宽度( 百分比 )：(target.scrollTop/(target.scrollHeight - target.clientHeight))px;</h1>
        <h1>滚动了的宽度：target.scrollTop</h1>
        <h1>需要滚动的宽度：target.scrollTop</h1>
      </div>

      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default Progress
