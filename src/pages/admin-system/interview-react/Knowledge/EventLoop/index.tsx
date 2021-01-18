import React, { useState, useEffect } from 'react'

const EventLoop = () => {
  const [links] = useState([
    {
      name: 'EventLoop之nodejs事件轮询 - 我的掘金博客',
      url: 'https://juejin.cn/post/6908732834026881038#heading-42'
    },
  ])
  useEffect(() => {
    // nodejs事件轮询
    // 共 6 个阶段

    // 1. timers 阶段
    //    - 计时 和 执行到点的计时器

    // 2. pending callback 阶段
    // 3. idea prepare 阶段

    // 4. poll 轮询阶段
    //    - (1) 轮询队列不为空，就依次取出执行，直到轮询队列为空 或者 到达系统最大限制
    //    - (2) 轮询队列为空
    //          - 1. 如果之前设置过 setImmediate 函数，则立即进入下一个阶段 ( check ) 阶段
    //          - 2. 如果之前没有设置过 setImmediate 函数，则处于 ( 等待 ) 状态
    //                - 1. 直到轮询队列添加进了新的回调函数，就又会进入 (1) 再往下执行
    //                - 2. 或者 ( 定时器 ) 到点了，也会进入下一个阶段 ( check ) 阶段

    // 5. check 阶段
    //    - 该阶段主要就是执行 setImmediate 函数

    // 6. close callbacks 关闭阶段
    //    - 执行 close callbacks 回调函数

    // 注意点：
    // 1. process.nextTick 可以在任意阶段优先执行 !!!!!!!!!!!!!!!!!!!!!
    // 2. poll: 是轮询的意思
  }, [])
  const renderLinks = () => links.map(({ name, url }: {name: string, url: string}) => <div key={name}><a href={url} target="blank">{name}</a></div>)
  return (
    <div className="event-loop">
      <p>EventLoop - nodejs事件循环 和 浏览器的事件循环</p><br />
      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default EventLoop