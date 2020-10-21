import { request } from '../request'

export function getAllTeachNotice(sno) {
  return request({
    method: 'get',
    headers: {
      
    },
    url: '/api/v1/notice/' + sno + '/all'
  })
}