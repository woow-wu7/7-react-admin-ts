import React, { useEffect, useRef } from 'react'
import echarts from 'echarts'
import styles from './home.module.scss'
import HocEcharts from '@/components/hoc-echart'

const Home = (props: any) => {
  const barOption = {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '直接访问',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220]
      }
    ]
  };
  return (
    <div className={styles.home}>
      <div className={styles.top}>
          <HocEcharts
            option={barOption}
            wrapStyle={{ height: '400px', width: '300px', background: '#fff' }}
          />
          <HocEcharts
            option={barOption}
            wrapStyle={{ height: '400px', width: '300px', background: '#fff' }}
          />
      </div>
    </div>
  )
}

export default Home
