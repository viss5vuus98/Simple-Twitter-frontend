import style from './nav.module.scss';
import logo from '../../assets/images/ACLogoIcon.svg';
import { logout} from '../../assets/images/index'
import { NavLink } from 'react-router-dom';
//asset
import { home, user, set} from '../../assets/images'
import { useEffect, useState } from 'react';
import { useModal } from 'contexts/userContext';

const userFunction = [
  {
    name: '首頁',
    link: '/main',
    id: 1,
    icon: home,
  },
  {
    name: '個人資料',
    link: '/user',
    id: 2,
    icon: user,
  },
  {
    name: '設定',
    link: '/setting',
    id: 3,
    icon: set,
  },
];

const adminFunction = [
  {
    name: '推文清單',
    link: '/admin/main',
    id: 1,
    icon: home,
  },
  {
    name: '使用者列表',
    link: '/admin/user',
    id: 2,
    icon: user,
  },
];

const NavBar = ({isAdmin, onClickModal}) => {
  const [funList, setFunList] = useState(userFunction);
  const { handleModalState, onLogout } = useModal();
  useEffect(() => {
    if (isAdmin) {
      setFunList([...adminFunction]);
    } else {
      setFunList([...userFunction]);
    }
  }, [isAdmin]);

  const navLinks = funList.map((item) => {
    return (
      <li key={item.id} className={style.navLink}>
        <img className={style.icon} src={item.icon} alt="" />
        <NavLink className={style.link} to={item.link}>{item.name}</NavLink>
      </li>
    );
  });
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
          {!isAdmin && (
            <li className={style.control}>
              <button
                className={style.modalBtn}
                onClick={() => {
                  handleModalState?.('tweetModal');
                }}
              >
                推文
              </button>
            </li>
          )}
        </ul>
      </nav>
      <button className={style.navFooter} onClick={onLogout}>
        <img src={logout} alt="" />
        登出
      </button>
    </div>
  );
}

export default NavBar