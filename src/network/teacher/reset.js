import { request } from '../request'

export function teacherReset(username, data) {
  return request({
    method: 'put',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    url: '/api/v1/teacher/reset/' + username,
    data: data
  })
}