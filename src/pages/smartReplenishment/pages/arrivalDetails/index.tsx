import React, { useState, useEffect, useReducer, ReactElement } from 'react';
import { connect, history, Dispatch, request } from 'umi';
import { ConnectState } from '../../models/connect';
import { ArrivalDetailsState } from '../../type';
import { Button, Select, Input, Tabs, Modal, Upload, message, AutoComplete } from 'antd';

import styles from './index.less';
import tempStyle from '../../asset/less/template.less';
import '../../asset/less/theme.less'

import TableMine from '../../components/Table';
import { columnNormal, columnMini } from './columns';

import { ColumnRender_operationAction, enumViewMode, enumEventType, sActions as ActionInterface , columnItemDecorator } from '../../components/Table/creator';
import { ALLEVENTCallbackType, Enum_ALLEVENT, ColumnCustomType } from '../../components/Table/index.d';


interface IProps extends ArrivalDetailsState {
  dispatch: Dispatch;
}


const TransferCargoStore: React.FC<IProps> = ({
  dispatch,

  dataSourceList,
  ...props
}) => {

  const [ tableShow, setTableShow ] = useState(true);             // 表格显示
  const [ isModalVisible, setIsModalVisible ] = useState(false);  // 销量详情modal 显示
  
  /* const columnsConf = (columnItemDecorator)({
    'str1': { name: '商品名称' },
    'str2': { name: '商品编码' },
    'str3': { name: '补货数量' },
    'str4': { name: '到货数量占比' },
    'str5': { name: 'SAP满足数量' },
    'str6': { name: '装箱出库数' },
    'str7': {
      name: '收货量',
      customType: ColumnCustomType.LINKBUTTON,
      customSettings: {
        style: {
          fontWeight: 'bold'
        }
      }
    },
    'str8': { name: '验收量' },
    'str9': { name: '差异量' }
  });

  const columns = ((conf) => Object.keys(conf).map(key => conf[key]))(columnsConf); */

  const columns = columnNormal;

  /* const simpleColumnsConf = (columnItemDecorator)({
    'str1': { name: '单据编号' },
    'str2': { name: '行号' },
    'str3': { name: '数量' }
  });

  const simpleColumns = ((conf) => Object.keys(conf).map(key => conf[key]))(simpleColumnsConf); */

  const simpleColumns = columnMini;

  // init running...
  useEffect(() => {
    dispatch({
      type: 'smarRept_arrivalDetailsStore/fetchDataSourceList'
    })
  }, [1]);

  // 全表格事件回调捕捉函数
  const tableLLEVENTCallback: ALLEVENTCallbackType = (TYPE, data) => {
    if (TYPE === Enum_ALLEVENT.LINKBUTTON_onClick) {
      setIsModalVisible(true);
    }
  }

  // 模态框回调
  const modalHandleConfrim = (TYPE:string, e: React.MouseEvent<HTMLElement, MouseEvent>) => {

    if (TYPE === 'CANCEL') {

    }
    setIsModalVisible(false);
  }

  // 表格Props
  const setTableProps = {
    dataSource: dataSourceList,
    columns,
    rowKey: 'id',
    ALLEVENTCallback: tableLLEVENTCallback
  };

  // 表格Props - 简易
  const setSimpleTableProps = {
    dataSource: [dataSourceList[0]],
    columns: simpleColumns,
    rowKey: 'id',
    isShowPagination: false
  };

  return (
    <div className={ styles.page }>
      <div className={ 'common-block ' + tempStyle.horizontalWrapper } style={{ marginBottom: 10 }}>
        <div className={ tempStyle.cellWrapper }>
          <div>
            <div className={ tempStyle.cellItem }>单据编号：<span>QHD502420210205002</span></div>
            <div className={ tempStyle.cellItem }>提交时间：<span>2020-09-14</span></div>
          </div>
          <div>
            <div className={ tempStyle.cellItem }>补货品种数：<span>7</span></div>
            <div className={ tempStyle.cellItem }>到货品种数：<span>7</span></div>
            <div className={ tempStyle.cellItem }>补货总数：<span>16</span></div>
            <div className={ tempStyle.cellItem }>到货总数：<span>16</span></div>
            <div className={ tempStyle.cellItem }>补货总金额：<span>245</span>元</div>
            <div className={ tempStyle.cellItem }>补货总金额：<span>245</span>元</div>
          </div>
        </div>
        <div className={ tempStyle.siblingsWrapper }>{ /* nothings... */ }</div>
      </div>

      <div className={ 'common-block ' + styles.tableBox }>
        {
          tableShow &&
          <TableMine { ...setTableProps } />
        }
      </div>
      <div className={ 'common-block ' + styles.footerWrapper }>
        <Button>返回列表</Button>
      </div>

      <Modal title="追踪收货"
        visible={ isModalVisible }
        onCancel={ () => { setIsModalVisible(false) } }
        footer={[
          <Button key="back" onClick={ (e) => modalHandleConfrim('CANCEL', e) }>
            关闭
          </Button>
        ]}
      >
        <TableMine { ...setSimpleTableProps } />
      </Modal>
    </div>
  );
}

// connect props...
const mapStateToProps = (ALL: ConnectState) => {
  const { smarRept_arrivalDetailsStore, loading } = ALL;
  console.log('testStore====>', ALL)
  return {
    ...smarRept_arrivalDetailsStore
  }
}

export default connect(mapStateToProps)(TransferCargoStore);