import React from 'react'
import styles from './bigscreen.module.scss'
import screenfull from 'screenfull'

const Material = (props: any) => {
  const fullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.request();
    }
  }
  return (
    <div className={styles.matarialBigScreen}>
      <div className={styles.fullscreenButton} onClick={fullscreen}>全屏</div>

      <div className={styles.plugins}>
        <p className={styles.title}>线上</p>
        <a href="https://juejin.im/post/6844903981945208839" target="_blank" rel="noopener noreferrer">(1) 线上后台系统</a>
      </div>

      <div className={styles.plugins}>
        <p className={styles.title}>插件</p>
        <a href="https://github.com/sindresorhus/screenfull.js" target="_blank" rel="noopener noreferrer">(1) screenfull.js</a>
      </div>

      <div className={styles.plugins}>
        <p className={styles.title}>TS</p>
        <a href="https://blog.csdn.net/sinat_17775997/article/details/106465327" rel="noopener noreferrer" target="_blank">(1) React 中常见的TS类型</a>
      </div>

      
      <div className={styles.plugins}>
        <p className={styles.title}>echarts</p>
        <a href="https://segmentfault.com/a/1190000020445644" rel="noopener noreferrer" target="_blank">(1) react中 echarts的封装</a>
        <a href="https://hellohy.github.io/post/react-echarts/" rel="noopener noreferrer" target="_blank">(2) react中 echarts的封装</a>
        <a href="https://blog.csdn.net/sinat_17775997/article/details/106465327" rel="noopener noreferrer" target="_blank">(3) echarts改变主题</a>
        <a href="https://www.cnblogs.com/zhangnan35/p/12680038.html" rel="noopener noreferrer" target="_blank">(4) vue中 echarts的封装</a>
      </div>
    </div>
  )
}

export default Material
