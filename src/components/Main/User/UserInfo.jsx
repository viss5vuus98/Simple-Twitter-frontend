import style from './userInfo.module.scss'
import { userBanner, userAvatar } from '../../../assets/images/index'

const UserInfo = () => {
  return (
    <section className={style.container}>
      <div className={style.banner}>
        <img className={style.image} src={userBanner} alt="banner " />
        <div className={style.avatar}>
          <img src={userAvatar} alt="avatar" />
        </div>
      </div>
      <div className={style.body}>
        <div className={style.controlBar}>
          <button className={style.setInfoBtn}>編輯個人資料</button>
        </div>
        <h5 className={style.name}>John</h5>
        <p className={style.account}>@hijohn</p>
        <p className={style.description}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore, harum adipisci In sit molestias nisi!</p>
        <div className={style.footer}> 
          <p>34<span className={style.unit}>個</span><span className={style.type}>跟隨中</span></p>
          <p>59<span className={style.unit}>位</span><span className={style.type}>追隨者</span></p>
        </div>       
      </div>
    </section>
  )
}

export default UserInfo;