import { HomeState } from '../type';

/**
 * 此处声明用于在请求时调用全局的loading
 */
export interface childLoadingModels {
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    setting?: boolean;
    homeStore?: boolean;
  };
}

/**
 * 此处声明是用于
 * 1.在connect处找到store
 * 2.在models里面找到store
 */
export interface childConnectState {
  homeStore: HomeState;
}
