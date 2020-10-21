import { request } from '../request'

export function setProfile(mno, data) {
  return request({
    method: 'put',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    url: '/api/v1/super-user/profile/' + mno,
    data: data
  })
}