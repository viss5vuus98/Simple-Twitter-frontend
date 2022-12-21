import style from './adminUser.module.scss'

import {
  postIcon,
  likeCount,
} from '../../assets/images/index';
import { useState, useEffect } from 'react';
import { getAdminUser } from '../../api/adminUser';



function AdminUserCard(props) {
  const {
    background,
    avatar,
    account,
    name,
    tweetAmount,
    likedAmount,
    followingAmount,
    followerAmount,
  } = props;

  return (
    <div className={style.card}>
      <div className={style.header}>
        <img src={background} alt="" />
      </div>
      <div className={style.body}>
        <div className={style.title}>
          <p className={style.name}>{name}</p>
          <p className={style.account}>{account}</p>
        </div>
        <div className={style.userInfo}>
          <div className={style.content}>
            <img className={style.icon} src={postIcon} alt="" />
            <span>{tweetAmount}</span>
          </div>
          <div className={style.content}>
            <img className={style.icon} src={likeCount} alt="" />
            <span>{likedAmount}</span>
          </div>
        </div>
        <div className={style.follow}>
          <div>
            <span>{followingAmount}</span>
            <span className={style.link}>跟隨中</span>
          </div>
          <div>
            <span>{followerAmount}</span>
            <span className={style.link}>追隨者</span>
          </div>
        </div>
      </div>
      <div className={style.avatar}>
        <img src={avatar} alt="" />
      </div>
    </div>
  );
};

function AdminUserPage() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const getAllUsersAsync = async () => {
      try {
        const data = await getAdminUser();
        setUserList(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsersAsync();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.title}>使用者列表</div>
      <div className={style.userList}>
        {userList.map((user) => (
          <AdminUserCard
            id={user.id}
            role={user.role}
            background={user.background}
            avatar={user.avatar}
            account={user.account}
            name={user.name}
            tweetAmount={user.tweetAmount}
            likedAmount={user.likeAmount}
            followingAmount={user.followingAmount}
            followerAmount={user.followerAmount}
          />
        ))}
      </div>
    </div>
  );
}

export default AdminUserPage;


// const AdminUserCard = () => {
//     return (
//       <div className={style.card}>
//         <div className={style.header}>
//           <img src={userBanner} alt="" />
//         </div>
//         <div className={style.body}>
//           <div className={style.title}>
//             <p className={style.name}>John Don</p>
//             <p className={style.account}>@hijohn</p>
//           </div>
//           <div className={style.userInfo}>
//             <div className={style.content}>
//               <img className={style.icon} src={postIcon} alt="" />
//               <span>1.5K</span>
//             </div>
//             <div className={style.content}>
//               <img className={style.icon} src={likeCount} alt="" />
//               <span>20K</span>
//             </div>
//           </div>
//           <div className={style.follow}>
//             <div>
//               <span>34  個</span>
//               <span className={style.link}>跟隨中</span>
//             </div>
//             <div>
//               <span>39  個</span>
//               <span className={style.link}>追隨者</span>
//             </div>
//           </div>
//         </div>
//         <div className={style.avatar}>
//           <img src={avatar} alt="" />
//         </div>        
//       </div>
//     )
// }

//export default AdminUserCard;