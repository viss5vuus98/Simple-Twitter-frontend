import style from './adminUser.module.scss'

import { avatar, userBanner, postIcon, likeCount } from '../../assets/images/index'

const AdminUser = () => {
    return (
      <div className={style.card}>
        <div className={style.header}>
          <img src={userBanner} alt="" />
        </div>
        <div className={style.body}>
          <div className={style.title}>
            <p className={style.name}>John Don</p>
            <p className={style.account}>@hijohn</p>
          </div>
          <div className={style.userInfo}>
            <div className={style.content}>
              <img className={style.icon} src={postIcon} alt="" />
              <span>1.5K</span>
            </div>
            <div className={style.content}>
              <img className={style.icon} src={likeCount} alt="" />
              <span>20K</span>
            </div>
          </div>
          <div className={style.follow}>
            <div>
              <span>34  個</span>
              <span className={style.link}>跟隨中</span>
            </div>
            <div>
              <span>39  個</span>
              <span className={style.link}>追隨者</span>
            </div>
          </div>
        </div>
        <div className={style.avatar}>
          <img src={avatar} alt="" />
        </div>        
      </div>
    )
}

export default AdminUser;