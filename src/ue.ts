class Ue {
  /**
   * 获取ue返回的宝箱数据
   * @param msg ue返回的字符串
   * @returns object
   * object.id 宝箱id
   * object.timestamp 时间戳
   * object.sign 签名
   */
  convertBoxData(msg: string) {
    const obj = JSON.parse(msg);
    return {
      id: obj['CI-BOX-ID'],
      timestamp: obj['CI-BOX-TIMESTAMP'],
      sign: obj['CI-BOX-MD5'],
    };
  }

  /**
   * 获取ue返回的抽奖机数据
   * @param msg ue返回的字符串
   * @returns object
   * object.id 宝箱id
   * object.timestamp 时间戳
   * object.sign 签名
   */
  convertWWJData(msg: string) {
    const obj = JSON.parse(msg);
    return {
      id: obj['CI-WWJ-ID'],
      timestamp: obj['CI-WWJ-TIMESTAMP'],
      sign: obj['CI-WWJ-MD5'],
    };
  }

  /**
   * 设置广告牌
   * @param billboard
   */
  sendBillboardData(billboard: any) {
    return JSON.stringify({
      'CI-BILLBOARD-TYPE': 0,
      'CI-BILLBOARD-NAME': billboard.slotCode,
      'CI-BILLBOARD-URL': billboard.path,
    });
  }

  /**
   * 广告牌设置完毕的消息
   */
  sendADEndData() {
    return JSON.stringify({ 'CI-BILLBOARD-STATUS': 1 });
  }

  /**
   * 设置宝箱
   * @params [number] 宝箱id列表
   */
  sendBoxData(ids: [number]) {
    return JSON.stringify({
      boxID: ids,
    });
  }

  /**
   * 关闭娃娃机消息
   */
  closeWWJ() {
    return JSON.stringify({ 'CI-WWJ-STATUS': 2 });
  }

  /**
   * 宝箱是否可以打开
   * @param canOpen 1-可以 0-不可以
   */
  sendCanOpenBox(canOpen = 0) {
    return JSON.stringify({ 'CI-BOX-OPEN': canOpen });
  }

  /**
   * 娃娃机是否可以打开
   * @param canOpen 1-可以 0-不可以
   * @returns {{"CI-BOX-OPEN", canOpen: number}}
   */
  sendCanOpenWWJ(canOpen = 0) {
    return JSON.stringify({ 'CI-WWJ-STATUS': canOpen });
  }

  /**
   * 发送重连消息
   */
  sendReconnectData() {
    return JSON.stringify({ 'CI-RECONNECT': 1 });
  }
}

export default new Ue();
