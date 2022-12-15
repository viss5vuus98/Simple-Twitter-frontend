import style from './replyCard.module.scss';
import { avatar } from '../../../assets/images/index';

const ReplyCard = () => {
  return (
    <div className={style.replyContent}>
      <div className={style.header}>
        <div className={style.avatar}>
          <img src={avatar} alt="avatar" />
        </div>
        <div>
          <div className={style.replyInfo}>
            <p className={style.name}>Jane Cathy</p>
            <p>@iamjane1999</p>
            <p>。3小時</p>
          </div>
          <div className={style.userLink}>
            回覆
            <span>@apple</span>
          </div>
        </div>
      </div>
      <div className={style.messageContent}>
        <p>
          Lorem ipsum dolor sit amet, consectetur aliquidorem ipsum dolor sit
          amet, consectetur aliquidorem ipsum dolor sit amet, consectetur
          aliquidorem ipsum dolor sit amet, consectetur aliquidorem ipsum dolor
          sit amet, consectetur aliquid.
        </p>
      </div>
    </div>
  );
};

export default ReplyCard;
