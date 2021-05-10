import React from 'react';
import { Subscription, Reducer, Effect, History, Dispatch } from 'umi';
import { NetwotkState } from '../type';
import { postCreate } from '../service/network';
import { ConnectState } from './connect';
export const tabRef = React.createRef<any>();
export interface NetworkModelType {
  namespace: 'demoNetworkStore';
  state: NetwotkState;
  effects: {
    create: Effect;
  };
  reducers: {
    saveData: Reducer<NetwotkState>;
  };
  subscriptions: { setup: Subscription };
}

const initState = () => ({
  creataStatus: false,
});
const NetworkModel: NetworkModelType = {
  namespace: 'demoNetworkStore',

  state: {
    creataStatus: false,
  },

  effects: {
    *create({ payload }, { call, put }) {
      const result = yield call(postCreate, payload);
      if (result) {
        yield put({
          type: 'saveData',
          payload: {
            key: 'creataStatus',
            value: false,
          },
        });
        if (tabRef && tabRef.current) {
          tabRef.current.refresh();
        }
      }
    },
  },

  reducers: {
    saveData(state, { payload }) {
      if (!state) {
        return initState();
      }
      return {
        ...state,
        [payload.key]: payload.value,
      };
    },
  },
  subscriptions: {
    setup({
      dispatch,
      history,
    }: {
      dispatch: Dispatch;
      history: History<any>;
    }) {
      history.listen(location => {
        if (location.pathname === '/network') {
          // dispatch({
          //   type: 'getListByPage',
          // });
        }
      });
    },
  },
};

export default NetworkModel;
