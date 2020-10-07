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

export function setLocalStorage(name: string, data: any) {
  const dataStr = JSON.stringify(data)
  window.localStorage.setItem(name, dataStr)
}

export function getLocalStorage(name: string) {
  const dataStr = window.localStorage.getItem(name)
  return JSON.parse(dataStr||'')
}