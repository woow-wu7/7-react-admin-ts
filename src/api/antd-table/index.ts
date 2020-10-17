import axios from '@/api/axios'

export const getTableList = (params?: any) => {
  return axios({
    method: 'get',
    url: '/table-list',
    params,
  })
}

export const addTableList = (body: any) => {
  return axios({
    method: 'post',
    url: '/table-list/add',
    data: {
      ...body
    },
  })
}


export const delTableList = (body: any) => {
  return axios({
    method: 'post',
    url: '/table-list/del',
    data: {
      ...body
    },
  })
}

export const updTableList = (body: any) => {
  return axios({
    method: 'post',
    url: '/table-list/upd',
    data: {
      ...body
    },
  })
}