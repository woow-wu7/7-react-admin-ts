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
      refGoRun.current = true
      window.clearTimeout(refTimer.current)
    }, delay)
  }
}
