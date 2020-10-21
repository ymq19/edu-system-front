import { request } from '../request'

export function getAllTeachTasks(tno) {
  return request({
    method: 'get',
    headers: {
      
    },
    url: '/api/v1/teacher/info/' + tno + '/tasks/all'
  })
}