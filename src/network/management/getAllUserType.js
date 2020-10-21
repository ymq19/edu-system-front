import { request } from '../request'

export function getAllUserType(userType) {
  return request({
    method: 'get',
    headers: {
      
    },
    url: '/api/v1/super-user/user/all/' + userType
  })
}