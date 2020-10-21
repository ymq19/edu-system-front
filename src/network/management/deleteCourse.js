import { request } from '../request'

export function deleteCourse(cno) {
  return request({
    method: 'delete',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    url: '/api/v1/super-user/info/course/' + cno
  })
}