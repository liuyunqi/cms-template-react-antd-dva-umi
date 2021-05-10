import React, { useState, useEffect, useReducer, ReactElement } from 'react';
import { connect, history, Dispatch, request } from 'umi';
import { ConnectState } from '../../models/connect';
import { InfoPanelStoreState } from '../../type';
import { Button, RowProps, Modal, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import styles from './index.less';
import '../../asset/less/theme.less'

import InfoPanel from '../../components/InfoPanel';
import TableMine from '../../components/Table';

import { ColumnRender_operationAction, enumViewMode, enumEventType, sActions as ActionInterface } from '../../components/Table/creator';
import { dataSourceMock, setActionsTestMock } from '../../components/Table/tableMock';

const ICONS_notice = require('../../asset/img/icon-notice-orange.png');

const dataSource = dataSourceMock;

const initColumns: ColumnsType<any> = [
  {
    title: '单据编号',
    dataIndex: 'str1',
    key: 'str1',
  },
  {
    title: '创建时间',
    dataIndex: 'str2',
    key: 'str2',
  },
  {
    title: '创建人',
    dataIndex: 'str3',
    key: 'str3',
  },
  {
    title: '单据类别',
    dataIndex: 'str4',
    key: 'str4',
  },
  {
    title: '单据状态',
    dataIndex: 'str5',
    key: 'str5',
  },
  {
    title: '补货品种数',
    dataIndex: 'str6',
    key: 'str6',
  },
  {
    title: '补货数量',
    dataIndex: 'str7',
    key: 'str7',
  },
  {
    title: '补货总金额',
    dataIndex: 'str8',
    key: 'str8',
  }
];



interface IProps extends InfoPanelStoreState {
  dispatch: Dispatch;
}

const InfoPanelStore: React.FC<IProps> = ({
  panelTotal,
  dispatch,
  ...props
}) => {

  
  const [ visible, setVisible ] = useState(false);        // 弹窗显示
  const [ columns, setColumns ] = useState(initColumns);  // 表格列项

  const ACTION_OPERATION = {      // 操作
    title: '操作',
    key: 'action',
    render: (text: string, record: any, index: number) => {

      let setActionsTest = setActionsTestMock;

      let setActions: ActionInterface[] = [
        {
          text: '编辑',
          condition: {
            hide: `record.key !== '2'`
          },
          eventType: enumEventType.CALLBACK,
          eventSubstance(record: RowProps) {
            setVisible(true)
          }
        },{
          text: '提交',
          condition: {
            hide: `record.key !== '2'`
          },
          eventType: enumEventType.CALLBACK,
          eventSubstance(record: RowProps) {
            setVisible(true)
          }
        },{
          text: '删除',
          condition: {
            hide: `record.key !== '2'`
          },
          eventType: enumEventType.CALLBACK,
          eventSubstance(record: RowProps) {
            setVisible(true)
          }
        },{
          text: '查看明细',
          condition: {
            hide: `!['1','3'].includes(record.key)`
          },
          eventType: enumEventType.CALLBACK,
          eventSubstance(record: RowProps) {
            setVisible(true)
          }
        },{
          text: '到货明细',
          condition: {
            hide: `!['1','3'].includes(record.key)`
          },
          eventType: enumEventType.CALLBACK,
          eventSubstance(record: RowProps) {
            setVisible(true)
          }
        },{
          text: '流程跟踪',
          condition: {
            hide: `!['1','3'].includes(record.key)`
          },
          eventType: enumEventType.CALLBACK,
          eventSubstance(record: RowProps) {
            setVisible(true)
          }
        }
      ];

      // if 条件变更 setActions ... or use condition.

      return ColumnRender_operationAction(text, record, index, setActions);
    }
  };

  useEffect(() => {
    if (columns[columns.length - 1]['key'] !== 'action') {
      setColumns(prev => [...prev, ACTION_OPERATION] )
    }
  }, [1])

  

  // Click 查看补货详情
  const seeDetailHandle = () => {

  }

  // Click 手动请货
  const obtainHandle = () => {

  }

  // 创建补货单 - 弹窗回调
  const modalHandle = (TYPE: string, e: React.MouseEvent<HTMLElement, MouseEvent>) => {

    if (TYPE === 'OK') {

    } else if (TYPE === 'CANCEL') {

    }

    setVisible(false);
  }

  return (
    <div className={styles.page}>
      <InfoPanel datas={ panelTotal } />
      <div className="common-block common-margin-vertical">
        <img src={ ICONS_notice }/>
        <span className={ styles.noticeText + ' text-cut-single' }>5024店长，您有一个补货单待确认</span>
        <Button type="primary" onClick={ seeDetailHandle }>查看补货详情</Button>
        <Button className="floatR" type="default" onClick={ obtainHandle }>手动请货</Button>
      </div>
      <div className="common-block">
        <TableMine dataSource={ dataSource } columns={ columns }/>
      </div>

      <Modal
        title="创建补货单"
        visible={ visible }
        okText="创建"
        onOk={ (e) => { modalHandle('OK', e) } }
        onCancel={ (e) => { modalHandle('CANCEL', e) } }
      >
        <div>门店补货：5024</div>
        <div>单据类别：select</div>
      </Modal>
    </div>
  );
}

// connect props...
const mapStateToProps = (ALL: ConnectState) => {
  const { smarReptStore_infoPanelStore, loading } = ALL;
  console.log('testStore====>', ALL)
  return {
    ...smarReptStore_infoPanelStore
  }
}

export default connect(mapStateToProps)(InfoPanelStore);