// @ts-ignore
import request from '@/utils/request';

class StationApi {
  public baseUrl: string | undefined = 'https://api.open.crossevery.com';

  private get(url: string, params = {}) {
    return request({
      baseURL: this.baseUrl,
      url: url,
      method: 'get',
      params: params,
    });
  }

  private post(url: string, data = {}, params = {}) {
    return request({
      baseURL: this.baseUrl,
      url: url,
      method: 'post',
      data: data,
      params: params,
    });
  }

  /**
   * 获取用户的角色列表
   */
  public getCharacterList(data: Object) {
    return this.get('/stationpoint/role/self', data);
  }

  public matching(data: Object) {
    return this.get('/endpoint/matching/match', data);
  }

  public join(data: Object, params: Object) {
    return this.post('/endpoint/matching/join', data, params);
  }

  public sendSkill(data: Object) {
    return this.get('/endpoint/character/play', data);
  }

  public getLiveKitToken(url: string) {
    return this.get(url);
  }

  /**
   * 创建用户的角色
   * @param user
   */
  public saveUser(data: Object, params: Object) {
    return this.post('/stationpoint/role/save', data, params);
  }

  /**
   * 获取创建角色的模板
   */
  public getTemplateRoleList(data: Object) {
    return this.get('/stationpoint/role/list', data);
  }

  /**
   * 获取创建用户角色的组件信息
   */
  public getRoleComponent(data: Object) {
    return this.get('/stationpoint/role/package', data);
  }

  /**
   * 获取空间的广告位数据
   */
  public getAdList(data: Object) {
    return this.get('/stationpoint/player/slot', data);
  }

  /**
   * 获取联机的DS服务器
   */
  public getDSServer(data: Object) {
    return this.get('/stationpoint/player/online', data);
  }

  /**
   * 获取传送门对应的DS服务器以及确认子场景能否进行传送
   */
  public getDeliveryServer(data: Object) {
    return this.get('/stationpoint/player/delivery', data);
  }

  public getStationConfig(data: Object) {
    return this.get('/stationpoint/player/config', data);
  }

  /**
   * 获取子场景的配置信息
   * @param deliveryId 传送门Id
   */
  public getSubRoomConfig(data: Object) {
    return this.get('/stationpoint/player/subroom/config', data);
  }

  /**
   * 获取音频房间用户列表
   * @param roomno 房间号
   */
  public getUserList(data: Object) {
    return this.get('/stationpoint/player/userlist', data);
  }

  /**
   * 启动空间站的容器
   */
  public startGame(data: Object, params: Object) {
    return this.post('/stationpoint/player/start', data, params);
  }

  /**
   * 停止空间站的容器
   */
  public stopGame(data: Object) {
    return this.get('/stationpoint/player/stop', data);
  }

  /**
   * 上报用户在线
   */
  public reportUserOnline(data: Object) {
    return this.get('/stationpoint/player/health', data);
  }

  public check(data: Object) {
    return this.get('/stationpoint/player/check', data);
  }

  public heart(data: Object) {
    return this.get('/stationpoint/player/health', data);
  }

  public detail(data: Object) {
    return this.get('/stationpoint/point/detail', data);
  }
}

export default new StationApi();
