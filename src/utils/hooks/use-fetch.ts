import { useState, useEffect } from 'react'

interface IFetch {
  (params?: any): any;
}

/**
 * @function useFetch 请求hooks
 * @param {function} fetchFn 请求函数
 * @param {object} fnParams 请求函数的参数
 */
export function useFetch(fetchFn: IFetch, fnParams = {}) {
  const [data, setData] = useState([] || {})
  const [params, setParPms] = useState(fnParams)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setIsError(false)
      try {
        const res = await fetchFn(params)
        if (res.data) {
          setData(data => data = res.data)
          setIsLoading(false)
        }
      } catch(err) {
        setIsError(true)
      }
      setIsLoading(false)
    }

    fetchData()
  }, [params])

  const doFetch = (params: any) => {
    setParPms(params)
  }

  return [data, isError, isLoading, doFetch,]
}