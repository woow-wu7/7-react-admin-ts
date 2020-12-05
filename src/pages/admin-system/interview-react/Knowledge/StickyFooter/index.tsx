import React, { useState } from 'react'
import StickyFooterMarginPadding from './Marginpadding'
import StickyFooterFlex from './Flex'
import StickyFooterCalc from './Calc'

import './sticky-footer.scss'

const StickyFooter = () => {
  const [links] = useState([
    {
      name: 'stickyFooter三种方法 - 我的掘金博客',
      url: 'https://juejin.cn/post/6844904090644774926#heading-4'
    },
  ])
  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)

  return (
    <div className="sticky-footer">
      <p>StickyFooter 效果</p>
      <div>
        <StickyFooterMarginPadding />
        <StickyFooterFlex />
        <StickyFooterCalc />
      </div>

      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default StickyFooter
