import { Subscription, Reducer, Effect } from 'umi';
import { InvoicesReviewState } from '../type';
import { message } from 'antd';
import { mockdata_invoicesReviewList } from '../mock/index';

export interface InvoicesReviewModelType {
  namespace: 'smarRept_invoicesReview';
  state: InvoicesReviewState;
  effects: {
    fetchDataSourceList: Effect;
  };
  reducers: {
    setDataSourceList: Reducer;
  };
}

const InvoicesReviewModel: InvoicesReviewModelType = {
  namespace: 'smarRept_invoicesReview',

  state: {
    dataSourceList: []
  },

  effects: {
    *fetchDataSourceList (action, { put, call }) {
      // 深拷贝，屏蔽内存指向
      const dataList = [ ...mockdata_invoicesReviewList.map(item => Object.assign({}, item))];
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

export default InvoicesReviewModel;