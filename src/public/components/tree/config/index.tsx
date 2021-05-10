const { UMI_ENV = '' } = process.env;
const target = JSON.parse(UMI_ENV);
enum BUILD_ENV {
  PROD = 'prod',
  TEST = 'test',
  DEV = 'development',
}
export default {
  /**
   *获取sso前缀地址
   */
  getSSOUrl: (() => {
    switch (target) {
      case BUILD_ENV.PROD:
        return 'https://chief.yifengx.com/';
      case BUILD_ENV.TEST:
        return 'http://chief-te.yifengx.com/';
      case BUILD_ENV.DEV:
        return 'http://chief-te.yifengx.com/';
      default:
        return '';
    }
  })(),
};
