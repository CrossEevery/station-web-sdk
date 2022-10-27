import request from '@/utils/request';

function get(url, params) {
  return request({
    baseURL: "https://api.open.crossevery.com",
    url: url,
    method: 'get',
    params: params,
  });
}

function post(url, data = {}, params = {}) {
  return request({
    baseURL: 'https://api.open.crossevery.com',
    url: url,
    method: 'post',
    data: data,
    params: params,
  });
}

export function getCharacterList(data) {
  return get('/stationpoint/role/self', data);
}

export function matching(data) {
  return get('/endpoint/matching/match', data);
}

export function join(data, params) {
  return post('/endpoint/matching/join', data, params);
}

export function sendSkill(data) {
  return get('/endpoint/character/play', data);
}

export function getLiveKitToken(url) {
  return get(url);
}

export function saveUser(data, params) {
  return post('/stationpoint/role/save', data, params);
}

export function getTemplateRoleList(data) {
  return get('/stationpoint/role/list', data);
}

export function getRoleComponent(data) {
  return get('/stationpoint/role/package', data);
}

export function getAdList(data) {
  return get('/stationpoint/player/slot', data);
}

export function getDSServer(data) {
  return get('/stationpoint/player/online', data);
}

export function getDeliveryServer(data) {
  return get('/stationpoint/player/delivery', data);
}

export function getStationConfig(data) {
  return get('/stationpoint/player/config', data);
}

export function getSubRoom(data) {
  return get('/stationpoint/player/subroom/config', data);
}

export function getUserList(data) {
  return get('/stationpoint/player/userlist', data);
}

export function startGame(data, params) {
  return post('/stationpoint/player/start', data, params);
}

export function stopGame(data, params) {
  return get('/stationpoint/player/stop', data, params);
}

export function reportUserOnline(data, params) {
  return get('/stationpoint/player/health', data, params);
}

export function check(data, params) {
  return get('/stationpoint/player/check', data, params);
}

export function heart(data, params) {
  return get('/stationpoint/player/health', data, params);
}

export function detail(data, params) {
  return get('/stationpoint/point/detail', data, params);
}
