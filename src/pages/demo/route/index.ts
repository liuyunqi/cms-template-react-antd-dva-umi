module.exports = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    exact: true,
    name: '首页',
    component: '@/pages/demo/pages/home',
    layout: {
      hideNav: true, // 设置true 隐藏顶部状态栏
    },
  },
  {
    path: '/count',
    exact: true,
    name: '计数示例',
    component: '@/pages/demo/pages/count',
  },
  {
    path: '/nested',
    name: '嵌套页面',
    component: '@/pages/demo/pages/nested',
    routes: [
      { path: '/nested/new', component: '@/pages/demo/pages/nested/new' },
      { path: '/nested/war', component: '@/pages/demo/pages/nested/war' },
      { path: '/nested/tech', component: '@/pages/demo/pages/nested/tech' },
      { path: '/nested/auto', component: '@/pages/demo/pages/nested/auto' },
      { path: '/nested/ent', component: '@/pages/demo/pages/nested/ents' },
      { path: '/nested/money', component: '@/pages/demo/pages/nested/money' },
      {
        path: '/nested/jiankang',
        component: '@/pages/demo/pages/nested/jiankang',
      },
      { path: '/nested/travel', component: '@/pages/demo/pages/nested/travel' },
    ],
  },
  {
    path: '/network',
    exact: true,
    name: '网络请求',
    component: '@/pages/demo/pages/network',
  },
  {
    path: '/test',
    exact: true,
    name: '测试自建',
    component: '@/pages/demo/pages/test',
  }
];
