import { request } from '../request'

export function setCourseInfo(cno, data) {
  return request({
    method: 'put',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    url: '/api/v1/super-user/info/course/' + cno,
    data: data
  })
}