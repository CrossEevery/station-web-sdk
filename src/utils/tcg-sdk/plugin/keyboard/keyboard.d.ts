export type TouchType = 'touchstart' | 'touchend' | 'touchcancel';

export interface OnTouchEventResponse {
  /**
   * 事件类型，可选择 'touchstart'，'touchend'，'touchcancel' 三种之一
   */
  readonly type: TouchType;
  /**
   * 按键对应的 key
   */
  readonly key: string;
  /**
   * 按键对应的 code
   */
  readonly code: number;
}

export interface KeyboardCreateConfig {
  /**
   * 自动发送键盘数据 默认值 true
   */
  sendData?: boolean;
  /**
   * 按键边框颜色 默认 #4a525a
   */
  keyBorderColor?: any;
  /**
   * 按下时边框颜色 默认 #2684FF
   */
  keyPressedBorderColor?: any;
  /**
   * Keyboard  OnTouchEventResponse
   * 点击回调
   */
  onTouchEvent?: (response: OnTouchEventResponse) => void;
}

/**
 * 虚拟键盘
 *
 * 构造函数包括下列参数
 *
 * | Name                  | Type                                     | Description                       |
 * | --------------------- | ---------------------------------------- | --------------------------------- |
 * | sendData              | boolean                                  | 自动发送键盘数据 默认值 true          |
 * | keyBorderColor        | any                                      | 按键边框颜色 默认 #4a525a            |
 * | keyPressedBorderColor | any                                      | 按下时边框颜色 默认 #2684FF           |
 * | onTouchEvent          | (response: OnTouchEventResponse) => void | Keyboard  OnTouchEventResponse     |
 *
 *
 * 关于OnTouchEventResponse，具体如下：
 *
 *
 * | Name    | Type       | Description                                                     |
 * | ------- | ---------- | --------------------------------------------------------------- |
 * | type    | string     | (readonly) 事件类型，可选择 touchstart 、touchend 、touchcancel    |
 * | key     | string     | (readonly) 按键对应的 key                                        |
 * | code    | string     | (readonly) 按键对应的 code                                       |
 *
 */

export class Keyboard {
  constructor(params: KeyboardCreateConfig);
  /**
   * 显示虚拟键盘
   */
  show(): void;
  /**
   * 隐藏虚拟键盘
   */
  hide(): void;
  /**
   * 销毁虚拟键盘，删除对应节点（如要再次使用需要重新create）
   */
  destroy(): void;
}

export default Keyboard;
