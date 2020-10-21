import { request } from '../request'

export function getGrade(data) {
  return request({
    method: 'get',
    headers: {
      
    },
    url: '/api/v1/grade?limit=5',
    params: data
  })
}