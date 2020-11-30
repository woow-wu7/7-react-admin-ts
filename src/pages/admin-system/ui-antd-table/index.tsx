import { Button, Form, Input, message, Modal, Space, Table } from 'antd'
import React, { useState } from 'react'
import { getTableList, addTableList, delTableList, updTableList } from '@/api/antd-table'
import { CONST } from '@/global/enum'
import { useFetch } from '@/utils/hooks/use-fetch'
import styles from './ui-antd-table.module.scss'

const UiAntTable = (props: any) => {
  const [visible, setvisiable] = useState(false)
  const [operateType, setOperateType] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [modelDanger, setModelDanger] = useState(false)
  const [search, setSearch] = useState('')
  const [form] = Form.useForm()
  const { data, doFetch, loading, params } = useFetch(getTableList, {
    current: 1,
    pageSize: 10,
    total: 20,
  }, (data) => {
    return data
  })

  if (!data?.data) return '' // 兼容性

  const { current, pageSize } = params

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

  const addSong = () => {
    setSearch('')
    form.resetFields()
    setOperateType(CONST.TABLE_OPERATE_ADD)
    setvisiable(true)
  }

  const deleteSong = (e: React.MouseEvent<HTMLElement, MouseEvent>, text: string) => {
    setSearch('')
    setOperateType(CONST.TABLE_OPERATE_DEL)
    setModelDanger(true)
    setDisabled(true)
    setvisiable(true)
    form.setFieldsValue(text)
  }

  const updateSong = (text: string) => {
    setSearch('')
    setOperateType(CONST.TABLE_OPERATE_UPD)
    setvisiable(true)
    form.setFieldsValue(text)
  }

  // 确定按钮
  const handleOk = async () => {
    setDisabled(false)
    setModelDanger(false)
    let errs
    await form.validateFields().catch(err => errs = err)
    if (errs) {
      return
    }

    const fields = form.getFieldsValue(['name', 'album', 'singer', 'key', 'id'])
    const body = {
      ...fields,
      startTime: '2011-10-16 20:02:41',
      endTime: '2020-10-16 20:02:41',
      key: operateType === CONST.TABLE_OPERATE_ADD ? data.data.length + 20 : fields.key,
    }

    let res: any
    /* eslint-disable */
    switch (operateType) {
      case CONST.TABLE_OPERATE_ADD: {
        res = await addTableList(body)
        break
      }
      case CONST.TABLE_OPERATE_DEL: {
        res = await delTableList(body.id)
        break
      }
      case CONST.TABLE_OPERATE_UPD: {
        res = await updTableList(body)
        break
      }
      default:
        break
    }
    /* eslint-disable */
    if (res.status === 200) {
      setvisiable(false)
      message.success(
        operateType === CONST.TABLE_OPERATE_ADD
          ? '添加成功'
          : operateType === CONST.TABLE_OPERATE_DEL ? '删除成功' : '修改成功'
      )
      doFetch({})
    }
    setvisiable(false)
  };

  const handleCancel = (e: any) => {
    setModelDanger(false)
    setDisabled(false)
    setvisiable(false)
  };

  function onShowSizeChange(current: number, pageSize: number) {
    console.log(current, pageSize);
  }

  function changePagination(page: number) {
    setSearch('')
    doFetch({
      current: page,
      pageSize: 8,
    })
  }

  function onChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value)
  }

  function handleSearch() {
    search ? doFetch({ name: search }) : null
  }

  return (
    <div className={styles.uiAntdTable}>
      <div className="flex flex-j-between flex-a-center">
        <Button type="primary" onClick={() => addSong()} style={{ margin: '10px 0' }}>添加歌曲</Button>
        <div className="flex searchWrap">
          <Input placeholder="搜索关键字" value={search} onChange={onChangeSearch} /> &nbsp;
          <Button onClick={handleSearch} className={styles.searchButton}>搜索</Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={data?.data}
        loading={loading}
        pagination={{
          onChange: changePagination,
          onShowSizeChange: onShowSizeChange,
          position: ['bottomRight'],
          showQuickJumper: true,
          showSizeChanger: true,
          current,
          pageSize,
          total: data?.total || 0,
        }}
      />

      {/* <hr /> */}
      {/* <HocTable columns={[]} /> */}

      <Modal
        title="添加歌曲"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
        okButtonProps={{ danger: modelDanger }}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          form={form}
        >
          <Form.Item label="歌名" name="name" rules={[{ required: true, message: '歌名不能为空' }]}>
            <Input disabled={disabled} />
          </Form.Item>
          <Form.Item label="专辑" name="album" >
            <Input disabled={disabled} />
          </Form.Item>
          <Form.Item label="歌手" name="singer" >
            <Input disabled={disabled} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default UiAntTable
