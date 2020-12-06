import React, { useEffect, useState } from 'react'
import './one-px.scss'

const OnePx = () => {
  const [devicePixelRadio, setDevicePixelRadio] = useState(0)
  const [links] = useState([
    {
      name: '移动端1px物理像素边框 - 我的掘金博客',
      url: 'https://juejin.cn/post/6844904090644774926#heading-37'
    },
  ])
  useEffect(() => {
    setDevicePixelRadio(() => window.devicePixelRatio)
  }, [])
  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)

  return (
    <div className="one-px">
      <p>移动端1px物理像素边框</p><br />

      <h1>当前屏幕像素比：{devicePixelRadio}</h1>
      <h1>2倍屏缩放：transform: scaleY(.5)</h1>
      <h1>3倍屏缩放：transform: scaleY(.333)</h1>
      <h1>!!!!! 请用手机模式打开</h1>

      <div className="max-border">
        <div className="one-px-box">1px物理像素</div>
        <div className="one-px-box-not">非1px物理像素</div>
      </div>

      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default OnePx