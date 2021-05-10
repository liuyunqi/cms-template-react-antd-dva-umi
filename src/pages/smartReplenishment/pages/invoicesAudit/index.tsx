import React, { useState, useEffect, useReducer, ReactElement } from 'react';
import { connect, history, Dispatch, request } from 'umi';
import { ConnectState } from '../../models/connect';
import { TransferCargoStoreState } from '../../type';
import { Button, Select, Input, Tabs, Modal, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import styles from './index.less';
import '../../asset/less/theme.less'

import TableMine from '../../components/Table';

import { column_ALL, column_INDATE, column_PROMOTION, column_WANTBOOK, column_SUBSTITUTE } from './columns';
import { ColumnRender_operationAction, enumViewMode, enumEventType, sActions as ActionInterface } from '../../components/Table/creator';
import { ALLEVENTCallbackType, Enum_ALLEVENT } from '../../components/Table/index.d';


const { Option } = Select;
const { TabPane } = Tabs;


interface IProps extends TransferCargoStoreState {
  dispatch: Dispatch;
}

enum TabsEnum {
  ALL = 'ALL',                // 全部商品
  INDATE = 'INDATE',          // 效期商品
  PROMOTION = 'PROMOTION',    // 促销品
  WANTBOOK = 'WANTBOOK',      // 缺货登记
  SUBSTITUTE = 'SUBSTITUTE'   // 替换商品
}

const tabsConf = [
  { name: '全部商品', key: TabsEnum.ALL, column: column_ALL },
  { name: '效期商品', key: TabsEnum.INDATE, column: column_INDATE },
  { name: '促销品', key: TabsEnum.PROMOTION, column: column_PROMOTION },
  { name: '缺货登记', key: TabsEnum.WANTBOOK, column: column_WANTBOOK },
  { name: '替换商品', key: TabsEnum.SUBSTITUTE, column: column_SUBSTITUTE },
];

const initColumn = column_ALL;

const TransferCargoStore: React.FC<IProps> = ({
  dispatch,

  dataSourceList,
  dataSourceListMirror,
  ...props
}) => {

  const [ columns, setColumns ] = useState(initColumn);     // 表格列项
  const [ tableShow, setTableShow ] = useState(true);       // 表格显示
  const [ isModalVisible, setIsModalVisible ] = useState(false); // 销量详情modal 显示
  

  // init running...
  useEffect(() => {

    // 首次请求表格数据
    /* dispatch({
      type: 'smarRept_TransferStore/setDataSourceList',
      payload: [...dataSourceMock]
    }) */

    dispatch({
      type: 'smarRept_TransferStore/fetchDataSourceList',
    })
  }, [1])
  

  // 商品类型 - 选中回调
  const goodsType_selectHandle = () => {

  }

  // 标签类型 - 选中回调
  const tagType_selectHandle = () => {

  }

  // 查看概览
  const seeInfoPanelHandle = () => {

  }

  const searchHandle = () => {

  }

  const resetHandle = () => {

  }

  // 选切标签卡片渲染配置
  const tabsChangeHandle = ( activeKey: string, e: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent> ) => {
    let getAction = tabsConf.filter(item => activeKey === item.key)[0];
    setColumns(getAction.column);
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
        type: 'smarRept_TransferStore/setDataSourceList',
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
          type: 'smarRept_TransferStore/setDataSourceList',
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
        <div className={ 'common-cell-row ' + styles.mItem } key={ key }>
          <span className={ 'common-cell-label ' + styles.mLabel }>{ name }：</span>
          <div className={ 'common-cell-value ' + styles.mContent }>{ value }</div>
        </div>
      ))
      
    )
  }


  return (
    <div className={ styles.page }>
      <div className={ 'common-block ' + styles.topfloor }>
        <div className={ styles.statisticsWrapper }>
          <div className={ styles.statisticsItem }>补货门店：<span>5024</span></div>
          <div className={ styles.statisticsItem }>单据编号：<span>QHD502420210205002</span></div>
          <div className={ styles.statisticsItem }>补货品种数：<span>7</span></div>
          <div className={ styles.statisticsItem }>补货总数：<span>16</span></div>
          <div className={ styles.statisticsItem }>零售金额汇总：<span>245元</span></div>
        </div>
        <div className={ styles.buttonBox }>
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
            <span className={ 'bam-label' }>商品品类：</span>
            <div className={ 'bam-content' }>
              <Select defaultValue="lucy" style={{ width: 200 }} onChange={ goodsType_selectHandle }>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </div>
          </div>
          <div className={ 'item-div' }>
            <span className={ 'bam-label' }>标签：</span>
            <div className={ 'bam-content' }>
              <Select defaultValue="all" style={{ width: 200 }} onChange={ tagType_selectHandle }>
                <Option value="all">全部</Option>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
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

      <div className={ 'common-block' } style={ { paddingBottom: 0 } }>
        <Tabs onTabClick={ tabsChangeHandle } type="card">
          {
            tabsConf.map(item =>(
              <TabPane tab={ item.name } key={ item.key }></TabPane>
            ))
          }
        </Tabs>
      </div>
      <div className={ 'common-block ' + styles.tableBox }>
        {
          tableShow &&
          <TableMine dataSource={ dataSourceList } columns={ columns } rowKey={ 'id' } ALLEVENTCallback={ tableLLEVENTCallback }/>
        }
      </div>
      <div className={ 'common-block ' + styles.footerWrapper }>
        <Button>返回列表</Button>
        <Button type="primary">提交单据</Button>
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
        <div className={ styles.modalWrapper }>
          <div className={ 'common-cell-row ' + styles.item }>
            <span className={ 'common-cell-label ' + styles.label }>商品名称：</span>
            <div className={ 'common-cell-value' }>
              { '维生素D滴剂 400单位*12粒 悦而 青岛双鲸药业有限公司' }
            </div>
          </div>
          <div className={ 'common-cell-row ' + styles.item }>
            <span className={ 'common-cell-label ' + styles.label }>补货时间：</span>
            <div className={ 'common-cell-value' }>
              { '2020/06/18-2020/06/23' }
            </div>
          </div>
          <div className={ 'common-cell-row ' + styles.item }>
            <span className={ 'common-cell-label ' + styles.label }>补货周期总销量预估：</span>
            <div className={ 'common-cell-value' }>
              { '1225' }
            </div>
          </div>
          <div className={ 'common-cell-row ' + styles.item }>
            <span className={ 'common-cell-label ' + styles.label }>参考销量：</span>
            <div className={ 'common-cell-value ' + styles.miniTable }>
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
  const { smarRept_TransferStore, loading } = ALL;
  console.log('testStore====>', ALL)
  return {
    ...smarRept_TransferStore
  }
}

export default connect(mapStateToProps)(TransferCargoStore);