import React, { useState } from 'react'

const StickyFooterMarginPadding = () => {
  const [list, setList] = useState<string[]>([])

  const HandleContent = (type: 'add' | 'clear') => {
    type === 'add'
      ? setList(v => [...v, '内容填充...'])
      : setList(v => [])
  }
  return (
    <div className="sticky_footer__marginpadding">
      <div>
        <div className="content">
          <h1>content</h1><br/>
          <h1>margin + padding 方式</h1>
          <h1>content关键属性：min-height: 100%;</h1>
          <h1>content关键属性：padding-bootom: 50px;</h1>
          <h1>content关键属性：box-sizing: border-box;</h1>
          <h1>footer关键属性：margin-top: -50px;</h1>
          <h1>缺点：需要知道footer的高度</h1>
          {list.map((item, index) => <div key={index + +new Date()}>{item}</div>)}
        </div>
        <footer>footer</footer>
      </div>
      <button onClick={() => HandleContent('add')}>点击-添加内容</button>
      <button onClick={() => HandleContent('clear')}>点击-清空内容</button>
    </div>
  )
}

export default StickyFooterMarginPadding
