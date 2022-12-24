import style from './followList.module.scss';
import { Link } from 'react-router-dom';
import { userAvatar } from 'assets/images';


function FollowingCard(props) {



  return (
    <div className={style.followCard}>
      <div className={style.header}>
        <div className={style.avatar}>
          <Link className={style.link} to={`/user/${props.id}`}>
            <img src={userAvatar} alt="" />
          </Link>
        </div>
        <div className={style.cardInfo}>
          <p className={style.name}>{props.name ? props.name : 'NoOne'}</p>
          <div
            className={style.followControl}
            onClick={() => {
              props.onClick?.(props.id, props.isFollow);
            }}
          >
            <button
              className={`${style.followBtn} ${
                props.isFollow && style.isFollowing
              }`}
            >
              {props.isFollow ? '正在跟隨' : '跟隨'}
            </button>
          </div>
        </div>
      </div>
      <div className={style.body}>
        <p className={style.description}>
          {props.description ? `${props.description}` : '@noOne'}
        </p>
      </div>
    </div>
  );
}

export default FollowingCard;
