import React, { useState, useEffect, useReducer, ReactElement } from 'react';
import { connect, history, Dispatch, request } from 'umi';
import { ConnectState } from '../../models/connect';
import { CreaterDispatchGoodsStoreState } from '../../type';
import { Button, Select, Input, Tabs, Modal, Upload, message, AutoComplete } from 'antd';

import styles from './index.less';
import tempStyle from '../../asset/less/template.less';
import '../../asset/less/theme.less';

import EchartMatrix from '../../components/echart';
import { amphitheatre } from '../../components/echart/temp';


interface IProps extends CreaterDispatchGoodsStoreState {
  dispatch: Dispatch;
}


const TransferCargoStore: React.FC<IProps> = ({
  dispatch,

  dataSourceList,
  ...props
}) => {

  let [ isShowChart, setIsShowChart ] = useState(false);

  let chartDatas1 = [
    { value: 1048, name: '行政赠品' },
    { value: 735, name: '创新品类' },
    { value: 580, name: '中药' },
    { value: 484, name: '中西成药' }
  ];

  let chartDatas2 = [
    { value: 1048, name: '营销' },
    { value: 735, name: '非营销' }
  ];
  

  // init running...
  useEffect(() => {
    setIsShowChart(true);
  }, [1]);

  return (
    <div className={ styles.page }>
      <div className={ 'common-block ' + tempStyle.horizontalWrapper } style={{ marginBottom: 10 }}>
        <div className={ tempStyle.cellWrapper }>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600 }}>本次补货概览</h3>
          </div>
          <div>
            <div className={ tempStyle.cellItem }>总品种数：<span>7</span></div>
            <div className={ tempStyle.cellItem }>总商品数：<span>7</span></div>
            <div className={ tempStyle.cellItem }>总商品金额：<span>16</span></div>
            <div className={ tempStyle.cellItem }>效期商品品种数：<span>16</span></div>
            <div className={ tempStyle.cellItem }>促销商品品种数：<span>245</span>元</div>
            <div className={ tempStyle.cellItem }>冷品品种数：<span>245</span>元</div>
          </div>
        </div>
        <div className={ tempStyle.siblingsWrapper }>{ /* nothings... */ }</div>
      </div>
      
      <div className={ 'common-block ' + styles.chartWrapper }>
        <div className={ styles.item }>
          {
            isShowChart && <EchartMatrix setOptions={ amphitheatre('各品类品种数占比', chartDatas1, {}) } setStyle={{ width: 400, height: 400 }} />
          }
        </div>
        <div className={ styles.item }>
          {
            isShowChart && <EchartMatrix elementId="chartCreater2" setOptions={ amphitheatre('采购分类补货金额占比', chartDatas2, {}) } setStyle={{ width: 400, height: 400 }} />
          }
        </div>
      </div>
    </div>
  );
}

// connect props...
const mapStateToProps = (ALL: ConnectState) => {
  const { smarRept_overviewModelStore, loading } = ALL;
  return {
    ...smarRept_overviewModelStore
  }
}

export default connect(mapStateToProps)(TransferCargoStore);