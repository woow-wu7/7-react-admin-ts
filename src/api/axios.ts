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
