// 项目路径
var PRO_PATH = '@/pages/smartReplenishment/pages';
module.exports = [
    { path: '/', redirect: '/coverLib' },
    {
        path: '/coverLib',
        exact: true,
        name: '目录',
        component: PRO_PATH + "/coverLib"
    },
    {
        path: '/infoPanelStore',
        exact: true,
        name: '门店补货看板',
        component: PRO_PATH + "/infoPanelStore"
    },
    {
        path: '/transferCargo',
        exact: true,
        name: '请货单明细',
        component: PRO_PATH + "/transferCargo"
    },
    {
        path: '/createrDispatchGoods',
        exact: true,
        name: '新增手动请货单',
        component: PRO_PATH + "/createrDispatchGoods"
    },
    {
        path: '/invoicesDetails',
        exact: true,
        name: '查看请货单',
        component: PRO_PATH + "/invoicesDetails"
    },
    {
        path: '/arrivalDetails',
        exact: true,
        name: '到货明细',
        component: PRO_PATH + "/arrivalDetails"
    },
    {
        path: '/overviewChart',
        exact: true,
        name: '查看概览',
        component: PRO_PATH + "/overviewChart"
    },
    {
        path: '/invoicesReview',
        exact: true,
        name: '单据审核',
        component: PRO_PATH + "/invoicesReview"
    },
    {
        path: '/companyReplenishList',
        exact: true,
        name: '补货列表',
        component: PRO_PATH + "/companyReplenishList"
    }
];
