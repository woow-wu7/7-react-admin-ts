import { useState, useEffect } from 'react';


type Tfetch = (...rest: any[]) => any; // 当函数参数接收任意数量，任意类型的参数时，可以用rest转成any[]类型
interface IfnParams {
  current?: number;
  pageSize?: number;
  total?: number;
  [propNmae: string]: any
}
type TuseFetch = (fetch: Tfetch, fetchParams: IfnParams) => ({
  data: any,
  doFetch: Tfetch,
  loading: boolean;
  params: IfnParams
});


const useFetch: TuseFetch = (
  fetch,
  fetchParams = {
    current: 1,
    pageSize: 8,
    total: 10,
  },
) => {
  const [params, setParams] = useState(fetchParams)
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false) // loading有两个作用，一个是防止重复点击，一个是loading动画

  // const memoryFetch = useCallback(fetch, [])
  // const memoryParams = useMemo(() => params, [params])
  // 这里注意：
  // 1. fetch和params是引用类型，不需要在 useEffect中缓存的，因为state本身就做了缓存
  // 2. 但是：如果是常量 aaaaa 是引用类型，在useEffect中就必须用useMemo做缓存，Object.is()永远是false,死循环
  // const aaaaa = {a: 1111}
  // useEffect(() => console.log(aaaaa), [aaaaa]) 死循环

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(params)
        setLoading(false)
        if (res.data) {
          setData(() => res.data)
        }
      } catch (err) {
        setLoading(false)
        console.error(err)
      }
    }

    fetchData()
  }, [fetch, params])


  // doFetch() 用于按钮等重新请求数据
  const doFetch = (fetchParams: IfnParams): void => {
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