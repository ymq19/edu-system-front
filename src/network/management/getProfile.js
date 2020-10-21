import { request } from '../request'

export function getProfile(mno) {
  return request({
    method: 'get',
    headers: {
      
    },
    url: '/api/v1/super-user/profile/' + mno
  })
}