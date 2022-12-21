import style from './popularCard.module.scss'
import { Link } from 'react-router-dom';
import { userAvatar } from 'assets/images';

const PopularCard = (props) => {
  return (
    <div className={style.card}>
      <div className={style.avatar}>
        <Link className={style.link} to={`/user/${props.id}`}>
          <img src={userAvatar} alt="" />
        </Link>
      </div>
      <div className={style.body}>
        <p className={style.name}>
          {props.name ? props.name : 'NoOne'}
        </p>
        <p className={style.account}>
          {props.account ? `@${props.account}` : '@noOne'}
        </p>
      </div>
      <div className={style.followControl} onClick={() => {props.onClick?.(props.id)}}>
          <button className={`${style.followBtn} ${props.isFollowed && style.isFollowing}`}>{props.isFollowed ?'正在跟隨': '跟隨'}</button>       
      </div>
    </div>
  )
}

export default PopularCard;