import React from 'react';
import { connect, Dispatch } from 'umi';
// import { Table } from 'antd';
import { Table } from '../../../../public/components';
import { ConnectState } from '../../models/connect';
import { NetwotkState } from '../../type';
import styles from './index.less';
import ApiConfig from '../../config/api';
import { Button, Form, Input, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { tabRef } from '../../models/network';
interface IProps extends NetwotkState {
  dispatch: Dispatch;
  submiting: boolean | undefined;
}
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const columns = [
  {
    title: '编号',
    dataIndex: 'countryCode',
    key: 'countryCode',
  },
  {
    title: '名称',
    dataIndex: 'countryName',
    key: 'countryName',
  },
];
const Network: React.FC<IProps> = ({ creataStatus, submiting, dispatch }) => {
  console.log('creataStatus', creataStatus);
  const formRef = React.createRef<FormInstance>();
  const addClick = (status: boolean) => {
    dispatch({
      type: 'demoNetworkStore/saveData',
      payload: {
        key: 'creataStatus',
        value: status,
      },
    });
  };

  const onOk = () => {
    if (formRef && formRef.current) {
      formRef.current.validateFields().then(data => {
        dispatch({
          type: 'demoNetworkStore/create',
          payload: {
            country: {
              ...data,
            },
          },
        });
      });
    }
  };
  return (
    <div className={styles.networkContainer}>
      <Button
        type="primary"
        style={{ marginBottom: 10 }}
        onClick={() => addClick(true)}
      >
        新增
      </Button>
      <Table
        ref={tabRef}
        url={`${ApiConfig.getApiPrefix}/labs/CountryService/listByPage`}
        columns={columns}
        rowKey="id"
      />

      {creataStatus && (
        <Modal
          title="新增"
          visible={true}
          confirmLoading={submiting}
          onOk={() => onOk()}
          onCancel={() => addClick(false)}
        >
          <Form {...layout} className={styles.formWrap} ref={formRef}>
            <Form.Item
              label="编号"
              name="countryCode"
              rules={[{ required: true, message: '请输入编号' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="名称"
              name="countryName"
              rules={[{ required: true, message: '请输入名称' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default connect(({ demoNetworkStore, loading }: ConnectState) => ({
  ...demoNetworkStore,
  submiting: loading.effects['demoNetworkStore/create'],
}))(Network);
