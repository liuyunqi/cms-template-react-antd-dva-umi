import { Subscription, Reducer, Effect } from 'umi';
import { InvoicesDetailsState } from '../type';
import { message } from 'antd';
import { mockdata_invoicesDetailsList } from '../mock/index';

export interface InvoicesDetailsModelType {
  namespace: 'smarRept_invoicesDetails';
  state: InvoicesDetailsState;
  effects: {
    fetchDataSourceList: Effect;
  };
  reducers: {
    setDataSourceList: Reducer;
  };
}

const InvoicesDetailsModel: InvoicesDetailsModelType = {
  namespace: 'smarRept_invoicesDetails',

  state: {
    dataSourceList: []
  },

  effects: {
    *fetchDataSourceList (action, { put, call }) {
      // 深拷贝，屏蔽内存指向
      const dataList = [ ...mockdata_invoicesDetailsList.map(item => Object.assign({}, item))];
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

export default InvoicesDetailsModel;