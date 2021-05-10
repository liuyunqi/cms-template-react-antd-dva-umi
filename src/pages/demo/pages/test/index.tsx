import React, { useState, useEffect, useReducer } from 'react';
import { Table, Modal, Form, Input, Popconfirm, Pagination, message } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { connect, Dispatch } from 'umi';
import { TestState } from '../../type';
import ApiConf from '@/pages/demo/config/api';
import Http from '@/pages/demo/service/test.ts';

import SearchHeader from './components/searchHeader';

import TableMine from '../../../smartReplenishment/components/Table';
import { ColumnRender_operationAction, enumViewMode, enumEventType, sActions as ActionInterface } from '../../../smartReplenishment/components/Table/creator';
import { dataSourceMock, setColumns, setActionsTestMock } from '../../../smartReplenishment/components/Table/tableMock';


import './index.less';


const defaultFirstPage = 1;
const pageSizeOptions = [ '5', '10', '20', '50' ];

interface IProps extends TestState {
  dispatch: Dispatch;
  goodsList: [];
}

interface IRow {
  goodsName: string;
  mainBarcode: string;
  goodCode: string;
  modifyTime?: string;
}

enum RQGOODSLIST {
  NORMAL = 'NORMAL',      // 默认方式
  RESET = 'RESET'         // 数据重置
}

enum ENUMModalState {
  NORMAL = 'NORMAL',      // 默认
  ADD = 'ADD',            // 新增
  EDIT = 'EDIT'           // 编辑
}

