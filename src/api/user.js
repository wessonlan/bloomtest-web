import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/bloomtest/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/bloomtest/user/useInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/bloomtest/user/logout',
    method: 'post'
  })
}
