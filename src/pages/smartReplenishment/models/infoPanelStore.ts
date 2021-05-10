import { Subscription, Reducer, Effect } from 'umi';
import { InfoPanelStoreState } from '../type';
import { message } from 'antd';

export interface InfoPanelModelType {
  namespace: 'smarReptStore_infoPanelStore';
  state: InfoPanelStoreState;
  effects: {};
  reducers: {
    
  };
}

const InfoPanelModel: InfoPanelModelType = {
  namespace: 'smarReptStore_infoPanelStore',

  state: {
    panelTotal: {
      NEXTDAY: {
        name: '下一次配送日',
        value: '2021-03-11'
      },
      MONTHMEET: {
        name: '月满足率',
        value: '95%'
      },
      TURNOVERDAY: {
        name: '本月周转天数',
        value: '50.5'
      }
    }
  },

  effects: {

  },

  reducers: {

  }
}


export default InfoPanelModel;