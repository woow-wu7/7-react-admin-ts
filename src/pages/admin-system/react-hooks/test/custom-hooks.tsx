import { usePrevious } from '@/utils/hooks/use-previous'
import { useModal } from '@/utils/hooks/use-modal'
import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'


const CustomHooks = () => {
  const [count, setCount] = useState(0)
  const [form] = Form.useForm();
  const { CustomModal, toggle } = useModal('USEMODAL')
  const prevCount = usePrevious(count)

  const add = () => {
    setCount(prev => prev + 1)
  }

  const swtichModal = () => {
    toggle()
  }

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo);
  };

  const getDatas = () => {

  }
  
  return (
    <div style={{ background: '#fff', margin: '10px 0', padding: '10px', border: '1px solid black'}}>
      <p style={{
        margin: '10px 0', padding: '14px 24px', background: '#ffeedb',
        border: '1px solid #ff8c00', display: 'inline-block',
      }}> custom-hooks </p>

      {/* usePrevious */}
      <div style={{ border: '1px solid blue', padding: '10px', }}>
        <div>
          count: {count}
        </div><br/>
        <div>
          prevCount: {prevCount}
        </div><br/>
        <button onClick={add}>usePrevious</button>
      </div>

      {/* useModal */}
      <div style={{ border: '1px solid blue', padding: '10px', margin: '10px 0' }}>
        <CustomModal formInstance={form}>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form} 
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
          </Form>
          <div>其他内容</div>
        </CustomModal>
        <Button onClick={swtichModal}>modal</Button>
      </div>

      {/* useFetch */}
      <div style={{ border: '1px solid blue', padding: '10px', margin: '10px 0' }}>
        <Button onClick={getDatas}>获取数据</Button>
      </div>
    </div>
  )
}

export default CustomHooks
