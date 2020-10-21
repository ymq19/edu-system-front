import { request } from '../request'

export function deleteStudent(sno) {
  return request({
    method: 'delete',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    url: '/api/v1/super-user/info/student/' + sno
  })
}