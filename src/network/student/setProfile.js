import { request } from '../request'

export function setProfile(sno, data) {
  return request({
    method: 'put',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    url: '/api/v1/profile/' + sno,
    data: data
  })
}