/**
 * count state
 * @param total 总计数量
 */
export type CountState = {
  total: number;
  todoList: CountTodoList[];
  inputValue: string;
  todoStatus: CountTodoStatus;
};

export interface CountTodoList {
  label: string;
  id: string;
  completed: boolean;
}

export enum CountTodoStatus {
  'ALl' = 'ALL',
  'ACTIVE' = 'ACTIVE',
  'COMPLETED' = 'COMPLETED',
}
