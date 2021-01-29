// 1. 每个接口将 current 转换成 pageNum
export const apiListParamsFilter = (params: any) => {
  const paramsFilter = {
    ...params,
    pageNum: params.current
  }
  Reflect.deleteProperty(paramsFilter, 'current')
  Reflect.deleteProperty(paramsFilter, 'total')
  !!!params.key && Reflect.deleteProperty(paramsFilter, 'key')
  return paramsFilter
}
