import request from '@/utils/request'

export function getApiListByModuleId(projectId, moduleId, current, size) {
  return request({
    url: `/bloomtest/apiDefinition/list/${projectId}/${moduleId}/${current}/${size}`,
    method: 'get'
  })
}

export function saveApiDefinition(data) {
  return request({
    url: '/bloomtest/apiDefinition/add',
    method: 'post',
    data: data
  })
}

export function updateApiDefinition(data) {
  return request({
    url: '/bloomtest/apiDefinition/update',
    method: 'post',
    data: data
  })
}

export function getApiById(apiId) {
  return request({
    url: '/bloomtest/apiDefinition/getApi',
    method: 'get',
    params: {
      'id': apiId
    }
  })
}

export function runTestApi(data) {
  return request({
    url: '/bloomtest/apiDefinition/apiTestRun',
    method: 'post',
    data: data
  })
}
