import React, { useEffect, useRef, useState } from 'react'
import echarts from 'echarts'
interface Ioption {
  option: any; // 配置对象
  wrapStyle?: any; // 样式
  className?: string; // 自定义class，为了不影响全局，最好加上唯一的前缀
  theme?: string; // 主题
  isResize?: boolean;
  events?: any
}


const HocEcharts = ({
  option,
  wrapStyle = { width: '400px', height: '400px', background: '#fff' },
  className,
  theme = 'vintage',
  isResize = true,
  events,
}: Ioption) => {
  const ref = useRef<any>(null)
  let instance: any = null

  // getInstance 创建或获取实例
  const getInstance = async () => {
    instance = await echarts.getInstanceByDom(ref.current) || await echarts.init(ref.current, theme)
    instance.clear()
  }

  // setOption 设置配置项
  const setOption = async () => {
    instance.showLoading('default') // login动画开始
    await new Promise(resolve => {
      setTimeout(() => {
        instance && instance.setOption(option) // 模拟异步
        resolve()
      }, 1000)
    })
    instance.hideLoading('default') // login动画开始
  }

  const bindEvent = () => {
    if (instance && events) {
      for (let i in events) {
        instance.on(i, events[i].query, (e: any) => events[i].callback(e, instance))
      }
    }
  }

  const init = async () => {
    await getInstance() // 生成或者获取echart实例
    await setOption() // 设置echarts配置项
    await bindEvent() // 绑定事件
  }

  const resizeEcharts = () => {
    instance && instance.resize()
  }

  useEffect(() => {
    init()
  }, [])

  useEffect(() => { // 监听窗口变化，echarts自适应
    if (isResize) {
      window.addEventListener('resize', resizeEcharts)
      return () => window.removeEventListener('resize', resizeEcharts)
    }
  }, [])

  return (
    <div ref={ref} style={wrapStyle} className={className} />
  )
}

export default HocEcharts