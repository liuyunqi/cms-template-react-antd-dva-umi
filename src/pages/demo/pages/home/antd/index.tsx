import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Form } from 'antd';
import styles from './index.less';
const { Search } = Input;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface formSubmitType {
  username: string;
  password: string;
}
const Antd = () => {
  const [formSubmitData, setFormSubmitData] = useState<formSubmitType>({
    username: '',
    password: '',
  });

  const onFinish = (values: any) => {
    setFormSubmitData(values);
  };
  return (
    <div className={styles.antdContainer}>
      <p>
        <a href="https://ant.design/index-cn" target="_blank">
          antd
        </a>{' '}
        是基于 Ant Design 设计体系的 React
        UI组件库，主要用于研发企业级中后台产品。
      </p>
      <ul>
        <li>能兼容所有现代浏览器以及 IE11</li>
        <li>
          {' '}
          组件库类型多，不满足业务需求时可随意搭配、修改，有较强的可操作拓展性
        </li>
      </ul>
      <div>组件示例:</div>
      <div className={styles.buttonWrap}>
        <Button type="primary">主题色按钮</Button>
        <Button type="default">默认按钮</Button>
        <Button type="primary" ghost icon={<SearchOutlined />}>
          图标按钮
        </Button>
      </div>
      <br />
      <div className={styles.inputWrap}>
        <Space direction="vertical">
          <Input style={{ width: 280 }} placeholder="请输入文本" />
          <Search style={{ width: 280 }} placeholder="请输入文本" enterButton />
        </Space>
      </div>
      <br />
      <div className={styles.formWrap}>
        <div>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div>
          {formSubmitData.username && (
            <>
              <div>{formSubmitData.username} 用户:</div>
              <br />
              <div>您好,请牢记您设置的密码：{formSubmitData.password}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Antd;
