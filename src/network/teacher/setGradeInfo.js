import { request } from '../request'

export function setGradeInfo(sno, cno, data) {
  return request({
    method: 'put',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    url: '/api/v1/teacher/info/course/' + cno + '/stu/' + sno,
    data: data
  })
}