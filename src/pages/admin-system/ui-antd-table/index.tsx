import { Button, Form, Input, message, Modal, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { getTableList, addTableList, delTableList, updTableList } from '@/api/antd-table'
import { CONST } from '@/global/enum'

const UiAntTable = (props: any) => {
  const [data, setData] = useState([])
  const [visible, setvisiable] = useState(false)
  const [operateType, setOperateType] = useState('')
  const [form] = Form.useForm()


  useEffect(() => {
    fetch()
  }, [])

  const renderTableOperator = (text: string) => {
    return (
      <Space size={6}>
        <Button size="small" onClick={() => updateSong(text)}>修改</Button>
        <Button type="primary" danger size="small" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => deleteSong(e, text)}>删除</Button>
      </Space>
    )
  }

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
      render: (text: string) => renderTableOperator(text)
    }
  ];


  const fetch = async () => {
    const res = await getTableList()
    if (res.data) {
      setData(data => data = res.data)
    }
  }

  const addSong = () => {
    form.resetFields()
    setOperateType(CONST.TABLE_OPERATE_ADD)
    setvisiable(true)
  }

  const deleteSong = (e: React.MouseEvent<HTMLElement, MouseEvent>, text: string) => {
    setOperateType(CONST.TABLE_OPERATE_DEL)
    setvisiable(true)
    form.setFieldsValue(text)
  }


  const updateSong = (text: string) => {
    setOperateType(CONST.TABLE_OPERATE_UPD)
    setvisiable(true)
    form.setFieldsValue(text)
  }

  // 确定按钮
  const handleOk = async () => {
    const fields = form.getFieldsValue(['name', 'album', 'singer', 'key', 'id'])
    const body = {
      ...fields,
      startTime: '2011-10-16 20:02:41',
      endTime: '2020-10-16 20:02:41',
      key: data.length + 20,
    }
    let res
    switch (operateType) {
      case CONST.TABLE_OPERATE_ADD: {
        res = await addTableList(body)
        res.status === 200 && message.success('添加成功');
        break
      }
      case CONST.TABLE_OPERATE_DEL: {
        res = await delTableList(body)
        res.status === 200 && message.success('删除成功');
        break
      }
      case CONST.TABLE_OPERATE_UPD: {
        res = await updTableList(body)
        console.log(res, '333222');
        res.status === 200 && message.success('修改成功');
        break
      }
      default:
        break
    }

    if (res) {
      fetch()
    }
    setvisiable(false);
  };

  const handleCancel = (e: any) => {
    setvisiable(false);
  };


  return (
    <div>
      <Button type="primary" onClick={() => addSong()} style={{ margin: '10px 0' }}>添加歌曲</Button>
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
