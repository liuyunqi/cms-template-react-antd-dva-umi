import React from 'react';
const img1 = require('@/public/resources/img/tech_1.jpeg');
const img2 = require('@/public/resources/img/tech_2.jpeg');
const img3 = require('@/public/resources/img/tech_3.jpeg');
import styles from '../war/index.less';
const Tech = () => {
  return (
    <div className={styles.warContainer}>
      <h4>iPhone 12到底有多蓝？摸了真机的人告诉你</h4>
      <div className={styles.content}>
        <p>
          其实可以预见iPhone12的蓝色版本会很热门，因为这是此次的全新配色，一直以来每当有新iPhone发布，新配色总是比较受欢迎。但没想到的是，蓝色iPhone12居然会成为一个热梗上了热搜，各种蓝色物品此时都可以来蹭一波iPhone12的热度。
        </p>
        <img src={img1} />
        <p>
          据说许多早早抢到了名额预定了蓝色iPhone12的小伙伴们开心了才一天，就陷入了忐忑之中：怎么办？真的这么蓝么？要不要退货？
        </p>
        <img src={img2} />
        <p>最近最热门的就是这款蓝色iPhone12</p>
        <p>
          为了让这些小伙伴们安心，我们提前去摸了一下真机。iPhone12究竟蓝不蓝，到底有多蓝，是不是太蓝了，经过我们的多方位多角度的观察、测试和拍照，相信可以给大家一个比较客观的答案。（下面所有照片均为相机直出，没有经过后期处理）
        </p>
        <img src={img3} />
      </div>
    </div>
  );
};

export default Tech;
