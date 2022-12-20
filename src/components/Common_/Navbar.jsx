import style from './nav.module.scss';
import logo from '../../assets/images/ACLogoIcon.svg';
import { logout} from '../../assets/images/index'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AdminNavBar = ({funItems, isAdmin}) => {
  const navLinks = funItems.map(item => {
    return  (<li key={item.id} className={style.navLink}>
              <img className={style.icon} src={item.icon} alt="" />
              <NavLink to={item.link}>{item.name}</NavLink>
            </li>)
  })
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

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
          {/* <li className={style.navLink}><img className={style.icon} src={home} alt="" />首頁</li>
        <li className={style.navLink}><img className={style.icon} src={user} alt="" />個人資料</li>
        <li className={style.navLink}><img className={style.icon} src={set} alt="" />設定</li> */}
          {!isAdmin && (
            <li className={style.control}>
              <button className={style.modalBtn}>推文</button>
            </li>
          )}
        </ul>
      </nav>
      <button className={style.navFooter} onClick={handleClick}>
        <img src={logout} alt="" />
        登出
      </button>
    </div>
  );
}

export default AdminNavBar