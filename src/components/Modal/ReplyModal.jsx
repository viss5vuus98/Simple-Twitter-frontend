import style from './replyModal.module.scss'
import { avatar } from '../../assets/images/index';
import close from '../../assets/images/close.svg'

const ReplyModal = ({isHidden, onCloseModal}) => {
  return (
    <>
      <section className={`${!isHidden && style.hidden} ${style.modal}`}>
        <div className={style.modalHeader}>
            <button className={style.close} style={{ backgroundImage: `url(${close})` }}
            onClick={() => {onCloseModal?.('none')}}            
            ></button>
        </div>
        <div className={style.tweetItem}>
          <div className={style.avatar}>
            <img src={avatar} alt="" />
          </div>
          <div className={style.tweetBody}>
            <div className={style.tweetTitle}>
              <p>Apple</p>
              <span>
                @apple 3小時
              </span>
            </div>
            <p className={style.tweetText}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. magnam. Eveniet quisquam impedit ut similique voluptates eum porro iure.</p>
            <div className={style.replyTarget}>
              <span>回覆給 </span>
              <span className={style.link}>@apple</span>       
            </div>
          </div>
          <div className={style.connectLine}></div>
        </div>
        <form className={style.form}>
          <div className={style.formControl}>
            <div className={style.replyAvatar}>
              <img src={avatar} alt="" />
            </div>
            <textarea
              className={style.input}
              type="text"
              placeholder="有什麼新鮮事？"
            />
          </div>
          <div className={style.submitControl}>
              <button className={style.submitBtn}>推文</button>
          </div>
        </form>
      </section>
      <div className={`${!isHidden && style.hidden} ${style.overlay}`}></div>
    </>
  )
}

export default ReplyModal;