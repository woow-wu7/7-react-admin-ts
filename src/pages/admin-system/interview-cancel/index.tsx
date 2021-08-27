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
      setCount(prev => prev + 1)
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
        <button onClick={() => resolve()}>手写axios取消请求的原理 ---- 测试 - 点击执行resolve，从而改变promise状态，从而才打印count; 未点击一直处于pending状态</button>
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
