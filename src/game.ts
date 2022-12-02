import TCGSDK, { InitConfig } from '@/utils/tcg-sdk';
import { joystick } from '@/utils/tcg-sdk/plugin';
import { GameOptions } from '@/types/config';
import device from 'current-device';
import Bottom from '@/buttons/bottom';
import StationApi from '@/api/station';
import Ue from '@/ue';
import * as Cookies from 'js-cookie';

enum AssetTypeEnum {
  TRIGGER = 'CI_PORTAL-TRIGGER-ID', // 传送门
  BOX = 'CI-BOX-ID', // 宝箱
  WWJ = 'CI-WWJ-ID', // 娃娃机
}

enum CallbackTypeEnum {
  DISCONNECT = 'disconnect', // 失联
  RECONNECT = 'reconnect', // 重连,
  SETBOX = 'event-set-box', // 设置宝箱
  SETUEDATA = 'set-ue-data', // ue返回数据
  TRIGGER = 'TRIGGER', // 传送门
  OPENBOX = 'open-box', // 打开宝箱
  OPENWWJ = 'open-wwj',
}

class Game {
  private initParams = {};
  private isConnect: boolean = false;
  private isReconnect: boolean = false;
  reconnectCode = 0;
  private data_comm?: any = null;
  currentUEData = {};
  private gateTimeInterval?: any = null;
  private onCallbackMessage?: any = null;
  private onConnectSuccess?: any = null;
  private onComplete = null;
  private onCallback = null;
  private onFailCallback = null;
  public UeMessage?: any;

  start(options: InitConfig, params: GameOptions, failCallback: any, onMessage?: Function) {
    this.initParams = options;
    this.onCallbackMessage = onMessage;
    TCGSDK.init({
      ...options,
      onLog: (res) => {
        // console.log(res)
      },
      // 连接成功回调
      onConnectSuccess: async (res) => {
        console.log('onConnectSuccess');
        // if (callback) {
        //   callback();
        // }
        this.UeMessage = Ue;

        // 设置流分辨率，设置鼠标不可锁定
        this.isConnect = true;
        this.reconnectCode = 0;
        TCGSDK.setStreamProfile({ fps: 60, max_bitrate: 10, min_bitrate: 8 });
        TCGSDK.setMoveSensitivity(2.0);

        if (this.isReconnect) {
          // 重连开启传送门数据通道
          this.TransferData(this.UeMessage.sendReconnectData());
        } else {
          // 开启传送门数据通道
          this.TransferData('start');
        }

        if (this.onConnectSuccess) {
          this.onConnectSuccess(res);
        }

        // 上报用户状态
        // this.initHeart()

        // 获取传送门数据
        // this.initDSSevers();

        // 获取广告位数据
        // this.initAdList()

        // 获取宝箱数据
        // setTimeout(() => {
        //   this.getBoxLotteryInfo();
        // }, 1000 * 10);

        // this.initLog();
      },
      onConnectFail: (response) => {
        console.log('onConnectFail: ', response);
        // if (!response.code || response.code >= 2) {
        //   this.reconnectCode = 2;
        //   this.reconnect();
        // }
        //
        // if (response.code && response.code === -1) {
        //   this.reconnectCode = 2;
        //   setTimeout(() => this.reconnect(), 5000);
        // }
      },
      onGameStartComplete: (res) => {
        this.handleResize();

        if (device.mobile()) {
          // 底部按钮区域
          Bottom.init(true);
        }
      },
      // 网络中断/被踢触发此回调
      onDisconnect: (res) => {
        if (this.onCallbackMessage) {
          this.onCallbackMessage({ type: CallbackTypeEnum.DISCONNECT, data: res });
        }
      },
      onWebrtcStatusChange: (res) => {
        // console.log('onWebrtcStatusChange', res)
      },
      onInitSuccess: async (res) => {
        // console.log('%c onInitSuccess', 'color: red', res)
        await this.StartGame(params, failCallback, this);
      },
      onTouchEvent: (res) => {
        // 针对单指触控操作
        if (res.length === 1) {
          // @ts-ignore
          const { id, type, pageX, pageY } = res.pop();
          // console.log('onTouchEvent', id, type, pageX, pageY);
          TCGSDK.mouseMove(id, type, pageX, pageY);
          if (type === 'touchstart') {
            TCGSDK.sendRawEvent({ type: 'mouseleft', down: true });
          }
          if (type === 'touchend' || type === 'touchcancel') {
            TCGSDK.sendRawEvent({ type: 'mouseleft', down: false });
          }
        }
      },
    });
  }

