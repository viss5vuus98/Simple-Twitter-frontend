import { FollowingList, FollowingTab } from 'components';
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
  const [followData, setFollowData ] = useState()
  const {  currentUser, tweetData } = useModal()
  //取得動態參數
  let { id } = useParams();
  //取得個人ID
  useEffect(() => {
    const getUserDataAsync = async () => {
      try {
        const data = await getUsersFollowing(id);
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    }
    getUserDataAsync()
  }, [id]);

  return (
    <>
      <div className={style.header}>
        <img className={style.arrow} src={arrow} alt="" />
        <div className={style.self}>
          <h5 className={style.userName}>Joho Doe</h5>
          <p className={style.tweetCount}>25 推文</p>
        </div>
      </div>
      <FollowingTab />
      <FollowingList />
    </>
  );
}

export default FollowingPage