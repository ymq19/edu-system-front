import { request } from '../request'

export function getEvaluation(sno) {
  return request({
    method: 'get',
    headers: {
      
    },
    url: '/api/v1/evaluation/' + sno 
  })
}