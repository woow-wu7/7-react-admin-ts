import React, { useState } from 'react'
import { Button, Form, Input, Checkbox, Select } from "antd"
import loginStyle from './login.module.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actions from '../../app.action'

const Login = (props: any) => {
  const [list] = useState([
    {
      label: '监管机构',
      value: 'monitor'
    },
    {
      label: '征信机构',
      value: 'credit'
    },
    {
      label: '查询机构',
      value: 'search'
    },
    {
      label: '数据源',
      value: 'origin'
    }
  ])

  const [activedMenu, setActivedMenu] = useState('')
  const [form] = Form.useForm();

  const { changeSystemType, getToken, systemType } = props
  const { Option } = Select;

  const handleChange = (type: string) => {
    changeSystemType(type)
  }

  const onFinish = (values: any) => {
    console.log('Success:', values);
    getToken('token123456')
    props.history.push('/home')
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
    changeSystemType(v)
  }

  console.log(props, 'props');

  return (
    <div className={loginStyle.login}>
      <div className={loginStyle.wrap}>
        <div className={loginStyle.wrapLeft}></div>
        <div className={loginStyle.wrapRight}>
          <Form
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

            <Form.Item >
              <Button type="primary" block size="large" onClick={fill}>
                自动填充
          </Button>
            </Form.Item>

            <Form.Item >
              <Button type="primary" htmlType="submit" block size="large">
                登陆
          </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={loginStyle.listMenu}>
          <div>
            <Select defaultValue={systemType} className={loginStyle.select} onChange={handleChange}>
              <Option value="admin">后台系统</Option>
              <Option value="bigscreen">大屏系统</Option>
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