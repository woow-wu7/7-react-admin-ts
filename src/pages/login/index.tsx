import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Checkbox, Select } from "antd"
import loginStyle from './login.module.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actions from '../../app.action'
import { SYSTEMTYPE } from '../../global/enum'
import { ILoginMessage } from '../../global/interface'
import { setLocalStorage } from '../../utils'

// 避免在 Login 中重复渲染
const list = [
  {
    label: '测试菜单',
    value: 'monitor'
  },
  {
    label: '测试菜单',
    value: 'credit'
  },
  {
    label: '测试菜单',
    value: 'search'
  },
  {
    label: '测试菜单',
    value: 'origin'
  }
]

// form样式
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

// imgage动画数组
const imagesArr = [
  <div className={loginStyle.image1} key={1}></div>,
  <div className={loginStyle.image2} key={2}></div>,
  <div className={loginStyle.image3} key={3}></div>,
  <div className={loginStyle.image1} key={4}></div>,
  <div className={loginStyle.image2} key={5}></div>,
  <div className={loginStyle.image3} key={6}></div>,
]

const Login = (
  props: {
    history?: any;
    changeSystemType?: any;
    getLoginMessage: (message: ILoginMessage) => void;
    systemType: string;
  }
) => {
  const [activedMenu, setActivedMenu] = useState('')
  const [form] = Form.useForm();

  const { changeSystemType, getLoginMessage, systemType } = props
  const { Option } = Select;

  const handleChange = (type: string) => {
    changeSystemType(type)
  }

  const onFinish = (values: any) => {
    const loginMessage = {
      token: 'token123456',
      roles: 'admin'
    }

    getLoginMessage(loginMessage); // 存入store
    setLocalStorage('loginMessage', loginMessage) // 存入 localstorage

    SYSTEMTYPE[systemType] === SYSTEMTYPE.BIGSCREEN
      ? props.history.push('/big-screen-home')
      : props.history.push('/admin-home')
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const fill = () => {
    form.setFieldsValue({
      username: 'username',
      password: 'password'
    })
  }

  const change = (v: string) => {
    setActivedMenu(value => value = v)
  }

  return (
    <div className={loginStyle.login}>
      <div className={loginStyle.wrap}>
        <div className={loginStyle.wrapLeft}>
          {imagesArr.map(item => item)}
        </div>
        <div className={loginStyle.wrapRight}>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className={loginStyle.loginForm}
            form={form}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item className="custom-form-button">
              <Button type="primary" block size="large" onClick={fill}>
                自动填充
          </Button>
            </Form.Item>

            <Form.Item className="custom-form-button">
              <Button type="primary" htmlType="submit" block size="large">
                登陆
          </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={loginStyle.listMenu}>
          <div>
            <Select value={systemType} className={loginStyle.select} onChange={handleChange}>
              <Option value={SYSTEMTYPE.ADMIN}>后台系统</Option>
              <Option value={SYSTEMTYPE.BIGSCREEN}>大屏系统</Option>
            </Select>
          </div>
          {list.map(({ label, value }, i) => {
            return (
              <div className={`${loginStyle.menuItem} ${activedMenu === value ? loginStyle.atived : ''}`} key={i} onClick={() => change(value)}>
                {label}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}


const mapStateToProps = (state: any) => {
  return {
    systemType: state.app.systemType,
  }
}

const mapDispatchToProps = (payload: any) => {
  return bindActionCreators(actions, payload)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)