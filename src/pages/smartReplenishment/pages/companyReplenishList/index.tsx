import React, { useState, useEffect, useReducer, ReactElement } from 'react';
import { connect, history, Dispatch, request } from 'umi';
import { ConnectState } from '../../models/connect';
import { CompanyReplenishListState } from '../../type';
import { Button, Select, Input, Tabs, Modal, message, DatePicker, Space, RowProps } from 'antd';
import moment, { Moment } from 'moment';
import styles from './index.less';
import tempStyles from '../../asset/less/template.less';
import '../../asset/less/theme.less'

import TableMine from '../../components/Table';

import columnConf from './columns';
import { ColumnRender_operationAction, enumViewMode, enumEventType, sActions as ActionInterface } from '../../components/Table/creator';
import { ALLEVENTCallbackType, Enum_ALLEVENT } from '../../components/Table/index.d';

const { RangePicker } = DatePicker;

interface IProps extends CompanyReplenishListState {
  dispatch: Dispatch;
}

const initColumn = columnConf;

const TransferCargoStore: React.FC<IProps> = ({
  dispatch,

  dataSourceList,
  ...props
}) => {

  const [ columns, setColumns ] = useState(initColumn);           // 表格列项
  const [ tableShow, setTableShow ] = useState(true);             // 表格显示
  const [ isModalVisible, setIsModalVisible ] = useState(false);  // 销量详情modal 显示

  const ACTION_OPERATION = {      // 操作
    title: '操作',
    key: 'action',
    render: (text: string, record: any, index: number) => {

      let setActions: ActionInterface[] = [
        {
          text: '审批',
          condition: {
            hide: `record.key !== '2'`
          },
          eventType: enumEventType.CALLBACK,
          eventSubstance(record: RowProps) {
            
          }
        },{
          text: '查看',
          condition: {
            hide: `record.key !== '2'`
          },
          eventType: enumEventType.CALLBACK,
          eventSubstance(record: RowProps) {
            
          }
        }
      ];

      // if 条件变更 setActions ... or use condition.

      return ColumnRender_operationAction(text, record, index, setActions);
    }
  };
  

  // init running...
  useEffect(() => {

    // 首次请求表格数据
    /* dispatch({
      type: 'smarRept_TransferStore/setDataSourceList',
      payload: [...dataSourceMock]
    }) */

    dispatch({
      type: 'smarRept_companyReplenishListStore/fetchDataSourceList',
    })

  }, [1])

  // 创建请货单
  const createrHandle = () => {

  }

  const searchHandle = () => {

  }

  const resetHandle = () => {

  }

  const dateRangePickerOnchange = (dates: [Moment, Moment], dateStrings: [string, string]) => {
    // dateStrings 2021-09-21 ~ 2021-10-31
  }

  // 全表格事件回调捕捉函数
  const tableLLEVENTCallback: ALLEVENTCallbackType = (TYPE, data) => {
    console.log(TYPE, data);
    console.log(data.e.target.value);
    console.log(data.record);
  }

  // 模态框回调
  const modalHandleConfrim = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setIsModalVisible(false);
  }

  return (
    <div className={ styles.page }>
      
      <div className={ 'common-block common-margin-vertical common-flex-wrap' } style={{ marginTop: 0 }}>
        <div className={ 'common-row-content common-flex-item' }>
          <div className={ 'item-div' }>
            <span className={ 'bam-label' }>门店：</span>
            <div className={ 'bam-content' }>
              <Input placeholder="" style={ { width: 200 } } />
            </div>
          </div>
          <div className={ 'item-div' }>
            <span className={ 'bam-label' }>创建日期：</span>
            <div className={ 'bam-content' }>
              <Space direction="vertical" size={12}>
                <RangePicker onChange={ dateRangePickerOnchange } />
              </Space>
            </div>
          </div>
        </div>

        <div style={ { width: 140 } }>
          <Button type="primary" onClick={ searchHandle } style={{ marginRight: 8 }}>
            查询
          </Button>
          <Button onClick={ resetHandle } type="default">
            重置
          </Button>
        </div>
      </div>

      <div className={ 'common-block ' + tempStyles.horizontalWrapper }>
        <div className={ tempStyles.cellWrapper }>
          <Button type="primary" ghost onClick={ createrHandle }>
            创建请货单
          </Button>
        </div>
        <div className={ tempStyles.siblingsWrapper }>
          {/* nothing... */}
        </div>
      </div>

      <div className={ 'common-block ' + styles.tableBox }>
        {
          tableShow &&
          <TableMine dataSource={ dataSourceList } columns={ columns } rowKey={ 'id' } ALLEVENTCallback={ tableLLEVENTCallback } />
        }
      </div>
    </div>
  );
}

// connect props...
const mapStateToProps = (ALL: ConnectState) => {
  const { smarRept_companyReplenishListStore, loading } = ALL;
  console.log('testStore====>', ALL)
  return {
    ...smarRept_companyReplenishListStore
  }
}

export default connect(mapStateToProps)(TransferCargoStore);