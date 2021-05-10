import React from 'react';
import { Tabs } from 'antd';
import { ConnectState } from '../../models/connect';
import { connect, Dispatch } from 'umi';
import DocumentTitle from 'react-document-title';
import { HomeState } from '../../type';
import styles from './index.less';
import Antd from './antd';
import Dva from './dva';
import Umi from './umi';
import { HOME_TAB_KEY } from '../../models/home';
const { TabPane } = Tabs;

interface IProps extends HomeState {
  dispatch: Dispatch;
}
const Home: React.FC<IProps> = ({ tabListMap, dispatch }) => {
  console.log('tabListMap', tabListMap);
  return (
    <DocumentTitle title="首页">
      <div className={styles.homeContainer}>
        <p className={styles.title}>antd+dva+umi</p>
        <p>本框架使用TypeScript开发。</p>
        <Tabs type="card" defaultActiveKey="antd">
          {tabListMap &&
            tabListMap.map(item => (
              <TabPane tab={item.label} key={item.key}>
                {item.key === HOME_TAB_KEY.ANTD && <Antd />}
                {item.key === HOME_TAB_KEY.DVA && <Dva />}
                {item.key === HOME_TAB_KEY.UMI && <Umi />}
              </TabPane>
            ))}
        </Tabs>
      </div>
    </DocumentTitle>
  );
};

export default connect(({ ...state }: ConnectState) => {
  console.log('state', state);
  return {
    ...state.demoHomeStore,
  };
})(Home);
