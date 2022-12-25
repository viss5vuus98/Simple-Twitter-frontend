import { FollowingList, FollowingTab, NavBar, PopularUserList } from 'components';
//style
import style from './midContent.module.scss'
//icon
import { arrow } from '../../assets/images/index';
//Route
import { useNavigate,useParams } from "react-router-dom";
//Context
import { useModal } from "contexts/userContext";
import { useState, useEffect } from 'react';
//Api
import { getUsersFollowing } from '../../api/followApi'

const FollowingPage = () => {
  const [followData, setFollowData ] = useState([])
  const {  currentUser, tweetData } = useModal()
  //取得動態參數
  let { id } = useParams();
  //取得個人ID
  useEffect(() => {
    const getUserDataAsync = async () => {
      try {
        const data = await getUsersFollowing(id);
        setFollowData(data);
      } catch (error) {
        console.error(error)
      }
    }
    getUserDataAsync()
  }, [id]);

  return (
    <div className={style.container}>
      <NavBar isAdmin={false} className={style.sideBar} />
      <section className={style.mainSection}>
        <div className={style.header}>
          <img className={style.arrow} src={arrow} alt="" />
          <div className={style.self}>
            <h5 className={style.userName}>{currentUser.name}</h5>
            <p className={style.tweetCount}>{tweetData.length} 推文</p>
          </div>
        </div>
        <FollowingTab />
        <FollowingList followData={followData} />
      </section>
      <PopularUserList className={style.rightContent} />
    </div>
  );
}

export default FollowingPage