

// 按键代码
export enum keywordsContrl_keyCode {
  top = 38,
  bottom = 40,
  left = 37,
  right = 39,
  enter = 13
}

// 事件类型定义
export enum keywordsContrl_eventType {
  prev = 'prev',
  next = 'next',
  top  = 'top',
  right = 'right',
  bottom = 'bottom',
  left = 'left',
  enter = 'enter',
  focus = 'focus',
  blur = 'blur',
  tableIsReady = 'tableIsReady',
  init = 'init'
}

// 状态定义
export enum keywordsContrl_state {
  isFocus = 'isFocus',

}

// 基本配置定义
export interface keywordsContrl_defaultOptions {
  [str: string]: any;
}

// 键盘按钮事件监听
export class KeywordsContrl {

  // 基础配置
  defaultOptions: keywordsContrl_defaultOptions = {

  }

  // 当前是否已聚焦
  isFocus = false;

  constructor(options: keywordsContrl_defaultOptions = {}) {
    this.defaultOptions = {
      ...this.defaultOptions,
      ...options
    }
    this.bindKeywordsEvent();
  }

  // window.key 事件
  windowOnKeydown  = (e: KeyboardEvent) => {
    const keyCode = e.keyCode;
    let print: keywordsContrl_eventType | 'unkown' = 'unkown';

    switch (keyCode) {
      case keywordsContrl_keyCode.top:
        print = keywordsContrl_eventType.top;
        break;
      case keywordsContrl_keyCode.bottom:
        print = keywordsContrl_eventType.bottom;
        break;
      case keywordsContrl_keyCode.left:
        print = keywordsContrl_eventType.left;
        break;
      case keywordsContrl_keyCode.right:
        print = keywordsContrl_eventType.right;
        break;
      case keywordsContrl_keyCode.enter:
        print = keywordsContrl_eventType.enter;
        break;

      default: {
        // other type...
      }
    }

    if (print === 'unkown') return;
    this.callback('keydown', { keyCode, print });

    if (this.isFocus) {
      this.callback('keydown:isFocus', { keyCode, print });
    }
  }

  // 全事件响应回调
  allEventCallback(EVETNAME: string, data?: any) {};

  private callback(EVETNAME: string, data?: any) {
    typeof this.allEventCallback === 'function' && this.allEventCallback(EVETNAME, data);
  }

  // 按键绑定事件 - options
  bindKeywordsEvent () {
    window.addEventListener('keydown', this.windowOnKeydown);
    this.callback('bindWindowEvent');
  }

  // 解绑事件
  removeKeywordsEvent () {
    window.removeEventListener('keydown', this.windowOnKeydown);
    this.callback('unbindWindowEvent');
  }

  // 变更状态
  dispatchState (STATE: keywordsContrl_state | string, value: boolean) {
    switch (STATE) {
      case keywordsContrl_state.isFocus: {
        this.isFocus = value;
      };
      break;
    }

    this.callback('dispatchState', { STATE });
  }
}

