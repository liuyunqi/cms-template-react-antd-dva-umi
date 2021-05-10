// @ts-nocheck
import { Component } from 'react';
import { ApplyPluginsType } from 'umi';
import dva from 'dva';
// @ts-ignore
import createLoading from 'F:/chipProjectCode/new_dva_umi_base/node_modules/dva-loading/dist/index.esm.js';
import { plugin, history } from '../core/umiExports';
import ModelCount0 from 'F:/chipProjectCode/new_dva_umi_base/src/pages/demo/models/count.ts';
import ModelHome1 from 'F:/chipProjectCode/new_dva_umi_base/src/pages/demo/models/home.ts';
import ModelNested2 from 'F:/chipProjectCode/new_dva_umi_base/src/pages/demo/models/nested.ts';
import ModelNetwork3 from 'F:/chipProjectCode/new_dva_umi_base/src/pages/demo/models/network.ts';
import ModelTest4 from 'F:/chipProjectCode/new_dva_umi_base/src/pages/demo/models/test.ts';
import ModelArrivalDetails5 from 'F:/chipProjectCode/new_dva_umi_base/src/pages/smartReplenishment/models/arrivalDetails.ts';
import ModelCompanyReplenishList6 from 'F:/chipProjectCode/new_dva_umi_base/src/pages/smartReplenishment/models/companyReplenishList.ts';
import ModelCoverLib7 from 'F:/chipProjectCode/new_dva_umi_base/src/pages/smartReplenishment/models/coverLib.ts';
import ModelCreaterDispatchGoods8 from 'F:/chipProjectCode/new_dva_umi_base/src/pages/smartReplenishment/models/createrDispatchGoods.ts';
import ModelInfoPanelStore9 from 'F:/chipProjectCode/new_dva_umi_base/src/pages/smartReplenishment/models/infoPanelStore.ts';
import ModelInvoicesDetails10 from 'F:/chipProjectCode/new_dva_umi_base/src/pages/smartReplenishment/models/invoicesDetails.ts';
import ModelInvoicesReview11 from 'F:/chipProjectCode/new_dva_umi_base/src/pages/smartReplenishment/models/invoicesReview.ts';
import ModelOverviewChart12 from 'F:/chipProjectCode/new_dva_umi_base/src/pages/smartReplenishment/models/overviewChart.ts';
import ModelTransferCargo13 from 'F:/chipProjectCode/new_dva_umi_base/src/pages/smartReplenishment/models/transferCargo.ts';

let app:any = null;

export function _onCreate(options = {}) {
  const runtimeDva = plugin.applyPlugins({
    key: 'dva',
    type: ApplyPluginsType.modify,
    initialValue: {},
  });
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    // @ts-ignore
    ...(typeof window !== 'undefined' && window.g_useSSR ? { initialState: window.g_initialProps } : {}),
    ...(options || {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach((plugin:any) => {
    app.use(plugin);
  });
  app.model({ namespace: 'count', ...ModelCount0 });
app.model({ namespace: 'home', ...ModelHome1 });
app.model({ namespace: 'nested', ...ModelNested2 });
app.model({ namespace: 'network', ...ModelNetwork3 });
app.model({ namespace: 'test', ...ModelTest4 });
app.model({ namespace: 'arrivalDetails', ...ModelArrivalDetails5 });
app.model({ namespace: 'companyReplenishList', ...ModelCompanyReplenishList6 });
app.model({ namespace: 'coverLib', ...ModelCoverLib7 });
app.model({ namespace: 'createrDispatchGoods', ...ModelCreaterDispatchGoods8 });
app.model({ namespace: 'infoPanelStore', ...ModelInfoPanelStore9 });
app.model({ namespace: 'invoicesDetails', ...ModelInvoicesDetails10 });
app.model({ namespace: 'invoicesReview', ...ModelInvoicesReview11 });
app.model({ namespace: 'overviewChart', ...ModelOverviewChart12 });
app.model({ namespace: 'transferCargo', ...ModelTransferCargo13 });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  constructor(props: any) {
    super(props);
    // run only in client, avoid override server _onCreate()
    if (typeof window !== 'undefined') {
      _onCreate();
    }
  }

  componentWillUnmount() {
    let app = getApp();
    app._models.forEach((model:any) => {
      app.unmodel(model.namespace);
    });
    app._models = [];
    try {
      // 释放 app，for gc
      // immer 场景 app 是 read-only 的，这里 try catch 一下
      app = null;
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
