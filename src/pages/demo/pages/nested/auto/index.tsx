import React from 'react';
import styles from '../war/index.less';
const img1 = require('@/public/resources/img/auto_1.jpeg');
const Auto = () => {
  return (
    <div className={styles.warContainer}>
      <h4>引经据典 马自达“百年老字号”设计解读</h4>
      <div className={styles.content}>
        <p>
          网易汽车10月21日报道
          2020年注定不平凡，我又一次用了这句话！为什么这么说呢？因为马自达品牌也终于跨入了“百年老店”行列。百年虽久，亦在弹指一挥。在2020年，是马自达成立的第100年，同时马自达也成为第25个进驻“百年汽车品牌俱乐部”的品牌；由于疫情，我和马自达设计本部副部长：中山雅先生，再次网络一线牵，聊了很多有关于百年纪念款，以及未来设计的干货！
        </p>
        <img src={img1} />
      </div>
    </div>
  );
};

export default Auto;
