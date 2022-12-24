import FollowingCard from './FollowingCard';
import style from './followList.module.scss';
import { useState, useEffect } from 'react';
import { useModal } from 'contexts/userContext';
import {
  getUserData,
  getFollowingUsers,
  followShip,
  unFollowShip,
} from '../../../api/usersApi';

const fakeUser = [
  {
    userId: 1,
    name: 'Elio',
    description: 'test',
    isFollowed: true,
  },
  {
    userId: 2,
    name: 'Peter',
    description: 'test',
    isFollowed: false,
  },
  {
    userId: 3,
    name: 'Jules',
    description: 'test',
    isFollowed: true,
  },
];

function FollowingList() {
  const [userData, setUserData] = useState(fakeUser);
  
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
      const currentUsers = userData.map((user) => {
        if (user.id === data.id) {
          return {
            ...user,
            isFollow: data.isFollow,
          };
        }
        return { ...user };
      });
      setUserData(currentUsers);
    };
    if (!isFollow) {
      followShipAsync();
    } else {
      unFollowShipAsync();
    }
  };

 const userId = ' '

  //UserData
  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await getUserData(userId);
        setUserData(userData);
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();
  }, [userId]);

  //followData
  useEffect(() => {
    const getFollowingUsers = async () => {
      try {
        const FollowingData = await getFollowingUsers(userId);
        getFollowingUsers(FollowingData);
      } catch (error) {
        console.error(error);
      }
    };
  
    getFollowingUsers(userId);
  }, [userId]);

  // //render將fakeData寫入state

  // useEffect(() => {
  //   let flag = true;
  //   if (flag) {
  //     const getFollowingUsersAsync = async () => {
  //       const data = await getFollowingUsers();
  //       setUserList(data);
  //     };
  //     getFollowingUsersAsync();
  //   }
  //   return () => {
  //     flag = false;
  //   };
  // }, []);

  //Cards
  const users = userList.map((user) => {
    return (
      <FollowingCard
        key={user.id}
        id={user.id}
        description={user.description}
        name={user.name}
        isFollow={user.isFollow}
        onClick={handleClick}
      />
    );
  });
  return (
    <section className={style.section}>
      <div className={style.header}>
        <h4 className={style.title}>追蹤者</h4>
      </div>
      {users}
    </section>
  );
}
export default FollowingList;
