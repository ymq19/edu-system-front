import { request } from '../request'

export function reset(username, data) {
  return request({
    method: 'put',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    url: '/api/v1/reset/' + username,
    data: data
  })
}