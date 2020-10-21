import { request } from '../request'

export function getTeachTasks(tno) {
  return request({
    method: 'get',
    headers: {
      
    },
    url: '/api/v1/teacher/info/' + tno + '/tasks?limit=2'
  })
}