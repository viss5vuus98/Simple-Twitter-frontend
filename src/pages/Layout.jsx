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
import { getUserInfo, EditUserInfo } from '../api/usersApi'
//Route
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const userFunction = [
    {
    name: '首頁',
    link: '/main',
    id: 1,
    icon: home
  },
    {
    name: '個人資料',
    link: '/user',
    id: 2,
    icon: user
  },
    {
    name: '設定',
    link: '/setting',
    id: 3,
    icon: set
  }
]

const adminFunction = [
  {
    name: '推文清單',
    link: 'admin/main',
    id: 1,
    icon: home,
  },
  {
    name: '使用者列表',
    link: 'admin/user',
    id: 2,
    icon: user,
  },
];


const Layout = ({children}) => {
  const [ currentLayout, setCurrentLayout ] = useState(userFunction)
  //modal彈出狀態 true出現／false關
  const [ modalState, setModalState ] = useState('none')
  //當前推文ID
  const [ currentTweetId, setCurrentTweetId ] = useState(0)
  //登入狀態
  const [ authorize, setAuthorized ] = useState(false)
  //當前UserId
  const [ currentUserId, setCurrentUserId ] = useState(0)
  //UserInfo
  const [ userInfo, setUserInfo ] = useState({})
  const [ popState, setPopState ] = useState(false)
  const navigate = useNavigate();

  //處理Layout更換邏輯
  const handleChangeLayout = (layoutName) => {
      setCurrentLayout([...userFunction])
  }

  const handleAdminLayout = () => {
    setCurrentLayout([...adminFunction]);
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
  const handlePopPage = (value) =>{
    setPopState(value)
  }
  const handleLogout = async () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId')
    const { status } = await tokenAuthenticate()
    setAuthorized((status ==='authorized'))
    setCurrentLayout(userFunction.filter(i=>1===1));
    handlePopPage(false)

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
    const currentUser = localStorage.getItem('userId') || ''
    setCurrentUserId(currentUser)
  }
  
  const handleSubmitEditUser = (editName, avatar, banner, editInfo) => {
    const editInfoAsync = async () => {
      try{
        const data = await EditUserInfo(currentUserId, editName, avatar, banner, editInfo)
        const updateData = {
          ...userInfo,
          ...data
        }
        setUserInfo(updateData)
        handleModalState('none')
          Swal.fire({
          toast: true,
          position: 'top-end',
          title: '修改成功！',
          timer: 1000,
          icon: 'success',
          showConfirmButton: false,
        });
      }catch(error){
        console.error(error)
      }
    }
    editInfoAsync()
  }

  useEffect(() => {
    const getUser = async () => {
      if(currentUserId <= 0){
        return
      }
      const data = await getUserInfo(currentUserId)
      setUserInfo({
        ...data
      })
    }
    getUser()
  }, [currentUserId])

  checkoutTokenAsync()
  return (
    <>
      <ModalContextProvider
        handleModalState={handleModalState}
        currentTweetId={currentTweetId}
        getTweetId={handleGetCurrentTweetId}
        onLogin={handleChangeLayout}
        userData={userInfo}
        adminLayout={handleAdminLayout}
        changePop={handlePopPage}
      >
        {authorize && (
          <AdminNavBar
            className={style.navbar}
            funItems={currentLayout}
            isAdmin={Object.is(adminFunction, currentLayout)}
            onClickModal={handleModalState}
            onLogout={handleLogout}
          />
        )}
        <section className={style.main}>{children}</section>
        {popState && <PopularUserList className={style.popBox} />}
        <EditModal
          isHidden={modalState === 'editModal'}
          onCloseModal={handleModalState}
          onUpload={handleSubmitEditUser}
        />
        <TweetModal
          isHidden={modalState === 'tweetModal'}
          onCloseModal={handleModalState}
        />
        <ReplyModal
          isHidden={modalState === 'replyModal'}
          onCloseModal={handleModalState}
        />
      </ModalContextProvider>
    </>
  );
};

export default Layout;

//使用者驗證相關 authControl
//Modal
