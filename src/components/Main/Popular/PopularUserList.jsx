import styles from './PopularUserList.module.css';
import PopularUserCard from './PopularUserCard';

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
  return (
    <div className={styles['container']}>
      <h4 className={styles['popularTitle']}>推薦跟隨</h4>
      <div className={styles['popularUserList']}>
        {fakeUser.map((user) => (
          <PopularUserCard
            key={user.id}
            id={user.id}
            accountName={user.account}
            userName={user.name}
            isFollowed={user.isFollowed}
          />
        ))}
      </div>
    </div>
  );
}
export default PopularUserList;
