import React,{ useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory  } from 'react-router-dom'

const Home = (props: any) => {
  console.log(props);
  let history = useHistory();
  const token = useSelector((state: any) => state.app.token)

  useEffect(() => {
    if(!token) {
      history.replace('/login')
    }
  }, [])
  
  return (
    <div>
      <header>home page  admin</header>
    </div>
  )
}

export default Home