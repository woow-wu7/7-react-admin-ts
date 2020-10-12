import React, { useEffect, useRef, useState } from 'react'
import echarts from 'echarts'

interface Ioption {
  option: any;
  wrapStyle?: any;
}

const HocEcharts = ({
  option,
  wrapStyle = { width: '400px', height: '400px', background: '#fff' },
}: Ioption) => {
  let instance: any = null
  const ref = useRef<any>(null)

  const getInstance = () => {
    instance = echarts.getInstanceByDom(ref.current) || echarts.init(ref.current)
  }

  const setOption = () => {
    instance && instance.setOption(option)
  }

  useEffect(() => {
    getInstance()
    setOption()
  }, [])

  return (
    <div>
      <div ref={ref} style={wrapStyle}  />
    </div>
  )
}

export default HocEcharts