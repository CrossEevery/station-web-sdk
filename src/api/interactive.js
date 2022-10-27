import request from '@/utils/request'

function get(url, params) {
  return request({
    baseURL: 'https://api.open.crossevery.com',
    url: url,
    method: 'get',
    params: params
  })
}

export function post(url, data = {}, params = {}) {
  return request({
    baseURL: 'https://api.open.crossevery.com',
    url: url,
    method: 'post',
    data: data,
    params: params
  })
}

export function getCharacterList(data) {
  return get('/endpoint/character/list', data)
}

export function getSkillList(data) {
  return get('/endpoint/character/abi', data)
}

export function matching(data) {
  return get('/endpoint/matching/match', data)
}

export function join(data, params) {
  return post('/endpoint/matching/join', data, params)
}

export function sendSkill(data) {
  return get('/endpoint/character/play', data)
}

export function heart(data) {
  return get('/endpoint/polling/point', data)
}

export function getLiveKitToken(url) {
  return get(url)
}
