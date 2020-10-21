import { request } from '../request'

export function superReset(username, data) {
  return request({
    method: 'put',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    url: '/api/v1/super-user/reset/' + username,
    data: data
  })
}