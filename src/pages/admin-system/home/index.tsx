import React, { useEffect, useRef, useState } from 'react'
import styles from './home.module.scss'
import HocEcharts from '@/components/hoc-echart'
import { Select } from 'antd';

const { Option } = Select;

const Home = (props: any) => {
  const [theme, setTheme] = useState('vintage')
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
  const barOption2 = {
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
  const handleChange = (v: string) => {
    setTheme((theme) => theme = v)
  }
  const Events = {
    click: {
      query: 'series',
      callback: function (e: any, instance: any) {
        console.log(e, '22')
        console.log(instance, '333')
      }
    },
    legendselectchanged: {
      query: 'series',
      callback: function (e: any, instance: any) {
      }
    }
  }
  return (
    <div className={styles.home}>
      {/* <div style={{ marginBottom: '10px' }}>
        <span style={{ marginRight: '10px', }}>
          请选择主题:
        </span>
        <Select defaultValue="vintage" onChange={handleChange}>
          <Option value="vintage">vintage</Option>
          <Option value="roma">roma</Option>
          <Option value="macarons">macarons</Option>
        </Select>
      </div> */}
      <div className={styles.top}>
        <HocEcharts
          option={barOption}
          className="custom-echarts-bar" // echarts的样式在styles全局设置
          theme={theme}
          isResize={true}
          showLoading={true}
          events={Events}
        />
        <HocEcharts
          option={barOption2}
          className="custom-echarts-bar"
          theme={theme}
          isResize={true}
          showLoading={true}
          events={Events}
        />
      </div>
    </div>
  )
}

export default Home
