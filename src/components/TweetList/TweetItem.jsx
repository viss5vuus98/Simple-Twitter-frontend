//api
import moment from 'moment';
//style
import style from './TweetItem.module.scss';
//asset
import { like, unLike, vector, avatar } from '../../assets/images/index';
import { NavLink } from 'react-router-dom';

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
          <NavLink className={style.vectorSection} to={`reply/${props.id}`}>
            <img src={vector} alt="" className={style.vector} />
            <p>{props.replyAmount}</p>
          </NavLink>
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
