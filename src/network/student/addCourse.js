import { request } from '../request'

export function addCourse(data) {
  return request({
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    url: '/api/v1/selection/course',
    data: data
  })
}