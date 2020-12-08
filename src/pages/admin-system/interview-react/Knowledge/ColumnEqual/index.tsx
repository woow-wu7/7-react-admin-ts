import React, { useState } from 'react'
import './column-equal.scss'

const ColumnEqual = () => {
  const [links] = useState([
    {
      name: '多列等高布局 - 掘金博客',
      url: 'https://juejin.cn/post/6844904082562367501'
    },
  ])
  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)
  return (
    <div className="column-equal">
      <p>多列等高布局</p><br />

      <div className="max-border max-border-one">
        {/* flex方式 */}
        <div className="max-border-flex">
          <div>多列等高布局</div>
          <div>多列等高布局,多列等高布局</div>
          <div>多列等高布局,多列等高布局,多列等布局</div>
          <div>多列等高布局,多列等高布局,多列等高列等高布局</div>
        </div>
      </div>
      <div className="max-border max-border-two">
        {/* float + margin padding */}
        <div className="max-border-float">
          <div>多列等高布局</div>
          <div>多列等高布局,多列等高布局</div>
          <div>多列等高布局,多列等高布局,多列等布局</div>
          <div>多列等高布局,多列等高布局,多列等高列等高布局,多列等高列等高布局</div>
        </div>
      </div>
      <div className="max-border max-border-three">
        {/* table-ceil 布局*/}
        <div className="max-border-table">
          <div>多列等高布局</div>
          <div>多列等高布局,多列等高布局</div>
          <div>多列等高布局,多列等高布局,多列等布局</div>
          <div>多列等高布局,多列等高布局,多列等高列等高布局,多列等高列等高布局,多列等高列等高布局,多列等高列等高布局</div>
        </div>
      </div>
      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default ColumnEqual
