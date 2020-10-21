import { request } from '../request'

export function addAvatar(username, data) {
  return request({
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: '/api/v1/avatar/' + username,
    data: data
  })
}