import React from 'react';
import styles from './index.less';
const img1 = require('@/public/resources/img/dva_1.png');
const Dva = () => {
  return (
    <div className={styles.dvaContainer}>
      <div>
        <a href="https://dvajs.com/" target="_blank">
          dva
        </a>{' '}
        首先是一个基于 redux 和 redux-saga 的数据流方案
      </div>
      <ul>
        <li>是本地状态数据管理的解决方案</li>
        <li>
          学习成本低，简单轻快，只有6个api,对 redux
          用户尤其友好,配合umi使用后进一步减少api。
        </li>
        <li>有loading全局插件，不需要重复唤起与隐藏过渡等待动画。</li>
      </ul>
      <br />
      <br />
      <div>
        <div>数据流解析图</div>
        <img src={img1} />
        <br />
        <div className={styles.list}>
          <p>State</p>
          <div>state表示store的数据状态，作为只读的数据展示，不能直接赋值</div>
          <div>state通常是一个对象，也可以是任意值</div>
        </div>
        <div className={styles.list}>
          <p>Action</p>
          <div>action是一个对象，是作为改变state的唯一途径</div>
          <div>
            action对象必须带有type属性，type是表示其发起事件的明确行为，可以增加其他业务属性
          </div>
          <div>发起action必须使用dispatch函数</div>
        </div>
        <div className={styles.list}>
          <p>Dispatch</p>
          <div>dispatch是用于触发action函数的方法</div>
          <div>发起同步action调用reducer</div>
          <div>发起异步action调用effect</div>
        </div>
        <div className={styles.list}>
          <p>Reducer</p>
          <div>
            Reducer（也称为 reducing
            function）函数接受两个参数：之前已经累积运算的结果和当前要被累积的值，返回的是一个新的累积结果。该函数把一个集合归并成一个单值。
          </div>
          <div>reducer返回新的state</div>
          <div>
            reducer
            必须是纯函数且不允许产生副作用，同样的输入一定得到童谣的结果。
          </div>
        </div>
        <div className={styles.list}>
          <p>Effect</p>
          <div>
            effect 就是reducer里面说的副作用的一部分，一般代指异步请求。
          </div>
          <div>本框架中effect使用的是generator语法概念</div>
        </div>
        <div className={styles.list}>
          <p>Subscription</p>
          <div>用作监听数据，然后进行某个操作</div>
          <div>监听的对象可以是时间、地址、键盘事件等等</div>
        </div>
      </div>
    </div>
  );
};

export default Dva;
