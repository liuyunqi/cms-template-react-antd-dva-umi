import React, { ReactElement } from 'react';
import { connect, history, Dispatch } from 'umi';
import { ConnectState } from '../../models/connect';

import { Table, TableProps, Pagination, PaginationProps, Input, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ColumnsTypeMine, customType, ALLEVENTCallbackType } from './index.d';
import { TABLETEMP } from './template';

import styles from './index.less';


interface IProps  {
  dispatch: Dispatch;

  columns: ColumnsType<ColumnsTypeMine>;   // 表格列头
  dataSource: any[];                       // 表格数据
  rowKey?: string | undefined;             // 自定义关键参数 default: id
  isShowPagination?: boolean;              // 是否显示分页组件
  defaultFirstPage?: number | undefined;   // 默认开始页码
  pageCurrent?: number | undefined;        // 当前页码
  pageTotal?: number | undefined;          // 总页码数
  pageLimit?: number | undefined;          // 单页数据数量
  pageSizeOptions?: string[] | undefined;  // 单页数量变更

  tableRef?: string | ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null | undefined;
  pagainRef?: string | ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null | undefined;

  onPaginationChange?: ((page: number, pageSize: number) => void) | undefined;
  onPaginationShowSizeChange?: ((current: number, size: number) => void) | undefined;
  ALLEVENTCallback?: ALLEVENTCallbackType; // 公共回调函数 (可用于解决column-render组合任何组件的无限触发事件回调)

  reloadApiTable?: TableProps<any>;        // antd - api
  reloadApiPagination?: PaginationProps;   // antd - api
}

// string | ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null | undefined

const TableStore: React.FC<IProps> = ({
  dispatch,
  columns,
  dataSource,
  rowKey,
  isShowPagination = true,
  defaultFirstPage = 1,
  pageCurrent,
  pageTotal = 0,
  pageLimit = 5,
  pageSizeOptions = [ '5', '10', '15', '20', '50' ],

  tableRef,
  pagainRef,

  onPaginationChange,
  onPaginationShowSizeChange,
  ALLEVENTCallback,

  reloadApiTable = {},
  reloadApiPagination = {},
  ...props
}) => {

  let tableSetting: TableProps<any>;            // table props
  let paginationSetting: PaginationProps;       // pagination props

  // 各类修正设定

  // 识别是否定义渲染的类型模式 - customType [ date时间/ input/ any more... ]
  const filterColumns = TABLETEMP(columns, ALLEVENTCallback as ALLEVENTCallbackType);


  // Table / Pagination 数据规整
  tableSetting = {
    ...{
      columns: filterColumns,
      dataSource,
      rowKey,
      pagination: false
    },
    ...reloadApiTable
  }

  paginationSetting = Object.assign({
    showSizeChanger: true,
    defaultCurrent: defaultFirstPage,
    current: pageCurrent,
    total: pageTotal,
    pageSize: pageLimit,
    pageSizeOptions,
    showQuickJumper: true,
    onChange: onPaginationChange,
    onShowSizeChange: onPaginationShowSizeChange,
    showTotal: (numb: number) => `共 ${numb} 条数据`
  }, reloadApiPagination);

  return (
    <div className={ styles.tableWrapper }>
      <div className={ styles.tableBox }  ref={ tableRef }>
        <Table { ...tableSetting }/>
      </div>
      {
        isShowPagination &&
        <div className={ styles.paginationBox } ref={ pagainRef }>
          <Pagination
            { ...paginationSetting }
          ></Pagination>
        </div>
      }
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

export default connect(mapStateToProps)(TableStore);