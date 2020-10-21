import { request } from '../request'

export function getAllCourse() {
  return request({
    method: 'get',
    headers: {
      
    },
    url: '/api/v1/course/all'
  })
}