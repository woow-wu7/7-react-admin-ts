import { useState, useEffect, useCallback } from 'react'

interface IFetch {
  (params?: any): any;
}

interface IParams {
  current?: number;
  pageSize?: number;
  total?: number;
}

/**
 * @function useFetch 请求hooks
 * @param {function} fetchFn 请求函数
 * @param {object} fnParams 请求函数的参数
 * @param {function} converter 原始数据的转换函数，默认为恒等函数，用于过滤等
 */
export function useFetch(
  fetchFn: IFetch,
  fnParams: IParams = {
    current: 1,
    pageSize: 8,
    total: 10,
  },
  converter: IFetch = data => data
) {
  const [data, setData] = useState([] as any)
  const [params, setParPms] = useState(fnParams)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  // useEffect当依赖数组中有对象，函数等引用类型时，必须做函数缓存保证每次Object.is判断是true，不会造成死循环
  const memoryConverter = useCallback(converter, [])
  const memoryFetchFn = useCallback(fetchFn, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(false)
      try {
        //   const res = await memoryFetchFn(params)
        const res = await memoryFetchFn(params)
        if (res.data) {
          const { data } = res
          setData((prevData: any) => memoryConverter(data))
        }
      } catch (err) {
        setError(true)
      }
      setLoading(false)
    }

    fetchData()
  }, [params, memoryConverter, memoryFetchFn])

  const doFetch = (params: any) => {
    setParPms(params)
  }

  return { data, error, loading, doFetch, params, setParPms }
}