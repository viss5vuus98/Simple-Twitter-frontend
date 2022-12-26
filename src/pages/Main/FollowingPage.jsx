import {
  FollowingList,
  FollowingTab,
  NavBar,
  PopularUserList,
} from 'components';
//style
import style from './midContent.module.scss';
//icon
import { arrow } from '../../assets/images/index';
//Route
import { useNavigate, useParams } from 'react-router-dom';
//Context
import { useModal } from 'contexts/userContext';
import { useState, useEffect } from 'react';
//Api
import { getUsersFollowing, getUsersFollowers } from '../../api/followApi';
import { followShip, unFollowShip } from '../../api/usersApi';
import Swal from 'sweetalert2';

const FollowingPage = () => {
  const [followData, setFollowData] = useState([]);
  const [tabState, setTabState] = useState('Followers');
  const { currentUser, tweetData } = useModal();
  const navigate = useNavigate();
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
        Swal.fire({
          position: 'top',
          title: '無使用者資料，請重新登入',
          timer: 1000,
          icon: 'error',
          showConfirmButton: false,
        });
        navigate('login');
      }
    };
    getDataAsync();
  }, [id]);
  //管理上一頁

  //追蹤按鈕事件處理
  const handleClick = (userId, isFollow) => {
    const followShipAsync = async () => {
      const data = await followShip(userId);
      if (!data) {
        return;
      }
      setData(data);
    };
    const unFollowShipAsync = async () => {
      const data = await unFollowShip(userId);
      if (!data) {
        return;
      }
      setData(data);
    };
    const setData = (data) => {
      const currentUsers = followData.map((item) => {
        if (item.id === data.id) {
          return {
            ...item,
            isFollow: data.isFollow,
          };
        }
        return item;
      });
      setFollowData(currentUsers);
    };
    if (!isFollow) {
      followShipAsync();
    } else {
      unFollowShipAsync();
    }
  };

  const handleGetFollowers = () => {
    setTabState('Followers');
    const getDataAsync = async () => {
      try {
        const data = await getUsersFollowers(id);
        setFollowData(data);
      } catch (error) {
        console.error(error);
        Swal.fire({
          position: 'top',
          title: '無使用者資料，請重新登入',
          timer: 1000,
          icon: 'error',
          showConfirmButton: false,
        });
        navigate('login');
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
        Swal.fire({
          position: 'top',
          title: '無使用者資料，請重新登入',
          timer: 1000,
          icon: 'error',
          showConfirmButton: false,
        });
        navigate('login');
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
            <h5 className={style.userName}>{currentUser.name || ''}</h5>
            <p className={style.tweetCount}>
              {!tweetData ? tweetData.length : 0} 推文
            </p>
          </div>
        </div>
        <FollowingTab
          getFollowings={handleGetFollowings}
          grtFollowers={handleGetFollowers}
          tabState={tabState}
        />
        <FollowingList followData={followData} onClick={handleClick} />
      </section>
      <PopularUserList className={style.rightContent} />
    </div>
  );
};

export default FollowingPage;
