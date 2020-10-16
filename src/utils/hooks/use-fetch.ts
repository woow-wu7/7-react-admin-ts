import { useState, useEffect, useCallback } from 'react'

interface IFetch {
  (params?: any): any;
}

/**
 * @function useFetch 请求hooks
 * @param {function} fetchFn 请求函数
 * @param {object} fnParams 请求函数的参数
 * @param {function} converter 原始数据的转换函数，默认为恒等函数，用于过滤等
 */
export function useFetch(
  fetchFn: IFetch,
  fnParams = {},
  converter: IFetch = data => data
) {
  const [data, setData] = useState([] || {})
  const [params, setParPms] = useState(fnParams)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // useEffect当依赖数组中有对象，函数等引用类型时，必须做函数缓存保证每次Object.is判断是true，不会造成死循环
  const memoryConverter = useCallback(converter, [])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setIsError(false)
      try {
        const res = await fetchFn(params)
        if (res.data) {
          setData(data => data = memoryConverter(res.data))
          setIsLoading(false)
        }
      } catch (err) {
        setIsError(true)
      }
      setIsLoading(false)
    }

    fetchData()
  }, [params, memoryConverter, fetchFn])

  const doFetch = (params: any) => {
    setParPms(params)
  }

  return [data, isError, isLoading, doFetch,]
}