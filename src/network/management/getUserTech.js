import { request } from '../request'

export function getUserTech() {
  return request({
    method: 'get',
    headers: {
      
    },
    url: '/api/v1/super-user/user/teacher?limit=3'
  })
}