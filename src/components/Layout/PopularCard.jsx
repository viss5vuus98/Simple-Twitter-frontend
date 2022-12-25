import style from './popularCard.module.scss'
import { Link } from 'react-router-dom';
import { userAvatar } from 'assets/images';

const PopularCard = (props) => {
  return (
    <div className={style.card}>
      <div className={style.avatar}>
        <Link className={style.link} to={`/user/${props.id}`}>
          <img src={props.avatar} alt="" />
        </Link>
      </div>
      <div className={style.body}>
        <p className={style.name}>{props.name ? props.name : 'NoOne'}</p>
        <p className={style.account}>
          {props.account ? `@${props.account}` : '@noOne'}
        </p>
      </div>
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
  );
}

export default PopularCard;