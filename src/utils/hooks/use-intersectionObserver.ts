import { useRef, useEffect } from 'react';

type TuseIntersectionObserver = (doms: any[], option: IOption) => void

interface IOption {
  root?: any;
  rootMargin?: string;
  threshold?: number[]; // 阈值，比如[0]，表示交叉比例
}

/**
 * @desc 容器和被观测对象有交集，触发回调
 * @param {doms} 需要观察的DOM或者DOM集合
 * @param {option} 配置对象，root，rootMargin，threshold
 */
export const useIntersectionObserver: TuseIntersectionObserver = (doms, option) => {
  const refIo = useRef<any>(null) // 注意：不能用变量，防止重复执行是被重新初始化

  useEffect(() => {
    if (!doms.length) return; // doms可能是空数组，空数组是io.observe()不是DOM会报错
    refIo.current = new IntersectionObserver((entrys) => {
      entrys.forEach((item) => {
        if (item.intersectionRatio > 0) { // entry.intersectionRadio 交叉比例，大于0表示root和target存在交集
          item.target.setAttribute('src', `${item.target.getAttribute('data-src')}`)
          // entry.target表示观察的DOM，即在io.oberve(target)传入的观察者
        }
      })
    }, option)
    doms.forEach(imageItem => refIo.current.observe(imageItem)) // 开始观察

    return () => refIo.current.disconnect() // 清除工作，关闭观察器
  })
}
