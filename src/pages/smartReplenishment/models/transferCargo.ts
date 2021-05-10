import { Subscription, Reducer, Effect } from 'umi';
import { TransferCargoStoreState } from '../type';
import { message } from 'antd';
import { mockdata_transferCargoGoodsList } from '../mock';

export interface TransferModelType {
  namespace: 'smarRept_TransferStore';
  state: TransferCargoStoreState;
  effects: {
    fetchDataSourceList: Effect;
  };
  reducers: {
    setDataSourceList: Reducer;
    setDataSourceListMirror: Reducer;
  };
}

const TransferModel: TransferModelType = {
  namespace: 'smarRept_TransferStore',

  state: {
    dataSourceList: [],
    dataSourceListMirror: []      // readonly不可变的 每次effect更新 = dataSourceList
  },

  effects: {
    // 请求表格数据
    *fetchDataSourceList(action, { put, call }) {
      //const dataList = yield call(Service);
      const dataList = [ ...mockdata_transferCargoGoodsList, ...[]];
      yield put({
        type: 'setDataSourceList',
        payload: new Array(...dataList)
      });

      yield put({
        type: 'setDataSourceListMirror',
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

    setDataSourceListMirror(state, action) {
      let { payload } = action;
      return {
        ...state,
        dataSourceListMirror: JSON.parse(JSON.stringify(payload))
      }
    }
  }
}


export default TransferModel;