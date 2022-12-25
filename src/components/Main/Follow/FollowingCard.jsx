import style from './followList.module.scss';
import { Link } from 'react-router-dom';

const FollowingCard = (props) => {
  const { id, avatar, introduction, isFollowed, name, onClick } = props;
  return (
    <div className={style.followCard}>
      <div className={style.header}>
        <Link to={`/follow/${id}`}>
          <div className={style.avatar}>
            <img src={avatar} alt="avatar" />
          </div>
        </Link>
        <div className={style.cardInfo}>
          <p className={style.name}>{name}</p>
          <button
            className={`${style.followBtn} ${isFollowed && style.isFollowing}`}
            onClick={() => { onClick?.(id, isFollowed);}}
          >
            {isFollowed ? '正在跟隨' : '跟隨'}
          </button>
        </div>
      </div>
      <div className={style.body}>
        <p className={style.description}>{introduction}</p>
      </div>
    </div>
  );
};
export default FollowingCard;
