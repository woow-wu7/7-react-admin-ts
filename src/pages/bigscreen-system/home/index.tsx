import React, { useState, Suspense } from 'react'
import { Button } from 'antd';


const Home = (props: any) => {

  const [AsyncTest, setAsyncTest] = useState<any>()
  const [AsyncTest2, setAsyncTest2] = useState<any>()

  const asyncLoad1 = () => {
    import(/* webpackChunkName: "AsyncTest" */'../../../components/async-test')
      .then(({ default: AsyncTest }) => {
        setAsyncTest((element: any) => element = AsyncTest)
      })
      .catch(err => console.log(err))
  }

  const asyncLoad2 = () => {
    const Test2 = React.lazy(() => import(/* webpackChunkName: "AsyncTest2" */'../../../components/async-test2'))
    setAsyncTest2((component: any) => component = Test2)
  }

  // const onFinish = (values: any) => {
  //   console.log('Success:', values);
  // };

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log('Failed:', errorInfo);
  // };

  return (
    <div>
      <header>home page bigscreen</header>

      <Button onClick={() => {
        asyncLoad1()
        asyncLoad2()
      }}>异步加载</Button>

      {AsyncTest ? AsyncTest() : null}
      {/* {AsyncTest ? <AsyncTest />: null} */}

      <Suspense fallback={<div>Loading...</div>}>
        {AsyncTest2 ? <AsyncTest2 /> : null}
      </Suspense>

      {/* <Prompt message={() => isSave ? true : '表单还未保存，真的需要跳转吗？'} ></Prompt> */}
      {/* <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item >
          <Button type="primary" htmlType="submit">
            Submit
        </Button>
        </Form.Item>
      </Form> */}
    </div>
  )
}

export default Home