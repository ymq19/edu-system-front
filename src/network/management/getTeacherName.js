import { request } from '../request'

export function getTeacherName(tno) {
  return request({
    method: 'get',
    headers: {
      
    },
    url: '/api/v1/super-user/info/teacher/'+ tno
  })
}