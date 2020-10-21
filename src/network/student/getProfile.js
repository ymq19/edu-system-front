import { request } from '../request'

export function getProfile(sno) {
  return request({
    method: 'get',
    headers: {
      
    },
    url: '/api/v1/profile/' + sno
  })
}