import { AdminNavBar } from "components";
import { useState } from "react";
import { home, user, set, logout} from '../assets/images/index'

//scss
import style from './layout.module.scss'

const userFunction = [
    {
    name: '首頁',
    link: '/main',
    id: 1,
    icon: home
  },
    {
    name: '個人資料',
    link: '/user/self',
    id: 2,
    icon: user
  },
    {
    name: '設定',
    link: '/reply',
    id: 3,
    icon: set
  }
]

const adminFunction = [
      {
    name: '推文清單',
    link: '',
    id: 1,
    icon: home
  },
    {
    name: '使用者列表',
    link: '',
    id: 2,
    icon: user
  },
]


const Layout = ({children}) => {
  const [ currentLayout, setCurrentLayout ] = useState(userFunction)

  
  return (
    <>
      <AdminNavBar className={style.navbar} funItems={currentLayout} isAdmin={Object.is(adminFunction,currentLayout)}/>
      <section className={style.main}>{children}</section>
      <div className={style.popBox}></div>
    </>
  );
};

export default Layout;

//使用者驗證相關 authControl
//Modal
