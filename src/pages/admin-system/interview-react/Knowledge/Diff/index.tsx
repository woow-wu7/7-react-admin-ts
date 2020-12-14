import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Diff = () => {
  const [timer, setTimer] = useState(0)
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
  useEffect(() => {
    const getTimer = async () => {
      const res: any = await axios('/api/gettimer')
      if (res && res.data) {
        setTimer(() => res.data.now)
      }
    }
    getTimer()
  }, [])
  console.log(`%c${timer}`, 'font-size: 30px; color: green;', '从服务器获取到的时间')
  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)

  return (
    <div className="diff">
      <p>Diff算法</p>
      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default Diff
