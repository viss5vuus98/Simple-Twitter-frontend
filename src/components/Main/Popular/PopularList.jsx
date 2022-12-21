import style from './popularList.module.scss';
import PopularCard from './PopularCard';
import { useState, useEffect } from 'react';
import { getRecommendUsers, followShip, unFollowShip } from '../../../api/usersApi'

// test data

// const fakeUser = [
//   {
//     id: 1,
//     account: 'Elio1',
//     name: 'Elio',
//     isFollowed: true,
//   },
//   {
//     id: 2,
//     account: 'Peter1',
//     name: 'Peter',
//     isFollowed: false,
//   },
//   {
//     id: 3,
//     account: 'Jules1',
//     name: 'Jules',
//     isFollowed: true,
//   },
// ];
function PopularUserList() {
  const [ userList, setUserList ] = useState([])

  //追蹤按鈕事件處理
  const handleClick = (userId, isFollow) => {
    const followShipAsync = async () => {
        const data = await followShip(userId)
        setData(data)
      }
    const unFollowShipAsync = async () => {
      const data = await unFollowShip(userId)
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
      const getRecommendUsersAsync = async () => {
        const data = await getRecommendUsers()
        setUserList(data)
      }
      getRecommendUsersAsync()
    }
    return () => {
      flag = false
    }
  }, [])

  //Cards
  const users = userList.map(user => {
    return <PopularCard 
    key={user.id} 
    id={user.id}
    account={user.account}
    name={user.name}
    isFollow={user.isFollow}
    onClick={handleClick}
    />
  })
  return (
    <section className={style.section}>
      <div className={style.header}>
        <h4 className={style.title}>推薦跟隨</h4>
      </div>
      {users}
    </section>
  )
}
export default PopularUserList;