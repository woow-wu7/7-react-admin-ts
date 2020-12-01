import { useRef } from 'react'

interface IuseThrottle {
  (fn: Ifn, delay: number): IClosure;
}

interface Ifn {
  (...rest: any[]): any
}

interface IClosure {
  (e: any, ...rest: any[]): any
}

export const useThrottle: IuseThrottle = (fn, delay) => {
  const refGoRun = useRef(true)
  const refTimer = useRef(1)

  return (e, ...args) => {
    if (!refGoRun.current) {
      return
    }
    refGoRun.current = false

    refTimer.current = window.setTimeout(() => {
      fn.call(args)
      refGoRun.current = true // 执行完后标志位改为true，可再次进入
      window.clearTimeout(refTimer.current) // 每次执行完，清除定时器
    }, delay)
  }
}
