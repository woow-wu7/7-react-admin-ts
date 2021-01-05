import React, { useState } from 'react'
import axios from 'axios'

const AxiosCancelToken = () => {
  const [cancalFn1, setCancalFn1] = useState(() => { }) as any
  const [links] = useState([
    {
      name: 'axios源码 - axios源码分析仓库',
      url: 'https://github.com/woow-wu7/7-react-admin-ts/tree/master/src/SOURCE-CODE-ANALYSIS/AXIOS'
    },
    {
      name: 'axios源码 - 我的掘金博客',
      url: 'https://juejin.cn/post/6844904147532120072'
    },
  ])
  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)
  // axios取消请求
  // 方法一
  // axios.CancelToken.source.token
  // axios.CancelToken.source.cancel
  // 注意点：设个source不能是同一个source，如果是同一个source的话，取消请求后就不能再次重新请求了
  const handleRequest = async () => {
    const source = axios.CancelToken.source()
    setCancalFn1(() => source.cancel)
    await new Promise(resolve => {
      setTimeout(() => {
        console.log('延时2s执行')
        return resolve('success')
      }, 2000)
    })
    await axios({
      url: '/API/pic.php',
      method: 'get',
      cancelToken: source.token
    }).catch(err => {
      if (axios.isCancel(err)) {
        console.log('object :>> ', err.message);
      } else {
        console.log('error')
      }
    })
  }
  const cancelRequest = () => {
    cancalFn1('请求取消了')
  }
  return (
    <div className="axios-cancel-token">
      <p>Axios - CancelToken测试</p><br />

      <div>请打开浏览器调试面板调式</div>
      <button onClick={handleRequest}>点击发送请求1 - 每次请求都用promise延时2s模拟</button><br />
      <button onClick={cancelRequest}>点击 - 取消请求方法1 - 工厂函数source</button><br />
      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default AxiosCancelToken