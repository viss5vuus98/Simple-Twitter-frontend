import { ReplyList, TweetDetail } from 'components';
import { arrow } from '../../assets/images/index';
import style from './midContent.module.scss'

const ReplyPage = () => {
  return (
    <>
      <div className={style.header}>
        <img className={style.arrow} src={arrow} alt="" />
        <h4 className={style.title}>推文</h4>
      </div>
      <TweetDetail />
      <ReplyList />
    </>
  );
}

export default ReplyPage;