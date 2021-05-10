import React from 'react';
import { connect, history, Dispatch } from 'umi';
import { ConnectState } from '../../models/connect';

import styles from './index.less';

const ICONS_NEXTDAY = require('../../asset/img/icon-panel-car.png');
const ICONS_MONTHMEET = require('../../asset/img/icon-panel-chart.png');
const ICONS_TURNOVERDAY = require('../../asset/img/icon-panel-aricReset.png');

interface IProps  {
  dispatch: Dispatch;

  datas: TotalPanelDataProp;            // 渲染数据
}

interface TotalPanelProp {
  name: string;
  value: string | number;
  index: number;
  icon?: string;      // is require filepath [data:image/png...]
}

interface TotalPanelDataProp {
  NEXTDAY: TotalPanelProp;
  MONTHMEET: TotalPanelProp;
  TURNOVERDAY: TotalPanelProp;
}

const InfoPanelStore: React.FC<IProps> = ({
  datas,
  dispatch,
  ...props
}) => {

  // 显示图标
  const getIconPath = (KEY: string): string => {
    let path = '';
    switch (KEY) {
      case 'NEXTDAY':
        path = ICONS_NEXTDAY;
        break;
      case 'MONTHMEET':
        path = ICONS_MONTHMEET;
        break;
      case 'TURNOVERDAY':
      default:
        path = ICONS_TURNOVERDAY;
    }
    return path;
  }

  // 看板统计 - 渲染构造
  const DOM_totalPanel = (datas: TotalPanelDataProp) => {
    let items: string[] = Object.keys(datas);
    return items.map((key: string, index: number) => DOM_totalPanelItem({index, ...datas[key]}, key));
  }

  // 看板统计 - item
  const DOM_totalPanelItem = ({name, value, index, icon}: TotalPanelProp, key: string) => {
    return <div className={ styles.item } key={ index }>
        <div className={ styles.itemIns }>
          <div className={ styles.itemLeft }>
            <div className={ styles.icon }>
              <img src={ icon ? icon : getIconPath(key) }/>
            </div>
          </div>
          <div className={ styles.itemRight }>
            <span className={ styles.name }>{ name }</span>
            <span className={ styles.value }>{ value }</span>
          </div>
        </div>
    </div>
  }

  return (
    <div className={styles.wrapper}>
      { DOM_totalPanel(datas) }
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