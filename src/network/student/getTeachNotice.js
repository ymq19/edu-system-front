import { request } from '../request'

export function getTeachNotice(sno) {
  return request({
    method: 'get',
    headers: {
      
    },
    url: '/api/v1/notice/' + sno + '?limit=3'
  })
}