const Test:React.FC<IProps> = (props) => {

  const {
    dispatch,
    goodsList,

    sxTableList,
    inputText,
    total,
    pageCurr,
    pageSize
  } = props;

  const formRef = React.createRef<FormInstance>();
  // const [formRef] = Form.useForm();

  const [ tableList, setTableList ] = useState([]);               // 表格列表
  const [ isModalVisible, setIsModalVisible ] = useState(false);  // 弹窗显示
  const [ modalTitle, setModalTitle ] = useState('');             // 弹窗标题
  const [ record, setRecord ] = useState(null);                   // rowData - 表格选中数据
  const [ modalMode, setModalMode ] = useState(ENUMModalState.NORMAL);       // 模态框状态 [新增/ 编辑]
  const [ subLoading, setSubLoading ] = useState(false);          // 提交中状态

  const [ pageUpdate, setPageUpdate ] = useState('hash1');        // 页码更新
  const [ pageCurrent, setPageCurrent ] = useState(1);            // 页码
  const [ pageLimit, setPageLimit ] = useState(5);                // 单页数量
  const [ pageTotal, setPageTotal ] = useState(0);                // 数据长度




  const columns = [
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      key: 'goodsName'
    },
    {
      title: '条码',
      dataIndex: 'mainBarcode',
      key: 'mainBarcode',
    },
    {
      title: '商品编码',
      dataIndex: 'goodCode',
      key: 'goodCode',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={ () => { tableHandle_edit(record) } }>编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;
          <Popconfirm
            title={ `是否删除【${ record.goodsName.substring(0, 5) }】该商品？` }
            onConfirm={ (record) => tableHandle_delete(record) }
          >
          <a href="#">删除</a>
          </Popconfirm>
        </span>
      )
    }
  ];

  // init
  useEffect(() => {
    request_goodsList();
  }, [1])

  // 当弹窗被打开
  useEffect(() => {
    // console.log(formRef)
    console.log('watch: isModalVisible', record)

    if (isModalVisible) {
      if (modalMode === ENUMModalState.EDIT) {
        formRef.current?.setFieldsValue(record);
      } else if (modalMode === ENUMModalState.ADD) {
        formRef.current?.resetFields();
      }
    }
  }, [isModalVisible]);

  // pagination
  useEffect(() => {
    // console.log(pageLimit, pageCurrent)
    // request_goodsList();
  }, [pageLimit, pageCurrent]);

  // watch Pagination change update...
  useEffect(() => {
    console.log(pageLimit, pageCurrent)
    let setMode = RQGOODSLIST.NORMAL;
    if (pageUpdate === RQGOODSLIST.RESET) {
      setMode = RQGOODSLIST.RESET;
    }
    request_goodsList(setMode);
  }, [pageUpdate]);


  console.log('getApiPrefix', ApiConf.getApiPrefix);
  console.log('ROOT', ApiConf.ROOTservice);


  // 获取商品列表
  const request_goodsList = async (type: string = RQGOODSLIST.NORMAL) => {
    let params = {
      storeCode: '5024',
      keyword: '阿莫西林',
      pageNum: pageCurrent,
      pageSize: pageLimit
    };

    let res = await Http.findByGoodCode(params);

    if(res) {
      (res.count && setPageTotal(res.count));
      if (type === RQGOODSLIST.NORMAL) {
        setTableList((prev) => {
          return [...[], ...res.data];
        });
      } else if (type === RQGOODSLIST.RESET) {
        setTableList(res.data);
      }
    } else {

    }
  }


  // Table event
  const tableHandle_edit = (row: IRow) => {     // 编辑
    setModalMode(ENUMModalState.EDIT);
    setRecord(row);
    setIsModalVisible(true);
  }

  const tableHandle_delete = () => {      // 删除
    message.success('模拟删除成功');
    request_goodsList(RQGOODSLIST.RESET);
  }

  // searchCmponent event

  const searchHeader_Add = () => {        // 新增 - 打开显示弹窗
    setModalMode(ENUMModalState.ADD);
    setRecord(null);
    setIsModalVisible(true);
  }

  const searchHeader_Refresh = () => {    // 重置刷新
    setPageCurrent(1);
    setPageUpdate((prevCount) => {
      return RQGOODSLIST.RESET;
    });
  }

  const searchHeader_Change = (e) => {    // 输入
    console.log(e);
  }


  // Modal event

  const modalConfrimOK = () => {          // 确认 - 弹窗

    console.log(formRef)
    console.log(record)
    
    formRef.current?.submit();
    // formRef.current?.resetFields();
    // setIsModalVisible(false);
  }

  // Form event
  const formSubmitHandle = () => {    // valid successfully Pass
    const key = 'submit';
    message.loading({ content: '当前正在模拟请求', key });
    setSubLoading(true);

    setTimeout(() => {
      if (modalMode === ENUMModalState.ADD) {
        message.success({ content: '模拟新增 - successfully！', key });
      } else if (modalMode === ENUMModalState.EDIT) {
        message.success({ content: '模拟编辑 - saveOver！', key });
      }
      setSubLoading(false);
      setIsModalVisible(false);
    }, 1200);
  }

  const formFinishFailedHandle = (e) => {
    message.warn('表单验证失败，请检查！');
  }

  // pagination event
  const onPaginationChange = (page, pageSize) => {
    setPageCurrent(page);
    setPageLimit(pageSize);
    setPageUpdate(prevCount => {
      return prevCount + 1;
    });
  }

  const onPaginationShowSizeChange = (current, size) => {
    /* setPageCurrent(2);
    setPageLimit(size);
    setPageUpdate(prevCount => {
      return prevCount + 1;
    }); */
  }

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
  };

  const mineOnPaginationChange = (page: number, pageSize: number) => {
    dispatch({
      type: 'demoTestStore/setPageCurrent',
      payload: page
    });

    dispatch({
      type: 'demoTestStore/setPageSize',
      payload: pageSize
    });

    dispatch({
      type: 'demoTestStore/httpTableList',
    })
  }

  const mineOnPaginationShowSizeChange = (page: number, pageSize: number) => {

  }

  return (
    <div className="testPage-table-wrapper">
      <div className="test-searchHeader-wrap">
        <SearchHeader className="customParent-SearchHeader" onAdd={ searchHeader_Add } onChange={ searchHeader_Change } onRefresh={ searchHeader_Refresh } />
      </div>
      <Table columns={columns} dataSource={ tableList } rowKey="mainBarcode" pagination={ false } />
      <Pagination
        showSizeChanger
        defaultCurrent={ defaultFirstPage }
        current={ pageCurrent }
        total={ pageTotal }
        pageSize={ pageLimit }
        pageSizeOptions={ pageSizeOptions }
        onChange={ onPaginationChange }
        onShowSizeChange={ onPaginationShowSizeChange }
      ></Pagination>

      <Modal
        title={ modalMode === ENUMModalState.ADD ? `新增`: modalMode === ENUMModalState.EDIT ? '编辑' : '默认标题' }
        visible={ isModalVisible }
        confirmLoading={ subLoading }
        onOk={ modalConfrimOK }
        onCancel={ () => { setIsModalVisible(false) } }
        forceRender
      >
        <Form
          { ...layout }
          name="rowInfo"
          onFinish={ formSubmitHandle }
          onFinishFailed={ formFinishFailedHandle }
          ref={ formRef }
        >
          <Form.Item
            label="商品名称"
            name="goodsName"
            rules={ [{required: true, message: '不能为空'}] }
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="条码"
            name="mainBarcode"
            rules={ [{required: true, message: '不能为空'}] }
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="商品编码"
            name="goodCode"
            rules={ [{required: true, message: '不能为空'}] }
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <div className={ 'mineTableWrapper' }>
        <div></div>
        <div>共 { total } 条</div>
        {/* <TableMine dataSource={ dataSourceMock } columns={ setColumns }/> */}
        <TableMine
          dataSource={ sxTableList }
          columns={ columns }
          pageCurrent={ pageCurr }
          pageLimit={ pageSize }
          pageTotal={ total }
          onPaginationChange={ mineOnPaginationChange }
          onPaginationShowSizeChange={ mineOnPaginationShowSizeChange }
        />
      </div>
    </div>
  );
}


const mapStateToProps = (ALL) => {
  const { demoTestStore, loading } = ALL;
  console.log('testStore====>', demoTestStore, ALL)
  return {
    ...demoTestStore
  }
}

export default connect(mapStateToProps)(Test);