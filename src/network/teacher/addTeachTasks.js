import { request } from '../request'

export function addTeachTasks(tno, cno, data) {
  return request({
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    url: '/api/v1/teacher/info/' + tno + '/tasks/' + 'course/' + cno,
    data: data
  })
}