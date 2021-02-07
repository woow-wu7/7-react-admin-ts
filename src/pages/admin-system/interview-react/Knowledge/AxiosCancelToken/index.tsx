import React, { useState } from 'react'
import axios from 'axios'
import { Button, message } from 'antd'

// axios取消请求
// 注意事项
// 1. 有两种方式实现取消请求 ( axios.cancelToken.source()工厂函数 ) 和 ( new axios.cancelToken(executor(c)) )
// 2. 调用cancel函数时，因为resolve(token.reason)，所以可以通过 axios().catch() 去捕获
// 3. 那如何判断是否是存在取消请求的标志位，通过axios.isCancel来判断，详见 handleRequest 方法
const AxiosCancelToken = () => {
  const [cancalFn1, setCancalFn1] = useState(() => {}) as any
  const [cancelFn2, setCancelFn2] = useState(() => {}) as any
  const [source3, setSource3] = useState<any>({})
  const [cancelFn4, setStateCancelFn4] = useState<any>(() => {})
  const [links] = useState([
    {
      name: 'axios源码 - axios源码分析仓库',
      url: 'https://github.com/woow-wu7/7-react-admin-ts/tree/master/src/SOURCE-CODE-ANALYSIS/AXIOS',
    },
    {
      name: 'axios源码 - 我的掘金博客',
      url: 'https://juejin.cn/post/6844904147532120072',
    },
  ])
  const renderLinks = () =>
    links.map(({ name, url }) => (
      <div key={name}>
        <a href={url} target="blank">
          {name}
        </a>
      </div>
    ))
  // axios取消请求
  // 方法一
  // axios.CancelToken.source.token
  // axios.CancelToken.source.cancel
  // 注意点：每个source都不能是同一个source，如果是同一个source的话，取消请求后就不能再次重新请求了
  const handleRequest = async () => {
    const source = axios.CancelToken.source()
    setCancalFn1(() => source.cancel)
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log('延时2s执行')
        return resolve('success')
      }, 2000)
    })
    // 2s后才执行axios，这样能保证axios请求太快，不好测试 取消请求
    await axios({
      url: '/API/pic.php',
      method: 'get',
      cancelToken: source.token,
    })
      .then((res) => {
        console.log('取消请求触发是，并没有执行到then这里，说明出现错误，执行操了catch中', res)
        return res
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('object :>> ', err.message)
        } else {
          console.log('error')
        }
      })
  }
  const cancelRequest = () => {
    console.log(cancalFn1)
    cancalFn1('请求取消了')
  }

  // 2
  const handleRequest2 = async () => {
    const token = new axios.CancelToken((c) => setCancelFn2(() => c))
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log('延时2s执行')
        return resolve('success')
      }, 2000)
    })
    await axios({
      url: '/API/pic.php',
      method: 'get',
      cancelToken: token,
      // cancelToken: new axios.CancelToken(c => setCancelFn2(() => c)) // 这种写法是不可以的，
    }).catch((err) => {
      if (axios.isCancel(err)) {
        console.log('object :>> ', err.message)
      } else {
        console.log('error')
      }
    })
  }
  const cancelRequest2 = () => {
    console.log(cancelFn2)
    cancelFn2('请求取消了')
  }

  //------------------------------------------- 2021/2/6复习axios取消请求
  const handleRequest3 = async () => {
    const source = axios.CancelToken.source()
    setSource3(() => source)
    await new Promise((resolve) => {
      setTimeout(() => resolve('请求开始'), 3000)
    })
    const res = await axios({
      method: 'GET',
      url: '/API/pic.hph',
      cancelToken: source.token,
    }).catch((err) => message.error(err.message))
    if (res) {
      message.success('请求成功')
    }
  }
  const cancelRequest3 = () => {
    source3.cancel('3的请求取消了')
  }
  // -----------------------------------------
  const handleRequest4 = async () => {
    const cancelInstance = new axios.CancelToken((c) => setStateCancelFn4(() => c))
    await new Promise((resolve) => {
      setTimeout(() => resolve('请求开始'), 3000)
    })
    const res = await axios({
      method: 'GET',
      url: '/API/pic.hph',
      cancelToken: cancelInstance,
    }).catch((err) => message.error(err.message))
    if (res) {
      message.success('请求成功')
    }
  }
  const cancelRequest4 = () => {
    cancelFn4('取消请求了')
  }
  return (
    <div className="axios-cancel-token">
      <p>Axios - CancelToken测试</p>
      <br />

      <div>请打开浏览器调试面板调式</div>
      <Button onClick={handleRequest}>点击发送请求1 - 每次请求都用promise延时2s模拟</Button>
      <br />
      <Button onClick={cancelRequest}>点击 - 取消请求方法1 - 工厂函数source</Button>
      <br />
      <br />
      <br />
      <Button onClick={handleRequest2}>发送请求2 - 每次请求都用promise延时2s模拟</Button>
      <br />
      <Button onClick={cancelRequest2}>
        点击 - 请求请求方法2 - 直接 new axios.CancelToken(cancel(c)) 传入cancel函数, 将cancel函数的参数赋值给变量即可
      </Button>
      <br />

      <div style={{ marginTop: '20px' }}>2021/2/6复习axios取消请求</div>
      <br />
      <br />
      <Button onClick={handleRequest3}>点击发送请求3</Button>
      <br />
      <Button onClick={cancelRequest3}>取消请求3 - source方式</Button>
      <br />
      <br />
      <Button onClick={handleRequest4}>点击发送请求4</Button>
      <br />
      <Button onClick={cancelRequest4}>取消请求4 - new axios.CancelToken(executor)</Button>
      <br />
      <br />
      <div>{renderLinks()}</div>
    </div>
  )
}

export default AxiosCancelToken
