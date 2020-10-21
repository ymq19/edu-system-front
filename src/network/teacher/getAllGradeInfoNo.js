import { request } from '../request'

export function getAllGradeInfoNo(tno, cno) {
  return request({
    method: 'get',
    headers: {
      
    },
    url: '/api/v1/teacher/info/' + tno + '/grade/' + cno
  })
}