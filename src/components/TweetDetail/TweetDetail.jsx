import style from './tweetDetail.module.scss';
import { like, vector } from '../../assets/images/index';

const TweetDetail = (props) => {
  return (
    <div className={style.tweet_container}>
      <div className={style.tweet_header}>
        <div className={style.avatar}>
          <img src={props.tweetData} alt="" />
        </div>
        <div>
          <p className={style.userName}>Apple</p>
          <p className={style.userAcc}>@apple</p>
        </div>
      </div>
      <p className={style.tweet_body}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem earum
        asperiores qui libero. Officia culpa voluptatibus perferendis.
      </p>
      <p className={style.time}>上午 10:05。2022年11月10號</p>
      <div className={style.tweet_footer}>
        <p>
          34 <span>回覆</span>
        </p>
        <p>
          808 <span>喜歡次數</span>
        </p>
      </div>
      <div className={style.tweet_control}>
          <img src={vector} alt="" className={style.icon} />
          <img src={like} alt="" className={style.icon} />
      </div>
    </div>
  );
};

export default TweetDetail;
