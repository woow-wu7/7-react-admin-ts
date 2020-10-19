import axios from 'axios'


const token = 'afafad';

const axiosInstance = axios.create({
  baseURL: '',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截
axiosInstance.interceptors.request.use((config) => {
  token
    ? config.headers.token = token
    : window.location.pathname = '/login'

  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截
axiosInstance.interceptors.response.use(response => {
  const { status } = response

  switch (status) {
    case 100:
      console.log('continue', '请继续请求')
      break;
    case 101:
      console.log('switching protocal', '请升级协议')
      break;

    case 200:
      console.log('ok', '成功')
      break;
    case 204:
      console.log('no content没有资源可以返回')
      break;
    case 206:
      console.log('partical content进行部分范围请求')
      break;

    case 301:
      console.log('moved permanently', '永久重定向，请求的页面已经转移到新的url')
      break;
    case 302:
      console.log('found', '临时重定向，请求的页面已经临时转移到新的url')
      break;
    case 303:
      console.log('sea other', '临时重定向，请求的页面可以在别的url找到')
      break;
    case 304:
      console.log('not modified', '资源未被修改，缓存文档可以继续使用')
      break;

    case 400:
      console.log('bad request', '请求错误，服务器未能理解请求')
      break;
    case 401:
      console.log('unauthoried', '需要验证，被请求的页面需要用户名和密码')
      break;
    case 403:
      console.log('forbidden', '禁止访问，权限不够')
      break;
    case 404:
      console.log('not found', '请求的页面不存在')
      break;
    case 405:
      console.log('method not allowed', '请求指定的方法不被允许')
      break;
    case 408:
      console.log('request timeout', '请求超时')
      break;

    case 500:
      console.log('internet server error', '网络错误')
      break;
    case 502:
      console.log('bad gateway', '网关错误')
      break;
    case 503:
      console.log('service unavaliable', '服务器过载')
      break;
    case 504:
      console.log('getway timeout', '网关超时')
      break;
    default:
      break;
  }
  return response
}, err => {
  return Promise.reject(err)
})

export default axiosInstance