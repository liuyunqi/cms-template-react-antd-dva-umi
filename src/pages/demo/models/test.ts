import { Subscription, Reducer, Effect, History, Dispatch } from 'umi';
import { ConnectState } from './connect.d';
import { TestState } from '../type';
import { message } from 'antd';

import Http from '../service/test';

export interface TestModelType {
  namespace: 'demoTestStore';
  state: TestState;
  
  reducers: {
    setSxTableList: Reducer;
    setTotal: Reducer;
    setPageCurrent: Reducer;
    setPageSize: Reducer;
  };

  effects: {
    httpTableList: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const TestModel: TestModelType = {
  namespace: 'demoTestStore',

  state: {
    sxTableList: [],        // 表格数据
    inputText: '阿莫西林',
    total: 0,
    pageCurr: 1,
    pageSize: 5
  },

  reducers: {
    setSxTableList(state, action) {
      let { type, payload } = action;
      return {
        ...state,
        ...{
          sxTableList: payload
        }
      }
    },
    // 总页码
    setTotal(state, action) {
      let { type, payload } = action;
      return {
        ...state,
        ...{
          total: payload
        }
      }
    },

    // 当前页
    setPageCurrent(state, action) {
      let { type, payload } = action;
      return {
        ...state,
        pageCurr: payload
      }
    },

    // 单页数量
    setPageSize(state, action) {
      let { type, payload } = action;
      return {
        ...state,
        pageSize: payload
      }
    }
  },

  effects: {
    *httpTableList (action, effects) {
      let { payload = {} } = action;
      let { call, put, select } = effects;

      let { inputText, total, pageCurr, pageSize } = yield select(_ => _.demoTestStore);

      let params = Object.assign({
        storeCode: '5024',
        keyword: inputText,
        pageNum: pageCurr,
        pageSize: pageSize
      }, payload);

      const result = yield call(Http.findByGoodCode, params);

      yield put({
        type: 'setSxTableList',
        payload: result.data
      });

      yield put({
        type: 'setTotal',
        payload: result.count
      });

      /*
        code: 200
        count: 557
        data: (5) [{…}, {…}, {…}, {…}, {…}]
        msg: "成功!"
        pageNum: 5
        pageSize: 1
      */

    }
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
        if (location.pathname === '/test') {

          dispatch({
            type: 'httpTableList'
          })

          // dispatch({
          //   type: 'getListByPage',
          // });
        }
      });
    },
  }
};

export default TestModel;
