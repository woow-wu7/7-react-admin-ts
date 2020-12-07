import React, {  useState } from 'react'
import { useViewport } from '@/utils/hooks/use-viewport'
import './media.scss'

const OnePx = () => {
  const { width } = useViewport()
  const [links] = useState([
    {
      name: '@media媒体查询 - 我的掘金博客',
      url: 'https://juejin.cn/post/6844904090644774926#heading-27'
    },
  ])

  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)

  return (
    <div className="interview-media">
      <p>@media媒体查询</p><br />

      <h1>当前屏幕宽度：{width} px</h1>

      <div className="media-main">
        <div className="media-main__title">切换不同屏幕大小，改变颜色</div>
      </div>


      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default OnePx