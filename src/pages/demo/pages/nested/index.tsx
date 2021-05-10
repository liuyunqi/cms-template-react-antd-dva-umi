import { ConnectState } from '../../models/connect';
import React from 'react';
import { connect, Dispatch } from 'umi';
import { NestedState } from '../../type';
import styles from './index.less';
interface IProps extends NestedState {
  dispatch: Dispatch;
}
const Nested: React.FC<IProps> = ({
  titleMap,
  activeTitle,
  dispatch,
  children,
}) => {
  return (
    <div className={styles.nestedContainer}>
      <h2>嵌套页面</h2>
      <div className={styles.titleWrap}>
        {titleMap.map(item => (
          <div
            key={item.url}
            className={activeTitle === item.url ? styles.active : ''}
            onClick={() =>
              dispatch({
                type: 'demoNestedStore/clickTile',
                payload: item.url,
              })
            }
          >
            {item.title}
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};

export default connect(({ demoNestedStore }: ConnectState) => ({
  ...demoNestedStore,
}))(Nested);
