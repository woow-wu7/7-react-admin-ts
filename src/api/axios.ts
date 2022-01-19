import axios from 'axios'
import { getProcessStatus, HOST } from './axios.config'
const token = 'afafad'

const axiosInstance = axios.create({
  // baseURL: 'http://49.233.215.163:7001',
  baseURL: HOST,
  timeout: 5000,
  // 如果没有指定Content-Type
  // 1. data类型是 ( URLSearchParams ) => axios也会默认指定 Content-type: application/x-www-form-urlencoded;charset=utf-8
  // 2. data类型是 ()
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json; charset=utf-8', // 该value
    authorization: `Bearer ${token}`,
    'Content-Security-Policy': 'upgrade-insecure-requests',
    accept:
      'text/html,application/octet-stream,application/json,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  },
})

// 请求拦截
// - 描述：config 是通过 axios(conifg) 中传入的config
// - 原因：因为整个promise链条是 chain = [请求成功拦截2, 请求失败拦截2, 请求成功拦截1, 请求失败拦截1, dispatchRequest, undefined, 应成功拦截1, 响应失败拦截1, 响应成功拦截2, 响应失败拦截2]
// - 详细：
// promise = Promise.resolve(config)
// .then('请求成功拦截2', '请求失败拦截2') // 依此向下传递config , 注意2在1前面，unshift
// .then('请求成功拦截1', '请求失败拦截1')
// .then(dispatchRequest, undefined) // 真正发送请求，(config) => adapter(config).then(value => value, reason => Promise.reject(reason))
// .then('响应成功拦截1', '响应失败拦截1')
// .then('响应成功拦截2', '响应失败拦截2') // 注意2在1后面，push
axiosInstance.interceptors.request.use(
  (config) => {
    token ? (config.headers.token = token) : (window.location.pathname = '/login')

    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 响应拦截
axiosInstance.interceptors.response.use(
  (response) => {
    const { status } = response
    getProcessStatus(status)
    return response
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default axiosInstance
