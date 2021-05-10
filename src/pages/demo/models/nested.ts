import { Reducer, Effect, history, History, Subscription, Dispatch } from 'umi';
import { SubscriptionAPI } from '../../../../node_modules/dva';
import { ConnectState } from './connect';
import { NestedState } from '../type';

export interface NestedModelType {
  namespace: 'demoNestedStore';
  state: NestedState;
  effects: {
    clickTile: Effect;
  };
  reducers: {
    saveState: Reducer<NestedState>;
  };
  subscriptions: { setup: any };
}

const NestedModel: NestedModelType = {
  namespace: 'demoNestedStore',
  state: {
    titleMap: [
      { title: '新闻', url: '/nested/new' },
      { title: '军事', url: '/nested/war' },
      { title: '科技', url: '/nested/tech' },
      { title: '汽车', url: '/nested/auto' },
      { title: '娱乐', url: '/nested/ent' },
      { title: '财经', url: '/nested/money' },
      { title: '健康', url: '/nested/jiankang' },
      { title: '旅游', url: '/nested/travel' },
    ],
    activeTitle: '/nested/new',
  },
  effects: {
    *clickTile({ payload }, { put, call, select }) {
      /**
       * put 等于发起一个dispatch 函数
       * call 发起http请求
       * select 用于获取store数据
       */
      yield put({
        type: 'saveState',
        payload: {
          activeTitle: payload,
        },
      });
      history.push(payload);
    },
  },
  reducers: {
    saveState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  subscriptions: {
    setup(props: SubscriptionAPI) {
      props.history.listen(location => {
        if (location.pathname === '/nested') {
          history.push('/nested/new');
        }
      });
    },
  },
};

export default NestedModel;
