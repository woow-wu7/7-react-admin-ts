import React, { useState } from 'react'

const InlineBlock = () => {
  const [links] = useState([
    {
      name: 'display:inline-block;存在间隙的原因和解决办法 - 我的掘金博客',
      url: 'https://juejin.cn/post/6844904090644774926#heading-25'
    },
  ])
  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)

  return (
    <div className="inline-block">
      <p>display:inline-block;存在间隙的原因和解决办法</p>
      <h1>原因：标签之间存在空白字符</h1>
      <h1>解决办法一：将父元素的font-size: 0设置为0，然后在子元素中设置自己需要的font-size大小，因为是空白字符，所以设置font-size有效</h1>
      <h1>解决办法二：各个标签不要换行，而是仅仅贴合在一起</h1>

      <div>
        <div style={{ display: 'inline-block', background: 'yellow', }}>display: inline-block;</div>
        <div style={{ display: 'inline-block', background: 'yellow', }}>display: inline-block;</div>
      </div><br /><br /><br /><br /><br /><br />

      <div dangerouslySetInnerHTML={{
        __html: `
          <span style={{ width: '700px' }}>span: inline</span>
          <a href="https://juejin.cn/post/6887132776512880654" style={{ width: '100px', display: 'inline'}}>a: inline</a>
          <input type="text" placeholder="input：inline-block" style={{ width: '100px' }} />
          <textarea rows={3} cols={20} style={{ width: '100px' }} value="textarea: inline-block"></textarea>
          <select name="cars" style={{ width: '100px' }} >
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="fiat">Fiat</option>
            <option value="audi">Audi</option>
          </select>
      ` }}>
      </div>
      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default InlineBlock
