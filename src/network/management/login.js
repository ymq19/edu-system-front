import { request } from '../request'

export function superLogin(data) {
  return request({
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    url: '/api/v1/super-user/login',
    data: data
  })
}