import React, { useState, useEffect, useReducer, ReactElement } from 'react';
import { connect, history, Dispatch, request } from 'umi';
import { ConnectState } from '../../models/connect';
import { TransferCargoStoreState } from '../../type';
import { Button, Select, Input, Tabs, Modal, message, DatePicker, Space, RowProps } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment, { Moment } from 'moment';
import styles from './index.less';
import tempStyles from '../../asset/less/template.less';
import '../../asset/less/theme.less'

import TableMine from '../../components/Table';

import { column_UNFINISHED, column_FINISHED } from './columns';
import { ColumnRender_operationAction, enumViewMode, enumEventType, sActions as ActionInterface } from '../../components/Table/creator';
import { ALLEVENTCallbackType, Enum_ALLEVENT } from '../../components/Table/index.d';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

interface IProps extends TransferCargoStoreState {
  dispatch: Dispatch;
}

enum TabsEnum {
  UNFINISHED = 'UNFINISHED',  // 待审核
  FINISHED = 'FINISHED'       // 已审核
}

const tabsConf = [
  { name: '待审核', key: TabsEnum.UNFINISHED, column: column_UNFINISHED },
  { name: '已审核', key: TabsEnum.FINISHED, column: column_FINISHED }
];

const initColumn = column_UNFINISHED;

const TransferCargoStore: React.FC<IProps> = ({
  dispatch,

  dataSourceList,
  dataSourceListMirror,
  ...props
}) => {

  const [ columns, setColumns ] = useState(initColumn);           // 表格列项
  const [ tableShow, setTableShow ] = useState(true);             // 表格显示
  const [ checkeds, setCheckeds ] = useState<React.Key[]>([]);    // 表格选中
  const [ reloadApiTable, setReloadApiTable ] = useState({});     // 表格勾选配置
  const [ tabsAction, setTabsAction ] = useState(TabsEnum.UNFINISHED);  // 当前状态
  const [ isModalVisible, setIsModalVisible ] = useState(false);  // 销量详情modal 显示

  const initReloadApiTable = {
    rowSelection: {
      type: 'checkbox',
      onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        
        setCheckeds(prev => {
          return [...selectedRowKeys]
        });
      },
      getCheckboxProps: (record: any) => ({
        // disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    }
  };

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
      type: 'smarRept_invoicesReview/fetchDataSourceList',
    })

    tabsChangeHandle(TabsEnum.UNFINISHED);
  }, [1])

  // 批量通过
  const batchPassHandle = () => {
    if (checkeds.length > 0) {
      Modal.confirm({
        title: '批量通过',
        icon: <ExclamationCircleOutlined />,
        content: '是否批量通过下列已勾选项?',
        onOk() {
          console.log('OK');
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  }

  const searchHandle = () => {

  }

  const resetHandle = () => {

  }

  const dateRangePickerOnchange = (dates: [Moment, Moment], dateStrings: [string, string]) => {
    // dateStrings 2021-09-21 ~ 2021-10-31
  }

  // 选切标签卡片渲染配置
  const tabsChangeHandle = ( activeKey: string, e?: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent> ) => {
    let getAction = tabsConf.filter(item => activeKey === item.key)[0];

    if (activeKey === TabsEnum.UNFINISHED) {
      setReloadApiTable(initReloadApiTable);
    } else if (activeKey === TabsEnum.FINISHED) {
      setReloadApiTable({});
    }

    setCheckeds([]);      // clear all
    setTabsAction(activeKey as TabsEnum);
    setColumns(getAction.column);

    // request dataSource...
  }

  // 全表格事件回调捕捉函数
  const tableLLEVENTCallback: ALLEVENTCallbackType = (TYPE, data) => {
    console.log(TYPE, data);
    console.log(data.e.target.value);
    console.log(data.record);

    // 智能补货输入框 - 输出 (确保每次输入操作都能及时的写入表格数据中)
    if (TYPE === Enum_ALLEVENT.INPUT_onChange) {
      const { e, record, columnItem, index } = data;
      let key = columnItem.key;
      let value = e.target.value;
      let getDataSource = dataSourceList.filter(item => true)
      getDataSource[index][key] = value;

      dispatch({
        type: 'smarRept_invoicesReview/setDataSourceList',
        payload: [...getDataSource, ...[]]
      })
    }
    
    // 智能补货输入框 - 确认
    else if (TYPE === Enum_ALLEVENT.INPUT_onPressEnter || TYPE === Enum_ALLEVENT.INPUT_onBlur) {
      // fined [record.key] forEach match item. after valitor & dispatch dataResult.
      const { e, record, columnItem, index } = data;
      let key = columnItem.key;
      let value = e.target.value;
      
      // 模拟假设条件不符 - 某次输入的条件不符合标准 (条件不满足时还原数据)
      // 比如输入的字符类型不符合，比如数值超过max....
      // 与产品(肖杨)谈好，每次操作失焦提交一次。成功与否都将刷新全表数据
      let NAN = isNaN(value);

      if (NAN) {
        // data reset
        dispatch({
          type: 'smarRept_invoicesReview/setDataSourceList',
          payload: [...dataSourceListMirror, ...[]]
        });

        // setColumns(column_ALL);
        // setTableShow(false);
        // setTableShow(true);
      } else {
        // 发送请求，提交修改参数
        message.success('修改成功！');
      }
    }

    // 点击 预测销量
    else if (TYPE === Enum_ALLEVENT.LINKBUTTON_onClick) {
      setIsModalVisible(true);
    }
  }

  // 模态框回调
  const modalHandleConfrim = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setIsModalVisible(false);
  }

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
          <Tabs onTabClick={ tabsChangeHandle } type="card">
            {
              tabsConf.map(item =>(
                <TabPane tab={ item.name } key={ item.key }></TabPane>
              ))
            }
          </Tabs>
        </div>
        <div className={ tempStyles.siblingsWrapper }>
          {
            tabsAction === TabsEnum.UNFINISHED &&
            <Button type="primary" ghost onClick={ batchPassHandle } disabled={ checkeds.length === 0 }>
              批量通过
            </Button>
          }
        </div>
      </div>

      <div className={ 'common-block ' + styles.tableBox }>
        {
          tableShow &&
          <TableMine dataSource={ dataSourceList } columns={ columns } rowKey={ 'id' } ALLEVENTCallback={ tableLLEVENTCallback }
          reloadApiTable={ reloadApiTable }
          />
        }
      </div>

      <Modal title="销售详情"
        visible={ isModalVisible }
        onCancel={ () => { setIsModalVisible(false) } }
        footer={[
          <Button key="back" onClick={ modalHandleConfrim }>
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
  const { smarRept_invoicesReview, loading } = ALL;
  console.log('testStore====>', ALL)
  return {
    ...smarRept_invoicesReview
  }
}

export default connect(mapStateToProps)(TransferCargoStore);