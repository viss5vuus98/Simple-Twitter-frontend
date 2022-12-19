import style from './edit.module.scss'
import { avatar, userBanner, userAvatar } from '../../assets/images/index';
import close from '../../assets/images/close.svg'

const Edit = () => {
  return (
      <>
        <section className={`${style.hidden} ${style.modal}`}>
        <div className={style.modalHeader}>
            <button className={style.close} style={{ backgroundImage: `url(${close})` }}>
            </button>
              <button className={style.submitBtn}>儲存</button>
        </div>
        <div className={style.banner}>
          <img src={userBanner} alt="banner" />
        </div>
        <form className={style.form}>
          <div className={style.formControl}>
            <div className={style.text_container}>
              <div className={style.label}>姓名</div>
                <input
                  className={style.input}
                  type='text'
                  placeholder=''
                />
              </div>
            </div>
            <div className={style.calculateWord}>
              <span>8/50</span>
            </div>
            <div className={style.textarea_container}>
              <div className={style.label}>自我介紹</div>
              <textarea className={style.textarea} name="" id="">
              </textarea>
            </div>
            <div className={style.calculateWord}>
                <span>5/160</span>
            </div>
        </form>
        <div className={style.avatar}>
          <img src={avatar} alt="" />
        </div>
      </section>
      <div className={`${style.hidden} ${style.overlay}`}></div>
      </>
  )
}

export default Edit 