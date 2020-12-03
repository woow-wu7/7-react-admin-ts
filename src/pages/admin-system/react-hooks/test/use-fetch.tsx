import React, { useEffect } from 'react'
import { Button } from 'antd'
import { useFetch } from '@/utils/hooks/use-fetch'
import axios from 'axios'

const UseFetch = () => {
  const { data, doFetch } = useFetch(
    ({ url }) => new Promise(resolve => axios.get(url).then(res => resolve(res))),
    {
      url: 'https://api.10248.top/API/pic.php'
    },
    'initNotRun'
  )

  console.log('data :>> ', data);

  const getData = () => {
    doFetch({
      url: '/dsapi/'
    })
  }
  return (
    <div className="use-fetch">
      <p>useFetch</p>
      {data?.caption && <h1>{data.caption}</h1>}
      {data?.note && <h1>{data.note}</h1>}<br/>
      {data?.picture && <img src={data.picture} alt="" />}
      <br/>
      <br/>
      <Button onClick={getData} className="use-button">useFetch请求测试</Button> &nbsp;
      <br/>
      <br/>
    </div>
  )
}

export default UseFetch
