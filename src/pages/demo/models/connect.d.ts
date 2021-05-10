import { MenuDataItem, Settings as ProSettings } from '@ant-design/pro-layout';

import {
  CountState, // 计数
  NestedState, // 首页
  HomeState,
  NetwotkState,
} from '../type';
/**
 * 此处声明用于在请求时调用全局的loading
 */
export interface Loading {
  effects: { [key: string]: boolean | undefined };
  models: {
    setting?: boolean;
    demoHomeStore?: boolean;
    demoNetworkStore?: boolean;
    demoCountStore?: boolean;
    demoNestedStore?: boolean;
  };
}

/**
 * 此处声明是用于
 * 1.在connect处找到store
 * 2.在models里面找到store
 */
export interface ConnectState {
  loading: Loading;
  settings: ProSettings;
  demoHomeStore: HomeState;
  demoNetworkStore: NetwotkState;
  demoCountStore: CountState;
  demoNestedStore: NestedState;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}
