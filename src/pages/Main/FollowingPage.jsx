import { FollowingList, FollowingTab } from 'components';
//style
import style from './midContent.module.scss'
//icon
import { arrow } from '../../assets/images/index';
import { getFollowingUsers } from '../../api/apis';
import { useEffect, useState } from 'react';
import { useModal } from 'contexts/userContext';


function FollowingPage() {

const [followingList,setFollowingList] = useState({
        id: 4,
        name: "user3",
        avatar: null,
        introduction: null,
        followingId: 4,
        isFollowed: false
    })

const { userData } = useModal();

  useEffect(() => {
    const getAllFollowingAsync = async () => {
      try {
        const data = await getFollowingUsers(userData.id);
        setFollowingList(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllFollowingAsync();
  }, [userData.id, setFollowingList]);
  


  return (
    <>
      <div className={style.header}>
        <img className={style.arrow} src={arrow} alt="" />
        <div className={style.self}>
          <h5 className={style.userName}>John Doe</h5>
          <p className={style.tweetCount}>25 推文</p>
        </div>
      </div>
      <FollowingTab />
      <FollowingList
        followingData={followingList}
        setFollowing={setFollowingList}
      />
    </>
  );
}

export default FollowingPage