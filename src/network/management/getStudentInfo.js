import { request } from '../request'

export function getStudentInfo() {
  return request({
    method: 'get',
    headers: {
      
    },
    url: '/api/v1/super-user/info/student?limit=5'
  })
}