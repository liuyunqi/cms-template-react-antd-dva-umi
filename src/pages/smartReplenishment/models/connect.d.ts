import { MenuDataItem, Settings as ProSettings } from '@ant-design/pro-layout';

import {
  CoverLibState,
  InfoPanelStoreState,
  TransferCargoStoreState,
  CreaterDispatchGoodsStoreState,
  InvoicesDetailsState,
  ArrivalDetailsState,
  OverviewModelStoreState,
  CompanyReplenishListState,
  InvoicesReviewState
} from '../type';
/**
 * 此处声明用于在请求时调用全局的loading
 */
export interface Loading {
  effects: { [key: string]: boolean | undefined };
  models: {
    setting?: boolean;
    smartRepCoverLibStore?: boolean;
  };
}

/**
 * 此处声明是用于
 * 1.在connect处找到store
 * 2.在models里面找到store
 */
export interface ConnectState {
  loading: Loading;
  settings: ProSettings;
  smartRepCoverLibStore: CoverLibState;
  smarReptStore_infoPanelStore: InfoPanelStoreState;
  smarRept_TransferStore: TransferCargoStoreState;
  smarRept_createrDispatchGoodsStore: CreaterDispatchGoodsStoreState;
  smarRept_invoicesDetails: InvoicesDetailsState,
  smarRept_arrivalDetailsStore: ArrivalDetailsState,
  smarRept_overviewModelStore: OverviewModelStoreState
  smarRept_companyReplenishListStore: CompanyReplenishListState,
  smarRept_invoicesReview: InvoicesReviewState
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}
