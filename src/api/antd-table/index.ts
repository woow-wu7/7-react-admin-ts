import axios from '@/api/axios'

export const getTableList = (params?: any) => {
  return axios({
    method: 'get',
    url: '/table-list',
    params,
  })
}

export const AddTableList = (body: any) => {
  return axios({
    method: 'post',
    url: '/table-list/add',
    data: {
      ...body
    },
  })
}