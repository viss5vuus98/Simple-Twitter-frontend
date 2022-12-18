//api
import moment from 'moment';
//style
import style from './TweetItem.module.scss';
//asset
import { like, unLike, vector, avatar } from '../../assets/images/index';

const TweetItem = (props) => {
  return (
    <div className={style.tweetItem}>
      <div className={style.avatar}>
        <img src={avatar} alt="" />
      </div>
      <div className={style.tweetBody}>
        <div className={style.tweetTitle}>
          <p>{props.User.name}</p>
          <span>
            @{props.User.userAccount} {' '}
            {moment(props.createdAt).startOf('day').fromNow()}
          </span>
        </div>
        <p className={style.tweetText}>{props.description}</p>
        <div className={style.tweetControl}>
          <button className={style.vectorSection}>
            <img src={vector} alt="" className={style.vector} />
            <p>{props.replyAmount}</p>
          </button>
          <button
            className={style.likeSection}
            onClick={() => {
              props.onChangeLike(props.id);
            }}
          >
            {props.isLike ? (
              <img src={like} alt="" className={style.like} />
            ) : (
              <img src={unLike} alt="" className={style.like} />
            )}
            <p>{props.likedAmount}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TweetItem;
