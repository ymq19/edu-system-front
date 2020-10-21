import { request } from '../request'

export function setStudentProfile(sno, data) {
  return request({
    method: 'put',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    url: '/api/v1/super-user/info/student/' + sno,
    data: data
  })
}