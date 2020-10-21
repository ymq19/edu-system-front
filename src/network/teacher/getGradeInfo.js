import { request } from '../request'

export function getGradeInfo(tno) {
  return request({
    method: 'get',
    headers: {
      
    },
    url: '/api/v1/teacher/' + tno + '/course/grade?limit=3'
  })
}