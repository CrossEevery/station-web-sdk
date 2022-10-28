import TCGSDK, { InitConfig } from '@/utils/tcg-sdk';
import { joystick } from '@/utils/tcg-sdk/plugin';
import { GameOptions } from '@/types/config';
import device from 'current-device';
import Bottom from '@/buttons/bottom';
import StationApi from "@/api/station";

class Game {
  start(options: InitConfig, params: GameOptions, failCallback: any) {
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

        // 设置流分辨率，设置鼠标不可锁定
        // this.isConnect = true;
        TCGSDK.setStreamProfile({ fps: 60, max_bitrate: 10, min_bitrate: 8 });
        console.log(TCGSDK.getMoveSensitivity());
        TCGSDK.setMoveSensitivity(2.0);

        // if (this.isReconnect) {
        //   // 重连开启传送门数据通道
        //   this.TransferData(JSON.stringify(sendReconnectData()));
        //   if (this.isLock) {
        //     this.handleCloseWWJ();
        //   }
        // } else {
        //   // 开启传送门数据通道
        //   this.TransferData('start');
        // }

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
      onNetworkChange: (res) => {
        // if (res.status === 'offline') {
        //   this.connectMsg = '';
        //   this.showConnectClose = false;
        //   this.handleOffline();
        // }
        //
        // if (res.status === 'online') {
        //   this.connectDialogVisible = false;
        //   this.handleCloseWWJ();
        //   this.$emit('trans', false);
        // }
        // this.networkData = res.stats;
      },
      onGameStartComplete: (res) => {
        // that.gameId = res.app_id;
        this.handleResize();
        console.log('complete');

        if (device.mobile()) {
          // 底部按钮区域
          Bottom.init(true);

        }
      },
      // 网络中断/被踢触发此回调
      onDisconnect: (res) => {
        // this.handleAutoDisconnect(res);
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
    console.log('resize');
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
}

export default Game;
