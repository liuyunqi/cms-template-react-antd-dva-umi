import React from 'react';
import { Table, Pagination, Spin, notification } from 'antd';
import { FetchAgent } from '@/public/services';
import { ColumnsType } from 'antd/es/table';
import styles from './index.less';

interface IParams {
  [x: string]: any;
}
interface IProps {
  url: string; // 请求的URL
  ref?: any;
  params?: IParams; // 请求的参数
  columns: ColumnsType<any>; //
  rowKey: string; // rowKey 指定的唯一参数
  pageSize?: number; // 页码 默认15
  showQuickJumper?: boolean; // 是否可以快速跳转至某页
  rowSelection?: any;
  valueTarget?: string; // 目标值
  pageSizeChange?: (current: number, size: number) => void;
  pageChange?: (page: number, pageSize?: number | undefined) => void;
  onLoad?: (data?: any) => void;
  showPagination?: boolean;
  submitDataType?: boolean; // 是否已formData数据提交
}

interface IState {
  total: number;
  pageNo: number;
  pageSize: number;
  loading: boolean;
  pageSizeOptions: string[];
  dataSource: any[];
}
class TableComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      total: 0,
      pageNo: 1,
      loading: true,
      pageSize: props.pageSize || 10,
      pageSizeOptions: ['10', '20', '30', '40'],
      dataSource: [],
    };
  }

  componentDidMount() {
    this.getDataSource((data: any[]) => {
      this.props.onLoad && this.props.onLoad(data);
    });
  }

  // 请求数据
  getDataSource = async (
    callback?: (data: any[]) => void,
    refreshParams?: IParams,
  ) => {
    try {
      const { pageNo, pageSize } = this.state;
      const { params, url, valueTarget, submitDataType } = this.props;
      let data: any = {
        pageNo,
        pageSize,
      };
      if (refreshParams) {
        for (let x in refreshParams) {
          data[x] = refreshParams[x];
        }
      } else {
        for (let x in params) {
          data[x] = params[x];
        }
      }
      const result = await FetchAgent.sendPost({
        url,
        submitDataType: submitDataType ? 'form' : 'json',
        body: data,
      });
      this.setState({
        total: valueTarget
          ? result[valueTarget].length || 0
          : Number(result.totalSize || 0),
        dataSource: valueTarget
          ? result[valueTarget] || []
          : result.result || [],
        loading: false,
      });
      callback && callback(result);
    } catch (error) {
      this.setState({
        loading: false,
      });
      notification.error({
        message: '网络错误',
        description: '请求失败',
      });
    }
  };
  /**
   * 分页页码change事件
   * @param page 选中的页码
   * @param pageSize 每页多少条
   */
  pageChange = (page: number, pageSize?: number | undefined) => {
    if (page !== this.state.pageNo) {
      this.setState(
        {
          pageNo: page,
          loading: true,
        },
        () => {
          this.getDataSource();
        },
      );
    }
  };

  /**
   * 分页每页显示多少条changge事件
   * @param current 当前页码
   * @param pageSize 选中的条码
   */
  pageSizeChange = (current: number, pageSize: number) => {
    if (pageSize !== this.state.pageSize) {
      this.setState(
        {
          pageNo: 1,
          pageSize,
          loading: true,
        },
        () => {
          this.getDataSource();
        },
      );
    }
  };

  /**
   * 获取当前的页码
   */
  getPageSize = () => {
    const { pageNo, pageSize, total } = this.state;
    return {
      current: pageNo,
      pageSize,
      total,
    };
  };

  /**
   * 刷新
   */
  refresh = (data?: IParams) => {
    this.setState(
      {
        pageNo: 1,
      },
      () => {
        this.getDataSource(undefined, data);
      },
    );
  };

  render() {
    const {
      columns,
      showQuickJumper = true,
      rowKey,
      showPagination = true,
      ...props
    } = this.props;
    const {
      pageSizeOptions,
      loading,
      dataSource,
      total,
      pageNo,
      pageSize,
    } = this.state;
    return (
      <div className={styles.tableContainer}>
        <Spin spinning={loading}>
          <Table
            {...props}
            rowKey={(record: any) => record[rowKey]}
            columns={columns}
            dataSource={dataSource}
            pagination={false}
          />
          <div className={styles.spacing} />
          {showPagination && dataSource.length > 0 && (
            <div className={styles.paginationWrap}>
              <Pagination
                showQuickJumper={showQuickJumper}
                showSizeChanger={true}
                current={pageNo}
                total={total}
                pageSize={pageSize}
                showTotal={(total: number) => `共有${total}条`}
                pageSizeOptions={pageSizeOptions}
                onChange={this.pageChange}
                onShowSizeChange={this.pageSizeChange}
              />
            </div>
          )}
        </Spin>
      </div>
    );
  }
}
export default TableComponent;
