import React, { useState, useEffect } from 'react'
import axios from 'axios'

const InterviewCancelToken = () => {
  const [cancelFn, setCancelFn] = useState<any>()
  const [source, setSource] = useState<any>(() => axios.CancelToken.source())
  const [count, setCount] = useState(0)

  const [resolve, setResolve] = useState<any>()
  useEffect(() => {
    const runAsyncFunction = async () => {
      await new Promise((resolveFn) => setResolve(() => resolveFn))
      setCount((prev) => prev + 1)
      // 1
      // cancelToken取消请求原理
      // - 1. cancel()函数执行，将promise的状态通过resolve()改变为fulfilled，同时通过axios.config.cancelToken属性赋值成CancelToken构造函数调用生成的实例
      // - 2. 然后在adapter中发起浏览器环境是xhr请求，判断axios.config.cancelToken属性是否存在，存在就axios.config.cancelToken.promise.then()，此时then方法第一个函数执行，需要在cancel函数执行改变promise状态后
      // - 3. axios.config.cancelToken.promise.then(cancel => ...) 参数函数执行，证明调用了cancel函数
      // - 4. 调用cancel后，在then中第一个回调执行时候
      //      - xhr.abort() 终止请求
      //      - reject() 抛出错误

      // 2
      // interceptor请求拦截和响应拦截的原理
      // - 利用promise链条实现
      // 从左往右一次一次取出两个方法
      // promise = Promise.resolve(config)
      // .then('请求成功拦截2', '请求失败拦截2') // 依此向下传递config , 注意2在1前面，unshift
      // .then('请求成功拦截1', '请求失败拦截1')
      // .then(dispatchRequest, undefined) // 真正发送请求，(config) => adapter(config).then(value => value, reason => Promise.reject(reason))
      // .then('响应成功拦截1', '响应失败拦截1')
      // .then('响应成功拦截2', '响应失败拦截2') // 注意2在1后面，push
    }
    runAsyncFunction()
  }, [])

  const renderAxios = () => {
    const handleRequest = () => {
      axios('http://localhost:5678/good', {
        cancelToken: new axios.CancelToken((c) => setCancelFn(() => c)),
      }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
          console.log('Request canceled', thrown.message)
        } else {
          // handle error
        }
      })
    }

    const handleCancel = () => {
      cancelFn('取消请求')
    }

    const handleRequest2 = () => {
      axios('http://localhost:5678/good', {
        cancelToken: source.token,
      }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
          console.log('Request canceled', thrown.message)
        } else {
          // handle error
        }
      })
    }

    const handleCancel2 = () => {
      source.cancel('请求通过-工厂函数source()的方式取消了')
    }

    return (
      <div>
        <p>点击-发送请求axios</p>
        <button onClick={handleRequest}>axios-发送请求4s</button>
        <button onClick={handleCancel}>点击-取消请求axios-new axios.CancelToken()</button>
        <br />
        <br />
        <button onClick={handleRequest2}>axios-发送请求4s</button>
        <button onClick={handleCancel2}>点击-取消请求axios-CancelToken.source()-</button>
        <br />
        <button onClick={() => resolve()}>
          手写axios取消请求的原理 ---- 测试 - 点击执行resolve，从而改变promise状态，从而才打印count;
          未点击一直处于pending状态
        </button>
        <div>count: {count}</div>
      </div>
    )
  }

  return (
    <div>
      <p>axios-cancel测试</p>
      {renderAxios()}
    </div>
  )
}

export default InterviewCancelToken
