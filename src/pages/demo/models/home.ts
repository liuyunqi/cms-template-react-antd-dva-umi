import { Subscription, Reducer, Effect } from 'umi';

import { ConnectState } from './connect.d';

import { HomeState } from '../type';

export enum HOME_TAB_KEY {
  ANTD = 'antd',
  DVA = 'dva',
  UMI = 'umi',
}
export interface HomelModelType {
  namespace: 'demoHomeStore';
  state: HomeState;
  effects: {};
  reducers: {};
}

const HomelModel: HomelModelType = {
  namespace: 'demoHomeStore',

  state: {
    tabListMap: [
      { label: 'antd', key: 'antd' },
      { label: 'dva', key: 'dva' },
      { label: 'umi', key: 'umi' },
    ],
  },

  effects: {},

  reducers: {},
};

export default HomelModel;
