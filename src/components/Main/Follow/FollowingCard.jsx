import style from './followList.module.scss'
import { avatar } from '../../../assets/images/index';

const FollowingCard = () => {
  return (
    <div className={style.followCard}>
      <div className={style.header}>
        <div className={style.avatar}>
          <img src={avatar} alt="avatar" />
        </div>
        <div className={style.cardInfo}>
          <p className={style.name}>Apple</p>
          <button className={`${style.followBtn} ${false && style.isFollowing}`}>{false ?'正在跟隨': '跟隨'}</button>
        </div>
      </div>
      <div className={style.body}>
        <p className={style.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas quisquam dignissimos eius nulla consectetur repellat officia iustoTenetuprovident iste earum?
        </p>
      </div>
    </div>
  )
}

export default FollowingCard