  async StartGame(params: GameOptions, failCallback: any, t: any) {
    // 接口 StartGame 其实就是后台串行调用了云API的 TrylockWorker + CreateSession
    // 尝试锁定机器（TrylockWorker） https://cloud.tencent.com/document/api/1162/40738
    // 创建会话（CreateSession） https://cloud.tencent.com/document/api/1162/40740
    const that = t;
    console.log(params);

    StationApi.startGame(
      {
        uuid: params.uuid,
        ticket: params.ticket,
        stationId: params.stationId,
        clientSession: TCGSDK.getClientSession(),
        // screenWidth: width,
        // screenHeight: height,
        screenWidth: 1920,
        screenHeight: 1080,
        gameParams: `-type=${params.type} -comp=${params.hair}_${params.blouse}_${params.pants}_${params.shoe} -IP=${
          params.ip
        } -port=${params.port} -hasClient=true -ResX=${1920} -ResY=${1080}`,
        gameContext: '',
      },
      {
        uuid: params.uuid,
        ticket: params.ticket,
        token: params.ticket,
        stationId: params.stationId,
      },
    ).then((res: any) => {
      const { code, data } = res;

      if (code === 200 && data) {
        TCGSDK.start(data.serverSession);
        Cookies.set('cross_sdk_gameid',data.gameUUID)
        // that.gameUUID = data.gameUUID;
        // that.hostUUID = data.hostUUID;
      } else {
        // Message.error(message)
        TCGSDK.destroy();
        // your logics
        if (failCallback) {
          failCallback();
        }
      }
    });
  }

  handleResize() {
    // console.log('resize');
    let htmlElement = document.getElementsByTagName('html')[0];
    htmlElement.style.height = '100%';
    htmlElement.style.overflow = 'hidden';
    // 设置屏幕高度
    const tecentGameContainer = document.getElementById('cloud-gaming-container');
    if (tecentGameContainer) {
      // tecentGameContainer.style.height = 'auto'
    }

    // 设置缩放
    const videoStreamContainer = document.getElementById('video-stream');
    if (videoStreamContainer) {
      // videoStreamContainer.style.transform = `scale(${scale})`
      const scaleX = window.innerWidth / 1920;
      const scaleY = window.innerHeight / 1080;
      const finalScale = Math.max(scaleX, scaleY);
      const scale = window.innerWidth / window.innerHeight;
      console.log('finalScale', window.innerWidth, window.innerHeight, finalScale, scale);

      if (scale < 2.4 && scale > 1.8) {
        videoStreamContainer.style.height = '100%';
        // 不要定义宽度，否则会产生横向滚动条，并且是在此宽度上缩放
        // videoStreamContainer.style.width = window.innerWidth + 'px'
        // 实际的宽度
        const actualWidth = (1920 / 1080) * window.innerHeight;
        const actualRatio = window.innerWidth / actualWidth;
        videoStreamContainer.style.transform = `scaleX(${actualRatio}) scaleY(1)`;
      } else if (scale >= 1 && scale <= 1.8) {
        videoStreamContainer.style.width = '100%';
        const actualHeight = window.innerWidth / (1920 / 1080);
        const actualRatio = window.innerHeight / actualHeight;
        videoStreamContainer.style.transform = `scaleX(1) scaleY(${actualRatio})`;
      } else if (scale < 1) {
        videoStreamContainer.style.width = '100%';
        // const actualHeight = window.innerWidth / (1920 / 1080)
        // const actualRatio = window.innerHeight / actualHeight
        videoStreamContainer.style.transform = `scaleX(1.2) scaleY(1)`;
      } else {
        videoStreamContainer.style.height = '100%';
      }
    }
  }

