import React, { useState } from 'react'
import { Modal } from 'antd'

interface IformInstance {
  submit: () => void
}

interface ICustomModalProps {
  formInstance?: IformInstance;
  children: any; // 必传属性
}

const useModal = (title: string) => {
  const [visible, setVisible] = useState(false)

  const toggle = () => { // 切换显示/隐藏
    setVisible(prevVisible => !prevVisible)
  }

  const CustomModal = (props: ICustomModalProps) => {
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

