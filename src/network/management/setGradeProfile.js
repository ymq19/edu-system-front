import { request } from '../request'

export function setGradeProfile(sno, cno, data) {
  return request({
    method: 'put',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    url: '/api/v1/super-user/info/grade/' + sno + '/course/' + cno,
    data: data
  })
}