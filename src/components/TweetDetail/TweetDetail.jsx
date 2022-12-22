import style from './tweetDetail.module.scss';
import { like, vector } from '../../assets/images/index';
import { Link } from 'react-router-dom';
import { useModal } from 'contexts/userContext';

const TweetDetail = ({tweetData, onChangeLike}) => {
  const { handleModalState } = useModal()
  return (
    <div className={style.tweet_container}>
      <div className={style.tweet_header}>
        <div className={style.avatar}>
          <img src={tweetData.User.avatar} alt="" />
        </div>
        <div>
          <p className={style.userName}>{tweetData.User.name}</p>
          <Link to={`/self/${tweetData.User.id}`}>
            <p className={style.userAcc}>@{tweetData.User.account}</p>
          </Link>
        </div>
      </div>
      <p className={style.tweet_body}>
        {tweetData.description}
      </p>
      <p className={style.time}>{tweetData.createdAt}</p>
      <div className={style.tweet_footer}>
        <p>
          {tweetData.replyAmount} <span>回覆</span>
        </p>
        <p>
          {tweetData.likeAmount} <span>喜歡次數</span>
        </p>
      </div>
      <div className={style.tweet_control}>
          <img src={vector} alt="" className={style.icon} onClick={() => { handleModalState('replyModal')}}/>
          <img src={like} 
          alt="" className={style.icon} 
          onClick={() => {onChangeLike?.(tweetData.id, )}}/>
      </div>
    </div>
  );
};

export default TweetDetail;
