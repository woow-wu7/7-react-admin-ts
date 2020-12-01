import React, { useEffect, useState, useRef } from 'react'
import './test-hooks.scss'
import { useIntersectionObserver } from '@/utils/hooks/use-intersectionObserver'

interface IimagesData {
  tempSrc: string;
  src: string;
}

const imagesData = [{
  tempSrc: require('@/assets/iamges/lazy-temp.png'),
  src: 'https://cdn.seovx.com/?mom=302'
}, {
  tempSrc: require('@/assets/iamges/lazy-temp.png'),
  src: 'https://cdn.seovx.com/d/?mom=302'
}, {
  tempSrc: require('@/assets/iamges/lazy-temp.png'),
  src: 'https://cdn.seovx.com/ha/?mom=302'
}]

const UseIntersectionObserver = () => {
  const [images, setImages] = useState<IimagesData[]>([])
  const refImg = useRef<any[]>([])

  useIntersectionObserver(refImg.current, {
    root: document.getElementById('use-observer-root'),
    rootMargin: '0px',
    threshold: [0], // 阈值，表示交叉比例
  })
  
  useEffect(() => {
    setTimeout(() => {
      setImages(() => imagesData) // 模拟异步获取图片数据，500毫秒的异步
    }, 500)
  }, [])




  // ----------------------- 未 hooks 化的 IntersectionObserver -----------------------
  useEffect(() => {
    // 未 hooks 化的 IntersectionObserver
    const io = new IntersectionObserver(([entry]) => {
      console.log(entry);
    }, {
      root: document.getElementById('observer-root'),
      rootMargin: '10px',
      threshold: [0]
    })
    const target = document.getElementById('observer-target')
    if (target) {
      io.observe(target)
    }
    return () => { }
  }, [])

  const renderImages = (item: IimagesData, index: number) => {
    return (
      <img
        src={item.tempSrc}
        data-src={item.src}
        alt={"images"}
        key={index + +new Date()}
        ref={el => refImg.current[index] = el} 
        // 这里当需要绑定的ref是多个时，使用ref函数形式，定义一个数组，用index去一一对象，很巧妙
        // 关键点：
        // 1. ref函数形式，返回的ref是当前的ref
        // 2. useRef 传入数组，index去对应每个ref
      />
    )
  }

  return (
    <div
      style={{
        background: '#fff',
        margin: '10px 0',
        padding: '10px',
        border: '1px solid black'
      }}>
      <p
        style={{
          margin: '10px', padding: '14px 24px', background: '#edfffb',
          border: '1px solid #00b792', display: 'inline-block',
        }}
      >
        useIntersectionObserver
      </p>

      <br /><br /><p>滚动下面的滚动条，查看console，当有交集时就能触发指定的回调</p><br /><br />

      {/* IntersectionObserver未hooks版本 */}
      <div id="observer-root">
        <div>这是IntersectionObserver指定的root节点DOM - 绿</div>
        <div>
          <p>填充</p><br /><br /><br />
          <p>填充</p><br /><br /><br />
          <p>填充</p><br /><br /><br />
          <p>填充</p><br /><br /><br />
          <p>填充</p><br /><br /><br />
        </div>
        <div id="observer-target">
          <p>这是IntersectionObserver观察的节点DOM - 红</p><br /><br />
          <p>这是IntersectionObserver观察的节点DOM - 红</p><br /><br />
          <p>这是IntersectionObserver观察的节点DOM - 红</p><br /><br />
          <p>这是IntersectionObserver观察的节点DOM - 红</p><br /><br />
          <p>这是IntersectionObserver观察的节点DOM - 红</p><br /><br />
          <p>这是IntersectionObserver观察的节点DOM - 红</p><br /><br />
          <p>这是IntersectionObserver观察的节点DOM - 红</p><br /><br />
          <p>这是IntersectionObserver观察的节点DOM - 红</p><br /><br />
          <p>这是IntersectionObserver观察的节点DOM - 红</p><br /><br />
          <p>这是IntersectionObserver观察的节点DOM - 红</p><br /><br />
        </div>
        <div>
          <p>填充</p><br /><br /><br />
          <p>填充</p><br /><br /><br />
          <p>填充</p><br /><br /><br />
          <p>填充</p><br /><br /><br />
          <p>填充</p><br /><br /><br />
        </div>
      </div>

      <br /><br /><br /><br /><br />
      <div>IntersectionObserver图片懒加载应用</div><br />
      <div id="use-observer-root">
        <div>
          <p>填充</p><br /><br /><br />
          <p>填充</p><br /><br /><br />
          <p>填充</p><br /><br /><br />
          <p>填充</p><br /><br /><br />
          <p>填充</p><br /><br /><br />
          <p>填充</p><br /><br /><br />
          <p>填充</p><br /><br /><br />
          <p>填充</p><br /><br /><br />
        </div>
        {
          images.map(renderImages)
        }
        <div>
          <p>填充</p><br /><br /><br />
          <p>填充</p><br /><br /><br />
          <p>填充</p><br /><br /><br />
          <p>填充</p><br /><br /><br />
          <p>填充</p><br /><br /><br />
          <p>填充</p><br /><br /><br />
        </div>
      </div>
    </div>
  )
}

export default UseIntersectionObserver
