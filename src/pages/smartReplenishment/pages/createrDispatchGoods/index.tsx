import React, { useState, useEffect, useReducer, ReactElement } from 'react';
import { connect, history, Dispatch, request } from 'umi';
import { ConnectState } from '../../models/connect';
import { CreaterDispatchGoodsStoreState } from '../../type';
import { Button, Select, Input, Tabs, Modal, Upload, message, AutoComplete } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import styles from './index.less';
import '../../asset/less/theme.less'

import TableMine from '../../components/Table';
import columnConf from './columns';
import { ALLEVENTCallbackType, Enum_ALLEVENT } from '../../components/Table/index.d';
import * as XLSX from 'xlsx';


const mockAutoCompleteOptions = [
  { label: 'A100001 | 阿莫西林X-2', value:'a1' },
  { label: 'A100002 | 红霉素眼膏', value:'a2' },
  { label: 'A100003 | 高锰酸钾稀释100ml', value:'a3' }
]

// 输入搜索
enum autoCompleteEnum {
  'GOODSNAME'
}


interface IProps extends CreaterDispatchGoodsStoreState {
  dispatch: Dispatch;
}


const TransferCargoStore: React.FC<IProps> = ({
  dispatch,

  dataSourceList,
  ...props
}) => {

  const [ tableShow, setTableShow ] = useState(true);             // 表格显示
  const [ isModalVisible, setIsModalVisible ] = useState(false);  // 销量详情modal 显示
  const [ checkeds, setCheckeds ] = useState<React.Key[]>([]);    // 表格选中
  const [ autoComplete_options, setAutoComplete_options ] = useState<{ value: string }[]>(mockAutoCompleteOptions);  // 自动完成选项 - JSX | { label, value }[]

  const columns = columnConf;

  // init running...
  useEffect(() => {
    dispatch({
      type: 'smarRept_createrDispatchGoodsStore/fetchDataSourceList'
    })
  }, [1]);

  // 增加行
  const creatRowHandle = () => {
    setIsModalVisible(true);
  }

  // 删除行
  const deleteRowHandle = () => {
    if (checkeds.length > 0) {
      Modal.confirm({
        title: 'Do you Want to delete these items?',
        icon: <ExclamationCircleOutlined />,
        content: 'Some descriptions',
        onOk() {
          console.log('OK');
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  }

  // 导入
  const importExcelHandle = () => {

  }

  const searchHandle = () => {

  }

  // 全表格事件回调捕捉函数
  const tableLLEVENTCallback: ALLEVENTCallbackType = (TYPE, data) => {
    
  }

  // 模态框回调
  const modalHandleConfrim = (TYPE:string, e: React.MouseEvent<HTMLElement, MouseEvent>) => {

    if (TYPE === 'OK') {

    }
    setIsModalVisible(false);
  }

  // 上传控件 - antd
  const uploadProps = {
    customRequest() {},
    onChange(res: any) {
      if (res.file.status !== 'uploading') {
        let reader = new FileReader();
        reader.readAsBinaryString(res.file);
        reader.onload = (e: any) => {
          let data = e.target.result;
          let wb = XLSX.read(data, { type: 'binary' });
          let jsonData = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { raw: false });
          // 模板具体方式有待商榷，再进行解析逻辑
          message.info('解析成功！');
        }
      }

      if (res.file.status === 'done') {
        message.success(`${res.file.name} file uploaded successfully`);
      } else if (res.file.status === 'error') {
        message.error(`${res.file.name} file upload failed.`);
      }
    }
  };

  // 选中 - 自动完成输入框
  const autoComplete_onSelect = (TYPE: autoCompleteEnum, data: string) => {

    if (TYPE === autoCompleteEnum.GOODSNAME) {

    }
    console.log('autoComplete_onSelect===', data);
  }

  //
  const autoComplete_onSearch = (TYPE: autoCompleteEnum, data: string) => {
    if (TYPE === autoCompleteEnum.GOODSNAME) {

    }
    console.log('autoComplete_onSearch===', data);
  }

  // 表格Props
  const setTableProps = {
    dataSource: dataSourceList,
    columns,
    rowKey: 'id',
    ALLEVENTCallback: tableLLEVENTCallback,
    reloadApiTable: {
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
    }
  };
  

  return (
    <div className={ styles.page }>
      <div className={ 'common-block common-margin-vertical common-flex-wrap' } style={{ marginTop: 0 }}>
        <div className={ 'common-row-content common-flex-item' }>
          {/* <div className={ 'item-div' }>
            <span className={ 'bam-label' }>补货门店：</span>
            <div className={ 'bam-content' }>
              <Input placeholder="" style={ { width: 200 } } />
            </div>
          </div>
          <div className={ 'item-div' }>
            <Button type="primary" onClick={ searchHandle } style={{ marginRight: 8 }}>
              查询
            </Button>
          </div> */}
          <div className={ 'item-div' }>
            <div className={ styles.statisticsItem }>单据编号：<span>QHD502420210205002</span></div>
          </div>
        </div>
      </div>

      <div className={ 'common-block ' }>
        <Button type="primary" ghost onClick={ creatRowHandle }>
          增加行
        </Button>
        <Button type="primary" ghost onClick={ deleteRowHandle } disabled={checkeds.length === 0} style={{ marginLeft: 8, marginRight: 8}}>
          删除行
        </Button>
        <Upload { ...uploadProps }>
          <Button type="primary" ghost onClick={ importExcelHandle } title="选择一份excel文件">
            导入
          </Button>
        </Upload>
      </div>

      <div className={ 'common-block ' + styles.tableBox }>
        {
          tableShow &&
          <TableMine { ...setTableProps } />
        }
      </div>
      <div className={ 'common-block ' + styles.footerWrapper }>
        <Button style={{ marginRight: 8 }}>返回列表</Button>
        <Button type="primary">提交单据</Button>
      </div>

      <Modal title="增加行"
        visible={ isModalVisible }
        onCancel={ () => { setIsModalVisible(false) } }
        onOk={ (e) => modalHandleConfrim('OK', e) }
      >
        <div className={ styles.modalWrapper }>
          <div className={ 'common-cell-row ' + styles.item + ' ' + styles.itemAutoc }>
            <span className={ 'common-cell-label ' + styles.label }>商品搜索：</span>
            <div className={ 'common-cell-value' }>
              <AutoComplete
                options={ autoComplete_options }
                style={{ width: 240 }}
                onSelect={ (data: string) => autoComplete_onSelect(autoCompleteEnum.GOODSNAME, data) }
                onSearch={ (data: string) => autoComplete_onSearch(autoCompleteEnum.GOODSNAME, data) }
                allowClear
                placeholder="条码/编码/名称"
              />
            </div>
          </div>
          <div className={ 'common-cell-row ' + styles.item }>
            <span className={ 'common-cell-label ' + styles.label }>商品条码：</span>
            <div className={ 'common-cell-value' }>
              { 'barCode10000012' }
            </div>
          </div>
          <div className={ 'common-cell-row ' + styles.item }>
            <span className={ 'common-cell-label ' + styles.label }>商品编码：</span>
            <div className={ 'common-cell-value' }>
              { '1225' }
            </div>
          </div>
          <div className={ 'common-cell-row ' + styles.item }>
            <span className={ 'common-cell-label ' + styles.label }>商品名称：</span>
            <div className={ 'common-cell-value' }>
              { '维生素D滴剂 400单位*12粒 悦而 青岛双鲸药业有限公司' }
            </div>
          </div>
          <div className={ 'common-cell-row ' + styles.item }>
            <span className={ 'common-cell-label ' + styles.label }>补货数量：</span>
            <div className={ 'common-cell-value' }>
              <Input placeholder="" maxLength={ 4 } style={ { width: 70 } } />
            </div>
          </div>
          <div className={ 'common-cell-row ' + styles.item }>
            <span className={ 'common-cell-label ' + styles.label }>采购分类说明：</span>
            <div className={ 'common-cell-value' }>
              { '赠品' }
            </div>
          </div>
          <div className={ 'common-cell-row ' + styles.item }>
            <span className={ 'common-cell-label ' + styles.label }>采购分类状态：</span>
            <div className={ 'common-cell-value' }>
              { '逆淘汰' }
            </div>
          </div>
          <div className={ 'common-cell-row ' + styles.item }>
            <span className={ 'common-cell-label ' + styles.label }>零售价：</span>
            <div className={ 'common-cell-value' }>
              { '26.3' }
            </div>
          </div>
          <div className={ 'common-cell-row ' + styles.item }>
            <span className={ 'common-cell-label ' + styles.label }>库存：</span>
            <div className={ 'common-cell-value' }>
              { '12' }
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// connect props...
const mapStateToProps = (ALL: ConnectState) => {
  const { smarRept_createrDispatchGoodsStore, loading } = ALL;
  console.log('testStore====>', ALL)
  return {
    ...smarRept_createrDispatchGoodsStore
  }
}

export default connect(mapStateToProps)(TransferCargoStore);