import React, { useRef, useEffect } from 'react'

const WayIntersectionObserver = () => {
  const refCeilingFather = useRef<HTMLDivElement>(null)
  const refCeilingChild = useRef<HTMLDivElement>(null)
  const refCeilingReplaceChild = useRef<HTMLDivElement>(null)

  // IntersectionObserver 方式
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((item) => {
        if (item.intersectionRatio < 1 && item.intersectionRect.top < 774) {
          refCeilingReplaceChild?.current?.style?.setProperty('display', 'block')
          refCeilingReplaceChild?.current?.style?.setProperty('line-height', '36px') // display:flex失效，用line-height等价
        } else {
          refCeilingReplaceChild?.current?.style?.setProperty('display', 'none')
        }
      })
    }, {
      root: refCeilingFather.current,
      threshold: [1]
    })
    if (refCeilingChild.current && refCeilingFather.current) {
      io.observe(refCeilingChild.current)
    }
    return () => io.disconnect()
  }, [])

  return (
    <span>
      <div className="ceilingp-test-interserction-observer" ref={refCeilingFather}>
        <div>【IntersectionObserver方式】 设置了position: sticky的元素并不脱离文档流，仍然保留元素原本在文档流中的位置。
        当元素在容器中被滚动超过指定的偏移值时，元素在容器内固定在指定位置。亦即如果你设置了top: 50px，那么在sticky元素到达距离相对定位的元素顶部50px的位置时固定，不再向上移动（相当于此时fixed定位）。
元素固定的相对偏移是相对于离它最近的具有滚动框的祖先元素，如果祖先元素都不可以滚动，那么是相对于viewport来计算元素的偏移量。</div>
        <div className="ceiling-header-intersection-observer" ref={refCeilingChild}>header</div>
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
      <div className="ceiling-header-intersection-replace" ref={refCeilingReplaceChild}>header</div>
    </span>
  )
}

export default WayIntersectionObserver
