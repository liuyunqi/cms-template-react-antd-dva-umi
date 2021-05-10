import { Subscription, Reducer, Effect } from 'umi';
import { CompanyReplenishListState } from '../type';
import { message } from 'antd';
import { mockdata_companyReplenishList } from '../mock/index';

export interface CompanyReplenishListModelType {
  namespace: 'smarRept_companyReplenishListStore';
  state: CompanyReplenishListState;
  effects: {
    fetchDataSourceList: Effect;
  };
  reducers: {
    setDataSourceList: Reducer;
  };
}

const CompanyReplenishListModel: CompanyReplenishListModelType = {
  namespace: 'smarRept_companyReplenishListStore',

  state: {
    dataSourceList: []
  },

  effects: {
    *fetchDataSourceList (action, { put, call }) {
      // 深拷贝，屏蔽内存指向
      const dataList = [ ...mockdata_companyReplenishList.map((item, index) => Object.assign({key: index}, item))];
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

export default CompanyReplenishListModel;