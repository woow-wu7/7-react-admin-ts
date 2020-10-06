import { Modal } from "antd"

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