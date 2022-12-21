import style from './nav.module.scss';
import logo from '../../assets/images/ACLogoIcon.svg';
import { logout} from '../../assets/images/index'
import { NavLink } from 'react-router-dom';

const AdminNavBar = ({funItems, isAdmin}) => {
  const navLinks = funItems.map(item => {
    return  (<li key={item.id} className={style.navLink}>
              <img className={style.icon} src={item.icon} alt="" />
              <NavLink to={item.link}>{item.name}</NavLink>
            </li>)
  })


  return (
  <div className={style.sidebar}>
    <div className={style.header}>
      <div className={style.logo}>
        <img src={logo} alt="" />
      </div>
    </div>
    <nav>
      <ul className={style.navItems}>
        {navLinks}
        {!isAdmin && <li className={style.control}><button className={style.modalBtn}>推文</button></li>}
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