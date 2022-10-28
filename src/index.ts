import * as Cookies from 'js-cookie';
import { GameOptions, InitOptions } from '@/types/config';
import StationApi from '@/api/station';
import Game from '@/game';

interface ConfigOptions {
  id: string;
  url: string;
}

interface InitGameOptions {
  role: number;
  ip: string;
  port: string;
}

/**
 * 调用方法如下：
 * ```typescript
 * // We can initialize like this
 * const sdk = new stationH5SDK();
 * ```
 */
class StationWebSDK {
  constructor() {}

  public initOptions?: InitOptions;
  public stationApi?: any;

  /**
   * init
   * 设置用户信息
   * @param options
   */
  init(options: InitOptions) {
    let bodyElement = document.body;
    bodyElement.style.margin = '0';
    bodyElement.style.width = '100%';
    bodyElement.style.height = '100%';
    bodyElement.style.overflow = 'hidden';

    Cookies.set('cross_sdk_token', options.ticket);
    Cookies.set('cross_sdk_uuid', options.uuid);
    Cookies.set('cross_sdk_station_id', String(options.stationId));

    this.initOptions = options;
    this.stationApi = StationApi
    StationApi.baseUrl = options.api;
  }

  /**
   * 加载游戏
   * @param options
   */
  load(options?: InitGameOptions) {
    return new Promise((resolve, reject) => {
      const ticket = this.initOptions?.ticket;
      const uuid = this.initOptions?.uuid;
      const stationId = this.initOptions?.stationId;
      StationApi.check({ ticket, uuid, stationid: stationId })
        .then((response: any) => {
          const { data, code, message } = response;
          if (code !== 200) {
            return reject(message);
          }
          if (!data) {
            return reject('没有权限游览该空间站');
          } else {
            StationApi.getStationConfig({ ticket, uuid, stationid: stationId, uid: 0 })
              .then((res2: any) => {
                const { data, code, message } = res2;
                if (code !== 200) {
                  return reject(message);
                }
                if (!data) {
                  return reject('没有获取到空间配置数据');
                } else {
                  StationApi.getDSServer({ uuid: uuid, ticket: ticket, stationid: stationId })
                    .then((res3: any) => {
                      console.log(res3);
                      if (res3.code === 200 && res3.data) {
                        const {
                          data: { ip, port },
                        } = res3;
                        Cookies.set('world-ip', ip);
                        Cookies.set('world-port', port);
                        const params: GameOptions = {
                          ...this.initOptions,
                          ip: ip,
                          port: port,
                          type: '102',
                          hair: 1,
                          blouse: 1,
                          pants: 1,
                          shoe: 1,
                          // type: this.selectedCharacter.sex === 1 ? '102' : '101',
                          // // type: this.selectedCharacter.sex,
                          // hair: this.selectedCharacter.hair,
                          // blouse: this.selectedCharacter.blouse,
                          // pants: this.selectedCharacter.pants,
                          // shoe: this.selectedCharacter.shoe,
                        };

                        let game = new Game();
                        game.start(
                          {
                            appid: 1259104334,
                            mount: 'station',
                            showLoading: false,
                            loadingText: '',
                            defaultCursorImgUrl: '',
                            autoRotateContainer: true,
                            mic: false,
                            reconnect: true,
                            debugSetting: {
                              showLog: false,
                              showStats: false,
                              showSendHbData: false,
                              showOnHbMessage: false,
                            },
                          },
                          params,
                          () => {},
                        );
                      } else {
                      }
                    })
                    .catch((err3: any) => {
                      console.log(err3);
                    });
                }

                resolve(response);
              })
              .catch((error2: any) => {
                reject(error2);
              });
          }
          resolve(response);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
}

export default new StationWebSDK()
