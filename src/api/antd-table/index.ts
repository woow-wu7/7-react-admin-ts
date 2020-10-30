import axios from '@/api/axios'

export const getTableList = (params?: any) => {
  return axios({
    method: 'get',
    url: '/api/table-list',
    params,
  })
}

export const addTableList = (body: any) => {
  return axios({
    method: 'post',
    url: '/api/table-list/add',
    data: {
      ...body
    },
  })
}


export const delTableList = (id: number) => {
  return axios({
    method: 'post',
    url: '/api/table-list/del',
    data: {
      id
    },
  })
}

export const updTableList = (body: any) => {
  return axios({
    method: 'post',
    url: '/api/table-list/upd',
    data: {
      ...body
    },
  })
}