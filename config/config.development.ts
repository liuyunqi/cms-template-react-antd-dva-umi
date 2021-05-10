export default {
  define: {
    // 添加这个自定义的环境变量
    'process.env.UMI_ENV': JSON.stringify(process.env.UMI_ENV),
  },
};
