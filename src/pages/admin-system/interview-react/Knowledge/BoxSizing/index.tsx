import React, { useState } from 'react'

const BoxSizing = () => {
  const [links] = useState([
    {
      name: '盒模型 - 我的掘金博客',
      url: 'https://juejin.cn/post/6844904090644774926#heading-42'
    },
  ])
  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)


  return (
    <div className="box-sizing">
      <p>盒模型</p>

      <div>
        <h1> ( 标准盒模型 ) 和 ( ie盒模型 )</h1>
        <h1> 标准盒模型：box-sizing: content-box; -------- 宽高包括：content</h1>
        <h1> IE盒子模型：box-sizing: border-box; ---------- 宽高包括：content，padding，border</h1>
      </div>

      <div style={{
        width: '360px',
        height: '360px',
        border: '10px solid silver',
        padding: '10px',
        marginRight: '10px',
        display: 'inline-block',
        boxSizing: 'content-box',
      }}>
        <div style={{width: '100%', height: '100%', background: 'yellow'}}>
          <h1>box-sizing: content-box;</h1>
          <h1 style={{color: '#00b792'}}>标准盒模型宽高只包括content，不包括padding和border</h1>
          <h1>黄色的是content，宽高都是360px</h1>
          <h1>外层的border是10px</h1>
          <h1>外层的padding是10px</h1>
          <h1>外层的宽高设置都是360px，实际上只包括了黄色content；border和padding没算入标准盒模型，也就是说比真正的360要宽和高</h1>
        </div>
      </div>

      <div style={{
        width: '360px',
        height: '360px',
        border: '10px solid silver',
        padding: '10px',
        marginRight: '10px',
        display: 'inline-block',
        boxSizing: 'border-box',
      }}>
        <div style={{width: '100%', height: '100%', background: 'yellow'}}>
          <h1>box-sizing: border-box;</h1>
          <h1 style={{color: '#00b792'}}>IE盒模型宽高包括content，padding和border</h1>
          <h1>整个盒子宽高都是360px</h1>
          <h1>外层的border是10px</h1>
          <h1>外层的padding是10px</h1>
          <h1>外层的宽高设置都是360px，包括了黄色content；border和padding三个之和</h1>
        </div>
      </div>

      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default BoxSizing
