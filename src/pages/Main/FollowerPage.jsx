import { FollowingList, FollowingTab } from 'components';
//style
import style from './midContent.module.scss';
//icon
import { arrow } from '../../assets/images/index';
import { getFollowerUsers } from '../../api/apis';
import { useEffect, useState } from 'react';
import { useModal } from 'contexts/userContext';

function FollowerPage() {
  const [followerList, setFollowerList] = useState({
    id: 4,
    name: 'user3',
    avatar: null,
    introduction: null,
    followerId: 4,
    isFollow: true,
  });

  const { userData } = useModal();

  useEffect(() => {
    const getAllFollowerAsync = async () => {
      try {
        const data = await getFollowerUsers(userData.id);
        setFollowerList(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllFollowerAsync();
  }, [userData.id, setFollowerList]);

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
        followerData={followerList}
        setFollower={setFollowerList}
      />
    </>
  );
}

export default FollowerPage;
