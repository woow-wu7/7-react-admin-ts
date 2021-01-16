import React, { useState, useEffect } from 'react'
import Storage from '@/utils/storage'

const StorageComponent = () => {
  const [links] = useState([
    {
      name: '代理模式的运用 - 代理Storage - 掘金博客',
      url: 'https://juejin.cn/post/6844904190947360781'
    },
  ])
  useEffect(() => {
    const local = new Storage('local', 1000)

    local.setItem('author_name', 'woow_wu7')
    console.log('未过期local.getItem("author_name") :>> ', local.getItem('author_name'));

    setTimeout(() => {
      console.log('过期local.getItem("author_name") :>> ', local.getItem('author_name'));
    }, 2000)

    console.log(`%c '获取原生Storage => local.getNativeStorage() :>>'`, 'color: red;font-size: 20px;', local.getNativeStorage());
  }, [])

  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)
  return (
    <div className="storage">
      <p>Storage本地存储</p><br />
      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default StorageComponent