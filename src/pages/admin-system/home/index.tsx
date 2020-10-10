import React, { useRef } from 'react'
import echarts from 'echarts'

const Home = (props: any) => {
  const bar = useRef(null)
  return (
    <div>
      <div ref={bar}/>
    </div>
  )
}

export default Home
