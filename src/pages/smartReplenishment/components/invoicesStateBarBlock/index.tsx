import React from 'react';
import { connect, history, Dispatch } from 'umi';
import { ConnectState } from '../../models/connect';

import styles from './index.less';

export enum STATE {
  'PASS',
  'REJECT'
}

export interface renderDatas {
  state: STATE;
  operator: string;
  operaTime: string;
  rejectDesc?: string;
}

interface IProps  {
  dispatch: Dispatch;
  datas: renderDatas;
}

const InfoPanelStore: React.FC<IProps> = ({
  dispatch,

  datas,
  ...props
}) => {

  return (
    <div className={ `${styles.invoicesStateBarBlock} ${styles.actionIsReject}` }>
      <span className={ styles.stateName }>{
        datas.state === STATE.REJECT ? '驳回' : '通过'
      }</span>
      <div className={ styles.content }>
        <div className={ styles.item }>
          审批人：<span>{ datas.operator }</span>
        </div>
        <div className={ styles.item }>
          操作时间：<span>{ datas.operaTime }</span>
        </div>

        {
          datas.state === STATE.REJECT &&
          <div className={ styles.item }>
          驳回原因：<span>{ datas.rejectDesc }</span>
        </div>}
      </div>
    </div>
  );
}

// connect props...
const mapStateToProps = (ALL: ConnectState) => {
  const { loading } = ALL;
  return {
    ...loading
  }
}

export default connect(mapStateToProps)(InfoPanelStore);