import { UserInfo, UserTab, TweetList } from "components";
import style from './midContent.module.scss'
//icon
import { arrow } from '../../assets/images/index';
const UserMainPage = () => {
  return (
    <>
      <div className={style.header}>
        <img className={style.arrow} src={arrow} alt="" />
        <div className={style.self}>
          <h5 className={style.userName}>Joho Doe</h5>
          <p className={style.tweetCount}>25 推文</p>
        </div>        
      </div>
    <UserInfo/>
    <UserTab/>
    <TweetList/>
    </>
  )
}

export default UserMainPage;