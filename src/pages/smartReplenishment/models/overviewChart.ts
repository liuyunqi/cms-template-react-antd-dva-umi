import { Subscription, Reducer, Effect } from 'umi';
import { OverviewModelStoreState } from '../type';
import { message } from 'antd';

import { dataSourceMock } from '../components/Table/tableMock'

export interface OverviewModelType {
  namespace: 'smarRept_overviewModelStore';
  state: OverviewModelStoreState;
  effects: {
    fetchDataSourceList: Effect;
  };
  reducers: {
    setDataSourceList: Reducer;
  };
}

const OverviewModel: OverviewModelType = {
  namespace: 'smarRept_overviewModelStore',

  state: {
    dataSourceList: []
  },

  effects: {
    *fetchDataSourceList (action, { put, call }) {
      // 深拷贝，屏蔽内存指向
      const dataList = [ ...dataSourceMock.map(item => Object.assign({}, item))];
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

export default OverviewModel;