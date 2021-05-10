const BUILD_ENV = require('../../../../src/public/utils/Env');
const { UMI_ENV = '' } = process.env;
const target = JSON.parse(UMI_ENV);

// API prefix config
let ROOTservice;
let STOREservice;

// service 前缀
class HttpPrefix {
  static ROOTservice() {
    switch (target) {
      case BUILD_ENV.PROD:
        return 'https://goods.yifengx.com/goods-search';
      case BUILD_ENV.TEST:
        return 'https://goods.yifengx.com/goods-search';
      case BUILD_ENV.DEV:
        return 'https://goods.yifengx.com/goods-search';
      default:
        return '';
    }
  }

  static STOREservice() {
    switch (target) {
      case BUILD_ENV.PROD:
        return 'https://posopssl.yfdyf.com/store';
      case BUILD_ENV.TEST:
        return 'https://posopssl.yfdyf.com/store';
      case BUILD_ENV.DEV:
        return 'https://posopssl.yfdyf.com/store';
      default:
        return '';
    }
  }
}


ROOTservice = HttpPrefix.ROOTservice();
STOREservice = HttpPrefix.STOREservice();


export default {
  /** 接口根地址 */
  getApiPrefix: (() => {
    switch (target) {
      case BUILD_ENV.PROD:
        return 'https://mdwx.yfdyf.com/yasst-rest/';
      case BUILD_ENV.TEST:
        return 'http://192.168.7.107:9091';
      case BUILD_ENV.DEV:
        return 'http://192.168.7.107:9091';
      default:
        return '';
    }
  })(),

  ROOTservice,
  STOREservice,

  url: {
    findPageByKeyWord: `${ROOTservice}/query/findPageByKeyWord`,          // 获取商品数据list - 搜索模糊文本、页码
  }
};
