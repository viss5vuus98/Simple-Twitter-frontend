import {
  UserInfo,
  UserTab,
  TweetList,
  ReplyList,
  NavBar,
  PopularUserList,
} from 'components';
import style from './midContent.module.scss';
import { useState, useEffect } from 'react';
//API
import {
  getUserReplies,
  getUserLike,
  getUserTweets,
  getUserInfo,
  followShip,
  unFollowShip,
} from '../../api/usersApi';
//icon
import { arrow } from '../../assets/images/index';
//Route
import { useNavigate, useParams } from 'react-router-dom';
//Context
import { useModal } from 'contexts/userContext';
import Swal from 'sweetalert2';

const UserMainPage = () => {
  const [activeTab, setActiveTab] = useState('tweetList');
  const [userData, setUserData] = useState({});
  const [replyList, setReplyList] = useState([]);
  const {
    currentUser,
    updateTweetData,
    tweetData,
    recommendUsers,
    setRecommendUsers,
  } = useModal();
  let navigate = useNavigate();
  //取得動態參數
  let { id } = useParams();

  const handleGetUserReply = (value) => {
    setActiveTab(value);
    const getUserReplyAsync = async () => {
      try {
        const data = await getUserReplies(userData.id);
        setReplyList(data);
      } catch (error) {
        console.error(error);
      }
    };
    getUserReplyAsync();
  };

  //取得使用者喜愛貼文
  const handleGetUserLike = (value) => {
    setActiveTab(value);
    const getUserLikeAsync = async () => {
      try {
        const data = await getUserLike(userData.id);
        updateTweetData(data);
      } catch (error) {
        console.error(error);
      }
    };
    getUserLikeAsync();
  };

  //取得使用者的推文
  const handleGetUserTweets = (value) => {
    setActiveTab(value);
    const getUserTweetsAsync = async () => {
      try {
        const data = await getUserTweets(userData.id);
        updateTweetData(data);
      } catch (error) {
        console.error(error);
      }
    };
    getUserTweetsAsync();
  };

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
      const value = data.isFollow ? 1 : -1;
      const updateUserData = {
        ...userData,
        isFollow: data.isFollow,
        followerAmount: userData.followerAmount + value,
      };
      setUserData(updateUserData);
      const recommendData = recommendUsers.map((user) => {
        if (user.id === data.id) {
          return {
            ...user,
            isFollow: data.isFollow,
          };
        }
        return user;
      });
      setRecommendUsers(recommendData);
    };
    if (!isFollow) {
      followShipAsync();
    } else {
      unFollowShipAsync();
    }
  };

  //先取得使用者推文資料
  //取得個人資料
  useEffect(() => {
    const getUserDataAsync = async () => {
      if (!id) {
        setUserData(currentUser);
        if (!currentUser.id) {
          Swal.fire({
            position: 'top',
            title: '無使用者資料，請重新登入',
            timer: 1000,
            icon: 'error',
            showConfirmButton: false,
          });
          navigate('/login');
          return;
        }
        const tweetData = await getUserTweets(currentUser.id);
        updateTweetData(tweetData);
        return;
      }
      try {
        const data = await getUserInfo(id);
        setUserData({ ...data });
        const tweetData = await getUserTweets(data.id);
        updateTweetData(tweetData);
      } catch (error) {
        console.error(error);
      }
    };
    getUserDataAsync();
  }, [id, currentUser]);
  return (
    <div className={style.container}>
      <NavBar isAdmin={false} className={style.sideBar} />
      <section className={style.mainSection}>
        <div
          className={style.header}
          onClick={() => {
            navigate(-1);
          }}
        >
          <img className={style.arrow} src={arrow} alt="" />
          <div className={style.self}>
            <h5 className={style.userName}>{currentUser.name}</h5>
            <p className={style.tweetCount}>{tweetData.length} 推文</p>
          </div>
        </div>
        <UserInfo userData={userData} onFollow={handleClick} />
        <UserTab
          replyAction={handleGetUserReply}
          likeAction={handleGetUserLike}
          tweetAction={handleGetUserTweets}
          tabName={activeTab}
        />
        {!(activeTab === 'replyList') && (
          <TweetList tweetData={tweetData} setTweetData={updateTweetData} />
        )}
        {activeTab === 'replyList' && <ReplyList replyData={replyList} />}
      </section>
      <PopularUserList className={style.rightContent} />
    </div>
  );
};

export default UserMainPage;
