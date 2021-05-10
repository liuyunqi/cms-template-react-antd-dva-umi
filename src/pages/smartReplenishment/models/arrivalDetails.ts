import { Subscription, Reducer, Effect } from 'umi';
import { ArrivalDetailsState } from '../type';
import { message } from 'antd';
import { mockdata_arrivalDetailsList } from '../mock/index'

export interface ArrivalDetailsModelType {
  namespace: 'smarRept_arrivalDetailsStore';
  state: ArrivalDetailsState;
  effects: {
    fetchDataSourceList: Effect;
  };
  reducers: {
    setDataSourceList: Reducer;
  };
}

const ArrivalDetailsModel: ArrivalDetailsModelType = {
  namespace: 'smarRept_arrivalDetailsStore',

  state: {
    dataSourceList: []
  },

  effects: {
    *fetchDataSourceList (action, { put, call }) {
      // 深拷贝，屏蔽内存指向
      const dataList = [ ...mockdata_arrivalDetailsList.map(item => Object.assign({}, item))];
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

export default ArrivalDetailsModel;