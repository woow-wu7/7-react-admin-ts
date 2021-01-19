import React from 'react'

const WayCss = () => {
  return (
    // css方式实现ceiling => position: sticky; 
    <div className="ceilingp-test">
      <div>【css方式】 设置了position: sticky的元素并不脱离文档流，仍然保留元素原本在文档流中的位置。
      当元素在容器中被滚动超过指定的偏移值时，元素在容器内固定在指定位置。亦即如果你设置了top: 50px，那么在sticky元素到达距离相对定位的元素顶部50px的位置时固定，不再向上移动（相当于此时fixed定位）。
元素固定的相对偏移是相对于离它最近的具有滚动框的祖先元素，如果祖先元素都不可以滚动，那么是相对于viewport来计算元素的偏移量。</div>
      <div className="ceiling-header">header</div>
      <div>设置了position: sticky的元素并不脱离文档流</div>
      <div>设置了position: sticky的元素并不脱离文档流</div>
      <div>设置了position: sticky的元素并不脱离文档流</div>
      <div>设置了position: sticky的元素并不脱离文档流</div>
      <div>设置了position: sticky的元素并不脱离文档流</div>
      <div className="ceiling-header2">header2</div>
      <div>设置了position: sticky的元素并不脱离文档流</div>
      <div>设置了position: sticky的元素并不脱离文档流</div>
      <div>设置了position: sticky的元素并不脱离文档流</div>
      <div>设置了position: sticky的元素并不脱离文档流</div>
      <div className="ceiling-header-wrapper">
        <div className="ceiling-header3">header3</div>
      </div>
      <div>设置了position: sticky的元素并不脱离文档流</div>
      <div>设置了position: sticky的元素并不脱离文档流</div>
      <div>设置了position: sticky的元素并不脱离文档流</div>
      <div>设置了position: sticky的元素并不脱离文档流</div>
      <div>设置了position: sticky的元素并不脱离文档流</div>
      <div>设置了position: sticky的元素并不脱离文档流</div>
      <div>设置了position: sticky的元素并不脱离文档流</div>
      <div>设置了position: sticky的元素并不脱离文档流</div>
      <div>设置了position: sticky的元素并不脱离文档流</div>
      <div>设置了position: sticky的元素并不脱离文档流</div>
      <div>设置了position: sticky的元素并不脱离文档流</div>
      <div>设置了position: sticky的元素并不脱离文档流</div>
    </div>
  )
}

export default WayCss
