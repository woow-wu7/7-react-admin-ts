import React, { useState } from 'react'
import './layouts.scss'

const Layouts = () => {
  const [links] = useState([
    {
      name: '双栏布局, 三栏布局 - 我的掘金博客',
      url: 'https://juejin.cn/post/6844904090644774926#heading-42'
    },
  ])
  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)
  return (
    <div className="layouts">
      <p>双栏布局</p><br />
      {/* float */}
      <div className="max-border">
        <div className="float-left"></div>
        <div className="float-right">
          <h1>float</h1>
          <h1>left: width: 100px;</h1>
          <h1>left: float: left</h1>
          <h1>right: 无需做任何设置</h1>

        </div>
      </div>
      {/* absolute */}
      <div className="max-border">
        <div className="absolute-left"></div>
        <div className="absolute-right">
          <h1>绝对定位</h1>
          <h1>left: width: 100px;</h1>
          <h1>left: height: 100%;</h1>
          <h1>right: position: absolute;</h1>
          <h1>right: left: 100px;</h1>
          <h1>right: top: 0; right: 0;bottom: 0;</h1>
        </div>
      </div>
      {/* flex */}
      <div className="max-borderx">
        <div className="max-border-inner">
          <div className="flex__left"></div>
          <div className="flex__right">
            <h1>flex</h1>
            <h1>container: display: flex;</h1>
            <h1>left: flex: 0 0 100px; width: 100px;</h1>
            <h1>right: flex: 1</h1>
          </div>
        </div>
      </div>
      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default Layouts