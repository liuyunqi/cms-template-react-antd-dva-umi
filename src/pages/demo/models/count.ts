import { Subscription, Reducer, Effect } from 'umi';
import { ConnectState } from './connect.d';
import { CountState, CountTodoStatus } from '../type';
import { message } from 'antd';
export interface CountModelType {
  namespace: 'demoCountStore';
  state: CountState;
  effects: {};
  reducers: {
    setCount: Reducer<CountState>;
    setInputValue: Reducer<CountState>;
    add: Reducer<CountState>;
    setRadioValue: Reducer<CountState>;
    setCompleted: Reducer<CountState>;
  };
}
const initState = () => {
  return {
    total: 0,
    todoList: [],
    inputValue: '',
    todoStatus: CountTodoStatus.ALl,
  };
};
const CountModel: CountModelType = {
  namespace: 'demoCountStore',

  state: {
    total: 0,
    todoList: [],
    inputValue: '',
    todoStatus: CountTodoStatus.ALl,
  },

  effects: {},

  reducers: {
    setCount(state, { payload }) {
      if (!state) {
        return initState();
      }
      return {
        ...state,
        total: payload === 'INCREMENT' ? state.total + 1 : state.total - 1,
      };
    },
    setInputValue(state, { payload }) {
      if (!state) {
        return initState();
      }
      return {
        ...state,
        inputValue: payload,
      };
    },
    setRadioValue(state, { payload }) {
      if (!state) {
        return initState();
      }
      return {
        ...state,
        todoStatus: payload,
      };
    },
    add(state) {
      if (!state) {
        return initState();
      }
      const { inputValue, todoList } = state;
      if (!inputValue) {
        return {
          ...state,
        };
      } else {
        todoList.push({
          label: inputValue,
          completed: false,
          id: Math.floor(Math.random() * 10000).toString(),
        });
        return {
          ...state,
          inputValue: '',
          todoList,
        };
      }
    },
    setCompleted(state, { payload }) {
      if (!state) {
        return initState();
      }
      const { todoList } = state;
      todoList.forEach(item => {
        if (item.id == payload) {
          item.completed = !item.completed;
        }
      });
      return {
        ...state,
        todoList: [...todoList],
      };
    },
  },
};

export default CountModel;
