import { request } from '../request'

export function setProfile(tno, data) {
  return request({
    method: 'put',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    url: '/api/v1/teacher/profile/' + tno,
    data: data
  })
}