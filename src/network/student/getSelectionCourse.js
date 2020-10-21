import { request } from '../request'

export function getSelectionCourse(sno) {
  return request({
    method: 'get',
    headers: {
      
    },
    url: '/api/v1/' + sno + '/selection/course'
  })
}