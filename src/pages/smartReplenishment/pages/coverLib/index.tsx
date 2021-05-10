import React from 'react';
import { connect, history, Dispatch } from 'umi';
import { ConnectState } from '../../models/connect.d';
import { CoverLibState } from '../../type';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import styles from './index.less';
import { SwitchClickEventHandler } from 'antd/lib/switch';


interface IProps extends CoverLibState {
  dispatch: Dispatch;
}

const menuList = [
  { path: '', name: '公司补货看板'},
  { path: '', name: '门店补货看板'},
  { path: '', name: '单据审核'},
  { path: '', name: '请货列表查询'},
  { path: '', name: '公司补货设置'},
  { path: '', name: '门店补货设置'},
  { path: '', name: '商品补货设置'},
];

const CoverLib: React.FC<IProps> = ({
  dispatch,
  ...props
}) => {

  const searchHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event)
  }

  // event:React.MouseEvent
  const itemClickHandle = (path: string) => {
    history.push(path);
  }

  const DOM_listItem = () => {
    let rDOM: JSX.Element[] = [];
    menuList.forEach((item, index) => {
      rDOM.push(<a className={styles.item} onClick={() => {itemClickHandle(item.path)}} key={index}>{ item.name }</a>);

      index % 3 === 2 && rDOM.push(<br key={index+'br'}></br>);
    });

    return rDOM;
  }

  return (
    <div className={styles.page}>
      <Input
        className={styles.searchInput}
        placeholder="搜索"
        prefix={<SearchOutlined className="site-form-item-icon" />}
        onChange={searchHandle}
      />

      <div className={styles.itemWrapper}>
        {
          DOM_listItem()
        }
      </div>
    </div>
  );
}

// connect props...
const mapStateToProps = (ALL: ConnectState) => {
  const { testStore, loading } = ALL;
  console.log('testStore====>', testStore, ALL)
  return {
    ...ALL
  }
}

export default connect(mapStateToProps)(CoverLib);