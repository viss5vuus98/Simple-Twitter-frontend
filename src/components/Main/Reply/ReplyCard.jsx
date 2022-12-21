import style from './replyCard.module.scss';

const ReplyCard = ({replyData}) => {
  return (
    <div className={style.replyContent}>
      <div className={style.header}>
        <div className={style.avatar}>
          <img src={replyData.avatar} alt="avatar" />
        </div>
        <div>
          <div className={style.replyInfo}>
            <p className={style.name}>{replyData.name}</p>
            <p>@{replyData.account}</p>
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
