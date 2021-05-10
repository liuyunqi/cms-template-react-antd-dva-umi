import React, { useState, useEffect, useReducer, ReactElement } from 'react';
import { connect, history, Dispatch, request } from 'umi';
import { ConnectState } from '../../models/connect';
import { InvoicesDetailsState } from '../../type';
import { Button, Select, Input, Tabs, Modal, Upload, message, AutoComplete } from 'antd';
import styles from './index.less';
import tempStyles from '../../asset/less/template.less';
import '../../asset/less/theme.less'

import TableMine from '../../components/Table';

import columnConf from './columns';
import { ColumnRender_operationAction, enumViewMode, enumEventType, sActions as ActionInterface, columnItemDecorator } from '../../components/Table/creator';
import { ALLEVENTCallbackType, Enum_ALLEVENT, ColumnCustomType } from '../../components/Table/index.d';

import InvoicesStateBarBlock, { STATE, renderDatas } from '../../components/invoicesStateBarBlock';


interface IProps extends InvoicesDetailsState {
  dispatch: Dispatch;
}


const TransferCargoStore: React.FC<IProps> = ({
  dispatch,

  dataSourceList,
  ...props
}) => {

  const [ tableShow, setTableShow ] = useState(true);       // 表格显示
  const [ isModalVisible, setIsModalVisible ] = useState(false); // 销量详情modal 显示
  const columns = columnConf;

  // init running...
  useEffect(() => {
    dispatch({
      type: 'smarRept_invoicesDetails/fetchDataSourceList'
    })
  }, [1]);

  const searchHandle = () => {

  }

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

  // 查看概览
  const seeInfoPanelHandle = () => {

  }

  // 表格Props
  const setTableProps = {
    dataSource: dataSourceList,
    columns,
    rowKey: 'id',
    ALLEVENTCallback: tableLLEVENTCallback
  };

  const setInStateBarBlock: renderDatas = {
    state: STATE.REJECT,
    operator: '王德发',
    operaTime: '2020-09-21',
    rejectDesc: '维生素E含量不符合超标'
  };
  
  const render = () => {

    const datas = [
      { key: 'a', name: '历史同比销量', value: 16 },
      { key: 'b', name: '上个补货周期环比销量', value: 123 },
      { key: 'c', name: '前15天销量', value: 46 },
      { key: 'd', name: '前30天销量', value: 132 }
    ];
    
    return (
      datas && datas.map(({ name, value, key }) => (
        <div className={ 'common-cell-row ' + tempStyles.mItem } key={ key }>
          <span className={ 'common-cell-label ' + tempStyles.mLabel }>{ name }：</span>
          <div className={ 'common-cell-value ' + tempStyles.mContent }>{ value }</div>
        </div>
      ))
    )
  }

  return (
    <div className={ styles.page }>
      <div className={ 'common-block ' + tempStyles.horizontalWrapper }>
        <div className={ tempStyles.cellWrapper }>
          <div>
            <div className={ tempStyles.cellItem }>补货门店：<span>5024</span></div>
            <div className={ tempStyles.cellItem }>单据类型：<span>智能补货</span></div>
            <div className={ tempStyles.cellItem }>补货品种数：<span>7</span></div>
            <div className={ tempStyles.cellItem }>补货总数：<span>16</span></div>
            <div className={ tempStyles.cellItem }>零售金额汇总：<span>245元</span></div>
          </div>
          <div style={{ marginTop: 10 }}>
            <InvoicesStateBarBlock datas={ setInStateBarBlock }/>
          </div>
        </div>
        <div className={ tempStyles.siblingsWrapper }>
          <Button type="primary" ghost onClick={ seeInfoPanelHandle }>
            查看概览
          </Button>
        </div>
      </div>
      <div className={ 'common-block common-margin-vertical common-flex-wrap' }>
        <div className={ 'common-row-content common-flex-item' }>
          <div className={ 'item-div' }>
            <span className={ 'bam-label' }>商品：</span>
            <div className={ 'bam-content' }>
              <Input placeholder="" style={ { width: 200 } } />
            </div>
          </div>
          <div className={ 'item-div' }>
            <Button type="primary" onClick={ searchHandle } style={{ marginRight: 8 }}>
              查询
            </Button>
          </div>
        </div>
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

      <Modal title="销售详情"
        visible={ isModalVisible }
        onCancel={ () => { setIsModalVisible(false) } }
        footer={[
          <Button key="back" onClick={ (e) => modalHandleConfrim('CANCEL', e) }>
            关闭
          </Button>
        ]}
      >
        <div className={ tempStyles.modalWrapper }>
          <div className={ 'common-cell-row ' + tempStyles.item }>
            <span className={ 'common-cell-label ' + tempStyles.label }>商品名称：</span>
            <div className={ 'common-cell-value' }>
              { '维生素D滴剂 400单位*12粒 悦而 青岛双鲸药业有限公司' }
            </div>
          </div>
          <div className={ 'common-cell-row ' + tempStyles.item }>
            <span className={ 'common-cell-label ' + tempStyles.label }>补货时间：</span>
            <div className={ 'common-cell-value' }>
              { '2020/06/18-2020/06/23' }
            </div>
          </div>
          <div className={ 'common-cell-row ' + tempStyles.item }>
            <span className={ 'common-cell-label ' + tempStyles.label }>补货周期总销量预估：</span>
            <div className={ 'common-cell-value' }>
              { '1225' }
            </div>
          </div>
          <div className={ 'common-cell-row ' + tempStyles.item }>
            <span className={ 'common-cell-label ' + tempStyles.label }>参考销量：</span>
            <div className={ 'common-cell-value ' + tempStyles.miniTable }>
              { render() }
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// connect props...
const mapStateToProps = (ALL: ConnectState) => {
  const { smarRept_invoicesDetails, loading } = ALL;
  console.log('testStore====>', ALL)
  return {
    ...smarRept_invoicesDetails
  }
}

export default connect(mapStateToProps)(TransferCargoStore);