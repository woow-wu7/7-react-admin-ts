import { Modal } from "antd"
export * from './render-routes' // 导出所有render-routes/index中定义的函数

// 表单为保存提示，自定义提示DOM样式，阻止默认样式
export function getUserConfirmation(message: string, callback: any) {
  Modal.confirm({
    content: message,
    cancelText: '取消',
    okText: '确定',
    onCancel: () => {
      callback(false)
    },
    onOk: () => {
      callback(true)
    }
  })
}

// localStorage 存
export function setLocalStorage(name: string, data: any) {
  const dataStr = JSON.stringify(data)
  window.localStorage.setItem(name, dataStr)
}

// localStorage 取
export function getLocalStorage(name: string) {
  const dataStr = window.localStorage.getItem(name)
  return dataStr && JSON.parse(dataStr)
}

// removeLocalStorage 删除一项，或者所有
// 不传参，就是删除所有
export function removeLocalStorage(name?: string) {
  name === 'undefined'
  ? 
  window.localStorage.removeItem(name)
  :
  window.localStorage.clear()
}


// 深拷贝
export function deepClone(params: any[] | object) {
  let results: any[] | object = Array.isArray(params) ? [] : {};
  for (let i in params) {
    if (params.hasOwnProperty(i)) {
      (typeof (params[i]) === 'object' && params[i] !== 'null')
        ? results[i] = deepClone(params[i])
        : results[i] = params[i]
    }
  }
  return results
}