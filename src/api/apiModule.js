import request from '@/utils/request'

export function getModuleList(projectId) {
  return request({
    url: `/bloomtest/module/list/${projectId}`,
    method: 'get'
  })
}

export function addModuleNode(data) {
  return request({
    url: '/bloomtest/module/add',
    method: 'post',
    data: data
  })
}

export function renameModuleNode(data) {
  return request({
    url: '/bloomtest/module/rename',
    method: 'post',
    data: data
  })
}

export function deleteNode(nodeId) {
  return request({
    url: `/bloomtest/module/delete/${nodeId}`,
    method: 'get'
  })
}
