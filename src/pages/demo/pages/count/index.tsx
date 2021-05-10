import React from 'react';
import { Button, Input, Radio } from 'antd';
import { connect, Dispatch } from 'umi';
import { ConnectState } from '../../models/connect';
import { CountState, CountTodoList, CountTodoStatus } from '../../type';
import styles from './index.less';
import { RadioChangeEvent } from 'antd/lib/radio';

interface IProps extends CountState {
  dispatch: Dispatch;
}
const Count: React.FC<IProps> = ({
  total,
  inputValue,
  todoList,
  todoStatus,
  dispatch,
  ...props
}) => {
  let newTodolist: CountTodoList[] = [];
  switch (todoStatus) {
    case CountTodoStatus.COMPLETED:
      newTodolist = todoList.filter(item => !item.completed);
      break;
    case CountTodoStatus.ACTIVE:
      newTodolist = todoList.filter(item => item.completed);
      break;
    default:
      newTodolist = todoList;
  }
  // 自增
  /**
   * 注意dispatch 的action 一定要明确是调用哪一个model
   * 如果 type: 'setCount', 是不能生效，一定要明确到 'countStore' model的setCount事件
   */
  const INCREMENT = () => {
    dispatch({
      type: 'demoCountStore/setCount',
      payload: 'INCREMENT',
    });
  };
  // 自减
  const DECREMENT = () => {
    dispatch({
      type: 'demoCountStore/setCount',
      payload: 'DECREMENT',
    });
  };

  return (
    <div className={styles.countContainer}>
      <p>计数示例：</p>
      <div>
        count: <span className={styles.total}>{total}</span>
      </div>
      <div className={styles.buttonWrap}>
        <Button type="primary" onClick={INCREMENT}>
          +
        </Button>
        <Button type="ghost" onClick={DECREMENT}>
          -
        </Button>
      </div>
      <br />
      <br />
      <br />
      <br />
      <p>todo示例：</p>
      <div className={styles.todoContainer}>
        <div className={styles.inputWrap}>
          <Input
            style={{ width: 220 }}
            value={inputValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({
                type: 'demoCountStore/setInputValue',
                payload: event.target.value,
              })
            }
          />{' '}
          <Button
            type="primary"
            onClick={() =>
              dispatch({
                type: 'demoCountStore/add',
              })
            }
          >
            增加
          </Button>
        </div>
        <br />
        {todoList.length > 0 && (
          <>
            <div>
              <Radio.Group
                value={todoStatus}
                onChange={(e: RadioChangeEvent) =>
                  dispatch({
                    type: 'demoCountStore/setRadioValue',
                    payload: e.target.value,
                  })
                }
              >
                <Radio value={CountTodoStatus.ALl}>全部</Radio>
                <Radio value={CountTodoStatus.ACTIVE}>已完成</Radio>
                <Radio value={CountTodoStatus.COMPLETED}>未完成</Radio>
              </Radio.Group>
            </div>
            <br />
            <div className={styles.todoContent}>
              {newTodolist.map(item => {
                return (
                  <p
                    key={item.id}
                    onClick={() =>
                      dispatch({
                        type: 'demoCountStore/setCompleted',
                        payload: item.id,
                      })
                    }
                    className={
                      item.completed ? styles.completed : styles.active
                    }
                  >
                    {item.label}
                  </p>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default connect(({ demoCountStore }: ConnectState) => ({
  ...demoCountStore,
}))(Count);
