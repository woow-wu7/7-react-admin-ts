import React, { useState } from 'react'

const FrontendRouter = () => {
  const [links] = useState([
    {
      name: '前端路由 - 我的掘金博客',
      url: 'https://juejin.cn/post/6844904054846390279'
    },
    {
      name: 'hash路由案例在 - 当前文件夹hash.html - 取消注释即可',
      url: 'https://juejin.cn/post/6844904054846390279'
    },
    {
      name: 'history路由案例在 - 当前文件夹history.html',
      url: 'https://juejin.cn/post/6844904054846390279'
    },
  ])
  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)
  return (
    <div className="frontend-router">
      <p>前端路由</p><br />
      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default FrontendRouter