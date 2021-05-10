import React from 'react';
import styles from '../war/index.less';
const img1 = require('@/public/resources/img/ent_1.jpeg');
const Auto = () => {
  return (
    <div className={styles.warContainer}>
      <h4>倪虹洁曝《武林外传》演员重聚难：差距越来越大</h4>
      <div className={styles.content}>
        <img src={img1} />
        <p>
          网易娱乐10月22日报道
          近日，倪虹洁在接受采访时聊到《武林外传》演员重聚的话题，她表示：“我原以为大家会和原来一样，可他们都变得很忙，差距越来越大”。
        </p>
        <p>
          被问具体的差距是什么，倪虹洁斟酌后回答：“原来特别亲的一家人变得有些疏远，在一些小事上，互相的公司可能也会有一些争抢。看着他们计较，我心里挺不好受，会觉得世事非常现实，时间流逝得挺快，很多感情会变淡。”
        </p>
        <p>
          据悉，《武林外传》是一部章回体古装情景喜剧。围绕着一个在虚拟的明代小镇“七侠镇”中“同福客栈”里的女掌柜佟湘玉和她的几个伙计展开。
          该剧在中国中央电视台电视剧频道于2006年1月2日首播，央视的最高收视率是9.49%，平均收视率是6.40%，是2006年中国大陆收视率最高的电视剧之一。之后各地方台曾多次重播，亦有良好收视。
        </p>
        <p></p>
      </div>
    </div>
  );
};

export default Auto;
