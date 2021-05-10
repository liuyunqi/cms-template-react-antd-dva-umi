// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from 'F:/chipProjectCode/new_dva_umi_base/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@/public/components/PageLoading/index';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: '.umi__plugin-layout__Layout' */'F:/chipProjectCode/new_dva_umi_base/src/.umi/plugin-layout/Layout.tsx'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/index.html",
        "redirect": "/coverLib",
        "exact": true
      },
      {
        "path": "/",
        "redirect": "/coverLib",
        "exact": true
      },
      {
        "path": "/coverLib",
        "exact": true,
        "name": "目录",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__smartReplenishment__pages__coverLib' */'@/pages/smartReplenishment/pages/coverLib'), loading: LoadingComponent})
      },
      {
        "path": "/infoPanelStore",
        "exact": true,
        "name": "门店补货看板",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__smartReplenishment__pages__infoPanelStore' */'@/pages/smartReplenishment/pages/infoPanelStore'), loading: LoadingComponent})
      },
      {
        "path": "/transferCargo",
        "exact": true,
        "name": "请货单明细",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__smartReplenishment__pages__transferCargo' */'@/pages/smartReplenishment/pages/transferCargo'), loading: LoadingComponent})
      },
      {
        "path": "/createrDispatchGoods",
        "exact": true,
        "name": "新增手动请货单",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__smartReplenishment__pages__createrDispatchGoods' */'@/pages/smartReplenishment/pages/createrDispatchGoods'), loading: LoadingComponent})
      },
      {
        "path": "/invoicesDetails",
        "exact": true,
        "name": "查看请货单",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__smartReplenishment__pages__invoicesDetails' */'@/pages/smartReplenishment/pages/invoicesDetails'), loading: LoadingComponent})
      },
      {
        "path": "/arrivalDetails",
        "exact": true,
        "name": "到货明细",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__smartReplenishment__pages__arrivalDetails' */'@/pages/smartReplenishment/pages/arrivalDetails'), loading: LoadingComponent})
      },
      {
        "path": "/overviewChart",
        "exact": true,
        "name": "查看概览",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__smartReplenishment__pages__overviewChart' */'@/pages/smartReplenishment/pages/overviewChart'), loading: LoadingComponent})
      },
      {
        "path": "/invoicesReview",
        "exact": true,
        "name": "单据审核",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__smartReplenishment__pages__invoicesReview' */'@/pages/smartReplenishment/pages/invoicesReview'), loading: LoadingComponent})
      },
      {
        "path": "/companyReplenishList",
        "exact": true,
        "name": "补货列表",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__smartReplenishment__pages__companyReplenishList' */'@/pages/smartReplenishment/pages/companyReplenishList'), loading: LoadingComponent})
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
