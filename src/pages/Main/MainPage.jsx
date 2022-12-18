import { TweetList, UserPost } from 'components';
import style from './midContent.module.scss';

const MainPage = () => {
  return (
    <>
      <div className={style.header}>
        <h4 className={style.title}>首頁</h4>
      </div>
      <UserPost />
      <TweetList />
    </>
  );
};

export default MainPage;
