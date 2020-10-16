import { Button, Form, Input, Modal, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { getTableList, AddTableList } from '@/api/antd-table'

const UiAntTable = (props: any) => {
  const [data, setData] = useState([])
  const [visible, setvisiable] = useState(false)
  const [form] = Form.useForm()



  useEffect(() => {
    fetch()
  }, [])

  const columns = [
    {
      title: '歌名',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: '专辑',
      dataIndex: 'album',
      key: 'album',
    },
    {
      title: '歌手',
      dataIndex: 'singer',
      key: 'singer',
    },
    {
      title: '操作',
      key: 'operate',
      render: (text: string, record: any) => {
        return (
          <Space size={6}>
            <Button size="small">修改</Button>
            <Button type="primary" danger size="small">删除</Button>
          </Space>
        )
      }
    }
  ];

  const fetch = async () => {
    const res = await getTableList()
    if (res.data) {
      setData(data => data = res.data)
    }
  }

  const add = () => {
    setvisiable(true)
  }

  const handleOk = async () => {
    const body = form.getFieldsValue(['name', 'album', 'singer'])
    const res = await AddTableList({
      ...body,
      startTime: '2011-10-16 20:02:41',
      endTime: '2020-10-16 20:02:41',
    })
    if (res) {
      fetch()
      setvisiable(false);
    }
  };

  const handleCancel = (e: any) => {
    console.log(e);
    setvisiable(false);
  };


  return (
    <div>
      <Button type="primary"  onClick={() => add()} style={{margin: '10px 0'}}>添加歌曲</Button>
      <Table columns={columns} dataSource={data} />
      <Modal
        title="添加歌曲"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          form={form}
        >
          <Form.Item label="歌名" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="专辑" name="album">
            <Input />
          </Form.Item>
          <Form.Item label="歌手" name="singer">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default UiAntTable
