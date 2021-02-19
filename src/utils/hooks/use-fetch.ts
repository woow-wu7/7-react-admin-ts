import { useState, useEffect, useCallback } from 'react'
import { message } from 'antd'

type Tfetch = (...rest: any[]) => any // 当函数参数接收任意数量，任意类型的参数时，可以用rest转成any[]类型
interface IfnParams {
  current?: number;
  pageSize?: number;
  total?: number;
  [propNmae: string]: any;
}
interface Iconverter {
  (data: any): any;
}

type TuseFetch = (
  fetch: Tfetch, // 请求函数
  fetchParams?: IfnParams, // 请求函数的参数
  isInitRun?: boolean | 'initRun' | 'initNotRun', // 初始化时，是否执行请求函数，接受boolean，和两个字符串 'initRun' 'initNotRun'
  converter?: Iconverter // 转换函数
) => {
  data: any;
  doFetch: Tfetch;
  loading: boolean;
  params: IfnParams;
}

const useFetch: TuseFetch = (
  fetch,
  fetchParams = {
    current: 1,
    pageSize: 10,
    total: 10,
  },
  isInitRun = true, // 初始化时，是否执行请求函数，接受boolean，和两个字符串 'initRun' 'initNotRun'，默认值true
  converter = (data) => data
) => {
  const [params, setParams] = useState(fetchParams)
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false) // loading有两个作用，一个是防止重复点击，一个是loading动画
  const [isGoRun, setIsGoRun] = useState(isInitRun) // !!!!! 这里需要用state去替代传入的参数isInitRun，因为传入的参数isInitRun永远不变，这请求函数fech永远不会执行，而我们要在调用doFetch时，重新执行fetch函数

  const memoryFetch = useCallback(fetch, [])
  const memoryconverter = useCallback(converter, [])
  // const memoryParams = useMemo(() => params, [params])
  // 这里注意：
  // 1. params是引用类型，不需要在 useEffect中缓存的，因为state本身就做了缓存
  // 2. 但是：如果是常量 aaaaa 是引用类型，在useEffect中就必须用useMemo做缓存，Object.is()永远是false,死循环
  // const aaaaa = {a: 1111}
  // useEffect(() => console.log(aaaaa), [aaaaa])

  useEffect(() => {
    if ((typeof isGoRun === 'boolean' && !isGoRun) || isGoRun === 'initNotRun') {
      return
    }
    const fetchData = async () => {
      setLoading(true)
      try {
        // res
        // 1. 该res是http返回的相应体，经过了axios的处理和axiosInstance.interceptors的处理
        // 2. 包含了data, headers, request, config, status, statusText 等信息
        const res = await memoryFetch(params)
        setLoading(false)
        if (res.data) {
          setData(() => memoryconverter(res.data))
        }
      } catch (err) {
        setLoading(false)
        console.error(err)
        if (err.message) {
          message.error(err.message)
        }
      }
    }

    fetchData()
  }, [memoryFetch, params, memoryconverter, isInitRun, isGoRun])

  // doFetch() 用于按钮等重新请求数据
  const doFetch = (fetchParams: IfnParams): void => {
    setIsGoRun(true) // 设置之后，才会进入到fetch函数
    setParams(fetchParams)
  }

  return { data, doFetch, loading, params }
  // 返回
  // data: 数据
  // doFetch：请求函数
  // loading： 比如用于table的loading
  // params: 比如用于table的分页参数
}

export { useFetch }
