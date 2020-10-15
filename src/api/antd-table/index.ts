import axios from '@/api/axios'

export const getTableList = (url: string, params?: any) => {
  return axios({
    method: 'get',
    url,
  })
}