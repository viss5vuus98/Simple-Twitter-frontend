import MainNavbar from '../../components/Main/MainNavbar';
import PopularUser from '../../components/Main/Popular/PopularUserList';
import style from './Test.module.css';
import { TweetList, UserPost } from 'components';

const testPage = () => {
  return (
    <div className={style.mainContainer}>
      <div className={style.leftContainer}>
        <MainNavbar />
      </div>

      <div className={style.centerContainer}>
        <UserPost />
        <TweetList />
      </div>

      <div className={style.rightContainer}>
        <PopularUser />
      </div>
    </div>
  );
};

export default testPage;
