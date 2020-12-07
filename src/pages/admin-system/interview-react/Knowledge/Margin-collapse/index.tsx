import React, { useState } from 'react'
import './margin-collapse.scss'

const MarginCollapse = () => {
  const [links] = useState([
    {
      name: 'margin-collapse重叠',
      url: 'https://juejin.cn/post/6844904200900460558#heading-0'
    },
  ])

  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)
  return (
    <div className="margin-collapse">
      <p>margin-collapse 重叠</p><br />

      <h1>重叠规则</h1>
      <h1>水平方向上的margin不会重叠</h1>
      <h1>相邻的两个元素的 ( 垂直方向 ) margin是 ( 正数 ) 时，重叠值是两个中的 ( 较大值 )</h1>
      <h1>相邻的两个元素的 ( 垂直方向 ) margin是 ( 负数 ) 时，重叠值是 ( 绝对值较大 ) 的值</h1>
      <h1>相邻的两个元素的 ( 垂直方向 ) margin ( 一正一负时 )，重叠值是两者 ( 相加 ) 值</h1>
      <br/>
      <br/>

      <h1>如何解决同一个BFC中，上下margin重叠</h1>
      <h1>是两个元素在不同的BFC中</h1>
      <h1>根元素</h1>
      <h1>浮动</h1>
      <h1>绝对定位：position: absolute fixed</h1>
      <h1>display: inline-block table-cell flex</h1>
      <h1>overflow: hidden auto scroll , 只要不是visiable</h1>


      <div className="max-border">
        <div className="left__top1">top1</div>
        <div className="left__top2">top2</div>
        <div className="left__bottom1">bottom1</div>
      </div>
      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default MarginCollapse