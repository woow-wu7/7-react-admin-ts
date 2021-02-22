import React, { useState } from 'react'
import { Upload, Modal, Button, message } from 'antd'
import { UploadFile } from 'antd/lib/upload/interface'
import { PlusOutlined } from '@ant-design/icons'
import axios from '@/api/axios'

const UiAntdForm: React.FC = () => {
  const [fileList, setFileList] = useState<Array<UploadFile>>([])
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(() => file.url || file.preview)
    setPreviewVisible(() => true)
    setPreviewTitle(() => file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  }

  const handleCancel = () => setPreviewVisible(() => false)

  const handleChange = ({ fileList }: { fileList: Array<UploadFile> }) => {
    message.success('上传成功')
    setFileList(() => fileList)
  }

  const getMusics = async () => {
    const res = await axios.get('/api/musics')
  }
  return (
    <div>
      <header>验证java端的上传接口</header>
      <br />
      <br />
      <Upload
        action="/api/frontendUpload" // action还是会走代理
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        name="file" // 注意，name一定要约束好，因为后端 @RequestPart("file") 是根据前端传递的name值来判断的
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
      <br />

      <Button onClick={getMusics}>点击获取歌曲数据，测试接口能否走通</Button>
    </div>
  )
}

export default UiAntdForm
