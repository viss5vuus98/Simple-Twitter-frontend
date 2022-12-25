import { FollowingList, FollowingTab, NavBar, PopularUserList } from 'components';
//style
import style from './midContent.module.scss'
//icon
import { arrow } from '../../assets/images/index';
//context
import { useModal } from 'contexts/userContext';
//Route
import { useNavigate,useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
//api
import { getUserFollowings } from '../../api/followApi'

const FollowingPage = () => {
  const [ userId, setUserId ] = useState()
  const [ followList, setFollowList ] = useState()
  const { currentUser, tweetData } = useModal();
  let navigate = useNavigate();
  //取得動態參數
  let { id } = useParams();
  //取得查看對象id
  useEffect(() => {
    const getUserFollowDataAsync = async () => {
      const data = await getUserFollowings();
      console.log(data)
      // try {
      //   // const data = await getUserInfo(id);
      //   // setUserData({ ...data });
      //   // const tweetData = await getUserTweets(data.id);
      //   // updateTweetData(tweetData);
      // } catch (error) {
      //   console.error(error);
      // }
    };
    getUserFollowDataAsync();
  }, [id]);

  return (
    <div className={style.container}>
      <NavBar isAdmin={false} className={style.sideBar} />
      <section>
        <div className={style.header}>
          <img className={style.arrow} src={arrow} alt="" />
          <div className={style.self}>
            <h5 className={style.userName}>{currentUser.name || ''}</h5>
            <p className={style.tweetCount}>{tweetData.length} 推文</p>
          </div>
        </div>
        <FollowingTab />
        <FollowingList />
      </section>
      <PopularUserList className={style.rightContent} />
    </div>
  );
}

export default FollowingPage