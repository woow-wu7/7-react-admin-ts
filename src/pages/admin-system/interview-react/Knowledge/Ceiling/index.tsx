import React, { useState } from 'react'
import WayCss from './WayCss'
import WayJs from './WayJs'
import WayIntersectionObserver from './WayIntersection'
import './ceiling.scss'

const Ceiling = () => {
  const [links] = useState([
    {
      name: 'css方式 - 掘金',
      url: 'https://juejin.cn/post/6844903618433253383'
    },
    {
      name: 'useIntersectionObserver - 我的掘金文章',
      url: 'https://juejin.cn/post/6887132776512880654'
    },
    {
      name: 'IntersectionObserver - 阮一峰',
      url: 'http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html'
    },
  ])
  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)

  return (
    <div className="ceiling ceiling2">
      <p>Ceiling 吸顶效果</p>

      <h1>三种方式</h1>
      <div className="ceil-css">
        <h2>(1) css方式：position: sticky</h2>
        <div>
          <div>注意：position: sticky的元素，定位是基于具有滚动条的距离最近的祖先元素，如果祖先元素不可滚动，则相对于viewport元素 </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            ( 元素固定的相对偏移是相对于离它最近的具有滚动框的祖先元素，如果祖先元素都不可以滚动，那么是相对于viewport来计算元素的偏移量。)
          </div>
        </div>
        <h2>注意：当同一层级的多个元素都设置了position:sticky属性时，top相同的将会被替换，不同top值的不会</h2>
      </div>
      <h2>(2) InterSectionObserver方式</h2>
      <h2>(3) js方式：scrollTop + clientHeight = scrollHeight 配合 offsetHeight，【主要是 scrollTop 和 offsetTop 两个属性】</h2>

      <WayCss />
      <WayJs />
      <WayIntersectionObserver />

      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default Ceiling
