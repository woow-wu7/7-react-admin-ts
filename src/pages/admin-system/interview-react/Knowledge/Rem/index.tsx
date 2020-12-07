import React, { useState } from 'react'
import './rem.scss'

const Rem = () => {
  const [links] = useState([
    {
      name: 'Rem布局  - 我的掘金博客',
      url: 'https://juejin.cn/post/6844904090644774926#heading-34'
    },
  ])
  const handleClick = (e: React.MouseEvent) => {
    document.documentElement.style.setProperty(
      'font-size',
      `${document.documentElement.clientWidth / 750}px`  // HTML的总宽度分成750份，则1rem=设计稿上的1px
    )
  }
  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)
  return (
    <div className="rem">
      <p>Rem布局</p><br />
      <h1>！！！！请用两倍屏手机模式打开</h1>
      <div className="max-border">
        <div className="rem__test">
          <div>测试rem布局</div>
          <div>width: 200rem</div>
        </div>
        <div className="rem__test2">
          <div>对比：width=100px</div>
          <div>两倍屏，width=100px相当于设计稿的200px</div>
        </div>
      </div><br/><br/>
      <button onClick={handleClick}>点击，设置HTML的font-size为：HTML.clientWidth / 750px设计稿宽度，这样1rem = 1/750px = 设计稿每个元素的宽度，1:1关系</button>
      <br/>
      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default Rem