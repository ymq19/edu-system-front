import { request } from '../request'

export function getUserStudent() {
  return request({
    method: 'get',
    headers: {
      
    },
    url: '/api/v1/super-user/user/student?limit=3'
  })
}