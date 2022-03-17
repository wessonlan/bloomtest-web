import request from '@/utils/request'

export function getList(current, size, data) {
  return request({
    url: `/bloomtest/project/list/${current}/${size}`,
    method: 'post',
    data: data
  })
}

export function getProjectAll() {
  return request({
    url: '/bloomtest/project/list/all',
    method: 'get'
  })
}

export function addProject(data) {
  return request({
    url: '/bloomtest/project/add',
    method: 'post',
    data: data
  })
}

export function updateProject(data) {
  return request({
    url: '/bloomtest/project/update',
    method: 'post',
    data: data
  })
}
