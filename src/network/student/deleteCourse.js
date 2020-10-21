import { request } from '../request'

export function deleteCourse(data) {
  return request({
    method: 'delete',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    url: '/api/v1/selection/course',
    data: data
  })
}