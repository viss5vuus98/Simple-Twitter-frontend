import style from './popularList.module.scss';
import PopularCard from './PopularCard';
import { useState, useEffect } from 'react';
import {
  getRecommendUsers,
  followShip,
  unFollowShip,
} from '../../api/usersApi';
import { useModal } from 'contexts/userContext';

function PopularUserList() {
  const [userList, setUserList] = useState([]);
  const { recommendUsers, setRecommendUsers } = useModal()
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
      const currentUsers = recommendUsers.map((user) => {
        if (user.id === data.id) {
          return {
            ...user,
            isFollow: data.isFollow,
          };
        }
        return { ...user };
      });
      setRecommendUsers(currentUsers);
    };
    if (!isFollow) {
      followShipAsync();
    } else {
      unFollowShipAsync();
    }
  };

  //render將Data寫入
  useEffect(() => {
    const getRecommendUsersAsync = async () => {
      const data = await getRecommendUsers();
      if(typeof(data) !== 'undefined'){
        const useData = data.filter((_user) => _user.role !== 'admin');
        setRecommendUsers(useData);
      }
    };
    getRecommendUsersAsync();
  }, []);

  //Cards
  const users = recommendUsers.map((user) => {
    return (
      <PopularCard
        key={user.id}
        id={user.id}
        account={user.account}
        name={user.name}
        isFollow={user.isFollow}
        avatar={user.avatar}
        onClick={handleClick}
      />
    );
  });
  return (
    <section className={style.section}>
      <div className={style.header}>
        <h4 className={style.title}>推薦跟隨</h4>
      </div>
      {users}
    </section>
  );
}
export default PopularUserList;