  async TransferData(msg: string) {
    if (!this.isConnect) {
      console.log('未连接画面，无法开启数据通道');
      // TODO：在这里上报错误日志，云游戏未连接成功
      return;
    }

    // 接收云端数据的回调
    const onMessage = (msg: string) => {
      try {
        this.handleUEMsg(msg);
      } catch (e) {
        console.log(e);
      }

      if (this.gateTimeInterval) {
        setTimeout(() => {
          if (this.onCallbackMessage) {
            this.onCallbackMessage({ type: CallbackTypeEnum.SETBOX });
          }
        }, 2000);

        try {
          this.currentUEData = JSON.parse(msg);
          if (this.onCallbackMessage) {
            this.onCallbackMessage({ type: CallbackTypeEnum.SETUEDATA, data: this.currentUEData });
          }
        } catch (e) {
          console.log('000', this.currentUEData, e);
        }
        clearInterval(this.gateTimeInterval);
        this.gateTimeInterval = null;

        if (this.isReconnect) {
          if (this.onCallbackMessage) {
            this.onCallbackMessage({ type: CallbackTypeEnum.RECONNECT });
          }
        }
      }
    };

    if (this.data_comm == null) {
      // 定时重复创建直到成功
      const result: any = await new Promise((resolve, reject) => {
        let count = 0;
        const timer = setInterval(async (_) => {
          // 创建数据通道
          const ret = await TCGSDK.createCustomDataChannel({
            destPort: 18786,
            onMessage, // destPort: xxxx ，xxxx端口范围为10000～20000
          });

          count++;

          if (ret.code === 0) {
            resolve(ret);
            clearInterval(timer);
          }

          if (count > 20) {
            this.isConnect = false;
            clearInterval(timer);
          }
        }, 2000); // 2秒间隔
      });
      /*
       * 判断是否成功
       * result的结构{code: number, msg: string, sendMessage: Function }
       */
      console.log('sendresult=>', result);
      if (result.code === 0) {
        console.log('18786:', msg);
        // 随便发送一个绑定包，使云端应用的UDP服务能获得代理端口
        result.sendMessage('start');
        this.gateTimeInterval = setInterval(() => this.getGates(), 2000);
        this.data_comm = result;
      }
    } else {
      let payload = null;
      payload = msg;
      console.log(payload);
      this.data_comm.sendMessage(payload || 'start');
    }
  }

  handleUEMsg(msg: string) {
    console.log(this.onCallbackMessage, msg);
    if (msg.includes(AssetTypeEnum.TRIGGER)) {
      if (this.onCallbackMessage) {
        this.onCallbackMessage({ type: CallbackTypeEnum.TRIGGER, data: msg });
      }
    }

    if (msg.includes(AssetTypeEnum.BOX)) {
      if (this.onCallbackMessage) {
        this.onCallbackMessage({ type: CallbackTypeEnum.OPENBOX, data: this.UeMessage.convertBoxData(msg) });
      }
    }

    if (msg.includes(AssetTypeEnum.WWJ)) {
      if (this.onCallbackMessage) {
        this.onCallbackMessage({ type: CallbackTypeEnum.OPENWWJ, data: this.UeMessage.convertWWJData(msg) });
      }
    }
  }

  async getGates() {
    if (this.isReconnect) {
      await this.TransferData(this.UeMessage.sendReconnectData());
    } else {
      await this.TransferData('start');
    }
  }

  public async stopGame(params: any) {
    StationApi.stopGame(params);
    TCGSDK.destroy();
  }
}

export default Game;
