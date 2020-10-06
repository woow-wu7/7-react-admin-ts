import React,{ useEffect } from 'react'
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Home = (props: any) => {
  const history = useHistory()
  console.log(props);  
  return (
    <div>
      <header>home page  admin2</header>
      <Button onClick={() => history.push('/admin-home')}>点击去home1</Button>
    </div>
  )
}

export default Home
