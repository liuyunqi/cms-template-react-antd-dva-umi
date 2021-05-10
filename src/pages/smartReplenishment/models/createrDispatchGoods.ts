import { Subscription, Reducer, Effect } from 'umi';
import { CreaterDispatchGoodsStoreState } from '../type';
import { message } from 'antd';
import { mockdata_createrDispatchGoodsList } from '../mock/index';

export interface CreaterDispatchGoodsModelType {
  namespace: 'smarRept_createrDispatchGoodsStore';
  state: CreaterDispatchGoodsStoreState;
  effects: {
    fetchDataSourceList: Effect;
  };
  reducers: {
    setDataSourceList: Reducer;
  };
}

const CreaterDispatchGoodsModel: CreaterDispatchGoodsModelType = {
  namespace: 'smarRept_createrDispatchGoodsStore',

  state: {
    dataSourceList: []
  },

  effects: {
    *fetchDataSourceList (action, { put, call }) {
      // 深拷贝，屏蔽内存指向
      const dataList = [ ...mockdata_createrDispatchGoodsList.map(item => Object.assign({}, item))];
      yield put({
        type: 'setDataSourceList',
        payload: new Array(...dataList)
      });
    }
  },

  reducers: {
    // 插入数据列表
    setDataSourceList(state, action) {
      let { payload } = action;
      return {
        ...state,
        dataSourceList: JSON.parse(JSON.stringify(payload))
      }
    },
  }
}

export default CreaterDispatchGoodsModel;