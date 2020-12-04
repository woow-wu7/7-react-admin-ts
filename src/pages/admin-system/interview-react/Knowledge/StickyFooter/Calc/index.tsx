import React, { useState } from 'react'

const StickyFooterCalc = () => {
  const [list, setList] = useState<string[]>([])

  const HandleContent = (type: 'add' | 'clear') => {
    type === 'add'
      ? setList(v => [...v, '内容填充...'])
      : setList(v => [])
  }
  return (
    <div className="sticky_footer__calc">
      <div>
        <div className="content">
          <h1>content</h1><br />
          <h1>Calc 方式</h1>
          <h1>content关键属性：</h1>
          <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min-height: calc(容器高度-footer高度)</h1>
          <h1>content关键属性：box-sizing: border-box;</h1>
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

export default StickyFooterCalc
