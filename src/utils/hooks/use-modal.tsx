import React, { useState } from 'react'
import { Modal } from 'antd'

interface WIformInstance {
  submit: () => void
}

interface WICustomModalProps {
  formInstance?: WIformInstance;
  children: any; // 必传属性
}

const useModal = (title: string) => {
  const [visible, setVisible] = useState(false)

  const toggle = () => { // 切换显示/隐藏
    setVisible(prevVisible => !prevVisible)
  }

  const CustomModal = (props: WICustomModalProps) => {
    const {formInstance, children} = props
    const handleOk = () => {
      formInstance && formInstance.submit() // 如果child是form实例，就提交form，具体逻辑请自定义
      setVisible(false)
    }
    const handleCancel = () => {
      setVisible(false)
    }
    return (
      <Modal
        title={title}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    )
  }

  return { CustomModal, toggle }
}

export {
  useModal
}

