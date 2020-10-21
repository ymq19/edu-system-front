import { request } from '../request'

export function getAllGrade(data) {
  return request({
    method: 'get',
    headers: {
      
    },
    url: '/api/v1/grade/all',
    params: data
  })
}