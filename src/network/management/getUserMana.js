import { request } from '../request'

export function getUserMana() {
  return request({
    method: 'get',
    headers: {
      
    },
    url: '/api/v1/super-user/user/management?limit=3'
  })
}