/**
 * 根据环境获取对应的URL前缀
 */
// @ts-nocheck
module.exports = function(UMI_ENV, BUILD_ENV) {
  switch (UMI_ENV) {
    case BUILD_ENV.PROD:
      return '/';
    case BUILD_ENV.TEST:
      return 'http://yf-test-oss.yifengx.com/webtest/dengcheng/umi-demo/';
    case BUILD_ENV.DEV:
      return '/';
    default:
      return '/';
  }
};
