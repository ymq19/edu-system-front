import { request } from '../request'

export function teacherLogin(data) {
  return request({
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    url: '/api/v1/teacher/login',
    data: data
  })
}