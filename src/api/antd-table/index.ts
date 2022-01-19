import axios from '@/api/axios'
import axios2 from 'axios'


export const getTableList = (params?: any) => {
  return axios({
    method: 'get',
    url: '/api/musics',
  })
}

export const getTableList2 = (params?: any) => {
  return axios({
    method: 'get',
    url: '/api/musics',
    params,
  })
}

export const addTableList = (body: any) => {
  return axios({
    method: 'post',
    url: '/api/musics/add',
    data: {
      ...body,
    },
  })
}

export const delTableList = (id: number) => {
  return axios({
    method: 'post',
    url: '/api/musics/delete',
    data: {
      id,
    },
  })
}

export const updTableList = (body: any) => {
  return axios({
    method: 'post',
    url: '/api/musics/edit',
    data: {
      ...body,
    },
  })
}
