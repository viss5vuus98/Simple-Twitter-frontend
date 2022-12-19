import style from './MainNavbar.module.scss';
import logo from '../../assets/images/ACLogoIcon.svg';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';


const MainNavbar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleClick = () => {
   setModalOpen(!modalOpen);
 };


  return (
    <div className={style.sidebar}>
      <div className={style.sidebarWrap}>
        <div>
          <img src={logo} alt="Alphitter" className={style.logo} />
        </div>
        <nav className={style.navbar}>
          <ul>
            <li>
              <NavLink
                className={style.navLink}
                to="/main"
                activeClassName={style.active}
              >
                {' '}
                首頁
              </NavLink>
            </li>
            <li>
              <NavLink
                className={style.navLink}
                to="/user"
                activeClassName={style.active}
              >
                個人資料
              </NavLink>
            </li>
            <li>
              <NavLink
                className={style.navLink}
                to="/setting"
                activeClassName={style.active}
              >
                設定
              </NavLink>
            </li>
            <li>
              <NavLink
                className={style.navLink + ' ' + style.logout}
                to="/login"
              >
                登出
              </NavLink>
            </li>
          </ul>
          <button className={style.btn} onClick={handleClick}>
            推文
          </button>
        </nav>
      </div>
 
    </div>
  );
}

export default MainNavbar;