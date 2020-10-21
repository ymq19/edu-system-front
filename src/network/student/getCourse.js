import { request } from '../request'

export function getCourse() {
  return request({
    method: 'get',
    headers: {
      
    },
    url: '/api/v1/course?limit=5'
  })
}