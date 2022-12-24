import FollowingCard from "./FollowingCard";
import style from './followList.module.scss';
import { useState, useEffect } from 'react';
import {
  getFollowingUsers,
  followShip,
  unFollowShip,
} from '../../../api/usersApi';



const fakeUser = [
  {
    id: 1,
    name: 'Elio',
    description: 'test',
    isFollowed: true,
  },
  {
    id: 2,
    name: 'Peter',
    description: 'test',
    isFollowed: false,
  },
  {
    id: 3,
    name: 'Jules',
    description: 'test',
    isFollowed: true,
  },
];


function FollowingList() {
  const [ userList, setUserList ] = useState(fakeUser)

  //追蹤按鈕事件處理
  const handleClick = (userId, isFollow) => {
    const followShipAsync = async () => {
        const data = await followShip(userId)
        if(!data){
        return
         }
        setData(data)
      }
    const unFollowShipAsync = async () => {
      const data = await unFollowShip(userId)
      if(!data){
        return
      }
      setData(data)
    }
    const setData = (data) => {
      const currentUsers = userList.map(user => {
        if(user.id === data.id){
          return ({
            ...user,
            isFollow: data.isFollow
          })
        }
        return ({...user})
      })
      setUserList(currentUsers)
    }
    if(!isFollow){
      followShipAsync()
    }else {
      unFollowShipAsync()
    }
  }
  
  //render將fakeData寫入state 
  useEffect(() => {
    let flag = true
    if(flag){
      const getFollowingUsersAsync = async () => {
        const data = await getFollowingUsers()
        setUserList(data)
      }
      getFollowingUsersAsync()
    }
    return () => {
      flag = false
    }
  }, [])

  //Cards
  const users = userList.map(user => {
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
  })
  return (
    <section className={style.section}>
      <div className={style.header}>
        <h4 className={style.title}>追蹤者</h4>
      </div>
      {users}
    </section>
  )
}
export default FollowingList;













