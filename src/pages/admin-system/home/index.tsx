import React, { useEffect, useRef } from 'react'
import echarts from 'echarts'
import styles from './home.module.scss'

const Home = (props: any) => {
  const bar1: any = useRef(null)

  useEffect(() => {
    const barChart = echarts.init(bar1.current)
    window.addEventListener('resize', function () {
      barChart.resize()
    })
    const option = {
      title: { text: 'ECharts 入门示例' },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }
    barChart.setOption(option);
  }, [bar1])

  return (
    <div className={styles.home}>
      <div className={styles.top}>
        <div ref={bar1} className={styles.bar} />
        <div className={styles.bar} />
      </div>
    </div>
  )
}

export default Home
