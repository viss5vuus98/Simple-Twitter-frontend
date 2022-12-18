import style from './tweetModal.module.scss'
import { avatar } from '../../assets/images/index';
import close from '../../assets/images/close.svg'

const TweetModal = () => {
  return (
    <>
      <section className={`${style.hidden} ${style.modal}`}>
        <div className={style.modalHeader}>
            <button className={style.close} style={{ backgroundImage: `url(${close})` }}></button>
        </div>
        <form className={style.form}>
          <div className={style.formControl}>
            <div className={style.avatar}>
              <img src={avatar} alt="" />
            </div>
            <textarea
              className={style.input}
              type="text"
              placeholder="有什麼新鮮事？"
            />
            <button className={style.submitBtn}>推文</button>
          </div>
        </form>
      </section>
      <div className={`${style.hidden} ${style.overlay}`}></div>
    </>
  )
}

export default TweetModal