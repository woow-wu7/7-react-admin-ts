import React, { useState } from 'react'
import './center-layout.scss'

const CenterLayout = () => {
  const [links] = useState([
    {
      name: '水平垂直居中 - 我的掘金博客',
      url: 'https://juejin.cn/post/6844904090644774926#heading-38'
    },
  ])
  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)
  return (
    <div className="center-layout">
      <p>水平垂直居中</p><br />

      <div className="max-border max-border-one">
        <div className="one__father">
          <div className="one__child">
            <h1>table-cell布局</h1>
            <h1>不知道child的宽高</h1>
            <h1>关键属性</h1>
            <h1>father: display: table-cell;</h1>
            <h1>father: vertical-align: middle;</h1>
            <h1>father: text-align: center;</h1>
            <h1>child: display: inline-block;</h1>
          </div>
        </div>
      </div>

      <div className="max-border max-border-two">
        <div className="two__father">
          <div className="two__child">
            <h1>绝对定位</h1>
            <h1>father: position: relative;</h1>
            <h1>child: position: absolute;</h1>
            <h1>child: top: 50%; left: 50%;</h1>
            <h1>child宽度未知: transform: translate(-50%, -50%);</h1>
            <h1>child宽度已知: margin: -halfHeight -halfWidth;</h1>
          </div>
        </div>
      </div>

      <div className="max-border max-border-three">
        <div className="three__father">
          <div className="three__child">
            <h1>grid布局</h1>
            <h1>father: display: grid;</h1>
            <h1>child: justify-self: center;</h1>
            <h1>child: align-self: center;</h1>
          </div>
        </div>
      </div>
      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default CenterLayout