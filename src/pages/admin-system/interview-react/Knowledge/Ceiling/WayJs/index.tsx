import React, { useRef, useEffect } from 'react'

const WayJs = () => {

  const refJsFather = useRef<HTMLDivElement>(null)
  const refJsChild = useRef<HTMLDivElement>(null)
  const refJsReplaceChild = useRef<HTMLDivElement>(null)

  // JS 方式
  useEffect(() => {
    const handleSroll = (e: any) => {
      const scrollTop = e.target.scrollTop;
      const offsetTop = refJsChild?.current?.offsetTop; // offsetTop是固定值，值是距离最近的具有位置属性的祖先元素之间的距离
      // console.log('scrollTop :>> ', scrollTop);
      // console.log('offsetTop :>> ', offsetTop);
      if (!!offsetTop && scrollTop > offsetTop) { // 已经到达顶部，并滚动条继续向下滚动
        refJsReplaceChild?.current?.style.setProperty('display', 'block')
        refJsReplaceChild?.current?.style.setProperty('line-height', '36px') // display:flex失效，用line-height等价
      } else { // 未到达顶部，方向向上，向下都要隐藏
        refJsReplaceChild?.current?.style.setProperty('display', 'none')
      }
    }
    refJsFather?.current?.addEventListener?.('scroll', handleSroll, false)
  }, [])

  return (
    <span>
      {/* js方式 */}
      <div className="ceilingp-test-js" ref={refJsFather}>
        <div>【JS方式】 设置了position: sticky的元素并不脱离文档流，仍然保留元素原本在文档流中的位置。
        当元素在容器中被滚动超过指定的偏移值时，元素在容器内固定在指定位置。亦即如果你设置了top: 50px，那么在sticky元素到达距离相对定位的元素顶部50px的位置时固定，不再向上移动（相当于此时fixed定位）。
元素固定的相对偏移是相对于离它最近的具有滚动框的祖先元素，如果祖先元素都不可以滚动，那么是相对于viewport来计算元素的偏移量。</div>
        <div className="ceiling-header-js" ref={refJsChild} id="ceiling-header-js-id">header</div>
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
        <div>设置了position: sticky的元素并不脱离文档流</div>
        <div>设置了position: sticky的元素并不脱离文档流</div>
        <div>设置了position: sticky的元素并不脱离文档流</div>
      </div>
      {/* 注意：被置换的元素，提到了父级来了，因为fixed定位不好搞，当父元素不具有transform时，基于窗口，当父元素具有transform属性时，基于父元素，但是父元素有滚动条时，也会滚动 */}
      <div className="ceiling-header-js-replace" ref={refJsReplaceChild} id="ceiling-header-js-id-replace">header</div>
    </span>
  )
}

export default WayJs
