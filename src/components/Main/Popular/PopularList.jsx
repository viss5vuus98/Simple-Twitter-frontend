import style from './popularList.module.scss';
import PopularCard from './PopularCard';
import { useState, useEffect } from 'react';

// test data

const fakeUser = [
  {
    id: 1,
    account: 'Elio1',
    name: 'Elio',
    isFollowed: true,
  },
  {
    id: 2,
    account: 'Peter1',
    name: 'Peter',
    isFollowed: false,
  },
  {
    id: 3,
    account: 'Jules1',
    name: 'Jules',
    isFollowed: true,
  },
];
function PopularUserList() {
  const [ userList, setUserList ] = useState([])
  //追蹤按鈕事件處理
  const handleClick = (userId) => {
    const currentUsers = userList.map(user => {
      if(user.id === userId ){
        return ({
          ...user,
          isFollowed: !user.isFollowed
        })
      }
      return user
    })
    setUserList(currentUsers)
  }
  
  //render將fakeData寫入state 
  useEffect(() => {
    setUserList(fakeUser)
  }, [])

  //Cards
  const users = userList.map(user => {
    return <PopularCard 
    key={user.id} 
    id={user.id}
    account={user.account}
    name={user.name}
    isFollowed={user.isFollowed}
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