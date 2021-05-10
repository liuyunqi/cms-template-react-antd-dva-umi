import React from 'react';
import styles from '../war/index.less';
const img1 = require('@/public/resources/img/travel_1.jpeg');
const Auto = () => {
  return (
    <div className={styles.warContainer}>
      <h4>比利时人 从小就做漫画作业</h4>
      <div className={styles.content}>
        <p>
          创造了丁丁、蓝精灵等不胜枚举的世界级动画形象的比利时是世界上漫画家占人口比例最高的国家。在这里，画漫画不仅是孩子们的特权，任何年龄段的人都可以用漫画来记录生活，抒发对人生的各种思考和感悟。
        </p>
        <img src={img1} />
        <p>
          布鲁塞尔街头建筑涂鸦，再现比利时国宝漫画《丁丁历险记》的经典场景。
        </p>
        <p>
          比利时漫画博物馆原馆长让·阿奎尔用很有漫画感的语言为漫画的起源做了解读：“很久很久以前，有一位目不识丁的男子，不认字也不会写字，而当时连‘认字’和‘写字’这两个词都还不存在，更别说其他的文字。为了表达自己，描述以及表达对偶像的崇敬，他发明了图画。”
        </p>
        <p>
          在比利时不论三岁幼童，还是十七八岁的高中生，经常有漫画形式的作业，比如，科学课作业
          “我眼中的火星”；音乐课作业
          “欣赏捷克音乐家斯美塔那的《沃尔塔瓦河》并谈谈作曲家创作时的心情。”这些作业并没有标准答案，甚至不会有优劣之分。老师认为，每个人对每件事都会有自己独特的漫画解读，只要用心去画，每一幅作品都是独特的，每一幅作品都是优秀的。我曾经采访过一位带学生在博物馆写生的老师，我问她，用图画形式和文字形式表达有什么不同？她告诉我，文字是一种抽象的表达方式，把场景转化成文字会失去很多有血有肉的生动细节，而图画则能生动地重现场景，更有意义的是，在画图过程中，可以加入作者很多思考，更能发挥作者的想象力和创意。批改图画作业对老师而言也更有乐趣。
        </p>
        <p>
          从小养成用漫画形式记录身边事、抒发情感，也让比利时人很喜欢用漫画记录新闻，每天出版的各大报纸，都会有不少漫画的元素，比如说在要闻版每天都会有类似时评性质的新闻漫画。漫画也是集体记忆的一个完美表达方式，新冠肺炎疫情让社会各方面都发生巨大改变，比利时漫画家近期也出版了很多有关疫情的漫画著作，比如感恩医护人员、艺术家的隔离生活等等。
        </p>
        <p>
          在比利时，漫画书是最受欢迎的一种书籍，不论是在大型超市还是在传统书店，色彩鲜艳的漫画书总是摆放在最显眼的位置。在这里，漫画的分类也系统而全面：青春漫画
          ——在12岁和14岁之间，男孩女孩们离开孩童世界，开始意识到自己的性别特征，并有了爱的萌芽。他们所关心的事情随之发生变化，喜欢阅读一些有甜甜故事情节的漫画。全年龄段漫画——描写日常生活、读者群更广泛的漫画越来越受到关注。正是本着这种传统，比利时出版了针对“7岁到77岁”群体的漫画，比如，家庭连环画——这种历史悠久的漫画风格由克里斯托弗在他1889年出版的《芬努亚德一家(La
          Famille
          Fenouillard)》首创，这部合家欢式的漫画讲述了一个家庭中一群人的故事。这种漫画的主角往往是一对夫妻和他们的孩子，但也有可能是破裂的家庭。这种风格接近笑话故事、短故事和长篇搞笑奇遇。
        </p>
        <p>
          历史漫画——内容介于严格的历史史实叙述和确凿事实小说化的情节之间。历史漫画覆盖面广，种类丰富，几乎所有的时代都被涉及过，尤其偏爱古罗马时期、中世纪和拿破仑战争时期的故事。
        </p>
        <p>
          科幻漫画——遥远宇宙的广阔空间、来自远方的其他生物、时间的断层、架空历史和幻想。漫画作者常常使用漫画作为媒介将当今的社会问题移植到一个想象的国度中去。
        </p>
        <p>
          动物漫画——从伊索寓言开始，动物文学就是一种使用拟人化的动物来表达人类情感的文学体式。这种风格在漫画界颇受欢迎，可以用来表现战争，也可以描写愉快的主题，让最现实主义的小说与最荒诞的幽默产生碰撞。
        </p>
        <p>
          教学漫画
          ——漫画是传授知识的现代而有活力的媒体。新闻漫画——新闻漫画家其实是专栏作者，他会用类似镜头的图像叙述与评论时事。
        </p>
      </div>
    </div>
  );
};

export default Auto;
