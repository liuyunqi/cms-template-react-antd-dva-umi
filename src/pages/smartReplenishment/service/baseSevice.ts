import queryString from 'query-string';
import { FetchAgent } from '@/public/services/';
import { message } from 'antd';

FetchAgent.setDebug(false);

// 请求前置拦截器
FetchAgent.setupReqInterceptor(
  config => {
    (config.headers as any)['Content-Type'] = 'application/json';   //charset=UTF-8
    return false;
  }
);


// 请求数据返回拦截器
FetchAgent.setupRespInterceptor((response: any) => {
  console.log('response', response)
  if (Array.isArray(response)) return false;        // 多方接口无法规范统一, 公共接口没有状态直接返回数组数据
  if (response.status === undefined && response) {
    if (typeof response.message === 'string' && response.message.indexOf('java.lang') > -1) {
      errMsgHandle(response);
      return true;
    }
    return false;  // 多方接口无法规范统一, 公共接口没有状态直接返回对象数据
  }
  if (response.status !== 0) {
    errMsgHandle(response);
    return true;
  }
  return false;
});

// 错误统一处理
const errMsgHandle = (err: any): void | never => {
  if (err.message) {
    let strReplace = typeof err.message === 'string' ? err.message.replace(/(\<br\/\>)|(\n)/g, '') : err.message;   // 过滤系统校验换行符（最早存在于智能补货）
    message.error(strReplace);
  } else {
    message.error('请求失败');
  }

  // 向外抛出异常, 确保前端编码调用接口时务必使用 async + try catch 形式，确保页码不报错。
  throw err;
}

export default class BaseSevice {

  static Http = FetchAgent;

  // object {} == transform ==> stringQuery 'a=1&b=2'
  static QSstringify(params: object) {
    return queryString.stringify(params);
  }

  // reverse    -    stringQuery 'a=1&b=2' == transform ==> object {}
  static QSparse(params: string) {
    return queryString.parse(params);
  }
}