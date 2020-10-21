import { request } from '../request'

export function getProfile(tno) {
  return request({
    method: 'get',
    headers: {
      
    },
    url: '/api/v1/teacher/profile/' + tno
  })
}