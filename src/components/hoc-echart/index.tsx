import React, { useCallback, useEffect, useRef, useState } from 'react'
import echarts from 'echarts'
interface Ioption {
  option: IAny; // 配置对象
  wrapStyle?: IAny; // 样式
  className?: string; // 自定义class，为了不影响全局，最好加上唯一的前缀
  theme?: string; // 主题
  events?: IAny; // 事件的配置对象，key事件名，value事件的回调，回调有events和echarts实例两个参数
  isResize?: boolean; // 是否自适应窗口变化
  showLoading?: boolean; // 是否显示loading
}
interface IAny {
  [propName: string]: any
}


const HocEcharts = ({
  option, // 配置对象
  wrapStyle = { width: '400px', height: '400px', background: '#fff' }, // 样式
  className,// 自定义class，为了不影响全局，最好加上唯一的前缀
  theme = 'vintage', // 主题
  showLoading = true, // 是否显示loading
  isResize = true, // 是否自适应窗口变化
  events, // 事件的配置对象，key事件名，value事件的回调，回调有events和echarts实例两个参数
}: Ioption) => {
  const ref = useRef<HTMLDivElement|any>(null)

  let instance: echarts.ECharts

  // getInstance 创建或获取实例
  const getInstance = async () => {
    instance = await echarts.getInstanceByDom(ref.current) || await echarts.init(ref.current, theme)
    instance.clear() // 清除实例
  }

  // setOption 设置配置项
  const setOption = async () => {
    showLoading && instance.showLoading('default') // loading动画开始
    await new Promise(resolve => {
      setTimeout(() => {
        instance && instance.setOption(option) // 模拟异步
        resolve()
      }, 1000)
    })
    showLoading && instance.hideLoading() // loading动画开始
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

  /* eslint-disable */
  const resizeEcharts = useCallback(() => {
    instance && instance.resize()
  }, [])
  /* eslint-disable */

  /* eslint-disable */
  useEffect(() => {
    init()
  }, [])
 /* eslint-disable */

  useEffect(() => { // 监听窗口变化，echarts自适应
    if (isResize) {
      window.addEventListener('resize', resizeEcharts)
      return () => window.removeEventListener('resize', resizeEcharts) // 移除监听
    }
  }, [isResize, resizeEcharts])

  return (
    <div ref={ref} style={wrapStyle} className={className} />
  )
}

export default HocEcharts