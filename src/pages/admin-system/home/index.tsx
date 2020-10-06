import React,{ useEffect } from 'react'
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Home = (props: any) => {
  const history = useHistory()
  console.log(props);  
  return (
    <div>
      <header>home page  admin</header>
      <Button onClick={() => history.push('/admin-home2')}>点击去home2</Button>
    </div>
  )
}

export default Home
