import queryString from 'query-string';
import { FetchAgent } from '@/public/services/';

import ApiConfig from '../config/api';
import BaseSevice from './baseSevice'

export const _findByGoodCode = async (params: any): Promise<any> => {
  return FetchAgent.sendPost({
    url: `${ApiConfig.url.findPageByKeyWord}`,
    body: params,
  });
};


// 获取商品列表 - 参数
interface findByGoodCodePARAMS {
  storeCode: string;
  keyword: string;
  pageNum: number;
  pageSize: number;
}

export default class Goods extends BaseSevice {

  // 获取商品列表
  static findByGoodCode (params: findByGoodCodePARAMS) {

    const paramsStr: string = BaseSevice.QSstringify(params);

    return FetchAgent.sendPost({
      url: `${ApiConfig.url.findPageByKeyWord}?${paramsStr}`,
      submitDataType: 'json'
    });
  }
}
