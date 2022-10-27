export function convertBoxData(msg: string) {
  const obj = JSON.parse(msg);
  return {
    id: obj['CI-BOX-ID'],
    timestamp: obj['CI-BOX-TIMESTAMP'],
    sign: obj['CI-BOX-MD5'],
  };
}

export function convertWWJData(msg: string) {
  const obj = JSON.parse(msg);
  return {
    id: obj['CI-WWJ-ID'],
    timestamp: obj['CI-WWJ-TIMESTAMP'],
    sign: obj['CI-WWJ-MD5'],
  };
}

export function sendADEndData() {
  return { 'CI-BILLBOARD-STATUS': 1 };
}

export function sendBoxData(ids: [number]) {
  return {
    boxID: ids,
  };
}

/**
 * 开宝箱-测试方法
 * @param id
 * @returns {{"CI-BOX-ID"}}
 */
export function openBox(id: number) {
  // {“CI-BOX-ID”: 2} 开宝箱的时候我发给你这个， 你发给我{“CI-BOX-OPEN”, 1},  1是可以开 0是不可以开
  return { 'CI-BOX-ID': id };
}

/**
 * 关闭娃娃机
 * @returns {{'CI-WWJ-STATUS': number}}
 */
export function closeWWJ() {
  return { 'CI-WWJ-STATUS': 2 };
}

/**
 * 宝箱是否可以打开，1-可以 0-不可以
 * @param canOpen
 * @returns {{"CI-BOX-OPEN", canOpen: number}}
 */
export function sendCanOpenBox(canOpen = 0) {
  return { 'CI-BOX-OPEN': canOpen };
}

/**
 * 娃娃机是否可以打开，1-可以 0-不可以
 * @param canOpen
 * @returns {{"CI-BOX-OPEN", canOpen: number}}
 */
export function sendCanOpenWWJ(canOpen = 0) {
  return { 'CI-WWJ-STATUS': canOpen };
}

export function sendReconnectData() {
  return { 'CI-RECONNECT': 1 };
}
