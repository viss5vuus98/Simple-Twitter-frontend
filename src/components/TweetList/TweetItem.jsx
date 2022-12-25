//style
import style from './TweetItem.module.scss';
//asset
import { like, unLike, vector } from '../../assets/images/index';
import { Link } from 'react-router-dom';

const TweetItem = ({ tweetData, onChangeLike}) => {
  return (
    <div className={style.tweetItem}>
      <div className={style.avatar}>
        <Link
          className={style.vectorSection}
          to={`${tweetData.User.route || ''}`}
        >
          <img src={tweetData.User.avatar} alt="" />
        </Link>
      </div>
      <div className={style.tweetBody}>
        <div className={style.tweetTitle}>
          <Link className={style.link} to={`${tweetData.User.route || ''}`}>
            <p>{tweetData.User.name}</p>
          </Link>
          <span>
            @{tweetData.User.account}{' '}
            。{tweetData.createdAt}
          </span>
        </div>
        <Link className={style.description} to={`/reply/${tweetData.id}`}>
          <p className={style.tweetText}>{tweetData.description}</p>
        </Link>
        <div className={style.tweetControl}>
          <Link className={style.vectorSection} to={`/reply/${tweetData.id}`}>
            <img src={vector} alt="" className={style.vector} />
            <p>{tweetData.replyAmount}</p>
          </Link>
          <button
            className={style.likeSection}
            onClick={() => {
              onChangeLike(tweetData.id, tweetData.isLike);
            }}
          >
            {tweetData.isLike ? (
              <img src={like} alt="" className={style.like} />
            ) : (
              <img src={unLike} alt="" className={style.like} />
            )}
            <p>{tweetData.likedAmount}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TweetItem;
