import React, { useState } from 'react'

const Triangle = () => {
  const [links] = useState([
    {
      name: 'css 画 triangle - 我的掘金博客',
      url: 'https://juejin.cn/post/6844904090644774926#heading-24'
    },
    {
      name: '三角形的各种画法 - 掘金',
      url: 'https://juejin.cn/post/6844903810125529101#heading-19'
    }
  ])
  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)

  return (
    <div className="triangle">
      <p>css 画 triangle</p>

      <br />
      {/* 第一个三角形 */}
      <div className="triangle-item">
        <div style={{ display: 'flex' }}>
          <div className="triangle-one"></div>
          <div style={{ width: '120px', height: '120px', background: 'yellow', display: 'inline-block' }}>
            <div>width: 120px;</div>
            <div>height: 120px;</div>
          </div>
          {/* 直角三角形 */}
          <div className="triangle-one-right" />
        </div>
        <div>
          <h1> width: 0;</h1>
          <h1> height: 0;</h1>
          <h1> border-top: 60px solid #00b792;</h1>
          <h1> border-bottom: 60px solid #ff0000;</h1>
          <h1> border-left: 60px solid #e821ff;</h1>
          <h1> border-right: 60px solid #ff8800;</h1>
        </div>
        <div>
          <h1>注意点</h1>
          <h1>如果是border都相等的向上的三角形</h1>
          <h1>(1)三角形的底边是border的两倍</h1>
          <h1>(2)三角形的高就是border-bottom的值</h1>
        </div>
      </div>
      {/* 第二个三角形 */}
      <div className="triangle-item">
        <div style={{ display: 'flex' }}>
          <div className="triangle-two"></div>
          <div style={{ width: '120px', height: '120px', background: 'yellow', display: 'inline-block' }}>
            <div>width: 120px;</div>
            <div>height: 120px;</div>
          </div>
          {/* 等边三角形 和 带边框的三角形 */}
          <div className="triangle-two-equal" />
        </div>
        <div>
          <h1> width: 0;</h1>
          <h1> height: 0;</h1>
          <h1> border: 60px solid transparent;</h1>
          <h1> border-bottom: 60px solid #ff0000;</h1>
        </div><br />
        <div>
          <h1>注意点(1)：当border是60px时</h1>
          <h1>三角形的底是120px</h1>
          <h1>三角形的高是60px</h1>
        </div>
        <div>
          <h1>注意点(2)：只显示底边border是向上的三角形</h1>
          <h1>注意点(3)：只显示左边border是向右的三角形</h1>
        </div>
      </div>
      {/* 第三个三角形 */}
      <div className="triangle-item">
        <div style={{ display: 'flex' }}>
          <div className="triangle-three"></div>
          <div style={{ width: '120px', height: '180px', background: 'yellow', display: 'inline-block' }}>
            <div>width: 120px;</div>
            <div>height: 180px;</div>
          </div>
          <div className="triangle-four"></div>
        </div>
        <div>
          <h1> width: 0;</h1>
          <h1> height: 0;</h1>
          <h1> border: 60px solid transparent;</h1>
          <h1> border-bottom: 120px solid #ff0000;</h1>
        </div><br />
        <div>
          <h1>注意点</h1>
          <h1>(1)改变底边border的值，就能改变向上三角形的高</h1>
          <h1>(1)border-bottom的值 等于 三角形的高</h1>
        </div>
      </div>

      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default Triangle
