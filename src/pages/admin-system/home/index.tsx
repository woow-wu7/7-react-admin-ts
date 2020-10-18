import React, { useState } from 'react'
import styles from './home.module.scss'
import HocEcharts from '@/components/hoc-echart'

const Home = (props: any) => {
  const [theme] = useState('vintage')
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
  const option3 = {
    xAxis: {
      type: 'category',
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '30%']
    },
    visualMap: {
      type: 'piecewise',
      show: false,
      dimension: 0,
      seriesIndex: 0,
      pieces: [{
        gt: 1,
        lt: 3,
        color: 'rgba(0, 180, 0, 0.5)'
      }, {
        gt: 5,
        lt: 7,
        color: 'rgba(0, 180, 0, 0.5)'
      }]
    },
    series: [
      {
        type: 'line',
        smooth: 0.6,
        symbol: 'none',
        lineStyle: {
          color: 'green',
          width: 5
        },
        markLine: {
          symbol: ['none', 'none'],
          label: { show: false },
          data: [
            { xAxis: 1 },
            { xAxis: 3 },
            { xAxis: 5 },
            { xAxis: 7 }
          ]
        },
        areaStyle: {},
        data: [
          ['2019-10-10', 200],
          ['2019-10-11', 400],
          ['2019-10-12', 650],
          ['2019-10-13', 500],
          ['2019-10-14', 250],
          ['2019-10-15', 300],
          ['2019-10-16', 450],
          ['2019-10-17', 300],
          ['2019-10-18', 100]
        ]
      }
    ]
  };
  const option4 = {
    title: {
      text: '折线图堆叠'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '邮件营销',
        type: 'line',
        stack: '总量',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '联盟广告',
        type: 'line',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '视频广告',
        type: 'line',
        stack: '总量',
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: '直接访问',
        type: 'line',
        stack: '总量',
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: '搜索引擎',
        type: 'line',
        stack: '总量',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]
  };

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

      <div className={styles.middle}>
        <HocEcharts
          option={option3}
          wrapStyle={{ width: '100%', height: '400px', background: '#fff', marginTop: '10px' }}
          theme={theme}
          isResize={true}
          showLoading={true}
          events={Events}
        />

        <HocEcharts
          option={option4}
          wrapStyle={{ width: '100%', height: '400px', background: '#fff', marginTop: '10px', padding: '30px 20px 20px 20px' }}
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
