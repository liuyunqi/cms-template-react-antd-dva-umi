import { Subscription, Reducer, Effect } from 'umi';
import { CoverLibState } from '../type';
import { message } from 'antd';

export interface CoverModelType {
  namespace: 'smarReptCoverLibStore';
  state: CoverLibState;
  effects: {};
  reducers: {
    
  };
}

const initState = () => {
  return {

  }
}

const CoverLibModel: CoverModelType = {
  namespace: 'smarReptCoverLibStore',

  state: {

  },

  effects: {

  },

  reducers: {

  }
}


export default CoverLibModel;