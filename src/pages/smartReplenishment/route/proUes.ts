import { history } from 'umi';
import queryString from 'query-string';
import { mergeUrl } from '@/public/utils/baseTool';
import apiConfig from '../config/api';

const BUILD_ENV = require('@/public/utils/Env');
const { NODE_ENV, RUN_ENV = '', UMI_ENV = '' } = process.env;
const getPublicPath = require('../config/publicPath'); // require(`@/pages/${PROJECT}/config/publicPath`);


// 双模式路由跳转
export const multiToPath = (router: string, params: any = {}, isDebugger = false) => {

  if (NODE_ENV === BUILD_ENV.DEV) {

    let setIRouter: any = router;
    if (Object.keys(params).length > 0) {
      setIRouter = {
        pathname: router,
        query: params,
      };
    }

    if (isDebugger) {
      return setIRouter;
    } else {
      history.push(setIRouter);
    }

  } else {
    let prefix = mergeUrl([getPublicPath(NODE_ENV, BUILD_ENV), router]);
    let setUrl: string = `${prefix}?${queryString.stringify(params)}`;

    if (isDebugger) {
      return setUrl;
    } else {
      window.location.href = setUrl;
    }
  }
}

// 解决双模式路由相关问题，目前开发为 SPA模式, build为 多页应用模式; 
export default class MultiToPath {

  static toBack() {
    history.goBack();
  }

  static goForward() {
    history.goForward();
  }

  // .push() 跳转当前页面
  static toPath(router: string, params: any = {}, isDebugger = false)  {

    // console.log('RUN_ENV-process:', process.env, process.env.RUN_ENV)

    if (NODE_ENV === BUILD_ENV.DEV) {
  
      let setIRouter: any = router;
      if (Object.keys(params).length > 0) {
        setIRouter = {
          pathname: router,
          query: params,
        };
      }
  
      if (isDebugger) {
        return setIRouter;
      } else {
        history.push(setIRouter);
      }
  
    } else {
      // let prefix = mergeUrl([getPublicPath(NODE_ENV, BUILD_ENV), router]);
      let prefix = mergeUrl([apiConfig.CLIENTservice, router]);

      // console.log('prefix: ', NODE_ENV, BUILD_ENV, getPublicPath(NODE_ENV, BUILD_ENV), router);

      let setUrl: string = `${prefix}.html?${queryString.stringify(params)}`;
  
      if (isDebugger) {
        return setUrl;
      } else {
        window.location.href = setUrl;
      }
    }
  }

  // 是否匹配当前路由
  static isListenPathName(location: any, str: string): boolean {
    if (NODE_ENV === BUILD_ENV.DEV) {
      let _str = str.indexOf('/') !== 0 ? `/${str}` : str;
      if (location.pathname === _str) return true;
    } else {
      if (location.pathname.indexOf(`${str}.html`) > -1) return true;
    }
    return false;
  }

}