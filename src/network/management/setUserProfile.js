import { request } from '../request'

export function setUserProfile(userType, username, data) {
  return request({
    method: 'put',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    url: '/api/v1/super-user/user/' + userType + '/' + username,
    data: data
  })
}