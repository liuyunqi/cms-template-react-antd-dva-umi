import React from 'react';
import styles from './index.less';
const img1 = require('@/public/resources/img/umi_1.png');
const img2 = require('@/public/resources/img/umi_2.png');
const Umi = () => {
  return (
    <div className={styles.umiContainer}>
      <p>
        <a href="https://umijs.org/zh-CN" target="_blank">
          umi
        </a>{' '}
        是一套企业级的前端应用框架
      </p>
      <div>在本框架中，最核心的部分就是umi</div>
      <ul>
        <li>可拓展、可配置</li>
      </ul>
      <img src={img1} style={{ width: '60%' }} />
      <br />
      <img src={img2} style={{ height: 400, width: 400 }} />
      <br />
      <div>项目启动、打包以及插件的配置、运行环境的配置都是依靠umi</div>
      <div>umi提供了路由功能，不再需要单独安装router,并提供了约定式路由</div>
      <br />
      <div>跳转页面</div>
      <ul>
        <li>声明式 :直接使用组件跳转</li>
        <li>命令是 :通过history跳转</li>
      </ul>
    </div>
  );
};

export default Umi;
