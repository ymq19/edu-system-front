import { request } from '../request'

export function setEvaluation(data) {
  return request({
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    url: '/api/v1/evaluation/teacher',
    data: data
  })
}