import React, { useState } from 'react'
import './ellipsis.scss'

const Ellipsis = () => {
  const [links] = useState([
    {
      name: '单行省略号和多行省略号  - 我的掘金博客',
      url: 'https://juejin.cn/post/6844904090644774926#heading-39'
    },
  ])

  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)
  return (
    <div className="ellipsis">
      <p>单行省略号和多行省略号</p><br />

      {/* 单行省略号 */}
      <div className="max-border">
        <h1>单行省略号</h1>
        <div className="ellipsis__single">
          验证单行省略号验证单行省略号验证单行省略号
        </div><br /><br />
        <h1>关键属性</h1>
        <h1>overflow: hidden;</h1>
        <h1>text-overflow: ellipsis;</h1>
        <h1>white-space: nowrap;</h1>
      </div>

      {/* 多行省略号 */}
      <div className="max-border">
        <h1>多行省略号</h1>
        <div className="ellipsis__many">
          验证多行省略号验证多行省略号验证多行省略号验证多行省略号验证多行省略号验证多行省略号验证多行省略号
          验证多行省略号验证多行省略号验证多行省略号验证多行省略号验证多行省略号验证多行省略号验证多行省略号
        </div><br/><br/>
        <h1>关键属性</h1>
        <h1>overflow: hidden;</h1>
        <h1>display: -webkit-box;</h1>
        <h1>-webkit-box-orient: vertical;方向</h1>
        <h1>-webkit-line-clamp: 6;行数</h1>
      </div>
      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default Ellipsis