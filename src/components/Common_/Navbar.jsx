import style from './nav.module.scss';
import logo from '../../assets/images/ACLogoIcon.svg';
import { home, user, set, logout} from '../../assets/images/index'

const AdminNavBar = () => {
  return (
  <div className={style.sidebar}>
    <div className={style.header}>
      <div className={style.logo}>
        <img src={logo} alt="" />
      </div>
    </div>
    <nav>
      <ul className={style.navItems}>
        <li className={style.navLink}><img className={style.icon} src={home} alt="" />首頁</li>
        <li className={style.navLink}><img className={style.icon} src={user} alt="" />個人資料</li>
        <li className={style.navLink}><img className={style.icon} src={set} alt="" />設定</li>
        <li className={style.control}><button className={style.modalBtn}>推文</button></li>
      </ul>
    </nav>
    <div className={style.navFooter}>
          <img src={logout} alt="" />
          登出
    </div>
  </div>
  )
}

export default AdminNavBar