import { InitOptions, SceneOptions } from '@/types/config';

const {
  getCharacterList,
  saveUser,
  getRoleList,
  getRoleComponent,
  getAdList,
  getDSServer,
  getDeliveryServer,
  getSubRoom,
  getUserList,
  startGame,
  stopGame,
  reportUserOnline,
} = require('@/api/station');

interface User {
  uuid: string;
  token: string;
  name: string;
  sex: number;
  hair: number;
  blouse: number;
  pants: number;
  shoe: number;
  photo: string;
}

class Api {
  private initOptions: InitOptions;

  constructor(initOptions: InitOptions) {
    this.initOptions = initOptions;
  }

  /**
   * 获取用户的角色列表
   */
  public getRoleList() {
    const params = {
      uuid: this.initOptions?.uuid,
      ticket: this.initOptions?.ticket,
      stationid: this.initOptions?.stationId,
    };

    getCharacterList(params).then((res: any) => {
      console.log(res);
    });
  }

  /**
   * 创建用户的角色
   * @param user
   */
  public createUser(user: User) {
    saveUser(user, this.initOptions).then((res: any) => {
      console.log(res);
    });
  }

  /**
   * 获取创建角色的模板
   */
  public getRoleTemplateList() {
    getRoleList(this.initOptions).then((res: any) => {
      console.log(res);
    });
  }

  /**
   * 获取创建用户角色的组件信息
   */
  public getRoleComponent() {
    getRoleComponent(this.initOptions).then((res: any) => {
      console.log(res);
    });
  }

  /**
   * 获取空间的广告位数据
   */
  public getAdSlotList() {
    getAdList(this.initOptions).then((res: any) => {
      console.log(res);
    });
  }

  /**
   * 获取联机的DS服务器
   */
  public getDSServer() {
    getDSServer(this.initOptions).then((res: any) => {
      console.log(res);
    });
  }

  /**
   * 获取传送门对应的DS服务器以及确认子场景能否进行传送
   */
  public getDeliveryServer() {
    getDeliveryServer(this.initOptions).then((res: any) => {
      console.log(res);
    });
  }

  /**
   * 获取子场景的配置信息
   * @param deliveryId 传送门Id
   */
  public getSubScene(deliveryId: number) {
    var sceneOptions: SceneOptions = {
      uuid: this.initOptions?.uuid,
      ticket: this.initOptions?.ticket,
      deliveryid: deliveryId,
      stationid: this.initOptions?.stationId,
    };
    getSubRoom(sceneOptions).then((res: any) => {
      console.log(res);
    });
  }

  /**
   * 获取音频房间用户列表
   * @param roomno 房间号
   */
  public getRoomUserList(roomno: string) {
    getUserList().then((res: any) => {
      console.log(res);
    });
  }

  /**
   * 启动空间站的容器
   */
  public start() {
    startGame().then((res: any) => {
      console.log(res);
    });
  }

  /**
   * 停止空间站的容器
   */
  public stop() {
    stopGame().then((res: any) => {
      console.log(res);
    });
  }

  /**
   * 上报用户在线
   */
  public reportOnline() {
    reportUserOnline().then((res: any) => {
      console.log(res);
    });
  }
}

export default Api;
