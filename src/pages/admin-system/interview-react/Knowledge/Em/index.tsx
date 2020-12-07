import React, { useState } from 'react'
import './em.scss'

const Em = () => {
  const [links] = useState([
    {
      name: 'Em - 我的掘金博客',
      url: 'https://juejin.cn/post/6844904090644774926#heading-27'
    },
  ])
  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)
  return (
    <div className="em">
      <p>Em</p><br />

      <div>
        <h1>em是相对单位</h1>
        <h1>当em是font-size的单位时，表示的是 ( 父元素的font-size的大小 )</h1>
        <h1>当em是其他属性的单位时，表示的是 ( 自身font-size的大小 ) </h1>
      </div>
      <div className="max-border">
        <p>设置父元素的字体大小：20px</p>
        <div className="em__div1">
          <p>设置父元素的字体大小：1em</p>
          <p>得到的子元素的字体大小：20px</p>
          <div>em是font-size的单位时，1em表示父元素的font-size大小</div>
        </div>
      </div>
      <div className="max-border">
        <p>设置父元素的字体大小: 20px</p>
        <div className="em__div2">
          <p>设置子元素的字体大小:20px</p>
          <p>设置子元素的高度: 10em</p>
          <p>得到子元素的高度: 200px</p>
          <div>em是其他属性的单位时，1em表示自身font-size大小</div>
        </div>
      </div>
      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default Em