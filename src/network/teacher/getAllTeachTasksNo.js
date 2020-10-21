import { request } from '../request'

export function getAllTeachTasksNo(tno, cno) {
  return request({
    method: 'get',
    headers: {
      
    },
    url: '/api/v1/teacher/info/' + tno + '/course/' + cno + '/tasks/all'
  })
}