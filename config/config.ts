import { defineConfig } from 'umi';

const BUILD_ENV = require('../src/public/utils/Env');
const { NODE_ENV, UMI_ENV, PROJECT = 'demo' } = process.env;
const routeApp = require(`../src/pages/${PROJECT}/route`);
const getPublicPath = require(`../src/pages/${PROJECT}/config/publicPath`);

const config: any = {
  hash: true, // 打包生产的文件包含hash字符
  history: {
    type: 'browser', // 可选 browser、hash 和 memory
  },
  antd: {},
  dva: {
    hmr: true, //表示是否启用 dva model 的热更新。
  },
  mock: {},
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    title: false,
    baseNavigator: false,
  },
   /**
   * @param targets
   * 配置需要兼容的最低浏览器版本
   * 默认 chrome: 49, firefox: 64, safari: 10, edge: 13, ios: 10
   */
  targets: {
    ie: 11,
    firefox: 53
  },
   /**
   * @param publicPath
   * 打包时，webpack会在静态文件路径前面添加publicPath的值。
   */
  // publicPath: '/',
  publicPath: getPublicPath(UMI_ENV, BUILD_ENV),
  /**
   * @param dynamicImport
   * 过渡动画 --可自定义
   */
  dynamicImport: {
    loading: '@/public/components/PageLoading/index',
  },
  /**
   * @param theme
   * 配置主题颜色
   */
  theme: {
    // ...darkTheme,
    '@primary-color': '#009639',
  },
  
  /**
   * @param exportStatic
   *  如果开启 exportStatic，则会针对每个路由输出 html 文件。
   *  注意：此配置只在SPA下起效
   *  例如:
   *  /
   *  /list
   *  /count
   *  设置 exportStatic: {} 后，输出， index.html list/index.html count/index.html
   *  设置 exportStatic: { htmlSuffix: true } 后，输出， index.html list.html count.html
   */
  exportStatic: {},
    /**
   * @param nodeModulesTransform
   * 设置 node_modules 目录下依赖文件的编译方式。
   * type，类型，可选 all 和 none
   * all速度比none慢，但是兼容性比none好。
   */
  nodeModulesTransform: {
    type: 'all',
  },
    /**
   * @param define
   * 用于提供给代码中可用的变量。
   * 例如：process.env.UMI_ENV
   * UMI_ENV 通过启动项目时在package.json配置所属环境，用于在项目中调用不同API，已经根据不同的环境执行某些函数
   */
  define: {
    'process.env.UMI_ENV': JSON.stringify(process.env.UMI_ENV)
  },
  /**
   * 路由
   */
  routes: routeApp,
  /**
   * dayjs替换moment
   */
  chainWebpack(config: any) {
    config.plugin('moment2dayjs').use('antd-dayjs-webpack-plugin');
  },
};

/**
 * 此处配置打包时隐藏左侧菜单栏，如打包单也应用需要菜单栏，请移除layout&&map
 */
if (NODE_ENV !== 'production') {
  /**
   * @param layout
   * 配置开启菜单栏
   */
  config.layout = {
    name: 'antd/dva/umi',
  };
}
if (NODE_ENV === 'production') {
  config.mpa = {};
}
export default defineConfig(config);
