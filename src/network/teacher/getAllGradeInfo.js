import { request } from '../request'

export function getAllGradeInfo(tno) {
  return request({
    method: 'get',
    headers: {
      
    },
    url: '/api/v1/teacher/info/' + tno + '/grade/all'
  })
}