import { Button, Form, Input, message, Modal, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { getTableList, addTableList, delTableList, updTableList } from '@/api/antd-table'
import { CONST } from '@/global/enum'
import HocTable from '@/components/hoc-table'
import { useFetch } from '@/utils/hooks/use-fetch'

const UiAntTable = (props: any) => {
  const [data, setData] = useState([])
  const [visible, setvisiable] = useState(false)
  const [operateType, setOperateType] = useState('')
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  // const {data, doFetch} = useFetch(getTableList, {})


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
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '操作',
      key: 'operate',
      render: (text: string) => renderTableOperator(text)
    }
  ];


  const fetch = async () => {
    try {
      setLoading(true)
      const res = await getTableList()
      if (res.data) {
        setLoading(false)
        setData(data => data = res.data)
      }
    } catch (err) {
      setLoading(false)
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
      key: operateType === CONST.TABLE_OPERATE_ADD ? data.length + 20 : fields.key,
    }
    let res: any
    setLoading(true)
    switch (operateType) {
      case CONST.TABLE_OPERATE_ADD: {
        res = await addTableList(body)
        setLoading(false)
        break
      }
      case CONST.TABLE_OPERATE_DEL: {
        res = await delTableList(body)
        break
      }
      case CONST.TABLE_OPERATE_UPD: {
        res = await updTableList(body)
        break
      }
      default:
        break
    }

    if (res.status === 200) {
      message.success(
        operateType === CONST.TABLE_OPERATE_ADD
          ? '添加成功'
          : operateType === CONST.TABLE_OPERATE_DEL ? '删除成功' : '修改成功'
      )
      fetch()
    }
    setvisiable(false);
  };

  const handleCancel = (e: any) => {
    setvisiable(false);
  };

  function onShowSizeChange(current: number, pageSize: number) {
    console.log(current, pageSize);
  }

  function onchange(page: number, pageSize?: number) {
    console.log(page, 'page');
    console.log(pageSize, 'pageSize');
  }

  return (
    <div>
      <Button type="primary" onClick={() => addSong()} style={{ margin: '10px 0' }}>添加歌曲</Button>

      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          onChange: onchange,
          position: ['bottomRight'],
          showQuickJumper: true,
          showSizeChanger: true,
          onShowSizeChange: onShowSizeChange,
          defaultPageSize: 5
        }}
      />

      <hr/>
      <HocTable columns={[]} />
      
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
