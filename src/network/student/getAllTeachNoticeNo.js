import { request } from '../request'

export function getAllTeachNoticeNo(sno, cno) {
  return request({
    method: 'get',
    headers: {
      
    },
    url: '/api/v1/notice/' + sno + '/course/' + cno + '/all'
  })
}