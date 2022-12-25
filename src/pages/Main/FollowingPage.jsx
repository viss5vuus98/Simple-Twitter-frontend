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
import { getUsersFollowing, getUsersFollowers } from '../../api/followApi';

const FollowingPage = () => {
  const [followData, setFollowData] = useState([]);
  const [tabState, setTabState] = useState('Followers');
  const { currentUser, tweetData } = useModal();
  //取得動態參數
  let { id } = useParams();
  //取得個人ID
  useEffect(() => {
    const getDataAsync = async () => {
      try {
        const data = await getUsersFollowers(id);
        setFollowData(data);
      } catch (error) {
        console.error(error);
      }
    };
    getDataAsync();
  }, [id]);
  //管理上一頁
  const navigate = useNavigate();

  const handleGetFollowers = () => {
    setTabState('Followers');
    const getDataAsync = async () => {
      try {
        const data = await getUsersFollowers(id);
        setFollowData(data);
      } catch (error) {
        console.error(error);
      }
    };
    getDataAsync();
  };

  const handleGetFollowings = () => {
    setTabState('Followings');
    const getDataAsync = async () => {
      try {
        const data = await getUsersFollowing(id);
        setFollowData(data);
      } catch (error) {
        console.error(error);
      }
    };
    getDataAsync();
  };

  return (
    <div className={style.container}>
      <NavBar isAdmin={false} className={style.sideBar} />
      <section className={style.mainSection}>
        <div className={style.header}>
          <img
            className={style.arrow}
            src={arrow}
            alt=""
            onClick={() => {
              navigate(-1);
            }}
          />
          <div className={style.self}>
            <h5 className={style.userName}>{currentUser.name}</h5>
            <p className={style.tweetCount}>{tweetData.length} 推文</p>
          </div>
        </div>
        <FollowingTab
          getFollowings={handleGetFollowings}
          grtFollowers={handleGetFollowers}
          tabState={tabState}
        />
        <FollowingList followData={followData} />
      </section>
      <PopularUserList className={style.rightContent} />
    </div>
  );
}

export default FollowingPage