import style from './followList.module.scss'
//import { avatar } from '../../../assets/images/index';
import { Link } from 'react-router-dom';



function FollowingCard (props) {
const {
  avatar,
  userName,
  description,
  isFollowing,
  userId,
  setSelfFollower, 
  setSelfFollowing, 
} = props;

  return (
    <div className={style.followCard}>
      <div className={style.header}>
        <div className={style.avatar}>
          <Link to={`/user/${userId}`}>
            <img src={avatar} alt="avatar" />
          </Link>
        </div>
        <div className={style.cardInfo}>
          <p className={style.name}>{userName}</p>
          <button
            isFollow={isFollowing}
            className={`${style.followBtn} ${false && style.isFollowing}`}
            userID={userId}
            setSelfFollower={setSelfFollower}
            setSelfFollowing={setSelfFollowing}
          >
            {false ? '正在跟隨' : '跟隨'}
          </button>
        </div>
      </div>
      <div className={style.body}>
        <p className={style.description}>{description}</p>
      </div>
    </div>
  );
}

export default FollowingCard




// const FollowingCard = () => {
//   return (
//     <div className={style.followCard}>
//       <div className={style.header}>
//         <div className={style.avatar}>
//           <img src={avatar} alt="avatar" />
//         </div>
//         <div className={style.cardInfo}>
//           <p className={style.name}>Amy</p>
//           <button className={`${style.followBtn} ${false && style.isFollowing}`}>{false ?'正在跟隨': '跟隨'}</button>
//         </div>
//       </div>
//       <div className={style.body}>
//         <p className={style.description}>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas quisquam dignissimos eius nulla consectetur repellat officia iustoTenetuprovident iste earum?
//         </p>
//       </div>
//     </div>
//   )
// }

// export default FollowingCard