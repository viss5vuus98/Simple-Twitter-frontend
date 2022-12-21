import style from './replyCard.module.scss';
import moment from 'moment/moment';

moment.locale('zh-tw')

const ReplyCard = ({replyData}) => {
  return (
    <div className={style.replyContent}>
      <div className={style.header}>
        <div className={style.avatar}>
          <img src={replyData.User.avatar} alt="avatar" />
        </div>
        <div>
          <div className={style.replyInfo}>
            <p className={style.name}>{replyData.User.name}</p>
            <p>@{replyData.User.account}</p>
            <p>。{replyData.createdAt}</p>
          </div>
          <div className={style.userLink}>
            回覆
            <span>@apply</span>
          </div>
        </div>
      </div>
      <div className={style.messageContent}>
        <p>
          {replyData.comment || "沒有文"}
        </p>
      </div>
    </div>
  );
};

export default ReplyCard;
