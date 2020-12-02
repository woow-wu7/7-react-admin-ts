import React, { useState } from 'react'
import './diff.scss'


const Diff = () => {
  const [links] = useState([
    {
      name: 'React-diff算法1-知乎 ( 概念部分讲得好 )',
      url: 'https://zhuanlan.zhihu.com/p/103187276'
    },
    {
      name: 'React-diff算法2-简书 ( elementDiff移动部分讲得好 )',
      url: 'https://www.jianshu.com/p/3ba0822018cf'
    }
  ])
  const renderLinks = () => links.map(({name, url}) => <a href={url} key={name} target="blank">{name}</a>)

  return (
    <div className="diff">
      <p className="diff__title">Diff算法</p>
      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default Diff
