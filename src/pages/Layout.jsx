import { AdminNavBar, PopularUserList, TweetModal, ReplyModal, EditModal } from "components";
//hook
import { useState, useEffect } from "react";
import { ModalContextProvider } from '../contexts/userContext'
//asset
import { home, user, set} from '../assets/images/index'
//scss
import style from './layout.module.scss'
//API
import { tokenAuthenticate } from '../api/auth'
//Route
import { useNavigate } from 'react-router-dom';

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
  //modal彈出狀態 true出現／false關
  const [ modalState, setModalState ] = useState('none')
  //當前推文ID
  const [ currentTweetId, setCurrentTweetId ] = useState(0)
  //登入狀態
  const [ authorize, setAuthorized ] = useState(false)
  const navigate = useNavigate();

  //處理Layout更換邏輯
  const handleChangeLayout = (layoutName) => {
    if(layoutName === 'user'){
      setCurrentLayout(userFunction)
    }else {
      setCurrentLayout(adminFunction)
    }
  }
  const handleModalState = (value) => {
    let currentModal = ''
    switch (value) {
      case 'tweetModal':
        currentModal = 'tweetModal'
        break;
      case 'replyModal':
        currentModal = 'replyModal'
        break;
      case 'editModal':
        currentModal = 'editModal'
        break;
      default:
        currentModal = 'none'
        break;
    }
    setModalState(currentModal)
  }
  const handleLogout = async () => {
    localStorage.removeItem('authToken');
    const { status } = await tokenAuthenticate()
    setAuthorized((status ==='authorized'))
    navigate('/login');
  };
  //取得當前回文ID 回覆推文用
  const handleGetCurrentTweetId = (tweetId) => {
    setCurrentTweetId(tweetId)
  }

  const checkoutTokenAsync = async () => {
    const { status } = await tokenAuthenticate()
    console.log(status)
    setAuthorized((status ==='authorized'))
  }
  checkoutTokenAsync()

  return (
    <>
      <ModalContextProvider 
      handleModalState={handleModalState} 
      currentTweetId={currentTweetId}
      getTweetId={handleGetCurrentTweetId}
      >
      { authorize && <AdminNavBar className={style.navbar} 
      funItems={currentLayout} 
      isAdmin={Object.is(adminFunction,currentLayout)}
      onClickModal={handleModalState}
      onLogout={handleLogout}
      />}
      <section className={style.main}>{children}</section>
      { authorize && <PopularUserList className={style.popBox} />}
      <TweetModal isHidden={modalState === 'tweetModal'} onCloseModal={handleModalState}/>
      <ReplyModal isHidden={modalState === 'replyModal'} onCloseModal={handleModalState}/>
      <EditModal isHidden={modalState === 'editModal'} onCloseModal={handleModalState}/>
      </ModalContextProvider>
    </>
  );
};

export default Layout;

//使用者驗證相關 authControl
//Modal
